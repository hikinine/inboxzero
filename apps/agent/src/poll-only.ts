/**
 * poll-only.ts — faz polling do Linear e cria eventos, sem LLM.
 * Uso: tsx src/poll-only.ts
 */
import 'dotenv/config';
import { pollLinear } from './pollers/linear.js';

const WORKSPACE_ID = process.env['TASKY_WORKSPACE_ID'];
const API_URL      = process.env['TASKY_API_URL'] ?? 'http://localhost:3061';

if (!WORKSPACE_ID) {
  console.error('TASKY_WORKSPACE_ID ausente no .env');
  process.exit(1);
}

async function run() {
  console.log(`[Poll] Buscando conectores em ${API_URL}/${WORKSPACE_ID}/connectors...`);

  const res = await fetch(`${API_URL}/${WORKSPACE_ID}/connectors`);
  if (!res.ok) {
    console.error(`[Poll] Erro ao buscar conectores: ${res.status}`);
    process.exit(1);
  }

  const connectors = await res.json() as Array<{
    id: string; workspaceId: string; type: string;
    config: Record<string, unknown>; lastSyncAt: string | null; enabled: boolean;
  }>;

  const linear = connectors.filter((c) => c.enabled && c.type === 'LINEAR');

  if (linear.length === 0) {
    console.log('[Poll] Nenhum conector LINEAR ativo encontrado.');
    return;
  }

  for (const c of linear) {
    console.log(`\n[Poll] Conector: ${c.id} (lastSyncAt: ${c.lastSyncAt ?? 'nunca'})`);
    await pollLinear(c, API_URL);
  }

  console.log('\n[Poll] Concluído. Veja os eventos em /pessoal/events');
}

run().catch((err) => {
  console.error('[Poll] Erro:', err);
  process.exit(1);
});
