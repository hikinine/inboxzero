import type { ItemKind } from '@prisma/client';

export const SITE_NAME = 'UI Catalog';
export const SITE_TAGLINE = 'Componentes, blocos, páginas e ilustrações shadcn/ui — com preview ao vivo, registry e MCP.';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3073').replace(/\/$/, '');

export interface KindMeta {
  kind: ItemKind;
  path: string; // segmento de URL (/blocks, /components…)
  label: string; // plural
  singular: string;
  description: string;
  // Largura do viewport do preview no grid. 0 = tamanho natural (sem escala).
  previewWidth: number;
  // Proporção do card de preview no grid (largura/altura).
  cardAspect: number;
}

export const KINDS: readonly KindMeta[] = [
  {
    kind: 'BLOCK',
    path: 'blocks',
    label: 'Blocos',
    singular: 'Bloco',
    description: 'Seções prontas de página: hero, pricing, features, depoimentos, FAQ, footer e mais.',
    previewWidth: 1280,
    cardAspect: 16 / 10,
  },
  {
    kind: 'COMPONENT',
    path: 'components',
    label: 'Componentes',
    singular: 'Componente',
    description: 'Peças pequenas e variações: botões, cards, formulários, tabelas, gráficos.',
    previewWidth: 0,
    cardAspect: 4 / 3,
  },
  {
    kind: 'ILLUSTRATION',
    path: 'illustrations',
    label: 'Ilustrações',
    singular: 'Ilustração',
    description: 'Ilustrações animadas em React + SVG + motion, temáveis pelos tokens do shadcn.',
    previewWidth: 0,
    cardAspect: 4 / 3,
  },
  {
    kind: 'PAGE',
    path: 'pages',
    label: 'Páginas',
    singular: 'Página',
    description: 'Páginas inteiras: dashboards, autenticação, settings, listagens.',
    previewWidth: 1280,
    cardAspect: 16 / 10,
  },
] as const;

export const KIND_VALUES = KINDS.map((k) => k.kind) as ItemKind[];

export function kindByPath(path: string): KindMeta | undefined {
  return KINDS.find((k) => k.path === path);
}

export function kindMeta(kind: ItemKind): KindMeta {
  return KINDS.find((k) => k.kind === kind) ?? KINDS[0]!;
}

// Comando de instalação via shadcn CLI apontando para o registry deste catálogo.
export function installCommand(slug: string, base = SITE_URL): string {
  return `npx shadcn@latest add ${base}/r/${slug}.json`;
}
