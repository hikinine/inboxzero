import { getCategoryCards } from '@/lib/items';
import { DocsNav, type DocsNavSection } from './docs-nav';

// Âncoras da página /docs (seção "Começando"). Mantidas aqui para a sidebar e o /docs falarem a mesma língua.
export const DOCS_GETTING_STARTED = [
  ['cli', 'Instalar via CLI'],
  ['mcp', 'MCP no Claude Code'],
  ['tools', 'Tools do MCP'],
  ['authoring', 'Regras de autoria'],
  ['modules', 'Imports suportados'],
  ['api', 'API REST'],
  ['skills', 'Skills'],
] as const;

// Sidebar das docs (estilo shadcnstudio): "Começando" + um link por categoria de componente com itens.
// O marcador de item ativo fica no DocsNav (client, usePathname).
export async function DocsSidebar() {
  const comps = await getCategoryCards('COMPONENT').catch(() => []);
  // "Novo" só informa algo se destaca poucas categorias: quando mais da metade tem itens recentes
  // (ex.: logo após uma carga grande de conteúdo), o selo vira ruído e é omitido.
  const markNew = comps.filter((c) => c.hasNew).length <= comps.length / 2;
  const sections: DocsNavSection[] = [
    {
      title: 'Começando',
      links: [{ href: '/docs', label: 'Introdução' }, ...DOCS_GETTING_STARTED.map(([id, label]) => ({ href: `/docs#${id}`, label }))],
    },
    {
      title: 'Componentes',
      count: comps.length,
      links: comps.map((c) => ({ href: `/docs/components/${c.slug}`, label: c.name, count: c.count, isNew: markNew && c.hasNew })),
    },
  ];
  return <DocsNav sections={sections} />;
}
