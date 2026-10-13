import Link from 'next/link';
import {
  ArrowRight,
  Blocks,
  Bot,
  Code2,
  Copy,
  FileCode2,
  Layers,
  MonitorSmartphone,
  Moon,
  Palette,
  Plus,
  Sparkles,
  Terminal,
  Wand2,
  Zap,
} from 'lucide-react';
import type { ItemKind } from '@prisma/client';
import { GROUPS } from '@/lib/groups';
import { getCategoryCards, getStats, listItems, type CategoryCardData } from '@/lib/items';
import { KINDS, LINKS, SITE_URL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { CodeBlock } from '@/components/site/code-block';
import { CategoryCard } from '@/components/site/category-card';
import { PreviewCard } from '@/components/site/preview-frame';
import { ClientOnly } from '@/components/site/client-only';
import { Skeleton } from '@/components/ui/skeleton';
import { Marquee } from '@/components/landing/marquee';
import { Stats } from '@/components/landing/stats';
import { InstallTabs } from '@/components/landing/install-tabs';
import { Faq } from '@/components/landing/faq';
import { McpSetup } from '@/components/landing/mcp-setup';
import DataFlowBeam from '@/content/illustrations/beam/data-flow-beam';
import IntegrationsOrbit from '@/content/illustrations/orbit/integrations-orbit';

export const dynamic = 'force-dynamic';

const STACKS = ['Next.js', 'Vite', 'Remix', 'Astro', 'TanStack', 'Expo', 'Laravel + Inertia', 'Gatsby'];
const EDITORS = ['Claude Code', 'Claude Desktop', 'Cursor', 'Windsurf', 'VS Code', 'Codex', 'Gemini CLI'];

const PROMPTS = [
  { who: 'paulo', text: 'Cria um pricing com três planos, toggle mensal/anual e o do meio em destaque. Publica em Pricing.', tag: 'criar' },
  { who: 'paulo', text: 'Pega o hero mais parecido com o do shadcnstudio e coloca na landing do projeto novo.', tag: 'usar' },
  { who: 'paulo', text: 'Lista as ilustrações da família Beam e instala a Data Flow Beam no app.', tag: 'buscar' },
  { who: 'paulo', text: 'Faz 4 variantes de card de métrica com sparkline e manda pro catálogo como Card.', tag: 'criar' },
  { who: 'paulo', text: 'Valida esse TSX com check_code antes de publicar — não quero import fora do mapa.', tag: 'validar' },
  { who: 'paulo', text: 'Monta uma página de settings com sidebar, usando só blocos que já existem no catálogo.', tag: 'compor' },
  { who: 'paulo', text: 'Troca a categoria desses 6 itens de Formulários para Input e marca os dois melhores como destaque.', tag: 'organizar' },
  { who: 'paulo', text: 'Gera o comando do shadcn CLI para instalar o kanban e a sidebar compacta.', tag: 'instalar' },
  { who: 'paulo', text: 'Cria uma coleção “Clickmax” com navbar, hero e footer no visual do produto.', tag: 'coleção' },
];

export default async function HomePage() {
  const [stats, featured, blockCats, pageCats, illCats, compCats] = await Promise.all([
    getStats(),
    listItems({ featured: true, status: 'PUBLISHED' }, { limit: 12 }),
    getCategoryCards('BLOCK'),
    getCategoryCards('PAGE'),
    getCategoryCards('ILLUSTRATION'),
    getCategoryCards('COMPONENT'),
  ]);
  const marqueeItems =
    featured.items.length >= 4 ? featured.items : (await listItems({ status: 'PUBLISHED' }, { limit: 12 })).items;
  const exampleSlug = featured.items.find((i) => i.kind === 'BLOCK')?.slug ?? 'hero-centralizado';
  const byKind = stats.byKind;

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-10 pt-16 text-center sm:pt-24">
          <div className="mb-6 flex items-center gap-3 rounded-full border bg-card/60 py-1.5 pl-1.5 pr-4 text-xs text-muted-foreground backdrop-blur">
            <AvatarGroup>
              {['PS', 'CL', 'CM', 'TK'].map((n) => (
                <Avatar key={n} size="sm">
                  <AvatarFallback className="text-[9px] font-medium">{n}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+</AvatarGroupCount>
            </AvatarGroup>
            <span>
              Usado no <strong className="text-foreground">Clickmax</strong>, <strong className="text-foreground">Codehall</strong> e <strong className="text-foreground">Tasky</strong>
            </span>
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl sm:leading-[1.05]">
            Construa interfaces futuristas em velocidade warp com <span className="underline decoration-brand decoration-4 underline-offset-8">shadcn/ui</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            <KindCount n={byKind.BLOCK} label="blocos" />, <KindCount n={byKind.PAGE} label="páginas" />, <KindCount n={byKind.COMPONENT} label="componentes" /> e{' '}
            <KindCount n={byKind.ILLUSTRATION} label="ilustrações animadas" /> — com preview ao vivo, registry para o shadcn CLI e um servidor MCP para o Claude Code. Tudo
            seu, gratuito, em claro e escuro.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/blocks" />}>
              <Sparkles data-icon="inline-start" /> Explorar blocos
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="#mcp" />}>
              Configurar MCP <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">Confiado por</span>
            {['Clickmax', 'Codehall', 'Bilhon', 'Tasky'].map((b) => (
              <span key={b} className="font-semibold tracking-tight text-foreground/70">
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 pb-14">
          <Marquee items={marqueeItems} />
        </div>
      </section>

      {/* ── Tudo num só lugar ────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <SectionHead eyebrow="Essenciais" title="Tudo o que você precisa num só lugar." text="Blocos, componentes, páginas e ilustrações feitos com os primitivos do shadcn — temáveis, acessíveis e instaláveis em qualquer stack React." center />
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3 [&>*]:min-w-0">
            <FeatureCard icon={Layers} title="Funciona com qualquer stack React" text="Next.js, Vite, Remix, Astro… o item é um arquivo TSX que usa só @/components/ui/* e Tailwind v4.">
              <div className="mt-4 flex flex-wrap gap-1.5">
                {STACKS.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </FeatureCard>
            <FeatureCard icon={FileCode2} title="O código é seu" text="Sem lock-in: copie, instale pelo CLI ou baixe um .zip. O arquivo entra no seu projeto e você edita à vontade.">
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  ['shadcn/ui', 'primitivos'],
                  ['Tailwind v4', 'estilo'],
                  ['Base UI', 'acessibilidade'],
                ].map(([a, b]) => (
                  <div key={a} className="rounded-lg border bg-muted/30 p-2">
                    <div className="font-medium text-foreground">{a}</div>
                    <div className="text-muted-foreground">{b}</div>
                  </div>
                ))}
              </div>
            </FeatureCard>
            <FeatureCard icon={Wand2} title="Animações com Motion" text="Ilustrações e microinterações com motion/react: entram na tela, animam em loop e herdam seus tokens.">
              <div className="mt-4 flex h-44 items-center justify-center overflow-hidden rounded-lg border bg-muted/20">
                <ClientOnly fallback={<Skeleton className="size-32 rounded-full" />}>
                  <div className="origin-center scale-[0.42]">
                    <IntegrationsOrbit />
                  </div>
                </ClientOnly>
              </div>
            </FeatureCard>
            <FeatureCard icon={MonitorSmartphone} title="Preview de verdade" text="Cada item compila e renderiza ao vivo num iframe isolado. Mobile, tablet e desktop, claro e escuro, com um clique." />
            <FeatureCard icon={Moon} title="Primitivos em primeiro lugar" text="Escrito no estilo base-nova (Base UI). Em projetos Radix, o CLI instala os primitivos equivalentes do seu components.json." />
            <div className="rounded-xl border bg-card p-5 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Terminal className="size-5 text-brand" />
                <h3 className="font-medium">Instale via CLI ou copie e cole</h3>
              </div>
              <div className="mt-3">
                <InstallTabs
                  cli={<CodeBlock lang="bash" code={`npx shadcn@latest add ${SITE_URL}/r/${exampleSlug}.json`} />}
                  mcp={<CodeBlock lang="bash" code={`claude mcp add --transport http ui-catalog ${SITE_URL}/api/mcp \\\n  --header "Authorization: Bearer $UI_CATALOG_MCP_TOKEN"`} />}
                  prompt={<CodeBlock lang="bash" code={`"usa o ${exampleSlug} do UI Catalog na home"`} />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ferramentas de IA ────────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <SectionHead eyebrow="Construa com IA" title="Ferramentas de IA e vibe coding ✨" text="O catálogo foi feito para ser operado por agentes: cada item é validado, descrito e instalável por uma linha." center />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <AiCard icon={Bot} title="Servidor MCP" text="Buscar, ler, criar, atualizar e validar itens direto da conversa. Funciona no Claude Code, Claude Desktop, Cursor, Windsurf, Codex e mais." href="#mcp" cta="Configurar" />
            <AiCard icon={Sparkles} title="Skills do Claude" text="ui-catalog-create escreve e publica; ui-catalog-use busca, instala e adapta no projeto. Duas skills, fluxo completo." href="/docs#skills" cta="Ver skills" />
            <AiCard icon={Copy} title="Copiar prompt" text="Selecione vários itens e copie um prompt pronto com links, slugs e comandos de instalação para colar em qualquer agente." href="/blocks" cta="Selecionar itens" />
            <AiCard icon={Zap} title="Construa 10× mais rápido" text="Peça, veja o preview, instale. Sem abrir Figma, sem reconstruir o mesmo hero pela décima vez." href="/docs" cta="Como funciona">
              <div className="mt-3 flex flex-wrap gap-1">
                {EDITORS.map((e) => (
                  <span key={e} className="rounded-md border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground">
                    {e}
                  </span>
                ))}
              </div>
            </AiCard>
          </div>
        </div>
      </section>

      {/* ── Blocos por grupo ─────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <SectionHead eyebrow="Copiar e colar" title={`Explore ${byKind.BLOCK}+ blocos shadcn/ui`} text="Marketing, Dashboard & App, E-commerce, Datatable e Bento — organizados em categorias com preview ao vivo." center />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {GROUPS.BLOCK.map((g) => {
              const cats = blockCats.filter((c) => c.group === g.slug);
              if (!cats.length) return null;
              return <GroupCard key={g.slug} kind="BLOCK" slug={g.slug} name={g.name} description={g.description} cats={cats} />;
            })}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/blocks" />}>
              Explorar todos os blocos <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Páginas ──────────────────────────────────────────────────────── */}
      {pageCats.length > 0 && (
        <section className="border-t">
          <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
            <SectionHead eyebrow="Prontas para usar" title={`Explore ${byKind.PAGE}+ páginas completas`} text="Landing pages, dashboards, autenticação, settings e fluxos de app compostos pelos blocos do catálogo." center />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pageCats.slice(0, 8).map((c) => (
                <CategoryCard key={c.slug} kind="PAGE" cat={c} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/pages" />}>
                Ver todas as páginas <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Ilustrações ──────────────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <SectionHead eyebrow="Ilustrações" title={`${byKind.ILLUSTRATION}+ ilustrações animadas e temáveis`} text="Não são PNGs: são componentes React com SVG + motion. Herdam suas cores e seu raio, animam ao entrar na tela e em loop — e instalam como qualquer componente." />
              <div className="mt-6 flex flex-wrap gap-1.5">
                {illCats.map((c) => (
                  <Link key={c.slug} href={`/illustrations/${c.slug}`} className="rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                    {c.name} <span className="text-xs">{c.count}</span>
                  </Link>
                ))}
              </div>
              <Button className="mt-6" variant="outline" nativeButton={false} render={<Link href="/illustrations" />}>
                <Palette data-icon="inline-start" /> Ver ilustrações
              </Button>
            </div>
            <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-xl border bg-card p-6">
              <ClientOnly fallback={<Skeleton className="h-64 w-full max-w-md" />}>
                <DataFlowBeam />
              </ClientOnly>
            </div>
          </div>
        </div>
      </section>

      {/* ── Componentes ──────────────────────────────────────────────────── */}
      {compCats.length > 0 && (
        <section className="border-t">
          <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
            <SectionHead eyebrow="Variantes" title={`${byKind.COMPONENT}+ variantes de componentes`} text="Um card por primitivo — Accordion, Button, Input, Table, Tabs… — cada um com suas variações, estados e tamanhos." center />
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {compCats.map((c) => (
                <Link key={c.slug} href={`/components/${c.slug}`} className="rounded-lg border bg-card px-3 py-1.5 text-sm transition-colors hover:border-foreground/30">
                  {c.name} <span className="text-xs text-muted-foreground">{c.count}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/components" />}>
                Ver todos os componentes <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── Números ──────────────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <SectionHead eyebrow="Impacto" title="O catálogo em números" center />
          <div className="mt-10">
            <Stats
              items={[
                { value: stats.total, label: 'itens publicados' },
                { value: stats.categories, label: 'categorias' },
                { value: byKind.ILLUSTRATION, label: 'ilustrações animadas' },
                { value: 61, label: 'primitivos shadcn disponíveis' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Por que construímos ──────────────────────────────────────────── */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-6 lg:px-10 py-20 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead eyebrow="Por que" title="Por que construímos o ui/catalog" />
          <div className="space-y-4 text-muted-foreground">
            <p>
              O shadcnstudio mostrou o formato certo: um catálogo de blocos e componentes com preview, organizado por categorias, instalável por uma linha. Mas o que faltava era um
              catálogo <strong className="text-foreground">privado e vivo</strong> — alimentado pelos próprios projetos (Clickmax, Codehall, Tasky) e por um agente que escreve, valida e
              publica.
            </p>
            <p>
              Então o Paulo construiu este, com o Claude Code: o código fica no banco, o preview compila no navegador, o registry fala com o shadcn CLI e o MCP fala com qualquer editor
              de IA. Publique uma vez, encontre sempre, instale em segundos.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              <Founder initials="PS" name="Paulo Santana" role="Engenheiro & fundador" />
              <Founder initials="CC" name="Claude Code" role="Co-autor do catálogo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mural de prompts ─────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <SectionHead eyebrow="Mural de prompts" title="O que dá para pedir ao Claude" text="Com o MCP configurado, estas frases viram itens publicados, instalados ou organizados — sem sair da conversa." center />
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {PROMPTS.map((p, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <div className="font-medium">@{p.who}</div>
                    <div className="text-muted-foreground">→ Claude Code</div>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {p.tag}
                  </Badge>
                </div>
                <p className="mt-3 text-sm">“{p.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MCP ──────────────────────────────────────────────────────────── */}
      <section id="mcp" className="scroll-mt-20 border-t bg-muted/20">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-10 py-20">
          <SectionHead eyebrow="mcp · claude code · claude desktop · codex · cursor · windsurf · copilot · gemini" title="Instale o MCP em dois minutos." text="Escolha seu cliente, cole a configuração, exporte o token e reinicie. O agente passa a buscar, criar e validar itens deste catálogo direto da conversa." />
          <div className="mt-10">
            <McpSetup />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-6 lg:px-10 py-20 lg:grid-cols-[1fr_2fr]">
          <SectionHead eyebrow="Dúvidas" title="Alguma pergunta?" text="O essencial sobre como o catálogo funciona, o que o MCP faz e como os itens chegam ao seu projeto." />
          <Faq />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-6 px-6 py-24 text-center">
          <Blocks className="size-8 text-brand" />
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Pare de reconstruir o mesmo hero.</h2>
          <p className="max-w-xl text-muted-foreground">Publique uma vez, encontre sempre, instale em segundos — você ou o seu agente.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/new" />}>
              <Plus data-icon="inline-start" /> Publicar um item
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/docs" />}>
              <Code2 data-icon="inline-start" /> Ler a documentação
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Inspirado no{' '}
            <a href={LINKS.shadcnstudio} target="_blank" rel="noreferrer" className="underline">
              shadcnstudio
            </a>
            . Construído com{' '}
            <a href={LINKS.shadcn} target="_blank" rel="noreferrer" className="underline">
              shadcn/ui
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

// ── Peças locais ────────────────────────────────────────────────────────────

function KindCount({ n, label }: { n: number; label: string }) {
  return (
    <span>
      <strong className="text-foreground">{n}+</strong> {label}
    </span>
  );
}

function SectionHead({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text, children }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <Icon className="size-5 text-brand" />
      <h3 className="mt-3 font-medium">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
      {children}
    </div>
  );
}

function AiCard({ icon: Icon, title, text, href, cta, children }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; href: string; cta: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-5">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{text}</p>
      {children}
      <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline">
        {cta} <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

// Card de grupo (Marketing, Dashboard & App…): colagem 2×2 de previews + lista de categorias com contagem.
function GroupCard({ kind, slug, name, description, cats }: { kind: ItemKind; slug: string; name: string; description: string; cats: CategoryCardData[] }) {
  const meta = KINDS.find((k) => k.kind === kind)!;
  const covers = cats.filter((c) => c.cover).slice(0, 4);
  const total = cats.reduce((a, c) => a + c.count, 0);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card">
      <Link href={`/${meta.path}#g-${slug}`} className="grid grid-cols-2 gap-px border-b bg-border">
        {covers.map((c) => (
          <div key={c.slug} className="bg-background">
            <PreviewCard slug={c.cover!.slug} kind={c.cover!.kind} />
          </div>
        ))}
        {covers.length === 0 && <div className="col-span-2 flex aspect-video items-center justify-center bg-background text-xs text-muted-foreground">sem preview</div>}
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {total} {meta.label.toLowerCase()}
          </Badge>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          {cats.slice(0, 10).map((c) => (
            <li key={c.slug}>
              <Link href={`/${meta.path}/${c.slug}`} className="flex items-center justify-between gap-2 text-foreground/80 hover:text-foreground">
                <span className="truncate">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.count}</span>
              </Link>
            </li>
          ))}
        </ul>
        {cats.length > 10 && <p className="mt-2 text-xs text-muted-foreground">+ {cats.length - 10} categorias</p>}
        <Link href={`/${meta.path}#g-${slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline">
          Explorar {name.toLowerCase()} <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

function Founder({ initials, name, role }: { initials: string; name: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-xs">{role}</div>
      </div>
    </div>
  );
}
