// Slug URL-safe a partir de um texto qualquer.
export function slugify(input: string): string {
  return (
    input
      .normalize('NFD')
      // remove diacríticos combinantes (acentos) — faixa U+0300..U+036F
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'tela'
  );
}

// Sufixo curto aleatório para desempatar slugs colididos.
export function shortId(): string {
  return Math.random().toString(36).slice(2, 8);
}
