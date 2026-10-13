'use client'

import { ArrowDown, ArrowRight, Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const ANTES = [
  'Leads chegando por WhatsApp, Instagram e e-mail em lugares diferentes',
  'Planilha de pipeline atualizada à mão, sempre atrasada',
  'Follow-up esquecido e cliente comprando do concorrente',
  'Relatório de vendas montado na sexta à noite',
  'Ninguém sabe qual canal realmente traz receita',
]

const DEPOIS = [
  'Um inbox só, com cada conversa ligada ao negócio certo',
  'Pipeline atualizado sozinho a cada mensagem e reunião',
  'Lembretes e cadências automáticas para nenhum lead esfriar',
  'Painel de vendas em tempo real, por vendedor e por canal',
  'Atribuição de receita por origem, sem planilha',
]

export default function ComparativoAntesEDepois() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Antes e depois</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A mesma equipe, com outra rotina</h2>
          <p className="mt-3 text-muted-foreground">O que muda na primeira semana depois de ligar a Lumio.</p>
        </div>

        <div className="relative mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl border border-dashed bg-muted/40 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <Badge variant="outline">Antes</Badge>
              <span className="text-xs text-muted-foreground">Planilhas + 4 apps</span>
            </div>
            <div className="mt-6">
              <div className="text-4xl font-semibold tracking-tight text-muted-foreground">4h por dia</div>
              <div className="mt-1 text-sm text-muted-foreground">gastas em tarefas manuais por vendedor</div>
            </div>
            <ul className="mt-6 space-y-3">
              {ANTES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    <X className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <span className="flex size-12 items-center justify-center rounded-full border bg-background shadow-md">
              <ArrowRight className="size-5" />
            </span>
          </div>
          <div className="-my-3 flex justify-center lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-full border bg-background shadow-sm">
              <ArrowDown className="size-4" />
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-card p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <Badge>Depois</Badge>
              <span className="text-xs text-muted-foreground">Lumio</span>
            </div>
            <div className="relative mt-6">
              <div className="text-4xl font-semibold tracking-tight">20 min por dia</div>
              <div className="mt-1 text-sm text-muted-foreground">e o resto do tempo em conversa com cliente</div>
            </div>
            <ul className="relative mt-6 space-y-3">
              {DEPOIS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
