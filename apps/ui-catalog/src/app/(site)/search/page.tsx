import type { Metadata } from 'next';
import Link from 'next/link';
import { ItemKind } from '@prisma/client';
import { X } from 'lucide-react';
import { KINDS } from '@/lib/site';
import { getFacets } from '@/lib/items';
import { ItemGrid } from '@/components/site/item-grid';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Explorar' };

type SP = { q?: string; kind?: string; tag?: string; collection?: string; sort?: string; featured?: string };

const pill = (active: boolean) =>
  cn('rounded-full px-3 py-1 text-xs transition-colors', active ? 'bg-foreground text-background' : 'border text-muted-foreground hover:bg-muted');

export default async function SearchPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const kind = sp.kind && (Object.values(ItemKind) as string[]).includes(sp.kind) ? (sp.kind as ItemKind) : undefined;
  const sort = sp.sort === 'new' || sp.sort === 'name' ? sp.sort : undefined;
  const featured = sp.featured === '1' ? true : undefined;
  const facets = await getFacets(kind);

  const link = (patch: Partial<SP>) => {
    const next = { ...sp, ...patch };
    const qs = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]);
    return `/search${qs.size ? `?${qs}` : ''}`;
  };

  const active = [
    sp.tag ? { label: `tag: ${facets.tags.find((t) => t.slug === sp.tag)?.name ?? sp.tag}`, href: link({ tag: undefined }) } : null,
    sp.collection ? { label: `coleção: ${facets.collections.find((c) => c.slug === sp.collection)?.name ?? sp.collection}`, href: link({ collection: undefined }) } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  const title = sp.q ? `Resultados para “${sp.q}”` : sort === 'new' ? 'Novidades' : featured ? 'Destaques' : 'Explorar';

  return (
    <div className="w-full px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link href={link({ kind: undefined })} className={pill(!kind)}>
          Tudo
        </Link>
        {KINDS.map((k) => (
          <Link key={k.kind} href={link({ kind: k.kind })} className={pill(kind === k.kind)}>
            {k.label}
          </Link>
        ))}
        <span className="mx-1 h-4 w-px bg-border" />
        <Link href={link({ sort: undefined, featured: undefined })} className={pill(!sort && !featured)}>
          Relevância
        </Link>
        <Link href={link({ sort: 'new', featured: undefined })} className={pill(sort === 'new')}>
          Novos
        </Link>
        <Link href={link({ featured: '1', sort: undefined })} className={pill(Boolean(featured))}>
          Hot
        </Link>
        <Link href={link({ sort: 'name', featured: undefined })} className={pill(sort === 'name')}>
          A–Z
        </Link>
        {active.map((a) => (
          <Badge key={a.label} variant="secondary" render={<Link href={a.href} />}>
            {a.label} <X />
          </Badge>
        ))}
      </div>

      {facets.tags.length > 0 && !sp.tag && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {facets.tags.slice(0, 30).map((t) => (
            <Link key={t.slug} href={link({ tag: t.slug })} className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted">
              {t.name} <span className="opacity-60">{t.count}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6">
        <ItemGrid filters={{ q: sp.q, kind, tag: sp.tag, collection: sp.collection, sort, featured }} showKind />
      </div>
    </div>
  );
}
