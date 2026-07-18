import type { NextRequest } from 'next/server';
import { audit } from '@/lib/audit';
import { generateApiKey } from '@/lib/apikey';
import { getSessionUser } from '@/lib/auth';
import { apiError, json, requestMeta } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { createKeySchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/keys — lista as chaves do usuário (sem expor a chave em claro).
export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  const keys = await prisma.apiKey.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, prefix: true, last4: true, revokedAt: true, lastUsedAt: true, createdAt: true },
  });
  return json({ keys });
}

// POST /api/keys — cria uma chave. A chave completa é retornada UMA única vez.
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError(400, 'invalid_json', 'JSON inválido.');
  }
  const parsed = createKeySchema.safeParse(body);
  if (!parsed.success) return apiError(400, 'invalid_body', 'Nome da chave é obrigatório.');

  const gen = generateApiKey();
  const key = await prisma.apiKey.create({
    data: {
      userId: user.id,
      name: parsed.data.name.trim(),
      prefix: gen.prefix,
      last4: gen.last4,
      keyHash: gen.keyHash,
    },
    select: { id: true, name: true, prefix: true, last4: true, createdAt: true },
  });

  const meta = requestMeta(req);
  await audit({ userId: user.id, apiKeyId: key.id, action: 'key.create', detail: { name: key.name }, ip: meta.ip, userAgent: meta.userAgent });

  // `secret` só aqui — não é possível recuperá-la depois.
  return json({ key: { ...key, secret: gen.full } });
}
