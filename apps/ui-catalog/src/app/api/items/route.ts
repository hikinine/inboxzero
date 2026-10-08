import { NextRequest, NextResponse } from 'next/server';
import { ItemKind, ItemStatus } from '@prisma/client';
import { listItems } from '@/lib/items';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inEnum = <T extends string>(vals: readonly T[], v: string | null): T | undefined =>
  v && (vals as readonly string[]).includes(v) ? (v as T) : undefined;

// GET /api/items?q=&kind=&category=&collection=&tag=&status=&featured=&ids=&cursor=&limit=&withTotal=1
// Listagem paginada por cursor (infinite scroll). Retorna metadados (sem código).
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const featuredRaw = sp.get('featured');
  const ids = sp.get('ids')?.split(',').map((s) => s.trim()).filter(Boolean);
  const result = await listItems(
    {
      q: sp.get('q') ?? undefined,
      kind: inEnum(Object.values(ItemKind), sp.get('kind')),
      category: sp.get('category') ?? undefined,
      collection: sp.get('collection') ?? undefined,
      tag: sp.get('tag') ?? undefined,
      status: inEnum(Object.values(ItemStatus), sp.get('status')) ?? (ids?.length ? undefined : 'PUBLISHED'),
      featured: featuredRaw === '1' ? true : featuredRaw === '0' ? false : undefined,
      ids: ids?.length ? ids : undefined,
    },
    {
      cursor: sp.get('cursor') ?? undefined,
      limit: sp.get('limit') ? Number(sp.get('limit')) : undefined,
      withTotal: sp.get('withTotal') === '1',
    },
  );
  return NextResponse.json(result);
}
