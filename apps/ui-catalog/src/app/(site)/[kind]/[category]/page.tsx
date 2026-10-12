import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { groupMeta } from '@/lib/groups';
import { kindByPath } from '@/lib/site';
import { getCategoryCards, metaSelect, toMeta } from '@/lib/items';
import { CodeBlock } from '@/components/site/code-block';
import { ItemShowcase } from '@/components/site/item-showcase';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 8;

export async function generateMetadata({ params }: { params: Promise<{ kind: string; category: string }> }): Promise<Metadata> {
  const { kind, category } = await params;
  const meta = kindByPath(kind);
  if (!meta) return {};
  const cat = await prisma.category.findUnique({ where: { kind_slug: { kind: meta.kind, slug: category } } });
  return cat ? { title: `${cat.name} · ${meta.label}`, description: cat.description ?? undefined } : {};
}

// /<kind>/<categoria> — todos os itens da categoria, um por linha, cada um com toolbar e preview
// interativo em largura total (como as páginas de categoria do shadcnstudio).
export default async function CategoryPage({ params, searchParams }: { params: Promise<{ kind: string; category: string }>; searchParams: Promise<{ page?: string }> }) {
  const [{ kind: path, category }, { page: pageRaw }] = await Promise.all([params, searchParams]);
  const meta = kindByPath(path);
  if (!meta) notFound();
  const cat = await prisma.category.findUnique({
    where: { kind_slug: { kind: meta.kind, slug: category } },
    include: { _count: { select: { items: { where: { status: 'PUBLISHED' } } } } },
  });
  if (!cat) notFound();

  const total = cat._count.items;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(pageRaw) || 1));

  const [rows, siblings] = await Promise.all([
    prisma.item.findMany({
      where: { kind: meta.kind, categoryId: cat.id, status: 'PUBLISHED' },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { ...metaSelect, code: true },
    }),
    getCategoryCards(meta.kind),
  ]);
  const group = groupMeta(meta.kind, cat.group);
  const sameGroup = siblings.filter((s) => s.group === cat.group);
  const pageHref = (p: number) => `/${path}/${cat.slug}${p > 1 ? `?page=${p}` : ''}`;

  return (
    <div className="w-full px-6 lg:px-10">
      <header className="py-10">
        <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>
          <span>/</span>
          <Link href={`/${path}`} className="hover:text-foreground">
            {meta.label}
          </Link>
          {group && (
            <>
              <span>/</span>
              <Link href={`/${path}#g-${group.slug}`} className="hover:text-foreground">
                {group.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{cat.name}</span>
        </nav>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {cat.name} <span className="text-lg font-normal text-muted-foreground">{total}</span>
            </h1>
            {cat.description && <p className="mt-2 text-muted-foreground">{cat.description}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" nativeButton={false} render={<Link href="/docs#mcp" />}>
              <Sparkles data-icon="inline-start" /> Pedir ao Claude
            </Button>
            <Button nativeButton={false} render={<Link href="/new" />}>
              <Plus data-icon="inline-start" /> Publicar aqui
            </Button>
          </div>
        </div>

        {sameGroup.length > 1 && (
          <div className="no-scrollbar mt-6 flex gap-1.5 overflow-x-auto py-1">
            {sameGroup.map((s) => (
              <Link
                key={s.slug}
                href={`/${path}/${s.slug}`}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors',
                  s.slug === cat.slug ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {s.name}
                <span className={cn('text-xs', s.slug === cat.slug ? 'opacity-70' : 'text-muted-foreground/70')}>{s.count}</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {rows.length === 0 ? (
        <div className="mb-16 rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">Nenhum item publicado nesta categoria ainda.</div>
      ) : (
        <div className="space-y-16 pb-10">
          {rows.map((it, i) => (
            <ItemShowcase
              key={it.id}
              item={toMeta(it)}
              code={it.code}
              index={(page - 1) * PAGE_SIZE + i}
              codeBlock={<CodeBlock code={it.code} title={`${it.slug}.tsx`} maxHeight={560} />}
            />
          ))}
        </div>
      )}

      {pages > 1 && (
        <nav className="flex items-center justify-center gap-1 pb-16" aria-label="Paginação">
          <Button variant="outline" size="sm" disabled={page <= 1} nativeButton={false} render={<Link href={pageHref(Math.max(1, page - 1))} aria-disabled={page <= 1} />}>
            <ChevronLeft /> Anterior
          </Button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <Button key={p} variant={p === page ? 'default' : 'ghost'} size="sm" nativeButton={false} render={<Link href={pageHref(p)} />}>
              {p}
            </Button>
          ))}
          <Button variant="outline" size="sm" disabled={page >= pages} nativeButton={false} render={<Link href={pageHref(Math.min(pages, page + 1))} aria-disabled={page >= pages} />}>
            Próxima <ChevronRight />
          </Button>
        </nav>
      )}
    </div>
  );
}
