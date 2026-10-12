'use client'

import { Check, Copy, CreditCard, Home, Package, Truck, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Estado = 'done' | 'current' | 'pending'

interface Etapa {
  titulo: string
  desc: string
  quando: string
  Icon: LucideIcon
  estado: Estado
}

const ETAPAS: Etapa[] = [
  { titulo: 'Pedido confirmado', desc: 'Pedido #10482 recebido e validado.', quando: '08/10, 09:12', Icon: Check, estado: 'done' },
  { titulo: 'Pagamento aprovado', desc: 'Pix de R$ 1.290,00 confirmado pelo banco.', quando: '08/10, 09:15', Icon: CreditCard, estado: 'done' },
  { titulo: 'Em separação', desc: 'Centro de distribuição de Cajamar, SP.', quando: '08/10, 14:30', Icon: Package, estado: 'done' },
  { titulo: 'Enviado', desc: 'Transportadora Loggi · saiu para a última milha.', quando: '09/10, 08:05', Icon: Truck, estado: 'current' },
  { titulo: 'Entregue', desc: 'Previsão de entrega até as 18h.', quando: '11/10', Icon: Home, estado: 'pending' },
]

const MARCADOR: Record<Estado, string> = {
  done: 'border-emerald-500 bg-emerald-500 text-white',
  current: 'border-primary bg-background text-primary',
  pending: 'border-border bg-background text-muted-foreground',
}

export default function TimelinePedido() {
  const concluidas = ETAPAS.filter((e) => e.estado === 'done').length

  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <div>
          <div className="text-sm font-medium">Pedido #10482</div>
          <div className="text-xs text-muted-foreground">Fone Bluetooth Pulse · R$ 1.290,00</div>
        </div>
        <Badge variant="secondary">
          <Truck /> A caminho
        </Badge>
      </div>

      <div className="space-y-2 px-4 pt-4">
        <div className="flex items-center gap-1.5" aria-hidden>
          {ETAPAS.map((e) => (
            <span key={e.titulo} className={`h-1.5 flex-1 rounded-full ${e.estado === 'done' ? 'bg-emerald-500' : e.estado === 'current' ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {concluidas} de {ETAPAS.length} etapas concluídas · entrega prevista para 11/10
        </p>
      </div>

      <ol className="p-4">
        {ETAPAS.map((e, i) => {
          const ultimo = i === ETAPAS.length - 1
          return (
            <li key={e.titulo} className="relative flex gap-4 pb-6 last:pb-0">
              {!ultimo && <span className={`absolute top-8 left-[15px] h-[calc(100%-2rem)] ${e.estado === 'done' ? 'w-0.5 bg-emerald-500' : 'w-0 border-l-2 border-dashed border-border'}`} aria-hidden />}
              <span className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${MARCADOR[e.estado]}`}>
                {e.estado === 'current' && <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" aria-hidden />}
                <e.Icon className="relative size-3.5" />
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-sm leading-none ${e.estado === 'pending' ? 'text-muted-foreground' : 'font-medium'}`}>{e.titulo}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{e.quando}</span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{e.desc}</p>
                {e.estado === 'current' && (
                  <div className="mt-2 flex items-center gap-1">
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">BR4821SP</code>
                    <Button variant="ghost" size="icon-xs" aria-label="Copiar código de rastreio">
                      <Copy />
                    </Button>
                    <Button variant="link" size="xs" className="px-1">
                      Rastrear
                    </Button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
