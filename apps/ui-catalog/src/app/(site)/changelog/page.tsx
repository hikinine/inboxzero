import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { KINDS, kindMeta } from '@/lib/site';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Changelog', description: 'Lotes de itens publicados no catálogo, semana a semana.' };

// Segunda-feira da semana (local) de uma data — chave do lote.
function weekStart(d: Date): string {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // 0 = segunda
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x.toISOString().slice(0, 10);
}

const fmt = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' });

// /changelog — gerado automaticamente a partir do createdAt dos itens (um lote por semana).
export default async function ChangelogPage() {
  const items = await prisma.item.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    select: { slug: true, name: true, kind: true, createdAt: true, featured: true, category: { select: { name: true, slug: true } }, collection: { select: { name: true } } },
    take: 2000,
  });
  const weeks = new Map<string, typeof items>();
  for (const it of items) {
    const k = weekStart(it.createdAt);
    if (!weeks.has(k)) weeks.set(k, []);
    weeks.get(k)!.push(it);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <nav className="mb-3 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Início
        </Link>{' '}
        / <span className="text-foreground">Changelog</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Changelog</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Tudo o que entrou no catálogo, semana a semana — gerado automaticamente a partir da data de publicação de cada item.</p>

      <div className="mt-10 space-y-12">
        {[...weeks.entries()].map(([week, list]) => {
          const start = new Date(`${week}T12:00:00`);
          const end = new Date(start);
          end.setDate(end.getDate() + 6);
          const byKind = KINDS.map((k) => ({ k, n: list.filter((i) => i.kind === k.kind).length })).filter((x) => x.n > 0);
          const byCat = new Map<string, { name: string; slug: string; kind: (typeof list)[number]['kind']; items: typeof list }>();
          for (const it of list) {
            const key = `${it.kind}:${it.category?.slug ?? '-'}`;
            if (!byCat.has(key)) byCat.set(key, { name: it.category?.name ?? 'Sem categoria', slug: it.category?.slug ?? '', kind: it.kind, items: [] });
            byCat.get(key)!.items.push(it);
          }
          return (
            <section key={week} className="grid gap-4 border-t pt-8 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Lote de {fmt.format(start)} – {fmt.format(end)}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{list.length} itens</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {byKind.map(({ k, n }) => (
                    <Badge key={k.kind} variant="secondary">
                      {n} {n === 1 ? k.singular.toLowerCase() : k.label.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[...byCat.values()].map((c) => {
                  const m = kindMeta(c.kind);
                  return (
                    <div key={`${c.kind}-${c.slug}`}>
                      <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {c.slug ? (
                          <Link href={`/${m.path}/${c.slug}`} className="hover:text-foreground">
                            {m.singular} · {c.name}
                          </Link>
                        ) : (
                          `${m.singular} · ${c.name}`
                        )}
                      </div>
                      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {c.items.map((it) => (
                          <li key={it.slug}>
                            <Link href={`/item/${it.slug}`} className="text-foreground/80 hover:text-foreground hover:underline">
                              {it.name}
                            </Link>
                            {it.featured && <span className="ml-1 text-[10px] text-muted-foreground">hot</span>}
                            {it.collection && <span className="ml-1 text-[10px] text-muted-foreground">· {it.collection.name}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        {weeks.size === 0 && <p className="text-sm text-muted-foreground">Nada publicado ainda.</p>}
      </div>
    </div>
  );
}
