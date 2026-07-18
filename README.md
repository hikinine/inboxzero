# tasky — monorepo

Monorepo pnpm + turbo. Node ≥ 22.

| App | O que é | Porta (dev) |
|---|---|---|
| `apps/api` | API NestJS do tasky | 3061 |
| `apps/web` | Front do tasky (Vite) | 3060 |
| `apps/agent` | Agente/pollers (Linear, Bitrix, GitHub, Gmail) | — |
| `apps/desktop` | App Tauri | 1420 |
| `apps/catalog` | **Catálogo de SVGs** — UI + API + servidor MCP · [hiki9.inboxzero.space](https://hiki9.inboxzero.space) | 3070 |
| `apps/email-checker` | **MX Check** — validação de e-mail por API key · [email-checker.inboxzero.space](https://email-checker.inboxzero.space) | 3072 |

```bash
pnpm install
pnpm dev                                  # sobe tudo via mprocs
docker compose -f infra/docker-compose.yml up -d   # bancos
```

---

## Skills do Claude Code (plugin `svg-catalog`)

Duas skills para trabalhar com o catálogo de ilustrações:

| Skill | Para quê |
|---|---|
| `svg-catalog-create` | Criar ilustrações no padrão CX/Clickmax (regras de autoria, marca, tokens, render-check) e publicar no catálogo via MCP |
| `svg-catalog-use` | Buscar e usar peças que já existem (busca por keyword/tag/coleção, como embutir, como recolorir) |

### Como usar

**Trabalhando neste repo: não precisa instalar nada.** As skills estão em
`.claude/skills/` (symlinks para `plugins/svg-catalog/skills/`), então quem clonar
o tasky já as recebe — é só aceitar o diálogo de confiança do projeto na primeira vez.

Depois é só pedir naturalmente (*"cria uns svgs de funil pro catálogo"*, *"pega uma
ilustração de dashboard da collection CX"*) — elas disparam sozinhas.

### Usar fora do tasky (opcional)

Para ter as skills em **outros projetos**, instale o plugin. Isso exige o painel de
plugins, disponível num **`claude` interativo no terminal** (em alguns ambientes o
`/plugin` não existe):

```
/plugin marketplace add hikinine/inboxzero
/plugin install svg-catalog@clickmax
```

Confira em `/plugin` → aba **Installed**; para atualizar, `/plugin marketplace update clickmax`.
Os comandos vão no **prompt do Claude Code**, não no shell.

### Pré-requisito: acesso ao catálogo

As skills usam as tools `mcp__catalog__*`. Configure o servidor MCP no `.mcp.json`
do projeto (arquivo é gitignored — peça o token para o time):

```json
{
  "mcpServers": {
    "catalog": {
      "type": "http",
      "url": "https://hiki9.inboxzero.space/api/mcp",
      "headers": { "Authorization": "Bearer ${CATALOG_MCP_TOKEN}" }
    }
  }
}
```

Exporte `CATALOG_MCP_TOKEN` no seu shell (ou cole o token direto no arquivo) e
**reinicie o Claude Code** — servidores MCP só carregam no início da sessão.
Sem o token as skills ainda orientam a autoria, mas não leem nem publicam.

O código do plugin fica em [`plugins/svg-catalog/`](plugins/svg-catalog/).

---

## Gotchas do monorepo

- **Prisma:** `apps/catalog` e `apps/email-checker` têm schemas diferentes mas
  **compartilham o mesmo client gerado** (mesma versão do `@prisma/client` no store
  do pnpm). Gerar num app sobrescreve o do outro → rode
  `pnpm --filter @tasky/<app> db-generate` antes de buildar o app em que está mexendo.
- **Migrations:** `prisma migrate dev` falha (shadow DB); use `prisma db push`.
