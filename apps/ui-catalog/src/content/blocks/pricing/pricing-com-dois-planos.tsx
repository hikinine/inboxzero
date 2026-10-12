'use client'

import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const ESSENCIAL = ['Até 3 usuários', '1 número de WhatsApp', 'CRM com 2 pipelines', 'Relatórios básicos', 'Suporte por e-mail em até 24h']
const PROFISSIONAL = ['Usuários ilimitados', '5 números de WhatsApp', 'Automações e IA de qualificação', 'Relatórios por origem e ROI', 'API, webhooks e SSO', 'Suporte prioritário no WhatsApp']

export default function PricingComDoisPlanos() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Planos</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Dois planos. Nenhuma pegadinha.</h2>
          <p className="mt-3 text-muted-foreground">Comece no Essencial e suba quando o time crescer. Sem fidelidade, sem taxa de implantação.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border bg-card p-8">
            <h3 className="text-lg font-medium">Essencial</h3>
            <p className="mt-1 text-sm text-muted-foreground">Para quem está organizando o comercial agora.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tabular-nums">R$ 59</span>
              <span className="text-sm text-muted-foreground">/mês por empresa</span>
            </div>
            <Button variant="outline" className="mt-6">
              Começar grátis
            </Button>
            <ul className="mt-8 space-y-3 text-sm">
              {ESSENCIAL.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col rounded-2xl bg-primary p-8 text-primary-foreground shadow-xl">
            <Badge className="absolute top-6 right-6 bg-primary-foreground/15 text-primary-foreground">Recomendado</Badge>
            <h3 className="text-lg font-medium">Profissional</h3>
            <p className="mt-1 text-sm opacity-80">Para times que vendem todo dia e querem previsibilidade.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tabular-nums">R$ 149</span>
              <span className="text-sm opacity-80">/mês por empresa</span>
            </div>
            <Button className="mt-6 bg-background text-foreground hover:bg-background/90">
              Assinar o Profissional <ArrowRight data-icon="inline-end" />
            </Button>
            <p className="mt-8 text-xs font-medium tracking-wider uppercase opacity-70">Tudo do Essencial, mais:</p>
            <ul className="mt-3 space-y-3 text-sm">
              {PROFISSIONAL.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Precisa de mais de 5 números ou de contrato com SLA?{' '}
          <a href="#" className="font-medium text-foreground underline underline-offset-4">
            Fale com vendas
          </a>
        </p>
      </div>
    </section>
  )
}
