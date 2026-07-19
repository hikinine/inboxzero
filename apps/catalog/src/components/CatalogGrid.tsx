'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Check, ChevronDown, Copy, Download, Loader2, Search, Trash2, X } from 'lucide-react';
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

export function CatalogGrid({
  facets,
  totalScreens,
  initialFilters,
}: {
  facets: Facets;
  totalScreens: number;
  initialFilters: Filters;
}) {
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

  const anyFilter = !!(filters.q || filters.collection || filters.tag);
  const activeTag = facets.tags.find((t) => t.slug === filters.tag);

  return (
    <div className={`flex items-start gap-6 ${selCount > 0 ? 'pb-28' : ''}`}>
      <CollectionsAside
        collections={facets.collections}
        totalScreens={totalScreens}
        active={filters.collection}
        onPick={(slug) => setFilters((f) => ({ ...f, collection: slug }))}
      />

      <div className="min-w-0 flex-1 space-y-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar telas por nome ou descrição…"
            className="w-full rounded-md border border-neutral-800 bg-neutral-900 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-neutral-500 focus:border-neutral-600"
          />
        </div>

        {/* Barra de filtros compacta: dropdown com busca em vez de parede de pills.
            Escala para centenas de tags sem empurrar o grid para fora da tela. */}
        <div className="flex flex-wrap items-center gap-2">
          <FilterMenu
            label="Tag"
            facets={facets.tags}
            active={filters.tag}
            onPick={(slug) => setFilters((f) => ({ ...f, tag: slug }))}
            searchable
          />

          {activeTag && <FilterChip label={activeTag.name} onClear={() => setFilters((f) => ({ ...f, tag: '' }))} />}

          <div className="ml-auto flex items-center gap-3 text-sm text-neutral-500">
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
                Limpar
              </button>
            )}
          </div>
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

// Chip do filtro ativo — deixa óbvio o que está aplicado sem ocupar a tela.
function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs text-white">
      {label}
      <button onClick={onClear} aria-label={`Remover filtro ${label}`} className="text-emerald-100 hover:text-white">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

// Aside de navegação por coleção — substitui o antigo dropdown "Coleção" no filtro.
// "Todas" (coleção vazia) é o default; contagem vem do total geral de telas.
function CollectionsAside({
  collections,
  totalScreens,
  active,
  onPick,
}: {
  collections: Facet[];
  totalScreens: number;
  active: string;
  onPick: (slug: string) => void;
}) {
  const options = useMemo(() => collections.filter((c) => c.count > 0), [collections]);

  return (
    <aside className="sticky top-20 hidden w-56 shrink-0 space-y-0.5 md:block">
      <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Coleções</h3>
      <button
        onClick={() => onPick('')}
        className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition ${
          !active ? 'bg-emerald-950/40 text-emerald-300' : 'text-neutral-300 hover:bg-neutral-900'
        }`}
      >
        <span>Todas</span>
        <span className={`text-xs ${!active ? 'text-emerald-400' : 'text-neutral-500'}`}>{totalScreens}</span>
      </button>
      {options.map((c) => (
        <button
          key={c.slug}
          onClick={() => onPick(c.slug === active ? '' : c.slug)}
          className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm transition ${
            active === c.slug ? 'bg-emerald-950/40 text-emerald-300' : 'text-neutral-300 hover:bg-neutral-900'
          }`}
        >
          <span className="truncate">{c.name}</span>
          <span className={`shrink-0 text-xs ${active === c.slug ? 'text-emerald-400' : 'text-neutral-500'}`}>
            {c.count}
          </span>
        </button>
      ))}
    </aside>
  );
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Dropdown de faceta. Esconde facetas vazias, ordena por uso e permite buscar —
// é o que faz a UI aguentar centenas de tags.
function FilterMenu({
  label,
  facets,
  active,
  onPick,
  searchable = false,
}: {
  label: string;
  facets: Facet[];
  active: string;
  onPick: (slug: string) => void;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const options = useMemo(
    () =>
      facets
        .filter((f) => f.count > 0) // esconde faceta vazia (era só ruído)
        .filter((f) => !q || norm(f.name).includes(norm(q)))
        .sort((a, b) => b.count - a.count), // mais usadas primeiro
    [facets, q],
  );

  const activeFacet = facets.find((f) => f.slug === active);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition ${
          activeFacet
            ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
            : 'border-neutral-800 text-neutral-300 hover:border-neutral-600'
        }`}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 z-30 mt-1 w-64 rounded-md border border-neutral-800 bg-neutral-900 p-1 shadow-xl">
          {searchable && (
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Buscar ${label.toLowerCase()}…`}
              className="mb-1 w-full rounded border border-neutral-800 bg-neutral-950 px-2 py-1.5 text-xs outline-none placeholder:text-neutral-600 focus:border-neutral-600"
            />
          )}
          <div className="max-h-72 overflow-y-auto">
            <button
              onClick={() => {
                onPick('');
                setOpen(false);
                setQ('');
              }}
              className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-xs hover:bg-neutral-800 ${
                active ? 'text-neutral-400' : 'text-emerald-400'
              }`}
            >
              Todas
            </button>
            {options.map((f) => (
              <button
                key={f.slug}
                onClick={() => {
                  onPick(f.slug === active ? '' : f.slug);
                  setOpen(false);
                  setQ('');
                }}
                className={`flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-neutral-800 ${
                  active === f.slug ? 'text-emerald-400' : 'text-neutral-300'
                }`}
              >
                <span className="truncate">{f.name}</span>
                <span className="shrink-0 text-neutral-500">{f.count}</span>
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-2 py-4 text-center text-xs text-neutral-600">nada encontrado</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
