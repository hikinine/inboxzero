'use client'

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'

const SLIDES = [
  { titulo: 'Praia do Rosa, SC', legenda: 'Trilha + pôr do sol', cor: 'from-sky-400/70 via-cyan-500/50 to-blue-600/70' },
  { titulo: 'Chapada dos Veadeiros, GO', legenda: 'Cachoeiras e cerrado', cor: 'from-amber-400/70 via-orange-500/50 to-rose-500/70' },
  { titulo: 'Serra da Mantiqueira, MG', legenda: 'Frio, fondue e montanhas', cor: 'from-emerald-400/70 via-green-500/50 to-teal-600/70' },
  { titulo: 'Lençóis Maranhenses, MA', legenda: 'Lagoas entre dunas', cor: 'from-yellow-300/70 via-amber-400/50 to-sky-500/70' },
]

export default function CarouselImagens() {
  const [api, setApi] = useState<CarouselApi>()
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setAtual(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="w-full max-w-md">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {SLIDES.map((s, i) => (
            <CarouselItem key={s.titulo}>
              <div className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${s.cor}`}>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <div className="text-sm font-medium">{s.titulo}</div>
                  <div className="text-xs opacity-80">{s.legenda}</div>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[11px] text-white tabular-nums">
                  {i + 1} / {SLIDES.length}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>

      <div className="mt-3 flex items-center justify-center gap-1.5" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.titulo}
            type="button"
            role="tab"
            aria-selected={i === atual}
            aria-label={`Ir para ${s.titulo}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${i === atual ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70'}`}
          />
        ))}
      </div>
    </div>
  )
}
