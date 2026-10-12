'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { TrendingUp } from 'lucide-react'

// "Number Count Up": três métricas grandes contam do zero até o valor (R$, %, x), seguram e recomeçam em loop,
// com barra de progresso sincronizada embaixo de cada uma.
const STATS = [
  { label: 'Receita no mês', value: 48900, delta: '+12%', format: (v: number) => `R$ ${Math.round(v).toLocaleString('pt-BR')}` },
  { label: 'Taxa de conversão', value: 7.4, delta: '+0,8 pp', format: (v: number) => `${v.toFixed(1).replace('.', ',')}%` },
  { label: 'Retorno em anúncios', value: 4.6, delta: '+1,1x', format: (v: number) => `${v.toFixed(1).replace('.', ',')}x` },
]
const DURATION = 5.2
const TIMES = [0, 0.4, 0.82, 1]

function Stat({ label, value, delta, format }: (typeof STATS)[number]) {
  const mv = useMotionValue(0)
  useEffect(() => {
    const controls = animate(mv, [0, value, value, 0], { duration: DURATION, times: TIMES, repeat: Infinity, ease: ['easeOut', 'linear', 'easeIn'] })
    return () => controls.stop()
  }, [mv, value])
  const text = useTransform(mv, format)
  const width = useTransform(mv, [0, value], ['0%', '100%'])
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <motion.div className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">{text}</motion.div>
      <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-emerald-500">
        <TrendingUp className="size-3" />
        {delta}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full rounded-full bg-primary" style={{ width }} />
      </div>
    </div>
  )
}

export default function NumberCountUp() {
  return (
    <div className="grid w-[560px] grid-cols-3 gap-3 text-foreground">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  )
}
