// Seed local: cria categorias e publica o conteúdo de src/content (upsert por slug → idempotente).
import fs from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { CATEGORIES, CONTENT } from '../src/content/manifest';
import { createItem, updateItemById, upsertCategory } from '../src/lib/mcp/tools';
import { slugify } from '../src/lib/slug';

const prisma = new PrismaClient();
const root = path.resolve(__dirname, '../src/content');

async function main() {
  for (const c of CATEGORIES) await upsertCategory(c);
  console.log(`seed: ${CATEGORIES.length} categorias`);

  let created = 0;
  let updated = 0;
  for (const entry of CONTENT) {
    const code = fs.readFileSync(path.join(root, entry.file), 'utf8');
    const slug = slugify(entry.name);
    const existing = await prisma.item.findUnique({ where: { slug } });
    const payload = {
      name: entry.name,
      code,
      kind: entry.kind,
      category: entry.category,
      description: entry.description,
      tags: entry.tags,
      featured: entry.featured ?? false,
      ...(entry.collection ? { collection: entry.collection } : {}),
      previewHeight: entry.previewHeight,
    };
    if (existing) {
      await updateItemById(existing.id, payload);
      updated++;
    } else {
      await createItem(payload, 'seed');
      created++;
    }
  }
  console.log(`seed: ${created} itens criados, ${updated} atualizados`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
