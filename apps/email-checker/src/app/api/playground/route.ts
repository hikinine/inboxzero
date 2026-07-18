import type { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { apiError, json, requestMeta } from '@/lib/http';
import { InsufficientCreditsError, runVerification } from '@/lib/verify-service';
import { verifySchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/playground — mesma verificação da API pública, mas via sessão (para testar no dashboard).
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return apiError(401, 'unauthorized', 'Faça login.');

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError(400, 'invalid_json', 'JSON inválido.');
  }
  const parsed = verifySchema.safeParse(body);
  if (!parsed.success) return apiError(400, 'invalid_body', parsed.error.issues[0]?.message ?? 'Corpo inválido.');

  const single = typeof parsed.data.email === 'string';
  const emails = single ? [parsed.data.email as string] : (parsed.data.emails as string[]);
  const meta = requestMeta(req);

  try {
    const { results, summary } = await runVerification({
      userId: user.id,
      apiKeyId: null,
      source: 'DASHBOARD',
      emails,
      mx: parsed.data.mx,
      smtp: parsed.data.smtp,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });
    return json({ results, summary });
  } catch (err) {
    if (err instanceof InsufficientCreditsError) {
      return apiError(402, 'insufficient_credits', 'Créditos insuficientes.', { balance: err.balance, required: err.required });
    }
    console.error('[playground] erro:', err);
    return apiError(500, 'internal_error', 'Falha ao validar.');
  }
}
