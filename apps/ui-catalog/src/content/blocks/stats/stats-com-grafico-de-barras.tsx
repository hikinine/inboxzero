'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

type Year = '2025' | '2026'
const DATA: Record<Year, Array<{ v: number; proj?: boolean }>> = {
  '2025': [120, 135, 150, 142, 168, 180, 195, 210, 205, 230, 250, 275].map((v) => ({ v })),
  '2026': [...[290, 310, 335, 360, 352, 390, 420, 445, 470, 498].map((v) => ({ v })), { v: 520, proj: true }, { v: 545, proj: true }],
}

const HIGHLIGHTS = [
  { value: 'R$ 4,2 mi', label: 'receita acumulada em 2026' },
  { value: '+127%', label: 'crescimento sobre o mesmo período de 2025' },
  { value: '94%', label: 'retenção líquida de receita' },
]

export default function StatsComGraficoDeBarras() {
  const [year, setYear] = useState<Year>('2026')
  const series = DATA[year]
  const max = Math.max(...series.map((d) => d.v))
  const lastReal = series.reduce((acc, d, i) => (d.proj ? acc : i), 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Crescimento</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Previsível, mês após mês</h2>
          <p className="mt-3 text-muted-foreground">Sem pico de Black Friday segurando o ano: receita recorrente, retenção alta e expansão dentro da base.</p>
          <dl className="mt-8 divide-y">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex items-baseline gap-4 py-4">
                <dd className="w-32 shrink-0 text-3xl font-semibold tracking-tight tabular-nums">{h.value}</dd>
                <dt className="text-sm text-muted-foreground">{h.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Receita mensal</p>
              <p className="text-xs text-muted-foreground">em R$ mil</p>
            </div>
            <div className="inline-flex rounded-lg bg-muted p-0.5" role="tablist" aria-label="Ano">
              {(['2025', '2026'] as const).map((y) => (
                <button key={y} type="button" role="tab" aria-selected={year === y} onClick={() => setYear(y)} className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${year === y ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex h-56 items-end gap-1.5 sm:gap-2">
            {series.map((d, i) => (
              <div key={`${year}-${i}`} className="group relative flex h-full flex-1 flex-col justify-end">
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {d.proj ? 'proj. ' : ''}R$ {d.v} mil
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.v / max) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
                  className={`w-full rounded-t-md ${d.proj ? 'border border-dashed border-primary/50 bg-primary/10' : i === lastReal ? 'bg-primary' : 'bg-primary/35 transition-colors group-hover:bg-primary/60'}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-1.5 sm:gap-2">
            {MONTHS.map((m) => (
              <span key={m} className="flex-1 text-center text-[10px] text-muted-foreground">
                {m}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t pt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-primary" /> Mês atual
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-primary/35" /> Realizado
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm border border-dashed border-primary/50 bg-primary/10" /> Projeção
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
