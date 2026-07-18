'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Row = {
  id: string;
  action: string;
  detail: Record<string, unknown> | null;
  ip: string | null;
  createdAt: string;
};

const LABELS: Record<string, string> = {
  'auth.register': 'Conta criada',
  'auth.login': 'Login',
  'key.create': 'Chave criada',
  'key.revoke': 'Chave revogada',
  'check.single': 'Checagem (single)',
  'check.batch': 'Checagem (batch)',
};

export function AuditTable() {
  const [items, setItems] = useState<Row[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const params = new URLSearchParams();
    if (cursor) params.set('cursor', cursor);
    const res = await fetch(`/api/audit?${params.toString()}`);
    const data = await res.json();
    if (res.ok) {
      setItems((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor);
      setHasMore(Boolean(data.nextCursor));
    }
    setLoading(false);
  }, [cursor, hasMore, loading]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0]?.isIntersecting) load();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <div className="card p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-neutral-400">
              <th className="py-2">Evento</th>
              <th className="py-2">Detalhe</th>
              <th className="py-2">IP</th>
              <th className="py-2">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {items.map((r) => (
              <tr key={r.id}>
                <td className="py-2 font-medium">{LABELS[r.action] ?? r.action}</td>
                <td className="mono py-2 text-xs text-neutral-400">{r.detail ? JSON.stringify(r.detail) : '—'}</td>
                <td className="mono py-2 text-xs text-neutral-400">{r.ip ?? '—'}</td>
                <td className="py-2 text-xs text-neutral-400">{new Date(r.createdAt).toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && items.length === 0 && <p className="py-8 text-center text-sm text-neutral-400">Sem eventos ainda.</p>}
        {loading && <p className="py-4 text-center text-sm text-neutral-400">Carregando…</p>}
        <div ref={sentinel} className="h-6" />
      </div>
    </div>
  );
}
