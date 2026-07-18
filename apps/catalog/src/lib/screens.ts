import { Prisma, ScreenStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface ScreenFilters {
  q?: string;
  collection?: string; // slug
  tag?: string; // slug
  status?: ScreenStatus;
}

export interface ScreenMeta {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: ScreenStatus;
  width: number | null;
  height: number | null;
  collection: { slug: string; name: string } | null;
  tags: Array<{ slug: string; name: string }>;
  createdAt: string;
}

// Cláusula WHERE compartilhada entre a UI (rota /api/screens) e o MCP (search_screens).
export function buildWhere(f: ScreenFilters): Prisma.ScreenWhereInput {
  const where: Prisma.ScreenWhereInput = {};
  if (f.status) where.status = f.status;
  if (f.q) {
    where.OR = [
      { name: { contains: f.q, mode: 'insensitive' } },
      { description: { contains: f.q, mode: 'insensitive' } },
    ];
  }
  if (f.collection) where.collection = { slug: f.collection };
  if (f.tag) where.tags = { some: { tag: { slug: f.tag } } };
  return where;
}

const withRelations = {
  collection: true,
  tags: { include: { tag: true } },
} satisfies Prisma.ScreenInclude;

type ScreenRow = Prisma.ScreenGetPayload<{ include: typeof withRelations }>;

export function toMeta(s: ScreenRow): ScreenMeta {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    status: s.status,
    width: s.width,
    height: s.height,
    collection: s.collection ? { slug: s.collection.slug, name: s.collection.name } : null,
    tags: s.tags.map((t) => ({ slug: t.tag.slug, name: t.tag.name })),
    createdAt: s.createdAt.toISOString(),
  };
}

// Paginação por cursor (infinite scroll). Ordena por (createdAt desc, id desc); cursor = id.
export async function listScreens(
  f: ScreenFilters,
  opts: { cursor?: string | null; limit?: number; withTotal?: boolean } = {},
): Promise<{ items: ScreenMeta[]; nextCursor: string | null; total?: number }> {
  const limit = Math.min(Math.max(opts.limit ?? 40, 1), 100);
  const where = buildWhere(f);

  const [rows, total] = await Promise.all([
    prisma.screen.findMany({
      where,
      take: limit + 1, // +1 sentinela para saber se há próxima página
      ...(opts.cursor ? { cursor: { id: opts.cursor }, skip: 1 } : {}),
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      include: withRelations,
    }),
    opts.withTotal ? prisma.screen.count({ where }) : Promise.resolve(undefined),
  ]);

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  return {
    items: page.map(toMeta),
    nextCursor: hasMore ? (page[page.length - 1]?.id ?? null) : null,
    ...(opts.withTotal ? { total } : {}),
  };
}
