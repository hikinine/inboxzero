import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, safeEqual, sessionToken } from '@/lib/auth';

// Tudo exige login, menos a tela de login e o link público das maquetes (/m/<slug>).
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/login' || pathname === '/api/login' || pathname.startsWith('/m/')) {
    return NextResponse.next();
  }

  const expected = await sessionToken();
  const got = req.cookies.get(SESSION_COOKIE)?.value ?? '';
  if (expected && safeEqual(got, expected)) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Faça login para continuar.' }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = pathname === '/' ? '' : `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|icon.svg|robots.txt).*)'],
};
