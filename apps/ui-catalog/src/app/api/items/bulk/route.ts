import { NextRequest, NextResponse } from 'next/server';
import { ItemStatus } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slug';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const idsSchema = z.array(z.string().min(1)).min(1).max(5000);
const namesSchema = z.array(z.string().min(1)).min(1).max(50);

const bodySchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('addTags'), ids: idsSchema, tags: namesSchema }),
  z.object({ action: z.literal('removeTags'), ids: idsSchema, tags: namesSchema }),
  z.object({ action: z.literal('setCollection'), ids: idsSchema, collection: z.string().nullable() }),
  z.object({ action: z.literal('setFeatured'), ids: idsSchema, featured: z.boolean() }),
  z.object({ action: z.literal('setStatus'), ids: idsSchema, status: z.nativeEnum(ItemStatus) }),
]);

const dedupe = (xs: string[]) => [...new Set(xs.map((x) => x.trim()).filter(Boolean))];

/**
 * POST /api/items/bulk — ações em massa sobre a seleção. `ids` aceita id OU slug.
 * addTags é ADITIVO (não remove as existentes); removeTags desvincula só as informadas;
 * setCollection MOVE (um item pertence a uma coleção só); setFeatured/setStatus são diretos.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: `Entrada inválida: ${parsed.error.message}` }, { status: 400 });
  const input = parsed.data;

  const rows = await prisma.item.findMany({ where: { OR: [{ id: { in: input.ids } }, { slug: { in: input.ids } }] }, select: { id: true } });
  const itemIds = rows.map((r) => r.id);
  if (!itemIds.length) return NextResponse.json({ error: 'Nenhum item encontrado' }, { status: 404 });

  if (input.action === 'addTags') {
    const tagIds: string[] = [];
    for (const raw of dedupe(input.tags)) {
      const slug = slugify(raw);
      const tag = await prisma.tag.upsert({ where: { slug }, create: { slug, name: raw.trim() }, update: {} });
      tagIds.push(tag.id);
    }
    const res = await prisma.itemTag.createMany({ data: itemIds.flatMap((itemId) => tagIds.map((tagId) => ({ itemId, tagId }))), skipDuplicates: true });
    return NextResponse.json({ ok: true, items: itemIds.length, tags: tagIds.length, linked: res.count });
  }

  if (input.action === 'removeTags') {
    const slugs = dedupe(input.tags).map(slugify);
    const tags = await prisma.tag.findMany({ where: { slug: { in: slugs } }, select: { id: true } });
    if (!tags.length) return NextResponse.json({ ok: true, items: itemIds.length, unlinked: 0 });
    const res = await prisma.itemTag.deleteMany({ where: { itemId: { in: itemIds }, tagId: { in: tags.map((t) => t.id) } } });
    return NextResponse.json({ ok: true, items: itemIds.length, unlinked: res.count });
  }

  if (input.action === 'setFeatured') {
    const res = await prisma.item.updateMany({ where: { id: { in: itemIds } }, data: { featured: input.featured } });
    return NextResponse.json({ ok: true, items: res.count });
  }

  if (input.action === 'setStatus') {
    const res = await prisma.item.updateMany({ where: { id: { in: itemIds } }, data: { status: input.status } });
    return NextResponse.json({ ok: true, items: res.count });
  }

  const name = input.collection?.trim();
  let collectionId: string | null = null;
  if (name) {
    const slug = slugify(name);
    const col = await prisma.collection.upsert({ where: { slug }, create: { slug, name }, update: {} });
    collectionId = col.id;
  }
  const res = await prisma.item.updateMany({ where: { id: { in: itemIds } }, data: { collectionId } });
  return NextResponse.json({ ok: true, items: res.count, collectionId });
}
