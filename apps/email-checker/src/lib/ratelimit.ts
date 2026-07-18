// Rate limiter simples em memória (janela fixa). Suficiente p/ 1 réplica do container.
type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();

  // Poda preguiçosa p/ o Map não crescer sem limite.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now >= v.resetAt) buckets.delete(k);
  }

  const e = buckets.get(key);
  if (!e || now >= e.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  if (e.count >= limit) return { ok: false, remaining: 0, resetAt: e.resetAt };
  e.count += 1;
  return { ok: true, remaining: limit - e.count, resetAt: e.resetAt };
}
