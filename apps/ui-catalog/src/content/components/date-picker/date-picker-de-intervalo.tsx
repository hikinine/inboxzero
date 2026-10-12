'use client'

import { useState, type ReactNode } from 'react'
import type { DateRange } from 'react-day-picker'
import { differenceInCalendarDays, endOfMonth, startOfMonth, subDays, subMonths } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const PT_BR = {
  formatCaption: (d: Date) => cap(d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })),
  formatWeekdayName: (d: Date) => d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').slice(0, 3),
}

const HOJE = new Date(2026, 9, 14)
const PRESETS: { label: string; range: DateRange }[] = [
  { label: 'Últimos 7 dias', range: { from: subDays(HOJE, 6), to: HOJE } },
  { label: 'Últimos 30 dias', range: { from: subDays(HOJE, 29), to: HOJE } },
  { label: 'Este mês', range: { from: startOfMonth(HOJE), to: endOfMonth(HOJE) } },
  { label: 'Mês passado', range: { from: startOfMonth(subMonths(HOJE, 1)), to: endOfMonth(subMonths(HOJE, 1)) } },
]

const curta = (d: Date) => d.toLocaleDateString('pt-BR')
function rotulo(r: DateRange | undefined) {
  if (!r?.from) return 'Selecione um período'
  if (!r.to) return curta(r.from)
  return `${curta(r.from)} – ${curta(r.to)}`
}
function dias(r: DateRange | undefined) {
  return r?.from && r.to ? differenceInCalendarDays(r.to, r.from) + 1 : 0
}

export default function DatePickerDeIntervalo() {
  const [periodo, setPeriodo] = useState<DateRange | undefined>({ from: new Date(2026, 9, 1), to: HOJE })
  const [inline, setInline] = useState<DateRange | undefined>({ from: new Date(2026, 9, 6), to: new Date(2026, 10, 3) })
  const presetAtivo = PRESETS.find((p) => p.range.from?.getTime() === periodo?.from?.getTime() && p.range.to?.getTime() === periodo?.to?.getTime())?.label

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Demo title="Botão com período e presets">
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" className="w-72 justify-start font-normal" />}>
              <CalendarIcon data-icon="inline-start" className="text-muted-foreground" />
              {rotulo(periodo)}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col gap-0.5 border-b p-2 sm:border-r sm:border-b-0">
                  {PRESETS.map((p) => (
                    <Button key={p.label} size="sm" variant={presetAtivo === p.label ? 'secondary' : 'ghost'} className="justify-start font-normal" onClick={() => setPeriodo(p.range)}>
                      {p.label}
                    </Button>
                  ))}
                </div>
                <Calendar mode="range" selected={periodo} onSelect={(r) => setPeriodo(r)} numberOfMonths={2} defaultMonth={periodo?.from} formatters={PT_BR} />
              </div>
            </PopoverContent>
          </Popover>
          <span className={cn('text-sm text-muted-foreground', dias(periodo) === 0 && 'hidden')}>{dias(periodo)} dias selecionados</span>
        </div>
      </Demo>

      <Demo title="Inline com dois meses">
        <div className="inline-block max-w-full overflow-hidden rounded-xl border bg-card">
          <Calendar mode="range" selected={inline} onSelect={(r) => setInline(r)} numberOfMonths={2} defaultMonth={inline?.from} formatters={PT_BR} />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-3 py-2 text-xs">
            <span className="text-muted-foreground">
              {rotulo(inline)}
              {dias(inline) > 0 ? ` · ${dias(inline)} dias` : ''}
            </span>
            <div className="flex gap-2">
              <Button size="xs" variant="ghost" onClick={() => setInline(undefined)}>
                Limpar
              </Button>
              <Button size="xs" disabled={dias(inline) === 0}>
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </Demo>
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
