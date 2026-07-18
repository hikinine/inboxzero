import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { svgToDataUri } from '@/lib/svg';
import { CopyButton } from '@/components/CopyButton';
import { DeleteScreenButton } from '@/components/DeleteScreenButton';

export const dynamic = 'force-dynamic';

export default async function ScreenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const screen = await prisma.screen.findUnique({
    where: { slug },
    include: { collection: true, tags: { include: { tag: true } } },
  });
  if (!screen) notFound();

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-200">
        <ArrowLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="checkerboard flex min-h-[400px] items-center justify-center overflow-hidden rounded-lg border border-neutral-800 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgToDataUri(screen.svg)} alt={screen.name} className="max-h-[70vh] max-w-full object-contain" />
        </div>

        <aside className="space-y-4">
          <div>
            <h1 className="text-xl font-semibold">{screen.name}</h1>
            {screen.description && <p className="mt-1 text-sm text-neutral-400">{screen.description}</p>}
          </div>

          <div className="flex items-center gap-2">
            <CopyButton
              value={screen.id}
              title="Copiar ID (para usar via MCP)"
              showLabel
              className="rounded-md border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:border-neutral-600"
            />
            <DeleteScreenButton id={screen.id} name={screen.name} />
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-neutral-500">ID</dt>
              <dd className="flex items-center gap-1.5 font-mono text-xs">
                <span className="max-w-[180px] truncate">{screen.id}</span>
                <CopyButton value={screen.id} className="text-neutral-500 hover:text-neutral-200" />
              </dd>
            </div>
            <Row label="Status" value={screen.status} />
            <Row label="Slug" value={screen.slug} mono />
            <Row label="Origem" value={screen.source} />
            {screen.width && screen.height && <Row label="Dimensões" value={`${screen.width} × ${screen.height}`} />}
            {screen.collection && (
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">Coleção</dt>
                <dd>
                  <Link href={`/?collection=${screen.collection.slug}`} className="text-emerald-400 hover:underline">
                    {screen.collection.name}
                  </Link>
                </dd>
              </div>
            )}
            <Row label="Criada" value={screen.createdAt.toLocaleString('pt-BR')} />
          </dl>

          {screen.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {screen.tags.map((t) => (
                <Link
                  key={t.tag.slug}
                  href={`/?tag=${t.tag.slug}`}
                  className="rounded-full border border-neutral-800 px-2.5 py-0.5 text-xs text-neutral-300 hover:border-neutral-600"
                >
                  {t.tag.name}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

      <details className="rounded-lg border border-neutral-800 bg-neutral-900">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium">Ver SVG</summary>
        <pre className="overflow-x-auto border-t border-neutral-800 p-4 text-xs text-neutral-400">
          <code>{screen.svg}</code>
        </pre>
      </details>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-neutral-500">{label}</dt>
      <dd className={mono ? 'font-mono text-xs' : ''}>{value}</dd>
    </div>
  );
}
