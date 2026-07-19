import { prisma } from '@/lib/prisma';
import { CatalogGrid, type Facets } from '@/components/CatalogGrid';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; collection?: string; tag?: string }>;
}) {
  const { q, collection, tag } = await searchParams;

  const [collections, tags, totalScreens] = await Promise.all([
    prisma.collection.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { screens: true } } },
    }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { screens: true } } },
    }),
    prisma.screen.count(),
  ]);

  const facets: Facets = {
    collections: collections.map((c) => ({ slug: c.slug, name: c.name, count: c._count.screens })),
    tags: tags.map((t) => ({ slug: t.slug, name: t.name, count: t._count.screens })),
  };

  return (
    <CatalogGrid
      facets={facets}
      totalScreens={totalScreens}
      initialFilters={{ q: q ?? '', collection: collection ?? '', tag: tag ?? '' }}
    />
  );
}
