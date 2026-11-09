import { db } from '@/lib/db';
import type { StoredBlock } from '@/lib/blocks';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: 'asc' }, select: { id: true, role: true, blocks: true, createdAt: true } },
      mockups: { orderBy: { version: 'asc' }, select: { version: true, slug: true, createdAt: true } },
    },
  });
  if (!project) return Response.json({ error: 'Projeto não encontrado.' }, { status: 404 });

  const generating =
    project.generatingSince !== null && Date.now() - project.generatingSince.getTime() < 25 * 60 * 1000;
  return Response.json({
    id: project.id,
    title: project.title,
    generating,
    mockups: project.mockups,
    messages: project.messages.map((m) => ({ ...m, blocks: m.blocks as StoredBlock[] })),
  });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = (await req.json().catch(() => null)) as { title?: string } | null;
  const title = body?.title?.trim().slice(0, 80);
  if (!title) return Response.json({ error: 'Informe um nome.' }, { status: 400 });
  await db.project.update({ where: { id }, data: { title } });
  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  await db.project.delete({ where: { id } }).catch(() => null);
  return Response.json({ ok: true });
}
