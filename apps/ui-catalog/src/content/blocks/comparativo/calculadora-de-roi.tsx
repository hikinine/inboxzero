'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Clock, TrendingUp, Users, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

const CUSTO_PLANO = 490 // R$ por mês
const AUTOMACAO = 0.7 // 70% das horas manuais eliminadas
const SEMANAS_MES = 4.33

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function Controle({ id, Icon, rotulo, valor, formato, min, max, passo, onChange }: { id: string; Icon: typeof Clock; rotulo: string; valor: number; formato: string; min: number; max: number; passo: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
          <Icon className="size-4 text-muted-foreground" /> {rotulo}
        </label>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-sm tabular-nums">{formato}</span>
      </div>
      <Slider id={id} className="mt-4" aria-label={rotulo} value={[valor]} min={min} max={max} step={passo} onValueChange={(v) => onChange(Array.isArray(v) ? (v[0] ?? min) : v)} />
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export default function CalculadoraDeRoi() {
  const [horas, setHoras] = useState(12)
  const [valorHora, setValorHora] = useState(85)
  const [pessoas, setPessoas] = useState(4)

  const custoHoje = horas * valorHora * pessoas * SEMANAS_MES
  const custoDepois = custoHoje * (1 - AUTOMACAO) + CUSTO_PLANO
  const economiaMes = Math.max(0, custoHoje - custoDepois)
  const economiaAno = economiaMes * 12
  const horasLivres = Math.round(horas * pessoas * SEMANAS_MES * AUTOMACAO)
  const roi = CUSTO_PLANO > 0 ? Math.round((economiaMes / CUSTO_PLANO) * 100) : 0
  const paybackDias = economiaMes > 0 ? Math.max(1, Math.round((CUSTO_PLANO / (custoHoje - custoHoje * (1 - AUTOMACAO))) * 30)) : 0
  const maior = Math.max(custoHoje, custoDepois, 1)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Calculadora de ROI</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quanto o trabalho manual está custando para você?</h2>
          <p className="mt-3 text-muted-foreground">Ajuste com os números do seu time. Usamos a média de 70% de redução observada em 1.300 clientes.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-9 rounded-2xl border bg-card p-6 sm:p-8">
            <Controle id="roi-horas" Icon={Clock} rotulo="Horas manuais por semana (por pessoa)" valor={horas} formato={`${horas} h`} min={1} max={40} passo={1} onChange={setHoras} />
            <Controle id="roi-valor" Icon={Wallet} rotulo="Custo da hora" valor={valorHora} formato={brl(valorHora)} min={30} max={300} passo={5} onChange={setValorHora} />
            <Controle id="roi-pessoas" Icon={Users} rotulo="Pessoas envolvidas" valor={pessoas} formato={`${pessoas}`} min={1} max={30} passo={1} onChange={setPessoas} />

            <div className="space-y-3 border-t pt-6">
              {[
                { rotulo: 'Hoje', valor: custoHoje, cls: 'bg-muted-foreground/40' },
                { rotulo: 'Com a Fluxo', valor: custoDepois, cls: 'bg-primary' },
              ].map((b) => (
                <div key={b.rotulo} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-sm">
                  <span className="text-muted-foreground">{b.rotulo}</span>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <motion.div className={`h-full rounded-full ${b.cls}`} animate={{ width: `${(b.valor / maior) * 100}%` }} transition={{ type: 'spring', stiffness: 140, damping: 22 }} />
                  </div>
                  <span className="font-mono text-xs tabular-nums">{brl(b.valor)}/mês</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 size-64 rounded-full bg-primary-foreground/10 blur-2xl" />
            <p className="flex items-center gap-2 text-sm text-primary-foreground/70">
              <TrendingUp className="size-4" /> Economia estimada por ano
            </p>
            <motion.p key={Math.round(economiaAno / 1000)} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
              {brl(economiaAno)}
            </motion.p>
            <p className="mt-2 text-sm text-primary-foreground/70">{brl(economiaMes)} por mês, já descontando o plano de {brl(CUSTO_PLANO)}.</p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-primary-foreground/20 pt-6">
              <div>
                <dt className="text-xs text-primary-foreground/70">Horas livres/mês</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{horasLivres}</dd>
              </div>
              <div>
                <dt className="text-xs text-primary-foreground/70">Retorno</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{roi.toLocaleString('pt-BR')}%</dd>
              </div>
              <div>
                <dt className="text-xs text-primary-foreground/70">Se paga em</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{economiaMes > 0 ? `${paybackDias} d` : '—'}</dd>
              </div>
            </dl>

            <div className="mt-auto pt-10">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Receber o cálculo por e-mail <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
