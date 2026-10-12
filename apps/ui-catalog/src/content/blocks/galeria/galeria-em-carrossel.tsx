'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

type Cena = 'arco' | 'barras' | 'montanha' | 'sol' | 'ondas' | 'grade'

const FOTOS: Array<{ titulo: string; local: string; data: string; tone: string; cena: Cena }> = [
  { titulo: 'Encontro anual de clientes', local: 'Florianópolis, SC', data: 'mar 2026', tone: 'from-sky-400 via-blue-500 to-indigo-600', cena: 'barras' },
  { titulo: 'Novo escritório na Vila Madalena', local: 'São Paulo, SP', data: 'mai 2026', tone: 'from-amber-300 via-orange-400 to-rose-500', cena: 'arco' },
  { titulo: 'Imersão de produto na serra', local: 'Campos do Jordão, SP', data: 'jun 2026', tone: 'from-emerald-400 via-teal-500 to-cyan-600', cena: 'montanha' },
  { titulo: 'Lançamento do app no palco principal', local: 'Rio de Janeiro, RJ', data: 'ago 2026', tone: 'from-fuchsia-500 via-purple-500 to-violet-700', cena: 'sol' },
  { titulo: 'Meetup de atendimento digital', local: 'Recife, PE', data: 'set 2026', tone: 'from-lime-300 via-green-400 to-emerald-600', cena: 'ondas' },
  { titulo: 'Gravação do podcast Fala, Cliente', local: 'São Paulo, SP', data: 'out 2026', tone: 'from-slate-500 via-slate-600 to-zinc-800', cena: 'grade' },
]

function Cenario({ tipo }: { tipo: Cena }) {
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30" aria-hidden="true">
      {tipo === 'arco' && <path d="M60 225 V140 a140 140 0 0 1 280 0 V225 Z" fill="currentColor" />}
      {tipo === 'barras' && [0, 1, 2, 3, 4].map((i) => <rect key={i} x={50 + i * 66} y={50 + (i % 2) * 30} width="36" height="200" rx="18" fill="currentColor" />)}
      {tipo === 'montanha' && <path d="M0 225 L110 90 L190 170 L270 60 L400 225 Z" fill="currentColor" />}
      {tipo === 'sol' && (
        <>
          <circle cx="200" cy="150" r="80" fill="currentColor" />
          <rect x="0" y="150" width="400" height="75" fill="currentColor" opacity="0.7" />
        </>
      )}
      {tipo === 'ondas' && (
        <>
          <path d="M0 130 C60 90 120 170 180 130 S300 90 400 130 V225 H0 Z" fill="currentColor" />
          <path d="M0 175 C60 135 120 215 180 175 S300 135 400 175 V225 H0 Z" fill="currentColor" opacity="0.6" />
        </>
      )}
      {tipo === 'grade' && [40, 100, 160, 220, 280, 340].map((x) => [40, 110, 180].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="10" fill="currentColor" />))}
    </svg>
  )
}

export default function GaleriaEmCarrossel() {
  const [api, setApi] = useState<CarouselApi>()
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (!api) return
    const atualizar = () => setAtual(api.selectedScrollSnap())
    atualizar()
    api.on('select', atualizar)
    api.on('reInit', atualizar)
    return () => {
      api.off('select', atualizar)
      api.off('reInit', atualizar)
    }
  }, [api])

  const foto = FOTOS[atual] ?? FOTOS[0]

  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Galeria</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Um ano em movimento</h2>
        </div>

        <Carousel setApi={setApi} opts={{ align: 'center', loop: true }} className="mt-10">
          <CarouselContent className="-ml-4">
            {FOTOS.map((f, i) => (
              <CarouselItem key={f.titulo} className="basis-[88%] pl-4 sm:basis-[72%] lg:basis-[60%]">
                <button
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Ver foto ${i + 1}: ${f.titulo}`}
                  className={cn('relative block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-500', f.tone, i === atual ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-50')}
                >
                  <Cenario tipo={f.cena} />
                  <span className="absolute top-3 left-3 rounded-full bg-black/30 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur">{String(i + 1).padStart(2, '0')}</span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mx-auto mt-6 flex max-w-3xl items-center justify-between gap-4">
            <motion.div key={atual} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-w-0">
              <p className="truncate font-medium">{foto.titulo}</p>
              <p className="text-sm text-muted-foreground">
                {foto.local} · {foto.data}
              </p>
            </motion.div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm tabular-nums text-muted-foreground">
                {String(atual + 1).padStart(2, '0')} / {String(FOTOS.length).padStart(2, '0')}
              </span>
              <CarouselPrevious className="static translate-y-0" aria-label="Foto anterior" />
              <CarouselNext className="static translate-y-0" aria-label="Próxima foto" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
