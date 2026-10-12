'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const ROUTE = 'M20 100 C 60 20, 100 130, 140 60 S 200 30, 240 70'
const PINS: Array<[number, number]> = [
  [40, 40],
  [160, 36],
  [150, 110],
  [46, 104],
]
const BUBBLES = [
  { x: 16, y: 16, w: 124, mine: false },
  { x: 80, y: 52, w: 124, mine: true },
  { x: 16, y: 88, w: 92, mine: false },
]

function Cell({ title, text, className, children }: { title: string; text: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('flex flex-col rounded-xl border bg-card p-6', className)}>
      <div className="h-40 w-full">{children}</div>
      <h3 className="mt-5 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

function SyncIllustration() {
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full text-primary" role="img" aria-label="Três sistemas sincronizando dados">
      {[40, 160, 280].map((x) => (
        <rect key={x} x={x - 22} y={48} width={44} height={44} rx={10} className="fill-background stroke-border" strokeWidth={1.5} />
      ))}
      <path d="M62 70 H138" className="stroke-border" strokeWidth={1.5} />
      <path d="M182 70 H258" className="stroke-border" strokeWidth={1.5} />
      <motion.path d="M62 70 H138" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.path d="M182 70 H258" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }} />
      <circle cx={40} cy={70} r={6} fill="currentColor" />
      <rect x={154} y={64} width={12} height={12} rx={2} fill="currentColor" />
      <path d="M274 76 L280 64 L286 76 Z" fill="currentColor" />
      <motion.circle r={4} cx={40} cy={70} fill="currentColor" animate={{ x: [0, 120, 240, 0], opacity: [1, 1, 1, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'linear', times: [0, 0.45, 0.9, 1] }} />
    </svg>
  )
}

function GrowthIllustration() {
  const bars = [30, 48, 42, 64, 58, 80, 92]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full text-primary" role="img" aria-label="Gráfico de barras crescendo">
      <line x1={12} x2={188} y1={104} y2={104} className="stroke-border" strokeWidth={1} />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={16 + i * 25}
          width={16}
          rx={3}
          fill="currentColor"
          opacity={i === bars.length - 1 ? 1 : 0.4}
          initial={{ height: 0, y: 104 }}
          animate={{ height: [0, h, h, 0], y: [104, 104 - h, 104 - h, 104] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12, times: [0, 0.25, 0.8, 1] }}
        />
      ))}
      <motion.path d="M24 90 L49 72 L74 78 L99 56 L124 62 L149 40 L174 22" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-emerald-500" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.8, 1] }} />
    </svg>
  )
}

function ReachIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full text-primary" role="img" aria-label="Ondas alcançando contatos">
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cx={100} cy={70} r={10} fill="none" stroke="currentColor" strokeWidth={1.5} style={{ transformOrigin: '100px 70px' }} initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: [1, 6], opacity: [0.7, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: i }} />
      ))}
      <circle cx={100} cy={70} r={12} fill="currentColor" />
      {PINS.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={5} fill="currentColor" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 + i * 0.2 }} />
      ))}
    </svg>
  )
}

function RouteIllustration() {
  return (
    <svg viewBox="0 0 260 130" className="h-full w-full text-primary" role="img" aria-label="Rota de entrega sendo traçada">
      <path d={ROUTE} fill="none" strokeWidth={2} strokeDasharray="4 6" strokeLinecap="round" className="stroke-border" />
      <motion.path d={ROUTE} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }} />
      <circle cx={20} cy={100} r={6} className="fill-background" stroke="currentColor" strokeWidth={2.5} />
      <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.6, repeat: Infinity }}>
        <path d="M240 46 c-9 0-15 7-15 15 c0 11 15 25 15 25 s15-14 15-25 c0-8-6-15-15-15 z" fill="currentColor" />
        <circle cx={240} cy={61} r={5} className="fill-background" />
      </motion.g>
    </svg>
  )
}

function ChatIllustration() {
  return (
    <svg viewBox="0 0 220 140" className="h-full w-full text-primary" role="img" aria-label="Conversa com mensagens aparecendo">
      {BUBBLES.map((b, i) => (
        <motion.g key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -4] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.8, times: [0, 0.15, 0.8, 1] }}>
          <rect x={b.x} y={b.y} width={b.w} height={28} rx={14} className={b.mine ? 'fill-primary' : 'fill-muted'} />
          <rect x={b.x + 14} y={b.y + 11} width={b.w - 40} height={6} rx={3} className={b.mine ? 'fill-primary-foreground/70' : 'fill-muted-foreground/50'} />
        </motion.g>
      ))}
    </svg>
  )
}

export default function BentoComIlustracoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Como funciona</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Do primeiro clique à entrega</h2>
          <p className="mt-3 text-muted-foreground">Cinco peças que se encaixam: estoque sincronizado, vendas crescendo, alcance, logística e conversa com o cliente.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Cell title="Sincronização em tempo real" text="Loja, marketplace e ERP sempre com o mesmo estoque." className="md:col-span-2">
            <SyncIllustration />
          </Cell>
          <Cell title="Crescimento previsível" text="Receita acompanhada semana a semana.">
            <GrowthIllustration />
          </Cell>
          <Cell title="Alcance que se espalha" text="Campanhas chegam a quem já comprou e a quem ainda vai comprar.">
            <ReachIllustration />
          </Cell>
          <Cell title="Rotas de entrega" text="Transportadora escolhida pelo prazo e pelo custo.">
            <RouteIllustration />
          </Cell>
          <Cell title="Conversas que convertem" text="WhatsApp, e-mail e chat numa fila só.">
            <ChatIllustration />
          </Cell>
        </div>
      </div>
    </section>
  )
}
