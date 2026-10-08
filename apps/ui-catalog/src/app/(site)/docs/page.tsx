import type { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS } from '@/lib/mcp/tools';
import { SITE_URL } from '@/lib/site';
import { AUTHORING_RULES, LIB_MODULE_NAMES } from '@/sandbox/module-list';
import { UI_MODULE_NAMES } from '@/sandbox/generated/ui-module-names';
import { CodeBlock } from '@/components/site/code-block';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = { title: 'Docs' };

const MCP_JSON = `{
  "mcpServers": {
    "ui-catalog": {
      "type": "http",
      "url": "${SITE_URL}/api/mcp",
      "headers": { "Authorization": "Bearer \${UI_CATALOG_MCP_TOKEN}" }
    }
  }
}`;

const TOC = [
  ['cli', 'Instalar via CLI'],
  ['mcp', 'MCP no Claude Code'],
  ['tools', 'Tools do MCP'],
  ['authoring', 'Regras de autoria'],
  ['modules', 'Imports suportados'],
  ['api', 'API REST'],
  ['skills', 'Skills'],
] as const;

export default function DocsPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Docs</div>
        <ul className="space-y-1 text-sm">
          {TOC.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-muted-foreground hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <article className="prose-sm max-w-3xl space-y-14">
        <section id="cli" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Instalar via CLI</h2>
          <p className="text-muted-foreground">
            Cada item é servido no formato <em>registry-item</em> do shadcn. Num projeto com <code>components.json</code>, uma linha instala o arquivo e as dependências (primitivos do shadcn e pacotes npm):
          </p>
          <CodeBlock lang="bash" code={`npx shadcn@latest add ${SITE_URL}/r/<slug>.json\n\n# vários de uma vez\nnpx shadcn@latest add ${SITE_URL}/r/hero-centralizado.json ${SITE_URL}/r/pricing-tres-planos.json`} />
          <p className="text-muted-foreground">
            O índice completo está em{' '}
            <a className="underline" href="/r/registry.json">
              /r/registry.json
            </a>
            . Os itens foram escritos com o estilo <code>base-nova</code> (Base UI); em projetos no estilo Radix, os primitivos equivalentes também existem e o CLI instala os do seu estilo.
          </p>
        </section>

        <section id="mcp" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">MCP no Claude Code</h2>
          <p className="text-muted-foreground">
            O catálogo expõe um servidor MCP (HTTP streamable, JSON-RPC, sem sessão). Adicione ao <code>.mcp.json</code> do projeto (ou ao global) e reinicie o Claude Code — servidores MCP só carregam no início da sessão:
          </p>
          <CodeBlock lang="json" code={MCP_JSON} title=".mcp.json" />
          <p className="text-muted-foreground">
            Exporte <code>UI_CATALOG_MCP_TOKEN</code> (peça o token para o time). Sem o token o endpoint responde 401.
          </p>
        </section>

        <section id="tools" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Tools do MCP</h2>
          <div className="divide-y rounded-xl border">
            {TOOLS.map((t) => (
              <div key={t.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr]">
                <code className="text-sm font-medium">{t.name}</code>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground">
            Fluxo recomendado para criar: <code>list_supported_modules</code> → escrever o TSX → <code>check_code</code> → <code>add_item</code> → abrir o preview no catálogo. Para usar: <code>search_items</code> → <code>get_item</code> → instalar com o comando devolvido.
          </p>
        </section>

        <section id="authoring" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Regras de autoria</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {AUTHORING_RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="text-muted-foreground">
            O preview compila o arquivo no navegador (sucrase) e resolve os imports num mapa fixo; Tailwind v4 roda em runtime no iframe, então qualquer classe funciona. O que não está em <a href="#modules" className="underline">imports suportados</a> não renderiza.
          </p>
        </section>

        <section id="modules" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Imports suportados</h2>
          <h3 className="text-sm font-medium">Primitivos shadcn ({UI_MODULE_NAMES.length})</h3>
          <div className="flex flex-wrap gap-1.5">
            {UI_MODULE_NAMES.map((m) => (
              <Badge key={m} variant="outline" className="font-mono">
                {m.replace('@/components/ui/', '')}
              </Badge>
            ))}
          </div>
          <h3 className="pt-2 text-sm font-medium">Bibliotecas e utilitários</h3>
          <div className="flex flex-wrap gap-1.5">
            {LIB_MODULE_NAMES.map((m) => (
              <Badge key={m} variant="secondary" className="font-mono">
                {m}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <code>next/link</code>, <code>next/image</code> e <code>next/navigation</code> são shims inertes no preview (viram <code>&lt;a&gt;</code>, <code>&lt;img&gt;</code> e hooks vazios).
          </p>
        </section>

        <section id="api" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">API REST</h2>
          <CodeBlock
            lang="bash"
            code={[
              `GET  ${SITE_URL}/api/items?q=&kind=&category=&collection=&tag=&cursor=&limit=&withTotal=1`,
              `GET  ${SITE_URL}/api/items/<id|slug>            # item completo (com code)`,
              `GET  ${SITE_URL}/api/items/<id|slug>/code       # TSX cru (text/plain); ?download=1`,
              `GET  ${SITE_URL}/api/facets?kind=BLOCK          # categorias, coleções, tags`,
              `GET  ${SITE_URL}/api/stats`,
              `POST ${SITE_URL}/api/check          { code }     # validação estática`,
              `POST ${SITE_URL}/api/items/zip      { ids }      # .zip com os .tsx`,
              `POST ${SITE_URL}/api/items/bulk     { action, ids, ... }  # addTags|removeTags|setCollection|setFeatured|setStatus`,
              `GET  ${SITE_URL}/r/registry.json  ·  GET ${SITE_URL}/r/<slug>.json`,
            ].join('\n')}
          />
          <p className="text-xs text-muted-foreground">As rotas da UI (PATCH/DELETE/bulk) não têm autenticação — o catálogo é uma ferramenta interna. Só o MCP exige token.</p>
        </section>

        <section id="skills" className="scroll-mt-24 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Skills do Claude Code</h2>
          <p className="text-muted-foreground">
            Duas skills acompanham o catálogo: <code>ui-catalog-create</code> (autorar e publicar via MCP, com validação) e <code>ui-catalog-use</code> (buscar, instalar e adaptar no projeto). No repo tasky elas já vêm em <code>.claude/skills/</code>; fora dele:
          </p>
          <CodeBlock lang="bash" code={`/plugin marketplace add hikinine/inboxzero\n/plugin install ui-catalog@clickmax`} />
          <p className="text-muted-foreground">
            Depois é só pedir: <em>“cria um bloco de pricing com três planos pro catálogo”</em> ou <em>“pega um hero do UI Catalog e coloca na landing”</em>. Veja também a página de <Link href="/new" className="underline">novo item</Link> para publicar à mão.
          </p>
        </section>
      </article>
    </div>
  );
}
