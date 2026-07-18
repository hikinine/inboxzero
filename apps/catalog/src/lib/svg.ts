// Utilidades para lidar com o markup SVG das telas.

export interface SvgDims {
  width: number | null;
  height: number | null;
}

// Extrai largura/altura de um SVG: tenta width/height explícitos, senão o viewBox.
export function extractDims(svg: string): SvgDims {
  const openTag = svg.match(/<svg\b[^>]*>/i)?.[0] ?? '';

  const w = openTag.match(/\bwidth\s*=\s*["']?\s*([\d.]+)/i)?.[1];
  const h = openTag.match(/\bheight\s*=\s*["']?\s*([\d.]+)/i)?.[1];
  if (w && h) return { width: Math.round(+w), height: Math.round(+h) };

  const vb = openTag.match(/\bviewBox\s*=\s*["']\s*[\d.]+[\s,]+[\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (vb) return { width: Math.round(+vb[1]!), height: Math.round(+vb[2]!) };

  return { width: null, height: null };
}

// Validação leve: precisa conter um elemento <svg>.
export function looksLikeSvg(svg: string): boolean {
  return /<svg[\s>]/i.test(svg) && /<\/svg>/i.test(svg);
}

// data: URI para renderizar via <img>, sem executar scripts embutidos (mais seguro que dangerouslySetInnerHTML).
export function svgToDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}
