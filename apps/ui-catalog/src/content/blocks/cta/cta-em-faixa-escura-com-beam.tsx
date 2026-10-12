'use client'

import { motion } from 'motion/react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Cinco linhas atravessam a faixa; um feixe de luz percorre cada uma em tempos diferentes.
const LINHAS = [
  { d: 'M -20 70 C 300 40, 600 110, 1220 60', duracao: 7, atraso: 0 },
  { d: 'M -20 150 C 400 120, 700 190, 1220 140', duracao: 9, atraso: 1.2 },
  { d: 'M -20 230 C 300 260, 800 200, 1220 240', duracao: 8, atraso: 0.6 },
  { d: 'M -20 310 C 450 290, 750 350, 1220 320', duracao: 10, atraso: 2 },
  { d: 'M -20 380 C 350 400, 850 350, 1220 390', duracao: 8.5, atraso: 1.6 },
]

const LOGOS = [
  { nome: 'Araucária', classe: 'font-serif text-lg' },
  { nome: 'nuvem.co', classe: 'font-mono' },
  { nome: 'KAVO', classe: 'font-black' },
  { nome: 'Trilha', classe: 'font-semibold tracking-tight text-lg' },
  { nome: 'PRISMA', classe: 'text-xs font-bold tracking-[0.3em]' },
]

export default function CtaEmFaixaEscuraComBeam() {
  return (
    <section className="relative isolate w-full overflow-hidden border-y border-white/10 bg-neutral-950 px-6 py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cfe-feixe" x1="0" x2="1">
              <stop offset="0" stopColor="rgb(56,189,248)" stopOpacity="0" />
              <stop offset="0.5" stopColor="rgb(167,139,250)" />
              <stop offset="1" stopColor="rgb(56,189,248)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {LINHAS.map((l, i) => (
            <g key={i}>
              <path d={l.d} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
              <motion.path
                d={l.d}
                fill="none"
                stroke="url(#cfe-feixe)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0.18, pathSpacing: 1, pathOffset: 0 }}
                animate={{ pathLength: 0.18, pathSpacing: 1, pathOffset: 1 }}
                transition={{ duration: l.duracao, repeat: Infinity, ease: 'linear', delay: l.atraso }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Implantação em 48 horas
        </span>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Pronto para colocar o time inteiro na mesma frequência?</h2>
        <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">Conecte WhatsApp, e-mail e CRM hoje. Amanhã, seu time acorda com a fila organizada e os relatórios prontos.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="h-11 bg-white px-6 text-neutral-900 hover:bg-white/90">
            Começar grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <MessageCircle data-icon="inline-start" /> Falar com vendas
          </Button>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/40">
          <span className="text-xs tracking-wider uppercase">Confiado por</span>
          {LOGOS.map((l) => (
            <span key={l.nome} className={`select-none ${l.classe}`}>
              {l.nome}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
