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
- `Category` — por tipo (`kind + slug`) com `group` opcional (ver `src/lib/groups.ts`): blocos em Marketing / Dashboard & App /
  E-commerce / Datatable / Bento, páginas em Marketing / Aplicação; componentes = uma categoria por primitivo (nome em inglês);
  ilustrações por família. A fonte da taxonomia é `src/content/taxonomy.ts` (seed/publish fazem upsert e podam categorias vazias).
- `Collection` — transversal · `Tag`

## Organização do site (estilo shadcnstudio)

- `/<kind>` — hero + grupos com **cards de categoria** (thumbnail ao vivo do item de capa, badges Novo/Hot, contagem)
- `/<kind>/<categoria>` — todos os itens da categoria, um por linha, com toolbar (viewport, tema, Preview/Código, CLI, copiar, favorito)
- `/item/<slug>` — detalhe · `/search` — filtros Tudo/tipo + Relevância/Novos/Hot/A–Z · busca ⌘K no header
- Landing: hero centralizado → essenciais → ferramentas de IA → cards de grupo de blocos → páginas → ilustrações → componentes →
  números → por quê → mural de prompts → MCP → FAQ → CTA; mega footer com todas as categorias.

## Rotas

- UI: `/` (LP) · `/blocks|components|illustrations|pages` (abas por categoria) · `/<kind>/<categoria>` ·
  `/item/<slug>` · `/new` · `/search` · `/favorites` · `/collections` · `/docs`
- Preview (iframe): `/preview/<slug>?theme=dark|light&fit=center|full` · `/preview/live` (postMessage)
- Registry: `/r/registry.json` · `/r/<slug>.json` → `npx shadcn@latest add https://ui.codehall.io/r/<slug>.json`
- API: `/api/items` (cursor), `/api/items/:id` (GET/PATCH/DELETE), `/api/items/:id/code`, `/api/items/zip`,
  `/api/items/bulk`, `/api/facets`, `/api/stats`, `/api/check`
- MCP: `POST /api/mcp` (Bearer `UI_CATALOG_MCP_TOKEN`) — `search_items`, `get_item`, `add_item`,
  `update_item`, `delete_item`, `check_code`, `list_supported_modules`, `list_categories`,
  `upsert_category` (com `group`), `delete_category` (só vazia), `list_collections`, `list_tags`

> Escrita exige o token do catálogo (`UI_CATALOG_MCP_TOKEN`): no MCP e nas APIs como `Authorization: Bearer`, na UI via login em `/admin` (cookie httpOnly). Sem ele, `/new` redireciona para `/admin`, PATCH/DELETE/bulk respondem 401 e o botão Excluir some.

## Conteúdo

`src/content/manifest.ts` junta a taxonomia (`taxonomy.ts`) e os lotes de itens (`entries/*.ts`); os `.tsx` em
`src/content/<kind>/<categoria>/` são código real (type-checked) e também o texto salvo no banco. `pnpm seed` (local) e
`pnpm publish-content` (produção, via MCP com `UI_CATALOG_MCP_URL`/`UI_CATALOG_MCP_TOKEN`) fazem upsert por slug e
podam categorias vazias fora da taxonomia. `pnpm exec tsx scripts/check-content.ts [entries/<lote>.ts | <filtro>]`
valida sem banco (compila com sucrase, confere imports suportados, export default, categoria, slug único).

## Deploy

CI em `.github/workflows/ui-catalog.yml`: push na `main` tocando `apps/ui-catalog/**` → imagem
`ghcr.io/hikinine/ui-catalog:production` (amd64) → webhook do Dokploy (`cloud.codehall.io`, projeto
Catalog). Schema sincroniza no start (`docker-entrypoint.sh` → `prisma db push`).
