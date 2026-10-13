'use client';

// Parte client da sidebar das docs: marca o link ativo (pathname + hash) e, abaixo de lg, vira uma
// lista recolhível no topo da página.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface DocsNavLink {
  href: string;
  label: string;
  count?: number;
  isNew?: boolean;
}

export interface DocsNavSection {
  title: string;
  count?: number;
  links: DocsNavLink[];
}

export function DocsNav({ sections }: { sections: DocsNavSection[] }) {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [pathname]);

  // Fecha a lista do mobile ao navegar.
  useEffect(() => setOpen(false), [pathname, hash]);

  // Traz o link ativo para o meio da área rolável (a lista no mobile, o <aside> sticky no desktop),
  // sem rolar a página.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!list || !el) return;
    const box = list.scrollHeight > list.clientHeight ? list : list.closest('aside');
    if (!box || box.scrollHeight <= box.clientHeight) return;
    const b = box.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    box.scrollTop += e.top - b.top - b.height / 2 + e.height / 2;
  }, [pathname, open]);

  const isActive = (href: string) => {
    const [path, anchor] = href.split('#');
    if (path !== pathname) return false;
    if (anchor) return hash === `#${anchor}`;
    return pathname !== '/docs' || !hash; // "Introdução" só fica ativo sem âncora
  };
  const current = sections.flatMap((s) => s.links).find((l) => isActive(l.href));

  return (
    <nav aria-label="Documentação" className="text-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border bg-muted/40 px-3 py-2 text-left font-medium lg:hidden"
      >
        <span className="truncate">
          <span className="text-muted-foreground">Docs · </span>
          {current?.label ?? 'Navegar'}
        </span>
        <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      <div ref={listRef} className={cn('mt-2 max-h-[60vh] overflow-y-auto rounded-lg border p-2 lg:mt-0 lg:block lg:max-h-none lg:overflow-visible lg:rounded-none lg:border-0 lg:p-0', open ? 'block' : 'hidden')}>
        {sections.map((s) => (
          <div key={s.title} className="mb-6 last:mb-0">
            <div className="mb-1.5 flex items-center justify-between px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {s.title}
              {typeof s.count === 'number' && <span className="font-mono normal-case tracking-normal text-muted-foreground/70">{s.count}</span>}
            </div>
            <ul className="space-y-px">
              {s.links.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? 'page' : undefined}
                      // O router do Next troca o hash via pushState (sem `hashchange`): sincroniza na mão.
                      onClick={() => setHash(l.href.includes('#') ? `#${l.href.split('#')[1]}` : '')}
                      className={cn(
                        'flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors',
                        active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                      )}
                    >
                      <span className="truncate">{l.label}</span>
                      {l.isNew && <Badge className="h-4 bg-brand px-1.5 text-[10px] text-brand-foreground">Novo</Badge>}
                      {typeof l.count === 'number' && <span className="ml-auto font-mono text-xs text-muted-foreground/70">{l.count}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
