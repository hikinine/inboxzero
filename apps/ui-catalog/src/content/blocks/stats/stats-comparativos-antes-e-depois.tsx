'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Metrica {
  nome: string
  antes: number
  depois: number
  unidade: string
  menorMelhor?: boolean
}

const CLIENTES: Array<{ nome: string; setor: string; metricas: Metrica[] }> = [
  {
    nome: 'Loja Bem-te-vi',
    setor: 'Varejo · 14 lojas',
    metricas: [
      { nome: 'Tempo até a primeira resposta', antes: 23, depois: 4, unidade: 'min', menorMelhor: true },
      { nome: 'Conversas por atendente ao dia', antes: 48, depois: 112, unidade: '' },
      { nome: 'Conversão no chat', antes: 3.1, depois: 7.8, unidade: '%' },
      { nome: 'NPS do atendimento', antes: 41, depois: 72, unidade: '' },
    ],
  },
  {
    nome: 'Clínica Vitalis',
    setor: 'Saúde · 32 unidades',
    metricas: [
      { nome: 'Tempo até a primeira resposta', antes: 35, depois: 6, unidade: 'min', menorMelhor: true },
      { nome: 'Agendamentos por dia', antes: 210, depois: 340, unidade: '' },
      { nome: 'Faltas em consultas', antes: 18, depois: 9, unidade: '%', menorMelhor: true },
      { nome: 'NPS do atendimento', antes: 52, depois: 81, unidade: '' },
    ],
  },
]

function formatar(v: number, unidade: string) {
  const n = v.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
  if (unidade === '%') return `${n}%`
  return unidade ? `${n} ${unidade}` : n
}

export default function StatsComparativosAntesEDepois() {
  const [idx, setIdx] = useState(0)
  const cliente = CLIENTES[idx] ?? CLIENTES[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Antes e depois</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Os mesmos indicadores, 90 dias depois</h2>
          </div>
          <div className="inline-flex rounded-lg bg-muted p-0.5" role="tablist" aria-label="Cliente">
            {CLIENTES.map((c, i) => (
              <button key={c.nome} type="button" role="tab" aria-selected={idx === i} onClick={() => setIdx(i)} className={cn('rounded-md px-3 py-1.5 text-xs font-medium transition-colors', idx === i ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
            <div>
              <p className="font-semibold">{cliente.nome}</p>
              <p className="text-xs text-muted-foreground">{cliente.setor}</p>
            </div>
            <div className="flex gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-muted-foreground/40" /> Antes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-primary" /> Depois
              </span>
            </div>
          </div>

          <ul className="divide-y px-6">
            {cliente.metricas.map((m) => {
              const max = Math.max(m.antes, m.depois)
              const delta = ((m.depois - m.antes) / m.antes) * 100
              const bom = m.menorMelhor ? delta < 0 : delta > 0
              return (
                <li key={m.nome} className="grid gap-3 py-5 sm:grid-cols-[200px_1fr_auto] sm:items-center sm:gap-6">
                  <p className="text-sm font-medium">{m.nome}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-muted-foreground">Antes</span>
                      <div className="h-2.5 flex-1 rounded-full bg-muted">
                        <motion.div key={`${cliente.nome}-${m.nome}-antes`} className="h-full rounded-full bg-muted-foreground/40" initial={{ width: 0 }} animate={{ width: `${(m.antes / max) * 100}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                      </div>
                      <span className="w-16 text-right tabular-nums text-muted-foreground">{formatar(m.antes, m.unidade)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-medium">Depois</span>
                      <div className="h-2.5 flex-1 rounded-full bg-muted">
                        <motion.div key={`${cliente.nome}-${m.nome}-depois`} className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${(m.depois / max) * 100}%` }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} />
                      </div>
                      <span className="w-16 text-right font-medium tabular-nums">{formatar(m.depois, m.unidade)}</span>
                    </div>
                  </div>
                  <span className={cn('w-fit rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums sm:justify-self-end', bom ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400')}>
                    {delta > 0 ? '+' : '−'}
                    {Math.abs(delta).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="border-t px-6 py-3 text-xs text-muted-foreground">Comparação entre os 90 dias anteriores à implantação e os 90 dias seguintes, com a mesma equipe.</p>
        </div>
      </div>
    </section>
  )
}
