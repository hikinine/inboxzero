'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const WEEKDAY_LONG = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const TODAY = 12
const DAYS_IN_MONTH = 31
const FIRST_WEEKDAY = 4 // outubro de 2026 começa numa quinta-feira

type Kind = 'reuniao' | 'demo' | 'prazo' | 'evento'
interface CalEvent {
  day: number
  time: string
  title: string
  kind: Kind
  where: string
  remote: boolean
  people: string[]
}

const EVENTS: CalEvent[] = [
  { day: 12, time: '14:00', title: 'Alinhamento semanal de vendas', kind: 'reuniao', where: 'Google Meet', remote: true, people: ['AS', 'BR', 'CM'] },
  { day: 14, time: '10:00', title: 'Demo para Prisma Dados', kind: 'demo', where: 'Google Meet', remote: true, people: ['AS', 'DL'] },
  { day: 16, time: '09:30', title: 'Entrega da proposta Kavo', kind: 'prazo', where: 'Pipeline', remote: true, people: ['BR'] },
  { day: 22, time: '19:00', title: 'Meetup de produto · São Paulo', kind: 'evento', where: 'Av. Paulista, 1000', remote: false, people: ['AS', 'CM', 'EF'] },
  { day: 28, time: '15:00', title: 'Revisão de metas do trimestre', kind: 'reuniao', where: 'Sala 2', remote: false, people: ['AS', 'BR', 'CM', 'DL'] },
]
const KIND_COLOR: Record<Kind, string> = { reuniao: 'bg-sky-500', demo: 'bg-emerald-500', prazo: 'bg-rose-500', evento: 'bg-amber-500' }
const KIND_LABEL: Record<Kind, string> = { reuniao: 'Reunião', demo: 'Demo', prazo: 'Prazo', evento: 'Evento' }

function EventRow({ e }: { e: CalEvent }) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <span className={`w-1 shrink-0 rounded-full ${KIND_COLOR[e.kind]}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{e.title}</span>
          <Badge variant="outline" className="shrink-0">
            {KIND_LABEL[e.kind]}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="tabular-nums">
            {e.day} de out · {e.time}
          </span>
          <span className="flex items-center gap-1">
            {e.remote ? <Video className="size-3" /> : <MapPin className="size-3" />} {e.where}
          </span>
        </div>
      </div>
      <AvatarGroup className="self-center">
        {e.people.slice(0, 3).map((p) => (
          <Avatar key={p} size="sm">
            <AvatarFallback>{p}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  )
}

export default function WidgetCalendario() {
  const [selected, setSelected] = useState(TODAY)
  const cells: (number | null)[] = [...Array.from({ length: FIRST_WEEKDAY }, () => null), ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)
  const eventDays = new Set(EVENTS.map((e) => e.day))
  const weekday = WEEKDAY_LONG[(FIRST_WEEKDAY + selected - 1) % 7]
  const dayEvents = EVENTS.filter((e) => e.day === selected)
  const upcoming = EVENTS.filter((e) => e.day > selected).slice(0, 3)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Card>
          <CardHeader>
            <CardTitle>Outubro 2026</CardTitle>
            <CardDescription>{EVENTS.length} eventos neste mês</CardDescription>
            <CardAction className="flex gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Mês anterior">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Próximo mês">
                <ChevronRight />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((w, i) => (
                <span key={`${w}-${i}`} className="py-1 text-xs font-medium text-muted-foreground">
                  {w}
                </span>
              ))}
              {cells.map((d, i) =>
                d === null ? (
                  <span key={`vazio-${i}`} />
                ) : (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelected(d)}
                    aria-label={`${d} de outubro`}
                    aria-pressed={d === selected}
                    className={`relative mx-auto flex size-9 items-center justify-center rounded-lg text-sm tabular-nums transition-colors ${
                      d === selected ? 'bg-primary text-primary-foreground' : d === TODAY ? 'font-semibold ring-1 ring-primary/50' : 'hover:bg-muted'
                    }`}
                  >
                    {d}
                    {eventDays.has(d) && <span className={`absolute bottom-1 size-1 rounded-full ${d === selected ? 'bg-primary-foreground' : 'bg-primary'}`} />}
                  </button>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {weekday}, {selected} de outubro
            </CardTitle>
            <CardDescription>{dayEvents.length === 0 ? 'Nenhum evento neste dia' : `${dayEvents.length} evento${dayEvents.length > 1 ? 's' : ''} agendado${dayEvents.length > 1 ? 's' : ''}`}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dayEvents.map((e) => (
              <EventRow key={`${e.day}-${e.title}`} e={e} />
            ))}
            {upcoming.length > 0 && (
              <>
                <p className="pt-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">A seguir</p>
                {upcoming.map((e) => (
                  <EventRow key={`${e.day}-${e.title}`} e={e} />
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
