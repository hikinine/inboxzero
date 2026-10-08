import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildZip } from '@/lib/zip';
import { registryFilePath } from '@/lib/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/items/zip  { ids: string[] }  → .zip com os .tsx (por id ou slug), no layout do registry.
export async function POST(req: NextRequest) {
  let ids: string[] = [];
  try {
    const body = await req.json();
    ids = Array.isArray(body?.ids) ? body.ids.filter((x: unknown) => typeof x === 'string') : [];
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }
  if (!ids.length) return new Response('Nenhum item', { status: 400 });

  const items = await prisma.item.findMany({
    where: { OR: [{ id: { in: ids } }, { slug: { in: ids } }] },
    select: { slug: true, kind: true, code: true },
  });
  if (!items.length) return new Response('Nada encontrado', { status: 404 });

  const files = items.map((s) => ({ name: registryFilePath(s), data: Buffer.from(s.code, 'utf8') }));
  return new Response(new Uint8Array(buildZip(files)), {
    headers: {
      'content-type': 'application/zip',
      'content-disposition': `attachment; filename="ui-catalog-${files.length}-itens.zip"`,
      'cache-control': 'no-store',
    },
  });
}
