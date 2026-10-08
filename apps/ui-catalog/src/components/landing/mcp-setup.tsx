import { Sparkles } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { CodeBlock } from '@/components/site/code-block';

// Seção da LP: passo a passo para ligar o MCP no Claude Code (e em outros clientes).
const MCP_URL = `${SITE_URL}/api/mcp`;

const STEPS: Array<{ n: string; title: string; text: React.ReactNode; code: string; lang: 'bash' | 'json' }> = [
  {
    n: '01',
    title: 'Adicione o servidor',
    text: (
      <>
        No terminal, dentro do projeto (ou com <code>-s user</code> para valer em todos). Alternativa: cole o JSON no <code>.mcp.json</code> da raiz.
      </>
    ),
    lang: 'bash',
    code: `claude mcp add --transport http ui-catalog ${MCP_URL} \\
  --header "Authorization: Bearer \${UI_CATALOG_MCP_TOKEN}"`,
  },
  {
    n: '02',
    title: 'Exporte o token',
    text: <>Peça o token para o time e deixe no seu shell (ex.: <code>~/.zshrc</code>). O <code>.mcp.json</code> expande <code>$&#123;VAR&#125;</code> sozinho.</>,
    lang: 'bash',
    code: `export UI_CATALOG_MCP_TOKEN="cole-o-token-aqui"`,
  },
  {
    n: '03',
    title: 'Reinicie e confira',
    text: <>Servidores MCP só carregam no início da sessão. Depois, <code>/mcp</code> deve listar <strong>ui-catalog</strong> com 11 tools.</>,
    lang: 'bash',
    code: `claude\n/mcp        # → ui-catalog ✓ (search_items, get_item, add_item, check_code…)`,
  },
  {
    n: '04',
    title: 'Instale as skills',
    text: <>Dentro do Claude Code. Elas ensinam o fluxo de criar (validar → publicar) e de usar (buscar → instalar). No repo tasky já vêm prontas.</>,
    lang: 'bash',
    code: `/plugin marketplace add hikinine/inboxzero\n/plugin install ui-catalog@clickmax`,
  },
];

const MCP_JSON = `{
  "mcpServers": {
    "ui-catalog": {
      "type": "http",
      "url": "${MCP_URL}",
      "headers": { "Authorization": "Bearer \${UI_CATALOG_MCP_TOKEN}" }
    }
  }
}`;

export function McpSetup() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-6">
        {STEPS.map((s) => (
          <div key={s.n} className="grid gap-2 sm:grid-cols-[48px_1fr]">
            <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
            <div className="min-w-0 space-y-2">
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs">{s.text}</p>
              <CodeBlock code={s.code} lang={s.lang} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <CodeBlock code={MCP_JSON} lang="json" title=".mcp.json (Claude Code · Claude Desktop · Cursor · Windsurf)" />
        <div className="rounded-xl border bg-card p-5 text-sm">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <Sparkles className="size-4 text-brand" /> Teste em uma frase
          </div>
          <p className="text-muted-foreground">Com o MCP ligado, é só pedir — a skill escolhe as tools, valida com <code className="rounded bg-muted px-1 font-mono text-xs">check_code</code> e publica:</p>
          <CodeBlock
            className="mt-3"
            lang="bash"
            code={`"pega um hero do UI Catalog parecido com o do shadcnstudio e coloca na landing"\n"cria um bloco de FAQ com busca e publica no UI Catalog na categoria FAQ"\n"quais ilustrações beam existem? me mostra os links"`}
          />
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Endpoint</dt>
            <dd className="mt-0.5 break-all font-mono text-xs">{MCP_URL}</dd>
          </div>
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Transporte</dt>
            <dd className="mt-0.5 font-mono text-xs">HTTP streamable · JSON-RPC 2.0 · Bearer</dd>
          </div>
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Tools</dt>
            <dd className="mt-0.5 text-xs">11 — buscar, ler, criar, atualizar, validar, categorias, coleções, tags</dd>
          </div>
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Sem token?</dt>
            <dd className="mt-0.5 text-xs">O endpoint responde 401. O registry e a API de leitura continuam públicos.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
