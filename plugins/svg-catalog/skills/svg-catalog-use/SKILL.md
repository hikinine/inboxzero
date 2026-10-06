---
name: svg-catalog-use
description: >-
  Busca, escolhe e usa ilustrações SVG do catálogo Clickmax
  (catalog.codehall.io) em código, landing pages e apresentações. Use SEMPRE
  que o usuário quiser PEGAR/USAR uma ilustração existente — "que svg tem pra
  dashboard?", "pega uma illustration do catálogo", "usa algo da collection CX",
  "acha um svg de funil/vendas/atendimento", "quero uns svgs pra essa tela",
  "recolore essa ilustração pro nosso tema". Cobre busca por keyword/tag/coleção,
  como embutir (inline, <img>, arquivo) e como recolorir para outro tema.
---

# Usar SVGs do catálogo Clickmax

Catálogo: **https://catalog.codehall.io** (~1.900 peças).
Tools: `mcp__catalog__search_screens`, `get_screen`, `list_collections`, `list_tags`.

> Para **criar** peças novas, use a skill `svg-catalog-create` — não esta.

## 1. Achar a peça

```
search_screens { query?, collection?, tag?, limit? }   → metadados (SEM o svg, barato)
list_collections {}                                     → coleções + contagem
list_tags {}                                            → tags + contagem
```

- Comece **largo** (`query`), depois estreite por `collection`/`tag`.
- Busque por **sinônimos**: "funil"/"pipeline"/"vendas", "atendimento"/"chat"/"whatsapp",
  "métrica"/"dashboard"/"KPI", "e-mail"/"inbox"/"campanha".
- `search_screens` **não** traz o SVG (economiza tokens). Só chame `get_screen` na(s) escolhida(s).
- Apresente 3–5 opções ao usuário com nome + descrição antes de aplicar, salvo se ele já
  descreveu exatamente o que quer.

**Coleções:**

| Coleção | Conteúdo |
|---|---|
| `CX comunicação` | Marca CX: heros, hubs de canais, jornadas, IA, vendas/CRM/kanban |
| `Clickmax UI` | Spots de interface: quiz, automações, atribuição, estados |
| `Clickmax illustration` | unDraw remixadas na paleta Clickmax |
| `Insights de relatórios` | Cards de relatório/insight |
| `UNDRAW` | ~1.678 unDraw originais (paleta roxa `#6C63FF`) |

## 2. Pegar o SVG

**Via MCP** (dá o markup completo):
```
get_screen { idOrSlug }   → { id, slug, name, description, svg, width, height, tags, collection }
```

**Via HTTP** (sem MCP — bom para `<img>`, download ou script):
```
https://catalog.codehall.io/api/screens/<slug>/raw     → o SVG cru (content-type image/svg+xml)
https://catalog.codehall.io/api/screens?q=&collection=  → listagem JSON
```
```bash
curl -s "https://catalog.codehall.io/api/screens/cx-hero-glow/raw" -o hero.svg
```

**Em lote pela UI**: no catálogo dá pra multi-selecionar e usar **Baixar .zip** ou
**Copiar prompt** (gera um prompt com os slugs/URLs para ingerir em outro chat).

## 3. Usar no código

- **Inline** (permite CSS/`currentColor`, animar, tema): cole o `<svg>` no JSX/HTML.
  Em React, remova `xmlns` duplicado e converta atributos kebab → camelCase
  (`stroke-width` → `strokeWidth`), ou renderize via `dangerouslySetInnerHTML`.
- **Arquivo estático** (mais simples, não estiliza): salve em `public/illustrations/…svg`
  e use `<img src="/illustrations/x.svg" alt="" />`.
- **IDs colidem**: os SVGs usam `<defs>` com ids fixos (`lime`, `ig`, `sh`…). Se colocar
  **dois na mesma página inline**, prefixe os ids por peça — senão o gradiente/filtro de um
  vaza pro outro.
- Sempre `alt=""` (decorativa) ou um alt real se a peça carregar informação.

## 4. Recolorir para outro tema

As peças nascem para **fundo escuro** com **cards claros**. Para um tema diferente,
faça um mapa de cores e substitua (script, não na mão):

```js
const MAP = [
  ['#d4ff00','#e4f222'],   // lime da marca → seu accent
  ['#ffffff','#0f1011'], ['#fff','#0f1011'],   // cards claros → superfície escura
  ['#eaebee','#23252a'], ['#c7cbd1','#383b3f'],// bordas/linhas
  ['#6b7280','#8a8f98'], ['#1f2430','#d0d6e0'],// texto muted / ink
];
let s = fs.readFileSync('in.svg', 'utf8');
for (const [from, to] of MAP) s = s.replace(new RegExp(from, 'gi'), to);
fs.writeFileSync('out.svg', s);
```
Regras: **mantenha as cores oficiais de marca** (WhatsApp verde, Instagram gradiente,
Meta azul) — recolorir logo de terceiro descaracteriza. Peças unDraw usam o roxo
`#6C63FF` como accent: troque-o pelo accent do tema.

**Sempre confira renderizando** depois de recolorir (Playwright + `Read` do PNG),
no fundo em que a peça vai viver.

## 5. Se não achar nada adequado

Diga isso ao usuário e ofereça **criar** a peça — aí sim use a skill
`svg-catalog-create`. Não force uma ilustração que não comunica o conceito.
