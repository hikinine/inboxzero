'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'

const DEPOIMENTOS = [
  { nome: 'Ana Souza', cargo: 'Head de Vendas', empresa: 'Lumi', texto: 'Tiramos 40% do tempo de resposta na primeira semana. O inbox unificado mudou a rotina do time inteiro.' },
  { nome: 'Bruno Rocha', cargo: 'Fundador', empresa: 'Kavo', texto: 'A IA qualifica de madrugada e, de manhã, a agenda já está cheia de reunião boa. Nunca mais perdi lead de fim de semana.' },
  { nome: 'Carla Mendes', cargo: 'Customer Success', empresa: 'Nuvem Fit', texto: 'O relatório por origem mostrou que o Instagram pagava a conta. Realocamos a verba no mesmo dia.' },
  { nome: 'Diego Lima', cargo: 'Vendedor', empresa: 'Prisma', texto: 'Fila justa, sem briga por lead. E o resumo da conversa no card do cliente é ouro puro.' },
  { nome: 'Elisa Farias', cargo: 'Marketing', empresa: 'Doma', texto: 'Montei a automação de carrinho abandonado sozinha, sem chamar ninguém de tecnologia.' },
  { nome: 'Fábio Nunes', cargo: 'COO', empresa: 'Trilha', texto: 'Migramos três ferramentas para uma. Menos custo, menos aba aberta e menos erro de digitação.' },
]

export default function DepoimentosEmCarrossel() {
  const [api, setApi] = useState<CarouselApi>()
  const [atual, setAtual] = useState(0)
  const [total, setTotal] = useState(DEPOIMENTOS.length)

  useEffect(() => {
    if (!api) return
    const atualizar = () => {
      setAtual(api.selectedScrollSnap())
      setTotal(api.scrollSnapList().length)
    }
    atualizar()
    api.on('select', atualizar)
    api.on('reInit', atualizar)
    return () => {
      api.off('select', atualizar)
      api.off('reInit', atualizar)
    }
  }, [api])

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="w-full">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Depoimentos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem vende com a gente, conta</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums text-muted-foreground">
                {atual + 1} / {total}
              </span>
              <CarouselPrevious className="static translate-y-0" aria-label="Depoimento anterior" />
              <CarouselNext className="static translate-y-0" aria-label="Próximo depoimento" />
            </div>
          </div>

          <CarouselContent className="mt-10 -ml-4">
            {DEPOIMENTOS.map((d) => (
              <CarouselItem key={d.nome} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-2xl border bg-card p-6">
                  <div className="flex gap-0.5 text-amber-500">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed">“{d.texto}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t pt-4">
                    <Avatar>
                      <AvatarFallback>{d.nome.split(' ').map((s) => s[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{d.nome}</div>
                      <div className="text-xs text-muted-foreground">
                        {d.cargo} · {d.empresa}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para o depoimento ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === atual ? 'w-6 bg-primary' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  )
}
