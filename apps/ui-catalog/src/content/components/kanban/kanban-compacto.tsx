'use client'

import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ColunaId = 'todo' | 'doing' | 'done'
type Tag = 'Design' | 'Dev' | 'Bug' | 'Conteúdo'
interface Cartao {
  id: number
  titulo: string
  tag: Tag
  ini: string
  prazo: string
  atrasado?: boolean
  col: ColunaId
}

const COLUNAS: { id: ColunaId; nome: string; cor: string }[] = [
  { id: 'todo', nome: 'A fazer', cor: 'bg-muted-foreground/60' },
  { id: 'doing', nome: 'Em andamento', cor: 'bg-sky-500' },
  { id: 'done', nome: 'Concluído', cor: 'bg-emerald-500' },
]
const ORDEM: ColunaId[] = ['todo', 'doing', 'done']
const TAG: Record<Tag, string> = {
  Design: 'border-transparent bg-violet-500/10 text-violet-700 dark:text-violet-300',
  Dev: 'border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300',
  Bug: 'border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-300',
  Conteúdo: 'border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-300',
}

const INICIAL: Cartao[] = [
  { id: 1, titulo: 'Landing da campanha de outubro', tag: 'Design', ini: 'AS', prazo: '14 out', col: 'todo' },
  { id: 2, titulo: 'Integração com Pix', tag: 'Dev', ini: 'BR', prazo: '16 out', col: 'todo' },
  { id: 3, titulo: 'Erro no login social', tag: 'Bug', ini: 'CM', prazo: 'hoje', atrasado: true, col: 'doing' },
  { id: 4, titulo: 'Sequência de onboarding por e-mail', tag: 'Conteúdo', ini: 'DL', prazo: '18 out', col: 'doing' },
  { id: 5, titulo: 'Dashboard de métricas', tag: 'Dev', ini: 'EF', prazo: '9 out', col: 'done' },
  { id: 6, titulo: 'Guia de marca v2', tag: 'Design', ini: 'AS', prazo: '7 out', col: 'done' },
  { id: 7, titulo: 'Relatório de churn', tag: 'Conteúdo', ini: 'BR', prazo: '5 out', col: 'done' },
]

export default function KanbanCompacto() {
  const [cartoes, setCartoes] = useState<Cartao[]>(INICIAL)
  const mover = (id: number, delta: 1 | -1) =>
    setCartoes((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const i = Math.max(0, Math.min(ORDEM.length - 1, ORDEM.indexOf(c.col) + delta))
        return { ...c, col: ORDEM[i] }
      }),
    )

  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
      {COLUNAS.map((col, ci) => {
        const itens = cartoes.filter((c) => c.col === col.id)
        return (
          <div key={col.id} className="flex min-h-72 flex-col rounded-xl bg-muted/50 p-2">
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className={cn('size-2 rounded-full', col.cor)} />
              <span className="text-sm font-medium">{col.nome}</span>
              <span className="rounded-full bg-background px-1.5 text-xs text-muted-foreground tabular-nums">{itens.length}</span>
              <Button size="icon-xs" variant="ghost" className="ml-auto" aria-label={`Adicionar em ${col.nome}`}>
                <Plus />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {itens.map((c) => (
                <div key={c.id} className={cn('group rounded-lg border bg-card p-2.5 shadow-xs', col.id === 'done' && 'opacity-80')}>
                  <div className="flex items-start justify-between gap-1">
                    <Badge variant="outline" className={cn('h-4 px-1.5 text-[10px]', TAG[c.tag])}>
                      {c.tag}
                    </Badge>
                    <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
                      <Button size="icon-xs" variant="ghost" aria-label="Mover para a esquerda" disabled={ci === 0} onClick={() => mover(c.id, -1)}>
                        <ChevronLeft />
                      </Button>
                      <Button size="icon-xs" variant="ghost" aria-label="Mover para a direita" disabled={ci === COLUNAS.length - 1} onClick={() => mover(c.id, 1)}>
                        <ChevronRight />
                      </Button>
                    </div>
                  </div>
                  <div className={cn('mt-1.5 text-sm leading-snug font-medium', col.id === 'done' && 'line-through decoration-muted-foreground/50')}>{c.titulo}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={cn('inline-flex items-center gap-1 text-xs text-muted-foreground', c.atrasado && col.id !== 'done' && 'font-medium text-destructive')}>
                      <CalendarDays className="size-3" /> {c.prazo}
                    </span>
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px]">{c.ini}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
              {itens.length === 0 && <div className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">Nada aqui</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
