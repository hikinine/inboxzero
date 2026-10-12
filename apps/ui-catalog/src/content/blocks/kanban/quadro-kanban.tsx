'use client'

import { useState } from 'react'
import { Calendar, ChevronRight, Filter, MessageSquare, Paperclip, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tag = 'Design' | 'Backend' | 'Bug' | 'Marketing' | 'Front-end'

const TAGS: Record<Tag, string> = {
  Design: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  Backend: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  Bug: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
  Marketing: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  'Front-end': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
}

interface Cartao {
  id: number
  titulo: string
  tags: Tag[]
  resp: string
  prazo: string
  atrasado?: boolean
  comentarios: number
  anexos?: number
}

interface Coluna {
  id: string
  titulo: string
  cor: string
  cartoes: Cartao[]
}

const INICIAL: Coluna[] = [
  {
    id: 'todo',
    titulo: 'A fazer',
    cor: 'bg-muted-foreground/50',
    cartoes: [
      { id: 1, titulo: 'Redesenhar tela de login', tags: ['Design'], resp: 'AS', prazo: '16 out', comentarios: 2 },
      { id: 2, titulo: 'Integração com Pagar.me', tags: ['Backend'], resp: 'BR', prazo: '20 out', comentarios: 0 },
      { id: 3, titulo: 'Landing da Black Friday', tags: ['Marketing', 'Design'], resp: 'CM', prazo: '24 out', comentarios: 5, anexos: 2 },
      { id: 4, titulo: 'Exportar contatos em CSV', tags: ['Backend'], resp: 'DL', prazo: '28 out', comentarios: 1 },
    ],
  },
  {
    id: 'doing',
    titulo: 'Em andamento',
    cor: 'bg-sky-500',
    cartoes: [
      { id: 5, titulo: 'Automação de boas-vindas', tags: ['Backend'], resp: 'BR', prazo: '14 out', comentarios: 3 },
      { id: 6, titulo: 'Novo onboarding em 3 passos', tags: ['Front-end', 'Design'], resp: 'AS', prazo: '15 out', comentarios: 8, anexos: 1 },
      { id: 7, titulo: 'Corrigir fuso horário no relatório', tags: ['Bug'], resp: 'DL', prazo: '10 out', atrasado: true, comentarios: 1 },
    ],
  },
  {
    id: 'review',
    titulo: 'Revisão',
    cor: 'bg-amber-500',
    cartoes: [
      { id: 8, titulo: 'Página de preços', tags: ['Front-end'], resp: 'CM', prazo: '13 out', comentarios: 4 },
      { id: 9, titulo: 'API de webhooks v2', tags: ['Backend'], resp: 'BR', prazo: '12 out', comentarios: 2, anexos: 3 },
    ],
  },
  {
    id: 'done',
    titulo: 'Concluído',
    cor: 'bg-emerald-500',
    cartoes: [
      { id: 10, titulo: 'Modo escuro', tags: ['Front-end'], resp: 'AS', prazo: '8 out', comentarios: 12 },
      { id: 11, titulo: 'Busca global com ⌘K', tags: ['Front-end'], resp: 'DL', prazo: '6 out', comentarios: 6 },
      { id: 12, titulo: 'Modelo de proposta comercial', tags: ['Design'], resp: 'CM', prazo: '3 out', comentarios: 2, anexos: 1 },
    ],
  },
]

export default function QuadroKanban() {
  const [colunas, setColunas] = useState<Coluna[]>(INICIAL)
  const [proximoId, setProximoId] = useState(100)

  function mover(colIdx: number, cartaoId: number) {
    if (colIdx >= colunas.length - 1) return
    setColunas((prev) => {
      const origem = prev[colIdx]
      const cartao = origem.cartoes.find((c) => c.id === cartaoId)
      if (!cartao) return prev
      return prev.map((col, i) => {
        if (i === colIdx) return { ...col, cartoes: col.cartoes.filter((c) => c.id !== cartaoId) }
        if (i === colIdx + 1) return { ...col, cartoes: [cartao, ...col.cartoes] }
        return col
      })
    })
  }

  function adicionar(colIdx: number) {
    const novo: Cartao = { id: proximoId, titulo: 'Nova tarefa', tags: [], resp: 'AS', prazo: 'sem prazo', comentarios: 0 }
    setProximoId(proximoId + 1)
    setColunas((prev) => prev.map((col, i) => (i === colIdx ? { ...col, cartoes: [...col.cartoes, novo] } : col)))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Produto · Sprint 42</h2>
            <p className="text-sm text-muted-foreground">6 a 20 de outubro · {colunas.reduce((n, c) => n + c.cartoes.length, 0)} tarefas</p>
          </div>
          <AvatarGroup className="ml-auto">
            {['AS', 'BR', 'CM', 'DL'].map((n) => (
              <Avatar key={n} size="sm">
                <AvatarFallback>{n}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
          <Button variant="outline" size="sm">
            <Filter data-icon="inline-start" /> Filtrar
          </Button>
          <Button size="sm" onClick={() => adicionar(0)}>
            <Plus data-icon="inline-start" /> Nova tarefa
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {colunas.map((col, colIdx) => (
            <div key={col.id} className="flex w-72 shrink-0 flex-col rounded-xl bg-muted/50 p-2">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <span className={cn('size-2 rounded-full', col.cor)} />
                <h3 className="text-sm font-medium">{col.titulo}</h3>
                <span className="rounded-full bg-background px-1.5 text-xs text-muted-foreground tabular-nums">{col.cartoes.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {col.cartoes.map((c) => (
                  <article key={c.id} className="group rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
                    {c.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {c.tags.map((t) => (
                          <span key={t} className={cn('rounded px-1.5 py-0.5 text-[11px] font-medium', TAGS[t])}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <p className={cn('flex-1 text-sm font-medium leading-snug', col.id === 'done' && 'text-muted-foreground')}>{c.titulo}</p>
                      {colIdx < colunas.length - 1 && (
                        <button type="button" aria-label={`Mover “${c.titulo}” para ${colunas[colIdx + 1].titulo}`} onClick={() => mover(colIdx, c.id)} className="-mt-0.5 -mr-1 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted focus-visible:opacity-100">
                          <ChevronRight className="size-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className={cn('flex items-center gap-1', c.atrasado && 'font-medium text-rose-500')}>
                        <Calendar className="size-3.5" /> {c.prazo}
                      </span>
                      {c.comentarios > 0 && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="size-3.5" /> {c.comentarios}
                        </span>
                      )}
                      {c.anexos && (
                        <span className="flex items-center gap-1">
                          <Paperclip className="size-3.5" /> {c.anexos}
                        </span>
                      )}
                      <Avatar size="sm" className="ml-auto">
                        <AvatarFallback>{c.resp}</AvatarFallback>
                      </Avatar>
                    </div>
                  </article>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 justify-start text-muted-foreground" onClick={() => adicionar(colIdx)}>
                <Plus data-icon="inline-start" /> Adicionar cartão
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
