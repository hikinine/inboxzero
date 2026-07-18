import { NextRequest, NextResponse } from 'next/server';
import { deleteScreenById, updateScreenById } from '@/lib/mcp/tools';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// DELETE /api/screens/:id  (id ou slug)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const r = await deleteScreenById(id);
    return NextResponse.json({ ok: true, ...r });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Falha ao deletar' }, { status: 404 });
  }
}

// PATCH /api/screens/:id  — atualização parcial (mesma lógica do MCP update_screen).
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  try {
    const s = await updateScreenById(id, body);
    return NextResponse.json({ ok: true, id: s.id, slug: s.slug, name: s.name, status: s.status });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Falha ao atualizar' }, { status: 400 });
  }
}
