import type { NextRequest } from 'next/server';
import { audit } from '@/lib/audit';
import { setSessionCookie, verifyPassword } from '@/lib/auth';
import { apiError, json, requestMeta } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError(400, 'invalid_json', 'JSON inválido.');
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return apiError(400, 'invalid_body', 'Dados inválidos.');

  const email = parsed.data.email.toLowerCase().trim();
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, credits: true, passwordHash: true },
  });

  // Mensagem genérica para não revelar se o e-mail existe.
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return apiError(401, 'invalid_credentials', 'E-mail ou senha incorretos.');
  }

  await setSessionCookie(user.id);
  const meta = requestMeta(req);
  await audit({ userId: user.id, action: 'auth.login', ip: meta.ip, userAgent: meta.userAgent });

  return json({ user: { id: user.id, email: user.email, name: user.name, credits: user.credits } });
}
