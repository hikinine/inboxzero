# Snippets reutilizáveis — autoria SVG Clickmax

## `<defs>` padrão

```xml
<defs>
  <linearGradient id="lime" x1="0" y1="0" x2="0.4" y2="1">
    <stop stop-color="#D4FF00"/><stop offset="1" stop-color="#EFFEB0"/>
  </linearGradient>
  <linearGradient id="ai" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#84CC16"/><stop offset="1" stop-color="#14B8A6"/>
  </linearGradient>
  <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
    <stop stop-color="#FEDA75"/><stop offset="0.35" stop-color="#FA7E1E"/>
    <stop offset="0.6" stop-color="#D62976"/><stop offset="1" stop-color="#4F5BD5"/>
  </linearGradient>
  <linearGradient id="msg" x1="0" y1="0" x2="1" y2="1">
    <stop stop-color="#00B2FF"/><stop offset="1" stop-color="#006AFF"/>
  </linearGradient>
  <filter id="sh" x="-40%" y="-40%" width="180%" height="180%">
    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#141a08" flood-opacity="0.14"/>
  </filter>
</defs>
```

## Marca CX — círculo lime + glifo (centrado em cx,cy, raio r)

```js
function cx(px, py, r) {
  const s = r / 57.7778;
  return `<g transform="translate(${(px - r).toFixed(2)},${(py - r).toFixed(2)}) scale(${s.toFixed(4)})"><circle cx="57.7778" cy="57.7778" r="57.7778" fill="url(#lime)"/><g fill="#232c19"><path d="M46.6512 62.139L52.3008 63.6301C50.6729 67.4781 47.4172 71.7108 40.4749 71.7108C30.5641 71.7108 27.6914 63.7744 27.6914 58.3392C27.6914 52.9039 30.5641 45.0156 40.4749 45.0156C47.7045 45.0156 50.8644 49.1522 52.3487 53.3849L46.6033 54.7317C45.55 51.8457 44.2094 49.8256 40.4749 49.8256C35.9743 49.8256 33.6762 53.5292 33.6762 58.3392C33.6762 63.1972 35.8786 66.8528 40.4749 66.8528C43.9221 66.8528 45.5978 64.6402 46.6512 62.139Z"/><path d="M63.7847 57.8941L55.9156 45.5163H62.8991L70.4772 57.8941L62.4626 70.1456H55.4792L63.7847 57.8941Z"/><path d="M77.1696 57.7678L85.0387 70.1456L78.0553 70.1456L70.4772 57.7678L78.4917 45.5163H85.4751L77.1696 57.7678Z"/></g></g>`;
}
```

## Helpers de composição

```js
const FONT = 'Arial, Helvetica, sans-serif';
const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()
  .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');

const R = (x,y,w,h,rx,fill,stroke,sw=1.5) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${stroke?` stroke="${stroke}" stroke-width="${sw}"`:''}/>`;
const T = (x,y,s,o={}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${o.size||12}" font-weight="${o.weight||700}" fill="${o.fill||'#1F2430'}" text-anchor="${o.anchor||'start'}">${esc(s)}</text>`;
const SH = (inner) => `<g filter="url(#sh)">${inner}</g>`;
const card = (x,y,w,h,rx=16) => SH(R(x,y,w,h,rx,'#fff','#EAEBEE'));
const dash = (x1,y1,x2,y2) =>
  `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#C7CBD1" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>`;
const arrowH = (x1,x2,y,c) =>
  `<line x1="${x1}" y1="${y}" x2="${x2-7}" y2="${y}" stroke="${c}" stroke-width="2" stroke-dasharray="5 5"/><path d="M${x2-8} ${y-5} l8 5 l-8 5 Z" fill="${c}"/>`;
const avatar = (x,y,r,c) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y-r*0.2}" r="${r*0.34}" fill="#fff"/><path d="M${x-r*0.55} ${y+r*0.6} a${r*0.55} ${r*0.5} 0 0 1 ${r*1.1} 0" fill="#fff"/>`;
const sparkle = (x,y,r,f) =>
  `<path d="M${x} ${y-r} L${x+r*0.26} ${y-r*0.26} L${x+r} ${y} L${x+r*0.26} ${y+r*0.26} L${x} ${y+r} L${x-r*0.26} ${y+r*0.26} L${x-r} ${y} L${x-r*0.26} ${y-r*0.26} Z" fill="${f}"/>`;
```

## Ícones de marca reais (simpleicons)

Baixe e extraia o path (viewBox 0 0 24 24):

```bash
for n in whatsapp instagram facebook messenger meta telegram googleads gmail tiktok youtube; do
  curl -s "https://cdn.simpleicons.org/$n" -o "brand/$n.svg"
done
# extrair: grep -o '<path d="[^"]*"' brand/whatsapp.svg
```

Cores oficiais para o tile de fundo:

```js
const BRAND = {
  whatsapp:'#25D366', instagram:'url(#ig)', facebook:'#1877F2', messenger:'url(#msg)',
  meta:'#0866FF', telegram:'#26A5E4', googleads:'#4285F4', gmail:'#EA4335',
  tiktok:'#000000', youtube:'#FF0000',
};
// tile: quadrado arredondado com a cor da marca + o path em branco por cima
const tile = (x,y,s,name,path) => {
  const gs = (s*0.56)/24, pad = s*0.22;
  return SH(R(x,y,s,s,(s*0.26).toFixed(1),BRAND[name])) +
    `<g transform="translate(${(x+pad).toFixed(1)},${(y+pad).toFixed(1)}) scale(${gs.toFixed(3)})" fill="#fff"><path d="${path}"/></g>`;
};
```

## Esqueleto do script gerador (lote/variantes)

```js
import fs from 'node:fs';
import path from 'node:path';
const OUT = 'out'; fs.mkdirSync(OUT, { recursive: true });
const W = 440, H = 280;

const specs = [];
const add = (name, body, desc, tags) => specs.push({ name, body, desc, tags });

// add('CX · Exemplo', card(20,20,200,100) + cx(360,80,40), 'Descrição…', ['clickmax','cx']);

const manifest = [];
for (const s of specs) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d"><title id="t">${esc(s.name)}</title><desc id="d">${esc(s.desc)}</desc>${DEFS}\n${s.body}\n</svg>`;
  const id = slug(s.name);
  fs.writeFileSync(path.join(OUT, `${id}.svg`), svg);
  manifest.push({ id, name: s.name, description: s.desc, tags: s.tags });
}
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`${specs.length} geradas`);
```

## Contact-sheet para revisar o lote

```js
import { chromium } from 'playwright';
const files = fs.readdirSync(OUT).filter(f => f.endsWith('.svg'));
const cells = files.map(f => {
  const svg = fs.readFileSync(path.join(OUT, f), 'utf8');
  return `<div style="margin:12px"><div style="font:12px system-ui;color:#888">${f}</div>
    <div style="background:#0f0f12;display:inline-block">${svg}</div>
    <div style="background:#fff;display:inline-block">${svg}</div></div>`;
}).join('');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
await p.setContent(`<body style="margin:0;background:#1a1a1a">${cells}</body>`);
await p.waitForTimeout(200);
await p.screenshot({ path: 'sheet.png', fullPage: true });
await b.close();
```
