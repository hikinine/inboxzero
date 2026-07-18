import type { NextRequest } from 'next/server';
import { audit } from '@/lib/audit';
import { getSessionUser } from '@/lib/auth';
import { apiError, json, requestMeta } from '@/lib/http';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/keys/:id/revoke — revoga uma chave (idempotente).
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  const { id } = await params;
  const key = await prisma.apiKey.findFirst({ where: { id, userId: user.id }, select: { id: true, revokedAt: true } });
  if (!key) return apiError(404, 'not_found', 'Chave não encontrada.');

  if (!key.revokedAt) {
    await prisma.apiKey.update({ where: { id: key.id }, data: { revokedAt: new Date() } });
    const meta = requestMeta(req);
    await audit({ userId: user.id, apiKeyId: key.id, action: 'key.revoke', ip: meta.ip, userAgent: meta.userAgent });
  }
  return json({ ok: true });
}
