import { db } from '@/lib/db';

export const runtime = 'nodejs';

// Maquete pública. O HTML é escrito pelo modelo, então roda com `sandbox` (origem opaca: sem acesso aos
// cookies nem à API do app) e com rede travada nos CDNs que o prompt permite.
const CSP = [
  'sandbox allow-scripts allow-popups',
  "default-src 'none'",
  "script-src 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
  "style-src 'unsafe-inline' https://fonts.googleapis.com",
  'font-src https://fonts.gstatic.com',
  'img-src data: blob:',
  "connect-src 'none'",
].join('; ');

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mockup = await db.mockup.findUnique({ where: { slug }, select: { html: true, version: true } });
  if (!mockup) return new Response('Maquete não encontrada', { status: 404 });

  const download = new URL(req.url).searchParams.has('download');
  return new Response(mockup.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': CSP,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Cache-Control': 'public, max-age=300',
      ...(download ? { 'Content-Disposition': `attachment; filename="maquete-v${mockup.version}.html"` } : {}),
    },
  });
}
