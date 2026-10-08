'use client';

import Link from 'next/link';
import type { ItemMeta } from '@/lib/items';
import { kindMeta } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PreviewCard } from './preview-frame';
import { FavoriteButton } from './favorite-button';

export function ItemCard({
  item,
  showKind = false,
  selectable = false,
  selected = false,
  onToggleSelect,
}: {
  item: ItemMeta;
  showKind?: boolean;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (item: ItemMeta) => void;
}) {
  const href = `/item/${item.slug}`;
  const meta = kindMeta(item.kind);
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/30',
        selected && 'border-brand ring-2 ring-brand/40',
      )}
    >
      <Link href={href} className="block border-b" tabIndex={-1} aria-hidden>
        <PreviewCard slug={item.slug} kind={item.kind} />
      </Link>
      {item.featured && (
        <Badge className="absolute left-2 top-2 bg-brand text-brand-foreground shadow">Destaque</Badge>
      )}
      {item.status !== 'PUBLISHED' && (
        <Badge variant="secondary" className="absolute right-2 top-2">
          {item.status === 'DRAFT' ? 'Rascunho' : 'Arquivado'}
        </Badge>
      )}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {selectable && (
          <Checkbox checked={selected} onCheckedChange={() => onToggleSelect?.(item)} aria-label={`Selecionar ${item.name}`} />
        )}
        <div className="min-w-0 flex-1">
          <Link href={href} className="block truncate text-sm font-medium hover:underline">
            {item.name}
          </Link>
          <div className="truncate text-xs text-muted-foreground">
            {[showKind ? meta.singular : null, item.category?.name].filter(Boolean).join(' · ') || meta.singular}
          </div>
        </div>
        <FavoriteButton slug={item.slug} className="opacity-70 group-hover:opacity-100" />
      </div>
    </div>
  );
}
