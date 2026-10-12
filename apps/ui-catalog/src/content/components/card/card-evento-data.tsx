'use client'

import { useState, type ReactNode } from 'react'
import { Clock, MapPin, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Rsvp = 'vou' | 'talvez' | 'nao' | null
const PESSOAS = ['AS', 'BR', 'CM', 'DL']
const RESPOSTAS: { id: Exclude<Rsvp, null>; label: string }[] = [
  { id: 'vou', label: 'Vou' },
  { id: 'talvez', label: 'Talvez' },
  { id: 'nao', label: 'Não vou' },
]

type Tipo = 'reuniao' | 'prazo' | 'lembrete'
const AGENDA: { hora: string; titulo: string; local: string; tipo: Tipo; agora?: boolean }[] = [
  { hora: '09:30', titulo: 'Daily do time de produto', local: 'Google Meet', tipo: 'reuniao', agora: true },
  { hora: '11:00', titulo: 'Entrega da proposta · Rocha & Filhos', local: 'Prazo final', tipo: 'prazo' },
  { hora: '15:00', titulo: 'Ligar para Carla sobre a renovação', local: 'Lembrete', tipo: 'lembrete' },
]
const TIPO: Record<Tipo, string> = { reuniao: 'border-sky-500', prazo: 'border-rose-500', lembrete: 'border-amber-500' }

export default function CardEventoData() {
  const [rsvp, setRsvp] = useState<Rsvp>(null)
  const status =
    rsvp === 'vou' ? 'Presença confirmada' : rsvp === 'talvez' ? 'Você marcou talvez' : rsvp === 'nao' ? 'Você recusou o convite' : 'Vai participar?'

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Convite com bloco de data</Legenda>
        <Card>
          <CardContent className="flex gap-4">
            <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-primary py-2 text-primary-foreground">
              <span className="text-[10px] font-medium tracking-wider uppercase opacity-80">out</span>
              <span className="text-2xl leading-none font-semibold tabular-nums">16</span>
              <span className="text-[10px] opacity-80">quinta</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="leading-snug font-medium">Demonstração do CRM para a Lumi</div>
                <Badge variant="secondary" className="shrink-0">
                  <Video data-icon="inline-start" /> Online
                </Badge>
              </div>
              <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" /> 14:00 – 14:45 · horário de Brasília
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> Google Meet · link enviado por e-mail
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <AvatarGroup>
                  {PESSOAS.map((p) => (
                    <Avatar key={p} size="sm">
                      <AvatarFallback className="text-[10px]">{p}</AvatarFallback>
                    </Avatar>
                  ))}
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
                <span className="text-xs text-muted-foreground">7 confirmados</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <span className="mr-auto text-xs text-muted-foreground">{status}</span>
            {RESPOSTAS.map((r) => (
              <Button key={r.id} size="sm" variant={rsvp === r.id ? 'default' : 'outline'} aria-pressed={rsvp === r.id} onClick={() => setRsvp(r.id)}>
                {r.label}
              </Button>
            ))}
          </CardFooter>
        </Card>
      </div>

      <div>
        <Legenda>Agenda do dia (compacto)</Legenda>
        <Card size="sm">
          <CardContent>
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">Hoje · segunda, 12 de outubro</span>
              <span className="text-xs text-muted-foreground">3 compromissos</span>
            </div>
            <ul className="space-y-2">
              {AGENDA.map((e) => (
                <li key={e.hora} className={cn('flex items-center gap-3 rounded-lg border-l-2 bg-muted/40 py-2 pr-2 pl-3', TIPO[e.tipo])}>
                  <span className="w-11 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{e.hora}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{e.titulo}</span>
                    <span className="block text-xs text-muted-foreground">{e.local}</span>
                  </span>
                  {e.agora && (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> Agora
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
