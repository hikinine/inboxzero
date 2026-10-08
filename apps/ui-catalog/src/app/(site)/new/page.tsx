import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { NewItemForm } from './new-item-form';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Novo item' };

export default async function NewItemPage() {
  const [categories, collections] = await Promise.all([
    prisma.category.findMany({ orderBy: [{ kind: 'asc' }, { order: 'asc' }], select: { kind: true, slug: true, name: true } }),
    prisma.collection.findMany({ orderBy: { name: 'asc' }, select: { slug: true, name: true } }),
  ]);
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Novo item</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        Cole um TSX auto-contido. O preview compila na hora; a validação confere imports e o export default. Pelo Claude Code é mais rápido: a skill{' '}
        <code className="rounded bg-muted px-1">ui-catalog-create</code> publica via MCP.
      </p>
      <NewItemForm categories={categories} collections={collections} />
    </div>
  );
}
