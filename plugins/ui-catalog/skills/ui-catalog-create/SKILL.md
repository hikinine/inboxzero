---
name: ui-catalog-create
description: >-
  Cria componentes, blocos de página, páginas e ilustrações animadas em React +
  shadcn/ui + Tailwind v4 e publica no UI Catalog (ui.codehall.io) via MCP. Use
  SEMPRE que o usuário pedir para criar/gerar/fazer um componente, bloco, seção,
  hero, pricing, dashboard, tela, ilustração animada (beam, orbit, marquee…),
  "variantes de X", "publica no catálogo de UI", "sobe pro ui-catalog". Traz as
  regras de autoria (arquivo único, export default, só tokens do tema), os
  imports suportados no preview, a validação obrigatória (check_code) e como
  publicar sem duplicar.
---

# Criar item → UI Catalog

Catálogo de produção: **https://ui.codehall.io** (preview ao vivo claro/escuro, registry
shadcn, MCP). Tools: `mcp__ui-catalog__list_supported_modules`, `check_code`, `add_item`,
`update_item`, `search_items`, `get_item`, `list_categories`, `upsert_category`.

## Workflow (nesta ordem)

1. **`list_supported_modules`** — lista os `@/components/ui/*` disponíveis, bibliotecas
   (`motion/react`, `recharts`, `lucide-react`…), regras e categorias existentes.
   Não invente import: o que não está na lista **não renderiza** no preview.
2. **Veja o que existe**: `search_items { kind, category }` — reaproveite padrões, mantenha
   coerência com a categoria de destino, não duplique nome.
3. **Autore** um arquivo TSX único (ver regras). Para variantes, mude composição/layout, não só cor.
4. **`check_code { code }`** — obrigatório. Corrija até `ok: true` (sintaxe, imports, export default).
5. **`add_item`** com `kind`, `category`, `description`, `tags`. Se a categoria for nova, dê
   `categoryDescription` (vira o texto da seção) ou use `upsert_category` com `order`.
6. **Confira**: abra `url` da resposta (ou `previewUrl`) — se o usuário puder ver, mostre o link.

## Regras duras de autoria

- **Um arquivo**, auto-contido, `export default function NomeDoItem()` **sem props obrigatórias**.
  Dados de exemplo dentro do arquivo (pt-BR, realistas, curtos; sem lorem ipsum).
- Imports só de: `@/components/ui/<nome>`, `@/lib/utils` (`cn`), `lucide-react`, `motion/react`,
  `recharts`, `react`, `date-fns`, `cmdk`, `next/link|image|navigation` (shims no preview).
- **Só tokens do tema**: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`,
  `border-border`, `bg-primary`, `bg-muted`, `var(--primary)`… **Nada de hex hardcoded** (exceto
  cores semânticas pontuais como `text-emerald-500` para "ok"). Precisa ficar bom em claro E escuro.
- Sem `process.env`, sem fetch externo, sem imagens remotas. Imagem = gradiente/placeholder/SVG.
- Comece o arquivo com `'use client'` (os itens têm estado/animação e também são importados nativamente).
- **Base UI, não Radix**: os primitivos são estilo `base-nova`. Não existe `asChild`; use
  `render={<Button />}` em triggers (`DialogTrigger render={<Button variant="outline" />}`),
  `Select` precisa de `items`; prefira `NativeSelect` em formulários simples.
  Ícone dentro de botão: `<Icon data-icon="inline-start" />`.
- **Tamanho por tipo**: `BLOCK`/`PAGE` ocupam `w-full` com padding próprio (`px-6 py-20`) e são
  mostrados num viewport desktop escalado; `COMPONENT`/`ILLUSTRATION` têm tamanho natural
  (ex.: `w-full max-w-xl`, `size-[320px]`) e o preview centraliza.

## Ilustrações (kind ILLUSTRATION)

SVG inline + `motion/react`; herdam o tema via `fill="var(--card)"`, `stroke="var(--border)"`,
`stroke="var(--primary)"`, `currentColor`. Famílias existentes: **Beam** (feixe percorrendo
conectores: `motion.path` com `initial={{ pathLength: 0.3, pathSpacing: 1, pathOffset: 0 }}`
`animate={{ ..., pathOffset: 1 }}` `transition={{ repeat: Infinity, ease: 'linear' }}`),
**Orbit** (anéis `animate={{ rotate: 360 }}` com contra-rotação nos ícones), **Marquee**
(`animate={{ x: ['0%','-50%'] }}` com conteúdo duplicado e mask nas bordas), **Card Stack**
(`AnimatePresence` + `layout`), **Ripple** (`scale`/`opacity` em loop com `delay` escalonado),
**Chat** (sequência com typing), **Text** (typewriter / word rotate). Sem props obrigatórias;
tudo em loop; respeite `prefers-reduced-motion` quando fizer sentido.

## Publicar sem duplicar

- `add_item` gera o slug pelo `name` → rodar 2× cria "nome-xxxxx". Para corrigir use
  `update_item { idOrSlug, code, ... }`.
- `kind`: `COMPONENT` (peça) | `BLOCK` (seção) | `PAGE` (página inteira) | `ILLUSTRATION`.
- `category` = nome legível ("Hero", "Pricing", "Beam"); vira aba + seção. Veja as existentes antes.
- `tags` em minúsculas, sem acento quando possível; `featured: true` só para o melhor da categoria.
- `dependencies`/`registryDependencies` podem ser omitidos — são derivados dos imports.

**Fallback sem MCP** (HTTP direto; token de prod no `.mcp.json` do repo tasky, gitignored):
```js
await fetch('https://ui.codehall.io/api/mcp', {
  method: 'POST',
  headers: { authorization: 'Bearer <UI_CATALOG_MCP_TOKEN>', 'content-type': 'application/json' },
  body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call',
    params: { name: 'add_item', arguments: { name, code, kind: 'BLOCK', category: 'Hero', tags: ['hero'] } } }),
});
```
(O token em `apps/ui-catalog/.env` é o **local** — não serve para produção.)

## Checklist antes de entregar

- [ ] `check_code` ok · [ ] export default sem props · [ ] só tokens do tema · [ ] funciona em claro e escuro
- [ ] categoria certa (sem duplicar) · [ ] descrição de uma frase · [ ] link do item na resposta
