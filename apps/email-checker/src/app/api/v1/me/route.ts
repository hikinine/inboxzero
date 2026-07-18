import type { NextRequest } from 'next/server';
import { authenticateApiKey, extractApiKey } from '@/lib/apikey';
import { apiError, corsPreflight, json, withCors } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function OPTIONS() {
  return corsPreflight();
}

// GET /api/v1/me — dados da conta associada à API key (útil para checar saldo de créditos).
export async function GET(req: NextRequest) {
  const key = extractApiKey(req);
  if (!key) return withCors(apiError(401, 'missing_api_key', 'Envie a API key em Authorization: Bearer <key> ou x-api-key.'));

  const auth = await authenticateApiKey(key);
  if (!auth) return withCors(apiError(401, 'invalid_api_key', 'API key inválida ou revogada.'));

  const [totalChecks, user] = await Promise.all([
    prisma.emailCheck.count({ where: { userId: auth.user.id } }),
    prisma.user.findUnique({ where: { id: auth.user.id }, select: { email: true, credits: true, createdAt: true } }),
  ]);

  return withCors(
    json({
      email: user?.email,
      credits: user?.credits ?? 0,
      totalChecks,
      memberSince: user?.createdAt,
    }),
  );
}
