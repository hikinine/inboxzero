import Anthropic from '@anthropic-ai/sdk';
import { getTaskyTools } from './tools/tasky-tools.js';
import { pollLinear } from './pollers/linear.js';

const LOOP_INTERVAL_MS = 5 * 60 * 1000; // 5 min

interface Event {
  id:          string;
  workspaceId: string;
  connectorId: string;
  rawPayload:  Record<string, unknown>;
  status:      string;
}

async function fetchPendingEvents(workspaceId: string, apiUrl: string): Promise<Event[]> {
  const res = await fetch(`${apiUrl}/${workspaceId}/events/pending`);
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
  return res.json() as Promise<Event[]>;
}

async function processEvent(
  event: Event,
  client: Anthropic,
  apiUrl: string,
): Promise<void> {
  const systemPrompt = `Você é o agente pessoal de secretária do usuário.
Analise o evento recebido de um conector e decida:
1. Requer ação do usuário? Se não, use ignore_event.
2. Que itens criar? (tarefa, follow-up, lembrete, notificação ou rascunho)
3. Qual a prioridade real? Seja conservador: não tudo é urgente.
4. Há prazo implícito? (ex: "reunião amanhã 14h" → dueDate amanhã 14h)
5. Pode um evento gerar múltiplos itens? Sim — ex: PR de revisão → tarefa + lembrete em 2h.

Escreva títulos claros e objetivos em português, máx 80 chars.
Não crie duplicatas óbvias. Priorize o que realmente impacta o usuário.`;

  const userPrompt = `Evento recebido:
Conector: ${event.connectorId}
Workspace: ${event.workspaceId}
Payload:
${JSON.stringify(event.rawPayload, null, 2)}`;

  console.log(`  → Classificando evento ${event.id} (${event.connectorId})...`);

  const response = await client.messages.create({
    model:      'claude-opus-4-8',
    max_tokens: 1024,
    system:     systemPrompt,
    tools:      getTaskyTools() as Anthropic.Tool[],
    messages:   [{ role: 'user', content: userPrompt }],
  });

  const toolUses = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use');

  if (toolUses.length === 0) {
    // LLM didn't call any tool — mark as ignored
    await markProcessed(event, apiUrl, { items: [], agentNotes: 'Sem ação necessária.', ignored: true });
    console.log(`  ✓ ${event.id} → ignorado (sem tool call)`);
    return;
  }

  for (const tool of toolUses) {
    if (tool.name === 'create_items') {
      const input = tool.input as { items: object[]; agentNotes?: string };
      await markProcessed(event, apiUrl, {
        items:      input.items,
        agentNotes: input.agentNotes,
        ignored:    false,
      });
      console.log(`  ✓ ${event.id} → ${input.items.length} item(s) criado(s)`);
    } else if (tool.name === 'ignore_event') {
      const input = tool.input as { reason: string };
      await markProcessed(event, apiUrl, { items: [], agentNotes: input.reason, ignored: true });
      console.log(`  ✓ ${event.id} → ignorado: ${input.reason}`);
    }
  }
}

async function markProcessed(
  event: Event,
  apiUrl: string,
  body: { items: object[]; agentNotes?: string; ignored: boolean },
): Promise<void> {
  const res = await fetch(`${apiUrl}/${event.workspaceId}/events/${event.id}/process`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to process event ${event.id}: ${res.status} ${text}`);
  }
}

export async function startAgentLoop(workspaceId: string, apiUrl: string): Promise<void> {
  const client = new Anthropic(); // uses ANTHROPIC_API_KEY from env

  const runOnce = async () => {
    console.log(`\n[Agent] ${new Date().toISOString()} — ciclo iniciado`);

    // 1. Poll connectors that use polling (LINEAR, GMAIL, etc.)
    try {
      const connectorsRes = await fetch(`${apiUrl}/${workspaceId}/connectors`);
      if (connectorsRes.ok) {
        const connectors = await connectorsRes.json() as Array<{
          id: string; workspaceId: string; type: string;
          config: Record<string, unknown>; lastSyncAt: string | null; enabled: boolean;
        }>;

        for (const c of connectors.filter((c) => c.enabled)) {
          if (c.type === 'LINEAR') {
            try {
              await pollLinear(c, apiUrl);
            } catch (err) {
              console.error(`  [Linear] Erro ao fazer polling do conector ${c.id}:`, err);
            }
          }
        }
      }
    } catch (err) {
      console.error('[Agent] Erro ao buscar conectores para polling:', err);
    }

    // 2. Process pending events with LLM
    console.log(`[Agent] Verificando eventos pendentes...`);
    let events: Event[];
    try {
      events = await fetchPendingEvents(workspaceId, apiUrl);
    } catch (err) {
      console.error('[Agent] Erro ao buscar eventos:', err);
      return;
    }

    if (events.length === 0) {
      console.log('[Agent] Nenhum evento pendente.');
      return;
    }

    console.log(`[Agent] ${events.length} evento(s) para processar.`);

    for (const event of events) {
      try {
        await processEvent(event, client, apiUrl);
      } catch (err) {
        console.error(`[Agent] Erro ao processar evento ${event.id}:`, err);
      }
    }
  };

  // Run immediately, then on interval
  await runOnce();
  setInterval(runOnce, LOOP_INTERVAL_MS);
}
