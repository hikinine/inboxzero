'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  Folder,
  Loader2,
  Minus,
  Plus,
  Search,
  Tag as TagIcon,
  Trash2,
  X,
} from 'lucide-react';
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
type BulkResult = { screens?: number; tags?: number; linked?: number; unlinked?: number; error?: string };

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

  // ── ações em massa (tags / coleção) ──
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkMsg, setBulkMsg] = useState<string | null>(null);

  // Recarrega a 1ª página com os filtros atuais. Necessário após uma ação em massa: o card mostra a
  // coleção, e tag/coleção podem mudar o que o filtro corrente retorna (a tela pode sair da lista).
  async function refreshItems() {
    try {
      const res = await fetch(`/api/screens?${queryString()}&withTotal=1`);
      const data = await res.json();
      setItems(data.items);
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
      setTotal(typeof data.total === 'number' ? data.total : null);
    } catch {
      /* mantém a lista atual — a ação já foi aplicada no servidor */
    }
  }

  async function applyBulk(payload: Record<string, unknown>, describe: (r: BulkResult) => string) {
    if (!selCount || bulkBusy) return;
    setBulkBusy(true);
    try {
      const res = await fetch('/api/screens/bulk', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, ids: selList.map((s) => s.id) }),
      });
      const data: BulkResult = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Falha na ação em massa');
      setBulkMsg(describe(data));
      setTimeout(() => setBulkMsg(null), 2400);
      await refreshItems();
      router.refresh(); // contagens do aside/facetas vêm do server component
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Falha na ação em massa');
    } finally {
      setBulkBusy(false);
    }
  }

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
Base: https://catalog.codehall.io
Para cada slug, o SVG puro está em:  GET /api/screens/<slug>/raw  (image/svg+xml)
Embed direto:  <img src="https://catalog.codehall.io/api/screens/<slug>/raw">

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
  const sentinelVisibleRef = useRef(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        sentinelVisibleRef.current = !!entries[0]?.isIntersecting;
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '800px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  // IntersectionObserver só dispara em TRANSIÇÃO de visibilidade. Se o sentinela ficou
  // dentro da margem durante o fetch (o disparo foi engolido pelo guard de loading),
  // nenhum novo evento chega e o scroll infinito morre. Este efeito re-verifica ao fim
  // de cada página: sentinela ainda visível + tem mais → carrega a próxima.
  useEffect(() => {
    if (!loading && hasMore && sentinelVisibleRef.current) loadMore();
  }, [loading, hasMore, loadMore]);

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

            <BulkTagsMenu
              tags={facets.tags}
              busy={bulkBusy}
              onApply={(mode, tag) =>
                applyBulk(
                  { action: mode === 'add' ? 'addTags' : 'removeTags', tags: [tag] },
                  (r) =>
                    mode === 'add'
                      ? `+ “${tag}” em ${r.screens ?? 0} tela(s)`
                      : `− “${tag}” de ${r.screens ?? 0} tela(s)`,
                )
              }
            />
            <BulkCollectionMenu
              collections={facets.collections}
              busy={bulkBusy}
              onApply={(name) =>
                applyBulk({ action: 'setCollection', collection: name }, (r) =>
                  name ? `${r.screens ?? 0} tela(s) → “${name}”` : `${r.screens ?? 0} tela(s) sem coleção`,
                )
              }
            />

            {bulkBusy && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-neutral-400" />}
            {bulkMsg && !bulkBusy && (
              <span className="shrink-0 whitespace-nowrap text-xs text-emerald-400">{bulkMsg}</span>
            )}

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

// Fecha o dropdown ao clicar fora ou apertar Esc — mesmo comportamento do FilterMenu.
function useCloseOnOutside(open: boolean, ref: React.RefObject<HTMLDivElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}

// Ação em massa de TAGS. Abre para CIMA (a barra vive no rodapé) e permanece aberto após aplicar,
// porque o caso comum é aplicar VÁRIAS tags na mesma seleção. Adicionar é ADITIVO (não remove as
// que já existem); remover desvincula só a tag clicada.
function BulkTagsMenu({
  tags,
  busy,
  onApply,
}: {
  tags: Facet[];
  busy: boolean;
  onApply: (mode: 'add' | 'remove', tagName: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useCloseOnOutside(open, ref, () => setOpen(false));

  const term = q.trim();
  const options = useMemo(
    () =>
      tags
        // ao REMOVER, tag sem uso é ruído; ao ADICIONAR, qualquer tag existente serve.
        .filter((t) => (mode === 'remove' ? t.count > 0 : true))
        .filter((t) => !term || norm(t.name).includes(norm(term)))
        .sort((a, b) => b.count - a.count)
        .slice(0, 200),
    [tags, term, mode],
  );
  const canCreate = mode === 'add' && !!term && !tags.some((t) => norm(t.name) === norm(term));

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-1.5 text-sm transition hover:border-neutral-500 disabled:opacity-50"
      >
        <TagIcon className="h-4 w-4" />
        Tags
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-40 mb-2 w-72 rounded-md border border-neutral-800 bg-neutral-900 p-1 shadow-2xl">
          <div className="mb-1 flex gap-1 rounded bg-neutral-950 p-0.5">
            {(['add', 'remove'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-xs transition ${
                  mode === m ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {m === 'add' ? <Plus className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                {m === 'add' ? 'Adicionar' : 'Remover'}
              </button>
            ))}
          </div>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={mode === 'add' ? 'Buscar ou criar tag…' : 'Buscar tag…'}
            className="mb-1 w-full rounded border border-neutral-800 bg-neutral-950 px-2 py-1.5 text-xs outline-none placeholder:text-neutral-600 focus:border-neutral-600"
          />
          <p className="px-2 pb-1 text-[11px] leading-snug text-neutral-600">
            {mode === 'add'
              ? 'Mantém as tags existentes. Clique em várias para aplicar mais de uma.'
              : 'Remove apenas a tag clicada das telas selecionadas.'}
          </p>
          <div className="max-h-64 overflow-y-auto">
            {canCreate && (
              <button
                disabled={busy}
                onClick={() => onApply('add', term)}
                className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-xs text-emerald-400 hover:bg-neutral-800 disabled:opacity-50"
              >
                <Plus className="h-3 w-3 shrink-0" />
                <span className="truncate">Criar e adicionar “{term}”</span>
              </button>
            )}
            {options.map((t) => (
              <button
                key={t.slug}
                disabled={busy}
                onClick={() => onApply(mode, t.name)}
                className="flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs text-neutral-300 hover:bg-neutral-800 disabled:opacity-50"
              >
                <span className="truncate">{t.name}</span>
                <span className="shrink-0 text-neutral-500">{t.count}</span>
              </button>
            ))}
            {!options.length && !canCreate && (
              <div className="px-2 py-4 text-center text-xs text-neutral-600">nada encontrado</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Ação em massa de COLEÇÃO. `Screen.collectionId` é 1:N (uma tela pertence a UMA coleção), então
// aplicar MOVE as telas — substitui a coleção atual. O texto do menu deixa isso explícito.
function BulkCollectionMenu({
  collections,
  busy,
  onApply,
}: {
  collections: Facet[];
  busy: boolean;
  onApply: (collectionName: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useCloseOnOutside(open, ref, () => setOpen(false));

  const term = q.trim();
  const options = useMemo(
    () =>
      collections
        .filter((c) => !term || norm(c.name).includes(norm(term)))
        .sort((a, b) => b.count - a.count)
        .slice(0, 200),
    [collections, term],
  );
  const canCreate = !!term && !collections.some((c) => norm(c.name) === norm(term));

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-700 px-3 py-1.5 text-sm transition hover:border-neutral-500 disabled:opacity-50"
      >
        <Folder className="h-4 w-4" />
        Coleção
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-40 mb-2 w-72 rounded-md border border-neutral-800 bg-neutral-900 p-1 shadow-2xl">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar ou criar coleção…"
            className="mb-1 w-full rounded border border-neutral-800 bg-neutral-950 px-2 py-1.5 text-xs outline-none placeholder:text-neutral-600 focus:border-neutral-600"
          />
          <p className="px-2 pb-1 text-[11px] leading-snug text-neutral-600">
            Cada tela pertence a uma coleção — isto <strong className="font-medium text-neutral-500">substitui</strong> a
            atual.
          </p>
          <div className="max-h-64 overflow-y-auto">
            {canCreate && (
              <button
                disabled={busy}
                onClick={() => {
                  onApply(term);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-xs text-emerald-400 hover:bg-neutral-800 disabled:opacity-50"
              >
                <Plus className="h-3 w-3 shrink-0" />
                <span className="truncate">Criar e mover para “{term}”</span>
              </button>
            )}
            {options.map((c) => (
              <button
                key={c.slug}
                disabled={busy}
                onClick={() => {
                  onApply(c.name);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs text-neutral-300 hover:bg-neutral-800 disabled:opacity-50"
              >
                <span className="truncate">{c.name}</span>
                <span className="shrink-0 text-neutral-500">{c.count}</span>
              </button>
            ))}
            {!options.length && !canCreate && (
              <div className="px-2 py-4 text-center text-xs text-neutral-600">nada encontrado</div>
            )}
          </div>
          <div className="mt-1 border-t border-neutral-800 pt-1">
            <button
              disabled={busy}
              onClick={() => {
                onApply(null);
                setOpen(false);
              }}
              className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-xs text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50"
            >
              <X className="h-3 w-3 shrink-0" />
              Remover da coleção
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
