'use client'

import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Chart Bars Grow": gráfico de barras que cresce em cascata a partir do zero; em seguida a linha de tendência se
// desenha passando pelo topo das barras e o selo "Recorde" salta sobre a maior. Depois as barras se reacomodam para
// o ano seguinte (mola), a linha redesenha e, no fim, tudo recolhe para recomeçar.
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul']
const DATA: Record<string, number[]> = {
  '2025': [42, 58, 51, 66, 61, 74, 69],
  '2026': [55, 63, 78, 72, 91, 86, 104],
}
const YEARS = Object.keys(DATA)
const CW = 392
const CH = 170
const MAX = 110
const col = CW / MONTHS.length

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function ChartBarsGrow() {
  const [year, setYear] = useState<string | null>(null)
  const [line, setLine] = useState(false)
  const [badge, setBadge] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      while (!cancelled) {
        for (const y of YEARS) {
          if (cancelled) return
          setLine(false)
          setBadge(false)
          setYear(y)
          await sleep(1300)
          setLine(true)
          await sleep(800)
          setBadge(true)
          await sleep(1800)
        }
        setLine(false)
        setBadge(false)
        setYear(null)
        await sleep(900)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const values = year ? DATA[year] : MONTHS.map(() => 0)
  const best = values.indexOf(Math.max(...values))
  const total = values.reduce((a, b) => a + b, 0)
  const pts = values.map((v, i) => `${(i + 0.5) * col},${CH - (v / MAX) * CH}`).join(' ')

  return (
    <div className="w-[440px] rounded-2xl border bg-card p-5 text-foreground shadow-sm">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[11px] text-muted-foreground">Receita mensal (R$ mil)</div>
          <div className="text-2xl font-semibold tabular-nums tracking-tight">R$ {total.toLocaleString('pt-BR')} mil</div>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-0.5 text-[11px]">
          {YEARS.map((y) => (
            <span key={y} className={cn('rounded-md px-2 py-0.5 transition-colors', year === y ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground')}>
              {y}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-5" style={{ height: CH, width: CW }}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-dashed border-border/70" style={{ top: CH - f * CH }} />
        ))}

        {values.map((v, i) => (
          <div key={MONTHS[i]} className="absolute bottom-0 flex flex-col items-center justify-end" style={{ left: i * col, width: col, height: CH }}>
            <AnimatePresence>
              {badge && i === best && (
                <motion.span
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute z-10 flex items-center gap-0.5 whitespace-nowrap rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-semibold text-white shadow"
                  style={{ bottom: (v / MAX) * CH + 20 }}
                >
                  <Trophy className="size-2.5" /> Recorde
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span className="mb-1 text-[10px] font-medium tabular-nums" animate={{ opacity: v ? 1 : 0 }} transition={{ delay: v ? 0.5 + i * 0.08 : 0 }}>
              {v}
            </motion.span>
            <motion.div
              className={cn('w-[60%] origin-bottom rounded-t-md', i === best && badge ? 'bg-amber-500' : 'bg-primary/80')}
              initial={{ height: 0 }}
              animate={{ height: (v / MAX) * CH }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.08 }}
            />
          </div>
        ))}

        <svg viewBox={`0 0 ${CW} ${CH}`} className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
          <AnimatePresence>
            {line && (
              <motion.polyline
                key={year}
                points={pts}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="text-sky-500"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div className="mt-1.5 flex" style={{ width: CW }}>
        {MONTHS.map((m) => (
          <span key={m} className="text-center text-[10px] text-muted-foreground" style={{ width: col }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
