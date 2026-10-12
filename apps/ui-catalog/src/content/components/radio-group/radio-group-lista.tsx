'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Opcao {
  id: string
  titulo: string
  desc: string
  disabled?: boolean
}

const NOTIFICACOES: Opcao[] = [
  { id: 'todas', titulo: 'Todas as mensagens', desc: 'Um aviso a cada nova conversa ou resposta.' },
  { id: 'mencoes', titulo: 'Só menções', desc: 'Apenas quando alguém mencionar você ou sua equipe.' },
  { id: 'nenhuma', titulo: 'Nenhuma', desc: 'Silencia tudo; o contador da inbox continua visível.' },
]

const PAGAMENTO: Opcao[] = [
  { id: 'pix', titulo: 'Pix', desc: 'Aprovação imediata, 5% de desconto' },
  { id: 'cartao', titulo: 'Cartão de crédito', desc: 'Até 12× sem juros' },
  { id: 'boleto', titulo: 'Boleto bancário', desc: 'Indisponível para este pedido', disabled: true },
]

const PERIODOS = ['Mensal', 'Trimestral', 'Anual']

export default function RadioGroupLista() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com descrição</p>
        <RadioGroup defaultValue="mencoes" aria-label="Notificações" className="gap-3">
          {NOTIFICACOES.map((n) => (
            <div key={n.id} className="flex items-start gap-3">
              <RadioGroupItem id={`notif-${n.id}`} value={n.id} className="mt-0.5" />
              <div className="grid gap-1">
                <Label htmlFor={`notif-${n.id}`}>{n.titulo}</Label>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Horizontal</p>
        <RadioGroup defaultValue="mensal" aria-label="Período de cobrança" className="flex w-auto gap-5">
          {PERIODOS.map((p) => (
            <div key={p} className="flex items-center gap-2">
              <RadioGroupItem id={`per-${p}`} value={p.toLowerCase()} />
              <Label htmlFor={`per-${p}`} className="font-normal">
                {p}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com item desabilitado</p>
        <RadioGroup defaultValue="pix" aria-label="Forma de pagamento" className="gap-3">
          {PAGAMENTO.map((p) => (
            <div key={p.id} className={`flex items-start gap-3 ${p.disabled ? 'opacity-60' : ''}`}>
              <RadioGroupItem id={`pag-${p.id}`} value={p.id} disabled={p.disabled} className="mt-0.5" />
              <div className="grid gap-1">
                <Label htmlFor={`pag-${p.id}`} className={p.disabled ? 'cursor-not-allowed' : undefined}>
                  {p.titulo}
                </Label>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Grupo desabilitado</p>
        <RadioGroup defaultValue="sim" disabled aria-label="Renovação automática" className="flex w-auto gap-5">
          {['Sim', 'Não'].map((o) => (
            <div key={o} className="flex items-center gap-2 opacity-60">
              <RadioGroupItem id={`ren-${o}`} value={o.toLowerCase()} />
              <Label htmlFor={`ren-${o}`} className="font-normal">
                {o}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
