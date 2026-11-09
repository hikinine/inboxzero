import { SESSION_COOKIE, SESSION_MAX_AGE, safeEqual, sessionToken } from '@/lib/auth';

export const runtime = 'nodejs';

// Atraso fixo em toda tentativa: deixa adivinhar a senha lento sem precisar guardar estado.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { password?: string } | null;
  await sleep(600);
  const password = process.env.APP_PASSWORD;
  const token = await sessionToken();
  if (!password || !token) {
    return Response.json({ error: 'O acesso ainda não foi configurado no servidor.' }, { status: 503 });
  }
  if (!body?.password || !safeEqual(body.password, password)) {
    return Response.json({ error: 'Senha incorreta.' }, { status: 401 });
  }
  const secure = new URL(req.url).protocol === 'https:' || req.headers.get('x-forwarded-proto') === 'https';
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}${secure ? '; Secure' : ''}`,
    },
  });
}
