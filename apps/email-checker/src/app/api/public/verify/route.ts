import type { NextRequest } from 'next/server';
import { audit } from '@/lib/audit';
import { verifyEmails } from '@/lib/checker';
import { apiError, json, requestMeta } from '@/lib/http';
import { rateLimit } from '@/lib/ratelimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/public/verify — checagem grátis, SEM auth (demo da landing).
// Aceita { email, mx?, smtp? }. Não consome créditos e não grava em EmailCheck (só AuditLog).
// Rate-limit por IP; SMTP tem um teto próprio, mais apertado (protege a reputação do nosso IP).
export async function POST(req: NextRequest) {
  const { ip, userAgent } = requestMeta(req);
  const rl = rateLimit(`pub:${ip ?? 'unknown'}`, 20, 10 * 60 * 1000);
  if (!rl.ok) {
    return apiError(429, 'rate_limited', 'Muitas verificações deste IP. Crie uma conta para checar mais.', {
      retryAfterSeconds: Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000)),
    });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return apiError(400, 'invalid_json', 'JSON inválido.');
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!email || email.length > 320) return apiError(400, 'invalid_body', 'Informe um e-mail.');

  const mx = body?.mx !== false; // default ligado
  const smtp = body?.smtp === true;

  if (smtp) {
    const rls = rateLimit(`pub-smtp:${ip ?? 'unknown'}`, 8, 10 * 60 * 1000);
    if (!rls.ok) {
      return apiError(429, 'smtp_rate_limited', 'Limite de verificações de caixa (SMTP) deste IP. Crie uma conta para continuar.', {
        retryAfterSeconds: Math.max(1, Math.ceil((rls.resetAt - Date.now()) / 1000)),
      });
    }
  }

  const t0 = Date.now();
  const [o] = await verifyEmails([email], { mx, smtp });
  const durationMs = Date.now() - t0;

  await audit({ action: 'public.check', ip, userAgent, detail: { status: o.status, mx, smtp } });

  // Metadados completos (mesmo shape da API autenticada, sem créditos).
  return json({
    email: o.email,
    status: o.status,
    isValid: o.isValid,
    isDisposable: o.isDisposable,
    domain: o.domain,
    confidence: o.confidence,
    reason: o.reason,
    mxChecked: o.mxChecked,
    hasMx: o.hasMx,
    smtpProvider: o.smtpProvider,
    smtpChecked: o.smtpChecked,
    mailbox: o.mailbox,
    method: o.method,
    durationMs,
  });
}
