import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { listItems } from '@/lib/items';
import { KINDS, SITE_URL, installCommand } from '@/lib/site';
import { ItemCard } from '@/components/site/item-card';
import { CodeBlock } from '@/components/site/code-block';
import { CopyButton } from '@/components/site/copy-button';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = await prisma.collection.findUnique({ where: { slug: (await params).slug } });
  return c ? { title: `${c.name} · Coleção`, description: c.description ?? undefined } : {};
}

// /collections/<slug> — a coleção como um template: página completa em destaque + itens por tipo + instalação em lote.
export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = await prisma.collection.findUnique({ where: { slug } });
  if (!col) notFound();

  const perKind = await Promise.all(KINDS.map((k) => listItems({ collection: slug, kind: k.kind, status: 'PUBLISHED' }, { limit: 60 })));
  const sections = KINDS.map((k, i) => ({ meta: k, items: perKind[i]!.items })).filter((s) => s.items.length > 0);
  const all = sections.flatMap((s) => s.items);
  if (all.length === 0) notFound();
  const page = sections.find((s) => s.meta.kind === 'PAGE')?.items[0] ?? null;
  const installAll = `npx shadcn@latest add ${all.map((i) => `${SITE_URL}/r/${i.slug}.json`).join(' ')}`;
  const prompt = [
    `Use a coleção "${col.name}" do UI Catalog (${SITE_URL}/collections/${col.slug}) no projeto:`,
    ...all.map((i) => `- ${i.name} (${i.kind.toLowerCase()}): ${SITE_URL}/item/${i.slug}`),
    '',
    'Instale tudo de uma vez:',
    installAll,
  ].join('\n');

  return (
    <div className="w-full px-6 lg:px-10">
      <header className="py-10">
        <nav className="mb-3 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>{' '}
          /{' '}
          <Link href="/collections" className="hover:text-foreground">
            Coleções
          </Link>{' '}
          / <span className="text-foreground">{col.name}</span>
        </nav>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {col.name} <span className="text-lg font-normal text-muted-foreground">{all.length} itens</span>
            </h1>
            <p className="mt-2 text-muted-foreground">{col.description ?? 'Blocos, páginas e componentes com o mesmo visual, prontos para compor um site inteiro.'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {page && (
              <Button variant="outline" nativeButton={false} render={<a href={`/preview/${page.slug}?theme=dark`} target="_blank" rel="noreferrer" />}>
                <ExternalLink data-icon="inline-start" /> Preview ao vivo
              </Button>
            )}
            <CopyButton value={prompt} label="Copiar prompt" variant="outline" />
            <CopyButton value={installAll} label="Copiar CLI (tudo)" />
          </div>
        </div>
      </header>

      {page && (
        <section className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Página completa</h2>
            <Link href={`/item/${page.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
              Abrir página do item →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border">
            <iframe src={`/preview/${page.slug}?theme=dark&fit=full`} title={page.name} className="h-[720px] w-full border-0 bg-background" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals" />
          </div>
        </section>
      )}

      {sections
        .filter((s) => s.meta.kind !== 'PAGE' || s.items.length > 1)
        .map((s) => (
          <section key={s.meta.kind} className="mb-12">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              {s.meta.label} <span className="text-sm font-normal text-muted-foreground">{s.items.length}</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1920px]:grid-cols-5">
              {s.items.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          </section>
        ))}

      <section className="mb-16 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Instalar a coleção inteira</h2>
          <p className="mt-1 text-sm text-muted-foreground">Um comando do shadcn CLI copia todos os arquivos e dependências para o projeto. Ou peça ao Claude pelo MCP.</p>
          <div className="mt-3 flex items-center gap-2 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <Sparkles className="size-4 shrink-0 text-brand" />
            <span>
              “usa a coleção {col.name} do UI Catalog para montar a landing” — a skill <code className="rounded bg-muted px-1">ui-catalog-use</code> instala e adapta.
            </span>
          </div>
        </div>
        <CodeBlock lang="bash" code={installAll} maxHeight={240} />
      </section>
    </div>
  );
}
