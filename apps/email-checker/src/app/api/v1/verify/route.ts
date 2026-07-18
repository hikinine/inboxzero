import type { NextRequest } from 'next/server';
import { authenticateApiKey, extractApiKey } from '@/lib/apikey';
import { apiError, corsPreflight, requestMeta, withCors } from '@/lib/http';
import { json } from '@/lib/http';
import { InsufficientCreditsError, runVerification } from '@/lib/verify-service';
import { verifySchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function OPTIONS() {
  return corsPreflight();
}

// POST /api/v1/verify — valida um e-mail (single) ou vários (batch). Auth: Bearer <api key> | x-api-key.
export async function POST(req: NextRequest) {
  const key = extractApiKey(req);
  if (!key) return withCors(apiError(401, 'missing_api_key', 'Envie a API key em Authorization: Bearer <key> ou x-api-key.'));

  const auth = await authenticateApiKey(key);
  if (!auth) return withCors(apiError(401, 'invalid_api_key', 'API key inválida ou revogada.'));

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return withCors(apiError(400, 'invalid_json', 'Corpo da requisição não é um JSON válido.'));
  }

  const parsed = verifySchema.safeParse(body);
  if (!parsed.success) {
    return withCors(apiError(400, 'invalid_body', parsed.error.issues[0]?.message ?? 'Corpo inválido.'));
  }

  const single = typeof parsed.data.email === 'string';
  const emails = single ? [parsed.data.email as string] : (parsed.data.emails as string[]);
  const meta = requestMeta(req);

  try {
    const { results, summary } = await runVerification({
      userId: auth.user.id,
      apiKeyId: auth.apiKeyId,
      source: 'API',
      emails,
      mx: parsed.data.mx,
      smtp: parsed.data.smtp,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });

    if (single) {
      return withCors(json({ ...results[0], creditsRemaining: summary.creditsRemaining }));
    }
    return withCors(json({ results, summary }));
  } catch (err) {
    if (err instanceof InsufficientCreditsError) {
      return withCors(
        apiError(402, 'insufficient_credits', 'Créditos insuficientes para esta requisição.', {
          balance: err.balance,
          required: err.required,
        }),
      );
    }
    console.error('[verify] erro:', err);
    return withCors(apiError(500, 'internal_error', 'Falha ao processar a validação.'));
  }
}
