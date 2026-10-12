'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'

// Preço progressivo por faixa: cada mensagem é cobrada pela faixa em que cai.
const FAIXAS = [
  { rotulo: 'Primeiras 10 mil', ate: 10_000, preco: 0.12 },
  { rotulo: 'De 10 mil a 50 mil', ate: 50_000, preco: 0.09 },
  { rotulo: 'De 50 mil a 200 mil', ate: 200_000, preco: 0.07 },
  { rotulo: 'Acima de 200 mil', ate: Number.POSITIVE_INFINITY, preco: 0.05 },
]
const PRESETS = [5_000, 20_000, 100_000, 500_000]
const PLATAFORMA = 99
const INCLUIDO = ['WhatsApp, SMS e e-mail no mesmo envio', 'Templates aprovados pela Meta', 'Webhooks de entrega e leitura', 'Painel de métricas em tempo real']

const brl = (n: number, casas = 2) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: casas, maximumFractionDigits: casas })
const num = (n: number) => n.toLocaleString('pt-BR')

function calcular(volume: number) {
  let anterior = 0
  return FAIXAS.map((f) => {
    const tamanho = f.ate - anterior
    const qtd = Math.max(0, Math.min(volume - anterior, tamanho))
    anterior = f.ate
    return { ...f, tamanho, qtd, subtotal: qtd * f.preco }
  })
}

export default function PricingComCalculadoraDeVolume() {
  const [volume, setVolume] = useState(20_000)
  const linhas = calcular(volume)
  const mensagens = linhas.reduce((soma, l) => soma + l.subtotal, 0)
  const total = mensagens + PLATAFORMA
  const porMensagem = volume > 0 ? mensagens / volume : 0

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Preço por uso</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pague só pelo que enviar</h2>
          <p className="mt-3 text-muted-foreground">Digite o volume mensal e veja a conta na hora. Quanto mais envia, menos paga por mensagem.</p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <Label htmlFor="volume-mensagens">Mensagens enviadas por mês</Label>
            <InputGroup className="mt-2 h-11">
              <InputGroupInput
                id="volume-mensagens"
                type="number"
                min={0}
                step={1000}
                value={volume}
                onChange={(e) => setVolume(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                className="text-lg tabular-nums"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>msg/mês</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setVolume(p)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium tabular-nums transition-colors ${volume === p ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                >
                  {num(p)}
                </button>
              ))}
            </div>

            <p className="mt-8 text-xs font-medium tracking-wider text-muted-foreground uppercase">Faixas progressivas</p>
            <ul className="mt-3 divide-y overflow-hidden rounded-xl border">
              {linhas.map((l) => {
                const ativa = l.qtd > 0
                const pct = Number.isFinite(l.tamanho) ? (l.qtd / l.tamanho) * 100 : ativa ? 100 : 0
                return (
                  <li key={l.rotulo} className={`relative px-4 py-3 transition-opacity ${ativa ? '' : 'opacity-50'}`}>
                    <div aria-hidden className="absolute inset-y-0 left-0 bg-primary/8 transition-[width] duration-300" style={{ width: `${pct}%` }} />
                    <div className="relative flex items-center justify-between gap-4 text-sm">
                      <div>
                        <div className="font-medium">{l.rotulo}</div>
                        <div className="text-xs text-muted-foreground">{brl(l.preco)} por mensagem</div>
                      </div>
                      <div className="text-right">
                        <div className="tabular-nums">{ativa ? `${num(l.qtd)} msg` : '—'}</div>
                        <div className="text-xs tabular-nums text-muted-foreground">{ativa ? brl(l.subtotal) : 'não usada'}</div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="rounded-2xl border bg-muted/40 p-6 sm:p-8 lg:sticky lg:top-6">
            <div className="text-sm text-muted-foreground">Estimativa mensal</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight tabular-nums">{brl(total, 0)}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">≈ {brl(porMensagem, 3)} por mensagem enviada</p>

            <dl className="mt-6 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{num(volume)} mensagens</dt>
                <dd className="tabular-nums">{brl(mensagens)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Plataforma e números</dt>
                <dd className="tabular-nums">{brl(PLATAFORMA)}</dd>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <dt>Total</dt>
                <dd className="tabular-nums">{brl(total)}</dd>
              </div>
            </dl>

            <Button className="mt-6 w-full" size="lg">
              Começar a enviar <ArrowRight data-icon="inline-end" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Sem mínimo mensal · sem contrato · cancele quando quiser</p>

            <ul className="mt-6 space-y-2 border-t pt-4 text-sm">
              {INCLUIDO.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
