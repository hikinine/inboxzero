'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Toggle Switches Dance": grade 7×5 de interruptores que "dançam" em coreografias — onda diagonal, ondulação a partir
// do centro, xadrez piscando e cortina por linhas. Cada padrão é uma função (linha, coluna, tempo) → ligado; o pino
// desliza com mola e a cor do trilho segue o padrão da vez. Troca de coreografia a cada ~4s.
const ROWS = 5
const COLS = 7
const TICK = 130

const PATTERNS: ReadonlyArray<{ name: string; on: string; fn: (r: number, c: number, t: number) => boolean }> = [
  { name: 'Onda diagonal', on: 'bg-sky-500', fn: (r, c, t) => (r + c + t) % 10 < 5 },
  { name: 'Ondulação', on: 'bg-violet-500', fn: (r, c, t) => (((Math.round(Math.hypot(r - 2, (c - 3) * 0.8) * 1.6) - t) % 6) + 6) % 6 < 2 },
  { name: 'Xadrez', on: 'bg-emerald-500', fn: (r, c, t) => (r + c + Math.floor(t / 4)) % 2 === 0 },
  { name: 'Cortina', on: 'bg-amber-500', fn: (r, c, t) => { const k = t % 16; return k < 8 ? c <= k - 1 - Math.abs(r - 2) * 0.5 : c > k - 9 + Math.abs(r - 2) * 0.5 } },
]
const PER_PATTERN = 30 // ticks

export default function ToggleSwitchesDance() {
  const [t, setT] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), TICK)
    return () => clearInterval(id)
  }, [])

  const k = Math.floor(t / PER_PATTERN) % PATTERNS.length
  const p = PATTERNS[k]
  let onCount = 0

  return (
    <div className="w-[400px] rounded-2xl border bg-card p-5 text-foreground shadow-sm">
      <div className="grid gap-x-3 gap-y-3.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const r = Math.floor(i / COLS)
          const c = i % COLS
          const on = p.fn(r, c, t)
          if (on) onCount += 1
          return (
            <span key={i} role="switch" aria-checked={on} aria-label={`Interruptor ${i + 1}`} className={cn('flex h-6 w-10 items-center rounded-full p-0.5 transition-colors duration-200', on ? `${p.on} justify-end` : 'justify-start bg-muted')}>
              <motion.span layout transition={{ type: 'spring', stiffness: 600, damping: 32 }} className="size-5 rounded-full bg-background shadow-sm" />
            </span>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px]">
        <div className="h-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span key={k} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="block font-medium">
              {p.name}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="tabular-nums text-muted-foreground">
          {onCount}/{ROWS * COLS} ligados
        </span>
      </div>
    </div>
  )
}
