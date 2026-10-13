'use client'

import { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Calendar Fill Events": agenda semanal se enchendo sozinha. Os eventos caem nos horários um a um com mola, a
// barra de ocupação e as horas agendadas sobem e, com a semana cheia, tudo esvazia em cascata e recomeça.
const DAYS = ['Seg 14', 'Ter 15', 'Qua 16', 'Qui 17', 'Sex 18'] as const
const START = 8
const END = 18
const ROW = 22

const EVENTS = [
  { d: 0, s: 9, e: 10, t: 'Reunião de time', c: 'violet' },
  { d: 2, s: 9, e: 11, t: 'Treinamento CRM', c: 'rose' },
  { d: 1, s: 10, e: 11.5, t: 'Revisão de campanha', c: 'amber' },
  { d: 3, s: 11, e: 12, t: 'Demo Padaria Doce', c: 'violet' },
  { d: 1, s: 12, e: 13.5, t: 'Almoço fornecedor', c: 'emerald' },
  { d: 0, s: 14, e: 15, t: 'Call com cliente', c: 'sky' },
  { d: 3, s: 14, e: 16.5, t: 'Planejamento Q4', c: 'amber' },
  { d: 4, s: 9, e: 10.5, t: 'Fechamento do mês', c: 'emerald' },
  { d: 2, s: 15, e: 16, t: 'Entrevista', c: 'sky' },
  { d: 4, s: 16, e: 17.5, t: 'Happy hour', c: 'rose' },
] as const
type Color = (typeof EVENTS)[number]['c']
const CLS: Record<Color, string> = {
  violet: 'border-violet-500 bg-violet-500/15 text-violet-700 dark:text-violet-300',
  rose: 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300',
  amber: 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300',
  emerald: 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  sky: 'border-sky-500 bg-sky-500/15 text-sky-700 dark:text-sky-300',
}
const GOAL = 20 // meta de horas agendadas na semana
const fmtH = (h: number) => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`

export default function CalendarFillEvents() {
  const [n, setN] = useState(0)
  const LAST = EVENTS.length + 6
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= LAST ? 0 : v + 1)), 480)
    return () => clearInterval(id)
  }, [LAST])
  const shown = n > EVENTS.length + 4 ? 0 : Math.min(n, EVENTS.length)
  const hours = EVENTS.slice(0, shown).reduce((a, ev) => a + (ev.e - ev.s), 0)

  return (
    <div className="w-[460px] rounded-2xl border bg-card p-4 text-foreground shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />
          <p className="text-sm font-semibold">14 – 18 de outubro</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="tabular-nums">{hours.toLocaleString('pt-BR')} de {GOAL} h</span>
          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
            <motion.span className="block h-full rounded-full bg-primary" animate={{ width: `${Math.min(hours / GOAL, 1) * 100}%` }} transition={{ type: 'spring', stiffness: 140, damping: 20 }} />
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-9 shrink-0 pt-5">
          {Array.from({ length: END - START }, (_, i) => (
            <div key={i} className="text-[9px] text-muted-foreground" style={{ height: ROW }}>
              {START + i}h
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-5 gap-1">
          {DAYS.map((d, di) => (
            <div key={d}>
              <p className="h-5 text-center text-[10px] font-medium text-muted-foreground">{d}</p>
              <div className="relative rounded-md border bg-muted/30" style={{ height: ROW * (END - START) }}>
                {Array.from({ length: END - START - 1 }, (_, i) => (
                  <span key={i} className="absolute inset-x-0 border-t border-dashed border-border/70" style={{ top: ROW * (i + 1) }} />
                ))}
                <AnimatePresence>
                  {EVENTS.slice(0, shown).map((ev, k) =>
                    ev.d === di ? (
                      <motion.div
                        key={ev.t}
                        className={cn('absolute inset-x-0.5 overflow-hidden rounded-md border-l-2 px-1 py-0.5', CLS[ev.c])}
                        style={{ top: (ev.s - START) * ROW + 1, height: (ev.e - ev.s) * ROW - 2 }}
                        initial={{ opacity: 0, y: -16, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { delay: k * 0.04, duration: 0.25 } }}
                        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                      >
                        <p className="truncate text-[9px] font-semibold leading-tight">{ev.t}</p>
                        <p className="text-[8px] opacity-80">
                          {fmtH(ev.s)}–{fmtH(ev.e)}
                        </p>
                      </motion.div>
                    ) : null,
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
