'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Clock3, FileSpreadsheet, Landmark, ShieldCheck, TriangleAlert } from 'lucide-react'

type Modo = 'antes' | 'depois'

const METRICAS = [
  { Icon: Clock3, titulo: 'Fechamento do mês', antes: '5 dias', depois: '2 horas' },
  { Icon: TriangleAlert, titulo: 'Erros de digitação', antes: '12 por mês', depois: 'zero' },
  { Icon: Landmark, titulo: 'Conciliação bancária', antes: '6h por semana', depois: '15 min' },
  { Icon: ShieldCheck, titulo: 'Quem alterou o quê', antes: 'ninguém sabe', depois: 'trilha completa' },
]

const CELULAS = [
  ['Data', 'Histórico', 'Valor', 'Conta', 'Status'],
  ['02/10', 'Pix Clínica Vida', '1.250,00', 'Itaú', 'ok'],
  ['03/10', 'Aluguel sala', '-3.200,00', 'Itaú', '#REF!'],
  ['03/10', 'Salário equipe', '-18.400,00', 'Nubank', 'conferir'],
  ['05/10', 'Cartão Lumi', '6.800,00', '???', ''],
  ['06/10', 'Boleto Jadlog', '-412,30', 'Inter', 'ok'],
]

const LANCAMENTOS = [
  { nome: 'Pix · Clínica Vida', conta: 'Itaú', valor: '+ R$ 1.250,00', positivo: true },
  { nome: 'Aluguel · Sala 402', conta: 'Itaú', valor: '- R$ 3.200,00', positivo: false },
  { nome: 'Folha · Equipe', conta: 'Nubank', valor: '- R$ 18.400,00', positivo: false },
  { nome: 'Cartão · Lumi Tecnologia', conta: 'Inter', valor: '+ R$ 6.800,00', positivo: true },
]

export default function FeaturesComComparativoDeAntesEDepois() {
  const [modo, setModo] = useState<Modo>('depois')

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Antes e depois</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O mesmo financeiro, sem a planilha</h2>
          <p className="mt-3 text-muted-foreground">Alterne para ver o que muda quando a Contafácil assume os lançamentos.</p>
          <div role="group" aria-label="Comparar antes e depois" className="mt-6 inline-flex rounded-full border bg-muted/40 p-1">
            {(['antes', 'depois'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModo(m)}
                aria-pressed={modo === m}
                className={`relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${modo === m ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {modo === m && <motion.span layoutId="fcad-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }} />}
                <span className="relative capitalize">{m}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border bg-card shadow-sm">
            <AnimatePresence mode="wait" initial={false}>
              {modo === 'antes' ? (
                <motion.div key="antes" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.22 }}>
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5 text-xs">
                    <FileSpreadsheet className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium">planilha_final_v3_REVISADA.xlsx</span>
                    <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] text-amber-700 dark:text-amber-400">atualizada há 9 dias</span>
                  </div>
                  <div className="grid grid-cols-[52px_1fr_90px_70px_70px] text-xs">
                    {CELULAS.map((linha, li) =>
                      linha.map((c, ci) => {
                        const cabecalho = li === 0
                        const erro = c === '#REF!' || c === '???'
                        const alerta = c === 'conferir'
                        return (
                          <div
                            key={`${li}-${ci}`}
                            className={`truncate border-r border-b px-2 py-2 tabular-nums last:border-r-0 ${cabecalho ? 'bg-muted/60 font-medium' : ''} ${erro ? 'bg-rose-500/10 font-medium text-rose-600 dark:text-rose-400' : ''} ${alerta ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400' : ''} ${ci === 2 && !cabecalho ? 'text-right' : ''}`}
                          >
                            {c}
                          </div>
                        )
                      }),
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-rose-500" /> 3 células com erro · 2 contas sem conciliar · última edição: Rafael (sexta, 23h40)
                  </div>
                </motion.div>
              ) : (
                <motion.div key="depois" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
                  <div className="flex items-center gap-2 border-b px-4 py-2.5 text-xs">
                    <span className="size-5 rounded-md bg-primary" />
                    <span className="font-medium">Contafácil · Outubro</span>
                    <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                      <Check className="size-3" /> conciliado agora
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 p-4">
                    {[
                      { r: 'Receita', v: 'R$ 184,3 mil' },
                      { r: 'Despesas', v: 'R$ 121,8 mil' },
                      { r: 'Resultado', v: 'R$ 62,5 mil', destaque: true },
                    ].map((k) => (
                      <div key={k.r} className="rounded-lg border p-3">
                        <div className="text-[11px] text-muted-foreground">{k.r}</div>
                        <div className={`mt-1 text-sm font-semibold tabular-nums ${k.destaque ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{k.v}</div>
                      </div>
                    ))}
                  </div>
                  <ul className="divide-y border-t">
                    {LANCAMENTOS.map((l) => (
                      <li key={l.nome} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                        <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          <Check className="size-3" />
                        </span>
                        <span className="flex-1 font-medium">{l.nome}</span>
                        <span className="text-muted-foreground">{l.conta}</span>
                        <span className={`w-28 text-right tabular-nums ${l.positivo ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{l.valor}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ul className="divide-y rounded-2xl border bg-card">
            {METRICAS.map((m) => (
              <li key={m.titulo} className="flex items-center gap-4 px-5 py-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <m.Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{m.titulo}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-sm">
                    <span className={`transition-colors ${modo === 'antes' ? 'font-medium text-rose-600 dark:text-rose-400' : 'text-muted-foreground line-through'}`}>{m.antes}</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                    <span className={`transition-colors ${modo === 'depois' ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>{m.depois}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
