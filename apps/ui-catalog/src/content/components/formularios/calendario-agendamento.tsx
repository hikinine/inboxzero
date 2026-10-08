'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const SLOTS = ['09:00', '09:30', '10:00', '11:00', '14:00', '14:30', '15:00', '16:30']

export default function CalendarioAgendamento() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 14))
  const [slot, setSlot] = useState<string | null>('10:00')
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Agendar demonstração</CardTitle>
        <CardDescription>30 minutos · Google Meet · horário de Brasília</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-[auto_1fr]">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border" />
        <div>
          <div className="mb-2 text-sm font-medium">{date ? date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }) : 'Escolha um dia'}</div>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((s) => (
              <Button key={s} size="sm" variant={slot === s ? 'default' : 'outline'} onClick={() => setSlot(s)}>
                {s}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="ghost">Cancelar</Button>
        <Button disabled={!date || !slot}>Confirmar {slot ?? ''}</Button>
      </CardFooter>
    </Card>
  )
}
