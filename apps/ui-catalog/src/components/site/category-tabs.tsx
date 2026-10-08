'use client';

// Abas de categoria fixas no topo que ancoram nas seções (#cat-<slug>) com scrollspy.
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TabDef {
  slug: string;
  name: string;
  count: number;
}

export function CategoryTabs({ tabs, prefix = 'cat-' }: { tabs: TabDef[]; prefix?: string }) {
  const [active, setActive] = useState<string>(tabs[0]?.slug ?? '');

  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(`${prefix}${t.slug}`)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id.slice(prefix.length));
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs, prefix]);

  if (!tabs.length) return null;

  return (
    <div className="sticky top-14 z-30 -mx-6 border-b bg-background/85 px-6 backdrop-blur">
      <div className="no-scrollbar flex gap-1 overflow-x-auto py-2">
        {tabs.map((t) => (
          <a
            key={t.slug}
            href={`#${prefix}${t.slug}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(`${prefix}${t.slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setActive(t.slug);
            }}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors',
              active === t.slug ? 'border-foreground bg-foreground text-background' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {t.name}
            <span className={cn('text-xs', active === t.slug ? 'opacity-70' : 'text-muted-foreground/70')}>{t.count}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
