import { NextRequest, NextResponse } from 'next/server';
import { ItemKind } from '@prisma/client';
import { getFacets } from '@/lib/items';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/facets?kind= → categorias (do tipo), coleções e tags com contagens.
export async function GET(req: NextRequest) {
  const k = req.nextUrl.searchParams.get('kind');
  const kind = k && (Object.values(ItemKind) as string[]).includes(k) ? (k as ItemKind) : undefined;
  return NextResponse.json(await getFacets(kind));
}
