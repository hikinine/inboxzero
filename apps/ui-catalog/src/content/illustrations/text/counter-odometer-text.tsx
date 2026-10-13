'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Counter Odometer Text": hodômetro mecânico de faturamento. Cada dígito é uma fita 0–9 que rola na vertical com mola
// até o algarismo novo (as casas da direita giram mais, como num hodômetro real); separadores ficam fixos. A cada
// 2,4s entra uma venda, o valor sobe e o selo "+R$" troca. Depois de alguns passos volta ao início.
const STEPS = [1284930, 1291450, 1298120, 1309870, 1312240, 1326980, 1335410]
const DIGIT_H = 52

function Digit({ d, place }: { d: number; place: number }) {
  return (
    <span className="relative inline-block h-[52px] w-[30px] overflow-hidden">
      <motion.span className="absolute inset-x-0 top-0 flex flex-col" animate={{ y: -d * DIGIT_H }} transition={{ type: 'spring', stiffness: 90 - place * 6, damping: 16, mass: 1 + place * 0.08 }}>
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="flex h-[52px] items-center justify-center">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export default function CounterOdometerText() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % STEPS.length), 2400)
    return () => clearInterval(id)
  }, [])

  const value = STEPS[i]
  const gain = i === 0 ? 0 : value - STEPS[i - 1]
  const chars = value.toLocaleString('pt-BR').split('')
  let digitsFromRight = chars.filter((c) => /\d/.test(c)).length

  return (
    <div className="flex w-[440px] flex-col items-center text-foreground">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Faturamento hoje</div>

      <div className="relative mt-3 flex items-center rounded-2xl border bg-card px-5 py-2 text-[44px] font-semibold tabular-nums tracking-tight shadow-sm">
        <span className="mr-2 text-2xl text-muted-foreground">R$</span>
        {chars.map((c, k) => {
          if (!/\d/.test(c))
            return (
              <span key={`s-${k}`} className="w-3 text-center text-muted-foreground">
                {c}
              </span>
            )
          digitsFromRight -= 1
          return <Digit key={`d-${k}`} d={Number(c)} place={digitsFromRight} />
        })}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-5 rounded-t-2xl bg-gradient-to-b from-card to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-5 rounded-b-2xl bg-gradient-to-t from-card to-transparent" />
      </div>

      <div className="mt-3 h-6">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
          >
            <TrendingUp className="size-3" />
            {gain > 0 ? `+${gain.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })} na última venda` : 'Abertura do dia · 08:00'}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
