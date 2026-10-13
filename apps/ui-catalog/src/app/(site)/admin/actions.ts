'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, tokenMatches } from '@/lib/admin';

export type AdminState = { error?: string };

export async function loginAction(_prev: AdminState, formData: FormData): Promise<AdminState> {
  const token = String(formData.get('token') ?? '').trim();
  const next = String(formData.get('next') ?? '/');
  if (!tokenMatches(token)) return { error: 'Token inválido.' };
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 180,
  });
  redirect(next.startsWith('/') ? next : '/');
}

export async function logoutAction(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect('/');
}
