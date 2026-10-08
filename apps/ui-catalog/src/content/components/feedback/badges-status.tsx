'use client'

import { Badge } from '@/components/ui/badge'
import { Check, Clock, Pause, X, Zap } from 'lucide-react'

const STATUS = [
  { label: 'Ativo', dot: 'bg-emerald-500' },
  { label: 'Pendente', dot: 'bg-amber-500' },
  { label: 'Pausado', dot: 'bg-muted-foreground' },
  { label: 'Falhou', dot: 'bg-rose-500' },
  { label: 'Em teste', dot: 'bg-sky-500' },
]

export default function BadgesStatus() {
  return (
    <div className="w-full max-w-lg space-y-5">
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Com ponto</div>
        <div className="flex flex-wrap gap-2">
          {STATUS.map((s) => (
            <Badge key={s.label} variant="outline" className="gap-1.5">
              <span className={`size-1.5 rounded-full ${s.dot}`} /> {s.label}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Com ícone</div>
        <div className="flex flex-wrap gap-2">
          <Badge className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
            <Check /> Pago
          </Badge>
          <Badge className="gap-1 bg-amber-500/15 text-amber-700 dark:text-amber-400">
            <Clock /> Aguardando
          </Badge>
          <Badge className="gap-1 bg-muted text-muted-foreground">
            <Pause /> Pausado
          </Badge>
          <Badge variant="destructive" className="gap-1">
            <X /> Recusado
          </Badge>
          <Badge className="gap-1">
            <Zap /> Pro
          </Badge>
        </div>
      </div>
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Contadores</div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Inbox 12</Badge>
          <Badge variant="secondary">Leads 1.284</Badge>
          <Badge variant="outline" className="font-mono">
            v2.4.0
          </Badge>
          <Badge variant="ghost">Rascunho</Badge>
        </div>
      </div>
    </div>
  )
}
