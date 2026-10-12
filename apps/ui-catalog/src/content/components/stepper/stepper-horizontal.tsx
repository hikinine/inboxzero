'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Building2, Check, CreditCard, PartyPopper, User, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Passo {
  titulo: string
  desc: string
  Icon: LucideIcon
}

const PASSOS: Passo[] = [
  { titulo: 'Conta', desc: 'Nome, e-mail e senha de acesso.', Icon: User },
  { titulo: 'Empresa', desc: 'CNPJ, segmento e tamanho da equipe.', Icon: Building2 },
  { titulo: 'Plano', desc: 'Escolha do plano e forma de pagamento.', Icon: CreditCard },
  { titulo: 'Pronto', desc: 'Convide a equipe e comece a vender.', Icon: PartyPopper },
]

const COMPACTO = ['Carrinho', 'Entrega', 'Pagamento']

type Estado = 'done' | 'current' | 'pending'
const estadoDe = (i: number, atual: number): Estado => (i < atual ? 'done' : i === atual ? 'current' : 'pending')

const CIRCULO: Record<Estado, string> = {
  done: 'border-primary bg-primary text-primary-foreground',
  current: 'border-primary bg-background text-primary',
  pending: 'border-border bg-background text-muted-foreground',
}

export default function StepperHorizontal() {
  const [atual, setAtual] = useState(1)
  const passo = PASSOS[atual]
  const ultimo = atual === PASSOS.length - 1

  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="space-y-5">
        <p className="text-xs font-medium text-muted-foreground">Com ícones e navegação</p>
        <ol className="grid grid-cols-4">
          {PASSOS.map((p, i) => {
            const estado = estadoDe(i, atual)
            return (
              <li key={p.titulo} className="relative flex flex-col items-center gap-2 text-center">
                {i < PASSOS.length - 1 && <span className={`absolute top-[17px] left-1/2 h-0.5 w-full ${i < atual ? 'bg-primary' : 'bg-border'}`} aria-hidden />}
                <span className={`relative z-10 flex size-9 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${CIRCULO[estado]}`} aria-current={estado === 'current' ? 'step' : undefined}>
                  {estado === 'done' ? <Check className="size-4" /> : i + 1}
                </span>
                <span className={`text-xs ${estado === 'pending' ? 'text-muted-foreground' : 'font-medium'}`}>{p.titulo}</span>
              </li>
            )
          })}
        </ol>

        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <passo.Icon className="size-5" />
            </span>
            <div>
              <div className="text-sm font-medium">
                Etapa {atual + 1} de {PASSOS.length}: {passo.titulo}
              </div>
              <div className="text-xs text-muted-foreground">{passo.desc}</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" size="sm" disabled={atual === 0} onClick={() => setAtual((a) => Math.max(0, a - 1))}>
              <ArrowLeft data-icon="inline-start" /> Voltar
            </Button>
            <Button size="sm" disabled={ultimo} onClick={() => setAtual((a) => Math.min(PASSOS.length - 1, a + 1))}>
              {atual === PASSOS.length - 2 ? 'Concluir' : 'Avançar'} <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Compacto, rótulo ao lado</p>
        <ol className="flex items-center gap-2">
          {COMPACTO.map((t, i) => {
            const estado = estadoDe(i, 1)
            return (
              <li key={t} className="flex items-center gap-2">
                <span className={`flex size-6 items-center justify-center rounded-full border-2 text-[11px] font-medium ${CIRCULO[estado]}`}>{estado === 'done' ? <Check className="size-3" /> : i + 1}</span>
                <span className={`text-sm ${estado === 'pending' ? 'text-muted-foreground' : 'font-medium'}`}>{t}</span>
                {i < COMPACTO.length - 1 && <span className={`mx-1 h-0.5 w-8 rounded-full ${i < 1 ? 'bg-primary' : 'bg-border'}`} aria-hidden />}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
