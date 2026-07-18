import { NextRequest, NextResponse } from 'next/server';
import { ScreenStatus } from '@prisma/client';
import { listScreens } from '@/lib/screens';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/screens?q=&collection=&tag=&status=&cursor=&limit=
// Listagem paginada por cursor (infinite scroll). Retorna metadados (sem SVG).
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const statusRaw = sp.get('status');
  const status =
    statusRaw && (Object.values(ScreenStatus) as string[]).includes(statusRaw)
      ? (statusRaw as ScreenStatus)
      : undefined;

  const result = await listScreens(
    {
      q: sp.get('q') ?? undefined,
      collection: sp.get('collection') ?? undefined,
      tag: sp.get('tag') ?? undefined,
      status,
    },
    {
      cursor: sp.get('cursor') ?? undefined,
      limit: sp.get('limit') ? Number(sp.get('limit')) : undefined,
      withTotal: sp.get('withTotal') === '1',
    },
  );

  return NextResponse.json(result);
}
