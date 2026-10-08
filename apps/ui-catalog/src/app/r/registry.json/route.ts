import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registryIndex } from '@/lib/registry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /r/registry.json → índice do registry (todos os itens publicados).
export async function GET() {
  const items = await prisma.item.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ kind: 'asc' }, { name: 'asc' }],
    select: { kind: true, slug: true, name: true, description: true },
  });
  return NextResponse.json(registryIndex(items), { headers: { 'cache-control': 'public, max-age=60' } });
}
