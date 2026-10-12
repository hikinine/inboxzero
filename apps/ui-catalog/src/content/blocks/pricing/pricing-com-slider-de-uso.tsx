'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

const MIN = 1000
const MAX = 50000
const PASSO = 1000
const MARCAS = ['1 mil', '10 mil', '25 mil', '50 mil']
const INCLUIDO = ['Usuários ilimitados', 'WhatsApp, e-mail e SMS', 'Automações sem limite', 'Relatórios e exportação', 'Suporte em português, 7 dias', 'Dados hospedados no Brasil']

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })

export default function PricingComSliderDeUso() {
  const [contatos, setContatos] = useState(10000)
  const mensal = 79 + ((contatos - MIN) / PASSO) * 12
  const anual = mensal * 10

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pague pelo tamanho da sua base</h2>
          <p className="mt-3 text-muted-foreground">Um único plano com tudo liberado. O preço só muda com o número de contatos ativos.</p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[1.4fr_1fr]">
          <div className="p-8">
            <div className="flex items-end justify-between gap-4">
              <span className="text-sm text-muted-foreground">Contatos ativos por mês</span>
              <span className="text-3xl font-semibold tabular-nums">{contatos.toLocaleString('pt-BR')}</span>
            </div>
            <Slider
              className="mt-6"
              aria-label="Contatos ativos por mês"
              value={[contatos]}
              min={MIN}
              max={MAX}
              step={PASSO}
              onValueChange={(v) => setContatos(Array.isArray(v) ? (v[0] ?? MIN) : v)}
            />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              {MARCAS.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            <p className="mt-8 text-xs font-medium tracking-wider text-muted-foreground uppercase">Incluído em qualquer faixa</p>
            <ul className="mt-3 grid gap-2.5 text-sm sm:grid-cols-2">
              {INCLUIDO.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col border-t bg-muted/40 p-8 lg:border-t-0 lg:border-l">
            <div className="text-sm text-muted-foreground">Seu plano</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tabular-nums">{brl(mensal)}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              ou {brl(anual)}/ano <span className="font-medium text-foreground">(2 meses grátis)</span>
            </p>
            <Button className="mt-6 w-full" size="lg">
              Começar agora <ArrowRight data-icon="inline-end" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">14 dias grátis · sem cartão</p>
            <p className="mt-auto border-t pt-5 text-xs text-muted-foreground">Passou da faixa? A gente avisa antes e você decide se sobe. Nunca cobramos sem aviso.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
