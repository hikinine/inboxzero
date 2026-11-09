import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const att = await db.attachment.findUnique({ where: { id } });
  if (!att) return new Response('Não encontrado', { status: 404 });
  return new Response(new Uint8Array(att.data), {
    headers: {
      'Content-Type': att.mediaType,
      'Content-Disposition': `inline; filename="${encodeURIComponent(att.name)}"`,
      'Cache-Control': 'private, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
