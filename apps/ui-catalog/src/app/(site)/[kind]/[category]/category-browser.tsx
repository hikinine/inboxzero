'use client';

import type { ItemKind } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ItemGrid } from '@/components/site/item-grid';
import { useFavorites } from '@/components/site/favorites';

// Abas "Todos" / "Favoritos" sobre o grid de uma categoria (favoritos vêm do localStorage).
export function CategoryBrowser({ kind, category }: { kind: ItemKind; category: string }) {
  const { slugs, ready, count } = useFavorites();
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="fav">Favoritos{ready && count > 0 ? ` (${count})` : ''}</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="pt-4">
        <ItemGrid filters={{ kind, category }} />
      </TabsContent>
      <TabsContent value="fav" className="pt-4">
        {ready && (
          <ItemGrid
            filters={{ kind, category, ids: slugs }}
            emptyTitle="Nenhum favorito nesta categoria"
            emptyDescription="Clique no coração de um item para guardá-lo aqui."
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
