'use client'

import { useState } from 'react'
import { ArrowRight, CalendarDays, Flag, ListChecks, SlidersHorizontal, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

type Prioridade = 'alta' | 'media' | 'baixa'
type Coluna = 'backlog' | 'progresso' | 'revisao' | 'feito'

interface Cartao {
  id: number
  titulo: string
  prioridade: Prioridade
  col: Coluna
  resp: string
  prazo: string
  feitas: number
  total: number
}

const COLUNAS: { id: Coluna; nome: string; cor: string; limite?: number }[] = [
  { id: 'backlog', nome: 'Backlog', cor: 'border-t-muted-foreground/40' },
  { id: 'progresso', nome: 'Em progresso', cor: 'border-t-sky-500', limite: 3 },
  { id: 'revisao', nome: 'Revisão', cor: 'border-t-violet-500' },
  { id: 'feito', nome: 'Feito', cor: 'border-t-emerald-500' },
]
const ORDEM: Coluna[] = ['backlog', 'progresso', 'revisao', 'feito']

const PRIORIDADE: Record<Prioridade, { label: string; cor: string; borda: string }> = {
  alta: { label: 'Alta', cor: 'text-rose-600 dark:text-rose-400', borda: 'border-l-rose-500' },
  media: { label: 'Média', cor: 'text-amber-600 dark:text-amber-400', borda: 'border-l-amber-500' },
  baixa: { label: 'Baixa', cor: 'text-sky-600 dark:text-sky-400', borda: 'border-l-sky-500' },
}

const EU = 'AS'

const INICIAL: Cartao[] = [
  { id: 1, titulo: 'Checkout com Pix e parcelamento', prioridade: 'alta', col: 'progresso', resp: 'AS', prazo: '14 out', feitas: 3, total: 5 },
  { id: 2, titulo: 'Relatório de churn por plano', prioridade: 'media', col: 'backlog', resp: 'BR', prazo: '20 out', feitas: 0, total: 4 },
  { id: 3, titulo: 'Erro ao importar CSV com acento', prioridade: 'alta', col: 'revisao', resp: 'CM', prazo: 'hoje', feitas: 2, total: 2 },
  { id: 4, titulo: 'Onboarding por e-mail (5 passos)', prioridade: 'baixa', col: 'backlog', resp: 'AS', prazo: '28 out', feitas: 1, total: 6 },
  { id: 5, titulo: 'Tema escuro no portal do cliente', prioridade: 'media', col: 'progresso', resp: 'DL', prazo: '16 out', feitas: 4, total: 7 },
  { id: 6, titulo: 'Webhook de pagamento duplicado', prioridade: 'alta', col: 'progresso', resp: 'AS', prazo: 'amanhã', feitas: 1, total: 3 },
  { id: 7, titulo: 'Guia de marca v2', prioridade: 'baixa', col: 'feito', resp: 'CM', prazo: '7 out', feitas: 3, total: 3 },
  { id: 8, titulo: 'Integração com RD Station', prioridade: 'media', col: 'feito', resp: 'BR', prazo: '9 out', feitas: 5, total: 5 },
]

export default function KanbanPrioridadeEFiltros() {
  const [cartoes, setCartoes] = useState<Cartao[]>(INICIAL)
  const [prioridades, setPrioridades] = useState<Prioridade[]>(['alta', 'media', 'baixa'])
  const [soMeus, setSoMeus] = useState(false)

  const togglePrioridade = (p: Prioridade) => setPrioridades((l) => (l.includes(p) ? l.filter((x) => x !== p) : [...l, p]))
  const avancar = (id: number) =>
    setCartoes((l) =>
      l.map((c) => {
        if (c.id !== id) return c
        const i = ORDEM.indexOf(c.col)
        return { ...c, col: ORDEM[Math.min(ORDEM.length - 1, i + 1)] ?? c.col }
      }),
    )

  const visiveis = cartoes.filter((c) => prioridades.includes(c.prioridade) && (!soMeus || c.resp === EU))

  return (
    <div className="w-full max-w-3xl space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card px-2 py-1.5">
        <span className="flex items-center gap-1.5 px-1 text-xs font-medium text-muted-foreground">
          <SlidersHorizontal className="size-3.5" /> Filtros
        </span>
        {(Object.keys(PRIORIDADE) as Prioridade[]).map((p) => (
          <Toggle key={p} size="sm" variant="outline" pressed={prioridades.includes(p)} onPressedChange={() => togglePrioridade(p)} aria-label={`Prioridade ${PRIORIDADE[p].label}`} className="h-6 gap-1 rounded-full px-2 text-xs data-[state=on]:bg-muted">
            <Flag className={cn('size-3', PRIORIDADE[p].cor)} /> {PRIORIDADE[p].label}
          </Toggle>
        ))}
        <span className="mx-1 h-4 w-px bg-border" aria-hidden />
        <Toggle size="sm" variant="outline" pressed={soMeus} onPressedChange={setSoMeus} className="h-6 gap-1 rounded-full px-2 text-xs">
          <User className="size-3" /> Só meus
        </Toggle>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {visiveis.length} de {cartoes.length} cartões
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[640px] grid-cols-4 gap-3">
          {COLUNAS.map((col) => {
            const itens = visiveis.filter((c) => c.col === col.id)
            const total = cartoes.filter((c) => c.col === col.id).length
            const estourou = col.limite !== undefined && total > col.limite
            return (
              <div key={col.id} className={cn('flex min-h-80 flex-col rounded-lg border border-t-2 bg-card', col.cor)}>
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-sm font-medium">{col.nome}</span>
                  <span className={cn('rounded-md bg-muted px-1.5 text-[11px] tabular-nums', estourou && 'bg-rose-500/10 font-medium text-rose-600 dark:text-rose-400')}>{col.limite ? `${total}/${col.limite}` : total}</span>
                  {estourou && (
                    <Badge variant="destructive" className="ml-auto h-4 px-1.5 text-[10px]">
                      Limite
                    </Badge>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 px-2 pb-2">
                  {itens.map((c) => {
                    const p = PRIORIDADE[c.prioridade]
                    const pct = Math.round((c.feitas / c.total) * 100)
                    return (
                      <div key={c.id} className={cn('group rounded-md border border-l-2 bg-background p-2.5 shadow-xs transition-shadow hover:shadow-sm', p.borda, col.id === 'feito' && 'opacity-70')}>
                        <div className="flex items-center justify-between gap-2">
                          <span className={cn('inline-flex items-center gap-1 text-[11px] font-medium', p.cor)}>
                            <Flag className="size-3" /> {p.label}
                          </span>
                          {col.id !== 'feito' && (
                            <Button size="icon-xs" variant="ghost" aria-label="Avançar etapa" className="opacity-0 transition-opacity group-hover:opacity-100" onClick={() => avancar(c.id)}>
                              <ArrowRight />
                            </Button>
                          )}
                        </div>
                        <p className={cn('mt-1 text-sm leading-snug', col.id === 'feito' && 'line-through decoration-muted-foreground/50')}>{c.titulo}</p>
                        <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1 tabular-nums">
                            <ListChecks className="size-3" /> {c.feitas}/{c.total}
                          </span>
                          <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                            <span className={cn('block h-full rounded-full', pct === 100 ? 'bg-emerald-500' : 'bg-primary')} style={{ width: `${pct}%` }} />
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className={cn('inline-flex items-center gap-1 text-[11px] text-muted-foreground', (c.prazo === 'hoje' || c.prazo === 'amanhã') && col.id !== 'feito' && 'font-medium text-amber-600 dark:text-amber-400')}>
                            <CalendarDays className="size-3" /> {c.prazo}
                          </span>
                          <Avatar size="sm" className={cn(c.resp === EU && 'ring-2 ring-primary/40')}>
                            <AvatarFallback className="text-[10px]">{c.resp}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    )
                  })}
                  {itens.length === 0 && <div className="rounded-md border border-dashed p-3 text-center text-xs text-muted-foreground">Nenhum cartão com esses filtros</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
