'use client'

import { useState, type ReactNode } from 'react'
import { CalendarClock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const INICIAIS = [
  { id: 'proposta', texto: 'Enviar proposta revisada para a Lumi', feito: true },
  { id: 'followup', texto: 'Follow-up com Bruno (Kavo) sobre o contrato', feito: true },
  { id: 'reuniao', texto: 'Preparar pauta da reunião de quinta', feito: false },
  { id: 'relatorio', texto: 'Fechar relatório de leads de setembro', feito: false },
  { id: 'onboarding', texto: 'Gravar vídeo de onboarding do inbox', feito: false },
]

const COM_PRAZO = [
  { id: 'nf', texto: 'Emitir nota fiscal do pedido #48213', detalhe: 'Financeiro · prioridade alta', prazo: 'Hoje', urgente: true },
  { id: 'dns', texto: 'Apontar DNS do domínio novo', detalhe: 'Infra · aguardando o cliente', prazo: 'Sex, 16 out', urgente: false },
]

export default function CheckboxListaTarefas() {
  const [tarefas, setTarefas] = useState(INICIAIS)
  const [prazos, setPrazos] = useState<Record<string, boolean>>({})
  const feitas = tarefas.filter((t) => t.feito).length
  const alternar = (id: string, v: boolean) => setTarefas((ts) => ts.map((t) => (t.id === id ? { ...t, feito: v } : t)))

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Legenda className="mb-0">Hoje</Legenda>
          <span className="text-xs text-muted-foreground tabular-nums">
            {feitas} de {tarefas.length} concluídas
          </span>
        </div>
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(feitas / tarefas.length) * 100}%` }} />
        </div>
        <ul className="space-y-0.5">
          {tarefas.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-muted/60">
              <Checkbox id={t.id} checked={t.feito} onCheckedChange={(v) => alternar(t.id, v === true)} />
              <Label
                htmlFor={t.id}
                className={`flex-1 cursor-pointer font-normal transition-colors ${t.feito ? 'text-muted-foreground line-through' : ''}`}
              >
                {t.texto}
              </Label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Legenda>Com descrição e prazo</Legenda>
        <ul className="divide-y rounded-xl border">
          {COM_PRAZO.map((t) => {
            const ok = !!prazos[t.id]
            return (
              <li key={t.id} className="flex items-start gap-3 p-3">
                <Checkbox id={t.id} className="mt-0.5" checked={ok} onCheckedChange={(v) => setPrazos((p) => ({ ...p, [t.id]: v === true }))} />
                <div className="min-w-0 flex-1">
                  <Label htmlFor={t.id} className={`cursor-pointer font-medium ${ok ? 'text-muted-foreground line-through' : ''}`}>
                    {t.texto}
                  </Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.detalhe}</p>
                </div>
                <Badge variant={t.urgente && !ok ? 'destructive' : 'outline'}>
                  <CalendarClock data-icon="inline-start" /> {t.prazo}
                </Badge>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Legenda({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground ${className}`}>{children}</div>
}
