'use client'

import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { ArrowDown, ChevronsUp, Equal, Flame, Plus, X, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Prioridade = 'urgente' | 'alta' | 'media' | 'baixa'
const ORDEM: Prioridade[] = ['urgente', 'alta', 'media', 'baixa']
const PRIORIDADE: Record<Prioridade, { label: string; icon: LucideIcon; classe: string; dot: string }> = {
  urgente: { label: 'Urgente', icon: Flame, classe: 'bg-rose-500/15 text-rose-700 dark:text-rose-400', dot: 'bg-rose-500' },
  alta: { label: 'Alta', icon: ChevronsUp, classe: 'bg-amber-500/15 text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  media: { label: 'Média', icon: Equal, classe: 'bg-sky-500/15 text-sky-700 dark:text-sky-400', dot: 'bg-sky-500' },
  baixa: { label: 'Baixa', icon: ArrowDown, classe: 'bg-muted text-muted-foreground', dot: 'bg-muted-foreground/60' },
}

interface Tarefa {
  id: number
  titulo: string
  prioridade: Prioridade
}
const TAREFAS_INICIAIS: Tarefa[] = [
  { id: 1, titulo: 'Checkout quebrado no Safari', prioridade: 'urgente' },
  { id: 2, titulo: 'Relatório mensal de vendas', prioridade: 'alta' },
  { id: 3, titulo: 'Atualizar logo no rodapé', prioridade: 'baixa' },
]

interface Tag {
  nome: string
  cor: string
}
const CORES = ['bg-sky-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-teal-500']
const TAGS_INICIAIS: Tag[] = [
  { nome: 'Black Friday', cor: 'bg-violet-500' },
  { nome: 'Indicação', cor: 'bg-emerald-500' },
  { nome: 'Enterprise', cor: 'bg-sky-500' },
  { nome: 'Recorrente', cor: 'bg-amber-500' },
  { nome: 'Região Sul', cor: 'bg-teal-500' },
  { nome: 'Onboarding', cor: 'bg-rose-500' },
]
const VISIVEIS = 4

export default function BadgePrioridadeTags() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS_INICIAIS)
  const [tags, setTags] = useState<Tag[]>(TAGS_INICIAIS)
  const [nova, setNova] = useState('')
  const [expandido, setExpandido] = useState(false)

  function ciclar(id: number) {
    setTarefas((ts) => ts.map((t) => (t.id === id ? { ...t, prioridade: ORDEM[(ORDEM.indexOf(t.prioridade) + 1) % ORDEM.length] ?? 'baixa' } : t)))
  }
  function adicionarTag() {
    const nome = nova.trim()
    if (!nome || tags.some((t) => t.nome.toLowerCase() === nome.toLowerCase())) return
    setTags((ts) => [...ts, { nome, cor: CORES[ts.length % CORES.length] ?? 'bg-sky-500' }])
    setNova('')
    setExpandido(true)
  }
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      adicionarTag()
    }
  }
  const mostradas = expandido ? tags : tags.slice(0, VISIVEIS)
  const ocultas = tags.length - mostradas.length

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Prioridade (preenchida e com ponto)</Legenda>
        <div className="flex flex-wrap items-center gap-2">
          {ORDEM.map((p) => {
            const { icon: Icon, label, classe } = PRIORIDADE[p]
            return (
              <Badge key={p} className={classe}>
                <Icon data-icon="inline-start" /> {label}
              </Badge>
            )
          })}
          <span className="mx-1 h-4 w-px bg-border" />
          {ORDEM.map((p) => (
            <Badge key={p} variant="outline">
              <span className={cn('size-1.5 rounded-full', PRIORIDADE[p].dot)} /> {PRIORIDADE[p].label}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Legenda>Em tarefas (clique na badge para alterar)</Legenda>
        <ul className="divide-y rounded-xl border">
          {tarefas.map((t) => {
            const { icon: Icon, label, classe } = PRIORIDADE[t.prioridade]
            return (
              <li key={t.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                <span className="w-12 font-mono text-xs text-muted-foreground">T-{t.id + 40}</span>
                <span className="flex-1 truncate">{t.titulo}</span>
                <Badge render={<button type="button" onClick={() => ciclar(t.id)} aria-label={`Prioridade ${label}, clique para alterar`} />} className={cn('cursor-pointer hover:opacity-80', classe)}>
                  <Icon data-icon="inline-start" /> {label}
                </Badge>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
        <Legenda>Tags removíveis com cor e limite</Legenda>
        <div className="rounded-xl border p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {mostradas.map((t) => (
              <Badge key={t.nome} variant="outline" className="pr-1">
                <span className={cn('size-1.5 rounded-full', t.cor)} />
                {t.nome}
                <button
                  type="button"
                  aria-label={`Remover ${t.nome}`}
                  onClick={() => setTags((ts) => ts.filter((x) => x.nome !== t.nome))}
                  className="ml-0.5 flex size-3.5 items-center justify-center rounded-full hover:bg-foreground/10"
                >
                  <X className="size-2.5" />
                </button>
              </Badge>
            ))}
            {ocultas > 0 && (
              <Badge render={<button type="button" onClick={() => setExpandido(true)} />} variant="secondary" className="cursor-pointer tabular-nums">
                +{ocultas}
              </Badge>
            )}
            {expandido && tags.length > VISIVEIS && (
              <Badge render={<button type="button" onClick={() => setExpandido(false)} />} variant="ghost" className="cursor-pointer">
                Mostrar menos
              </Badge>
            )}
          </div>
          <div className="mt-2 flex items-center gap-1.5 border-t pt-2">
            <Plus className="size-3.5 text-muted-foreground" />
            <input
              aria-label="Nova tag"
              className="h-6 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              placeholder="Adicionar tag e pressionar Enter"
              value={nova}
              onChange={(e) => setNova(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <span className="text-[11px] text-muted-foreground tabular-nums">{tags.length} tags</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
