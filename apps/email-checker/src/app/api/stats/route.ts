import { getSessionUser } from '@/lib/auth';
import { apiError, json } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/stats — visão geral da conta para o dashboard.
export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  const [total, disposable, invalid, deliverable, activeKeys, fresh] = await Promise.all([
    prisma.emailCheck.count({ where: { userId: user.id } }),
    prisma.emailCheck.count({ where: { userId: user.id, isDisposable: true } }),
    prisma.emailCheck.count({ where: { userId: user.id, isValid: false } }),
    prisma.emailCheck.count({ where: { userId: user.id, isValid: true, isDisposable: false } }),
    prisma.apiKey.count({ where: { userId: user.id, revokedAt: null } }),
    prisma.user.findUnique({ where: { id: user.id }, select: { credits: true } }),
  ]);

  return json({
    credits: fresh?.credits ?? user.credits,
    totalChecks: total,
    disposableChecks: disposable,
    invalidChecks: invalid,
    deliverableChecks: deliverable,
    activeKeys,
  });
}
