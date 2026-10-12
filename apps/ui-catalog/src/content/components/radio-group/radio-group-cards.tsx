'use client'

import { useState } from 'react'
import { Store, Truck, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface Plano {
  id: string
  nome: string
  desc: string
  preco: string
  destaque?: boolean
}

const PLANOS: Plano[] = [
  { id: 'basico', nome: 'Básico', desc: '1 usuário · 500 contatos · suporte por e-mail', preco: 'R$ 49' },
  { id: 'pro', nome: 'Pro', desc: '5 usuários · 10 mil contatos · automações', preco: 'R$ 149', destaque: true },
  { id: 'empresa', nome: 'Empresa', desc: 'Usuários ilimitados · SSO · gerente dedicado', preco: 'R$ 490' },
]

const ENTREGA = [
  { id: 'padrao', Icon: Truck, nome: 'Padrão', detalhe: '5 a 8 dias úteis', preco: 'Grátis' },
  { id: 'expressa', Icon: Zap, nome: 'Expressa', detalhe: '1 a 2 dias úteis', preco: 'R$ 24,90' },
  { id: 'retirada', Icon: Store, nome: 'Retirar na loja', detalhe: 'Hoje, após 16h', preco: 'Grátis' },
]

export default function RadioGroupCards() {
  const [plano, setPlano] = useState('pro')
  const [entrega, setEntrega] = useState('expressa')

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Planos em lista</p>
        <RadioGroup value={plano} onValueChange={(v) => setPlano(String(v))} aria-label="Plano">
          {PLANOS.map((p) => (
            <Label
              key={p.id}
              htmlFor={`plano-${p.id}`}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 leading-snug transition-colors ${plano === p.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
            >
              <RadioGroupItem id={`plano-${p.id}`} value={p.id} className="mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  {p.nome}
                  {p.destaque && <Badge variant="secondary">Recomendado</Badge>}
                </div>
                <p className="text-xs font-normal text-muted-foreground">{p.desc}</p>
              </div>
              <div className="text-right">
                <span className="font-semibold">{p.preco}</span>
                <span className="text-xs font-normal text-muted-foreground">/mês</span>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Opções em grade</p>
        <RadioGroup value={entrega} onValueChange={(v) => setEntrega(String(v))} aria-label="Forma de entrega" className="grid-cols-3 gap-3">
          {ENTREGA.map((e) => (
            <Label
              key={e.id}
              htmlFor={`entrega-${e.id}`}
              className={`relative flex cursor-pointer flex-col items-start gap-2 rounded-lg border p-3 leading-snug transition-colors ${entrega === e.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-muted/50'}`}
            >
              <RadioGroupItem id={`entrega-${e.id}`} value={e.id} className="absolute top-3 right-3" />
              <e.Icon className={`size-5 ${entrega === e.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <div>
                <div className="text-sm">{e.nome}</div>
                <div className="text-xs font-normal text-muted-foreground">{e.detalhe}</div>
              </div>
              <div className="text-xs font-semibold">{e.preco}</div>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
