'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const START = 8
const END = 19
const HOUR_PX = 48
const TODAY = 0
const NOW = 10.5

const DAYS = [
  { label: 'Seg', day: 12 },
  { label: 'Ter', day: 13 },
  { label: 'Qua', day: 14 },
  { label: 'Qui', day: 15 },
  { label: 'Sex', day: 16 },
  { label: 'Sáb', day: 17 },
  { label: 'Dom', day: 18 },
]

type Cor = 'sky' | 'emerald' | 'amber' | 'violet' | 'rose'

interface Evento {
  id: number
  day: number
  start: number
  end: number
  title: string
  where: string
  color: Cor
}

const EVENTOS: Evento[] = [
  { id: 1, day: 0, start: 9, end: 10, title: 'Daily do time', where: 'Meet', color: 'sky' },
  { id: 2, day: 0, start: 11, end: 12.5, title: 'Demo · Nuvem Fit', where: 'Meet', color: 'violet' },
  { id: 3, day: 1, start: 10, end: 11, title: '1:1 com Marina', where: 'Sala 2', color: 'emerald' },
  { id: 4, day: 1, start: 14, end: 15.5, title: 'Revisão de pipeline', where: 'Sala 1', color: 'amber' },
  { id: 5, day: 2, start: 9.5, end: 10.5, title: 'Onboarding · Tecnolar', where: 'Meet', color: 'violet' },
  { id: 6, day: 2, start: 16, end: 17, title: 'Planejamento Q4', where: 'Sala 3', color: 'sky' },
  { id: 7, day: 3, start: 12.5, end: 14, title: 'Almoço com cliente', where: 'Centro', color: 'rose' },
  { id: 8, day: 3, start: 15, end: 16.5, title: 'Treinamento WhatsApp API', where: 'Meet', color: 'emerald' },
  { id: 9, day: 4, start: 10, end: 11.5, title: 'Proposta · Loja Sul', where: 'Meet', color: 'amber' },
  { id: 10, day: 4, start: 17, end: 18, title: 'Retro da semana', where: 'Sala 1', color: 'sky' },
  { id: 11, day: 5, start: 10, end: 11, title: 'Plantão de suporte', where: 'Remoto', color: 'rose' },
]

const CORES: Record<Cor, string> = {
  sky: 'border-sky-500 bg-sky-500/15 text-sky-900 dark:text-sky-100',
  emerald: 'border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-100',
  amber: 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-100',
  violet: 'border-violet-500 bg-violet-500/15 text-violet-900 dark:text-violet-100',
  rose: 'border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-100',
}

const VIEWS = ['Dia', 'Semana', 'Mês'] as const

function fmt(h: number) {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export default function AgendaSemanal() {
  const [view, setView] = useState<(typeof VIEWS)[number]>('Semana')
  const hours = Array.from({ length: END - START }, (_, i) => START + i)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Outubro 2026</h2>
              <p className="text-sm text-muted-foreground">12 a 18 de outubro · 11 compromissos</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-lg border">
              <Button variant="ghost" size="icon-sm" aria-label="Semana anterior">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="sm" className="px-3">
                Hoje
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Próxima semana">
                <ChevronRight />
              </Button>
            </div>
            <div className="flex items-center rounded-lg bg-muted p-0.5">
              {VIEWS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={cn('rounded-md px-3 py-1 text-sm transition-colors', view === v ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}
                >
                  {v}
                </button>
              ))}
            </div>
            <Button>
              <Plus data-icon="inline-start" /> Novo evento
            </Button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b">
              <div />
              {DAYS.map((d, i) => (
                <div key={d.label} className="flex flex-col items-center gap-1 border-l py-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{d.label}</span>
                  <span className={cn('flex size-7 items-center justify-center rounded-full text-sm font-medium tabular-nums', i === TODAY && 'bg-primary text-primary-foreground')}>{d.day}</span>
                </div>
              ))}
            </div>

            <div className="relative grid grid-cols-[56px_repeat(7,1fr)]">
              <div>
                {hours.map((h) => (
                  <div key={h} className="relative text-right text-[11px] text-muted-foreground tabular-nums" style={{ height: HOUR_PX }}>
                    <span className="absolute -top-2 right-2">{fmt(h)}</span>
                  </div>
                ))}
              </div>

              {DAYS.map((d, dayIndex) => (
                <div key={d.label} className={cn('relative border-l', dayIndex === TODAY && 'bg-primary/[0.03]')} style={{ height: (END - START) * HOUR_PX }}>
                  {hours.map((h) => (
                    <div key={h} className="border-t border-border/60" style={{ height: HOUR_PX }} />
                  ))}
                  {EVENTOS.filter((e) => e.day === dayIndex).map((e) => (
                    <div
                      key={e.id}
                      className={cn('absolute inset-x-1 overflow-hidden rounded-md border-l-2 px-1.5 py-1 text-xs leading-tight', CORES[e.color])}
                      style={{ top: (e.start - START) * HOUR_PX + 2, height: (e.end - e.start) * HOUR_PX - 4 }}
                    >
                      <div className="truncate font-medium">{e.title}</div>
                      <div className="truncate opacity-80">
                        {fmt(e.start)} – {fmt(e.end)} · {e.where}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="pointer-events-none absolute right-0 left-14 flex items-center" style={{ top: (NOW - START) * HOUR_PX }}>
                <span className="-ml-1 size-2 rounded-full bg-rose-500" />
                <span className="h-px flex-1 bg-rose-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
