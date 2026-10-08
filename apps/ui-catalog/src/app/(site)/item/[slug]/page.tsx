import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Download, Sparkles } from 'lucide-react';
import { findItem, listItems } from '@/lib/items';
import { deriveDeps } from '@/lib/code';
import { SITE_URL, installCommand, kindMeta } from '@/lib/site';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CodeBlock } from '@/components/site/code-block';
import { CopyButton } from '@/components/site/copy-button';
import { InstallCommand } from '@/components/site/install-command';
import { ItemCard } from '@/components/site/item-card';
import { FavoriteButton } from '@/components/site/favorite-button';
import { ItemPreview } from './item-preview';
import { DeleteItemButton } from './delete-item-button';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await findItem((await params).slug);
  return item ? { title: item.name, description: item.description ?? undefined } : {};
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await findItem(slug);
  if (!item) notFound();

  const meta = kindMeta(item.kind);
  const derived = deriveDeps(item.code);
  const deps = [...new Set([...item.dependencies, ...derived.dependencies])];
  const regDeps = [...new Set([...item.registryDependencies, ...derived.registryDependencies])];
  const related = item.category
    ? (await listItems({ kind: item.kind, category: item.category.slug, status: 'PUBLISHED' }, { limit: 7 })).items.filter((i) => i.id !== item.id).slice(0, 6)
    : [];

  const url = `${SITE_URL}/item/${item.slug}`;
  const prompt = [
    `Use o item "${item.name}" (${meta.singular.toLowerCase()}) do UI Catalog no projeto.`,
    `Instale com: ${installCommand(item.slug)}`,
    `Preview e detalhes: ${url}`,
    `Código cru: ${SITE_URL}/api/items/${item.slug}/code (ou via MCP: get_item "${item.slug}").`,
  ].join('\n');

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>{' '}
        /{' '}
        <Link href={`/${meta.path}`} className="hover:text-foreground">
          {meta.label}
        </Link>
        {item.category && (
          <>
            {' '}
            /{' '}
            <Link href={`/${meta.path}/${item.category.slug}`} className="hover:text-foreground">
              {item.category.name}
            </Link>
          </>
        )}{' '}
        / <span className="text-foreground">{item.name}</span>
      </nav>

      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{item.name}</h1>
            <FavoriteButton slug={item.slug} />
            <Badge variant="secondary">{meta.singular}</Badge>
            {item.featured && <Badge className="bg-brand text-brand-foreground">Destaque</Badge>}
            {item.status !== 'PUBLISHED' && <Badge variant="outline">{item.status === 'DRAFT' ? 'Rascunho' : 'Arquivado'}</Badge>}
          </div>
          {item.description && <p className="mt-2 text-muted-foreground">{item.description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyButton value={item.code} label="Copiar código" />
          <Button variant="outline" size="sm" nativeButton={false} render={<a href={`/api/items/${item.slug}/code?download=1`} />}>
            <Download /> Baixar .tsx
          </Button>
          <CopyButton value={prompt} label="Copiar prompt" variant="outline" />
          <DeleteItemButton id={item.id} name={item.name} backHref={`/${meta.path}`} />
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <ItemPreview slug={item.slug} kind={item.kind} previewHeight={item.previewHeight} codeBlock={<CodeBlock code={item.code} title={`${item.slug}.tsx`} maxHeight={720} />} />
        </div>

        <aside className="space-y-5 text-sm">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Instalar</div>
            <InstallCommand slug={item.slug} />
            <p className="mt-2 text-xs text-muted-foreground">
              Registry compatível com o shadcn CLI. Também em{' '}
              <a href={`/r/${item.slug}.json`} className="underline" target="_blank" rel="noreferrer">
                /r/{item.slug}.json
              </a>
              .
            </p>
          </div>

          <Separator />

          <dl className="space-y-2">
            <Row label="ID">
              <span className="flex items-center gap-1 font-mono text-xs">
                <span className="max-w-[160px] truncate">{item.id}</span>
                <CopyButton value={item.id} iconOnly variant="ghost" className="size-6" />
              </span>
            </Row>
            <Row label="Slug">
              <span className="font-mono text-xs">{item.slug}</span>
            </Row>
            {item.category && (
              <Row label="Categoria">
                <Link href={`/${meta.path}/${item.category.slug}`} className="hover:underline">
                  {item.category.name}
                </Link>
              </Row>
            )}
            {item.collection && (
              <Row label="Coleção">
                <Link href={`/search?collection=${item.collection.slug}`} className="hover:underline">
                  {item.collection.name}
                </Link>
              </Row>
            )}
            <Row label="Origem">{item.source}</Row>
            <Row label="Criado">{item.createdAt.toLocaleDateString('pt-BR')}</Row>
            <Row label="Atualizado">{item.updatedAt.toLocaleDateString('pt-BR')}</Row>
          </dl>

          {regDeps.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Primitivos shadcn</div>
              <div className="flex flex-wrap gap-1.5">
                {regDeps.map((d) => (
                  <Badge key={d} variant="outline" render={<a href={`https://ui.shadcn.com/docs/components/${d}`} target="_blank" rel="noreferrer" />}>
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {deps.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Dependências npm</div>
              <div className="flex flex-wrap gap-1.5">
                {deps.map((d) => (
                  <Badge key={d} variant="secondary" className="font-mono">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.tags.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Tags</div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <Badge key={t.tag.slug} variant="outline" render={<Link href={`/search?tag=${t.tag.slug}`} />}>
                    {t.tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <Sparkles className="mb-1 size-4 text-brand" />
            Pelo Claude Code: <code className="rounded bg-muted px-1">get_item &quot;{item.slug}&quot;</code> devolve o código; a skill <code className="rounded bg-muted px-1">ui-catalog-use</code> instala e adapta no projeto.
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Mais em {item.category?.name}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
