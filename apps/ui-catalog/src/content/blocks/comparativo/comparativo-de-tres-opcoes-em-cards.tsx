'use client'

import type { LucideIcon } from 'lucide-react'
import { Briefcase, Check, Minus, Sparkles, Wrench, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Nivel = 'sim' | 'nao' | 'parcial'

interface Opcao {
  id: string
  Icon: LucideIcon
  title: string
  subtitle: string
  price: string
  priceNote: string
  prazo: string
  itens: Array<{ label: string; nivel: Nivel; nota?: string }>
  destaque?: boolean
}

const OPCOES: Opcao[] = [
  {
    id: 'diy',
    Icon: Wrench,
    title: 'Fazer por conta',
    subtitle: 'Planilhas, WhatsApp no celular e boa vontade',
    price: 'R$ 0',
    priceNote: '+ 40h/mês do seu time',
    prazo: 'Pronto em semanas (e nunca termina)',
    itens: [
      { label: 'Inbox único para o time', nivel: 'nao' },
      { label: 'Histórico por cliente', nivel: 'parcial', nota: 'na planilha' },
      { label: 'Automações e follow-up', nivel: 'nao' },
      { label: 'Relatórios de vendas', nivel: 'parcial', nota: 'manuais' },
      { label: 'Suporte quando trava', nivel: 'nao' },
    ],
  },
  {
    id: 'agencia',
    Icon: Briefcase,
    title: 'Contratar agência',
    subtitle: 'Alguém monta e opera por você',
    price: 'R$ 4.500',
    priceNote: 'por mês, em média',
    prazo: 'Pronto em 60 a 90 dias',
    itens: [
      { label: 'Inbox único para o time', nivel: 'sim' },
      { label: 'Histórico por cliente', nivel: 'sim' },
      { label: 'Automações e follow-up', nivel: 'parcial', nota: 'sob demanda' },
      { label: 'Relatórios de vendas', nivel: 'parcial', nota: 'mensais' },
      { label: 'Suporte quando trava', nivel: 'parcial', nota: 'horário comercial' },
    ],
  },
  {
    id: 'nos',
    Icon: Sparkles,
    title: 'Com a Lumio',
    subtitle: 'Plataforma pronta + time de implantação',
    price: 'R$ 297',
    priceNote: 'por mês, sem fidelidade',
    prazo: 'Pronto em 7 dias',
    destaque: true,
    itens: [
      { label: 'Inbox único para o time', nivel: 'sim' },
      { label: 'Histórico por cliente', nivel: 'sim' },
      { label: 'Automações e follow-up', nivel: 'sim' },
      { label: 'Relatórios de vendas', nivel: 'sim', nota: 'em tempo real' },
      { label: 'Suporte quando trava', nivel: 'sim', nota: '24/7, humano' },
    ],
  },
]

function NivelIcon({ nivel }: { nivel: Nivel }) {
  if (nivel === 'sim') {
    return (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <Check className="size-3" />
      </span>
    )
  }
  if (nivel === 'parcial') {
    return (
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
        <Minus className="size-3" />
      </span>
    )
  }
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <X className="size-3" />
    </span>
  )
}

export default function ComparativoDeTresOpcoesEmCards() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Três caminhos</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Como você vai organizar o atendimento?</h2>
          <p className="mt-3 text-muted-foreground">Comparamos custo, prazo e o que fica pronto em cada opção. Sem letra miúda.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
          {OPCOES.map((o) => (
            <div key={o.id} className={cn('relative flex flex-col rounded-2xl border bg-card p-6 sm:p-7', o.destaque && 'border-primary/50 shadow-lg ring-1 ring-primary/20 lg:-translate-y-3')}>
              {o.destaque && <Badge className="absolute -top-3 left-6">Recomendado</Badge>}
              <div className="flex items-center gap-3">
                <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', o.destaque ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                  <o.Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{o.title}</h3>
                  <p className="text-xs text-muted-foreground">{o.subtitle}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
                <span className="text-3xl font-semibold tracking-tight">{o.price}</span>
                <span className="text-sm text-muted-foreground">{o.priceNote}</span>
              </div>
              <p className={cn('mt-1 text-sm', o.destaque ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>{o.prazo}</p>

              <ul className="mt-6 flex-1 space-y-3 border-t pt-6">
                {o.itens.map((it) => (
                  <li key={it.label} className="flex items-start gap-3 text-sm">
                    <NivelIcon nivel={it.nivel} />
                    <span className={cn(it.nivel === 'nao' && 'text-muted-foreground')}>
                      {it.label}
                      {it.nota && <span className="ml-1.5 text-xs text-muted-foreground">· {it.nota}</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <Button className="mt-6 w-full" variant={o.destaque ? 'default' : 'outline'}>
                {o.destaque ? 'Começar grátis por 14 dias' : 'Entenda os custos'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
