'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ItemKind } from '@prisma/client';
import type { ItemMeta } from '@/lib/items';
import { KINDS } from '@/lib/site';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/site/item-card';

// Abas por tipo com uma amostra de cada (previews ao vivo).
export function ShowcaseTabs({ byKind }: { byKind: Record<ItemKind, ItemMeta[]> }) {
  const first = KINDS.find((k) => byKind[k.kind]?.length) ?? KINDS[0]!;
  return (
    <Tabs defaultValue={first.kind}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList>
          {KINDS.map((k) => (
            <TabsTrigger key={k.kind} value={k.kind}>
              {k.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {KINDS.map((k) => (
        <TabsContent key={k.kind} value={k.kind} className="pt-6">
          {byKind[k.kind]?.length ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {byKind[k.kind].map((it) => (
                  <ItemCard key={it.id} item={it} />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="outline" nativeButton={false} render={<Link href={`/${k.path}`} />}>
                  Ver todos os {k.label.toLowerCase()} <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">Ainda não há {k.label.toLowerCase()} publicados.</div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
