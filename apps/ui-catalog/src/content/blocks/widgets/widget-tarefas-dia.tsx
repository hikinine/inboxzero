'use client'

import { useState } from 'react'
import { CalendarDays, Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'

type Priority = 'Alta' | 'Média' | 'Baixa'
interface Task {
  id: number
  title: string
  time: string
  priority: Priority
  done: boolean
  owner: string
}

const INITIAL: Task[] = [
  { id: 1, title: 'Enviar proposta para Kavo Ltda', time: '09:00', priority: 'Alta', done: true, owner: 'AS' },
  { id: 2, title: 'Revisar contrato da Lumi Tecnologia', time: '10:30', priority: 'Alta', done: true, owner: 'BR' },
  { id: 3, title: 'Ligar para Diego Lima (follow-up)', time: '11:15', priority: 'Média', done: false, owner: 'AS' },
  { id: 4, title: 'Atualizar pipeline da semana', time: '13:00', priority: 'Baixa', done: true, owner: 'CM' },
  { id: 5, title: 'Reunião de alinhamento com marketing', time: '14:00', priority: 'Média', done: false, owner: 'AS' },
  { id: 6, title: 'Responder tickets pendentes', time: '15:30', priority: 'Média', done: true, owner: 'DL' },
  { id: 7, title: 'Preparar relatório mensal', time: '16:00', priority: 'Alta', done: false, owner: 'BR' },
  { id: 8, title: 'Planejar demos de quinta', time: '17:30', priority: 'Baixa', done: true, owner: 'CM' },
]
const TOMORROW = [
  { title: 'Demo para Prisma Dados', time: '10:00' },
  { title: 'Onboarding de novo cliente', time: '14:30' },
  { title: 'Revisão de metas do trimestre', time: '16:00' },
]
const PRIORITY_VARIANT: Record<Priority, 'destructive' | 'secondary' | 'outline'> = { Alta: 'destructive', Média: 'secondary', Baixa: 'outline' }

export default function WidgetTarefasDia() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL)
  const done = tasks.filter((t) => t.done).length
  const pct = Math.round((done / tasks.length) * 100)
  const toggle = (id: number, checked: boolean) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: checked } : t)))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Tarefas de hoje</CardTitle>
            <CardDescription>Segunda-feira, 12 de outubro</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline">
                <Plus data-icon="inline-start" /> Adicionar
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Progress value={pct} className="mb-4">
              <ProgressLabel>
                {done} de {tasks.length} concluídas
              </ProgressLabel>
              <ProgressValue />
            </Progress>
            <div className="-mx-2 space-y-0.5">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50">
                  <Checkbox id={`tarefa-${t.id}`} checked={t.done} onCheckedChange={(c) => toggle(t.id, c === true)} />
                  <Label htmlFor={`tarefa-${t.id}`} className={`flex-1 cursor-pointer font-normal ${t.done ? 'text-muted-foreground line-through' : ''}`}>
                    {t.title}
                  </Label>
                  <Badge variant={PRIORITY_VARIANT[t.priority]} className="hidden sm:inline-flex">
                    {t.priority}
                  </Badge>
                  <span className="w-11 text-right text-xs text-muted-foreground tabular-nums">{t.time}</span>
                  <Avatar size="sm">
                    <AvatarFallback>{t.owner}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card size="sm">
            <CardContent className="grid grid-cols-3 divide-x text-center">
              <div>
                <div className="text-2xl font-semibold tabular-nums">{done}</div>
                <div className="text-xs text-muted-foreground">Concluídas</div>
              </div>
              <div>
                <div className="text-2xl font-semibold tabular-nums">{tasks.length - done}</div>
                <div className="text-xs text-muted-foreground">Pendentes</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-destructive tabular-nums">1</div>
                <div className="text-xs text-muted-foreground">Atrasada</div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" /> Amanhã
              </CardTitle>
              <CardDescription>Terça-feira, 13 de outubro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {TOMORROW.map((t) => (
                <div key={t.title} className="flex items-center gap-3 text-sm">
                  <span className="w-11 text-xs text-muted-foreground tabular-nums">{t.time}</span>
                  <span className="h-4 w-px bg-border" />
                  <span>{t.title}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Ver semana completa
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
