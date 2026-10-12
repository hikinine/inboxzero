'use client'

import { useState } from 'react'
import type { DragEvent } from 'react'
import { ArrowDown, ArrowUp, Backpack, Check, Coffee, Footprints, GripVertical, Headphones, RotateCcw, Save, Watch, Camera, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Item {
  id: string
  name: string
  category: string
  tag?: 'Destaque' | 'Novo' | 'Promoção'
  price: number
  gradient: string
  Icon: LucideIcon
}

const INITIAL: Item[] = [
  { id: 'v1', name: 'Tênis Aero Run Max 2', category: 'Tênis', tag: 'Destaque', price: 549.9, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints },
  { id: 'v2', name: 'Fone Nimbus ANC Pro', category: 'Fones', tag: 'Promoção', price: 399.9, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'v3', name: 'Cafeteira Kaffa Espresso', category: 'Cafeteiras', tag: 'Novo', price: 1290, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'v4', name: 'Mochila Urban 25L', category: 'Mochilas', price: 289.9, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'v5', name: 'Relógio Pulse Fit', category: 'Relógios', tag: 'Novo', price: 649.9, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
  { id: 'v6', name: 'Câmera Instantânea Lumi', category: 'Câmeras', price: 479, gradient: 'from-pink-400 to-rose-600', Icon: Camera },
]
const TAG_TONE: Record<NonNullable<Item['tag']>, 'default' | 'secondary' | 'outline'> = { Destaque: 'default', Novo: 'secondary', Promoção: 'outline' }

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DatatableComArrastarESoltar() {
  const [rows, setRows] = useState<Item[]>(INITIAL)
  const [saved, setSaved] = useState<Item[]>(INITIAL)
  const [dragId, setDragId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [justSaved, setJustSaved] = useState(false)

  const changed = rows.some((r, i) => r.id !== saved[i]?.id)

  const move = (from: string, to: string) =>
    setRows((list) => {
      const a = list.findIndex((r) => r.id === from)
      const b = list.findIndex((r) => r.id === to)
      if (a < 0 || b < 0 || a === b) return list
      const next = [...list]
      const [item] = next.splice(a, 1)
      if (item) next.splice(b, 0, item)
      return next
    })

  const shift = (id: string, delta: -1 | 1) =>
    setRows((list) => {
      const i = list.findIndex((r) => r.id === id)
      const j = i + delta
      if (i < 0 || j < 0 || j >= list.length) return list
      const next = [...list]
      const a = next[i]
      const b = next[j]
      if (!a || !b) return list
      next[i] = b
      next[j] = a
      return next
    })

  const reset = () => {
    setDragId(null)
    setOverId(null)
  }
  const onDragStart = (e: DragEvent<HTMLTableRowElement>, id: string) => {
    setDragId(id)
    setJustSaved(false)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }
  const onDragOver = (e: DragEvent<HTMLTableRowElement>, id: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (overId !== id) setOverId(id)
  }
  const onDrop = (e: DragEvent<HTMLTableRowElement>, id: string) => {
    e.preventDefault()
    const from = dragId ?? e.dataTransfer.getData('text/plain')
    if (from) move(from, id)
    reset()
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ordem da vitrine</h2>
            <p className="mt-1 text-sm text-muted-foreground">Arraste pela alça ou use as setas para reordenar os produtos da página inicial.</p>
          </div>
          <div className="flex items-center gap-2">
            {justSaved && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <Check className="size-4" /> Ordem salva
              </span>
            )}
            <Button variant="outline" size="sm" disabled={!changed} onClick={() => setRows(saved)}>
              <RotateCcw data-icon="inline-start" /> Restaurar
            </Button>
            <Button
              size="sm"
              disabled={!changed}
              onClick={() => {
                setSaved(rows)
                setJustSaved(true)
              }}
            >
              <Save data-icon="inline-start" /> Salvar ordem
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead className="w-14">Pos.</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Selo</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow
                  key={r.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, r.id)}
                  onDragOver={(e) => onDragOver(e, r.id)}
                  onDrop={(e) => onDrop(e, r.id)}
                  onDragEnd={reset}
                  onDragLeave={() => setOverId((o) => (o === r.id ? null : o))}
                  className={cn('transition-colors', dragId === r.id && 'opacity-40', overId === r.id && dragId !== r.id && 'border-t-2 border-t-primary')}
                >
                  <TableCell>
                    <span className="flex cursor-grab items-center text-muted-foreground active:cursor-grabbing" aria-hidden="true">
                      <GripVertical className="size-4" />
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">{i + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', r.gradient)}>
                        <r.Icon className="size-4 text-white/90" />
                      </div>
                      <span className="font-medium">{r.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.category}</TableCell>
                  <TableCell>{r.tag && <Badge variant={TAG_TONE[r.tag]}>{r.tag}</Badge>}</TableCell>
                  <TableCell className="text-right tabular-nums">{brl(r.price)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-0.5">
                      <Button variant="ghost" size="icon-xs" aria-label={`Mover ${r.name} para cima`} disabled={i === 0} onClick={() => shift(r.id, -1)}>
                        <ArrowUp />
                      </Button>
                      <Button variant="ghost" size="icon-xs" aria-label={`Mover ${r.name} para baixo`} disabled={i === rows.length - 1} onClick={() => shift(r.id, 1)}>
                        <ArrowDown />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
