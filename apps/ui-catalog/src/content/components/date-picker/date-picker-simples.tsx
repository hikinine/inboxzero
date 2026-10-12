'use client'

import { useState, type ReactNode } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
// Calendário em pt-BR sem depender de date-fns/locale: só os formatadores do react-day-picker.
const PT_BR = {
  formatCaption: (d: Date) => cap(d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })),
  formatWeekdayName: (d: Date) => d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').slice(0, 3),
  formatMonthDropdown: (d: Date) => cap(d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')),
}
const longa = (d: Date) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

export default function DatePickerSimples() {
  const [data, setData] = useState<Date | undefined>(new Date(2026, 9, 14))
  const [vencimento, setVencimento] = useState<Date | undefined>()
  const [inline, setInline] = useState<Date | undefined>(new Date(2026, 9, 14))

  return (
    <div className="w-full max-w-md space-y-6">
      <Demo title="Botão com data">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" className="w-64 justify-start font-normal" />}>
            <CalendarIcon data-icon="inline-start" className="text-muted-foreground" />
            {data ? longa(data) : 'Escolha uma data'}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={data} onSelect={(d) => setData(d)} defaultMonth={data} formatters={PT_BR} />
          </PopoverContent>
        </Popover>
      </Demo>

      <Demo title="Em formulário (vazio, com dropdown de mês/ano)">
        <div className="space-y-1.5">
          <Label htmlFor="dp-vencimento">Data de vencimento</Label>
          <Popover>
            <PopoverTrigger render={<Button id="dp-vencimento" variant="outline" className={cn('w-64 justify-start font-normal', !vencimento && 'text-muted-foreground')} />}>
              <CalendarIcon data-icon="inline-start" />
              {vencimento ? vencimento.toLocaleDateString('pt-BR') : 'dd/mm/aaaa'}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={vencimento}
                onSelect={(d) => setVencimento(d)}
                defaultMonth={new Date(2026, 9, 1)}
                captionLayout="dropdown"
                startMonth={new Date(2024, 0)}
                endMonth={new Date(2028, 11)}
                formatters={PT_BR}
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">O boleto vence às 23h59 do dia escolhido.</p>
        </div>
      </Demo>

      <Demo title="Inline">
        <div className="inline-block overflow-hidden rounded-xl border bg-card">
          <Calendar mode="single" selected={inline} onSelect={(d) => setInline(d)} defaultMonth={inline} formatters={PT_BR} />
          <div className="flex items-center justify-between gap-6 border-t px-3 py-2 text-xs">
            <span className="text-muted-foreground">{inline ? longa(inline) : 'Nenhuma data selecionada'}</span>
            <Button size="xs" variant="ghost" onClick={() => setInline(new Date(2026, 9, 14))}>
              Hoje
            </Button>
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
