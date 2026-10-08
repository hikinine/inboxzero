'use client';

import { useFavorites } from '@/components/site/favorites';
import { ItemGrid } from '@/components/site/item-grid';

export function FavoritesBrowser() {
  const { slugs, ready } = useFavorites();
  if (!ready) return null;
  return <ItemGrid filters={{ ids: slugs }} showKind emptyTitle="Nenhum favorito ainda" emptyDescription="Clique no coração de um item para guardá-lo aqui. Fica salvo neste navegador." />;
}
