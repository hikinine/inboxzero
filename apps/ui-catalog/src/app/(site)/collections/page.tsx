import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Folder, Plus } from 'lucide-react';
import { getCollectionCards } from '@/lib/items';
import { KINDS } from '@/lib/site';
import { PreviewCard } from '@/components/site/preview-frame';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Coleções e templates', description: 'Famílias de blocos e páginas que formam um template completo: um projeto, um visual.' };

// /collections — estilo "Templates" do shadcnstudio: cards com capa ao vivo, badges, contagem por tipo e preview.
export default async function CollectionsPage() {
  const collections = await getCollectionCards();
  const total = collections.reduce((a, c) => a + c.count, 0);
  return (
    <div className="w-full px-6 lg:px-10">
      <header className="relative py-14 text-center sm:py-20">
        <div className="bg-grid absolute inset-x-0 -top-14 -z-10 h-[420px]" />
        <nav className="mb-4 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>{' '}
          / <span className="text-foreground">Coleções</span>
        </nav>
        <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          {collections.length === 1 ? "Templates e coleções" : `${collections.length} templates e coleções`} <span className="text-muted-foreground">prontos para compor</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground sm:text-lg">
          Uma coleção reúne navbar, hero, seções, footer e a página completa de um mesmo projeto — o visual inteiro, instalável bloco a bloco ou de uma vez.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/new" />}>
            <Plus data-icon="inline-start" /> Publicar numa coleção
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/pages" />}>
            Ver páginas <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </header>

      {collections.length === 0 ? (
        <div className="mb-16 rounded-xl border border-dashed p-12 text-center text-sm text-muted-foreground">Nenhuma coleção ainda. Informe uma coleção ao publicar um item.</div>
      ) : (
        <>
          <div className="mb-4 text-xs text-muted-foreground">
            {collections.length} {collections.length === 1 ? 'coleção' : 'coleções'} · {total} itens
          </div>
          <div className="grid gap-6 pb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1920px]:grid-cols-5">
            {collections.map((c) => (
              <div key={c.slug} className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-lg">
                <Link href={`/collections/${c.slug}`} className="relative block border-b bg-muted/20">
                  {c.cover ? (
                    <PreviewCard slug={c.cover.slug} kind={c.cover.kind} />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center text-muted-foreground">
                      <Folder className="size-6" />
                    </div>
                  )}
                  <div className="absolute left-2 top-2 flex gap-1">
                    <Badge variant="secondary" className="shadow">
                      Gratuito
                    </Badge>
                    {c.hasNew && <Badge className="bg-brand text-brand-foreground shadow">Novo</Badge>}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold tracking-tight">
                        <Link href={`/collections/${c.slug}`} className="hover:underline">
                          {c.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{c.description ?? 'Coleção de blocos e páginas com o mesmo visual.'}</p>
                    </div>
                    <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">{c.count} itens</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                    {KINDS.filter((k) => c.byKind[k.kind] > 0).map((k) => (
                      <span key={k.kind} className="rounded-md bg-muted px-1.5 py-0.5">
                        {c.byKind[k.kind]} {c.byKind[k.kind] === 1 ? k.singular.toLowerCase() : k.label.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" nativeButton={false} render={<Link href={`/collections/${c.slug}`} />}>
                      Ver detalhes
                    </Button>
                    {c.cover && (
                      <Button size="sm" variant="outline" nativeButton={false} render={<a href={`/preview/${c.cover.slug}?theme=dark`} target="_blank" rel="noreferrer" />}>
                        <ExternalLink data-icon="inline-start" /> Preview ao vivo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
