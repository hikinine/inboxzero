'use client'

import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Exchange Rate Text": painel de câmbio em reais. A cada atualização uma moeda muda de cotação e SÓ os dígitos que
// mudaram rolam (para cima se subiu, para baixo se caiu) e ganham verde ou vermelho; a seta de tendência vira, a
// variação do dia é recalculada e a minilinha da moeda ganha um ponto novo.
const CURRENCIES = [
  { code: 'USD', name: 'Dólar americano', flag: 'US', base: 5.4231, step: 0.012 },
  { code: 'EUR', name: 'Euro', flag: 'EU', base: 5.8917, step: 0.014 },
  { code: 'GBP', name: 'Libra esterlina', flag: 'GB', base: 6.884, step: 0.018 },
] as const
const POINTS = 18

const rnd = (n: number) => {
  const x = Math.sin(n * 91.345 + 3.7) * 10000
  return x - Math.floor(x)
}
const fmt = (v: number) => v.toFixed(4).replace('.', ',')

function initial() {
  return CURRENCIES.map((c, ci) => {
    const arr: number[] = [c.base]
    for (let k = 1; k < POINTS; k++) arr.push(arr[k - 1]! + (rnd(k * 7 + ci * 31) - 0.5) * c.step)
    return arr
  })
}

function Digit({ ch, dir, hot }: { ch: string; dir: 1 | -1; hot: boolean }) {
  return (
    <span className="relative inline-flex h-[1.25em] justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ch}
          className={cn('inline-block transition-colors duration-700', hot ? (dir > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400') : '')}
          initial={{ y: dir > 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: dir > 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          {ch}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 70},${22 - ((v - min) / (max - min || 1)) * 20}`).join(' ')
  return (
    <svg viewBox="0 0 70 24" className={cn('h-6 w-[70px]', up ? 'text-emerald-500' : 'text-rose-500')} aria-hidden>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export default function ExchangeRateText() {
  const [hist, setHist] = useState<number[][]>(initial)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (tick === 0) return
    const row = (tick - 1) % CURRENCIES.length
    setHist((h) =>
      h.map((arr, i) => {
        if (i !== row) return arr
        const last = arr[arr.length - 1]!
        // puxa de volta para a base para não derivar no loop infinito
        const drift = (CURRENCIES[i]!.base - last) * 0.25
        const next = last + drift + (rnd(tick * 13 + i) - 0.5) * CURRENCIES[i]!.step * 2
        return [...arr.slice(1), next]
      }),
    )
  }, [tick])

  const hotRow = tick === 0 ? -1 : (tick - 1) % CURRENCIES.length

  return (
    <div className="w-[440px] rounded-2xl border bg-card p-4 text-foreground shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Câmbio comercial</p>
          <p className="text-[11px] text-muted-foreground">Cotação em reais · ao vivo</p>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <motion.span className="size-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          atualizando
        </span>
      </div>
      <div className="divide-y">
        {CURRENCIES.map((c, i) => {
          const arr = hist[i]!
          const cur = arr[arr.length - 1]!
          const prev = arr[arr.length - 2]!
          const open = arr[0]!
          const dir: 1 | -1 = cur >= prev ? 1 : -1
          const dayUp = cur >= open
          const pct = ((cur - open) / open) * 100
          const curS = fmt(cur)
          const prevS = fmt(prev)
          const hot = i === hotRow
          return (
            <div key={c.code} className="flex items-center gap-3 py-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">{c.flag}</span>
              <div className="w-[92px] min-w-0">
                <p className="text-sm font-semibold">{c.code}</p>
                <p className="truncate text-[10px] text-muted-foreground">{c.name}</p>
              </div>
              <Spark data={arr} up={dayUp} />
              <div className="ml-auto text-right">
                <p className="flex items-baseline justify-end font-mono text-lg font-semibold tabular-nums">
                  <span className="mr-1 text-xs text-muted-foreground">R$</span>
                  {curS.split('').map((ch, k) =>
                    ch === ',' ? (
                      <span key={k}>,</span>
                    ) : (
                      <Digit key={k} ch={ch} dir={dir} hot={hot && prevS[k] !== ch} />
                    ),
                  )}
                </p>
                <p className={cn('flex items-center justify-end gap-0.5 text-[11px] font-medium tabular-nums', dayUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                  {dayUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {pct >= 0 ? '+' : ''}
                  {pct.toFixed(2).replace('.', ',')}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
