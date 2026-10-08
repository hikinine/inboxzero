import type { Metadata } from 'next';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import { getFacets } from '@/lib/items';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Coleções' };

export default async function CollectionsPage() {
  const { collections } = await getFacets();
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Coleções</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Agrupamentos transversais aos tipos — um projeto, uma família visual, um tema.</p>
      {collections.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">Nenhuma coleção ainda. Informe uma coleção ao publicar um item.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Link key={c.slug} href={`/search?collection=${c.slug}`} className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/30">
              <Folder className="mt-0.5 size-5 text-muted-foreground" />
              <div className="min-w-0">
                <div className="font-medium">{c.name}</div>
                {c.description && <p className="mt-0.5 text-sm text-muted-foreground">{c.description}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{c.count} itens</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
