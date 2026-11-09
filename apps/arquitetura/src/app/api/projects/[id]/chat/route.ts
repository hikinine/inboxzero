import Anthropic from '@anthropic-ai/sdk';
import { randomBytes } from 'node:crypto';
import { db } from '@/lib/db';
import { type StoredBlock, splitReply, toApiMessages } from '@/lib/blocks';
import { SYSTEM_PROMPT } from '@/lib/prompt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5-5';
// Travas mais velhas que isso são de uma geração que morreu (deploy no meio, por exemplo).
const LOCK_TTL_MS = 25 * 60 * 1000;

type Event =
  | { t: 'status'; s: 'thinking' | 'writing' | 'building' }
  | { t: 'text'; v: string }
  | { t: 'html'; n: number }
  | { t: 'done'; messageId: string; mockup: { version: number; slug: string } | null; truncated: boolean }
  | { t: 'error'; msg: string };

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await req.json().catch(() => null)) as { text?: string; attachmentIds?: string[] } | null;
  const text = (body?.text ?? '').trim();
  const attachmentIds = Array.isArray(body?.attachmentIds) ? body.attachmentIds.slice(0, 12) : [];
  if (!text && attachmentIds.length === 0) {
    return Response.json({ error: 'Escreva uma mensagem ou anexe um arquivo.' }, { status: 400 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: 'A chave da Anthropic ainda não foi configurada no servidor (ANTHROPIC_API_KEY).' },
      { status: 503 },
    );
  }

  // Trava atômica: só passa se não houver geração em andamento (ou se a trava for velha).
  const locked = await db.project.updateMany({
    where: {
      id,
      OR: [{ generatingSince: null }, { generatingSince: { lt: new Date(Date.now() - LOCK_TTL_MS) } }],
    },
    data: { generatingSince: new Date() },
  });
  if (locked.count === 0) {
    const exists = await db.project.findUnique({ where: { id }, select: { id: true } });
    return exists
      ? Response.json({ error: 'Ainda estou respondendo a mensagem anterior deste projeto.' }, { status: 409 })
      : Response.json({ error: 'Projeto não encontrado.' }, { status: 404 });
  }

  try {
    const [attachments, latestMockup, priorUserMessages, project] = await Promise.all([
      db.attachment.findMany({
        where: { id: { in: attachmentIds }, projectId: id },
        select: { id: true, name: true, mediaType: true },
      }),
      db.mockup.findFirst({ where: { projectId: id }, orderBy: { version: 'desc' }, select: { version: true } }),
      db.message.findMany({ where: { projectId: id, role: 'user' }, select: { blocks: true } }),
      db.project.findUniqueOrThrow({ where: { id }, select: { title: true } }),
    ]);

    // A maquete atual entra no contexto só uma vez por versão (o histórico nunca é reescrito).
    const alreadyAttached = new Set(
      priorUserMessages.flatMap((m) =>
        (m.blocks as StoredBlock[]).filter((b) => b.type === 'mockup').map((b) => (b as { version: number }).version),
      ),
    );
    const userBlocks: StoredBlock[] = attachments.map((a) => ({
      type: 'attachment',
      id: a.id,
      name: a.name,
      mediaType: a.mediaType,
    }));
    if (latestMockup && !alreadyAttached.has(latestMockup.version)) {
      userBlocks.push({ type: 'mockup', version: latestMockup.version });
    }
    if (text) userBlocks.push({ type: 'text', text });

    await db.message.create({ data: { projectId: id, role: 'user', blocks: userBlocks } });
    if (project.title === 'Novo projeto' && text) {
      await db.project.update({ where: { id }, data: { title: titleFrom(text) } });
    }

    const messages = await toApiMessages(id);
    return new Response(streamReply(id, messages, latestMockup?.version ?? 0), {
      headers: {
        'Content-Type': 'application/x-ndjson; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err) {
    await db.project.update({ where: { id }, data: { generatingSince: null } }).catch(() => {});
    throw err;
  }
}

function streamReply(projectId: string, messages: Anthropic.MessageParam[], lastVersion: number) {
  const encoder = new TextEncoder();
  let closed = false;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      // A geração continua mesmo se o navegador fechar: o resultado fica salvo no projeto.
      const send = (e: Event) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(e)}\n`));
        } catch {
          closed = true;
        }
      };

      let full = '';
      let ticker: ReturnType<typeof setInterval> | null = null;
      let lastVisible = '';
      let lastHtmlLen = -1;
      const flush = () => {
        const parts = splitReply(full);
        const visible = parts.html === null ? parts.before : `${parts.before}\n\n[[maquete]]\n\n${parts.after}`;
        if (visible !== lastVisible) {
          lastVisible = visible;
          send({ t: 'text', v: visible });
        }
        if (parts.html !== null && parts.html.length !== lastHtmlLen) {
          lastHtmlLen = parts.html.length;
          send({ t: 'html', n: parts.html.length });
        }
      };

      try {
        const client = new Anthropic();
        const useFallbacks = (process.env.ANTHROPIC_FALLBACKS ?? 'default') !== 'off';
        const params = {
          model: MODEL,
          max_tokens: 100000,
          thinking: { type: 'adaptive', display: 'summarized' },
          output_config: { effort: 'high' },
          cache_control: { type: 'ephemeral' },
          system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral', ttl: '1h' } }],
          messages,
          ...(useFallbacks ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' } : {}),
        };
        // `fallbacks: "default"` (beta) re-roda num modelo reserva se o principal recusar por engano.
        const stream = client.beta.messages.stream(params as unknown as Anthropic.Beta.MessageCreateParamsStreaming);

        ticker = setInterval(flush, 120);
        for await (const event of stream) {
          if (event.type === 'content_block_start') {
            if (event.content_block.type === 'thinking') send({ t: 'status', s: 'thinking' });
            if (event.content_block.type === 'text') send({ t: 'status', s: 'writing' });
          } else if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            full += event.delta.text;
          }
        }
        clearInterval(ticker);
        ticker = null;
        flush();

        const final = await stream.finalMessage();
        const truncated = final.stop_reason === 'max_tokens';
        if (final.stop_reason === 'refusal') {
          full += '\n\nNão consegui responder esse pedido. Tente reformular.';
        }

        const parts = splitReply(full);
        let mockup: { version: number; slug: string } | null = null;
        const blocks: StoredBlock[] = [];
        if (parts.html !== null && !parts.open && parts.html.includes('</html>')) {
          send({ t: 'status', s: 'building' });
          const version = lastVersion + 1;
          const slug = randomBytes(9).toString('base64url');
          await db.mockup.create({ data: { projectId, version, slug, html: parts.html.trim() } });
          mockup = { version, slug };
          if (parts.before.trim()) blocks.push({ type: 'text', text: parts.before.trim() });
          blocks.push({ type: 'mockup', version });
          if (parts.after.trim()) blocks.push({ type: 'text', text: parts.after.trim() });
        } else {
          let textOut = parts.before.trim();
          if (parts.html !== null) {
            textOut += '\n\n_A maquete foi cortada antes do fim e não foi salva. Peça para eu continuar ou simplificar._';
          }
          blocks.push({ type: 'text', text: textOut || '(sem resposta)' });
        }

        const saved = await db.message.create({ data: { projectId, role: 'assistant', blocks } });
        send({ t: 'done', messageId: saved.id, mockup, truncated });
      } catch (err) {
        const msg = describeError(err);
        console.error('[chat] falha na geração', err);
        await db.message
          .create({ data: { projectId, role: 'assistant', blocks: [{ type: 'text', text: `⚠️ ${msg}` }] } })
          .catch(() => {});
        send({ t: 'error', msg });
      } finally {
        if (ticker) clearInterval(ticker);
        await db.project.update({ where: { id: projectId }, data: { generatingSince: null } }).catch(() => {});
        if (!closed) {
          closed = true;
          try {
            controller.close();
          } catch {}
        }
      }
    },
    cancel() {
      closed = true;
    },
  });
}

function describeError(err: unknown): string {
  if (err instanceof Anthropic.AuthenticationError) return 'A chave da Anthropic foi recusada. Confira a ANTHROPIC_API_KEY.';
  if (err instanceof Anthropic.RateLimitError) return 'Limite de uso da Anthropic atingido. Tente de novo em alguns minutos.';
  if (err instanceof Anthropic.BadRequestError) return `A Anthropic recusou o pedido: ${err.message}`;
  if (err instanceof Anthropic.APIError) return `Erro da Anthropic (${err.status ?? 'sem status'}). Tente de novo.`;
  return 'Falhou ao gerar a resposta. Tente de novo.';
}

function titleFrom(text: string) {
  const line = text.split('\n')[0].trim();
  return line.length > 60 ? `${line.slice(0, 57)}…` : line;
}
