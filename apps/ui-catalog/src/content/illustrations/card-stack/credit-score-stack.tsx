'use client'

import { useEffect, useId, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

// "Credit Score Stack": consultas de score empilhadas, com as de trás espiando à direita. Na da frente o arco do
// medidor preenche, o ponteiro gira até a nota, o número conta junto e a faixa (Regular, Bom, Excelente…) aparece;
// depois o card desliza para fora pela esquerda e a próxima consulta assume.
interface Score {
  id: string
  who: string
  kind: string
  value: number
  delta: number
}

const SCORES: readonly Score[] = [
  { id: 'a', who: 'Ana Ribeiro', kind: 'Score pessoal', value: 812, delta: 24 },
  { id: 'b', who: 'Padaria Pão Dourado', kind: 'Score empresarial', value: 684, delta: 12 },
  { id: 'c', who: 'Lucas Ferreira', kind: 'Score pessoal', value: 455, delta: 31 },
  { id: 'd', who: 'Camila Duarte', kind: 'Score pessoal', value: 931, delta: 8 },
]

function band(v: number) {
  if (v < 300) return { label: 'Baixo', cls: 'bg-rose-500/15 text-rose-600 dark:text-rose-400' }
  if (v < 600) return { label: 'Regular', cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' }
  if (v < 800) return { label: 'Bom', cls: 'bg-sky-500/15 text-sky-600 dark:text-sky-400' }
  return { label: 'Excelente', cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' }
}

const ARC = 'M 20 88 A 70 70 0 0 1 160 88'

function ScoreCard({ s, front }: { s: Score; front: boolean }) {
  const gid = useId().replace(/:/g, '')
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => String(Math.round(v)))
  const frac = s.value / 1000
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!front) {
      mv.set(0)
      setShown(false)
      return
    }
    const c = animate(mv, s.value, { duration: 1.4, ease: 'easeOut', delay: 0.25 })
    const t = setTimeout(() => setShown(true), 1650)
    return () => {
      c.stop()
      clearTimeout(t)
    }
  }, [front, mv, s.value])

  const b = band(s.value)
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{s.kind}</p>
          <p className="truncate text-sm font-semibold">{s.who}</p>
        </div>
        <AnimatePresence>
          {shown && (
            <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', b.cls)}>
              {b.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <svg viewBox="0 0 180 100" className="mx-auto mt-2 w-[200px]" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgb(244 63 94)" />
            <stop offset="0.45" stopColor="rgb(245 158 11)" />
            <stop offset="0.75" stopColor="rgb(14 165 233)" />
            <stop offset="1" stopColor="rgb(16 185 129)" />
          </linearGradient>
        </defs>
        <path d={ARC} fill="none" stroke="var(--muted)" strokeWidth="12" strokeLinecap="round" />
        <motion.path
          d={ARC}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="12"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: front ? frac : 0 }}
          transition={{ duration: front ? 1.4 : 0.2, ease: 'easeOut', delay: front ? 0.25 : 0 }}
        />
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '90px 88px' }}
          initial={false}
          animate={{ rotate: front ? -90 + 180 * frac : -90 }}
          transition={front ? { type: 'spring', stiffness: 60, damping: 9, delay: 0.25 } : { duration: 0.2 }}
        >
          <line x1="90" y1="88" x2="90" y2="34" stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <circle cx="90" cy="88" r="7" fill="var(--foreground)" />
        <circle cx="90" cy="88" r="3" fill="var(--card)" />
        <text x="16" y="99" fontSize="8" fill="var(--muted-foreground)" fontFamily="inherit">0</text>
        <text x="152" y="99" fontSize="8" fill="var(--muted-foreground)" fontFamily="inherit">1000</text>
      </svg>
      <div className="mt-1 flex items-end justify-between">
        <motion.span className="text-3xl font-bold tabular-nums tracking-tight">{text}</motion.span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="size-3.5" />+{s.delta} no mês
        </span>
      </div>
    </div>
  )
}

export default function CreditScoreStack() {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead((h) => (h + 1) % SCORES.length), 3600)
    return () => clearInterval(t)
  }, [])
  const visible = [0, 1, 2].map((d) => SCORES[(head + d) % SCORES.length]!)

  return (
    <div className="relative h-[320px] w-[420px] text-foreground">
      <AnimatePresence initial={false}>
        {visible.map((s, depth) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: 3 * 22, scale: 0.85 }}
            animate={{ opacity: 1 - depth * 0.3, x: depth * 22, scale: 1 - depth * 0.06, zIndex: 10 - depth, rotate: 0, y: 0 }}
            exit={{ opacity: 0, x: -220, rotate: -12, y: 30, zIndex: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            className="absolute left-[70px] top-[34px] h-[250px] w-[260px] rounded-2xl border bg-card shadow-lg"
            style={{ transformOrigin: '100% 50%' }}
          >
            <ScoreCard s={s} front={depth === 0} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
