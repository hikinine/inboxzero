import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/screens/:id/raw  → o SVG cru (image/svg+xml), para previews via <img>.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const screen = await prisma.screen.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    select: { svg: true },
  });
  if (!screen) return new Response('Not found', { status: 404 });

  return new Response(screen.svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=60',
      // Defesa: bloqueia scripts/recursos externos caso o SVG seja aberto direto no navegador.
      'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      'x-content-type-options': 'nosniff',
    },
  });
}
