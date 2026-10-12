'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PLANOS = [
  { nome: 'Grátis', mensal: 0, anual: 0, desc: 'Para testar sem compromisso.', recursos: ['1 usuário', '100 contatos', 'Agenda básica', 'Suporte por e-mail'] },
  { nome: 'Básico', mensal: 49, anual: 39, desc: 'Para profissionais autônomos.', recursos: ['2 usuários', '1.000 contatos', 'Lembretes automáticos', 'Pagamentos por Pix'] },
  { nome: 'Pro', mensal: 129, anual: 103, desc: 'Para equipes pequenas.', recursos: ['10 usuários', '10.000 contatos', 'Automações e IA', 'Relatórios avançados'], popular: true },
  { nome: 'Empresa', mensal: 349, anual: 279, desc: 'Para operações maiores.', recursos: ['Usuários ilimitados', 'Contatos ilimitados', 'API e SSO', 'Gerente de conta'] },
]

export default function PricingEmTabelaCompacta() {
  const [anual, setAnual] = useState(true)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Compare os planos</h2>
            <p className="mt-3 text-muted-foreground">Do teste gratuito à operação com várias unidades. Mude de plano quando quiser.</p>
          </div>
          <div role="group" aria-label="Período de cobrança" className="inline-flex w-fit items-center gap-1 rounded-lg border bg-muted/40 p-1">
            <Button size="sm" variant={anual ? 'ghost' : 'default'} onClick={() => setAnual(false)}>
              Mensal
            </Button>
            <Button size="sm" variant={anual ? 'default' : 'ghost'} onClick={() => setAnual(true)}>
              Anual
              <Badge variant="secondary" className="ml-1">
                -20%
              </Badge>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid divide-y overflow-hidden rounded-2xl border bg-card lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {PLANOS.map((p) => (
            <div key={p.nome} className={`flex flex-col p-6 ${p.popular ? 'bg-muted/40' : ''}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{p.nome}</h3>
                {p.popular && <Badge>Popular</Badge>}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tabular-nums">R$ {anual ? p.anual : p.mensal}</span>
                <span className="text-xs text-muted-foreground">/mês</span>
              </div>
              <p className="mt-1 h-4 text-[11px] text-muted-foreground">{anual && p.anual > 0 ? `R$ ${(p.anual * 12).toLocaleString('pt-BR')} cobrados por ano` : ' '}</p>
              <Button size="sm" className="mt-4" variant={p.popular ? 'default' : 'outline'}>
                {p.mensal === 0 ? 'Criar conta' : `Assinar ${p.nome}`}
              </Button>
              <ul className="mt-5 space-y-2 text-sm">
                {p.recursos.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Preços em reais, sem taxas adicionais. Nota fiscal emitida automaticamente.</p>
      </div>
    </section>
  )
}
