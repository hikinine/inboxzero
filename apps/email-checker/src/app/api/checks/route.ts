import type { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { apiError, json } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/checks?cursor=&q=&filter=  — histórico paginado (cursor) das checagens do usuário.
export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const q = searchParams.get('q')?.trim();
  const filter = searchParams.get('filter'); // disposable | invalid | valid
  const take = 30;

  const where: any = { userId: user.id };
  if (q) where.email = { contains: q, mode: 'insensitive' };
  if (filter === 'disposable') where.isDisposable = true;
  else if (filter === 'invalid') where.isValid = false;
  else if (filter === 'valid') where.AND = [{ isValid: true }, { isDisposable: false }];

  const rows = await prisma.emailCheck.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true,
      email: true,
      domain: true,
      isValid: true,
      isDisposable: true,
      confidence: true,
      reason: true,
      source: true,
      mxChecked: true,
      hasMx: true,
      createdAt: true,
    },
  });

  const hasMore = rows.length > take;
  const items = hasMore ? rows.slice(0, take) : rows;
  return json({ items, nextCursor: hasMore ? items[items.length - 1]?.id : null });
}
