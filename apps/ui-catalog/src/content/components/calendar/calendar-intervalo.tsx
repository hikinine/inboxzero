'use client'

import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const fmt = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })

export default function CalendarIntervalo() {
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 9, 14), to: new Date(2026, 9, 21) })
  const dias = range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) + 1 : 0

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Período do relatório</CardTitle>
        <CardDescription>
          {range?.from
            ? range.to
              ? `${fmt(range.from)} – ${fmt(range.to)} · ${dias} ${dias === 1 ? 'dia' : 'dias'}`
              : `A partir de ${fmt(range.from)} — escolha o fim`
            : 'Clique no primeiro e no último dia'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 9, 1)} numberOfMonths={2} className="rounded-lg border" />
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" onClick={() => setRange(undefined)}>
          Limpar
        </Button>
        <Button disabled={!range?.from || !range.to}>Aplicar período</Button>
      </CardFooter>
    </Card>
  )
}
