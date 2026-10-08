// Item no formato do registry do shadcn (https://ui.shadcn.com/schema/registry-item.json),
// instalável com `npx shadcn@latest add <url>/r/<slug>.json`.
import type { Item, ItemKind } from '@prisma/client';
import { deriveDeps } from '@/lib/code';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const REGISTRY_TYPE: Record<ItemKind, string> = {
  COMPONENT: 'registry:component',
  BLOCK: 'registry:block',
  PAGE: 'registry:block',
  ILLUSTRATION: 'registry:component',
};

const FILE_DIR: Record<ItemKind, string> = {
  COMPONENT: 'components',
  BLOCK: 'components/blocks',
  PAGE: 'components/pages',
  ILLUSTRATION: 'components/illustrations',
};

export function registryFilePath(item: Pick<Item, 'kind' | 'slug'>): string {
  return `${FILE_DIR[item.kind]}/${item.slug}.tsx`;
}

export function registryItem(item: Item) {
  const derived = deriveDeps(item.code);
  const dependencies = [...new Set([...item.dependencies, ...derived.dependencies])].sort();
  const registryDependencies = [...new Set([...item.registryDependencies, ...derived.registryDependencies])].sort();
  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.slug,
    type: REGISTRY_TYPE[item.kind],
    title: item.name,
    description: item.description ?? undefined,
    author: `${SITE_NAME} <${SITE_URL}>`,
    dependencies,
    registryDependencies,
    files: [{ path: registryFilePath(item), type: 'registry:component', content: item.code }],
  };
}

export function registryIndex(items: Array<Pick<Item, 'kind' | 'slug' | 'name' | 'description'>>) {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'ui-catalog',
    homepage: SITE_URL,
    items: items.map((it) => ({
      name: it.slug,
      type: REGISTRY_TYPE[it.kind],
      title: it.name,
      description: it.description ?? undefined,
      files: [{ path: registryFilePath(it), type: 'registry:component' }],
    })),
  };
}
