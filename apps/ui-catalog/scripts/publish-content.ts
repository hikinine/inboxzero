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

// Re-tenta erros transitórios (502/503 durante redeploy, timeouts) com backoff.
async function call(name: string, args: Record<string, unknown>, attempt = 1): Promise<any> {
  try {
    return await callOnce(name, args);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (attempt < 5 && /HTTP 5\d\d|fetch failed|ECONNRESET|ETIMEDOUT|socket/i.test(msg)) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return call(name, args, attempt + 1);
    }
    throw e;
  }
}

async function callOnce(name: string, args: Record<string, unknown>): Promise<any> {
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
      ...(entry.collection ? { collection: entry.collection } : {}),
      ...(entry.previewHeight ? { previewHeight: entry.previewHeight } : {}),
    };
    try {
      // Só trata como inexistente quando o servidor diz "não encontrado" — qualquer outro erro aborta
      // este item (evita criar duplicado com sufixo quando o get falha por instabilidade).
      const existing = await call('get_item', { idOrSlug: slug }).catch((e: unknown) => {
        if (e instanceof Error && /não encontrado/i.test(e.message)) return null;
        throw e;
      });
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

  // Poda: categorias fora da taxonomia e sem itens.
  const known = new Set(CATEGORIES.map((c) => `${c.kind}:${slugify(c.name)}`));
  const listed = (await call('list_categories', {})) as { categories: Array<{ kind: string; slug: string; items: number }> };
  for (const c of listed.categories ?? []) {
    if (known.has(`${c.kind}:${c.slug}`) || c.items > 0) continue;
    await call('delete_category', { kind: c.kind, slug: c.slug }).catch((e) => console.warn(`  ! poda ${c.kind}/${c.slug}: ${e instanceof Error ? e.message : e}`));
    console.log(`  - categoria vazia removida: ${c.kind}/${c.slug}`);
  }
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
