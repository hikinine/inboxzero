'use client'

import { MessageSquare, Timer, TrendingDown, TrendingUp, Users, Wallet } from 'lucide-react'

const STATS = [
  { Icon: Wallet, label: 'Receita recorrente', value: 'R$ 1,8 mi', delta: '+12,4%', good: true, dir: 'up', hint: 'vs. mês anterior' },
  { Icon: Users, label: 'Clientes ativos', value: '2.431', delta: '+8,1%', good: true, dir: 'up', hint: 'vs. mês anterior' },
  { Icon: MessageSquare, label: 'Conversas resolvidas', value: '18.902', delta: '−3,6%', good: false, dir: 'down', hint: 'vs. mês anterior' },
  { Icon: Timer, label: 'Tempo médio de resposta', value: '1 min 42 s', delta: '−21%', good: true, dir: 'down', hint: 'mais rápido que em setembro' },
] as const

export default function StatsEmCardsComIcones() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Resultados</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Números do último trimestre</h2>
          </div>
          <p className="text-sm text-muted-foreground">Atualizado hoje às 09:00</p>
        </div>
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ Icon, label, value, delta, good, dir, hint }) => {
            const Trend = dir === 'up' ? TrendingUp : TrendingDown
            return (
              <div key={label} className="rounded-xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-muted-foreground" />
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${good ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                    <Trend className="size-3" /> {delta}
                  </span>
                </div>
                <dd className="mt-6 text-3xl font-semibold tracking-tight tabular-nums">{value}</dd>
                <dt className="mt-1 text-sm font-medium">
                  {label}
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{hint}</span>
                </dt>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
