'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bot, CreditCard, Globe, Headset, Mail, MessageCircle, ShoppingBag, Sparkles, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Icon Constellation": ícones espalhados como estrelas num céu pontilhado. A cada 3,8s uma nova "constelação" se
// desenha — as linhas nascem uma após a outra ligando os ícones daquele fluxo, que acendem; depois tudo se apaga e
// outra jornada aparece (vendas, atendimento, marketing). Estrelas de fundo cintilam em ritmos fixos.
const W = 420
const H = 300

const NODES: ReadonlyArray<{ x: number; y: number; Icon: LucideIcon; label: string }> = [
  { x: 62, y: 70, Icon: Globe, label: 'Site' },
  { x: 168, y: 46, Icon: Mail, label: 'E-mail' },
  { x: 296, y: 64, Icon: Sparkles, label: 'IA' },
  { x: 372, y: 150, Icon: Bot, label: 'Bot' },
  { x: 236, y: 146, Icon: Users, label: 'CRM' },
  { x: 104, y: 170, Icon: MessageCircle, label: 'WhatsApp' },
  { x: 58, y: 252, Icon: Headset, label: 'Suporte' },
  { x: 196, y: 248, Icon: ShoppingBag, label: 'Loja' },
  { x: 338, y: 246, Icon: CreditCard, label: 'Pix' },
]

const PATTERNS: ReadonlyArray<{ name: string; tone: string; edges: ReadonlyArray<readonly [number, number]> }> = [
  { name: 'Jornada de compra', tone: 'text-emerald-500', edges: [[0, 5], [5, 4], [4, 7], [7, 8]] },
  { name: 'Atendimento', tone: 'text-sky-500', edges: [[5, 3], [3, 2], [2, 4], [4, 6]] },
  { name: 'Campanha de e-mail', tone: 'text-violet-500', edges: [[1, 0], [1, 2], [1, 4], [4, 8], [8, 3]] },
]

const STARS = Array.from({ length: 34 }, (_, i) => ({ x: (i * 97 + 13) % W, y: (i * 61 + 29) % H, d: 1.4 + (i % 5) * 0.5, delay: (i % 7) * 0.3 }))
const STEP = 0.35

export default function IconConstellation() {
  const [k, setK] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setK((v) => (v + 1) % PATTERNS.length), 3800)
    return () => clearInterval(id)
  }, [])

  const pattern = PATTERNS[k]
  const active = new Map<number, number>() // nó → ordem em que acende
  pattern.edges.forEach(([a, b], i) => {
    if (!active.has(a)) active.set(a, i)
    if (!active.has(b)) active.set(b, i + 1)
  })

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-foreground" style={{ width: W, height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label="Ícones ligados por linhas que se redesenham como constelações">
        {STARS.map((s, i) => (
          <motion.circle key={i} cx={s.x} cy={s.y} r="1" fill="currentColor" className="text-muted-foreground" animate={{ opacity: [0.15, 0.8, 0.15] }} transition={{ duration: s.d, delay: s.delay, repeat: Infinity }} />
        ))}
        <AnimatePresence>
          <motion.g key={k} className={pattern.tone} exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            {pattern.edges.map(([a, b], i) => (
              <motion.line
                key={`${a}-${b}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 + i * STEP, ease: 'easeOut' }}
              />
            ))}
          </motion.g>
        </AnimatePresence>
      </svg>

      {NODES.map((n, i) => {
        const order = active.get(i)
        const on = order !== undefined
        return (
          <div key={n.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: n.x, top: n.y }}>
            <motion.span
              key={`${k}-${i}`}
              className={cn('flex size-9 items-center justify-center rounded-full border bg-background shadow-sm transition-colors duration-500', on ? `${pattern.tone} border-current` : 'text-muted-foreground/60')}
              initial={{ scale: 1 }}
              animate={on ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, delay: on ? 0.2 + order * STEP + 0.35 : 0 }}
            >
              <n.Icon className="size-4" />
            </motion.span>
            <span className={cn('mt-1 text-[9px] transition-opacity duration-500', on ? 'opacity-100' : 'opacity-40')}>{n.label}</span>
          </div>
        )
      })}

      <div className="absolute bottom-2.5 right-3 h-4 overflow-hidden text-right">
        <AnimatePresence mode="wait">
          <motion.span key={k} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className={cn('block text-[10px] font-medium', pattern.tone)}>
            {pattern.name}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
