'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Plus, Search } from 'lucide-react';
import { KINDS } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrandMark } from './brand-mark';
import { ThemeToggle } from './theme-toggle';
import { useFavorites } from './favorites';

const NAV = [...KINDS.map((k) => ({ href: `/${k.path}`, label: k.label })), { href: '/collections', label: 'Coleções' }, { href: '/docs', label: 'Docs' }];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState('');
  const { count, ready } = useFavorites();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : '/search');
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-6">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <BrandMark size={22} />
          UI Catalog
        </Link>

        <nav className="ml-4 hidden items-center gap-0.5 text-sm md:flex">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn('rounded-md px-2.5 py-1.5 transition-colors', active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <form onSubmit={submit} className="relative ml-auto hidden w-56 sm:block lg:w-72">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar componentes, blocos…" className="pl-8" aria-label="Buscar" />
        </form>

        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/favorites" />} aria-label="Favoritos" className="relative ml-auto sm:ml-0">
          <Heart />
          {ready && count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 min-w-4 rounded-full bg-brand px-1 text-[10px] font-semibold leading-4 text-brand-foreground">{count}</span>
          )}
        </Button>
        <ThemeToggle />
        <Button size="sm" nativeButton={false} render={<Link href="/new" />}>
          <Plus data-icon="inline-start" />
          Novo
        </Button>
      </div>

      <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t px-4 py-1.5 text-sm md:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={cn('shrink-0 rounded-md px-2.5 py-1', pathname.startsWith(n.href) ? 'bg-muted' : 'text-muted-foreground')}>
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
