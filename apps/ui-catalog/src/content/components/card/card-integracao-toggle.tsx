'use client'

import { useState } from 'react'
import { Calendar, CreditCard, MessageSquare, RefreshCw, Settings, Slack, TriangleAlert, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface Integracao {
  id: string
  nome: string
  desc: string
  icon: LucideIcon
  classe: string
  ativo: boolean
  sync: string
  alerta?: string
}
const INICIAIS: Integracao[] = [
  { id: 'whatsapp', nome: 'WhatsApp Business', desc: 'Receba e responda mensagens no inbox.', icon: MessageSquare, classe: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', ativo: true, sync: 'há 2 min' },
  { id: 'agenda', nome: 'Google Agenda', desc: 'Crie eventos a partir das conversas.', icon: Calendar, classe: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', ativo: true, sync: 'há 3 dias', alerta: 'Token expirado' },
  { id: 'slack', nome: 'Slack', desc: 'Alertas de novos leads no canal #vendas.', icon: Slack, classe: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', ativo: false, sync: '' },
  { id: 'stripe', nome: 'Stripe', desc: 'Cobranças e assinaturas sincronizadas.', icon: CreditCard, classe: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', ativo: true, sync: 'há 5 min' },
]

export default function CardIntegracaoToggle() {
  const [itens, setItens] = useState<Integracao[]>(INICIAIS)
  const ativas = itens.filter((i) => i.ativo).length
  const alternar = (id: string, v: boolean) => setItens((is) => is.map((i) => (i.id === id ? { ...i, ativo: v, sync: v ? 'agora' : '', alerta: undefined } : i)))
  const reconectar = (id: string) => setItens((is) => is.map((i) => (i.id === id ? { ...i, alerta: undefined, sync: 'agora' } : i)))

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-medium">Integrações</h3>
        <span className="text-xs text-muted-foreground tabular-nums">
          {ativas} de {itens.length} ativas
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {itens.map((i) => (
          <Card key={i.id} size="sm" className={cn(!i.ativo && 'bg-muted/30')}>
            <CardContent className="flex items-start gap-3">
              <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', i.classe, !i.ativo && 'opacity-60')}>
                <i.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <label htmlFor={`int-${i.id}`} className="block text-sm font-medium">
                  {i.nome}
                </label>
                <p className="text-xs text-muted-foreground">{i.desc}</p>
              </div>
              <Switch id={`int-${i.id}`} checked={i.ativo} onCheckedChange={(v) => alternar(i.id, v)} aria-label={`Ativar ${i.nome}`} />
            </CardContent>
            <CardContent className="flex min-h-7 items-center gap-2 text-xs">
              {i.ativo && i.alerta ? (
                <>
                  <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                    <TriangleAlert className="size-3.5" /> {i.alerta}
                  </span>
                  <Button variant="outline" size="xs" className="ml-auto" onClick={() => reconectar(i.id)}>
                    <RefreshCw data-icon="inline-start" /> Reconectar
                  </Button>
                </>
              ) : i.ativo ? (
                <>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500" /> Conectado · sincronizado {i.sync}
                  </span>
                  <Button variant="ghost" size="xs" className="ml-auto" aria-label={`Configurar ${i.nome}`}>
                    <Settings data-icon="inline-start" /> Configurar
                  </Button>
                </>
              ) : (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground/40" /> Desconectado
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
