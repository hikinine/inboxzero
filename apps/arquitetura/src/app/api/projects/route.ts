import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await db.project.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, title: true, updatedAt: true, _count: { select: { mockups: true } } },
  });
  return Response.json(
    projects.map((p) => ({ id: p.id, title: p.title, updatedAt: p.updatedAt, versions: p._count.mockups })),
  );
}

export async function POST() {
  const project = await db.project.create({ data: {} });
  return Response.json({ id: project.id }, { status: 201 });
}
