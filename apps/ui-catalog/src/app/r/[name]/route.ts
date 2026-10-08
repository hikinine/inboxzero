import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registryItem } from '@/lib/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /r/<slug>.json → item no formato registry-item do shadcn (npx shadcn add <url>).
export async function GET(_req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const slug = name.replace(/\.json$/i, '');
  const item = await prisma.item.findFirst({ where: { OR: [{ slug }, { id: slug }] } });
  if (!item) return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
  return NextResponse.json(registryItem(item), {
    headers: { 'cache-control': 'public, max-age=60', 'access-control-allow-origin': '*' },
  });
}
