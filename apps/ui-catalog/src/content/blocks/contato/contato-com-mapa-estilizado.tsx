'use client'

import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

const BLOCKS: Array<[number, number, number, number]> = [
  [20, 20, 120, 90],
  [160, 20, 200, 90],
  [380, 20, 100, 90],
  [500, 20, 150, 90],
  [670, 20, 110, 90],
  [20, 130, 200, 100],
  [240, 130, 120, 100],
  [380, 130, 100, 100],
  [500, 130, 280, 100],
  [20, 250, 120, 150],
  [160, 250, 120, 150],
  [300, 250, 180, 150],
  [500, 250, 150, 150],
  [670, 250, 110, 150],
]

export default function ContatoComMapaEstilizado() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Onde estamos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Passe para um café</h2>
          <p className="mt-3 text-muted-foreground">Ficamos a duas quadras da estação Trianon-Masp. Avise antes e a gente reserva uma sala.</p>
        </div>
        <div className="relative mt-10 overflow-hidden rounded-2xl border bg-muted/40">
          <svg viewBox="0 0 800 420" className="block h-auto w-full" aria-hidden="true">
            {Array.from({ length: 21 }, (_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="420" className="stroke-border" strokeWidth="1" />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} className="stroke-border" strokeWidth="1" />
            ))}
            {BLOCKS.map(([x, y, w, h]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="8" className="fill-background stroke-border" strokeWidth="1" />
            ))}
            <path d="M0 365 C180 335 300 425 480 315 S700 255 800 295" fill="none" className="stroke-sky-500/40" strokeWidth="16" strokeLinecap="round" />
            <rect x="520" y="150" width="130" height="64" rx="10" className="fill-emerald-500/25" />
            <circle cx="548" cy="174" r="11" className="fill-emerald-500/50" />
            <circle cx="585" cy="190" r="14" className="fill-emerald-500/50" />
            <circle cx="624" cy="170" r="10" className="fill-emerald-500/50" />
            <text x="250" y="124" fontSize="11" className="fill-muted-foreground">
              Av. Paulista
            </text>
            <text x="560" y="243" fontSize="11" className="fill-muted-foreground">
              Al. Santos
            </text>
            <text transform="rotate(-90 372 330)" x="372" y="330" fontSize="11" className="fill-muted-foreground">
              R. Augusta
            </text>
          </svg>
          <div className="absolute" style={{ left: '53.75%', top: '42.9%' }}>
            {[0, 1].map((i) => (
              <motion.span key={i} className="absolute -top-4 -left-4 size-8 rounded-full bg-primary/40" animate={{ scale: [1, 3], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }} />
            ))}
            <span className="absolute -top-2 -left-2 size-4 rounded-full bg-primary ring-4 ring-background" />
            <motion.span className="absolute -top-12 left-1/2 -translate-x-1/2 text-primary" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <MapPin className="size-8 fill-primary/20" />
            </motion.span>
          </div>
          <div className="border-t bg-background p-5 sm:absolute sm:bottom-6 sm:left-6 sm:max-w-sm sm:rounded-xl sm:border sm:shadow-lg">
            <p className="font-semibold">Acme Tecnologia · Escritório São Paulo</p>
            <p className="mt-1 text-sm text-muted-foreground">Av. Paulista, 1578 · 12º andar · Bela Vista</p>
            <p className="text-sm text-muted-foreground">São Paulo, SP · 01310-200</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <dt className="sr-only">Horário</dt>
                <dd>Seg. a sex., 9h às 18h</dd>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                <dt className="sr-only">Telefone</dt>
                <dd>(11) 4002-8922</dd>
              </div>
            </dl>
            <div className="mt-5 flex gap-2">
              <Button nativeButton={false} render={<a href="#" />}>
                Como chegar <ArrowUpRight data-icon="inline-end" />
              </Button>
              <Button nativeButton={false} render={<a href="#" />} variant="outline">
                Agendar visita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
