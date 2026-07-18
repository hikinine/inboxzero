import type { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { apiError, json } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/audit?cursor= — trilha de auditoria paginada da conta.
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const take = 40;

  const rows = await prisma.auditLog.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: { id: true, action: true, detail: true, ip: true, createdAt: true },
  });

  const hasMore = rows.length > take;
  const items = hasMore ? rows.slice(0, take) : rows;
  return json({ items, nextCursor: hasMore ? items[items.length - 1]?.id : null });
}
