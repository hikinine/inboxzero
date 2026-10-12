'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  valor: string
  delta: string
  sobe: boolean
  bom: boolean
  barras: number[]
}

const STATS: Stat[] = [
  { label: 'Receita', valor: 'R$ 184.320', delta: '+12,4%', sobe: true, bom: true, barras: [42, 51, 47, 58, 63, 55, 71, 68, 74, 69, 80, 92] },
  { label: 'Pedidos', valor: '2.318', delta: '+8,1%', sobe: true, bom: true, barras: [30, 34, 28, 40, 44, 38, 50, 46, 52, 49, 60, 66] },
  { label: 'Cancelamentos', valor: '41', delta: '+3,2%', sobe: true, bom: false, barras: [8, 10, 7, 12, 9, 14, 11, 16, 13, 18, 15, 20] },
  { label: 'Tempo médio de entrega', valor: '2,8 dias', delta: '-0,4 dia', sobe: false, bom: true, barras: [60, 58, 62, 55, 52, 54, 48, 50, 45, 44, 40, 38] },
]

const SEMANAS = Array.from({ length: 12 }, (_, i) => `semana ${i + 1}`)

export default function EstatisticasGradeMiniBarras() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Operação</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Últimas 12 semanas</h2>
          </div>
          <p className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-1.5 rounded-sm bg-muted-foreground/25" /> semanas anteriores
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-1.5 rounded-sm bg-primary" /> semana atual
            </span>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => {
            const max = Math.max(...s.barras)
            const min = Math.min(...s.barras)
            return (
              <div key={s.label} className="rounded-xl border bg-card p-5">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">{s.valor}</p>
                  <span className={cn('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium', s.bom ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300')}>
                    {s.sobe ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {s.delta}
                  </span>
                </div>
                <div className="mt-4 flex h-14 items-end gap-1" role="img" aria-label={`${s.label} nas últimas 12 semanas`}>
                  {s.barras.map((b, i) => {
                    const ultima = i === s.barras.length - 1
                    return <div key={i} className={cn('flex-1 rounded-sm transition-colors', ultima ? (s.bom ? 'bg-primary' : 'bg-rose-500') : 'bg-muted-foreground/25 hover:bg-muted-foreground/50')} style={{ height: `${Math.max(8, (b / max) * 100)}%` }} title={`${SEMANAS[i]}: ${b}`} />
                  })}
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-muted-foreground tabular-nums">
                  <span>mín. {min}</span>
                  <span>máx. {max}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
