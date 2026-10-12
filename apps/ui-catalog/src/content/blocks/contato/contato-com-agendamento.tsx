'use client'

import { useState } from 'react'
import { CalendarCheck, Clock, Globe, Star, Video } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const HORARIOS = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']
const OCUPADOS = new Set(['09:30', '14:00', '15:30'])
const DATA_INICIAL = new Date(2026, 9, 14)

const DETALHES = [
  { Icon: Clock, texto: '30 minutos, sem compromisso' },
  { Icon: Video, texto: 'Pelo Google Meet, link enviado por e-mail' },
  { Icon: Globe, texto: 'Horários no fuso de Brasília (GMT−3)' },
]

function capitalizar(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function ContatoComAgendamento() {
  const [data, setData] = useState<Date | undefined>(DATA_INICIAL)
  const [hora, setHora] = useState<string | null>(null)
  const [confirmado, setConfirmado] = useState(false)
  const rotuloData = data ? capitalizar(data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })) : null

  const reiniciar = () => {
    setConfirmado(false)
    setHora(null)
    setData(DATA_INICIAL)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Agende uma conversa</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">30 minutos com quem entende do produto</h2>
          <p className="mt-3 text-muted-foreground">Escolha um dia e um horário. A gente mostra a plataforma rodando com um cenário parecido com o seu e responde o que você quiser.</p>
          <ul className="mt-8 space-y-3">
            {DETALHES.map(({ Icon, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-sm">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 rounded-xl border bg-card p-4">
            <Avatar size="lg">
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-sm">
              <p className="font-medium">Diego Albuquerque</p>
              <p className="text-xs text-muted-foreground">Especialista em implantação · 340 conversas este ano</p>
            </div>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" /> 4,9
            </span>
          </div>
        </div>

        <div className="rounded-2xl border bg-card">
          {confirmado ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CalendarCheck className="size-7" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">Reunião confirmada</h3>
              <p className="mt-2 text-muted-foreground">
                {rotuloData} às {hora}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">O convite com o link do Meet foi enviado para o seu e-mail.</p>
              <Button variant="outline" className="mt-6" onClick={reiniciar}>
                Agendar outro horário
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-[auto_1fr]">
                <div className="flex justify-center border-b p-3 md:border-r md:border-b-0">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={(d) => {
                      setData(d)
                      setHora(null)
                    }}
                    defaultMonth={new Date(2026, 9, 1)}
                    disabled={{ dayOfWeek: [0, 6] }}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-sm font-medium">{rotuloData ?? 'Escolha um dia no calendário'}</p>
                  <p className="text-xs text-muted-foreground">{OCUPADOS.size} horários já reservados neste dia</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
                    {HORARIOS.map((h) => {
                      const ocupado = OCUPADOS.has(h)
                      const sel = hora === h
                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={ocupado || !data}
                          aria-pressed={sel}
                          onClick={() => setHora(h)}
                          className={cn('h-9 rounded-lg border text-sm tabular-nums transition-colors', sel ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-foreground/30', ocupado && 'cursor-not-allowed text-muted-foreground/50 line-through hover:border-border', !data && 'opacity-50')}
                        >
                          {h}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {data && hora ? (
                    <>
                      Você escolheu <span className="font-medium text-foreground">{rotuloData}</span> às <span className="font-medium text-foreground">{hora}</span>
                    </>
                  ) : (
                    'Selecione um dia e um horário para continuar'
                  )}
                </p>
                <Button disabled={!data || !hora} onClick={() => setConfirmado(true)}>
                  Confirmar reunião
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
