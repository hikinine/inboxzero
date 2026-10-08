import Link from 'next/link';
import { ArrowRight, Blocks, Code2, Layers, MonitorSmartphone, Moon, Palette, Sparkles, Terminal, Wand2 } from 'lucide-react';
import type { ItemKind } from '@prisma/client';
import { getStats, listItems, type ItemMeta } from '@/lib/items';
import { KINDS, SITE_URL } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/site/code-block';
import { Marquee } from '@/components/landing/marquee';
import { Stats } from '@/components/landing/stats';
import { ShowcaseTabs } from '@/components/landing/showcase-tabs';
import { InstallTabs } from '@/components/landing/install-tabs';
import { Faq } from '@/components/landing/faq';
import { McpSetup } from '@/components/landing/mcp-setup';
import DataFlowBeam from '@/content/illustrations/beam/data-flow-beam';

export const dynamic = 'force-dynamic';

const FEATURES = [
  { Icon: MonitorSmartphone, title: 'Preview de verdade', text: 'Cada item compila e renderiza ao vivo num iframe isolado, com Tailwind v4 em runtime. Mobile, tablet e desktop com um clique.' },
  { Icon: Moon, title: 'Claro e escuro', text: 'Só tokens do tema. Alterne o preview sem recarregar e veja como fica no seu projeto, não num mock.' },
  { Icon: Terminal, title: 'Registry do shadcn', text: 'Instale qualquer item com npx shadcn add <url>. Dependências npm e primitivos vêm junto.' },
  { Icon: Sparkles, title: 'MCP para o Claude Code', text: 'Buscar, ler, criar e validar itens direto da conversa. Duas skills guiam o fluxo de criar e o de usar.' },
  { Icon: Wand2, title: 'Ilustrações animadas', text: 'Beam, orbit, marquee, ripple: SVG + motion, temáveis, instaláveis como componente.' },
  { Icon: Layers, title: 'Organizado para escalar', text: 'Tipos → categorias → itens, mais coleções, tags, favoritos, busca, seleção múltipla e .zip.' },
];

export default async function HomePage() {
  const [stats, featured, ...perKind] = await Promise.all([
    getStats(),
    listItems({ featured: true, status: 'PUBLISHED' }, { limit: 10 }),
    ...KINDS.map((k) => listItems({ kind: k.kind, status: 'PUBLISHED' }, { limit: 6 })),
  ]);
  const byKind = Object.fromEntries(KINDS.map((k, i) => [k.kind, perKind[i]!.items])) as Record<ItemKind, ItemMeta[]>;
  const marqueeItems = (featured.items.length >= 4 ? featured.items : [...byKind.BLOCK, ...byKind.PAGE, ...byKind.ILLUSTRATION]).slice(0, 10);
  const exampleSlug = byKind.BLOCK[0]?.slug ?? 'hero-centralizado';

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 pt-20 lg:grid-cols-2 lg:items-center lg:pt-24">
          <div>
            <Badge variant="secondary" className="mb-5 gap-2">
              <span className="size-1.5 rounded-full bg-brand" /> shadcn/ui · Tailwind v4 · Base UI · motion
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Seu catálogo de UI <span className="text-muted-foreground">shadcn</span>, vivo.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Blocos, componentes, páginas e ilustrações animadas com preview real, instaláveis com uma linha e alimentados pelo Claude Code via MCP.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link href="/blocks" />}>
                Explorar blocos <ArrowRight data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link href="#mcp" />}>
                <Terminal data-icon="inline-start" /> Configurar MCP
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {KINDS.map((k) => (
                <Link key={k.kind} href={`/${k.path}`} className="hover:text-foreground">
                  <span className="font-medium text-foreground">{stats.byKind[k.kind]}</span> {k.label.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <DataFlowBeam />
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 pb-12">
          <Marquee items={marqueeItems} />
        </div>
      </section>

      {/* Números */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <Stats
          items={[
            { value: stats.total, label: 'itens publicados' },
            { value: stats.categories, label: 'categorias' },
            { value: stats.collections, label: 'coleções' },
            { value: 61, label: 'primitivos shadcn disponíveis' },
          ]}
        />
      </section>

      {/* Features */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <SectionHead eyebrow="por que" title="Um catálogo, não uma pasta de prints." text="O shadcnstudio mostrou o formato; aqui ele é seu: privado, alimentado por você e pelo Claude, com o código real como fonte da verdade." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-5">
                <f.Icon className="size-5 text-brand" />
                <h3 className="mt-3 font-medium">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <SectionHead eyebrow="o acervo" title="Abas por tipo, seções por categoria." text="Blocos de marketing, telas de app, componentes avulsos e ilustrações — cada um com sua organização, todos com preview ao vivo." />
          <div className="mt-10">
            <ShowcaseTabs byKind={byKind} />
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <SectionHead eyebrow="como funciona" title="Peça. Veja. Instale." />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Step n="01" Icon={Sparkles} title="Peça ao Claude" text="“Cria um bloco de pricing com três planos e toggle mensal/anual.” A skill ui-catalog-create escreve, valida (check_code) e publica (add_item)." />
            <Step n="02" Icon={Code2} title="Veja no catálogo" text="O item aparece na seção certa com preview ao vivo. Alterne tema e viewport, leia o código, ajuste pelo MCP se precisar." />
            <Step n="03" Icon={Blocks} title="Instale onde quiser" text="Uma linha do shadcn CLI copia o arquivo e as dependências pro projeto. Ou copie o código, ou baixe um .zip da seleção." />
          </div>
          <div className="mt-10 max-w-3xl">
            <InstallTabs
              cli={<CodeBlock lang="bash" code={`npx shadcn@latest add ${SITE_URL}/r/${exampleSlug}.json`} />}
              mcp={
                <CodeBlock
                  lang="json"
                  title=".mcp.json"
                  code={`{\n  "mcpServers": {\n    "ui-catalog": {\n      "type": "http",\n      "url": "${SITE_URL}/api/mcp",\n      "headers": { "Authorization": "Bearer \${UI_CATALOG_MCP_TOKEN}" }\n    }\n  }\n}`}
                />
              }
              prompt={
                <CodeBlock
                  lang="bash"
                  code={`# no Claude Code, com o MCP configurado:\n"pega um hero do UI Catalog, o mais parecido com o shadcnstudio, e coloca na landing"\n\n# para criar:\n"cria 3 variantes de card de pricing e publica no UI Catalog na categoria Pricing"`}
                />
              }
            />
          </div>
        </div>
      </section>

      {/* Ilustrações */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <SectionHead eyebrow="ilustrações" title="Animadas, temáveis, instaláveis." text="Não são PNGs nem SVGs soltos: são componentes React com motion. Herdam suas cores e seu raio, animam ao entrar na tela e em loop." />
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="flex items-center justify-center rounded-xl border bg-card p-8">
              <DataFlowBeam />
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Famílias: <strong className="text-foreground">Beam</strong> (feixes entre nós), <strong className="text-foreground">Orbit</strong> (elementos em órbita), <strong className="text-foreground">Marquee</strong> (faixas rolantes), <strong className="text-foreground">Card Stack</strong>, <strong className="text-foreground">Ripple</strong> e <strong className="text-foreground">Text</strong>.
              </p>
              <Button variant="outline" nativeButton={false} render={<Link href="/illustrations" />}>
                <Palette data-icon="inline-start" /> Ver ilustrações
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MCP */}
      <section id="mcp" className="scroll-mt-20 border-t">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <SectionHead eyebrow="claude code · mcp" title="Instale o MCP em dois minutos." text="Quatro passos e o Claude passa a buscar, criar e validar itens deste catálogo direto da conversa. Funciona também no Claude Desktop, Cursor e Windsurf com o mesmo JSON." />
          <div className="mt-10">
            <McpSetup />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_2fr]">
          <SectionHead eyebrow="dúvidas" title="Perguntas frequentes" />
          <Faq />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Pare de reconstruir o mesmo hero.</h2>
          <p className="max-w-xl text-muted-foreground">Publique uma vez, encontre sempre, instale em segundos.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/new" />}>
              Publicar um item
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/docs" />}>
              Ler a documentação
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
}

function Step({ n, Icon, title, text }: { n: string; Icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <Icon className="size-5 text-brand" />
        <span className="font-mono text-xs text-muted-foreground">{n}</span>
      </div>
      <h3 className="mt-3 font-medium">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
