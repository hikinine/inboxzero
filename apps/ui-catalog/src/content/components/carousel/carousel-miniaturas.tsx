'use client'

import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const FOTOS = [
  { id: 1, titulo: 'Sala principal', cor: 'from-amber-300/70 via-orange-400/60 to-rose-500/70' },
  { id: 2, titulo: 'Cozinha integrada', cor: 'from-sky-300/70 via-cyan-500/60 to-blue-600/70' },
  { id: 3, titulo: 'Suíte com varanda', cor: 'from-emerald-300/70 via-teal-500/60 to-cyan-600/70' },
  { id: 4, titulo: 'Área gourmet', cor: 'from-violet-300/70 via-purple-500/60 to-fuchsia-600/70' },
  { id: 5, titulo: 'Fachada', cor: 'from-slate-300/70 via-slate-500/60 to-slate-700/70' },
  { id: 6, titulo: 'Piscina', cor: 'from-cyan-300/70 via-sky-500/60 to-indigo-600/70' },
]

export default function CarouselMiniaturas() {
  const [principal, setPrincipal] = useState<CarouselApi>()
  const [thumbs, setThumbs] = useState<CarouselApi>()
  const [atual, setAtual] = useState(0)

  // Slide principal muda → a faixa de miniaturas rola até a ativa.
  useEffect(() => {
    if (!principal) return
    const onSelect = () => {
      const i = principal.selectedScrollSnap()
      setAtual(i)
      thumbs?.scrollTo(i)
    }
    onSelect()
    principal.on('select', onSelect)
    return () => {
      principal.off('select', onSelect)
    }
  }, [principal, thumbs])

  return (
    <div className="w-full max-w-md">
      <Carousel setApi={setPrincipal} className="overflow-hidden rounded-xl">
        <CarouselContent>
          {FOTOS.map((f) => (
            <CarouselItem key={f.id}>
              <div className={cn('relative aspect-[4/3] bg-gradient-to-br', f.cor)}>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
                  <span className="text-sm font-medium">{f.titulo}</span>
                  <span className="rounded-full bg-black/40 px-2 py-0.5 text-[11px] tabular-nums">
                    {atual + 1} / {FOTOS.length}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <Carousel setApi={setThumbs} opts={{ containScroll: 'keepSnaps', dragFree: true }} className="mt-2">
        <CarouselContent className="-ml-2">
          {FOTOS.map((f, i) => (
            <CarouselItem key={f.id} className="basis-1/5 pl-2">
              <button
                type="button"
                onClick={() => principal?.scrollTo(i)}
                aria-label={`Ver ${f.titulo}`}
                aria-current={i === atual}
                className={cn(
                  'block w-full overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-background transition-all',
                  i === atual ? 'ring-primary' : 'ring-transparent opacity-60 hover:opacity-100',
                )}
              >
                <div className={cn('aspect-[4/3] bg-gradient-to-br', f.cor)} />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="mt-2 text-center text-xs text-muted-foreground">Apartamento 72 m² · Pinheiros, São Paulo</p>
    </div>
  )
}
