'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'

type Period = '7d' | '30d'
interface Metric {
  label: string
  current: number
  previous: number
  format: (n: number) => string
  lowerIsBetter?: boolean
}

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`
const int = (n: number) => n.toLocaleString('pt-BR')
const pct = (n: number) => `${n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`

const DATA: Record<Period, Metric[]> = {
  '30d': [
    { label: 'Pedidos', current: 1284, previous: 1102, format: int },
    { label: 'Receita', current: 312480, previous: 274900, format: brl },
    { label: 'Ticket médio', current: 243, previous: 249, format: brl },
    { label: 'Taxa de devolução', current: 2.4, previous: 3.1, format: pct, lowerIsBetter: true },
  ],
  '7d': [
    { label: 'Pedidos', current: 318, previous: 296, format: int },
    { label: 'Receita', current: 77210, previous: 70100, format: brl },
    { label: 'Ticket médio', current: 243, previous: 237, format: brl },
    { label: 'Taxa de devolução', current: 2.1, previous: 2.6, format: pct, lowerIsBetter: true },
  ],
}
const PERIOD_LABEL: Record<Period, { current: string; previous: string }> = {
  '30d': { current: 'Últimos 30 dias', previous: '30 dias anteriores' },
  '7d': { current: 'Últimos 7 dias', previous: '7 dias anteriores' },
}

export default function EstatisticasComparativoPeriodo() {
  const [period, setPeriod] = useState<Period>('30d')
  const labels = PERIOD_LABEL[period]
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Comparativo de período</h2>
            <p className="text-sm text-muted-foreground">
              {labels.current} vs. {labels.previous.toLowerCase()}
            </p>
          </div>
          <div className="inline-flex rounded-lg border bg-muted/40 p-0.5">
            {(['7d', '30d'] as Period[]).map((p) => (
              <button key={p} type="button" onClick={() => setPeriod(p)} className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${period === p ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {p === '7d' ? '7 dias' : '30 dias'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA[period].map((m) => {
            const change = ((m.current - m.previous) / m.previous) * 100
            const good = m.lowerIsBetter ? change < 0 : change > 0
            const maxVal = Math.max(m.current, m.previous)
            return (
              <Card key={m.label}>
                <CardHeader>
                  <CardDescription>{m.label}</CardDescription>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl font-semibold tabular-nums">{m.format(m.current)}</span>
                    <span className={`flex items-center gap-0.5 text-xs font-medium ${good ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {change >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                      {Math.abs(change).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2.5 text-xs">
                  <div>
                    <div className="mb-1 flex justify-between text-muted-foreground">
                      <span>Atual</span>
                      <span className="text-foreground tabular-nums">{m.format(m.current)}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(m.current / maxVal) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-muted-foreground">
                      <span>Anterior</span>
                      <span className="tabular-nums">{m.format(m.previous)}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-muted-foreground/40" style={{ width: `${(m.previous / maxVal) * 100}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
