'use client'

import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

// Data fixa para o preview ficar estável (o "hoje" do calendário também usa esta data).
const HOJE = new Date(2026, 9, 12)
const addDias = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

interface Preset {
  label: string
  range: () => DateRange
}

const PRESETS: Preset[] = [
  { label: 'Hoje', range: () => ({ from: HOJE, to: HOJE }) },
  { label: 'Ontem', range: () => ({ from: addDias(HOJE, -1), to: addDias(HOJE, -1) }) },
  { label: 'Próximos 7 dias', range: () => ({ from: HOJE, to: addDias(HOJE, 6) }) },
  { label: 'Últimos 30 dias', range: () => ({ from: addDias(HOJE, -29), to: HOJE }) },
  { label: 'Este mês', range: () => ({ from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) }) },
  { label: 'Próximo mês', range: () => ({ from: new Date(2026, 10, 1), to: new Date(2026, 10, 30) }) },
]

const fmt = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })

export default function CalendarComPresets() {
  const [ativo, setAtivo] = useState<string | null>('Próximos 7 dias')
  const [range, setRange] = useState<DateRange | undefined>(() => PRESETS[2]?.range())
  const [mes, setMes] = useState<Date>(HOJE)

  function aplicar(p: Preset) {
    const r = p.range()
    setRange(r)
    setAtivo(p.label)
    if (r.from) setMes(r.from)
  }

  return (
    <div className="w-full max-w-lg rounded-xl border bg-card">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-row flex-wrap gap-1 border-b p-2 sm:w-40 sm:flex-col sm:border-b-0 sm:border-r">
          {PRESETS.map((p) => (
            <Button key={p.label} variant={ativo === p.label ? 'secondary' : 'ghost'} size="sm" className="justify-start" onClick={() => aplicar(p)}>
              {p.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-1 justify-center p-2">
          <Calendar
            mode="range"
            selected={range}
            onSelect={(r) => {
              setRange(r)
              setAtivo(null)
            }}
            month={mes}
            onMonthChange={setMes}
            today={HOJE}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t px-3 py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          {range?.from ? (range.to ? `${fmt(range.from)} – ${fmt(range.to)}` : fmt(range.from)) : 'Nenhum período'}
        </div>
        <Button size="sm" disabled={!range?.from}>
          Aplicar
        </Button>
      </div>
    </div>
  )
}
