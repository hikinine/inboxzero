'use client';

// Busca ⌘K (command palette) — itens, categorias e ações, usando o próprio Command do catálogo.
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, Folder, Heart, Plus, Search, Sparkles } from 'lucide-react';
import type { ItemKind } from '@prisma/client';
import type { Facets, ItemMeta } from '@/lib/items';
import { KINDS, kindMeta } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';

const KIND_ICON: Record<ItemKind, string> = { BLOCK: '▦', COMPONENT: '◫', PAGE: '▤', ILLUSTRATION: '✦' };

export function SearchCommand({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [items, setItems] = useState<ItemMeta[]>([]);
  const [facets, setFacets] = useState<Facets | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);

  useEffect(() => {
    if (!open || facets) return;
    fetch('/api/facets')
      .then((r) => r.json())
      .then((d: Facets) => setFacets(d))
      .catch(() => {});
  }, [open, facets]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/items?q=${encodeURIComponent(q.trim())}&limit=8`)
        .then((r) => r.json())
        .then((d: { items: ItemMeta[] }) => setItems(d.items ?? []))
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, 150);
    return () => clearTimeout(t);
  }, [q, open]);

  const term = q.trim().toLowerCase();
  const categories = useMemo(() => {
    const all = (facets?.categories ?? []).filter((c) => c.count > 0);
    const list = term ? all.filter((c) => c.name.toLowerCase().includes(term) || c.slug.includes(term)) : all.filter((c) => c.kind === 'BLOCK').slice(0, 6);
    return list.slice(0, 8);
  }, [facets, term]);

  const go = (href: string) => {
    setOpen(false);
    setQ('');
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'hidden h-8 w-48 items-center gap-2 rounded-lg border bg-background px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex xl:w-64',
          className,
        )}
        aria-label="Buscar (⌘K)"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Buscar…</span>
        <kbd className="rounded border bg-muted px-1 font-mono text-[10px]">⌘K</kbd>
      </button>
      <Button variant="ghost" size="icon" aria-label="Buscar" className="md:hidden" onClick={() => setOpen(true)}>
        <Search />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Buscar no catálogo" description="Itens, categorias e ações" className="sm:max-w-xl">
        <Command shouldFilter={false}>
          <CommandInput value={q} onValueChange={setQ} placeholder="Buscar itens, categorias… (hero, kanban, beam)" />
          <CommandList>
            <CommandEmpty>{loading ? 'Buscando…' : 'Nada encontrado.'}</CommandEmpty>
            {items.length > 0 && (
              <CommandGroup heading="Itens">
                {items.map((it) => {
                  const m = kindMeta(it.kind);
                  return (
                    <CommandItem key={it.id} value={`item:${it.slug}`} onSelect={() => go(`/item/${it.slug}`)}>
                      <span className="w-4 text-center text-xs text-muted-foreground">{KIND_ICON[it.kind]}</span>
                      <span className="truncate">{it.name}</span>
                      <span className="ml-auto truncate text-xs text-muted-foreground">
                        {m.singular}
                        {it.category ? ` · ${it.category.name}` : ''}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            {categories.length > 0 && (
              <CommandGroup heading="Categorias">
                {categories.map((c) => {
                  const m = kindMeta(c.kind ?? 'BLOCK');
                  return (
                    <CommandItem key={`${c.kind}-${c.slug}`} value={`cat:${c.kind}:${c.slug}`} onSelect={() => go(c.kind === 'COMPONENT' ? `/docs/components/${c.slug}` : `/${m.path}/${c.slug}`)}>
                      <Folder className="text-muted-foreground" />
                      <span className="truncate">{c.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {m.label} · {c.count}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup heading="Navegar">
              {KINDS.map((k) => (
                <CommandItem key={k.kind} value={`kind:${k.path}`} onSelect={() => go(`/${k.path}`)}>
                  <span className="w-4 text-center text-xs text-muted-foreground">{KIND_ICON[k.kind]}</span>
                  {k.label}
                </CommandItem>
              ))}
              {term && (
                <CommandItem value="search:all" onSelect={() => go(`/search?q=${encodeURIComponent(q.trim())}`)}>
                  <ArrowRight className="text-muted-foreground" />
                  Ver todos os resultados para “{q.trim()}”
                </CommandItem>
              )}
            </CommandGroup>
            <CommandGroup heading="Ações">
              <CommandItem value="action:new" onSelect={() => go('/new')}>
                <Plus className="text-muted-foreground" /> Publicar um item <CommandShortcut>N</CommandShortcut>
              </CommandItem>
              <CommandItem value="action:mcp" onSelect={() => go('/docs#mcp')}>
                <Sparkles className="text-muted-foreground" /> Configurar o MCP
              </CommandItem>
              <CommandItem value="action:docs" onSelect={() => go('/docs')}>
                <BookOpen className="text-muted-foreground" /> Documentação
              </CommandItem>
              <CommandItem value="action:fav" onSelect={() => go('/favorites')}>
                <Heart className="text-muted-foreground" /> Favoritos
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
