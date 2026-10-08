import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { kindByPath } from '@/lib/site';
import { CategoryBrowser } from './category-browser';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ kind: string; category: string }> }): Promise<Metadata> {
  const { kind, category } = await params;
  const meta = kindByPath(kind);
  if (!meta) return {};
  const cat = await prisma.category.findUnique({ where: { kind_slug: { kind: meta.kind, slug: category } } });
  return cat ? { title: `${cat.name} · ${meta.label}`, description: cat.description ?? undefined } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ kind: string; category: string }> }) {
  const { kind: path, category } = await params;
  const meta = kindByPath(path);
  if (!meta) notFound();
  const cat = await prisma.category.findUnique({
    where: { kind_slug: { kind: meta.kind, slug: category } },
    include: { _count: { select: { items: { where: { status: 'PUBLISHED' } } } } },
  });
  if (!cat) notFound();

  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <header className="py-10">
        <nav className="mb-3 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>{' '}
          /{' '}
          <Link href={`/${path}`} className="hover:text-foreground">
            {meta.label}
          </Link>{' '}
          / <span className="text-foreground">{cat.name}</span>
        </nav>
        <h1 className="text-3xl font-semibold tracking-tight">
          {cat.name} <span className="text-base font-normal text-muted-foreground">{cat._count.items}</span>
        </h1>
        {cat.description && <p className="mt-2 max-w-2xl text-muted-foreground">{cat.description}</p>}
      </header>
      <CategoryBrowser kind={meta.kind} category={cat.slug} />
    </div>
  );
}
