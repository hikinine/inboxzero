'use client'

import { useState } from 'react'
import { CheckCircle2, MessageCircle, UserPlus, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Convite = 'pendente' | 'aceito' | 'recusado'

export default function CardNotificacao() {
  const [convite, setConvite] = useState<Convite>('pendente')
  const [fechada, setFechada] = useState(false)

  return (
    <div className="w-full max-w-md space-y-3">
      <Card size="sm">
        <CardContent className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400">
            <MessageCircle className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="font-medium">Nova mensagem de Ana Souza</div>
              <span className="shrink-0 text-xs text-muted-foreground">há 2 min</span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">“Oi! Conseguem enviar a proposta revisada até sexta?”</p>
            <div className="mt-3 flex gap-2">
              <Button size="xs">Responder</Button>
              <Button size="xs" variant="ghost">
                Marcar como lida
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {fechada ? (
        <button
          type="button"
          onClick={() => setFechada(false)}
          className="w-full rounded-xl border border-dashed py-3 text-xs text-muted-foreground hover:bg-muted/50"
        >
          Notificação fechada — clique para restaurar
        </button>
      ) : (
        <Card size="sm">
          <CardContent className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">Pagamento confirmado</div>
                <Button size="icon-xs" variant="ghost" aria-label="Fechar notificação" className="-mr-1 -mt-1" onClick={() => setFechada(true)}>
                  <X />
                </Button>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Pedido #48213 · <span className="font-medium text-foreground">R$ 1.290,00</span> via Pix. O recibo foi enviado para o cliente.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button size="xs" variant="outline">
                  Ver pedido
                </Button>
                <span className="text-xs text-muted-foreground">há 1 h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card size="sm">
        <CardContent className="flex gap-3">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary text-primary-foreground">BR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-medium">Bruno Rocha convidou você</div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Para a equipe <span className="font-medium text-foreground">Vendas · Sul</span> como atendente.
            </p>
            {convite === 'pendente' ? (
              <div className="mt-3 flex gap-2">
                <Button size="xs" onClick={() => setConvite('aceito')}>
                  <UserPlus data-icon="inline-start" /> Aceitar
                </Button>
                <Button size="xs" variant="outline" onClick={() => setConvite('recusado')}>
                  Recusar
                </Button>
              </div>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                {convite === 'aceito' ? 'Convite aceito — bem-vindo à equipe!' : 'Convite recusado.'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
