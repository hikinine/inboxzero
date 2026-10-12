'use client'

import { motion } from 'motion/react'
import { ArrowRight, Maximize2, Play, Quote, Volume2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const RESULTADOS = [
  { valor: '+38%', rotulo: 'de conversão em leads' },
  { valor: '3 sem.', rotulo: 'para implantar tudo' },
  { valor: 'R$ 2,1 mi', rotulo: 'vendidos pela plataforma' },
]

export default function DepoimentoComVideoMockup() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-video overflow-hidden rounded-2xl border bg-neutral-900 text-white shadow-xl">
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-emerald-700/70 via-neutral-900 to-teal-600/40" />
          <div aria-hidden className="absolute top-[14%] left-[16%] size-44 rounded-full bg-gradient-to-br from-amber-300/50 to-rose-400/40 blur-2xl" />
          {/* Silhueta da pessoa entrevistada */}
          <div aria-hidden className="absolute bottom-0 left-[12%] flex flex-col items-center">
            <div className="size-16 rounded-full bg-neutral-800/90 sm:size-20" />
            <div className="-mt-2 h-24 w-40 rounded-t-[3rem] bg-neutral-800/90 sm:h-28 sm:w-48" />
          </div>

          <div className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur">Case · Nuvem Fit</div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.span aria-hidden className="absolute inset-0 rounded-full bg-white/40" animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
            <button type="button" aria-label="Reproduzir depoimento em vídeo" className="relative flex size-16 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition-transform hover:scale-105">
              <Play className="ml-1 size-6 fill-current" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-5 pt-14 pb-4">
            <div className="inline-block rounded-md bg-black/50 px-2 py-1 text-xs">
              <span className="font-medium">Carla Mendes</span> <span className="text-white/70">· Diretora Comercial</span>
            </div>
            <div className="mt-3 h-1 rounded-full bg-white/20">
              <div className="h-full w-[38%] rounded-full bg-white" />
            </div>
            <div className="mt-2.5 flex items-center gap-3 text-white/80">
              <Play className="size-4 fill-current" />
              <Volume2 className="size-4" />
              <span className="text-xs tabular-nums">1:04 / 2:48</span>
              <Maximize2 className="ml-auto size-4" />
            </div>
          </div>
        </div>

        <figure>
          <Quote className="size-8 text-muted-foreground/40" />
          <blockquote className="mt-5 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            “Em duas semanas o time parou de perder lead no WhatsApp. Foi a ferramenta mais rápida de adotar que já vi — e eu já vi muitas.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Carla Mendes</div>
              <div className="text-muted-foreground">Diretora Comercial · Nuvem Fit · Florianópolis, SC</div>
            </div>
          </figcaption>

          <dl className="mt-8 grid grid-cols-3 divide-x border-t pt-6">
            {RESULTADOS.map((r, i) => (
              <div key={r.rotulo} className={i === 0 ? 'pr-4' : 'px-4'}>
                <dd className="text-2xl font-semibold tracking-tight tabular-nums">{r.valor}</dd>
                <dt className="mt-1 text-xs text-muted-foreground">{r.rotulo}</dt>
              </div>
            ))}
          </dl>

          <a href="#" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Ler o case completo <ArrowRight className="size-3.5" />
          </a>
        </figure>
      </div>
    </section>
  )
}
