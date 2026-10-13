'use client'

import { useEffect, useState } from 'react'
import { Hand, MessageSquare, MousePointer2, Paperclip } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Kanban Card Move": quadro com três colunas e um cursor que pega cards e os arrasta para a coluna seguinte. O card
// pego levanta (escala, inclinação, sombra), viaja com mola junto do cursor e os de baixo sobem para fechar o vão;
// os contadores das colunas atualizam. Após quatro movimentos, o quadro volta ao estado inicial.
type ColId = 'todo' | 'doing' | 'done'
const COLS: ReadonlyArray<{ id: ColId; title: string; dot: string }> = [
  { id: 'todo', title: 'A fazer', dot: 'bg-muted-foreground' },
  { id: 'doing', title: 'Em andamento', dot: 'bg-amber-500' },
  { id: 'done', title: 'Concluído', dot: 'bg-emerald-500' },
]
const CARDS: Record<string, { title: string; tag: string; tone: string; who: string; comments: number }> = {
  c1: { title: 'Revisar copy da landing', tag: 'Marketing', tone: 'bg-rose-500/15 text-rose-600 dark:text-rose-400', who: 'AS', comments: 3 },
  c2: { title: 'Integrar Pix no checkout', tag: 'Dev', tone: 'bg-sky-500/15 text-sky-600 dark:text-sky-400', who: 'RF', comments: 5 },
  c3: { title: 'Pesquisa com clientes', tag: 'Produto', tone: 'bg-violet-500/15 text-violet-600 dark:text-violet-400', who: 'JU', comments: 1 },
  c4: { title: 'Ajustar régua de e-mails', tag: 'CRM', tone: 'bg-amber-500/15 text-amber-600 dark:text-amber-400', who: 'TH', comments: 2 },
  c5: { title: 'Publicar vaga de suporte', tag: 'RH', tone: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', who: 'LA', comments: 0 },
}
const INITIAL: Record<ColId, string[]> = { todo: ['c1', 'c2', 'c3'], doing: ['c4'], done: ['c5'] }
const MOVES: ReadonlyArray<{ id: string; from: ColId; to: ColId }> = [
  { id: 'c4', from: 'doing', to: 'done' },
  { id: 'c1', from: 'todo', to: 'doing' },
  { id: 'c2', from: 'todo', to: 'doing' },
  { id: 'c1', from: 'doing', to: 'done' },
]

const PAD = 10
const COL_W = 146
const GAP = 8
const HEAD = 40
const CARD_H = 62
const ROW = CARD_H + 8
const colIndex = (c: ColId) => COLS.findIndex((x) => x.id === c)
const posOf = (board: Record<ColId, string[]>, id: string) => {
  const col = COLS.find((c) => board[c.id].includes(id))!.id
  return { x: PAD + colIndex(col) * (COL_W + GAP) + 6, y: HEAD + board[col].indexOf(id) * ROW }
}
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function KanbanCardMove() {
  const [board, setBoard] = useState<Record<ColId, string[]>>(INITIAL)
  const [drag, setDrag] = useState<string | null>(null)
  const [cursor, setCursor] = useState({ x: 380, y: 250 })

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let b = INITIAL
      while (!cancelled) {
        b = INITIAL
        setBoard(b)
        await sleep(800)
        for (const m of MOVES) {
          if (cancelled) return
          const p = posOf(b, m.id)
          setCursor({ x: p.x + 92, y: p.y + 34 })
          await sleep(750)
          setDrag(m.id)
          await sleep(250)
          b = { ...b, [m.from]: b[m.from].filter((x) => x !== m.id), [m.to]: [m.id, ...b[m.to]] }
          setBoard(b)
          const q = posOf(b, m.id)
          setCursor({ x: q.x + 92, y: q.y + 34 })
          await sleep(750)
          setDrag(null)
          await sleep(450)
        }
        setCursor({ x: 380, y: 250 })
        await sleep(1400)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative h-[300px] w-[470px] overflow-hidden rounded-2xl border bg-muted/40 text-foreground">
      {COLS.map((c, i) => (
        <div key={c.id} className="absolute bottom-2.5 top-2.5 rounded-xl bg-background/70" style={{ left: PAD + i * (COL_W + GAP), width: COL_W }}>
          <div className="flex items-center gap-1.5 px-2.5 pt-2.5 text-[11px] font-medium">
            <span className={cn('size-2 rounded-full', c.dot)} />
            {c.title}
            <motion.span key={board[c.id].length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="ml-auto rounded-md bg-muted px-1.5 text-[10px] tabular-nums text-muted-foreground">
              {board[c.id].length}
            </motion.span>
          </div>
        </div>
      ))}

      {Object.entries(CARDS).map(([id, card]) => {
        const p = posOf(board, id)
        const dragging = drag === id
        const done = board.done.includes(id)
        return (
          <motion.div
            key={id}
            className="absolute left-0 top-0 rounded-lg border bg-card p-2 shadow-sm"
            style={{ width: COL_W - 12, height: CARD_H, zIndex: dragging ? 20 : 1 }}
            initial={false}
            animate={{ x: p.x, y: p.y, scale: dragging ? 1.05 : 1, rotate: dragging ? 3 : 0, boxShadow: dragging ? '0 12px 24px rgba(0,0,0,0.18)' : '0 1px 2px rgba(0,0,0,0.06)' }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <div className="flex items-center justify-between">
              <span className={cn('rounded px-1 py-px text-[9px] font-medium', card.tone)}>{card.tag}</span>
              <span className="flex size-4 items-center justify-center rounded-full bg-muted text-[7px] font-semibold">{card.who}</span>
            </div>
            <div className={cn('mt-1 truncate text-[11px] font-medium', done && 'text-muted-foreground line-through')}>{card.title}</div>
            <div className="mt-1 flex gap-2 text-[9px] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <MessageSquare className="size-2.5" /> {card.comments}
              </span>
              <span className="flex items-center gap-0.5">
                <Paperclip className="size-2.5" /> 1
              </span>
            </div>
          </motion.div>
        )
      })}

      <motion.div className="pointer-events-none absolute left-0 top-0 z-30" animate={{ x: cursor.x, y: cursor.y }} transition={{ type: 'spring', stiffness: 180, damping: 22 }}>
        {drag ? <Hand className="size-5 fill-background text-foreground" /> : <MousePointer2 className="size-5 fill-foreground text-background" />}
      </motion.div>
    </div>
  )
}
