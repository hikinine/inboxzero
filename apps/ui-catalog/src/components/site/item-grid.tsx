'use client';

// Grid com scroll infinito (cursor) + seleção múltipla com ações em massa (copiar slugs/prompt, zip).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ItemKind } from '@prisma/client';
import { Check, Copy, Download, Loader2, Sparkles, X } from 'lucide-react';
import type { ItemMeta } from '@/lib/items';
import { SITE_URL, installCommand } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { ItemCard } from './item-card';

export interface GridFilters {
  q?: string;
  kind?: ItemKind;
  category?: string;
  collection?: string;
  tag?: string;
  ids?: string[];
  featured?: boolean;
  status?: string;
}

export function ItemGrid({
  filters,
  pageSize = 24,
  selectable = true,
  showKind,
  emptyTitle = 'Nada por aqui ainda',
  emptyDescription = 'Nenhum item corresponde a esses filtros.',
  columns = 'sm:grid-cols-2 lg:grid-cols-3',
}: {
  filters: GridFilters;
  pageSize?: number;
  selectable?: boolean;
  showKind?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: string;
}) {
  const key = JSON.stringify(filters);
  const [items, setItems] = useState<ItemMeta[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number | null>(null);
  const [selected, setSelected] = useState<Record<string, ItemMeta>>({});
  const sentinel = useRef<HTMLDivElement>(null);
  const reqId = useRef(0);

  const buildUrl = useCallback(
    (c: string | null, first: boolean) => {
      const sp = new URLSearchParams();
      if (filters.q) sp.set('q', filters.q);
      if (filters.kind) sp.set('kind', filters.kind);
      if (filters.category) sp.set('category', filters.category);
      if (filters.collection) sp.set('collection', filters.collection);
      if (filters.tag) sp.set('tag', filters.tag);
      if (filters.ids?.length) sp.set('ids', filters.ids.join(','));
      if (filters.featured !== undefined) sp.set('featured', filters.featured ? '1' : '0');
      if (filters.status) sp.set('status', filters.status);
      sp.set('limit', String(pageSize));
      if (c) sp.set('cursor', c);
      if (first) sp.set('withTotal', '1');
      return `/api/items?${sp}`;
    },
    [filters, pageSize],
  );

  const load = useCallback(
    async (c: string | null, first: boolean) => {
      const id = ++reqId.current;
      setLoading(true);
      try {
        const res = await fetch(buildUrl(c, first));
        const data = (await res.json()) as { items: ItemMeta[]; nextCursor: string | null; total?: number };
        if (id !== reqId.current) return;
        setItems((prev) => (first ? data.items : [...prev, ...data.items]));
        setCursor(data.nextCursor);
        setHasMore(Boolean(data.nextCursor));
        if (first && typeof data.total === 'number') setTotal(data.total);
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    },
    [buildUrl],
  );

  // Reinicia quando os filtros mudam.
  useEffect(() => {
    setItems([]);
    setCursor(null);
    setHasMore(true);
    setTotal(null);
    setSelected({});
    if (filters.ids && filters.ids.length === 0) {
      setLoading(false);
      setHasMore(false);
      return;
    }
    void load(null, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Scroll infinito.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasMore) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading && hasMore) void load(cursor, false);
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cursor, hasMore, loading, load]);

  const selList = useMemo(() => Object.values(selected), [selected]);
  const toggle = (it: ItemMeta) =>
    setSelected((s) => {
      const n = { ...s };
      if (n[it.id]) delete n[it.id];
      else n[it.id] = it;
      return n;
    });

  return (
    <div className="relative">
      {total !== null && (
        <p className="mb-3 text-xs text-muted-foreground">
          {total === 0 ? 'Nenhum item' : total === 1 ? '1 item' : `${total} itens`}
        </p>
      )}

      {!loading && items.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Sparkles />
            </EmptyMedia>
            <EmptyTitle>{emptyTitle}</EmptyTitle>
            <EmptyDescription>{emptyDescription}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className={`grid grid-cols-1 gap-4 ${columns}`}>
          {items.map((it) => (
            <ItemCard key={it.id} item={it} showKind={showKind} selectable={selectable} selected={Boolean(selected[it.id])} onToggleSelect={toggle} />
          ))}
        </div>
      )}

      <div ref={sentinel} className="h-px" />
      {loading && (
        <div className="flex justify-center py-8 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
        </div>
      )}
      {!loading && hasMore && (
        <div className="flex justify-center py-6">
          <Button variant="outline" onClick={() => load(cursor, false)}>
            Carregar mais
          </Button>
        </div>
      )}

      {selList.length > 0 && <SelectionBar items={selList} onClear={() => setSelected({})} />}
    </div>
  );
}

function SelectionBar({ items, onClear }: { items: ItemMeta[]; onClear: () => void }) {
  const [copied, setCopied] = useState<'slugs' | 'prompt' | null>(null);
  const [zipping, setZipping] = useState(false);

  async function copy(kind: 'slugs' | 'prompt') {
    const slugs = items.map((i) => i.slug);
    const text =
      kind === 'slugs'
        ? slugs.join('\n')
        : [
            `Use estes itens do UI Catalog (${SITE_URL}) no projeto:`,
            ...items.map((i) => `- ${i.name} (${i.kind.toLowerCase()}): ${SITE_URL}/item/${i.slug}`),
            '',
            'Para instalar via shadcn CLI:',
            ...slugs.map((s) => installCommand(s)),
            '',
            `Ou pegue o código via MCP (get_item) / GET ${SITE_URL}/api/items/<slug>/code.`,
          ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  }

  async function zip() {
    setZipping(true);
    try {
      const res = await fetch('/api/items/zip', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ids: items.map((i) => i.id) }) });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ui-catalog-${items.length}-itens.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-popover/95 p-2 shadow-xl backdrop-blur">
        <span className="px-2 text-sm font-medium">{items.length} selecionado{items.length > 1 ? 's' : ''}</span>
        <Button size="sm" variant="outline" onClick={() => copy('slugs')}>
          {copied === 'slugs' ? <Check /> : <Copy />} Copiar slugs
        </Button>
        <Button size="sm" variant="outline" onClick={() => copy('prompt')}>
          {copied === 'prompt' ? <Check /> : <Sparkles />} Copiar prompt
        </Button>
        <Button size="sm" variant="outline" onClick={zip} disabled={zipping}>
          {zipping ? <Loader2 className="animate-spin" /> : <Download />} Baixar .zip
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={onClear} aria-label="Limpar seleção">
          <X />
        </Button>
      </div>
    </div>
  );
}
