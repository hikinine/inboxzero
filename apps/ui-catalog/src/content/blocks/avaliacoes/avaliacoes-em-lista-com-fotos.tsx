'use client'

import { useMemo, useState } from 'react'
import { BadgeCheck, Camera, Star, Store, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
  iso: string
  text: string
  photos: string[]
  tags: string[]
  up: number
  down: number
  reply?: string
}

const REVIEWS: Review[] = [
  {
    id: 'r1', name: 'Paula Ribeiro', initials: 'PR', rating: 5, date: '06/10/2026', iso: '2026-10-06',
    text: 'A mochila é exatamente como nas fotos. O compartimento do notebook é acolchoado e cabe o meu de 15,6". Usei na chuva e nada molhou.',
    photos: ['from-emerald-400 to-emerald-700', 'from-emerald-300 to-teal-600', 'from-slate-400 to-slate-700'],
    tags: ['Tamanho: ideal', 'Cor: fiel à foto'], up: 34, down: 1,
    reply: 'Que bom que gostou, Paula! A impermeabilização é um dos nossos orgulhos. Obrigado por compartilhar as fotos.',
  },
  {
    id: 'r2', name: 'Thiago Santana', initials: 'TS', rating: 4, date: '30/09/2026', iso: '2026-09-30',
    text: 'Ótimo custo-benefício. O zíper principal é um pouco duro no começo, mas amacia com o uso. As alças são bem confortáveis.',
    photos: ['from-emerald-500 to-green-800', 'from-stone-400 to-stone-700'],
    tags: ['Tamanho: ideal', 'Qualidade: boa'], up: 12, down: 2,
  },
  {
    id: 'r3', name: 'Renata Lopes', initials: 'RL', rating: 3, date: '12/09/2026', iso: '2026-09-12',
    text: 'Bonita, mas achei o bolso lateral pequeno para a minha garrafa de 1 L. Para o dia a dia funciona bem.',
    photos: ['from-teal-400 to-cyan-700'],
    tags: ['Tamanho: menor que esperava'], up: 5, down: 0,
  },
]

type Sort = 'recentes' | 'uteis' | 'nota'
type Vote = 'up' | 'down'

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-3.5', i < value ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
      ))}
    </span>
  )
}

export default function AvaliacoesEmListaComFotos() {
  const [sort, setSort] = useState<Sort>('recentes')
  const [votes, setVotes] = useState<Record<string, Vote | undefined>>({})

  const sorted = useMemo(() => {
    const list = [...REVIEWS]
    if (sort === 'recentes') list.sort((a, b) => b.iso.localeCompare(a.iso))
    if (sort === 'uteis') list.sort((a, b) => b.up - a.up)
    if (sort === 'nota') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [sort])

  const vote = (id: string, v: Vote) => setVotes((s) => ({ ...s, [id]: s[id] === v ? undefined : v }))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Avaliações com fotos</h2>
            <p className="mt-1 text-sm text-muted-foreground">{REVIEWS.length} clientes enviaram fotos da Mochila Urban 25L</p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="ordenar" className="text-xs text-muted-foreground">Ordenar por</Label>
            <NativeSelect id="ordenar" size="sm" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <NativeSelectOption value="recentes">Mais recentes</NativeSelectOption>
              <NativeSelectOption value="uteis">Mais úteis</NativeSelectOption>
              <NativeSelectOption value="nota">Maior nota</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          {sorted.map((r) => {
            const v = votes[r.id]
            return (
              <li key={r.id} className="rounded-xl border bg-card p-6">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{r.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{r.name}</span>
                      <Badge variant="secondary">
                        <BadgeCheck data-icon="inline-start" /> Compra verificada
                      </Badge>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="mt-1"><Stars value={r.rating} /></div>
                  </div>
                </div>

                <p className="mt-4 text-sm">{r.text}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.photos.map((g, i) => (
                    <button key={i} type="button" aria-label={`Abrir foto ${i + 1} de ${r.name}`} className={cn('flex size-20 items-center justify-center rounded-lg bg-gradient-to-br transition hover:opacity-90', g)}>
                      <Camera className="size-5 text-white/80" />
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>

                {r.reply && (
                  <div className="mt-4 rounded-lg bg-muted/60 p-4 text-sm">
                    <div className="flex items-center gap-2 font-medium">
                      <Store className="size-4" /> Resposta da loja
                    </div>
                    <p className="mt-1 text-muted-foreground">{r.reply}</p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>Esta avaliação foi útil?</span>
                  <Button variant={v === 'up' ? 'secondary' : 'outline'} size="xs" aria-pressed={v === 'up'} onClick={() => vote(r.id, 'up')}>
                    <ThumbsUp data-icon="inline-start" /> Sim ({r.up + (v === 'up' ? 1 : 0)})
                  </Button>
                  <Button variant={v === 'down' ? 'secondary' : 'outline'} size="xs" aria-pressed={v === 'down'} onClick={() => vote(r.id, 'down')}>
                    <ThumbsDown data-icon="inline-start" /> Não ({r.down + (v === 'down' ? 1 : 0)})
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
