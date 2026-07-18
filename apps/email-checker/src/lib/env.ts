// Configuração central lida de variáveis de ambiente (com defaults sensatos).

export const AUTH_SECRET = process.env.AUTH_SECRET ?? '';

export const SIGNUP_BONUS_CREDITS = Number.parseInt(process.env.SIGNUP_BONUS_CREDITS ?? '500', 10) || 500;

// Limite de e-mails por requisição em batch (proteção de custo/latência).
export const MAX_BATCH_SIZE = Number.parseInt(process.env.MAX_BATCH_SIZE ?? '1000', 10) || 1000;

// Exigido só em runtime (ao assinar/validar sessão) — nunca no import/build, senão o
// `next build` quebra quando o .env não está presente (ex.: imagem Docker).
export function requireAuthSecret(): string {
  if (!AUTH_SECRET) throw new Error('AUTH_SECRET não configurado — defina no ambiente.');
  return AUTH_SECRET;
}
