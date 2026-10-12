'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BrandMark } from './brand-mark';
import { ThemeToggle } from './theme-toggle';
import { SearchCommand } from './search-command';
import { useFavorites } from './favorites';

// Navegação principal (ordem inspirada no shadcnstudio: Blocks, Templates/Pages, Illustrations, Components…).
const NAV = [
  { href: '/blocks', label: 'Blocos' },
  { href: '/pages', label: 'Páginas' },
  { href: '/components', label: 'Componentes' },
  { href: '/illustrations', label: 'Ilustrações' },
  { href: '/collections', label: 'Coleções' },
  { href: '/docs#mcp', label: 'IA & MCP', exact: true },
  { href: '/changelog', label: 'Changelog' },
  { href: '/docs', label: 'Docs', exact: true },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { count, ready } = useFavorites();

  const isActive = (n: (typeof NAV)[number]) => {
    const base = n.href.split('#')[0]!;
    if ('exact' in n && n.exact) return n.href === base && pathname === base;
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-2 px-6 lg:px-10">
        <Link href="/" className="mr-2 flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <BrandMark size={22} />
          <span>
            ui<span className="text-muted-foreground">/</span>catalog
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 text-sm lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn('rounded-md px-2.5 py-1.5 transition-colors', isActive(n) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center">
          <SearchCommand />
        </div>
        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/favorites" />} aria-label="Favoritos" className="relative">
          <Heart />
          {ready && count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 min-w-4 rounded-full bg-brand px-1 text-[10px] font-semibold leading-4 text-brand-foreground">{count}</span>
          )}
        </Button>
        <ThemeToggle />
        <Button size="sm" nativeButton={false} render={<Link href="/new" />} className="ml-1">
          <Plus data-icon="inline-start" />
          Novo item
        </Button>
      </div>

      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t px-4 py-1.5 text-sm lg:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={cn('shrink-0 rounded-md px-2.5 py-1', isActive(n) ? 'bg-muted' : 'text-muted-foreground')}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
