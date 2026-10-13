import type { Metadata } from 'next';
import { findItem } from '@/lib/items';
import { Playground } from './playground';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Playground', robots: { index: false } };

const STARTER = `'use client'

import { Button } from '@/components/ui/button'

export default function Exemplo() {
  return (
    <div className="flex flex-col items-center gap-3 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Olá, playground</h1>
      <Button>Clique aqui</Button>
    </div>
  )
}
`;

// /playground?slug=<slug> — edita o código de um item com preview ao vivo (sandbox /preview/live).
export default async function PlaygroundPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const { slug } = await searchParams;
  const item = slug ? await findItem(slug) : null;
  return (
    <Playground
      initialCode={item?.code ?? STARTER}
      slug={item?.slug ?? null}
      name={item?.name ?? null}
      fit={item && (item.kind === 'BLOCK' || item.kind === 'PAGE') ? 'full' : 'center'}
    />
  );
}
