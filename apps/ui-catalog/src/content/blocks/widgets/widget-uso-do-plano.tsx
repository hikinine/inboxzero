'use client'

import type { LucideIcon } from 'lucide-react'
import { Bot, Database, MessageCircle, Sparkles, TriangleAlert, UserRound, Users, Workflow } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Limite {
  Icon: LucideIcon
  label: string
  usado: number
  limite: number
  unidade?: string
}

const LIMITES: Limite[] = [
  { Icon: MessageCircle, label: 'Mensagens de WhatsApp', usado: 47300, limite: 50000 },
  { Icon: Users, label: 'Contatos', usado: 8420, limite: 10000 },
  { Icon: Bot, label: 'Respostas da IA', usado: 1180, limite: 2000 },
  { Icon: Workflow, label: 'Automações ativas', usado: 18, limite: 25 },
  { Icon: UserRound, label: 'Usuários', usado: 7, limite: 10 },
  { Icon: Database, label: 'Armazenamento', usado: 6.2, limite: 10, unidade: 'GB' },
]

const PROJECAO = [
  { label: 'Mensagens de WhatsApp', texto: 'atinge o limite em ~4 dias', nivel: 'critico' as const },
  { label: 'Contatos', texto: 'atinge o limite em ~21 dias', nivel: 'alerta' as const },
  { label: 'Respostas da IA', texto: 'dentro do limite até a renovação', nivel: 'ok' as const },
]
const NIVEL: Record<(typeof PROJECAO)[number]['nivel'], string> = {
  critico: 'bg-rose-500',
  alerta: 'bg-amber-500',
  ok: 'bg-emerald-500',
}

function fmt(n: number, unidade?: string) {
  return `${n.toLocaleString('pt-BR')}${unidade ? ` ${unidade}` : ''}`
}

export default function WidgetUsoDoPlano() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              Uso do plano <Badge variant="secondary">Pro</Badge>
            </CardTitle>
            <CardDescription>Ciclo atual: 1 a 31 de outubro · renova em 18 dias</CardDescription>
            <CardAction>
              <Button size="sm">
                <Sparkles data-icon="inline-start" /> Fazer upgrade
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-5">
            {LIMITES.map((l) => {
              const pct = Math.round((l.usado / l.limite) * 100)
              const critico = pct >= 95
              const alerta = pct >= 80 && !critico
              return (
                <div key={l.label}>
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <l.Icon className="size-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="flex items-center gap-1.5 font-medium">
                          {l.label}
                          {critico && <TriangleAlert className="size-3.5 text-rose-500" aria-label="Limite quase atingido" />}
                        </span>
                        <span className="text-muted-foreground tabular-nums">
                          <span className={cn('font-medium', critico ? 'text-rose-600 dark:text-rose-400' : alerta ? 'text-amber-600 dark:text-amber-400' : 'text-foreground')}>{fmt(l.usado, l.unidade)}</span> / {fmt(l.limite, l.unidade)}
                        </span>
                      </div>
                      <Progress value={pct} className={cn('mt-1.5', critico && '[&_[data-slot=progress-indicator]]:bg-rose-500', alerta && '[&_[data-slot=progress-indicator]]:bg-amber-500')} aria-label={`${l.label}: ${pct}%`} />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {pct}% usado · {critico ? 'limite quase atingido' : `faltam ${fmt(Math.round((l.limite - l.usado) * 10) / 10, l.unidade)}`}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>Limites excedentes são cobrados a R$ 0,09 por mensagem.</span>
            <Button variant="link" size="xs" className="px-0">
              Ver detalhes da fatura
            </Button>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Projeção até a renovação</CardTitle>
              <CardDescription>Com base no ritmo dos últimos 7 dias.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {PROJECAO.map((p) => (
                  <li key={p.label} className="flex items-start gap-2.5 text-sm">
                    <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', NIVEL[p.nivel])} />
                    <span>
                      <span className="font-medium">{p.label}</span>
                      <span className="block text-xs text-muted-foreground">{p.texto}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex-1 bg-gradient-to-br from-muted to-muted-foreground/10">
            <CardHeader>
              <CardTitle>Pacote extra de mensagens</CardTitle>
              <CardDescription>Evite a cobrança por excedente adicionando 10 mil mensagens ao ciclo atual.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-semibold tabular-nums">R$ 149</p>
                <p className="text-xs text-muted-foreground">pagamento único · válido por 30 dias</p>
              </div>
              <Button variant="outline" size="sm">
                Adicionar pacote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
