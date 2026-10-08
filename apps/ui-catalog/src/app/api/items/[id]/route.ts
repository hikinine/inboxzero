import { NextRequest, NextResponse } from 'next/server';
import { findItem } from '@/lib/items';
import { deleteItemById, updateItemById } from '@/lib/mcp/tools';
import { installCommand } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/items/:id — item completo (id ou slug), incluindo o código.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await findItem(id);
  if (!s) return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
  return NextResponse.json({
    id: s.id,
    slug: s.slug,
    name: s.name,
    description: s.description,
    kind: s.kind,
    status: s.status,
    source: s.source,
    featured: s.featured,
    previewHeight: s.previewHeight,
    category: s.category ? { slug: s.category.slug, name: s.category.name } : null,
    collection: s.collection ? { slug: s.collection.slug, name: s.collection.name } : null,
    tags: s.tags.map((t) => ({ slug: t.tag.slug, name: t.tag.name })),
    dependencies: s.dependencies,
    registryDependencies: s.registryDependencies,
    code: s.code,
    install: installCommand(s.slug),
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  });
}

// DELETE /api/items/:id  (id ou slug)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    return NextResponse.json({ ok: true, ...(await deleteItemById(id)) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Falha ao deletar' }, { status: 404 });
  }
}

// PATCH /api/items/:id — atualização parcial (mesma lógica do MCP update_item).
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }
  try {
    const s = await updateItemById(id, body);
    return NextResponse.json({ ok: true, id: s.id, slug: s.slug, name: s.name, status: s.status });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Falha ao atualizar' }, { status: 400 });
  }
}
