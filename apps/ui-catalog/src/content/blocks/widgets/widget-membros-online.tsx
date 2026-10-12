'use client'

import { MessageSquare, UserPlus } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type Status = 'online' | 'ausente' | 'ocupado' | 'offline'
const STATUS: Record<Status, { label: string; dot: string }> = {
  online: { label: 'Disponível', dot: 'bg-emerald-500' },
  ausente: { label: 'Ausente', dot: 'bg-amber-500' },
  ocupado: { label: 'Em reunião', dot: 'bg-rose-500' },
  offline: { label: 'Offline', dot: 'bg-muted-foreground/40' },
}
const MEMBERS: { name: string; initials: string; role: string; status: Status }[] = [
  { name: 'Ana Souza', initials: 'AS', role: 'Gerente de vendas', status: 'online' },
  { name: 'Bruno Rocha', initials: 'BR', role: 'SDR', status: 'online' },
  { name: 'Carla Mendes', initials: 'CM', role: 'Closer', status: 'ocupado' },
  { name: 'Diego Lima', initials: 'DL', role: 'Suporte', status: 'ausente' },
  { name: 'Eduardo Freitas', initials: 'EF', role: 'Marketing', status: 'online' },
  { name: 'Fernanda Castro', initials: 'FC', role: 'Financeiro', status: 'offline' },
]
const SUMMARY: { status: Status; count: number }[] = [
  { status: 'online', count: 8 },
  { status: 'ausente', count: 3 },
  { status: 'ocupado', count: 2 },
  { status: 'offline', count: 5 },
]
const TOTAL = SUMMARY.reduce((acc, s) => acc + s.count, 0)

export default function WidgetMembrosOnline() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Equipe</CardTitle>
            <CardDescription>
              <span className="font-medium text-foreground">8 online</span> de {TOTAL} membros
            </CardDescription>
            <CardAction>
              <AvatarGroup>
                {MEMBERS.slice(0, 3).map((m) => (
                  <Avatar key={m.initials} size="sm">
                    <AvatarFallback>{m.initials}</AvatarFallback>
                  </Avatar>
                ))}
                <AvatarGroupCount>+{TOTAL - 3}</AvatarGroupCount>
              </AvatarGroup>
            </CardAction>
          </CardHeader>
          <CardContent className="divide-y">
            {MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center gap-3 py-3">
                <Avatar>
                  <AvatarFallback>{m.initials}</AvatarFallback>
                  <AvatarBadge className={STATUS[m.status].dot} />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.role}</div>
                </div>
                <Badge variant="outline" className="hidden gap-1.5 sm:inline-flex">
                  <span className={`size-1.5 rounded-full ${STATUS[m.status].dot}`} /> {STATUS[m.status].label}
                </Badge>
                <Button variant="ghost" size="icon-sm" aria-label={`Mensagem para ${m.name}`} disabled={m.status === 'offline'}>
                  <MessageSquare />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status agora</CardTitle>
            <CardDescription>Atualizado em tempo real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {SUMMARY.map((s) => (
              <div key={s.status}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${STATUS[s.status].dot}`} /> {STATUS[s.status].label}
                  </span>
                  <span className="text-muted-foreground tabular-nums">{s.count}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                  <div className={`h-full rounded-full ${STATUS[s.status].dot}`} style={{ width: `${(s.count / TOTAL) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <UserPlus data-icon="inline-start" /> Convidar membro
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
