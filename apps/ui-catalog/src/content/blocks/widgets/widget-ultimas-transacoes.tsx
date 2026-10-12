'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownLeft, ArrowRight, ArrowUpRight, Briefcase, CreditCard, Receipt, ShoppingBag, Smartphone, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Tipo = 'entrada' | 'saida'
type Filtro = 'todas' | Tipo
type Dia = 'Hoje' | 'Ontem' | 'Sexta, 9 de outubro'

interface Transacao {
  id: number
  nome: string
  categoria: string
  Icon: LucideIcon
  tipo: Tipo
  valor: number
  dia: Dia
  hora: string
  pendente?: boolean
}

const TRANSACOES: Transacao[] = [
  { id: 1, nome: 'Clínica Vida · fatura #4821', categoria: 'Receita', Icon: Briefcase, tipo: 'entrada', valor: 4280, dia: 'Hoje', hora: '14:32' },
  { id: 2, nome: 'AWS · hospedagem', categoria: 'Infraestrutura', Icon: Zap, tipo: 'saida', valor: 1289.4, dia: 'Hoje', hora: '09:10' },
  { id: 3, nome: 'Assinatura Figma', categoria: 'Software', Icon: Smartphone, tipo: 'saida', valor: 240, dia: 'Hoje', hora: '08:00', pendente: true },
  { id: 4, nome: 'Bistrô Oliva · Pix', categoria: 'Receita', Icon: Briefcase, tipo: 'entrada', valor: 890, dia: 'Ontem', hora: '17:21' },
  { id: 5, nome: 'Kalunga · material de escritório', categoria: 'Compras', Icon: ShoppingBag, tipo: 'saida', valor: 312.75, dia: 'Ontem', hora: '11:05' },
  { id: 6, nome: 'DAS · Simples Nacional', categoria: 'Impostos', Icon: Receipt, tipo: 'saida', valor: 2104.3, dia: 'Sexta, 9 de outubro', hora: '10:00' },
  { id: 7, nome: 'Agência Pulso · parcela 2 de 3', categoria: 'Receita', Icon: Briefcase, tipo: 'entrada', valor: 4166.67, dia: 'Sexta, 9 de outubro', hora: '09:48' },
  { id: 8, nome: 'Fatura do cartão corporativo', categoria: 'Cartão', Icon: CreditCard, tipo: 'saida', valor: 3870.12, dia: 'Sexta, 9 de outubro', hora: '06:00' },
]
const DIAS: Dia[] = ['Hoje', 'Ontem', 'Sexta, 9 de outubro']
const FILTROS: { id: Filtro; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'entrada', label: 'Entradas' },
  { id: 'saida', label: 'Saídas' },
]
const SEMANA = [
  { d: 'seg', e: 3.2, s: 1.1 },
  { d: 'ter', e: 1.4, s: 2.6 },
  { d: 'qua', e: 5.1, s: 0.8 },
  { d: 'qui', e: 2.2, s: 1.9 },
  { d: 'sex', e: 4.2, s: 6.0 },
  { d: 'sáb', e: 0.9, s: 0.3 },
  { d: 'dom', e: 4.3, s: 1.5 },
]
const MAX_SEMANA = 6

function brl(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function WidgetUltimasTransacoes() {
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const visiveis = TRANSACOES.filter((t) => filtro === 'todas' || t.tipo === filtro)
  const entradas = SEMANA.reduce((n, d) => n + d.e, 0)
  const saidas = SEMANA.reduce((n, d) => n + d.s, 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Últimas transações</CardTitle>
            <CardDescription>Conta principal · Banco Vetor</CardDescription>
            <CardAction>
              <div className="inline-flex rounded-lg bg-muted p-0.5">
                {FILTROS.map((f) => (
                  <button key={f.id} type="button" onClick={() => setFiltro(f.id)} aria-pressed={filtro === f.id} className={cn('rounded-md px-2.5 py-1 text-xs font-medium transition-colors', filtro === f.id ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                    {f.label}
                  </button>
                ))}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            {DIAS.map((dia) => {
              const doDia = visiveis.filter((t) => t.dia === dia)
              if (!doDia.length) return null
              return (
                <div key={dia}>
                  <p className="bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">{dia}</p>
                  <ul className="divide-y">
                    {doDia.map((t) => {
                      const entrada = t.tipo === 'entrada'
                      return (
                        <li key={t.id} className="flex items-center gap-3 px-4 py-2.5">
                          <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', entrada ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground')}>
                            <t.Icon className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{t.nome}</p>
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              {t.categoria} · {t.hora}
                              {t.pendente && (
                                <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
                                  Pendente
                                </Badge>
                              )}
                            </p>
                          </div>
                          <span className={cn('flex items-center gap-1 text-sm font-semibold tabular-nums', entrada ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground')}>
                            {entrada ? <ArrowDownLeft className="size-3.5" /> : <ArrowUpRight className="size-3.5 text-muted-foreground" />}
                            {entrada ? '+' : '−'} {brl(t.valor)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="ghost" size="sm">
              Ver extrato completo <ArrowRight data-icon="inline-end" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Saldo disponível</CardDescription>
            <CardTitle className="text-3xl tabular-nums">{brl(28414.9)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="flex items-end justify-between text-xs text-muted-foreground">
                <span>Movimentação da semana</span>
                <span>em R$ mil</span>
              </div>
              <div className="mt-3 flex h-24 items-end gap-2">
                {SEMANA.map((d) => (
                  <div key={d.d} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex h-20 w-full items-end justify-center gap-0.5">
                      <div className="w-1/2 rounded-t-sm bg-emerald-500" style={{ height: `${(d.e / MAX_SEMANA) * 100}%` }} title={`Entradas: R$ ${d.e} mil`} />
                      <div className="w-1/2 rounded-t-sm bg-muted-foreground/30" style={{ height: `${(d.s / MAX_SEMANA) * 100}%` }} title={`Saídas: R$ ${d.s} mil`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{d.d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="size-2 rounded-sm bg-emerald-500" /> Entradas
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums">R$ {entradas.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="size-2 rounded-sm bg-muted-foreground/30" /> Saídas
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums">R$ {saidas.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">Próximo lançamento previsto: folha de pagamento em 5 dias.</CardFooter>
        </Card>
      </div>
    </section>
  )
}
