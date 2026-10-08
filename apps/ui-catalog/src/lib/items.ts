import { ItemKind, ItemStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface ItemFilters {
  q?: string;
  kind?: ItemKind;
  category?: string; // slug
  collection?: string; // slug
  tag?: string; // slug
  status?: ItemStatus;
  featured?: boolean;
  ids?: string[]; // id ou slug
  uncategorized?: boolean; // só itens sem categoria
}

export interface ItemMeta {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  kind: ItemKind;
  status: ItemStatus;
  source: string;
  featured: boolean;
  previewHeight: number | null;
  dependencies: string[];
  registryDependencies: string[];
  category: { slug: string; name: string } | null;
  collection: { slug: string; name: string } | null;
  tags: Array<{ slug: string; name: string }>;
  createdAt: string;
  updatedAt: string;
}

// Cláusula WHERE compartilhada entre a UI (rota /api/items) e o MCP (search_items).
export function buildWhere(f: ItemFilters): Prisma.ItemWhereInput {
  const where: Prisma.ItemWhereInput = {};
  if (f.status) where.status = f.status;
  if (f.kind) where.kind = f.kind;
  if (f.featured !== undefined) where.featured = f.featured;
  if (f.q) {
    where.OR = [
      { name: { contains: f.q, mode: 'insensitive' } },
      { description: { contains: f.q, mode: 'insensitive' } },
      { slug: { contains: f.q, mode: 'insensitive' } },
      { tags: { some: { tag: { name: { contains: f.q, mode: 'insensitive' } } } } },
      { category: { name: { contains: f.q, mode: 'insensitive' } } },
    ];
  }
  if (f.category) where.category = { slug: f.category };
  if (f.uncategorized) where.categoryId = null;
  if (f.collection) where.collection = { slug: f.collection };
  if (f.tag) where.tags = { some: { tag: { slug: f.tag } } };
  if (f.ids?.length) where.AND = [{ OR: [{ id: { in: f.ids } }, { slug: { in: f.ids } }] }];
  return where;
}

// Seleção sem o `code` (que pode ter dezenas de KB) — listagens ficam leves.
export const metaSelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  kind: true,
  status: true,
  source: true,
  featured: true,
  previewHeight: true,
  dependencies: true,
  registryDependencies: true,
  createdAt: true,
  updatedAt: true,
  category: { select: { slug: true, name: true } },
  collection: { select: { slug: true, name: true } },
  tags: { select: { tag: { select: { slug: true, name: true } } } },
} satisfies Prisma.ItemSelect;

type ItemRow = Prisma.ItemGetPayload<{ select: typeof metaSelect }>;

export function toMeta(s: ItemRow): ItemMeta {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    kind: s.kind,
    status: s.status,
    source: s.source,
    featured: s.featured,
    previewHeight: s.previewHeight,
    dependencies: s.dependencies,
    registryDependencies: s.registryDependencies,
    category: s.category ? { slug: s.category.slug, name: s.category.name } : null,
    collection: s.collection ? { slug: s.collection.slug, name: s.collection.name } : null,
    tags: s.tags.map((t) => ({ slug: t.tag.slug, name: t.tag.name })),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  };
}

// Paginação por cursor (infinite scroll). Ordena por (featured desc, createdAt desc, id desc); cursor = id.
export async function listItems(
  f: ItemFilters,
  opts: { cursor?: string | null; limit?: number; withTotal?: boolean } = {},
): Promise<{ items: ItemMeta[]; nextCursor: string | null; total?: number }> {
  const limit = Math.min(Math.max(opts.limit ?? 24, 1), 100);
  const where = buildWhere(f);

  const [rows, total] = await Promise.all([
    prisma.item.findMany({
      where,
      take: limit + 1, // +1 sentinela para saber se há próxima página
      ...(opts.cursor ? { cursor: { id: opts.cursor }, skip: 1 } : {}),
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
      select: metaSelect,
    }),
    opts.withTotal ? prisma.item.count({ where }) : Promise.resolve(undefined),
  ]);

  const hasMore = rows.length > limit;
  const page = hasMore ? rows.slice(0, limit) : rows;
  return {
    items: page.map(toMeta),
    nextCursor: hasMore ? (page[page.length - 1]?.id ?? null) : null,
    ...(opts.withTotal ? { total } : {}),
  };
}

export interface Facet {
  slug: string;
  name: string;
  count: number;
  description?: string | null;
  kind?: ItemKind;
}
export interface Facets {
  categories: Facet[];
  collections: Facet[];
  tags: Facet[];
}

// Facetas para filtros/abas. `kind` restringe categorias (e contagens) àquele tipo.
export async function getFacets(kind?: ItemKind, status: ItemStatus = 'PUBLISHED'): Promise<Facets> {
  const itemWhere: Prisma.ItemWhereInput = { status, ...(kind ? { kind } : {}) };
  const [categories, collections, tags] = await Promise.all([
    prisma.category.findMany({
      where: kind ? { kind } : {},
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { items: { where: itemWhere } } } },
    }),
    prisma.collection.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { items: { where: itemWhere } } } },
    }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { items: { where: { item: itemWhere } } } } },
    }),
  ]);
  return {
    categories: categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      kind: c.kind,
      count: c._count.items,
    })),
    collections: collections.map((c) => ({ slug: c.slug, name: c.name, description: c.description, count: c._count.items })),
    tags: tags.map((t) => ({ slug: t.slug, name: t.name, count: t._count.items })).filter((t) => t.count > 0),
  };
}

export interface Stats {
  total: number;
  byKind: Record<ItemKind, number>;
  categories: number;
  collections: number;
  tags: number;
}

export async function getStats(): Promise<Stats> {
  const [grouped, categories, collections, tags] = await Promise.all([
    prisma.item.groupBy({ by: ['kind'], where: { status: 'PUBLISHED' }, _count: { _all: true } }),
    prisma.category.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);
  const byKind: Record<ItemKind, number> = { BLOCK: 0, COMPONENT: 0, ILLUSTRATION: 0, PAGE: 0 };
  for (const g of grouped) byKind[g.kind] = g._count._all;
  const total = Object.values(byKind).reduce((a, b) => a + b, 0);
  return { total, byKind, categories, collections, tags };
}

// Item completo (com código) por id ou slug.
export async function findItem(idOrSlug: string) {
  return prisma.item.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: { category: true, collection: true, tags: { include: { tag: true } } },
  });
}
