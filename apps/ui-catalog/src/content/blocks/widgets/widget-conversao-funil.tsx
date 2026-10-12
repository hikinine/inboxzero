'use client'

import { useState } from 'react'
import { ArrowDown, ArrowRight, Sparkles, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Mes = 'atual' | 'anterior'

const ETAPAS: { nome: string; valores: Record<Mes, number> }[] = [
  { nome: 'Visitantes', valores: { atual: 12480, anterior: 11210 } },
  { nome: 'Leads', valores: { atual: 3120, anterior: 2960 } },
  { nome: 'Qualificados', valores: { atual: 1040, anterior: 1180 } },
  { nome: 'Propostas', valores: { atual: 312, anterior: 290 } },
  { nome: 'Fechados', valores: { atual: 96, anterior: 71 } },
]
const TONS = ['bg-primary', 'bg-primary/85', 'bg-primary/70', 'bg-primary/55', 'bg-primary/40']
const MOTIVOS = [
  { motivo: 'Sem resposta após 2 tentativas', pct: 41 },
  { motivo: 'Orçamento abaixo do mínimo', pct: 27 },
  { motivo: 'Fechou com concorrente', pct: 18 },
  { motivo: 'Outros', pct: 14 },
]

function conv(a: number, b: number) {
  return Math.round((b / a) * 1000) / 10
}

export default function WidgetConversaoFunil() {
  const [mes, setMes] = useState<Mes>('atual')
  const valores = ETAPAS.map((e) => e.valores[mes])
  const max = valores[0]
  const conversoes = valores.slice(1).map((v, i) => conv(valores[i], v))
  const pior = conversoes.indexOf(Math.min(...conversoes))
  const total = conv(valores[0], valores[valores.length - 1])
  const totalOutro = conv(ETAPAS[0].valores[mes === 'atual' ? 'anterior' : 'atual'], ETAPAS[ETAPAS.length - 1].valores[mes === 'atual' ? 'anterior' : 'atual'])

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Funil de conversão</CardTitle>
            <CardDescription>Site e WhatsApp · {mes === 'atual' ? 'outubro' : 'setembro'} de 2026</CardDescription>
            <CardAction>
              <div className="inline-flex rounded-lg bg-muted p-0.5">
                {(['atual', 'anterior'] as Mes[]).map((m) => (
                  <button key={m} type="button" onClick={() => setMes(m)} aria-pressed={mes === m} className={cn('rounded-md px-2.5 py-1 text-xs font-medium transition-colors', mes === m ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    {m === 'atual' ? 'Este mês' : 'Mês passado'}
                  </button>
                ))}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ol className="space-y-1">
              {ETAPAS.map((e, i) => {
                const v = valores[i]
                const largura = Math.max(12, Math.sqrt(v / max) * 100)
                const fraco = i > 0 && i - 1 === pior
                return (
                  <li key={e.nome}>
                    {i > 0 && (
                      <div className="grid grid-cols-[96px_1fr_72px] items-center gap-3">
                        <span />
                        <span className={cn('flex items-center justify-center gap-1 py-0.5 text-[11px] tabular-nums', fraco ? 'font-medium text-rose-600 dark:text-rose-400' : 'text-muted-foreground')}>
                          <ArrowDown className="size-3" /> {conversoes[i - 1].toLocaleString('pt-BR')}%
                        </span>
                        <span />
                      </div>
                    )}
                    <div className="grid grid-cols-[96px_1fr_72px] items-center gap-3">
                      <span className={cn('flex items-center gap-1 text-sm', fraco && 'font-medium')}>
                        {fraco && <TriangleAlert className="size-3.5 text-rose-500" />}
                        {e.nome}
                      </span>
                      <div className="flex justify-center">
                        <div className={cn('h-9 rounded-md transition-[width] duration-500', TONS[i])} style={{ width: `${largura}%` }} title={`${e.nome}: ${v.toLocaleString('pt-BR')}`} />
                      </div>
                      <span className="text-right text-sm font-semibold tabular-nums">{v.toLocaleString('pt-BR')}</span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </CardContent>
          <CardFooter className="justify-between text-xs text-muted-foreground">
            <span>Largura das barras em escala ilustrativa.</span>
            <span>
              Conversão total <span className="font-semibold text-foreground tabular-nums">{total.toLocaleString('pt-BR')}%</span> · antes {totalOutro.toLocaleString('pt-BR')}%
            </span>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card size="sm">
            <CardContent className="grid grid-cols-3 divide-x text-center">
              <div>
                <p className="text-lg font-semibold tabular-nums">{valores[valores.length - 1]}</p>
                <p className="text-xs text-muted-foreground">Fechados</p>
              </div>
              <div>
                <p className="text-lg font-semibold tabular-nums">R$ 1.290</p>
                <p className="text-xs text-muted-foreground">Ticket médio</p>
              </div>
              <div>
                <p className="text-lg font-semibold tabular-nums">18 d</p>
                <p className="text-xs text-muted-foreground">Ciclo médio</p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TriangleAlert className="size-4 text-rose-500" /> Maior perda
              </CardTitle>
              <CardDescription>
                De {ETAPAS[pior].nome.toLowerCase()} para {ETAPAS[pior + 1].nome.toLowerCase()}: só {conversoes[pior].toLocaleString('pt-BR')}% avançam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOTIVOS.map((m) => (
                <div key={m.motivo}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{m.motivo}</span>
                    <span className="text-muted-foreground tabular-nums">{m.pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div className="h-full rounded-full bg-rose-500/70" style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                <Sparkles data-icon="inline-start" /> Criar automação de follow-up <ArrowRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
