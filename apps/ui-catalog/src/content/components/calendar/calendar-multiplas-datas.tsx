'use client'

import { useState } from 'react'
import { CalendarDays, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

const MAX = 6
const HOJE = new Date(2026, 9, 12)
const INICIAIS = [new Date(2026, 9, 14), new Date(2026, 9, 16), new Date(2026, 9, 21)]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
// Calendário em pt-BR sem date-fns/locale: só os formatadores do react-day-picker.
const PT_BR = {
  formatCaption: (d: Date) => cap(d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })),
  formatWeekdayName: (d: Date) => d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').slice(0, 3),
}
const chave = (d: Date) => d.toDateString()

export default function CalendarMultiplasDatas() {
  const [datas, setDatas] = useState<Date[]>(INICIAIS)
  const ordenadas = [...datas].sort((a, b) => a.getTime() - b.getTime())
  const cheio = datas.length >= MAX

  return (
    <div className="w-full max-w-lg rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div>
          <div className="text-sm font-medium">Dias de plantão</div>
          <div className="text-xs text-muted-foreground">Escolha até {MAX} dias em outubro</div>
        </div>
        <Badge variant={cheio ? 'destructive' : 'secondary'} className="tabular-nums">
          {datas.length}/{MAX}
        </Badge>
      </div>
      <div className="grid sm:grid-cols-[auto_1fr]">
        <div className="flex justify-center border-b p-2 sm:border-r sm:border-b-0">
          <Calendar
            mode="multiple"
            selected={datas}
            onSelect={(d) => setDatas(d ?? [])}
            max={MAX}
            defaultMonth={new Date(2026, 9, 1)}
            today={HOJE}
            formatters={PT_BR}
          />
        </div>
        <div className="flex flex-col p-3">
          <div className="mb-2 flex h-6 items-center justify-between text-xs text-muted-foreground">
            <span>Selecionados</span>
            {datas.length > 0 && (
              <Button variant="ghost" size="xs" onClick={() => setDatas([])}>
                Limpar
              </Button>
            )}
          </div>
          {ordenadas.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed py-6 text-center text-xs text-muted-foreground">
              <CalendarDays className="size-4" />
              Nenhum dia escolhido
            </div>
          ) : (
            <ul className="space-y-1">
              {ordenadas.map((d) => (
                <li key={chave(d)} className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-sm">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold tabular-nums">{d.getDate()}</span>
                  <span className="flex-1 truncate">{cap(d.toLocaleDateString('pt-BR', { weekday: 'long' }))}</span>
                  <span className="text-xs text-muted-foreground">{d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')}</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Remover ${d.toLocaleDateString('pt-BR')}`}
                    onClick={() => setDatas((a) => a.filter((x) => chave(x) !== chave(d)))}
                  >
                    <X />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {cheio && <p className="mt-2 text-xs text-destructive">Limite atingido — remova um dia para escolher outro.</p>}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 border-t px-3 py-2">
        <Button variant="ghost" size="sm">
          Cancelar
        </Button>
        <Button size="sm" disabled={!datas.length}>
          Confirmar{datas.length ? ` ${datas.length} dia${datas.length > 1 ? 's' : ''}` : ''}
        </Button>
      </div>
    </div>
  )
}
