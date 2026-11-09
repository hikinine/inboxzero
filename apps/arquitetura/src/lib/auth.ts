// Acesso por senha única (APP_PASSWORD): o app é pessoal e cada mensagem gasta a chave da Anthropic.
// O cookie guarda um hash da senha com AUTH_SECRET; trocar qualquer um dos dois derruba as sessões.
// Usa só Web Crypto para rodar igual no middleware (edge) e nas rotas (node).

export const SESSION_COOKIE = 'arq_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 60; // 60 dias

export async function sessionToken(): Promise<string | null> {
  const password = process.env.APP_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!password || !secret) return null;
  const bytes = new TextEncoder().encode(`${secret}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
