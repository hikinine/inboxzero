'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Check, Copy, Download, Loader2, Search, Trash2, X } from 'lucide-react';
import { CopyButton } from './CopyButton';

export interface ScreenMeta {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  width: number | null;
  height: number | null;
  collection: { slug: string; name: string } | null;
  tags: Array<{ slug: string; name: string }>;
  createdAt: string;
}

interface Facet {
  slug: string;
  name: string;
  count: number;
}
export interface Facets {
  collections: Facet[];
  tags: Facet[];
}
interface Filters {
  q: string;
  collection: string;
  tag: string;
}
type Picked = { id: string; slug: string; name: string };

const LIMIT = 40;

export function CatalogGrid({ facets, initialFilters }: { facets: Facets; initialFilters: Filters }) {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.q);
  const [items, setItems] = useState<ScreenMeta[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number | null>(null);

  // ── seleção múltipla ──
  const [selected, setSelected] = useState<Record<string, Picked>>({});
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);
  const selList = Object.values(selected);
  const selCount = selList.length;

  const toggleSel = (s: ScreenMeta) =>
    setSelected((prev) => {
      const n = { ...prev };
      if (n[s.id]) delete n[s.id];
      else n[s.id] = { id: s.id, slug: s.slug, name: s.name };
      return n;
    });
  const clearSel = () => setSelected({});

  async function downloadZip() {
    if (!selCount) return;
    setZipping(true);
    try {
      const res = await fetch('/api/screens/zip', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ids: selList.map((s) => s.id) }),
      });
      if (!res.ok) throw new Error('zip');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `catalogo-${selCount}-svgs.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert('Falha ao gerar o .zip');
    } finally {
      setZipping(false);
    }
  }

  async function copyPrompt() {
    const lines = selList.map((s) => `- ${s.slug}  (${s.name})`).join('\n');
    const prompt = `Ingira estes SVGs do catálogo (vetor nativo, fundo transparente).
Base: https://hiki9.inboxzero.space
Para cada slug, o SVG puro está em:  GET /api/screens/<slug>/raw  (image/svg+xml)
Embed direto:  <img src="https://hiki9.inboxzero.space/api/screens/<slug>/raw">

Itens selecionados (${selCount}):
${lines}

[TAREFA: descreva o que fazer com estes SVGs — ex. montar uma tela/modal, baixar, usar num dashboard]`;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard indisponível */
    }
  }

  const filterKey = `${filters.q}|${filters.collection}|${filters.tag}`;

  function queryString(cur?: string | null) {
    const p = new URLSearchParams();
    if (filters.q) p.set('q', filters.q);
    if (filters.collection) p.set('collection', filters.collection);
    if (filters.tag) p.set('tag', filters.tag);
    p.set('limit', String(LIMIT));
    if (cur) p.set('cursor', cur);
    return p.toString();
  }

  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((f) => (f.q === searchInput ? f : { ...f, q: searchInput }));
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (filters.q) p.set('q', filters.q);
    if (filters.collection) p.set('collection', filters.collection);
    if (filters.tag) p.set('tag', filters.tag);
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  useEffect(() => {
    let aborted = false;
    setLoading(true);
    setItems([]);
    fetch(`/api/screens?${queryString()}&withTotal=1`)
      .then((r) => r.json())
      .then((data) => {
        if (aborted) return;
        setItems(data.items);
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
        setTotal(typeof data.total === 'number' ? data.total : null);
        setLoading(false);
      })
      .catch(() => !aborted && setLoading(false));
    return () => {
      aborted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const stateRef = useRef({ cursor, hasMore, loading, filters });
  stateRef.current = { cursor, hasMore, loading, filters };

  const loadMore = useCallback(() => {
    const s = stateRef.current;
    if (!s.hasMore || s.loading || !s.cursor) return;
    setLoading(true);
    const p = new URLSearchParams();
    if (s.filters.q) p.set('q', s.filters.q);
    if (s.filters.collection) p.set('collection', s.filters.collection);
    if (s.filters.tag) p.set('tag', s.filters.tag);
    p.set('limit', String(LIMIT));
    p.set('cursor', s.cursor);
    fetch(`/api/screens?${p.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setItems((prev) => [...prev, ...data.items]);
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '800px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  async function onDelete(screen: ScreenMeta) {
    if (!confirm(`Deletar "${screen.name}"?\nEssa ação é irreversível.`)) return;
    const res = await fetch(`/api/screens/${screen.id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((s) => s.id !== screen.id));
      setTotal((t) => (t == null ? t : Math.max(0, t - 1)));
      setSelected((prev) => {
        const n = { ...prev };
        delete n[screen.id];
        return n;
      });
    } else {
      alert('Falha ao deletar.');
    }
  }

  const toggle = (key: 'collection' | 'tag', val: string) =>
    setFilters((f) => ({ ...f, [key]: f[key] === val ? '' : val }));

  const anyFilter = !!(filters.q || filters.collection || filters.tag);

  return (
    <div className={`space-y-5 ${selCount > 0 ? 'pb-28' : ''}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar telas por nome ou descrição…"
          className="w-full rounded-md border border-neutral-800 bg-neutral-900 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-neutral-500 focus:border-neutral-600"
        />
      </div>

      {facets.collections.length > 0 && (
        <FacetRow label="Coleções" facets={facets.collections} active={filters.collection} onToggle={(slug) => toggle('collection', slug)} />
      )}
      {facets.tags.length > 0 && (
        <FacetRow label="Tags" facets={facets.tags} active={filters.tag} onToggle={(slug) => toggle('tag', slug)} />
      )}

      <div className="flex items-center gap-3 text-sm text-neutral-500">
        <span>
          {total != null ? `${total} tela${total === 1 ? '' : 's'}` : `${items.length} carregada${items.length === 1 ? '' : 's'}`}
        </span>
        {anyFilter && (
          <button
            onClick={() => {
              setSearchInput('');
              setFilters({ q: '', collection: '', tag: '' });
            }}
            className="inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200"
          >
            <X className="h-3.5 w-3.5" />
            Limpar filtros
          </button>
        )}
      </div>

      {items.length === 0 && !loading ? (
        <div className="rounded-lg border border-dashed border-neutral-800 p-16 text-center text-neutral-500">
          Nenhuma tela encontrada.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((s) => {
            const isSel = !!selected[s.id];
            return (
              <div
                key={s.id}
                className={`group relative flex flex-col overflow-hidden rounded-lg border bg-neutral-900 transition ${
                  isSel ? 'border-emerald-500 ring-2 ring-emerald-500/60' : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {/* checkbox de seleção */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSel(s);
                  }}
                  title={isSel ? 'Desmarcar' : 'Selecionar'}
                  className={`absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-md border transition ${
                    isSel
                      ? 'border-emerald-500 bg-emerald-600 text-white'
                      : 'border-neutral-500 bg-neutral-900/80 text-transparent opacity-0 group-hover:opacity-100 hover:border-neutral-300'
                  }`}
                >
                  <Check className="h-4 w-4" />
                </button>

                <Link href={`/screens/${s.slug}`} className="checkerboard flex aspect-[4/3] items-center justify-center overflow-hidden p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/screens/${s.id}/raw`} alt={s.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                </Link>
                <div className="flex items-center gap-2 border-t border-neutral-800 p-3">
                  <Link href={`/screens/${s.slug}`} className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{s.name}</div>
                    <div className="mt-0.5 truncate text-xs text-neutral-500">{s.collection?.name ?? '—'}</div>
                  </Link>
                  <CopyButton
                    value={s.id}
                    className="shrink-0 rounded-md p-1.5 text-neutral-500 opacity-0 transition hover:bg-neutral-800 hover:text-neutral-200 group-hover:opacity-100"
                  />
                  <button
                    type="button"
                    onClick={() => onDelete(s)}
                    title="Deletar"
                    className="shrink-0 rounded-md p-1.5 text-neutral-500 opacity-0 transition hover:bg-red-950 hover:text-red-400 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div ref={sentinelRef} className="flex h-12 items-center justify-center">
        {loading && <Loader2 className="h-5 w-5 animate-spin text-neutral-600" />}
        {!hasMore && items.length > 0 && <span className="text-xs text-neutral-600">Fim do catálogo</span>}
      </div>

      {/* barra flutuante de ação em massa */}
      {selCount > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
          <div className="flex max-w-full items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-900/95 p-2 pl-4 shadow-2xl backdrop-blur">
            <span className="whitespace-nowrap text-sm font-semibold">
              {selCount} selecionado{selCount > 1 ? 's' : ''}
            </span>
            <div className="flex max-w-[36vw] items-center gap-1.5 overflow-x-auto py-0.5">
              {selList.slice(0, 12).map((s) => (
                <div key={s.id} className="checkerboard group/th relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-neutral-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/screens/${s.id}/raw`} alt="" className="h-full w-full object-contain p-0.5" />
                  <button
                    type="button"
                    onClick={() => setSelected((p) => { const n = { ...p }; delete n[s.id]; return n; })}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition group-hover/th:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {selCount > 12 && <span className="shrink-0 px-1 text-xs text-neutral-400">+{selCount - 12}</span>}
            </div>
            <button onClick={clearSel} className="shrink-0 rounded-md px-2 py-1.5 text-xs text-neutral-400 hover:text-neutral-200">
              Limpar
            </button>
            <button
              onClick={copyPrompt}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-1.5 text-sm transition hover:border-neutral-500"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado!' : 'Copiar prompt'}
            </button>
            <button
              onClick={downloadZip}
              disabled={zipping}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
            >
              {zipping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Baixar .zip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FacetRow({
  label,
  facets,
  active,
  onToggle,
}: {
  label: string;
  facets: Facet[];
  active: string;
  onToggle: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="mr-1 text-neutral-600">{label}:</span>
      {facets.map((f) => (
        <button
          key={f.slug}
          onClick={() => onToggle(f.slug)}
          className={`rounded-full px-3 py-1 transition ${
            active === f.slug ? 'bg-emerald-600 text-white' : 'border border-neutral-800 text-neutral-300 hover:border-neutral-600'
          }`}
        >
          {f.name} <span className={active === f.slug ? 'text-emerald-100' : 'text-neutral-500'}>{f.count}</span>
        </button>
      ))}
    </div>
  );
}
