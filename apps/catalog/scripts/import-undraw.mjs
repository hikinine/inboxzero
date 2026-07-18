// Importa ilustrações do unDraw (SVG nativo) para o catálogo via MCP.
// Uso:
//   node import-undraw.mjs fetch [start=2] [end=43]   -> baixa a lista das páginas → undraw-manifest.json
//   node import-undraw.mjs publish                     -> baixa cada SVG e publica (add_screen), resume-safe
//   node import-undraw.mjs all                         -> fetch + publish
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
const MANIFEST = path.join(__dirname, 'undraw-manifest.json');
const DONE = path.join(__dirname, 'undraw-done.json');

const BUILD_ID = 'nS41BRGVYK4TTVjGNap_q'; // build-id do Next do undraw (pode expirar → há fallback)
const MCP = 'https://hiki9.inboxzero.space/api/mcp';
const COLLECTION = 'UNDRAW';
const CONC = 6;

const TOKEN = process.env.CATALOG_MCP_TOKEN || (() => {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, '.mcp.json'), 'utf8'));
    return m.mcpServers.catalog.headers.Authorization.replace(/^Bearer\s+/, '');
  } catch { return null; }
})();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function discoverBuildId() {
  const html = await (await fetch('https://undraw.co/illustrations')).text();
  return html.match(/"buildId":"([^"]+)"/)?.[1] ?? null;
}

async function fetchPages(start, end) {
  let bid = BUILD_ID;
  const probe = await fetch(`https://undraw.co/_next/data/${bid}/illustrations/2.json?page=2`);
  if (!probe.ok) { bid = await discoverBuildId(); console.log('build-id atualizado:', bid); }

  const all = new Map();
  for (let p = start; p <= end; p++) {
    let ok = false;
    for (let a = 0; a < 3 && !ok; a++) {
      try {
        const r = await fetch(`https://undraw.co/_next/data/${bid}/illustrations/${p}.json?page=${p}`);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const items = (await r.json())?.pageProps?.illustrations ?? [];
        for (const il of items) all.set(il.newSlug, { title: il.title, media: il.media, slug: il.newSlug });
        ok = true;
        console.log(`page ${p}: +${items.length} (total ${all.size})`);
      } catch (e) { console.log(`page ${p} try ${a + 1}: ${e.message}`); await sleep(800); }
    }
    if (!ok) console.log(`!! page ${p} FALHOU (pulada)`);
    await sleep(120);
  }
  const list = [...all.values()];
  fs.writeFileSync(MANIFEST, JSON.stringify(list, null, 2));
  console.log(`\nmanifest: ${list.length} ilustrações → ${MANIFEST}`);
  return list;
}

async function mcpAdd(name, svg, description) {
  const r = await fetch(MCP, {
    method: 'POST',
    headers: { authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'add_screen', arguments: { name, svg, description, collection: COLLECTION, tags: ['undraw'] } } }),
  });
  return JSON.parse((await r.json()).result.content[0].text);
}

async function publish() {
  if (!TOKEN) throw new Error('sem CATALOG_MCP_TOKEN (nem .mcp.json)');
  const list = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const done = new Set(fs.existsSync(DONE) ? JSON.parse(fs.readFileSync(DONE, 'utf8')) : []);
  const queue = list.filter((il) => !done.has(il.slug));
  console.log(`publicar: ${queue.length} (já feitas: ${done.size})`);

  let ok = 0, fail = 0, i = 0;
  const saveDone = () => fs.writeFileSync(DONE, JSON.stringify([...done]));
  async function worker() {
    while (queue.length) {
      const il = queue.shift();
      try {
        const s = await fetch(il.media);
        if (!s.ok) throw new Error('svg HTTP ' + s.status);
        const svg = await s.text();
        if (!/<svg[\s>]/i.test(svg) || !/<\/svg>/i.test(svg)) throw new Error('não é SVG');
        const res = await mcpAdd(il.title, svg, `Ilustração unDraw: ${il.title}`);
        if (res.id) { ok++; done.add(il.slug); } else { fail++; console.log('falha', il.slug, res); }
      } catch (e) { fail++; console.log('erro', il.slug, e.message); }
      if (++i % 50 === 0) { saveDone(); console.log(`... ${ok} ok / ${fail} falhas (${i}/${list.length})`); }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  saveDone();
  console.log(`\n${ok} publicadas, ${fail} falhas`);
}

const mode = process.argv[2] || 'all';
const start = Number(process.argv[3] || 2);
const end = Number(process.argv[4] || 43);
if (mode === 'fetch' || mode === 'all') await fetchPages(start, end);
if (mode === 'publish' || mode === 'all') await publish();
