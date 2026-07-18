import { createHash, randomBytes } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { prisma } from './prisma';

const PREFIX = 'ek';

export type GeneratedKey = {
  full: string; // mostrada UMA vez ao usuário
  prefix: string; // ek_a1b2c3d4 (exibível)
  last4: string;
  keyHash: string; // sha256(full)
};

export function generateApiKey(): GeneratedKey {
  const body = randomBytes(24).toString('hex'); // 48 hex chars
  const full = `${PREFIX}_${body}`;
  return {
    full,
    prefix: `${PREFIX}_${body.slice(0, 8)}`,
    last4: body.slice(-4),
    keyHash: sha256(full),
  };
}

export function sha256(s: string): string {
  return createHash('sha256').update(s).digest('hex');
}

// Extrai a chave do header Authorization: Bearer <key> ou x-api-key.
export function extractApiKey(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7).trim();
  const x = req.headers.get('x-api-key');
  if (x) return x.trim();
  return null;
}

export type AuthenticatedKey = {
  apiKeyId: string;
  user: { id: string; email: string; credits: number };
};

// Valida a chave: hash → lookup por keyHash (único) → não revogada. Atualiza lastUsedAt.
export async function authenticateApiKey(key: string): Promise<AuthenticatedKey | null> {
  if (!key || !key.startsWith(`${PREFIX}_`)) return null;
  const record = await prisma.apiKey.findUnique({
    where: { keyHash: sha256(key) },
    select: {
      id: true,
      revokedAt: true,
      user: { select: { id: true, email: true, credits: true } },
    },
  });
  if (!record || record.revokedAt) return null;

  // Best-effort: registra uso sem bloquear a resposta.
  prisma.apiKey.update({ where: { id: record.id }, data: { lastUsedAt: new Date() } }).catch(() => {});

  return { apiKeyId: record.id, user: record.user };
}
