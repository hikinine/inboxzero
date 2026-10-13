import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Plus, Search, Terminal } from 'lucide-react';
import { GROUPS } from '@/lib/groups';
import { KINDS, kindByPath } from '@/lib/site';
import { getCategoryCards, groupCategoryCards } from '@/lib/items';
import { CategoryCard } from '@/components/site/category-card';
import { IllustrationShowcase } from '@/components/site/illustration-showcase';
import { CategoryTabs } from '@/components/site/category-tabs';
import { ItemGrid } from '@/components/site/item-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const dynamic = 'force-dynamic';

// Copy do hero por tipo (A.3 do briefing de produto).
const HERO: Record<string, { title: (n: number) => string; text: string }> = {
  BLOCK: { title: (n) => `${n}+ blocos shadcn/ui prontos para instalar`, text: 'Marketing, dashboard, e-commerce, datatable e bento. Claro e escuro, Base UI, preview ao vivo — e uma linha de CLI para instalar.' },
  COMPONENT: { title: (n) => `${n}+ variantes de componentes shadcn/ui`, text: 'Cada primitivo com variações prontas: botões, inputs, dialogs, tabelas, gráficos. Copie o código ou instale pelo registry.' },
  PAGE: { title: (n) => `${n}+ páginas inteiras, compostas pelos blocos`, text: 'Landing, pricing, dashboard, settings, autenticação e erro. Preview em viewport real, instaláveis como um arquivo só.' },
  ILLUSTRATION: { title: (n) => `${n}+ ilustrações animadas para shadcn/ui`, text: 'Beam, orbit, chat, marquee, card stack, texto e ripple. SVG + motion, herdam seus tokens e instalam como componente.' },
};

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const meta = kindByPath((await params).kind);
  return meta ? { title: meta.label, description: meta.description } : {};
}

// /blocks, /components, /illustrations, /pages — hero + grupos (Marketing, Dashboard & App…) com
// cards de categoria (thumbnail ao vivo + contagem), como no shadcnstudio.
export default async function KindPage({ params, searchParams }: { params: Promise<{ kind: string }>; searchParams: Promise<{ q?: string }> }) {
  const [{ kind: path }, { q }] = await Promise.all([params, searchParams]);
  const meta = kindByPath(path);
  if (!meta) notFound();

  const cards = await getCategoryCards(meta.kind);
  const groups = groupCategoryCards(meta.kind, cards);
  const total = cards.reduce((a, c) => a + c.count, 0);
  const hasGroups = GROUPS[meta.kind].length > 0;
  const lower = meta.label.toLowerCase();

  return (
    <div className="w-full px-6 lg:px-10">
      {/* Hero da listagem */}
      <header className="relative py-14 text-center sm:py-20">
        <div className="bg-grid absolute inset-x-0 -top-14 -z-10 h-[420px]" />
        <nav className="mb-4 flex justify-center gap-1 text-xs">
          {KINDS.map((k) => (
            <Link
              key={k.path}
              href={`/${k.path}`}
              className={k.path === path ? 'rounded-full bg-foreground px-3 py-1 text-background' : 'rounded-full px-3 py-1 text-muted-foreground hover:bg-muted'}
            >
              {k.label}
            </Link>
          ))}
        </nav>
        <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">{HERO[meta.kind]!.title(total)}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground sm:text-lg">{HERO[meta.kind]!.text}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/new" />}>
            <Plus data-icon="inline-start" /> Publicar {meta.singular.toLowerCase()}
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/docs#mcp" />}>
            <Terminal data-icon="inline-start" /> Configurar MCP
          </Button>
        </div>
        <form action={`/${path}`} className="relative mx-auto mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" defaultValue={q ?? ''} placeholder={`Buscar ${lower}…`} className="h-10 pl-9" aria-label={`Buscar ${lower}`} />
        </form>
      </header>

      {q ? (
        <section className="pb-16">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">
              Resultados para “{q}” em {lower}
            </h2>
            <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={`/${path}`} />}>
              Limpar busca
            </Button>
          </div>
          <ItemGrid filters={{ kind: meta.kind, q }} />
        </section>
      ) : cards.length === 0 ? (
        <div className="mb-16 rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">
          Ainda não há {lower}. Publique pelo MCP ou pelo botão{' '}
          <Link href="/new" className="underline">
            Novo item
          </Link>
          .
        </div>
      ) : (
        <>
          {meta.kind === 'ILLUSTRATION' && <IllustrationShowcase />}
          {hasGroups && groups.length > 1 && <CategoryTabs tabs={groups.map((g) => ({ slug: g.group.slug, name: g.group.name, count: g.count }))} prefix="g-" />}
          {groups.map((g) => (
            <section key={g.group.slug} id={`g-${g.group.slug}`} className="scroll-mt-32 border-b py-12 last:border-b-0">
              {(hasGroups || groups.length > 1) && (
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {g.group.name} <span className="text-base font-normal text-muted-foreground">{g.count}</span>
                    </h2>
                    {g.group.description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{g.group.description}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {g.cards.length} {g.cards.length === 1 ? 'categoria' : 'categorias'}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1920px]:grid-cols-5">
                {g.cards.map((c) => (
                  <CategoryCard key={c.slug} kind={meta.kind} cat={c} />
                ))}
              </div>
            </section>
          ))}
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Não achou o que precisa?</h2>
            <p className="max-w-md text-sm text-muted-foreground">Peça ao Claude pelo MCP: ele escreve, valida e publica um {meta.singular.toLowerCase()} novo na categoria certa.</p>
            <Button variant="outline" nativeButton={false} render={<Link href="/docs#mcp" />}>
              Como funciona <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
