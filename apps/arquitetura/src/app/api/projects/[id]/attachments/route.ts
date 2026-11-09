import { db } from '@/lib/db';

export const runtime = 'nodejs';

// Limites da API da Anthropic: imagem até 5 MB (o navegador já reduz as fotos antes de enviar) e PDF até 32 MB
// por pedido inteiro. 12 MB por PDF deixa folga para mais de um documento na mesma conversa.
const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_PDF = 12 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']);

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id }, select: { id: true } });
  if (!project) return Response.json({ error: 'Projeto não encontrado.' }, { status: 404 });

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return Response.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
  if (!ALLOWED.has(file.type)) {
    return Response.json({ error: 'Envie foto (JPG, PNG, WebP) ou PDF.' }, { status: 415 });
  }
  const limit = file.type === 'application/pdf' ? MAX_PDF : MAX_IMAGE;
  if (file.size > limit) {
    return Response.json(
      { error: `Arquivo grande demais (máximo ${Math.round(limit / 1024 / 1024)} MB).` },
      { status: 413 },
    );
  }

  const data = Buffer.from(await file.arrayBuffer());
  const att = await db.attachment.create({
    data: { projectId: id, name: file.name.slice(0, 120) || 'arquivo', mediaType: file.type, data },
    select: { id: true, name: true, mediaType: true },
  });
  return Response.json(att, { status: 201 });
}
