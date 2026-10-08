import { KeyRound, RefreshCw, Sparkles } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { CodeBlock } from '@/components/site/code-block';
import { McpClientTabs, type McpClient } from './mcp-client-tabs';
import { ClaudeIcon, CodexIcon, CopilotIcon, CursorIcon, GeminiIcon, WindsurfIcon } from './client-icons';

// Seção da LP: como ligar o MCP em cada cliente (abas com logo) + passos comuns.
const MCP_URL = `${SITE_URL}/api/mcp`;

const CLIENTS: McpClient[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    icon: <ClaudeIcon className="text-[#D97757]" />,
    where: '.mcp.json na raiz do projeto (ou -s user para todos)',
    code: (
      <>
        <CodeBlock lang="bash" code={`claude mcp add --transport http ui-catalog ${MCP_URL} \\\n  --header "Authorization: Bearer \${UI_CATALOG_MCP_TOKEN}"`} />
        <CodeBlock
          lang="json"
          title=".mcp.json"
          code={`{\n  "mcpServers": {\n    "ui-catalog": {\n      "type": "http",\n      "url": "${MCP_URL}",\n      "headers": { "Authorization": "Bearer \${UI_CATALOG_MCP_TOKEN}" }\n    }\n  }\n}`}
        />
      </>
    ),
    note: (
      <>
        O <code>.mcp.json</code> expande <code>$&#123;VAR&#125;</code> do ambiente. Depois, <code>/mcp</code> lista <strong>ui-catalog</strong> com 11 tools e <code>/plugin install ui-catalog@clickmax</code> traz as skills.
      </>
    ),
  },
  {
    id: 'claude-desktop',
    label: 'Claude Desktop',
    icon: <ClaudeIcon className="text-[#D97757]" />,
    where: 'claude_desktop_config.json (Configurações → Desenvolvedor → Editar config)',
    code: (
      <CodeBlock
        lang="json"
        title="claude_desktop_config.json"
        code={`{\n  "mcpServers": {\n    "ui-catalog": {\n      "command": "npx",\n      "args": ["-y", "mcp-remote", "${MCP_URL}", "--header", "Authorization:\${AUTH_HEADER}"],\n      "env": { "AUTH_HEADER": "Bearer cole-o-token-aqui" }\n    }\n  }\n}`}
      />
    ),
    note: (
      <>
        O Desktop só fala stdio com header customizado, então o <code>mcp-remote</code> faz a ponte. Sem espaço depois dos dois-pontos em <code>Authorization:</code> — o parser de args do Desktop quebra com espaço.
      </>
    ),
  },
  {
    id: 'codex',
    label: 'Codex',
    icon: <CodexIcon />,
    where: '~/.codex/config.toml',
    code: (
      <>
        <CodeBlock lang="toml" title="~/.codex/config.toml" code={`[mcp_servers.ui-catalog]\nurl = "${MCP_URL}"\nbearer_token_env_var = "UI_CATALOG_MCP_TOKEN"`} />
        <CodeBlock lang="bash" code={`# ou pela CLI\ncodex mcp add ui-catalog --url ${MCP_URL} --bearer-token-env-var UI_CATALOG_MCP_TOKEN`} />
      </>
    ),
    note: <>O Codex lê o token da variável de ambiente indicada — exporte <code>UI_CATALOG_MCP_TOKEN</code> antes de abrir.</>,
  },
  {
    id: 'cursor',
    label: 'Cursor',
    icon: <CursorIcon />,
    where: '.cursor/mcp.json (projeto) ou ~/.cursor/mcp.json (global)',
    code: (
      <CodeBlock
        lang="json"
        title=".cursor/mcp.json"
        code={`{\n  "mcpServers": {\n    "ui-catalog": {\n      "url": "${MCP_URL}",\n      "headers": { "Authorization": "Bearer \${env:UI_CATALOG_MCP_TOKEN}" }\n    }\n  }\n}`}
      />
    ),
    note: <>Depois de salvar, ative o servidor em Settings → MCP. O Cursor interpola <code>$&#123;env:VAR&#125;</code>.</>,
  },
  {
    id: 'windsurf',
    label: 'Windsurf',
    icon: <WindsurfIcon />,
    where: '~/.codeium/windsurf/mcp_config.json',
    code: (
      <CodeBlock
        lang="json"
        title="mcp_config.json"
        code={`{\n  "mcpServers": {\n    "ui-catalog": {\n      "serverUrl": "${MCP_URL}",\n      "headers": { "Authorization": "Bearer cole-o-token-aqui" }\n    }\n  }\n}`}
      />
    ),
    note: <>Servidor remoto usa <code>serverUrl</code> (não <code>url</code>). Recarregue em Cascade → MCP.</>,
  },
  {
    id: 'vscode',
    label: 'VS Code · Copilot',
    icon: <CopilotIcon />,
    where: '.vscode/mcp.json',
    code: (
      <CodeBlock
        lang="json"
        title=".vscode/mcp.json"
        code={`{\n  "inputs": [\n    { "id": "ui-catalog-token", "type": "promptString", "description": "Token do UI Catalog", "password": true }\n  ],\n  "servers": {\n    "ui-catalog": {\n      "type": "http",\n      "url": "${MCP_URL}",\n      "headers": { "Authorization": "Bearer \${input:ui-catalog-token}" }\n    }\n  }\n}`}
      />
    ),
    note: <>O VS Code pede o token uma vez (input com <code>password</code>) e guarda com segurança. Inicie em Chat → Tools.</>,
  },
  {
    id: 'gemini',
    label: 'Gemini CLI',
    icon: <GeminiIcon />,
    where: '~/.gemini/settings.json',
    code: (
      <CodeBlock
        lang="json"
        title="~/.gemini/settings.json"
        code={`{\n  "mcpServers": {\n    "ui-catalog": {\n      "httpUrl": "${MCP_URL}",\n      "headers": { "Authorization": "Bearer $UI_CATALOG_MCP_TOKEN" }\n    }\n  }\n}`}
      />
    ),
    note: <>Streamable HTTP usa <code>httpUrl</code>. Confira com <code>/mcp</code> dentro do Gemini CLI.</>,
  },
];

export function McpSetup() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
      <div className="min-w-0 rounded-xl border bg-card p-5">
        <McpClientTabs clients={CLIENTS} />
      </div>

      <div className="space-y-5">
        <Step Icon={KeyRound} n="01" title="Token">
          Peça o token para o time e deixe no shell (ex.: <code>~/.zshrc</code>). Os clientes que leem variável de ambiente pegam dali; os outros aceitam o valor colado.
          <CodeBlock className="mt-2" lang="bash" code={`export UI_CATALOG_MCP_TOKEN="cole-o-token-aqui"`} />
        </Step>
        <Step Icon={RefreshCw} n="02" title="Reinicie o cliente">
          Servidores MCP só carregam no início da sessão. Depois, a lista de servidores deve mostrar <strong>ui-catalog</strong> com 11 tools: buscar, ler, criar, atualizar, validar, categorias, coleções e tags.
        </Step>
        <Step Icon={Sparkles} n="03" title="Peça em uma frase">
          No Claude Code as skills <code>ui-catalog-create</code> e <code>ui-catalog-use</code> guiam o fluxo; nos outros clientes as tools funcionam igual.
          <CodeBlock
            className="mt-2"
            lang="bash"
            code={`"pega um hero do UI Catalog parecido com o do shadcnstudio e coloca na landing"\n"cria um bloco de FAQ com busca e publica no UI Catalog na categoria FAQ"\n"quais ilustrações beam existem? me mostra os links"`}
          />
        </Step>
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
            <dt className="text-xs text-muted-foreground">Sem token?</dt>
            <dd className="mt-0.5 text-xs">O endpoint responde 401. O registry e a API de leitura continuam públicos.</dd>
          </div>
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Docs</dt>
            <dd className="mt-0.5 text-xs">
              Tools, regras de autoria e API em{' '}
              <a href="/docs#mcp" className="underline">
                /docs
              </a>
              .
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Step({ Icon, n, title, children }: { Icon: React.ComponentType<{ className?: string }>; n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[40px_1fr]">
      <span className="flex size-8 items-center justify-center rounded-lg border bg-card">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <h3 className="font-medium">
          <span className="mr-2 font-mono text-xs text-muted-foreground">{n}</span>
          {title}
        </h3>
        <div className="mt-1 text-sm text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs">{children}</div>
      </div>
    </div>
  );
}
