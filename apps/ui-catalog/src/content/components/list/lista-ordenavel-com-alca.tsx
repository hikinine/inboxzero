'use client'

import { useState, type KeyboardEvent } from 'react'
import { Reorder, useDragControls } from 'motion/react'
import { Bug, Flag, GripHorizontal, GripVertical, Palette, Rocket, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Tarefa {
  id: string
  titulo: string
  tipo: 'Bug' | 'Feature' | 'Design' | 'Segurança'
  pontos: number
}

const TAREFAS: Tarefa[] = [
  { id: 't1', titulo: 'Corrigir cálculo de frete para o Norte', tipo: 'Bug', pontos: 3 },
  { id: 't2', titulo: 'Checkout com Pix parcelado', tipo: 'Feature', pontos: 8 },
  { id: 't3', titulo: 'Novo onboarding do lojista', tipo: 'Design', pontos: 5 },
  { id: 't4', titulo: 'Rotação das chaves de API', tipo: 'Segurança', pontos: 2 },
  { id: 't5', titulo: 'Exportar pedidos em CSV', tipo: 'Feature', pontos: 3 },
]

const ICONE = { Bug, Feature: Rocket, Design: Palette, 'Segurança': ShieldCheck } as const
const COR = {
  Bug: 'text-rose-500 bg-rose-500/10',
  Feature: 'text-sky-500 bg-sky-500/10',
  Design: 'text-violet-500 bg-violet-500/10',
  'Segurança': 'text-emerald-500 bg-emerald-500/10',
} as const

function mover<T>(lista: T[], de: number, para: number) {
  if (para < 0 || para >= lista.length) return lista
  const nova = [...lista]
  const [item] = nova.splice(de, 1)
  nova.splice(para, 0, item)
  return nova
}

function ItemTarefa({ tarefa, posicao, total, onMover }: { tarefa: Tarefa; posicao: number; total: number; onMover: (delta: number) => void }) {
  const controls = useDragControls()
  const Icone = ICONE[tarefa.tipo]

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onMover(-1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onMover(1)
    }
  }

  return (
    <Reorder.Item
      value={tarefa}
      dragListener={false}
      dragControls={controls}
      className="relative flex items-center gap-3 rounded-lg border bg-card px-2 py-2.5 shadow-xs"
      whileDrag={{ scale: 1.02, boxShadow: '0 12px 28px -8px rgb(0 0 0 / 0.25)', zIndex: 10 }}
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        onKeyDown={onKey}
        aria-label={`Mover “${tarefa.titulo}”, posição ${posicao} de ${total}. Use as setas para cima e para baixo.`}
        className="flex h-8 w-6 cursor-grab touch-none items-center justify-center rounded text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </button>
      <span className="w-5 text-center font-mono text-xs tabular-nums text-muted-foreground">{posicao}</span>
      <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-md', COR[tarefa.tipo])}>
        <Icone className="size-3.5" />
      </span>
      <span className="flex-1 truncate text-sm font-medium">{tarefa.titulo}</span>
      <Badge variant="outline" className="font-mono tabular-nums">
        {tarefa.pontos} pts
      </Badge>
    </Reorder.Item>
  )
}

const COLUNAS = ['Cliente', 'Pedido', 'Status', 'Valor', 'Data'] as const
type Coluna = (typeof COLUNAS)[number]

function Chip({ coluna, onMover }: { coluna: Coluna; onMover: (delta: number) => void }) {
  const controls = useDragControls()
  return (
    <Reorder.Item value={coluna} dragListener={false} dragControls={controls} className="flex items-center gap-1 rounded-full border bg-background py-1 pr-3 pl-1 text-sm" whileDrag={{ scale: 1.06 }}>
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            onMover(-1)
          }
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            onMover(1)
          }
        }}
        aria-label={`Mover coluna ${coluna}`}
        className="flex size-6 cursor-grab touch-none items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <GripHorizontal className="size-3.5" />
      </button>
      {coluna}
    </Reorder.Item>
  )
}

export default function ListaOrdenavelComAlca() {
  const [tarefas, setTarefas] = useState(TAREFAS)
  const [colunas, setColunas] = useState<Coluna[]>([...COLUNAS])
  const total = tarefas.reduce((a, t) => a + t.pontos, 0)

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Flag className="size-4 text-muted-foreground" /> Prioridades do sprint 42
          </div>
          <span className="text-xs text-muted-foreground">{total} pontos</span>
        </div>
        <Reorder.Group axis="y" values={tarefas} onReorder={setTarefas} className="space-y-2">
          {tarefas.map((t, i) => (
            <ItemTarefa key={t.id} tarefa={t} posicao={i + 1} total={tarefas.length} onMover={(d) => setTarefas((l) => mover(l, i, i + d))} />
          ))}
        </Reorder.Group>
        <p className="mt-2 text-xs text-muted-foreground">Arraste pela alça ou foque nela e use ↑ ↓.</p>
      </div>

      <div className="rounded-xl border bg-muted/40 p-4">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Ordem das colunas da tabela</div>
        <Reorder.Group axis="x" values={colunas} onReorder={setColunas} className="flex flex-wrap gap-2">
          {colunas.map((c, i) => (
            <Chip key={c} coluna={c} onMover={(d) => setColunas((l) => mover(l, i, i + d))} />
          ))}
        </Reorder.Group>
      </div>
    </div>
  )
}
