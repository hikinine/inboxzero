'use client'

import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const STATS = [
  { label: 'MRR', value: 'R$ 128.400', delta: '+9,2%', up: true, good: true, points: [42, 45, 44, 48, 52, 51, 56, 60, 58, 64, 68, 72] },
  { label: 'Usuários ativos', value: '4.812', delta: '+3,8%', up: true, good: true, points: [30, 32, 31, 35, 34, 38, 37, 40, 43, 42, 46, 48] },
  { label: 'Churn mensal', value: '1,9%', delta: '-0,3 pp', up: false, good: true, points: [40, 38, 39, 36, 35, 33, 34, 31, 30, 28, 27, 26] },
  { label: 'Tickets abertos', value: '134', delta: '+18%', up: true, good: false, points: [20, 22, 21, 25, 24, 28, 30, 29, 33, 36, 38, 41] },
]

function Sparkline({ points, good }: { points: number[]; good: boolean }) {
  const w = 100
  const h = 36
  const max = Math.max(...points)
  const min = Math.min(...points)
  const span = max - min || 1
  const coords = points.map((p, i) => [((i / (points.length - 1)) * w).toFixed(1), (h - 2 - ((p - min) / span) * (h - 4)).toFixed(1)] as const)
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`h-10 w-full ${good ? 'text-emerald-500' : 'text-rose-500'}`} aria-hidden="true">
      <polygon points={`0,${h} ${line} ${w},${h}`} fill="currentColor" opacity="0.12" />
      <polyline points={line} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function EstatisticasSparklines() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Resumo do mês</h2>
            <p className="text-sm text-muted-foreground">Outubro de 2026 · comparado a setembro</p>
          </div>
          <span className="text-xs text-muted-foreground">Atualizado há 5 min</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.label}>
              <CardHeader>
                <CardDescription>{s.label}</CardDescription>
                <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="secondary" className={`gap-1 ${s.good ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {s.delta}
                </Badge>
                <Sparkline points={s.points} good={s.good} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
