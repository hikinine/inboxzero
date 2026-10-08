# @tasky/ui-catalog

Catálogo de UI shadcn/ui — componentes, blocos, páginas e ilustrações animadas — com **preview ao
vivo**, **registry** compatível com o shadcn CLI e servidor **MCP**. Produção: https://ui.codehall.io

## Stack

- **Next.js 15** (App Router) · **Tailwind v4** · **shadcn/ui** (estilo `base-nova`, Base UI) · **motion** · **recharts**
- **Prisma** → Postgres (`UI_CATALOG_DATABASE_URL`)
- Preview: o TSX de cada item é compilado **no navegador** (sucrase) dentro de um `<iframe>` com
  `@tailwindcss/browser` (Tailwind em runtime → qualquer classe funciona). Imports resolvem num mapa
  fixo (`src/sandbox/modules.ts` + `@/components/ui/*` gerado).

## Rodar

```bash
pnpm db-up                                 # sobe os Postgres do monorepo (ui-catalog: porta 5436)
pnpm --filter @tasky/ui-catalog db-push    # schema
pnpm --filter @tasky/ui-catalog seed       # categorias + conteúdo de src/content (idempotente)
pnpm --filter @tasky/ui-catalog dev        # http://localhost:3073
```

`postinstall`/`predev`/`prebuild` rodam `scripts/gen-sandbox.ts`, que gera `src/sandbox/generated/`
(lista/loaders dos `@/components/ui/*` e o CSS do tema inlinado para o iframe). Adicionou um
componente em `src/components/ui`? Rode `pnpm gen-modules`.

## Modelo

- `Item` — `slug, name, kind (COMPONENT|BLOCK|PAGE|ILLUSTRATION), code, dependencies[], registryDependencies[], featured, status`
- `Category` — por tipo (`kind + slug`), vira aba + seção · `Collection` — transversal · `Tag`

## Rotas

- UI: `/` (LP) · `/blocks|components|illustrations|pages` (abas por categoria) · `/<kind>/<categoria>` ·
  `/item/<slug>` · `/new` · `/search` · `/favorites` · `/collections` · `/docs`
- Preview (iframe): `/preview/<slug>?theme=dark|light&fit=center|full` · `/preview/live` (postMessage)
- Registry: `/r/registry.json` · `/r/<slug>.json` → `npx shadcn@latest add https://ui.codehall.io/r/<slug>.json`
- API: `/api/items` (cursor), `/api/items/:id` (GET/PATCH/DELETE), `/api/items/:id/code`, `/api/items/zip`,
  `/api/items/bulk`, `/api/facets`, `/api/stats`, `/api/check`
- MCP: `POST /api/mcp` (Bearer `UI_CATALOG_MCP_TOKEN`) — `search_items`, `get_item`, `add_item`,
  `update_item`, `delete_item`, `check_code`, `list_supported_modules`, `list_categories`,
  `upsert_category`, `list_collections`, `list_tags`

> ⚠️ As rotas mutáveis da UI (PATCH/DELETE/bulk) **não têm auth** — ferramenta interna. Só o MCP exige token.

## Conteúdo inicial

`src/content/manifest.ts` lista categorias e itens; os `.tsx` em `src/content/**` são código real
(type-checked) e também o texto salvo no banco. `pnpm seed` (local) e `pnpm publish-content`
(produção, via MCP com `UI_CATALOG_MCP_URL`/`UI_CATALOG_MCP_TOKEN`) fazem upsert por slug.

## Deploy

CI em `.github/workflows/ui-catalog.yml`: push na `main` tocando `apps/ui-catalog/**` → imagem
`ghcr.io/hikinine/ui-catalog:production` (amd64) → webhook do Dokploy (`cloud.codehall.io`, projeto
Catalog). Schema sincroniza no start (`docker-entrypoint.sh` → `prisma db push`).
