'use client'

import type { LucideIcon } from 'lucide-react'
import { CalendarCheck, FileText, Handshake, UserPlus } from 'lucide-react'

const STATS: { Icon: LucideIcon; value: string; label: string; delta: string; good: boolean }[] = [
  { Icon: UserPlus, value: '326', label: 'Leads novos', delta: '+14% esta semana', good: true },
  { Icon: CalendarCheck, value: '48', label: 'Reuniões agendadas', delta: '+6% esta semana', good: true },
  { Icon: FileText, value: '31', label: 'Propostas enviadas', delta: '-3% esta semana', good: false },
  { Icon: Handshake, value: 'R$ 184 mil', label: 'Negócios fechados', delta: '12 contratos', good: true },
]

export default function EstatisticasFaixaIcones() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 divide-y rounded-2xl border bg-card lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4 p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
                <s.Icon className="size-5 text-muted-foreground" />
              </span>
              <div className="min-w-0">
                <div className="text-2xl font-semibold tracking-tight tabular-nums">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className={`mt-0.5 text-xs font-medium ${s.good ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{s.delta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
