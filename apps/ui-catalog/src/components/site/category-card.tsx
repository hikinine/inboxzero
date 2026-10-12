'use client';

// Card de categoria (estilo shadcnstudio): thumbnail ao vivo do item de capa, badge Novo/Hot, nome e contagem.
import Link from 'next/link';
import type { ItemKind } from '@prisma/client';
import { ArrowUpRight } from 'lucide-react';
import type { CategoryCardData } from '@/lib/items';
import { kindMeta } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { PreviewCard } from './preview-frame';

export function CategoryCard({ kind, cat, className }: { kind: ItemKind; cat: CategoryCardData; className?: string }) {
  const meta = kindMeta(kind);
  const href = `/${meta.path}/${cat.slug}`;
  const unit = cat.count === 1 ? meta.singular.toLowerCase() : meta.label.toLowerCase();
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg hover:shadow-foreground/5',
        className,
      )}
    >
      <div className="relative border-b bg-muted/20">
        {cat.cover ? (
          <PreviewCard slug={cat.cover.slug} kind={cat.cover.kind} />
        ) : (
          <div className="flex items-center justify-center text-xs text-muted-foreground" style={{ aspectRatio: meta.cardAspect }}>
            sem preview
          </div>
        )}
        {cat.hasNew ? (
          <Badge className="absolute left-2 top-2 bg-brand text-brand-foreground shadow">Novo</Badge>
        ) : cat.hasFeatured ? (
          <Badge variant="secondary" className="absolute left-2 top-2 shadow">
            Hot
          </Badge>
        ) : null}
      </div>
      <div className="flex items-center gap-2 px-3.5 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 truncate text-sm font-medium">
            {cat.name}
            <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          {cat.description && <div className="truncate text-xs text-muted-foreground">{cat.description}</div>}
        </div>
        <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
          {cat.count} {unit}
        </span>
      </div>
    </Link>
  );
}
