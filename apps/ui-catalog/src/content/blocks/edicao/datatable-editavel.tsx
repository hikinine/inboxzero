'use client'

import { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Check, Pencil, RotateCcw, Save } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Item {
  id: string
  sku: string
  name: string
  category: string
  price: number
  stock: number
}
type Field = 'name' | 'price' | 'stock'

const INITIAL: Item[] = [
  { id: 'i1', sku: 'TEN-0412', name: 'Tênis Aero Run Max 2', category: 'Tênis', price: 549.9, stock: 42 },
  { id: 'i2', sku: 'FON-1180', name: 'Fone Nimbus ANC Pro', category: 'Fones', price: 399.9, stock: 8 },
  { id: 'i3', sku: 'CAF-2201', name: 'Cafeteira Kaffa Espresso', category: 'Cafeteiras', price: 1290, stock: 15 },
  { id: 'i4', sku: 'MOC-0930', name: 'Mochila Urban 25L', category: 'Mochilas', price: 289.9, stock: 0 },
  { id: 'i5', sku: 'REL-3310', name: 'Relógio Pulse Fit', category: 'Relógios', price: 649.9, stock: 27 },
  { id: 'i6', sku: 'CAM-7788', name: 'Camiseta Dry Aero', category: 'Vestuário', price: 89.9, stock: 210 },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const FIELD_LABEL: Record<Field, string> = { name: 'nome', price: 'preço', stock: 'estoque' }

export default function DatatableEditavel() {
  const [rows, setRows] = useState<Item[]>(INITIAL)
  const [saved, setSaved] = useState<Item[]>(INITIAL)
  const [editing, setEditing] = useState<{ id: string; field: Field } | null>(null)
  const [draft, setDraft] = useState('')
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    if (!justSaved) return
    const t = setTimeout(() => setJustSaved(false), 1600)
    return () => clearTimeout(t)
  }, [justSaved])

  const savedOf = (id: string) => saved.find((s) => s.id === id)
  const isChanged = (r: Item, field: Field) => savedOf(r.id)?.[field] !== r[field]
  const dirtyCount = rows.filter((r) => (['name', 'price', 'stock'] as Field[]).some((f) => isChanged(r, f))).length

  const startEdit = (r: Item, field: Field) => {
    setEditing({ id: r.id, field })
    setDraft(field === 'price' ? r.price.toFixed(2).replace('.', ',') : String(r[field]))
  }
  const commit = () => {
    if (!editing) return
    const { id, field } = editing
    setRows((list) =>
      list.map((r) => {
        if (r.id !== id) return r
        if (field === 'name') return { ...r, name: draft.trim() || r.name }
        const n = Number(draft.replace(/\./g, '').replace(',', '.'))
        if (!Number.isFinite(n) || n < 0) return r
        return field === 'price' ? { ...r, price: Math.round(n * 100) / 100 } : { ...r, stock: Math.round(n) }
      }),
    )
    setEditing(null)
  }
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') setEditing(null)
  }

  const renderCell = (r: Item, field: Field) => {
    const active = editing?.id === r.id && editing.field === field
    const numeric = field !== 'name'
    if (active) {
      return (
        <Input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={onKey}
          inputMode={numeric ? 'decimal' : undefined}
          aria-label={`Editar ${FIELD_LABEL[field]} de ${r.name}`}
          className={cn('h-7 min-w-28', numeric && 'text-right tabular-nums')}
        />
      )
    }
    const display = field === 'price' ? brl(r.price) : String(r[field])
    return (
      <button
        type="button"
        onClick={() => startEdit(r, field)}
        aria-label={`Editar ${FIELD_LABEL[field]} de ${r.name}`}
        className={cn(
          'group/cell flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left transition-colors hover:bg-muted',
          numeric && 'justify-end tabular-nums',
          isChanged(r, field) && 'bg-amber-500/10 font-medium',
        )}
      >
        {numeric && <Pencil className="size-3 shrink-0 opacity-0 transition group-hover/cell:opacity-60" />}
        <span className="truncate">{display}</span>
        {!numeric && <Pencil className="size-3 shrink-0 opacity-0 transition group-hover/cell:opacity-60" />}
      </button>
    )
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Estoque</h2>
            <p className="mt-1 text-sm text-muted-foreground">Clique em nome, preço ou estoque para editar · Enter salva · Esc cancela</p>
          </div>
          <div className="flex items-center gap-2">
            {dirtyCount > 0 && <Badge variant="secondary">{dirtyCount} {dirtyCount === 1 ? 'linha alterada' : 'linhas alteradas'}</Badge>}
            {justSaved && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <Check className="size-4" /> Salvo
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              disabled={dirtyCount === 0}
              onClick={() => {
                setRows(saved)
                setEditing(null)
              }}
            >
              <RotateCcw data-icon="inline-start" /> Descartar
            </Button>
            <Button
              size="sm"
              disabled={dirtyCount === 0}
              onClick={() => {
                setSaved(rows)
                setJustSaved(true)
              }}
            >
              <Save data-icon="inline-start" /> Salvar alterações
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">SKU</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="w-36 text-right">Preço</TableHead>
                <TableHead className="w-28 text-right">Estoque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{r.sku}</TableCell>
                  <TableCell className="p-1">{renderCell(r, 'name')}</TableCell>
                  <TableCell className="text-muted-foreground">{r.category}</TableCell>
                  <TableCell className="p-1">{renderCell(r, 'price')}</TableCell>
                  <TableCell className="p-1">{renderCell(r, 'stock')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
