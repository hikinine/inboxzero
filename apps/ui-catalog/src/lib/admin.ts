import { timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

// Acesso de escrita (publicar, editar, excluir) = mesmo token do MCP (UI_CATALOG_MCP_TOKEN).
// Na UI ele fica num cookie httpOnly definido em /admin; nas APIs também vale "Authorization: Bearer".
export const ADMIN_COOKIE = 'ui_admin';

function matches(value: string | undefined | null): boolean {
  const expected = process.env.UI_CATALOG_MCP_TOKEN;
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return matches(jar.get(ADMIN_COOKIE)?.value);
}

// Para route handlers: cookie de admin ou Bearer token.
export async function isAuthorizedRequest(req: Request): Promise<boolean> {
  const bearer = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (matches(bearer)) return true;
  return isAdmin();
}

export function tokenMatches(value: string): boolean {
  return matches(value);
}
