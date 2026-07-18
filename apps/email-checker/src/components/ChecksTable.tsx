'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { ResultBadge } from './ResultBadge';

type Row = {
  id: string;
  email: string;
  domain: string | null;
  isValid: boolean;
  isDisposable: boolean;
  confidence: number;
  reason: string | null;
  source: 'API' | 'DASHBOARD';
  mxChecked: boolean;
  hasMx: boolean | null;
  createdAt: string;
};

const FILTERS = [
  { key: '', label: 'Todos' },
  { key: 'valid', label: 'Válidos' },
  { key: 'disposable', label: 'Descartáveis' },
  { key: 'invalid', label: 'Inválidos' },
];

export function ChecksTable() {
  const [items, setItems] = useState<Row[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('');
  const sentinel = useRef<HTMLDivElement>(null);

  const load = useCallback(
    async (reset: boolean) => {
      if (loading) return;
      setLoading(true);
      const params = new URLSearchParams();
      if (!reset && cursor) params.set('cursor', cursor);
      if (q) params.set('q', q);
      if (filter) params.set('filter', filter);
      const res = await fetch(`/api/checks?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => (reset ? data.items : [...prev, ...data.items]));
        setCursor(data.nextCursor);
        setHasMore(Boolean(data.nextCursor));
      }
      setLoading(false);
    },
    [cursor, q, filter, loading],
  );

  // Recarrega do zero quando busca/filtro mudam.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setItems([]);
    setCursor(null);
    setHasMore(true);
    const t = setTimeout(() => load(true), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, filter]);

  // Infinite scroll.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasMore && !loading) load(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading, load]);

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input className="input pl-9" placeholder="Buscar por e-mail…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`btn px-3 py-1.5 text-xs ${filter === f.key ? 'bg-white/5 text-brand' : 'text-neutral-400 hover:bg-neutral-800'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-neutral-400">
              <th className="py-2">E-mail</th>
              <th className="py-2">Status</th>
              <th className="py-2">Origem</th>
              <th className="py-2">MX</th>
              <th className="py-2">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {items.map((r) => (
              <tr key={r.id}>
                <td className="mono py-2">{r.email || <span className="text-neutral-500">(vazio)</span>}</td>
                <td className="py-2">
                  <ResultBadge isValid={r.isValid} isDisposable={r.isDisposable} reason={r.reason} />
                </td>
                <td className="py-2 text-xs text-neutral-400">{r.source === 'API' ? 'API' : 'Dashboard'}</td>
                <td className="py-2 text-xs text-neutral-400">{r.mxChecked ? (r.hasMx ? 'sim' : 'não') : '—'}</td>
                <td className="py-2 text-xs text-neutral-400">{new Date(r.createdAt).toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && items.length === 0 && <p className="py-8 text-center text-sm text-neutral-400">Nenhuma checagem encontrada.</p>}
        {loading && <p className="py-4 text-center text-sm text-neutral-400">Carregando…</p>}
        <div ref={sentinel} className="h-6" />
      </div>
    </div>
  );
}
