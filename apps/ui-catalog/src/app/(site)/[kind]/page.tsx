import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { KINDS, kindByPath } from '@/lib/site';
import { getFacets, listItems } from '@/lib/items';
import { CategoryTabs } from '@/components/site/category-tabs';
import { ItemCard } from '@/components/site/item-card';
import { ItemGrid } from '@/components/site/item-grid';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

const PER_SECTION = 6;

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const meta = kindByPath((await params).kind);
  return meta ? { title: meta.label, description: meta.description } : {};
}

// /blocks, /components, /illustrations, /pages — abas de categoria que ancoram em seções (estilo shadcnstudio).
export default async function KindPage({ params, searchParams }: { params: Promise<{ kind: string }>; searchParams: Promise<{ q?: string }> }) {
  const [{ kind: path }, { q }] = await Promise.all([params, searchParams]);
  const meta = kindByPath(path);
  if (!meta) notFound();

  const facets = await getFacets(meta.kind);
  const categories = facets.categories.filter((c) => c.count > 0);
  const total = categories.reduce((a, c) => a + c.count, 0);

  const [sections, uncategorized] = await Promise.all([
    Promise.all(
      categories.map(async (c) => ({ ...c, items: (await listItems({ kind: meta.kind, category: c.slug, status: 'PUBLISHED' }, { limit: PER_SECTION })).items })),
    ),
    listItems({ kind: meta.kind, uncategorized: true, status: 'PUBLISHED' }, { limit: PER_SECTION, withTotal: true }),
  ]);

  const tabs = [...categories.map((c) => ({ slug: c.slug, name: c.name, count: c.count })), ...(uncategorized.total ? [{ slug: 'outros', name: 'Outros', count: uncategorized.total }] : [])];

  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <header className="flex flex-col gap-4 py-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <nav className="mb-3 flex gap-1 text-xs">
            {KINDS.map((k) => (
              <Link
                key={k.path}
                href={`/${k.path}`}
                className={k.path === path ? 'rounded-full bg-foreground px-2.5 py-1 text-background' : 'rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted'}
              >
                {k.label}
              </Link>
            ))}
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{meta.label}</h1>
          <p className="mt-2 text-muted-foreground">{meta.description}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {total + (uncategorized.total ?? 0)} {meta.label.toLowerCase()} · {categories.length} categorias
        </p>
      </header>

      {q ? (
        <section className="pb-16">
          <h2 className="mb-4 text-lg font-medium">
            Resultados para “{q}” em {meta.label.toLowerCase()}
          </h2>
          <ItemGrid filters={{ kind: meta.kind, q }} />
        </section>
      ) : (
        <>
          <CategoryTabs tabs={tabs} />
          {sections.map((s) => (
            <Section key={s.slug} id={`cat-${s.slug}`} title={s.name} description={s.description} count={s.count} href={`/${path}/${s.slug}`}>
              {s.items.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </Section>
          ))}
          {uncategorized.total ? (
            <Section id="cat-outros" title="Outros" description="Itens sem categoria." count={uncategorized.total} href={`/search?kind=${meta.kind}`}>
              {uncategorized.items.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </Section>
          ) : null}
          {tabs.length === 0 && (
            <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
              Ainda não há {meta.label.toLowerCase()}. Publique pelo MCP ou pelo botão <Link href="/new" className="underline">Novo</Link>.
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Section({
  id,
  title,
  description,
  count,
  href,
  children,
}: {
  id: string;
  title: string;
  description?: string | null;
  count: number;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-b py-12 last:border-b-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            <Link href={href} className="hover:underline">
              {title}
            </Link>{' '}
            <span className="text-sm font-normal text-muted-foreground">{count}</span>
          </h2>
          {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
        </div>
        {count > PER_SECTION && (
          <Button variant="outline" size="sm" nativeButton={false} render={<Link href={href} />}>
            Ver todos <ArrowRight data-icon="inline-end" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}
