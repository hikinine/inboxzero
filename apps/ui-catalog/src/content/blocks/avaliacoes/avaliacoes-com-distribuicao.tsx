'use client'

import { useState } from 'react'
import { BadgeCheck, PenLine, SearchX, Star, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DIST: Array<{ stars: number; pct: number }> = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 14 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
]
const TOTAL = 1284

const REVIEWS = [
  { id: 'r1', name: 'Beatriz Castro', initials: 'BC', rating: 5, date: '05/10/2026', title: 'Superou as expectativas', text: 'Chegou dois dias antes do prazo. O cancelamento de ruído é impressionante — uso no metrô todo dia e nem percebo o barulho.', helpful: 23, verified: true },
  { id: 'r2', name: 'Felipe Moreira', initials: 'FM', rating: 4, date: '28/09/2026', title: 'Muito bom, mas o estojo é grande', text: 'Som excelente e bateria que dura a semana inteira. Só achei o estojo um pouco volumoso para o bolso.', helpful: 9, verified: true },
  { id: 'r3', name: 'Larissa Gomes', initials: 'LG', rating: 5, date: '19/09/2026', title: 'Compra certa', text: 'Confortável mesmo depois de horas em call. O modo transparência é útil para ouvir o interfone sem tirar o fone.', helpful: 41, verified: false },
]

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('flex items-center gap-0.5', className)} aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-4', i < value ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
      ))}
    </span>
  )
}

export default function AvaliacoesComDistribuicao() {
  const [filter, setFilter] = useState<number | null>(null)
  const [voted, setVoted] = useState<Set<string>>(new Set())
  const shown = filter ? REVIEWS.filter((r) => r.rating === filter) : REVIEWS

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight">Avaliações de clientes</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-semibold tabular-nums">4,7</span>
                <div className="pb-1.5">
                  <Stars value={5} />
                  <p className="mt-1 text-xs text-muted-foreground">Baseado em {TOTAL.toLocaleString('pt-BR')} avaliações</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {DIST.map((d) => (
                  <button
                    key={d.stars}
                    type="button"
                    aria-pressed={filter === d.stars}
                    onClick={() => setFilter((f) => (f === d.stars ? null : d.stars))}
                    className={cn('flex w-full items-center gap-3 rounded-md px-1 py-0.5 text-sm transition-colors hover:bg-muted', filter === d.stars && 'bg-muted')}
                  >
                    <span className="flex w-8 items-center gap-1 text-muted-foreground">
                      {d.stars} <Star className="size-3 fill-amber-500 text-amber-500" />
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span className="block h-full rounded-full bg-amber-500 transition-all" style={{ width: `${d.pct}%` }} />
                    </span>
                    <span className="w-9 text-right text-xs text-muted-foreground tabular-nums">{d.pct}%</span>
                  </button>
                ))}
              </div>
              <Button className="mt-6 w-full" variant="outline">
                <PenLine data-icon="inline-start" /> Escrever avaliação
              </Button>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Mostrando <span className="font-medium text-foreground">{shown.length}</span> {shown.length === 1 ? 'avaliação' : 'avaliações'}
                {filter && ` com ${filter} ${filter === 1 ? 'estrela' : 'estrelas'}`}
              </p>
              {filter && (
                <Button variant="ghost" size="xs" onClick={() => setFilter(null)}>Limpar filtro</Button>
              )}
            </div>

            {shown.length === 0 ? (
              <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
                <SearchX className="size-8 text-muted-foreground" />
                <p className="mt-3 font-medium">Nenhuma avaliação com {filter} {filter === 1 ? 'estrela' : 'estrelas'}</p>
                <p className="mt-1 text-sm text-muted-foreground">Escolha outra nota para ver mais opiniões.</p>
              </div>
            ) : (
              <ul className="mt-4 divide-y">
                {shown.map((r) => {
                  const liked = voted.has(r.id)
                  return (
                    <li key={r.id} className="py-6 first:pt-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{r.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium">{r.name}</span>
                            {r.verified && (
                              <Badge variant="secondary">
                                <BadgeCheck data-icon="inline-start" /> Compra verificada
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{r.date}</div>
                        </div>
                        <Stars value={r.rating} />
                      </div>
                      <h3 className="mt-3 font-medium">{r.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                      <Button
                        variant={liked ? 'secondary' : 'ghost'}
                        size="xs"
                        className="mt-3"
                        aria-pressed={liked}
                        onClick={() =>
                          setVoted((s) => {
                            const n = new Set(s)
                            if (n.has(r.id)) n.delete(r.id)
                            else n.add(r.id)
                            return n
                          })
                        }
                      >
                        <ThumbsUp data-icon="inline-start" /> Útil ({r.helpful + (liked ? 1 : 0)})
                      </Button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
