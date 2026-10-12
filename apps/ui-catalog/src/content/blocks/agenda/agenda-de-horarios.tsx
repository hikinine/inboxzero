'use client'

import { useState } from 'react'
import { CalendarPlus, Check, Clock, Globe, Video } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

const MANHA = ['09:00', '09:30', '10:00', '10:30', '11:30']
const TARDE = ['14:00', '14:30', '15:00', '16:00', '17:30']

export default function AgendaDeHorarios() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 15))
  const [slot, setSlot] = useState<string | null>('10:00')
  const [confirmed, setConfirmed] = useState(false)

  const dateLabel = date ? date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' }) : 'Escolha um dia'

  const pick = (s: string) => {
    setSlot(s)
    setConfirmed(false)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Agenda</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha o melhor horário para a demonstração</h2>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[240px_auto_1fr]">
          <div className="border-b p-6 lg:border-r lg:border-b-0">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Marina Costa</div>
                <div className="text-xs text-muted-foreground">Especialista de vendas</div>
              </div>
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">Demonstração do produto</h3>
            <p className="mt-1 text-sm text-muted-foreground">Um tour guiado pelo inbox, automações e relatórios, com espaço para suas perguntas.</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4" /> 30 minutos
              </li>
              <li className="flex items-center gap-2">
                <Video className="size-4" /> Google Meet
              </li>
              <li className="flex items-center gap-2">
                <Globe className="size-4" /> Horário de Brasília
              </li>
            </ul>
          </div>

          <div className="flex justify-center border-b p-6 lg:border-r lg:border-b-0">
            <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} className="p-0" />
          </div>

          <div className="p-6">
            {confirmed ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">Agendado!</h3>
                <p className="mt-1 text-sm text-muted-foreground capitalize">{dateLabel}</p>
                <p className="text-sm text-muted-foreground">às {slot} com Marina Costa</p>
                <Button variant="outline" size="sm" className="mt-5">
                  <CalendarPlus data-icon="inline-start" /> Adicionar ao Google Agenda
                </Button>
                <button type="button" className="mt-3 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground" onClick={() => setConfirmed(false)}>
                  Escolher outro horário
                </button>
              </div>
            ) : (
              <>
                <div className="text-sm font-medium capitalize">{dateLabel}</div>
                <div className="mt-4 space-y-4">
                  {[
                    { label: 'Manhã', slots: MANHA },
                    { label: 'Tarde', slots: TARDE },
                  ].map((g) => (
                    <div key={g.label}>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{g.label}</div>
                      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
                        {g.slots.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => pick(s)}
                            className={cn(
                              'rounded-lg border px-2 py-1.5 text-sm tabular-nums transition-colors',
                              slot === s ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50 hover:bg-muted',
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3">
                  <div className="text-sm">
                    <div className="text-xs text-muted-foreground">Resumo</div>
                    <div className="font-medium">{slot ? `${slot} · 30 min` : 'Escolha um horário'}</div>
                  </div>
                  <Button disabled={!date || !slot} onClick={() => setConfirmed(true)}>
                    Confirmar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
