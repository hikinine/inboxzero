'use client'

import type { LucideIcon } from 'lucide-react'
import { CalendarCheck, CreditCard, MessageCircle, Package, ShoppingCart, Star, TrendingUp, Users } from 'lucide-react'
import { motion } from 'motion/react'

// "Card Ring Orbit": carrossel 3D de verdade — oito cards de métrica dispostos num anel (rotateY + translateZ) que
// gira em perspectiva, levemente inclinado. Os de trás ficam menores e mais apagados naturalmente pela profundidade;
// cada card tem ícone, valor, variação e um minigráfico. Sombra elíptica no "chão" reforça o volume.
const CARDS: ReadonlyArray<{ label: string; value: string; delta: string; Icon: LucideIcon; tone: string; bars: readonly number[] }> = [
  { label: 'Vendas', value: 'R$ 48,2 mil', delta: '+12%', Icon: ShoppingCart, tone: 'text-emerald-500', bars: [4, 6, 5, 8, 7, 10] },
  { label: 'Clientes', value: '3.912', delta: '+5%', Icon: Users, tone: 'text-sky-500', bars: [5, 5, 6, 7, 7, 8] },
  { label: 'Pedidos', value: '1.284', delta: '+9%', Icon: Package, tone: 'text-violet-500', bars: [3, 5, 4, 6, 8, 9] },
  { label: 'Ticket médio', value: 'R$ 186', delta: '+3%', Icon: CreditCard, tone: 'text-amber-500', bars: [6, 5, 6, 6, 7, 7] },
  { label: 'Avaliação', value: '4,8', delta: '+0,2', Icon: Star, tone: 'text-yellow-500', bars: [7, 8, 7, 8, 9, 9] },
  { label: 'Conversas', value: '842', delta: '+21%', Icon: MessageCircle, tone: 'text-emerald-500', bars: [2, 4, 5, 6, 8, 10] },
  { label: 'Agendamentos', value: '128', delta: '+7%', Icon: CalendarCheck, tone: 'text-rose-500', bars: [4, 3, 5, 6, 5, 7] },
  { label: 'Conversão', value: '3,4%', delta: '+0,6', Icon: TrendingUp, tone: 'text-sky-500', bars: [3, 4, 4, 5, 6, 7] },
]
const RADIUS = 210
const STEP = 360 / CARDS.length

export default function CardRingOrbit() {
  return (
    <div className="relative flex h-[320px] w-[480px] items-center justify-center overflow-hidden text-foreground" style={{ perspective: 1000 }}>
      <div className="absolute bottom-6 left-1/2 h-10 w-[360px] -translate-x-1/2 rounded-[50%] bg-foreground/10 blur-xl" />
      <div style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-8deg)' }}>
        <motion.div
          className="relative h-[150px] w-[120px]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: [0, -360] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {CARDS.map((c, i) => {
            const max = Math.max(...c.bars)
            return (
              <div
                key={c.label}
                className="absolute inset-0 flex flex-col rounded-2xl border bg-card p-3 shadow-xl"
                style={{ transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`, backfaceVisibility: 'hidden' }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-muted">
                    <c.Icon className={`size-3.5 ${c.tone}`} />
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-1.5 text-[9px] font-medium text-emerald-600 dark:text-emerald-400">{c.delta}</span>
                </div>
                <div className="mt-2 text-[10px] text-muted-foreground">{c.label}</div>
                <div className="text-sm font-semibold tabular-nums">{c.value}</div>
                <div className="mt-auto flex h-8 items-end gap-1">
                  {c.bars.map((b, j) => (
                    <span key={j} className={`flex-1 rounded-sm ${j === c.bars.length - 1 ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${(b / max) * 100}%` }} />
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
