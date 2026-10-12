'use client'

import { useState } from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Tarefa {
  id: string
  titulo: string
  feita: boolean
  filhos?: Tarefa[]
}

const INICIAL: Tarefa[] = [
  {
    id: '1',
    titulo: 'Lançar campanha de outubro',
    feita: false,
    filhos: [
      { id: '1.1', titulo: 'Aprovar peças com o time de design', feita: true },
      {
        id: '1.2',
        titulo: 'Configurar automação no WhatsApp',
        feita: false,
        filhos: [
          { id: '1.2.1', titulo: 'Escrever as 3 mensagens da sequência', feita: true },
          { id: '1.2.2', titulo: 'Definir gatilho de entrada', feita: false },
        ],
      },
      { id: '1.3', titulo: 'Agendar disparo para 14/10, 9h', feita: false },
    ],
  },
  {
    id: '2',
    titulo: 'Fechar proposta com a Kavo',
    feita: false,
    filhos: [
      { id: '2.1', titulo: 'Enviar contrato revisado', feita: true },
      { id: '2.2', titulo: 'Confirmar data de implantação', feita: true },
    ],
  },
  { id: '3', titulo: 'Revisar metas do trimestre', feita: true },
]

function contar(t: Tarefa): [number, number] {
  if (!t.filhos?.length) return [t.feita ? 1 : 0, 1]
  return t.filhos.reduce<[number, number]>(
    (acc, f) => {
      const [a, b] = contar(f)
      return [acc[0] + a, acc[1] + b]
    },
    [0, 0],
  )
}

function marcar(lista: Tarefa[], id: string, feita: boolean): Tarefa[] {
  return lista.map((t) => {
    if (t.id === id) return marcarTudo(t, feita)
    if (t.filhos) {
      const filhos = marcar(t.filhos, id, feita)
      return { ...t, filhos, feita: filhos.every((f) => f.feita) }
    }
    return t
  })
}

const marcarTudo = (t: Tarefa, feita: boolean): Tarefa => ({ ...t, feita, filhos: t.filhos?.map((f) => marcarTudo(f, feita)) })

function Linha({ t, nivel, onToggle, aberto, setAberto }: { t: Tarefa; nivel: number; onToggle: (id: string, v: boolean) => void; aberto: Record<string, boolean>; setAberto: (id: string) => void }) {
  const temFilhos = !!t.filhos?.length
  const [feitas, total] = contar(t)
  const expandido = aberto[t.id] ?? true
  return (
    <li>
      <div className={cn('group flex items-center gap-2 rounded-md py-1.5 pr-2 hover:bg-muted/60', nivel > 0 && 'ml-5 border-l pl-3')} style={{ marginLeft: nivel > 0 ? nivel * 20 : undefined }}>
        {temFilhos ? (
          <button type="button" onClick={() => setAberto(t.id)} aria-label={expandido ? 'Recolher subtarefas' : 'Expandir subtarefas'} className="flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            <ChevronRight className={cn('size-3.5 transition-transform', expandido && 'rotate-90')} />
          </button>
        ) : (
          <span className="size-5" aria-hidden />
        )}
        <Checkbox id={`tarefa-${t.id}`} checked={t.feita} onCheckedChange={(v) => onToggle(t.id, v === true)} />
        <Label htmlFor={`tarefa-${t.id}`} className={cn('flex-1 cursor-pointer font-normal', t.feita && 'text-muted-foreground line-through decoration-muted-foreground/60', nivel === 0 && !t.feita && 'font-medium')}>
          {t.titulo}
        </Label>
        {temFilhos && (
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground tabular-nums">
            <span className="h-1 w-10 overflow-hidden rounded-full bg-muted">
              <span className={cn('block h-full rounded-full', feitas === total ? 'bg-emerald-500' : 'bg-primary')} style={{ width: `${(feitas / total) * 100}%` }} />
            </span>
            {feitas}/{total}
          </span>
        )}
      </div>
      {temFilhos && expandido && (
        <ul>
          {t.filhos!.map((f) => (
            <Linha key={f.id} t={f} nivel={nivel + 1} onToggle={onToggle} aberto={aberto} setAberto={setAberto} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function ListaDeTarefasAninhadas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(INICIAL)
  const [aberto, setAbertoMap] = useState<Record<string, boolean>>({})
  const [nova, setNova] = useState('')
  const [feitas, total] = tarefas.reduce<[number, number]>(
    (acc, t) => {
      const [a, b] = contar(t)
      return [acc[0] + a, acc[1] + b]
    },
    [0, 0],
  )

  const adicionar = () => {
    const titulo = nova.trim()
    if (!titulo) return
    setTarefas((l) => [...l, { id: String(Date.now()), titulo, feita: false }])
    setNova('')
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <div className="text-sm font-medium">Semana 42 · Comercial</div>
          <div className="text-xs text-muted-foreground tabular-nums">
            {feitas} de {total} itens concluídos
          </div>
        </div>
        <span className="text-sm font-semibold tabular-nums">{Math.round((feitas / total) * 100)}%</span>
      </div>
      <ul className="p-2">
        {tarefas.map((t) => (
          <Linha key={t.id} t={t} nivel={0} onToggle={(id, v) => setTarefas((l) => marcar(l, id, v))} aberto={aberto} setAberto={(id) => setAbertoMap((m) => ({ ...m, [id]: !(m[id] ?? true) }))} />
        ))}
      </ul>
      <form
        className="flex items-center gap-2 border-t p-2"
        onSubmit={(e) => {
          e.preventDefault()
          adicionar()
        }}
      >
        <Plus className="ml-1 size-4 text-muted-foreground" />
        <Input value={nova} onChange={(e) => setNova(e.target.value)} placeholder="Adicionar tarefa…" aria-label="Nova tarefa" className="h-7 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent" />
      </form>
    </div>
  )
}
