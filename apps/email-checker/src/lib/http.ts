import { NextResponse } from 'next/server';

export function json(data: unknown, init?: ResponseInit): NextResponse {
  return NextResponse.json(data, init);
}

export function apiError(status: number, code: string, message: string, extra?: Record<string, unknown>): NextResponse {
  return NextResponse.json({ error: { code, message, ...extra } }, { status });
}

// CORS liberado para a API pública (consumida server-to-server por qualquer origem).
export const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  'Access-Control-Max-Age': '86400',
};

export function withCors(res: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(CORS_HEADERS)) res.headers.set(k, v);
  return res;
}

export function corsPreflight(): NextResponse {
  return withCors(new NextResponse(null, { status: 204 }));
}

// Extrai IP e user-agent para a trilha de auditoria.
export function requestMeta(req: Request): { ip: string | null; userAgent: string | null } {
  const fwd = req.headers.get('x-forwarded-for');
  const ip = fwd ? fwd.split(',')[0].trim() : req.headers.get('x-real-ip');
  return { ip: ip || null, userAgent: req.headers.get('user-agent') || null };
}
