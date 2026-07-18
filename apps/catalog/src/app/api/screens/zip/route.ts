import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildZip } from '@/lib/zip';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/screens/zip  { ids: string[] }  → .zip com os SVGs (por id ou slug)
export async function POST(req: NextRequest) {
  let ids: string[] = [];
  try {
    const body = await req.json();
    ids = Array.isArray(body?.ids) ? body.ids.filter((x: unknown) => typeof x === 'string') : [];
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }
  if (!ids.length) return new Response('Nenhum item', { status: 400 });

  const screens = await prisma.screen.findMany({
    where: { OR: [{ id: { in: ids } }, { slug: { in: ids } }] },
    select: { slug: true, svg: true },
  });
  if (!screens.length) return new Response('Nada encontrado', { status: 404 });

  const files = screens.map((s) => ({ name: `${s.slug}.svg`, data: Buffer.from(s.svg, 'utf8') }));
  const zip = buildZip(files);

  return new Response(new Uint8Array(zip), {
    headers: {
      'content-type': 'application/zip',
      'content-disposition': `attachment; filename="catalogo-${files.length}-svgs.zip"`,
      'cache-control': 'no-store',
    },
  });
}
