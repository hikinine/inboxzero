import type { ItemKind } from '@prisma/client';

// Grupos de categorias por tipo (espelha a organização do shadcnstudio: Marketing, Dashboard & App,
// eCommerce, Datatable, Bento). Uma categoria aponta para um grupo pelo slug (Category.group).
// Tipos sem grupos (componentes, ilustrações) listam as categorias numa grade única.
export interface GroupMeta {
  slug: string;
  name: string;
  description: string;
  order: number;
}

export const GROUPS: Record<ItemKind, readonly GroupMeta[]> = {
  BLOCK: [
    { slug: 'marketing', name: 'Marketing', description: 'Seções para landing pages e sites: hero, features, pricing, depoimentos, FAQ, CTA e mais.', order: 10 },
    { slug: 'dashboard', name: 'Dashboard & App', description: 'Shells, sidebars, widgets, gráficos, diálogos, formulários e estados de aplicações.', order: 20 },
    { slug: 'ecommerce', name: 'E-commerce', description: 'Produto, carrinho, checkout, avaliações, ofertas e filtros de loja.', order: 30 },
    { slug: 'datatable', name: 'Datatable', description: 'Tabelas de dados com ordenação, colunas, filtros, edição, agrupamento e exportação.', order: 40 },
    { slug: 'bento', name: 'Bento', description: 'Grades bento para destacar funcionalidades, produtos e IA.', order: 50 },
  ],
  PAGE: [
    { slug: 'marketing', name: 'Marketing', description: 'Páginas completas de site: landing, features, pricing, sobre, blog, contato, FAQ e mais.', order: 10 },
    { slug: 'app', name: 'Aplicação', description: 'Dashboards, settings, autenticação, inbox, kanban, onboarding e checkout.', order: 20 },
  ],
  COMPONENT: [],
  ILLUSTRATION: [],
};

export function groupMeta(kind: ItemKind, slug: string | null | undefined): GroupMeta | undefined {
  if (!slug) return undefined;
  return GROUPS[kind].find((g) => g.slug === slug);
}

// Grupo "virtual" usado quando o tipo não tem grupos ou a categoria não está em nenhum.
export const UNGROUPED: GroupMeta = { slug: 'todos', name: 'Todas as categorias', description: '', order: 1000 };
