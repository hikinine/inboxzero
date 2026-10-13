'use client'

import { useState, type ReactNode } from 'react'
import { addDays, format, isSameDay, isSameMinute, nextFriday, nextMonday, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarClock, Clock, Send, Sunrise } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const AGORA = new Date(2026, 9, 13, 10, 30)
const em = (d: Date, h: number, m = 0) => set(d, { hours: h, minutes: m, seconds: 0, milliseconds: 0 })

const PRESETS: Array<{ label: string; data: Date }> = [
  { label: 'Hoje às 15h', data: em(AGORA, 15) },
  { label: 'Amanhã às 9h', data: em(addDays(AGORA, 1), 9) },
  { label: 'Sexta às 14h', data: em(nextFriday(AGORA), 14) },
  { label: 'Segunda às 9h', data: em(nextMonday(AGORA), 9) },
  { label: 'Daqui a 1 semana', data: em(addDays(AGORA, 7), 10) },
]

const HORARIOS = Array.from({ length: 25 }, (_, i) => {
  const h = 8 + Math.floor(i / 2)
  const m = i % 2 === 0 ? 0 : 30
  return { h, m, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` }
})

const rotulo = (d: Date) => format(d, "EEE, d 'de' MMM 'às' HH:mm", { locale: ptBR })

function Painel({ valor, onChange }: { valor: Date; onChange: (d: Date) => void }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex flex-row gap-1 overflow-x-auto border-b p-2 sm:w-40 sm:flex-col sm:border-r sm:border-b-0">
        <span className="hidden px-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground sm:block">Atalhos</span>
        {PRESETS.map((p) => (
          <Button
            key={p.label}
            size="sm"
            variant={isSameMinute(p.data, valor) ? 'secondary' : 'ghost'}
            className="shrink-0 justify-start font-normal"
            onClick={() => onChange(p.data)}
          >
            {p.label}
          </Button>
        ))}
      </div>
      <Calendar
        mode="single"
        locale={ptBR}
        selected={valor}
        defaultMonth={valor}
        disabled={{ before: em(AGORA, 0) }}
        onSelect={(d) => d && onChange(em(d, valor.getHours(), valor.getMinutes()))}
      />
      <div className="border-t sm:w-28 sm:border-t-0 sm:border-l">
        <div className="flex items-center gap-1.5 px-3 pt-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <Clock className="size-3" /> Horário
        </div>
        <div className="flex gap-1 overflow-x-auto p-2 sm:h-64 sm:flex-col sm:overflow-y-auto">
          {HORARIOS.map((t) => {
            const ativo = valor.getHours() === t.h && valor.getMinutes() === t.m
            const passado = isSameDay(valor, AGORA) && (t.h < AGORA.getHours() || (t.h === AGORA.getHours() && t.m < AGORA.getMinutes()))
            return (
              <Button
                key={t.label}
                size="sm"
                variant={ativo ? 'default' : 'outline'}
                disabled={passado}
                className="shrink-0 font-mono tabular-nums"
                onClick={() => onChange(em(valor, t.h, t.m))}
              >
                {t.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function DatePickerDataHoraPresets() {
  const [envio, setEnvio] = useState<Date>(PRESETS[1].data)
  const [lembrete, setLembrete] = useState<Date>(em(nextFriday(AGORA), 14))

  return (
    <div className="w-full max-w-2xl space-y-6">
      <Bloco title="Em popover">
        <div className="space-y-1.5">
          <Label htmlFor="dp-envio">Agendar envio da campanha</Label>
          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger render={<Button id="dp-envio" variant="outline" className="w-72 justify-start font-normal capitalize" />}>
                <CalendarClock data-icon="inline-start" className="text-muted-foreground" />
                {rotulo(envio)}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Painel valor={envio} onChange={setEnvio} />
              </PopoverContent>
            </Popover>
            <Button>
              <Send data-icon="inline-start" /> Agendar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Horário de Brasília (GMT-3). 2.418 contatos vão receber.</p>
        </div>
      </Bloco>

      <Bloco title="Inline">
        <div className="overflow-hidden rounded-xl border bg-card">
          <Painel valor={lembrete} onChange={setLembrete} />
          <div className="flex items-center justify-between gap-3 border-t bg-muted/40 px-4 py-2.5 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Sunrise className="size-4" />
              Lembrete: <span className={cn('font-medium capitalize text-foreground')}>{rotulo(lembrete)}</span>
            </span>
            <Button size="sm" variant="ghost" onClick={() => setLembrete(PRESETS[1].data)}>
              Redefinir
            </Button>
          </div>
        </div>
      </Bloco>
    </div>
  )
}

function Bloco({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
