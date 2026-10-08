import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/items/:id/code[?download=1] → o TSX cru (text/plain), opcionalmente como download <slug>.tsx.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.item.findFirst({ where: { OR: [{ id }, { slug: id }] }, select: { slug: true, code: true } });
  if (!item) return new Response('Not found', { status: 404 });
  const download = req.nextUrl.searchParams.get('download') === '1';
  return new Response(item.code, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=60',
      'x-content-type-options': 'nosniff',
      ...(download ? { 'content-disposition': `attachment; filename="${item.slug}.tsx"` } : {}),
    },
  });
}
