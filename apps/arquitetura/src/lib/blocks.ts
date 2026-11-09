import type Anthropic from '@anthropic-ai/sdk';
import { db } from './db';

// Blocos guardados em Message.blocks. Anexos e maquetes são guardados por referência e só viram base64/HTML
// na hora de montar o pedido, para o banco não duplicar arquivos grandes.
export type StoredBlock =
  | { type: 'text'; text: string }
  | { type: 'attachment'; id: string; name: string; mediaType: string }
  // Na mensagem do usuário: a maquete atual anexada como contexto. Na do assistente: a versão que ele entregou.
  | { type: 'mockup'; version: number };

export const MOCKUP_FENCE_OPEN = '```html';

export function isImage(mediaType: string) {
  return mediaType.startsWith('image/');
}

/**
 * Monta o histórico no formato da API. O histórico é só de acréscimo: a maquete atual entra uma única vez,
 * na primeira mensagem do usuário depois de cada versão nova, e mensagens antigas nunca são reescritas.
 */
export async function toApiMessages(projectId: string): Promise<Anthropic.MessageParam[]> {
  const messages = await db.message.findMany({ where: { projectId }, orderBy: { createdAt: 'asc' } });

  const attachmentIds = new Set<string>();
  const mockupVersions = new Set<number>();
  for (const m of messages) {
    for (const b of m.blocks as StoredBlock[]) {
      if (b.type === 'attachment') attachmentIds.add(b.id);
      if (b.type === 'mockup' && m.role === 'user') mockupVersions.add(b.version);
    }
  }
  const [attachments, mockups] = await Promise.all([
    db.attachment.findMany({ where: { id: { in: [...attachmentIds] } } }),
    db.mockup.findMany({ where: { projectId, version: { in: [...mockupVersions] } } }),
  ]);
  const attachmentById = new Map(attachments.map((a) => [a.id, a]));
  const htmlByVersion = new Map(mockups.map((m) => [m.version, m.html]));

  return messages.map((m) => {
    const content: Anthropic.ContentBlockParam[] = [];
    for (const b of m.blocks as StoredBlock[]) {
      if (b.type === 'text') {
        if (b.text.trim()) content.push({ type: 'text', text: b.text });
      } else if (b.type === 'attachment') {
        const a = attachmentById.get(b.id);
        if (!a) continue;
        const data = Buffer.from(a.data).toString('base64');
        if (isImage(a.mediaType)) {
          content.push({
            type: 'image',
            source: { type: 'base64', media_type: a.mediaType as 'image/jpeg', data },
          });
        } else {
          content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data } });
        }
      } else if (m.role === 'user') {
        const html = htmlByVersion.get(b.version);
        if (html) {
          content.push({
            type: 'text',
            text: `Maquete atual (versão ${b.version}). Parta dela e devolva o documento completo se mudar algo:\n${MOCKUP_FENCE_OPEN}\n${html}\n\`\`\``,
          });
        }
      } else {
        content.push({ type: 'text', text: `(Maquete versão ${b.version} entregue aqui.)` });
      }
    }
    if (content.length === 0) content.push({ type: 'text', text: '(sem texto)' });
    return { role: m.role as 'user' | 'assistant', content };
  });
}

/** Separa o texto visível do HTML da maquete numa resposta (completa ou ainda em streaming). */
export function splitReply(full: string): { before: string; html: string | null; after: string; open: boolean } {
  const start = full.indexOf(MOCKUP_FENCE_OPEN);
  if (start === -1) return { before: full, html: null, after: '', open: false };
  const bodyStart = full.indexOf('\n', start);
  if (bodyStart === -1) return { before: full.slice(0, start), html: '', after: '', open: true };
  const close = full.indexOf('\n```', bodyStart);
  if (close === -1) {
    return { before: full.slice(0, start), html: full.slice(bodyStart + 1), after: '', open: true };
  }
  return {
    before: full.slice(0, start),
    html: full.slice(bodyStart + 1, close),
    after: full.slice(close + 4),
    open: false,
  };
}
