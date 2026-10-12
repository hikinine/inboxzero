'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, BadgeCheck, Globe, Instagram, Mail, MessageCircle, Phone } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Metrica = 'leads' | 'receita'

interface Canal {
  nome: string
  Icon: LucideIcon
  barra: string
  fundo: string
  leads: number
  receita: number
  deltaLeads: number
  deltaReceita: number
}

const CANAIS: Canal[] = [
  { nome: 'WhatsApp', Icon: MessageCircle, barra: 'bg-emerald-500', fundo: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', leads: 412, receita: 86400, deltaLeads: 18, deltaReceita: 22 },
  { nome: 'Instagram', Icon: Instagram, barra: 'bg-rose-500', fundo: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', leads: 286, receita: 41200, deltaLeads: 9, deltaReceita: -4 },
  { nome: 'E-mail', Icon: Mail, barra: 'bg-sky-500', fundo: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', leads: 174, receita: 38900, deltaLeads: -6, deltaReceita: 3 },
  { nome: 'Site', Icon: Globe, barra: 'bg-violet-500', fundo: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', leads: 139, receita: 27300, deltaLeads: 12, deltaReceita: 15 },
  { nome: 'Telefone', Icon: Phone, barra: 'bg-amber-500', fundo: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', leads: 58, receita: 19800, deltaLeads: -11, deltaReceita: -9 },
]

function fmt(v: number, metrica: Metrica) {
  return metrica === 'leads' ? v.toLocaleString('pt-BR') : `R$ ${(v / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`
}

export default function EstatisticasCanalProgresso() {
  const [metrica, setMetrica] = useState<Metrica>('leads')
  const ordenados = [...CANAIS].sort((a, b) => b[metrica] - a[metrica])
  const total = CANAIS.reduce((n, c) => n + c[metrica], 0)
  const melhor = ordenados[0]
  const maior = melhor[metrica]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por canal</CardTitle>
            <CardDescription>Outubro de 2026 · {fmt(total, metrica)} no total</CardDescription>
            <CardAction>
              <div className="inline-flex rounded-lg bg-muted p-0.5">
                {(['leads', 'receita'] as Metrica[]).map((m) => (
                  <button key={m} type="button" onClick={() => setMetrica(m)} aria-pressed={metrica === m} className={cn('rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors', metrica === m ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    {m}
                  </button>
                ))}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            {ordenados.map((c) => {
              const v = c[metrica]
              const delta = metrica === 'leads' ? c.deltaLeads : c.deltaReceita
              const share = Math.round((v / total) * 100)
              return (
                <div key={c.nome} className="flex items-center gap-3">
                  <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', c.fundo)}>
                    <c.Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="font-medium">{c.nome}</span>
                      <span className="flex items-center gap-2 tabular-nums">
                        <span className={cn('flex items-center text-xs', delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                          {delta >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                          {Math.abs(delta)}%
                        </span>
                        <span className="font-semibold">{fmt(v, metrica)}</span>
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-muted">
                        <div className={cn('h-full rounded-full transition-[width] duration-500', c.barra)} style={{ width: `${(v / maior) * 100}%` }} />
                      </div>
                      <span className="w-8 text-right text-[11px] text-muted-foreground tabular-nums">{share}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Variação comparada a setembro. Barras proporcionais ao melhor canal.</CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <BadgeCheck className="size-4 text-emerald-500" /> Melhor canal em {metrica}
              </CardDescription>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span className={cn('flex size-8 items-center justify-center rounded-lg', melhor.fundo)}>
                  <melhor.Icon className="size-4" />
                </span>
                {melhor.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-semibold tabular-nums">{fmt(melhor[metrica], metrica)}</p>
                <p className="text-sm text-muted-foreground">{Math.round((melhor[metrica] / total) * 100)}% de tudo que entrou no mês</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Custo por lead</p>
                  <p className="font-semibold tabular-nums">R$ 8,40</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Tempo de resposta</p>
                  <p className="font-semibold tabular-nums">3 min</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Dica: redirecione 20% do orçamento de telefone para este canal.</CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
