'use client'

import { ArrowRight, Check, CircleCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const BULLETS = ['Pix, boleto e cartão', 'Lembrete automático', 'Baixa na hora']

const CAMPOS = [
  ['Cliente', 'Padaria Dona Nena'],
  ['Valor', 'R$ 1.290,00'],
  ['Vencimento', '15/11/2026'],
]

export default function CtaEmCardComMockup() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border bg-card lg:grid-cols-2">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Pronto para começar?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Mande a primeira cobrança em 5 minutos</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Cadastre o cliente, escolha o valor e o vencimento. A Cobrei envia, lembra e dá baixa quando o pagamento cai.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Criar conta grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              Ver preços
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <Check className="size-4 text-emerald-500" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-end bg-muted/50 px-8 pt-10 sm:px-12 sm:pt-12 lg:pt-16">
          <div className="absolute top-6 right-6 z-10 flex items-center gap-2 rounded-xl border bg-background p-3 text-xs shadow-lg sm:top-8 sm:right-8">
            <CircleCheck className="size-4 text-emerald-500" />
            <div>
              <div className="font-medium">Cobrança paga</div>
              <div className="text-muted-foreground">Padaria Dona Nena · R$ 1.290,00</div>
            </div>
          </div>

          <div className="w-full translate-y-6 rounded-t-2xl border border-b-0 bg-background p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nova cobrança</span>
              <Badge variant="secondary">Rascunho</Badge>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {CAMPOS.map(([l, v]) => (
                <div key={l} className="flex items-center justify-between rounded-lg border px-3 py-2">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span className="text-muted-foreground">Enviar por</span>
                <span className="flex gap-1">
                  {['WhatsApp', 'E-mail'].map((c) => (
                    <span key={c} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      {c}
                    </span>
                  ))}
                </span>
              </div>
            </div>
            <div className="mt-4 flex h-9 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">Enviar cobrança</div>
          </div>
        </div>
      </div>
    </section>
  )
}
