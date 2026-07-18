---
name: svg-catalog-create
description: >-
  Cria ilustrações SVG no padrão Clickmax/CX e publica no catálogo
  (hiki9.inboxzero.space) via MCP. Use SEMPRE que o usuário pedir para criar,
  gerar, desenhar ou fazer SVG/ilustração/ícone/diagrama/hero/variantes — inclusive
  "cria uns svgs pra X", "gera variantes disso", "faz uma ilustração de CRM/funil/
  atendimento", "publica no catálogo", "sobe pra collection". Traz as regras de
  autoria (viewBox, paleta, fundo transparente, marca CX), o render-check
  obrigatório e como escrever no MCP sem duplicar.
---

# Criar SVG → Catálogo Clickmax

Autorar ilustrações **vetoriais nativas** (não raster embrulhado) e publicá-las no
catálogo de produção: **https://hiki9.inboxzero.space** (preview em **fundo escuro**).

Tools do MCP: `mcp__catalog__add_screen`, `update_screen`, `search_screens`,
`get_screen`, `list_collections`, `list_tags`.

## Workflow (siga nesta ordem)

1. **Antes de desenhar**, invoque a skill `creating-svg-illustrations` (regras gerais de SVG).
2. **Veja o que já existe**: `search_screens` / `list_collections` — reaproveite arquétipos
   e mantenha coerência com a coleção de destino.
3. **Autore**. Para 1–2 peças, escreva o SVG direto. Para **lote/variantes**, escreva um
   **script gerador** em Node (helpers reutilizáveis → N arquivos + `manifest.json`).
   Ver `reference/snippets.md`.
4. **Render-check obrigatório** (§Render-check) → `Read` o PNG → ajuste. Nunca publique sem ver.
5. **Publique** via `add_screen` (§MCP).
6. **Confirme**: `search_screens` ou abra o catálogo.

## Regras duras de autoria

- `viewBox` = **limites do conteúdo** (ex.: `0 0 440 280`). Nada de 1920×1080.
- **Fundo SEMPRE transparente** — nenhum `<rect>` de fundo. O catálogo já tem fundo próprio.
  (Peça com fundo branco é bug: o usuário já reclamou disso.)
- **Preview é escuro** → todo texto vai **dentro de cards claros**. Nunca texto escuro solto
  sobre transparente. Conectores em cinza-claro.
- Uma paleta só. `font-family="Arial, Helvetica, sans-serif"`, `font-size`/`fill` explícitos.
- Escapar `&` `<` `>` no texto. **Sem emoji.**
- Fills sólidos + `feDropShadow` simples. Sem filtros pesados.
- `role="img"` + `<title>` + `<desc>` (o `desc` vira a descrição no catálogo).

## Marca e tokens

**Marca CX** (obrigatória em peça de marca): círculo com gradiente lime `#D4FF00 → #EFFEB0`,
glifo `CX` em `#232c19`. Snippet pronto em `reference/snippets.md`.

| Token | Valor |
|---|---|
| card | `#fff` · borda `#EAEBEE` · radius 10–16 |
| texto | `#1F2430` · muted `#6B7280` |
| conector | `#C7CBD1`, `stroke-dasharray="4 4"` |
| lime (marca) | `#D4FF00` → `#EFFEB0` |
| IA / destaque | gradiente `#84CC16 → #14B8A6` |
| status | ok `#2FA76A` · alerta `#E0912F` · erro `#DB5B4A` · info `#3B82F6` |

**Ícones de marca reais** (WhatsApp, Instagram, Meta, Google Ads…): baixe de
`https://cdn.simpleicons.org/<nome>` e extraia o `<path d>`. Cores oficiais em
`reference/snippets.md`. Nunca desenhe logo à mão.

## Render-check (nunca pule)

```js
import { chromium } from 'playwright';
import fs from 'node:fs';
const svg = fs.readFileSync('out.svg', 'utf8');
const b = await chromium.launch();
const p = await b.newPage({ deviceScaleFactor: 2 });
// Veja nos DOIS fundos: o catálogo é escuro, mas a peça pode ser usada em claro.
await p.setContent(`<body style="margin:0">
  <div style="background:#0f0f12;padding:24px">${svg}</div>
  <div style="background:#ffffff;padding:24px">${svg}</div></body>`);
await p.waitForTimeout(120);
await p.screenshot({ path: 'preview.png', fullPage: true });
await b.close();
```
Depois **`Read preview.png`**. Para lote, monte um contact-sheet em grid.
Cheque também `console` errors — SVG malformado costuma aparecer ali.

## Publicar no MCP

```
add_screen { name, svg, description?, collection?, tags?[], status? }
```
- `width`/`height` saem do `viewBox` automaticamente; coleção e tags são criadas on-the-fly.
- ⚠️ **`add_screen` gera slug pelo `name` → rodar 2× DUPLICA.** Para republicar/corrigir use
  `update_screen { idOrSlug: '<slug>', svg, ... }`.
- **Lote** = um `add_screen` por SVG.
- **Coleção = categoria.** Existentes: `CX comunicação`, `Clickmax UI`,
  `Clickmax illustration`, `Insights de relatórios`, `UNDRAW`.
- **Sempre inclua a tag `clickmax`** em peça de marca, + tags de contexto
  (ex.: `cx`, `crm`, `automacao`, `atendimento`).
- `name` descritivo com prefixo de família: `"CX · Inbox unificada"`, `"Sistema · Comercial"`.

**Fallback sem MCP** (HTTP direto, token prod no `.mcp.json` do repo tasky — gitignored):
```js
await fetch('https://hiki9.inboxzero.space/api/mcp', {
  method: 'POST',
  headers: { authorization: 'Bearer <CATALOG_MCP_TOKEN>', 'content-type': 'application/json' },
  body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call',
    params: { name: 'add_screen', arguments: { name, svg, collection: 'CX comunicação', tags: ['clickmax'] } } }),
});
```
(O token em `apps/catalog/.env` é o **local** — não serve para produção.)

## Arquétipos que já existem (reaproveite)

- **CX comunicação** — CX dominante + cards pequenos sobrepostos; hubs com canais
  convergindo; jornadas (Ad → WhatsApp → IA); heros com glow/gradiente.
- **Clickmax UI** — spots de interface: cards claros `#FBFBF9`, linhas `#CFCFC9`,
  acento por tipo, lime = "selecionado/atual".
- **Sistemas** — composição 440×280: entradas (ícones de marca) → processo → saída, com KPI.
- **Diagramas** — CX central + nós ligados por tracejado: spokes, funil, pipeline,
  convergência, fan-out, timeline, anel, rede.

Peça **variantes**? Varie composição (inclinação, escala, posição da marca, densidade),
não só cor. O usuário já pediu explicitamente "mais dinamismo, marca não centralizada
ocupando tudo".
