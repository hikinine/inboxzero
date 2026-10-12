'use client'

import { useMemo, useState } from 'react'
import { BadgeCheck, Image as ImageIcon, PenLine, SearchX, Star, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  name: string
  initials: string
  rating: number
  date: string
  days: number
  title: string
  text: string
  photos: string[]
  verified: boolean
  helpful: number
}

const TOTAL = 2318
const AVERAGE = 4.6
const RECOMMEND = 94
const COUNTS: Record<number, number> = { 5: 1612, 4: 402, 3: 174, 2: 71, 1: 59 }
const WITH_PHOTOS = 318

const REVIEWS: Review[] = [
  { id: 'r1', name: 'Beatriz Castro', initials: 'BC', rating: 5, date: '05/10/2026', days: 7, title: 'Superou as expectativas', text: 'Chegou dois dias antes do prazo. O cancelamento de ruído é impressionante — uso no metrô todo dia e nem percebo o barulho.', photos: ['from-violet-400 to-violet-700', 'from-neutral-500 to-neutral-800'], verified: true, helpful: 23 },
  { id: 'r2', name: 'Felipe Moreira', initials: 'FM', rating: 4, date: '28/09/2026', days: 14, title: 'Muito bom, mas o estojo é grande', text: 'Som excelente e bateria que dura a semana inteira. Só achei o estojo um pouco volumoso para o bolso da calça.', photos: [], verified: true, helpful: 9 },
  { id: 'r3', name: 'Larissa Gomes', initials: 'LG', rating: 5, date: '19/09/2026', days: 23, title: 'Compra certa', text: 'Confortável mesmo depois de horas em call. O modo transparência é útil para ouvir o interfone sem tirar o fone.', photos: ['from-sky-400 to-sky-700'], verified: false, helpful: 41 },
  { id: 'r4', name: 'Rodrigo Pires', initials: 'RP', rating: 3, date: '12/09/2026', days: 30, title: 'Bom, mas o app trava', text: 'O fone em si é ótimo. O aplicativo para ajustar o equalizador fechou sozinho algumas vezes no meu celular.', photos: [], verified: true, helpful: 15 },
  { id: 'r5', name: 'Camila Duarte', initials: 'CD', rating: 5, date: '03/09/2026', days: 39, title: 'Presente aprovado', text: 'Comprei para o meu pai e ele não tira mais. A caixa é bonita e o pareamento foi imediato com o celular dele.', photos: ['from-amber-300 to-orange-600', 'from-rose-400 to-rose-700', 'from-emerald-400 to-emerald-700'], verified: true, helpful: 32 },
  { id: 'r6', name: 'Thiago Barbosa', initials: 'TB', rating: 2, date: '27/08/2026', days: 46, title: 'Esperava mais dos graves', text: 'Para quem ouve muito eletrônico como eu, os graves ficaram aquém. O conforto e a bateria são bons, mas não compensou pelo preço.', photos: [], verified: false, helpful: 6 },
  { id: 'r7', name: 'Juliana Reis', initials: 'JR', rating: 4, date: '20/08/2026', days: 53, title: 'Ótimo para corrida', text: 'Não cai do ouvido nem no treino intervalado. Suor nunca foi problema. Tiro uma estrela porque o touch às vezes pausa sem querer.', photos: ['from-lime-400 to-green-700'], verified: true, helpful: 18 },
  { id: 'r8', name: 'Marcos Vinícius', initials: 'MV', rating: 1, date: '10/08/2026', days: 63, title: 'Veio com defeito', text: 'O lado esquerdo parou de carregar na segunda semana. A troca foi rápida, mas a primeira experiência não foi boa.', photos: ['from-neutral-500 to-neutral-800'], verified: true, helpful: 11 },
]
type Sort = 'recentes' | 'uteis' | 'maior' | 'menor'

function Stars({ value, size = 'size-4' }: { value: number; size?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn(size, i < Math.round(value) ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
      ))}
    </span>
  )
}

export default function AvaliacoesComFiltroPorNota() {
  const [stars, setStars] = useState<Set<number>>(new Set())
  const [withPhotos, setWithPhotos] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sort, setSort] = useState<Sort>('recentes')
  const [voted, setVoted] = useState<Set<string>>(new Set())

  const shown = useMemo(() => {
    const list = REVIEWS.filter((r) => (stars.size === 0 || stars.has(r.rating)) && (!withPhotos || r.photos.length > 0) && (!verifiedOnly || r.verified))
    if (sort === 'recentes') list.sort((a, b) => a.days - b.days)
    if (sort === 'uteis') list.sort((a, b) => b.helpful - a.helpful)
    if (sort === 'maior') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'menor') list.sort((a, b) => a.rating - b.rating)
    return list
  }, [stars, withPhotos, verifiedOnly, sort])

  const toggleStar = (s: number) =>
    setStars((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  const clear = () => {
    setStars(new Set())
    setWithPhotos(false)
    setVerifiedOnly(false)
  }
  const anyFilter = stars.size > 0 || withPhotos || verifiedOnly

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <div className="text-5xl font-semibold tabular-nums">{AVERAGE.toLocaleString('pt-BR')}</div>
              <Stars value={AVERAGE} />
            </div>
            <div className="border-l pl-5 text-sm">
              <div className="font-medium">{TOTAL.toLocaleString('pt-BR')} avaliações</div>
              <div className="text-muted-foreground">{RECOMMEND}% recomendam este produto</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <BadgeCheck className="size-3.5 text-emerald-600" /> 87% de compras verificadas
              </div>
            </div>
          </div>
          <Button variant="outline">
            <PenLine data-icon="inline-start" /> Escrever avaliação
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {[5, 4, 3, 2, 1].map((s) => {
            const on = stars.has(s)
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggleStar(s)}
                className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors', on ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:bg-muted')}
              >
                <span className="font-medium tabular-nums">{s}</span>
                <Star className={cn('size-3.5', on ? 'fill-primary-foreground' : 'fill-amber-500 text-amber-500')} />
                <span className={cn('text-xs tabular-nums', on ? 'opacity-80' : 'text-muted-foreground')}>{(COUNTS[s] ?? 0).toLocaleString('pt-BR')}</span>
              </button>
            )
          })}
          <span className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
          <button
            type="button"
            aria-pressed={withPhotos}
            onClick={() => setWithPhotos((v) => !v)}
            className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors', withPhotos ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:bg-muted')}
          >
            <ImageIcon className="size-3.5" /> Com fotos <span className={cn('text-xs tabular-nums', withPhotos ? 'opacity-80' : 'text-muted-foreground')}>{WITH_PHOTOS}</span>
          </button>
          <button
            type="button"
            aria-pressed={verifiedOnly}
            onClick={() => setVerifiedOnly((v) => !v)}
            className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors', verifiedOnly ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:bg-muted')}
          >
            <BadgeCheck className="size-3.5" /> Compra verificada
          </button>
          {anyFilter && (
            <Button variant="ghost" size="sm" onClick={clear}>Limpar</Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Label htmlFor="afn-sort" className="text-xs text-muted-foreground">Ordenar por</Label>
            <NativeSelect id="afn-sort" size="sm" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <NativeSelectOption value="recentes">Mais recentes</NativeSelectOption>
              <NativeSelectOption value="uteis">Mais úteis</NativeSelectOption>
              <NativeSelectOption value="maior">Maior nota</NativeSelectOption>
              <NativeSelectOption value="menor">Menor nota</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Mostrando <span className="font-medium text-foreground tabular-nums">{shown.length}</span> avaliações em destaque
          {stars.size > 0 && ` · ${[...stars].sort((a, b) => b - a).map((s) => `${s}★`).join(', ')}`}
        </p>

        {shown.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed py-14 text-center">
            <SearchX className="size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">Nenhuma avaliação com esses filtros</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={clear}>Limpar filtros</Button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {shown.map((r) => {
              const did = voted.has(r.id)
              return (
                <article key={r.id} className="flex flex-col rounded-xl border bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{r.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          {r.name}
                          {r.verified && <BadgeCheck className="size-3.5 text-emerald-600" aria-label="Compra verificada" />}
                        </div>
                        <div className="text-xs text-muted-foreground">{r.date}</div>
                      </div>
                    </div>
                    <Stars value={r.rating} size="size-3.5" />
                  </div>
                  <h3 className="mt-4 font-medium">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                  {r.photos.length > 0 && (
                    <div className="mt-3 flex gap-2">
                      {r.photos.map((g, i) => (
                        <div key={i} className={cn('size-16 rounded-lg bg-gradient-to-br', g)} aria-label={`Foto ${i + 1} de ${r.name}`} role="img" />
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                    <span>{did ? r.helpful + 1 : r.helpful} pessoas acharam útil</span>
                    <Button
                      variant={did ? 'secondary' : 'ghost'}
                      size="xs"
                      aria-pressed={did}
                      onClick={() =>
                        setVoted((prev) => {
                          const next = new Set(prev)
                          if (next.has(r.id)) next.delete(r.id)
                          else next.add(r.id)
                          return next
                        })
                      }
                    >
                      <ThumbsUp data-icon="inline-start" /> Útil
                    </Button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
