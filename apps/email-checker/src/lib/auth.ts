import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { AUTH_SECRET, requireAuthSecret } from './env';
import { prisma } from './prisma';

export const SESSION_COOKIE = 'ec_session';
const SESSION_TTL_DAYS = 30;

// ---- Password hashing (scrypt) ----------------------------------------------

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const salt = Buffer.from(parts[1], 'hex');
  const expected = Buffer.from(parts[2], 'hex');
  const derived = scryptSync(password, salt, expected.length);
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

// ---- Session token (HMAC-signed) --------------------------------------------

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromB64url(s: string): Buffer {
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

export function signSession(userId: string): { token: string; expires: Date } {
  const secret = requireAuthSecret();
  const exp = Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
  const payload = b64url(Buffer.from(JSON.stringify({ uid: userId, exp }), 'utf8'));
  const sig = b64url(createHmac('sha256', secret).update(payload).digest());
  return { token: `${payload}.${sig}`, expires: new Date(exp) };
}

export function verifySession(token: string | undefined): { uid: string } | null {
  if (!token || !AUTH_SECRET) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = createHmac('sha256', AUTH_SECRET).update(payload).digest();
  const got = fromB64url(sig);
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return null;
  try {
    const data = JSON.parse(fromB64url(payload).toString('utf8')) as { uid: string; exp: number };
    if (!data.uid || !data.exp || Date.now() > data.exp) return null;
    return { uid: data.uid };
  } catch {
    return null;
  }
}

// ---- Cookie helpers (Next 15: cookies() é assíncrono) -----------------------

export async function setSessionCookie(userId: string): Promise<void> {
  const { token, expires } = signSession(userId);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  credits: number;
};

// Lê a sessão do cookie e carrega o usuário. Retorna null se não autenticado.
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.uid },
    select: { id: true, email: true, name: true, credits: true },
  });
  return user;
}
