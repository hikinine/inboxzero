# Autoria de ilustrações SVG → Catálogo Clickmax (guia para a sessão)

Objetivo: **criar ilustrações SVG nativas (vetor) e publicá-las no catálogo em produção via MCP.**
Catálogo: https://hiki9.inboxzero.space · preview em **fundo escuro**.

---

## 1. Sempre use a skill

Invoque a skill **`creating-svg-illustrations`** (tool `Skill`) antes de desenhar. Regras que ela impõe e que seguimos:
- `viewBox` = limites do conteúdo (nada de 1920×1080).
- Uma paleta só; `font-family="Arial, Helvetica, sans-serif"`; `font-size`/`fill` explícitos; escapar `&` `<` `>`; sem emoji.
- Fills sólidos + sombra simples (`feDropShadow`) em vez de filtros pesados.
- `role="img"` + `<title>`/`<desc>`.
- Validar **renderizando** (ver §5).

---

## 2. Marca Clickmax — o hub "CX" (obrigatório nas peças de marca)

- Gradiente lime: `#D4FF00` → `#F2FEC2` (vertical). Marca "CX" em `#232c19`.
- **Fundo SEMPRE transparente**: nenhum `<rect>` de fundo; root `fill="none"`. (O catálogo já tem fundo escuro atrás.)
- Como o preview é **escuro**: todo texto vai **dentro de cards brancos**; conectores em cinza-claro `#C7CBD1`; **nunca** texto escuro solto sobre transparente.

Snippet reutilizável do hub (círculo lime + marca CX), centrado em `(cx,cy)` raio `r`:

```js
function hub(cx, cy, r) {
  const s = r / 57.7778;
  return `<g transform="translate(${(cx-r).toFixed(2)},${(cy-r).toFixed(2)}) scale(${s.toFixed(4)})">
  <circle cx="57.7778" cy="57.7778" r="57.7778" fill="url(#lime)"/>
  <g fill="#232c19"><path d="M46.6512 62.139L52.3008 63.6301C50.6729 67.4781 47.4172 71.7108 40.4749 71.7108C30.5641 71.7108 27.6914 63.7744 27.6914 58.3392C27.6914 52.9039 30.5641 45.0156 40.4749 45.0156C47.7045 45.0156 50.8644 49.1522 52.3487 53.3849L46.6033 54.7317C45.55 51.8457 44.2094 49.8256 40.4749 49.8256C35.9743 49.8256 33.6762 53.5292 33.6762 58.3392C33.6762 63.1972 35.8786 66.8528 40.4749 66.8528C43.9221 66.8528 45.5978 64.6402 46.6512 62.139Z"/><path d="M63.7847 57.8941L55.9156 45.5163H62.8991L70.4772 57.8941L62.4626 70.1456H55.4792L63.7847 57.8941Z"/><path d="M77.1696 57.7678L85.0387 70.1456L78.0553 70.1456L70.4772 57.7678L78.4917 45.5163H85.4751L77.1696 57.7678Z"/></g></g>`;
}
```

`<defs>` que acompanha:
```xml
<linearGradient id="lime" x1="0" y1="0" x2="0.4" y2="1"><stop stop-color="#D4FF00"/><stop offset="1" stop-color="#F2FEC2"/></linearGradient>
<filter id="sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#141a08" flood-opacity="0.16"/></filter>
```

**Tokens visuais estabelecidos:** card `#fff`, borda `#EAEBEE`/`#E4E7EC`, radius 12, texto `#1F2430`, muted `#6B7280`, conector tracejado `#C7CBD1` (`stroke-dasharray="4 4"`).

---

## 3. Escrever no MCP do catálogo

O MCP de **produção** já está configurado em `.mcp.json` (server `catalog`, URL `https://hiki9.inboxzero.space/api/mcp`, Bearer token). Após reiniciar, as tools aparecem como `mcp__catalog__*`.

Tools disponíveis:
| Tool | Args | Faz |
|------|------|-----|
| `add_screen` | `{ name, svg, description?, collection?, tags?[], status? }` | Cria tela. Extrai `width/height` do `viewBox`. Cria coleção/tags on-the-fly. Retorna `{id, slug, ...}` |
| `update_screen` | `{ idOrSlug, name?, svg?, description?, collection?, tags?[], status? }` | Atualiza só os campos enviados. `tags` substitui o conjunto. Se `svg` mudar, re-extrai dims |
| `delete_screen` | `{ idOrSlug }` | Remove |
| `search_screens` | `{ query?, collection?, tag?, status?, limit? }` | Metadados (sem svg) |
| `get_screen` | `{ idOrSlug }` | Tela completa (com svg) |
| `list_collections` / `list_tags` | `{}` | Com contagem |

**Regras de escrita:**
- `add_screen` gera o `slug` a partir do `name` → **rodar 2× duplica**. Para re-publicar, use `update_screen(idOrSlug=slug)`.
- **Coleção = "categoria".** Existentes: `Insights de relatórios`, `Diagramas`, `CX comunicação`.
- **Sempre incluir a tag `clickmax`** em peças de marca (+ tags de contexto).
- Publicar em lote = um `add_screen` por SVG.

**Fallback (se o MCP não estiver carregado)** — HTTP direto com `node --input-type=module`:
```js
const r = await fetch('https://hiki9.inboxzero.space/api/mcp', {
  method: 'POST',
  headers: { authorization: 'Bearer <CATALOG_MCP_TOKEN prod>', 'content-type': 'application/json' },
  body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'tools/call',
    params:{ name:'add_screen', arguments:{ name, svg, description, collection:'Diagramas', tags:['clickmax'] } } }),
});
console.log(JSON.parse((await r.json()).result.content[0].text));
```
(Token de prod está no `.mcp.json` deste repo — gitignored. O de `apps/catalog/.env` é o **local**, não serve para hiki9.)

---

## 4. Render-check antes de publicar (Playwright headless)

Sempre visualize no **fundo escuro** do catálogo antes de escrever no MCP. `playwright` já está instalado em `apps/catalog` (ou `scratchpad`); Chromium via `npx playwright install chromium`.

```js
import { chromium } from 'playwright';
import fs from 'node:fs';
const svg = fs.readFileSync('out.svg','utf8');
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 2 })).newPage();
await p.setContent(`<body style="margin:0;background:#0f0f12"><div style="padding:24px">${svg}</div></body>`, { waitUntil:'load' });
await p.waitForTimeout(80);
await (await p.$('div')).screenshot({ path:'preview.png' });
await b.close();
```
Depois `Read preview.png` para inspecionar. (Para lote, monte um contact-sheet em grid.)

---

## 5. Workflow

1. `Skill` → `creating-svg-illustrations`.
2. Autorar o(s) SVG (arquivo) — hub CX + cards conforme §2.
3. Render-check no fundo escuro (§4) → `Read` o PNG → ajustar.
4. Publicar via `add_screen` (§3).
5. Conferir: `search_screens` ou abrir https://hiki9.inboxzero.space.

## Arquétipos que já existem (para reaproveitar/variar)
- **Hub-diagramas** (coleção `Diagramas`): CX lime central + nós/cards ligados por linhas tracejadas. Layouts: spokes, funil, pipeline (setas), convergência, fan-out, timeline, anel circular, fontes→saída, rede, lista vertical.
- **CX comunicação** (coleção `CX comunicação`): CX **gigante dominante** + cards pequenos sobrepostos **singelos**, sem cobrir o glifo.
- **Insights de relatórios**: cards de UI (esses são raster embrulhado em SVG, importados de HTML — não são o alvo da autoria vetorial).
