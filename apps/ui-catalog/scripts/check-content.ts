// Valida o conteúdo do manifest SEM banco: arquivo existe, compila (sucrase, o mesmo compilador do
// preview), imports suportados, export default, categoria existe na taxonomia, slug/nome únicos,
// sem lorem ipsum.
// Uso: pnpm exec tsx scripts/check-content.ts [filtro]
//   sem filtro               → todo o CONTENT (manifest + fragmentos)
//   entries/<fragmento>.ts   → só esse fragmento (não depende dos outros fragmentos compilarem)
//   <substring de caminho>   → só entradas cujo `file` contém o filtro (ex.: blocks/hero)
import fs from 'node:fs';
import path from 'node:path';
import { CATEGORIES } from '../src/content/taxonomy';
import type { ContentEntry } from '../src/content/manifest';
import { checkCode } from '../src/lib/code';
import { slugify } from '../src/lib/slug';

const root = path.resolve(__dirname, '../src/content');
const filter = process.argv[2];

async function loadEntries(): Promise<{ entries: ContentEntry[]; others: ContentEntry[] }> {
  if (filter?.startsWith('entries/')) {
    const mod = (await import(path.join(root, filter))) as { ENTRIES: ContentEntry[] };
    let others: ContentEntry[] = [];
    try {
      const { CONTENT } = (await import('../src/content/manifest')) as { CONTENT: ContentEntry[] };
      others = CONTENT.filter((c) => !mod.ENTRIES.includes(c));
    } catch (e) {
      console.warn(`⚠ manifest completo não carregou (outro fragmento com erro?) — unicidade de slug conferida só dentro do fragmento. ${e instanceof Error ? e.message.split('\n')[0] : ''}`);
    }
    return { entries: mod.ENTRIES, others };
  }
  const { CONTENT } = (await import('../src/content/manifest')) as { CONTENT: ContentEntry[] };
  return { entries: filter ? CONTENT.filter((e) => e.file.includes(filter)) : CONTENT, others: filter ? CONTENT.filter((e) => !e.file.includes(filter)) : [] };
}

async function main() {
  const { entries, others } = await loadEntries();
  const errors: string[] = [];
  const warnings: string[] = [];
  const slugs = new Map<string, string>();
  const files = new Map<string, string>();
  for (const o of others) {
    slugs.set(slugify(o.name), o.file);
    files.set(o.file, o.name);
  }
  const catKeys = new Set(CATEGORIES.map((c) => `${c.kind}:${slugify(c.name)}`));

  for (const e of entries) {
    const slug = slugify(e.name);
    if (slugs.has(slug) && slugs.get(slug) !== e.file) errors.push(`${e.file}: slug "${slug}" duplicado (também em ${slugs.get(slug)}) — mude o nome`);
    slugs.set(slug, e.file);
    if (files.has(e.file) && files.get(e.file) !== e.name) errors.push(`${e.file}: arquivo referenciado duas vezes (também por "${files.get(e.file)}")`);
    files.set(e.file, e.name);

    const p = path.join(root, e.file);
    if (!fs.existsSync(p)) {
      errors.push(`${e.file}: arquivo não existe`);
      continue;
    }
    if (!catKeys.has(`${e.kind}:${slugify(e.category)}`)) errors.push(`${e.file}: categoria "${e.category}" não existe em taxonomy.ts para ${e.kind}`);
    if (!e.description?.trim()) errors.push(`${e.file}: sem descrição`);
    if (!e.tags?.length) errors.push(`${e.file}: sem tags`);
    if (e.name.length > 60) warnings.push(`${e.file}: nome longo (${e.name.length} chars)`);

    const code = fs.readFileSync(p, 'utf8');
    const r = checkCode(code);
    if (!r.ok) errors.push(`${e.file}: ${r.errors.join(' | ')}`);
    if (/lorem ipsum/i.test(code)) errors.push(`${e.file}: contém lorem ipsum`);
    if (/<img[^>]+src=["']https?:/i.test(code)) errors.push(`${e.file}: imagem remota (<img src="http…">) — use SVG inline, gradiente ou placeholder`);
    const hex = code.match(/#[0-9a-fA-F]{6}\b/g);
    if (hex && hex.length > 4) warnings.push(`${e.file}: ${hex.length} cores hex — prefira tokens do tema (ok em ilustrações/gradientes decorativos)`);
  }

  for (const w of warnings) console.warn(`⚠ ${w}`);
  for (const e of errors) console.error(`✗ ${e}`);
  console.log(`check-content: ${entries.length} entradas verificadas${filter ? ` (filtro "${filter}")` : ''} · ${errors.length} erro(s) · ${warnings.length} aviso(s)`);
  if (errors.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
