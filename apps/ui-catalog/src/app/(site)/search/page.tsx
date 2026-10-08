import type { Metadata } from 'next';
import Link from 'next/link';
import { ItemKind } from '@prisma/client';
import { X } from 'lucide-react';
import { KINDS } from '@/lib/site';
import { getFacets } from '@/lib/items';
import { ItemGrid } from '@/components/site/item-grid';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Buscar' };

type SP = { q?: string; kind?: string; tag?: string; collection?: string };

export default async function SearchPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const kind = sp.kind && (Object.values(ItemKind) as string[]).includes(sp.kind) ? (sp.kind as ItemKind) : undefined;
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

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">{sp.q ? `Resultados para “${sp.q}”` : 'Explorar'}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link href={link({ kind: undefined })} className={!kind ? 'rounded-full bg-foreground px-3 py-1 text-xs text-background' : 'rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted'}>
          Tudo
        </Link>
        {KINDS.map((k) => (
          <Link
            key={k.kind}
            href={link({ kind: k.kind })}
            className={kind === k.kind ? 'rounded-full bg-foreground px-3 py-1 text-xs text-background' : 'rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted'}
          >
            {k.label}
          </Link>
        ))}
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
        <ItemGrid filters={{ q: sp.q, kind, tag: sp.tag, collection: sp.collection }} showKind />
      </div>
    </div>
  );
}
