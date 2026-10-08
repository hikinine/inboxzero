---
name: ui-catalog-use
description: >-
  Busca, escolhe, instala e adapta componentes, blocos, páginas e ilustrações
  animadas do UI Catalog (ui.codehall.io) em projetos React/Next com shadcn/ui.
  Use SEMPRE que o usuário quiser PEGAR/USAR algo pronto — "pega um hero do
  catálogo", "tem pricing no ui-catalog?", "instala o dashboard X", "usa uma
  ilustração beam na landing", "quais blocos de FAQ existem". Cobre busca por
  tipo/categoria/tag, instalação via shadcn CLI ou código, e adaptação ao tema.
---

# Usar itens do UI Catalog

Catálogo: **https://ui.codehall.io**. Tools: `mcp__ui-catalog__search_items`, `get_item`,
`list_categories`, `list_collections`, `list_tags`.

> Para **criar** itens novos, use a skill `ui-catalog-create` — não esta.

## 1. Achar

```
list_categories { kind? }                       → categorias por tipo, com contagem
search_items { query?, kind?, category?, tag? } → metadados (SEM código, barato)
get_item { idOrSlug }                           → código + deps + install + urls
```
- `kind`: `BLOCK` (seções: hero, pricing, faq…), `COMPONENT` (cards, tabelas, gráficos…),
  `PAGE` (dashboard, settings), `ILLUSTRATION` (beam, orbit, marquee, card stack, ripple, chat, text).
- Comece largo (`query`), estreite por `category`/`tag`. Sinônimos: "hero"/"primeira dobra",
  "pricing"/"planos", "depoimentos"/"prova social", "tabela"/"lista", "ilustração"/"animação".
- Apresente 2–4 opções (nome + descrição + `url`) antes de aplicar, salvo pedido exato.

## 2. Instalar

**Projeto com shadcn (tem `components.json`)** — o jeito certo:
```bash
npx shadcn@latest add https://ui.codehall.io/r/<slug>.json
```
Instala o arquivo em `components/…`, os primitivos do shadcn que faltarem e os pacotes npm
(`motion`, `recharts`…). Vários de uma vez: passe várias URLs.

**Sem shadcn / quer só o arquivo**: `get_item` devolve `code`; salve em `components/<slug>.tsx`
e garanta os imports (`npx shadcn@latest add button card …` para os primitivos; `pnpm add motion`).
HTTP direto: `GET https://ui.codehall.io/api/items/<slug>/code`.

## 3. Adaptar

- Os itens usam **só tokens do tema** (`bg-background`, `text-muted-foreground`, `var(--primary)`),
  então já seguem as cores/raio do projeto. Não troque por hex.
- Escritos no estilo **base-nova (Base UI)**. Em projeto **Radix** (`style: new-york`/`default`):
  trocar `render={<X />}` por `asChild` + filho, e `data-icon="inline-start"` pode ser ignorado.
  O CLI instala os primitivos no estilo do `components.json`; revise esses pontos.
- Troque os dados de exemplo (pt-BR, nomes "Acme"/"Ana Souza") pelos reais; extraia para props se
  o item for reutilizado com conteúdo diferente.
- Ilustrações: componentes com `motion`; para desligar animação em `prefers-reduced-motion`
  envolva em `MotionConfig reducedMotion="user"`.
- `next/link`/`next/image` dentro dos itens já são reais no projeto (no catálogo eram shims).

## 4. Em lote

Na UI do catálogo dá para selecionar vários e **Copiar prompt** (lista slugs + comandos) ou
**Baixar .zip** (arquivos no layout `components/blocks/<slug>.tsx`). Favoritos ficam no navegador.

## 5. Se não achar

Diga ao usuário e ofereça **criar** — aí use `ui-catalog-create`. Não force um item que não
comunica o que ele pediu.
