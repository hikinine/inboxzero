'use client'

import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Target, TrendingUp, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const GOALS: { Icon: LucideIcon; label: string; value: string; target: string; pct: number; delta: string; color: string; missing: string }[] = [
  { Icon: TrendingUp, label: 'Receita do mês', value: 'R$ 184 mil', target: 'de R$ 250 mil', pct: 74, delta: '+12% vs. set.', color: 'text-primary', missing: 'Faltam R$ 66 mil · 19 dias' },
  { Icon: Users, label: 'Novos clientes', value: '48', target: 'de 60', pct: 80, delta: '+9 esta semana', color: 'text-emerald-500', missing: 'Faltam 12 clientes' },
  { Icon: Target, label: 'NPS', value: '72', target: 'meta 80', pct: 90, delta: '+4 pontos', color: 'text-amber-500', missing: 'Faltam 8 pontos' },
]

function Ring({ pct, className }: { pct: number; className: string }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 120 120" className="size-36" role="img" aria-label={`${pct}% concluído`}>
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-muted" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 60 60)"
        className={`stroke-current transition-[stroke-dashoffset] duration-700 ${className}`}
      />
    </svg>
  )
}

export default function WidgetMetaAnel() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
        {GOALS.map((g) => (
          <Card key={g.label}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <g.Icon className="size-4" /> {g.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative">
                <Ring pct={g.pct} className={g.color} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-semibold tabular-nums">{g.pct}%</span>
                  <span className="text-xs text-muted-foreground">da meta</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold tabular-nums">{g.value}</div>
                <div className="text-sm text-muted-foreground">{g.target}</div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-xs text-muted-foreground">{g.missing}</span>
              <Badge variant="secondary" className="gap-1">
                <ArrowUpRight className="size-3" /> {g.delta}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
