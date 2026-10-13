import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, LayoutGrid } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getCategoryCards, metaSelect, toMeta } from '@/lib/items';
import { parseFaq, type CategoryFaq } from '@/lib/mcp/tools';
import { SITE_URL } from '@/lib/site';
import { CodeBlock } from '@/components/site/code-block';
import { ItemShowcase } from '@/components/site/item-showcase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

// Componentes que têm página própria em ui.shadcn.com/docs/components/<slug> (o slug da categoria bate).
const SHADCN_PRIMITIVES = new Set([
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'badge', 'breadcrumb', 'button', 'button-group', 'calendar', 'card',
  'carousel', 'chart', 'checkbox', 'collapsible', 'combobox', 'command', 'context-menu', 'data-table', 'date-picker', 'dialog', 'drawer',
  'dropdown-menu', 'empty', 'field', 'form', 'hover-card', 'input', 'input-group', 'input-otp', 'item', 'kbd', 'label', 'menubar',
  'navigation-menu', 'pagination', 'popover', 'progress', 'radio-group', 'resizable', 'scroll-area', 'select', 'separator', 'sheet',
  'sidebar', 'skeleton', 'slider', 'spinner', 'switch', 'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip', 'typography',
]);

async function loadCategory(slug: string) {
  return prisma.category.findUnique({ where: { kind_slug: { kind: 'COMPONENT', slug } } });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await loadCategory(slug).catch(() => null);
  if (!cat) return {};
  return { title: `${cat.name} · Componentes shadcn/ui`, description: cat.intro ?? cat.description ?? undefined };
}

// FAQ padrão quando a categoria ainda não tem uma (preenchível via MCP: upsert_category { faq }).
function defaultFaq(name: string, firstSlug?: string): CategoryFaq[] {
  return [
    {
      q: `Como instalo as variantes de ${name}?`,
      a: `Cada variante tem seu comando: \`npx shadcn@latest add ${SITE_URL}/r/${firstSlug ?? '<slug>'}.json\`. O CLI cria o arquivo em \`components/\` e instala os primitivos do shadcn e os pacotes npm de que ele depende. O comando de cada variante fica na aba Código.`,
    },
    {
      q: 'Funciona em projetos com Radix?',
      a: 'Os itens foram escritos no estilo `base-nova` (Base UI), mas o CLI instala os primitivos no estilo do seu `components.json`. Se o projeto usa Radix, troque `render={<X />}` por `asChild` nos gatilhos e o resto segue igual.',
    },
    {
      q: `Posso pedir variantes de ${name} ao Claude Code?`,
      a: `Sim. Com o MCP do catálogo configurado (veja /docs#mcp), peça algo como "pega um ${name.toLowerCase()} do UI Catalog": o Claude usa \`search_items\` e \`get_item\` para achar a variante e devolve o comando de instalação.`,
    },
  ];
}

// Crases viram <code> — o suficiente para as respostas do FAQ.
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, i) =>
        i % 2 ? (
          <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-semibold tracking-tight">
      <a href={`#${id}`} className="hover:underline">
        {children}
      </a>
    </h2>
  );
}

export default async function ComponentDocsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await loadCategory(slug);
  if (!cat) notFound();

  const [rows, siblings] = await Promise.all([
    prisma.item.findMany({
      where: { kind: 'COMPONENT', categoryId: cat.id, status: 'PUBLISHED' },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
      select: { ...metaSelect, code: true },
    }),
    getCategoryCards('COMPONENT'),
  ]);
  const items = rows.map((r) => ({ meta: toMeta(r), code: r.code }));
  const first = items[0]?.meta;
  const stored = parseFaq(cat.faq);
  const faq = stored.length ? stored : defaultFaq(cat.name, first?.slug);
  const regDeps = [...new Set(items.flatMap((i) => i.meta.registryDependencies))].sort();
  const npmDeps = [...new Set(items.flatMap((i) => i.meta.dependencies))].sort();

  const idx = siblings.findIndex((s) => s.slug === cat.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  // Mesmo critério da sidebar: o selo só aparece quando poucas categorias têm itens recentes.
  const isNewCat = idx >= 0 && siblings[idx].hasNew && siblings.filter((s) => s.hasNew).length <= siblings.length / 2;

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_200px]">
      <article className="min-w-0 space-y-14">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">
              Docs
            </Link>
            <span aria-hidden>/</span>
            <Link href="/components" className="hover:text-foreground">
              Componentes
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground">{cat.name}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{cat.name}</h1>
            {isNewCat && <Badge className="bg-brand text-brand-foreground">Novo</Badge>}
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            <RichText text={cat.intro ?? cat.description ?? `Variantes de ${cat.name} prontas para copiar, com preview ao vivo.`} />
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button variant="outline" size="sm" nativeButton={false} render={<Link href={`/components/${cat.slug}`} />}>
              <LayoutGrid data-icon="inline-start" /> Ver na galeria
            </Button>
            {SHADCN_PRIMITIVES.has(cat.slug) && (
              <Button variant="ghost" size="sm" nativeButton={false} render={<a href={`https://ui.shadcn.com/docs/components/${cat.slug}`} target="_blank" rel="noreferrer" />}>
                Primitivo no shadcn <ArrowUpRight data-icon="inline-end" />
              </Button>
            )}
            <span className="ml-auto hidden font-mono text-xs text-muted-foreground sm:inline">
              {items.length} {items.length === 1 ? 'variante' : 'variantes'} · Base UI · Tailwind v4
            </span>
          </div>
        </header>

        {first && (
          <section className="space-y-4">
            <SectionTitle id="instalacao">Instalação</SectionTitle>
            <p className="text-muted-foreground">
              Num projeto com <code className="font-mono text-sm text-foreground">components.json</code>, o CLI do shadcn instala a variante e as dependências dela. O comando abaixo
              instala <Link href={`#${first.slug}`} className="font-medium text-foreground underline underline-offset-4">{first.name}</Link>; o de cada variante fica na aba Código.
            </p>
            <CodeBlock lang="bash" code={`npx shadcn@latest add ${SITE_URL}/r/${first.slug}.json`} />
            {(regDeps.length > 0 || npmDeps.length > 0) && (
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span className="mr-1">Dependências das variantes:</span>
                {regDeps.map((d) => (
                  <Badge key={`r-${d}`} variant="outline" className="font-mono">
                    {d}
                  </Badge>
                ))}
                {npmDeps.map((d) => (
                  <Badge key={`n-${d}`} variant="secondary" className="font-mono">
                    {d}
                  </Badge>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="space-y-6">
          <SectionTitle id="variantes">
            Variantes <span className="font-normal text-muted-foreground">({items.length})</span>
          </SectionTitle>
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">Nenhuma variante publicada nesta categoria ainda.</div>
          ) : (
            <div className="space-y-16">
              {items.map(({ meta, code }, i) => (
                <ItemShowcase key={meta.id} item={meta} code={code} index={i} codeBlock={<CodeBlock code={code} title={`${meta.slug}.tsx`} maxHeight={560} />} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <SectionTitle id="faq">Perguntas frequentes</SectionTitle>
          <Accordion className="rounded-xl border px-4">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="py-4 text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-4 leading-relaxed text-muted-foreground">
                  <RichText text={f.a} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {(prev || next) && (
          <nav aria-label="Componentes vizinhos" className="grid gap-3 border-t pt-8 sm:grid-cols-2">
            {prev ? (
              <Button variant="outline" nativeButton={false} className="h-auto justify-start py-3" render={<Link href={`/docs/components/${prev.slug}`} />}>
                <ArrowLeft data-icon="inline-start" />
                <span className="flex flex-col items-start">
                  <span className="text-xs font-normal text-muted-foreground">Anterior</span>
                  {prev.name}
                </span>
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Button variant="outline" nativeButton={false} className="h-auto justify-end py-3 text-right" render={<Link href={`/docs/components/${next.slug}`} />}>
                <span className="flex flex-col items-end">
                  <span className="text-xs font-normal text-muted-foreground">Próximo</span>
                  {next.name}
                </span>
                <ArrowRight data-icon="inline-end" />
              </Button>
            )}
          </nav>
        )}
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-24 space-y-2 text-sm">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nesta página</div>
          <ul className="space-y-1.5">
            {first && (
              <li>
                <a href="#instalacao" className="text-muted-foreground hover:text-foreground">
                  Instalação
                </a>
              </li>
            )}
            <li>
              <a href="#variantes" className="text-muted-foreground hover:text-foreground">
                Variantes
              </a>
              {items.length > 0 && (
                <ul className="mt-1.5 space-y-1.5 border-l pl-3">
                  {items.map(({ meta }) => (
                    <li key={meta.id}>
                      <a href={`#${meta.slug}`} className="line-clamp-1 text-muted-foreground hover:text-foreground">
                        {meta.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a href="#faq" className="text-muted-foreground hover:text-foreground">
                Perguntas frequentes
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
