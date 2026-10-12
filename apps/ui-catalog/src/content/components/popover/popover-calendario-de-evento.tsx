'use client'

import { useState } from 'react'
import { CalendarDays, Clock, MapPin, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Evento {
  id: string
  dia: number
  titulo: string
  hora: string
  local: string
  online?: boolean
  cor: string
  pessoas: string[]
}

const DIAS = [
  { d: 12, nome: 'Seg' },
  { d: 13, nome: 'Ter' },
  { d: 14, nome: 'Qua' },
  { d: 15, nome: 'Qui' },
  { d: 16, nome: 'Sex' },
]

const EVENTOS: Evento[] = [
  { id: 'a', dia: 12, titulo: 'Daily comercial', hora: '09:00 – 09:15', local: 'Google Meet', online: true, cor: 'bg-sky-500/15 text-sky-700 dark:text-sky-300', pessoas: ['AS', 'BR', 'CM', 'DL', 'EF'] },
  { id: 'b', dia: 13, titulo: 'Demo para a Kavo', hora: '14:00 – 15:00', local: 'Google Meet', online: true, cor: 'bg-violet-500/15 text-violet-700 dark:text-violet-300', pessoas: ['AS', 'CM'] },
  { id: 'c', dia: 14, titulo: 'Almoço com a Lumi', hora: '12:30 – 14:00', local: 'Rua Augusta, 1200 · São Paulo', cor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300', pessoas: ['AS', 'BR'] },
  { id: 'd', dia: 16, titulo: 'Fechamento do mês', hora: '16:00 – 17:30', local: 'Sala Ipanema', cor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300', pessoas: ['AS', 'BR', 'CM'] },
]

type Resposta = 'sim' | 'talvez' | 'nao' | null

function DetalheEvento({ e, resposta, onResposta }: { e: Evento; resposta: Resposta; onResposta: (r: Resposta) => void }) {
  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-1.5 text-muted-foreground">
        <p className="flex items-center gap-2">
          <Clock className="size-4" /> Qua, 14 de out · {e.hora}
        </p>
        <p className="flex items-center gap-2">
          {e.online ? <Video className="size-4" /> : <MapPin className="size-4" />} {e.local}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <AvatarGroup>
          {e.pessoas.slice(0, 3).map((p) => (
            <Avatar key={p} size="sm">
              <AvatarFallback>{p}</AvatarFallback>
            </Avatar>
          ))}
          {e.pessoas.length > 3 && <AvatarGroupCount>+{e.pessoas.length - 3}</AvatarGroupCount>}
        </AvatarGroup>
        <span className="text-xs text-muted-foreground">{e.pessoas.length} convidados</span>
      </div>
      <div className="flex items-center gap-1.5 border-t pt-3">
        <span className="mr-auto text-xs text-muted-foreground">Vai participar?</span>
        {(
          [
            ['sim', 'Sim'],
            ['talvez', 'Talvez'],
            ['nao', 'Não'],
          ] as const
        ).map(([v, l]) => (
          <Button key={v} size="xs" variant={resposta === v ? 'default' : 'outline'} onClick={() => onResposta(v)}>
            {l}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function PopoverCalendarioDeEvento() {
  const [respostas, setRespostas] = useState<Record<string, Resposta>>({ a: 'sim' })
  const [data, setData] = useState<Date | undefined>(new Date(2026, 9, 14))
  const [hora, setHora] = useState('10:00')

  return (
    <div className="w-full max-w-lg space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Clique num evento da semana</p>
        <div className="grid grid-cols-5 overflow-hidden rounded-xl border bg-card">
          {DIAS.map((dia) => (
            <div key={dia.d} className="min-h-28 border-r p-1.5 last:border-r-0">
              <div className="mb-1.5 flex items-baseline gap-1 px-1">
                <span className="text-[11px] text-muted-foreground uppercase">{dia.nome}</span>
                <span className={cn('text-sm font-medium', dia.d === 14 && 'flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground')}>{dia.d}</span>
              </div>
              {EVENTOS.filter((e) => e.dia === dia.d).map((e) => (
                <Popover key={e.id}>
                  <PopoverTrigger className={cn('w-full truncate rounded-md px-1.5 py-1 text-left text-[11px] font-medium leading-tight outline-none hover:brightness-95 focus-visible:ring-2 focus-visible:ring-ring', e.cor)}>{e.titulo}</PopoverTrigger>
                  <PopoverContent align="start" className="w-72 gap-3 p-4">
                    <PopoverHeader>
                      <PopoverTitle className="flex items-center gap-2">
                        <span className={cn('size-2.5 rounded-sm', e.cor.split(' ')[0]?.replace('/15', ''))} aria-hidden /> {e.titulo}
                      </PopoverTitle>
                      <PopoverDescription>Agenda comercial</PopoverDescription>
                    </PopoverHeader>
                    <DetalheEvento e={e} resposta={respostas[e.id] ?? null} onResposta={(r) => setRespostas((m) => ({ ...m, [e.id]: r }))} />
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Escolher data e hora</p>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" className="w-full justify-start font-normal" />}>
              <CalendarDays data-icon="inline-start" />
              {data ? `${data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · ${hora}` : 'Escolher data'}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data}
                onSelect={setData}
                formatters={{
                  formatWeekdayName: (d) => d.toLocaleDateString('pt-BR', { weekday: 'narrow' }),
                  formatCaption: (d) => d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
                }}
              />
              <div className="flex flex-wrap gap-1 border-t p-2">
                {['09:00', '10:00', '11:30', '14:00', '16:00'].map((h) => (
                  <Button key={h} size="xs" variant={hora === h ? 'default' : 'outline'} onClick={() => setHora(h)}>
                    {h}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">Horário de Brasília · 45 min.</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Detalhe (inline)</p>
          <div className="space-y-3 rounded-lg bg-popover p-4 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <div className="space-y-0.5">
              <p className="flex items-center gap-2 text-sm font-medium">
                <span className="size-2.5 rounded-sm bg-amber-500" aria-hidden /> Almoço com a Lumi
              </p>
              <p className="text-sm text-muted-foreground">Agenda comercial</p>
            </div>
            <DetalheEvento e={EVENTOS[2]!} resposta={respostas.c ?? null} onResposta={(r) => setRespostas((m) => ({ ...m, c: r }))} />
          </div>
        </div>
      </div>
    </div>
  )
}
