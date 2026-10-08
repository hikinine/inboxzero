// Publica/atualiza o conteúdo de src/content no catálogo remoto via MCP (upsert por slug).
// Uso: UI_CATALOG_MCP_URL=https://ui.codehall.io/api/mcp UI_CATALOG_MCP_TOKEN=... pnpm publish-content
// (sem as envs, usa o .mcp.json do repo: servidor "ui-catalog").
import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES, CONTENT } from '../src/content/manifest';
import { slugify } from '../src/lib/slug';

const root = path.resolve(__dirname, '../src/content');

function resolveTarget(): { url: string; token: string } {
  if (process.env.UI_CATALOG_MCP_URL && process.env.UI_CATALOG_MCP_TOKEN) {
    return { url: process.env.UI_CATALOG_MCP_URL, token: process.env.UI_CATALOG_MCP_TOKEN };
  }
  const mcpPath = path.resolve(__dirname, '../../../.mcp.json');
  const cfg = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
  const srv = cfg.mcpServers?.['ui-catalog'];
  if (!srv) throw new Error('Defina UI_CATALOG_MCP_URL/UI_CATALOG_MCP_TOKEN ou configure "ui-catalog" no .mcp.json');
  return { url: srv.url, token: String(srv.headers.Authorization).replace(/^Bearer\s+/, '') };
}

const target = resolveTarget();
let id = 0;

async function call(name: string, args: Record<string, unknown>): Promise<any> {
  const res = await fetch(target.url, {
    method: 'POST',
    headers: { authorization: `Bearer ${target.token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method: 'tools/call', params: { name, arguments: args } }),
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} ${await res.text()}`);
  const json = await res.json();
  const text = json.result?.content?.[0]?.text ?? '';
  if (json.result?.isError) throw new Error(`${name}: ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function main() {
  console.log(`publish-content → ${target.url}`);
  for (const c of CATEGORIES) await call('upsert_category', { ...c });
  console.log(`categorias: ${CATEGORIES.length}`);

  let created = 0;
  let updated = 0;
  let failed = 0;
  for (const entry of CONTENT) {
    const code = fs.readFileSync(path.join(root, entry.file), 'utf8');
    const slug = slugify(entry.name);
    const payload = {
      name: entry.name,
      code,
      kind: entry.kind,
      category: entry.category,
      description: entry.description,
      tags: entry.tags,
      featured: entry.featured ?? false,
      ...(entry.previewHeight ? { previewHeight: entry.previewHeight } : {}),
    };
    try {
      const existing = await call('get_item', { idOrSlug: slug }).catch(() => null);
      if (existing && typeof existing === 'object' && existing.slug === slug) {
        await call('update_item', { idOrSlug: slug, ...payload });
        updated++;
        console.log(`  ~ ${slug}`);
      } else {
        const r = await call('add_item', payload);
        created++;
        console.log(`  + ${r.slug ?? slug}`);
      }
    } catch (e) {
      failed++;
      console.error(`  ! ${slug}: ${e instanceof Error ? e.message : e}`);
    }
  }
  console.log(`criados ${created} · atualizados ${updated} · falhas ${failed}`);
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
