import { NextRequest, NextResponse } from 'next/server';
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
  // collection: null/'' desvincula. Screen.collectionId é 1:N — ver comentário abaixo.
  z.object({ action: z.literal('setCollection'), ids: idsSchema, collection: z.string().nullable() }),
]);

const dedupe = (xs: string[]) => [...new Set(xs.map((x) => x.trim()).filter(Boolean))];

/**
 * POST /api/screens/bulk — ações em massa sobre a seleção do catálogo.
 * `ids` aceita id OU slug (mesma convenção tolerante do /api/screens/zip).
 *
 * addTags     → ADITIVO: cria as tags que faltarem e vincula, sem remover as existentes
 *               (o update_screen do MCP, ao contrário, SUBSTITUI o conjunto inteiro).
 * removeTags  → desvincula só as tags informadas; não apaga a Tag em si (outras telas podem usá-la).
 * setCollection → Screen.collectionId é 1:N (uma tela pertence a UMA coleção), então isto MOVE as
 *               telas para a coleção, substituindo a anterior. Não existe "adicionar a várias".
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: `Entrada inválida: ${parsed.error.message}` }, { status: 400 });
  }
  const input = parsed.data;

  // Resolve id|slug → id real uma única vez; as ações abaixo trabalham só com ids.
  const rows = await prisma.screen.findMany({
    where: { OR: [{ id: { in: input.ids } }, { slug: { in: input.ids } }] },
    select: { id: true },
  });
  const screenIds = rows.map((r) => r.id);
  if (!screenIds.length) return NextResponse.json({ error: 'Nenhuma tela encontrada' }, { status: 404 });

  if (input.action === 'addTags') {
    const tagIds: string[] = [];
    for (const raw of dedupe(input.tags)) {
      const slug = slugify(raw);
      const tag = await prisma.tag.upsert({
        where: { slug },
        create: { slug, name: raw.trim() },
        update: {},
      });
      tagIds.push(tag.id);
    }
    // (screenId, tagId) é a PK do join — skipDuplicates torna a ação idempotente.
    const res = await prisma.screenTag.createMany({
      data: screenIds.flatMap((screenId) => tagIds.map((tagId) => ({ screenId, tagId }))),
      skipDuplicates: true,
    });
    return NextResponse.json({ ok: true, screens: screenIds.length, tags: tagIds.length, linked: res.count });
  }

  if (input.action === 'removeTags') {
    const slugs = dedupe(input.tags).map(slugify);
    const tags = await prisma.tag.findMany({ where: { slug: { in: slugs } }, select: { id: true } });
    if (!tags.length) return NextResponse.json({ ok: true, screens: screenIds.length, unlinked: 0 });
    const res = await prisma.screenTag.deleteMany({
      where: { screenId: { in: screenIds }, tagId: { in: tags.map((t) => t.id) } },
    });
    return NextResponse.json({ ok: true, screens: screenIds.length, unlinked: res.count });
  }

  const name = input.collection?.trim();
  let collectionId: string | null = null;
  if (name) {
    const slug = slugify(name);
    const col = await prisma.collection.upsert({
      where: { slug },
      create: { slug, name },
      update: {},
    });
    collectionId = col.id;
  }
  const res = await prisma.screen.updateMany({ where: { id: { in: screenIds } }, data: { collectionId } });
  return NextResponse.json({ ok: true, screens: res.count, collectionId });
}
