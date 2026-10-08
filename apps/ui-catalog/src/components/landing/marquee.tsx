'use client';

import Link from 'next/link';
import type { ItemMeta } from '@/lib/items';
import { PreviewCard } from '@/components/site/preview-frame';

// Faixa rolante de previews ao vivo (hero da home).
export function Marquee({ items }: { items: ItemMeta[] }) {
  if (!items.length) return null;
  const row = items.map((it) => (
    <Link key={it.id} href={`/item/${it.slug}`} className="group w-[360px] shrink-0 overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/30">
      <PreviewCard slug={it.slug} kind={it.kind} />
      <div className="truncate border-t px-3 py-2 text-xs text-muted-foreground group-hover:text-foreground">{it.name}</div>
    </Link>
  ));
  return (
    <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)' }}>
      <div className="uc-marquee flex w-max gap-4 py-2">
        {row}
        {row.map((r, i) => (
          <div key={`dup-${i}`} aria-hidden>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}
