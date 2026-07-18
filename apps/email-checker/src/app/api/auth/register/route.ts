import type { NextRequest } from 'next/server';
import { audit } from '@/lib/audit';
import { hashPassword, setSessionCookie } from '@/lib/auth';
import { SIGNUP_BONUS_CREDITS } from '@/lib/env';
import { apiError, json, requestMeta } from '@/lib/http';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError(400, 'invalid_json', 'JSON inválido.');
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return apiError(400, 'invalid_body', parsed.error.issues[0]?.message ?? 'Dados inválidos.');

  const email = parsed.data.email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) return apiError(409, 'email_taken', 'Já existe uma conta com este e-mail.');

  const user = await prisma.$transaction(async (tx) => {
    const u = await tx.user.create({
      data: {
        email,
        name: parsed.data.name?.trim() || null,
        passwordHash: hashPassword(parsed.data.password),
        credits: SIGNUP_BONUS_CREDITS,
      },
      select: { id: true, email: true, name: true, credits: true },
    });
    await tx.creditLedger.create({
      data: { userId: u.id, delta: SIGNUP_BONUS_CREDITS, balanceAfter: SIGNUP_BONUS_CREDITS, reason: 'signup_bonus' },
    });
    return u;
  });

  await setSessionCookie(user.id);
  const meta = requestMeta(req);
  await audit({ userId: user.id, action: 'auth.register', ip: meta.ip, userAgent: meta.userAgent });

  return json({ user });
}
