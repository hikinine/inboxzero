# @tasky/catalog

Catálogo de telas (SVG) — UI web + API + servidor **MCP** num app Next.js (App Router).
Postgres dedicado (isolado do tasky).

## Stack

- **Next.js 15** (App Router) — UI, server actions e endpoint MCP
- **Prisma** → **Postgres** (container `catalog-postgres`, porta **5434**)
- SVG guardado inline (coluna `text`), previews renderizadas via `<img>` data-URI (não executa scripts)

## Rodar

```bash
# 1. sobe o Postgres do catálogo (junto com o do tasky)
pnpm db-up            # docker compose -f infra/docker-compose.yml up -d

# 2. cria o schema e popula exemplos
pnpm --filter @tasky/catalog db-push
pnpm --filter @tasky/catalog seed

# 3. dev (http://localhost:3070)
pnpm --filter @tasky/catalog dev
```

## Modelo

- `Screen` — tela: `slug, name, description, svg, width, height, status, source`
- `Collection` — agrupa telas (app/projeto/família)
- `Tag` + `ScreenTag` — marcação N:N

## MCP

Endpoint **HTTP streamable** (JSON-RPC 2.0, stateless) em `POST /api/mcp`, auth `Bearer <CATALOG_MCP_TOKEN>`.

Tools: `search_screens`, `get_screen`, `add_screen`, `update_screen`, `delete_screen`, `list_collections`, `list_tags`.

## API REST (consumida pela UI)

- `GET /api/screens?q=&collection=&tag=&cursor=&limit=&withTotal=1` — listagem paginada por cursor (infinite scroll)
- `GET /api/screens/:id/raw` — SVG cru (`image/svg+xml`) para previews via `<img>`
- `DELETE /api/screens/:id` · `PATCH /api/screens/:id` — remover / atualizar

> ⚠️ **Antes de hospedar:** essas rotas REST da UI estão **sem auth** (ok em local).
> Só o endpoint MCP é protegido por token. Adicione auth (sessão/cookie) nas rotas
> mutáveis antes do deploy público.

Config no Claude Code (`.mcp.json`) / Claude Desktop:

```json
{
  "mcpServers": {
    "catalog": {
      "type": "http",
      "url": "http://localhost:3070/api/mcp",
      "headers": { "Authorization": "Bearer <CATALOG_MCP_TOKEN>" }
    }
  }
}
```

O token está em `apps/catalog/.env` (`CATALOG_MCP_TOKEN`).
