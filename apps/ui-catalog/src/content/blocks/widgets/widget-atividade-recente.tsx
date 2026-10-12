'use client'

import type { LucideIcon } from 'lucide-react'
import { ArrowRightLeft, CheckCircle2, FileText, MessageSquare, Trophy, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Activity {
  who: string
  initials: string
  action: string
  target: string
  note?: string
  time: string
  Icon: LucideIcon
  tone: string
}

const FEED: Activity[] = [
  { who: 'Ana Souza', initials: 'AS', action: 'moveu', target: 'Kavo Ltda', note: 'Proposta → Negociação', time: 'há 5 min', Icon: ArrowRightLeft, tone: 'text-sky-500' },
  { who: 'Bruno Rocha', initials: 'BR', action: 'fechou', target: 'Nuvem Fit · R$ 31.200', time: 'há 22 min', Icon: Trophy, tone: 'text-emerald-500' },
  { who: 'Carla Mendes', initials: 'CM', action: 'comentou em', target: 'Prisma Dados', note: '“Cliente pediu desconto de 10% no anual.”', time: 'há 1 h', Icon: MessageSquare, tone: 'text-amber-500' },
  { who: 'Diego Lima', initials: 'DL', action: 'adicionou o contato', target: 'Mariana Alves', time: 'há 2 h', Icon: UserPlus, tone: 'text-violet-500' },
  { who: 'Ana Souza', initials: 'AS', action: 'enviou a proposta', target: 'Lumi Tecnologia', time: 'há 3 h', Icon: FileText, tone: 'text-sky-500' },
  { who: 'Eduardo Freitas', initials: 'EF', action: 'concluiu a tarefa', target: 'Follow-up de outubro', time: 'ontem', Icon: CheckCircle2, tone: 'text-emerald-500' },
]
const RANKING = [
  { name: 'Ana Souza', initials: 'AS', count: 42 },
  { name: 'Bruno Rocha', initials: 'BR', count: 35 },
  { name: 'Carla Mendes', initials: 'CM', count: 28 },
  { name: 'Diego Lima', initials: 'DL', count: 19 },
]
const MAX = Math.max(...RANKING.map((r) => r.count))

export default function WidgetAtividadeRecente() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
            <CardDescription>O que aconteceu no pipeline hoje</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm">
                Ver tudo
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-border">
              {FEED.map((a, i) => (
                <li key={i} className="relative flex gap-4">
                  <Avatar className="relative z-10 ring-4 ring-card">
                    <AvatarFallback>{a.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="text-sm">
                      <span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.action}</span> <span className="font-medium">{a.target}</span>
                    </p>
                    {a.note && <p className="mt-1 rounded-md bg-muted px-2.5 py-1.5 text-xs text-muted-foreground">{a.note}</p>}
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <a.Icon className={`size-3.5 ${a.tone}`} /> {a.time}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mais ativos</CardTitle>
            <CardDescription>Ações registradas esta semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {RANKING.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="w-4 text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                <Avatar size="sm">
                  <AvatarFallback>{r.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate font-medium">{r.name}</span>
                    <span className="text-muted-foreground tabular-nums">{r.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(r.count / MAX) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">124 ações no total · +18% vs. semana passada</CardFooter>
        </Card>
      </div>
    </section>
  )
}
