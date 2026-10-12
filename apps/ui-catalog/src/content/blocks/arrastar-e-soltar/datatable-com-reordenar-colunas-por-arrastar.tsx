'use client'

import { useState } from 'react'
import type { DragEvent } from 'react'
import { GripVertical, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type ColKey = 'id' | 'customer' | 'carrier' | 'status' | 'city' | 'eta' | 'total'
type Status = 'Postado' | 'Em trânsito' | 'Saiu para entrega' | 'Entregue'
interface Shipment {
  id: string
  customer: string
  carrier: string
  status: Status
  city: string
  eta: string
  total: number
}

const COLUMNS: Record<ColKey, { label: string; align?: 'right' }> = {
  id: { label: 'Envio' },
  customer: { label: 'Cliente' },
  carrier: { label: 'Transportadora' },
  status: { label: 'Status' },
  city: { label: 'Destino' },
  eta: { label: 'Previsão' },
  total: { label: 'Valor', align: 'right' },
}
const DEFAULT_ORDER: ColKey[] = ['id', 'customer', 'carrier', 'status', 'city', 'eta', 'total']
const ROWS: Shipment[] = [
  { id: 'ENV-7701', customer: 'Ana Souza', carrier: 'Loggi', status: 'Saiu para entrega', city: 'São Paulo, SP', eta: 'Hoje', total: 1290 },
  { id: 'ENV-7702', customer: 'Bruno Rocha', carrier: 'Correios', status: 'Em trânsito', city: 'Curitiba, PR', eta: '14/10', total: 349.9 },
  { id: 'ENV-7703', customer: 'Carla Mendes', carrier: 'Jadlog', status: 'Postado', city: 'Belo Horizonte, MG', eta: '16/10', total: 2480 },
  { id: 'ENV-7704', customer: 'Diego Lima', carrier: 'Correios', status: 'Entregue', city: 'Recife, PE', eta: '09/10', total: 99 },
  { id: 'ENV-7705', customer: 'Elisa Farias', carrier: 'Loggi', status: 'Em trânsito', city: 'Porto Alegre, RS', eta: '13/10', total: 780 },
  { id: 'ENV-7706', customer: 'Fábio Teixeira', carrier: 'Jadlog', status: 'Entregue', city: 'Campinas, SP', eta: '08/10', total: 1049.8 },
]
const TONE: Record<Status, 'default' | 'secondary' | 'outline'> = { Postado: 'outline', 'Em trânsito': 'secondary', 'Saiu para entrega': 'default', Entregue: 'outline' }

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function cell(r: Shipment, key: ColKey) {
  switch (key) {
    case 'id':
      return <span className="font-mono text-xs">{r.id}</span>
    case 'customer':
      return <span className="font-medium">{r.customer}</span>
    case 'status':
      return <Badge variant={TONE[r.status]}>{r.status}</Badge>
    case 'total':
      return <span className="tabular-nums">{brl(r.total)}</span>
    case 'carrier':
    case 'city':
    case 'eta':
      return <span className="text-muted-foreground">{r[key]}</span>
    default:
      return null
  }
}

export default function DatatableComReordenarColunasPorArrastar() {
  const [order, setOrder] = useState<ColKey[]>(DEFAULT_ORDER)
  const [dragKey, setDragKey] = useState<ColKey | null>(null)
  const [over, setOver] = useState<{ key: ColKey; side: 'left' | 'right' } | null>(null)

  const changed = order.some((k, i) => k !== DEFAULT_ORDER[i])

  const reset = () => {
    setDragKey(null)
    setOver(null)
  }
  const onDragStart = (e: DragEvent<HTMLTableCellElement>, key: ColKey) => {
    setDragKey(key)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', key)
  }
  const onDragOver = (e: DragEvent<HTMLTableCellElement>, key: ColKey) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (key === dragKey) return
    const rect = e.currentTarget.getBoundingClientRect()
    const side = e.clientX < rect.left + rect.width / 2 ? 'left' : 'right'
    if (over?.key !== key || over.side !== side) setOver({ key, side })
  }
  const onDrop = (e: DragEvent<HTMLTableCellElement>, key: ColKey) => {
    e.preventDefault()
    const from = dragKey ?? (e.dataTransfer.getData('text/plain') as ColKey)
    if (!from || from === key) return reset()
    setOrder((list) => {
      const without = list.filter((k) => k !== from)
      const idx = without.indexOf(key) + (over?.side === 'right' ? 1 : 0)
      return [...without.slice(0, idx), from, ...without.slice(idx)]
    })
    reset()
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Envios</h2>
            <p className="mt-1 text-sm text-muted-foreground">Arraste um cabeçalho e solte à esquerda ou à direita de outro para reordenar as colunas.</p>
          </div>
          <Button variant="outline" size="sm" disabled={!changed} onClick={() => setOrder(DEFAULT_ORDER)}>
            <RotateCcw data-icon="inline-start" /> Ordem padrão
          </Button>
        </div>

        <ol className="mt-5 flex flex-wrap items-center gap-1.5 text-xs" aria-label="Ordem atual das colunas">
          {order.map((k, i) => (
            <li key={k} className={cn('flex items-center gap-1 rounded-full border bg-card px-2 py-0.5', dragKey === k && 'border-primary text-primary')}>
              <span className="font-mono text-muted-foreground tabular-nums">{i + 1}</span> {COLUMNS[k].label}
            </li>
          ))}
        </ol>

        <div className="mt-4 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                {order.map((k) => {
                  const c = COLUMNS[k]
                  const isOver = over?.key === k
                  return (
                    <TableHead
                      key={k}
                      draggable
                      onDragStart={(e) => onDragStart(e, k)}
                      onDragOver={(e) => onDragOver(e, k)}
                      onDrop={(e) => onDrop(e, k)}
                      onDragEnd={reset}
                      onDragLeave={() => setOver((o) => (o?.key === k ? null : o))}
                      aria-grabbed={dragKey === k}
                      className={cn(
                        'cursor-grab select-none transition-colors active:cursor-grabbing',
                        c.align === 'right' && 'text-right',
                        dragKey === k && 'bg-muted/60 opacity-50',
                        isOver && over.side === 'left' && 'shadow-[inset_3px_0_0_var(--primary)]',
                        isOver && over.side === 'right' && 'shadow-[inset_-3px_0_0_var(--primary)]',
                      )}
                    >
                      <span className={cn('inline-flex items-center gap-1', c.align === 'right' && 'flex-row-reverse')}>
                        <GripVertical className="size-3.5 text-muted-foreground/60" aria-hidden="true" />
                        {c.label}
                      </span>
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.id}>
                  {order.map((k) => (
                    <TableCell key={k} className={cn(COLUMNS[k].align === 'right' && 'text-right', dragKey === k && 'bg-muted/40')}>
                      {cell(r, k)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
