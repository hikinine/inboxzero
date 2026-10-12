'use client'

import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Box, Cloud, Code, Cpu, Database, GitBranch, Server, Terminal } from 'lucide-react'

// "Tech Logos Orbit": chips quadrados com ícones de tecnologia em dois anéis — interno horário, externo
// anti-horário — cada um com um rastro de cometa no anel. Rótulos ficam em pé (contra-rotação) e o núcleo é o
// símbolo de código.
const INNER: ReadonlyArray<{ label: string; Icon: LucideIcon }> = [
  { label: 'Banco', Icon: Database },
  { label: 'Nuvem', Icon: Cloud },
  { label: 'CPU', Icon: Cpu },
]
const OUTER: ReadonlyArray<{ label: string; Icon: LucideIcon }> = [
  { label: 'Docker', Icon: Box },
  { label: 'Git', Icon: GitBranch },
  { label: 'Terminal', Icon: Terminal },
  { label: 'Servidor', Icon: Server },
]

function arc(r: number, a0: number, a1: number) {
  const s = (a0 * Math.PI) / 180
  const e = (a1 * Math.PI) / 180
  return `M ${r + r * Math.cos(s)} ${r + r * Math.sin(s)} A ${r} ${r} 0 0 1 ${r + r * Math.cos(e)} ${r + r * Math.sin(e)}`
}

function Ring({ items, radius, duration, reverse = false, dotted = false }: { items: typeof INNER; radius: number; duration: number; reverse?: boolean; dotted?: boolean }) {
  const spin = reverse ? -360 : 360
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: spin }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <circle cx={radius} cy={radius} r={radius} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray={dotted ? '1.5 7' : undefined} strokeLinecap="round" />
        {items.map((it, i) => {
          const a = (i / items.length) * 360
          // rastro atrás do chip, no sentido contrário ao movimento
          return <path key={it.label} d={reverse ? arc(radius, a + 8, a + 46) : arc(radius, a - 46, a - 8)} fill="none" stroke="var(--primary)" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
        })}
      </svg>
      {items.map((it, i) => {
        const a = (i / items.length) * Math.PI * 2
        return (
          <motion.div
            key={it.label}
            className="absolute left-1/2 top-1/2 flex w-11 flex-col items-center"
            style={{ x: Math.cos(a) * radius - 22, y: Math.sin(a) * radius - 22, transformOrigin: '22px 22px' }}
            animate={{ rotate: -spin }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <span className="flex size-11 items-center justify-center rounded-xl border bg-card shadow-sm">
              <it.Icon className="size-5" />
            </span>
            <span className="mt-1 text-[10px] font-medium text-muted-foreground">{it.label}</span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function TechLogosOrbit() {
  return (
    <div className="relative size-[360px] text-foreground">
      <Ring items={INNER} radius={74} duration={16} />
      <Ring items={OUTER} radius={140} duration={34} reverse dotted />
      <motion.div
        className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-primary/15"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <Code className="size-7" />
      </div>
    </div>
  )
}
