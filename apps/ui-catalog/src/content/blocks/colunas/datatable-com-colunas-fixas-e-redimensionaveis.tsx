'use client'

import { useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Pin, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Row {
  sku: string
  name: string
  category: string
  brand: string
  stock: number
  reserved: number
  price: number
  cost: number
  margin: number
  supplier: string
  updated: string
}
type Key = keyof Row

const ROWS: Row[] = [
  { sku: 'TEN-0412', name: 'Tênis Aero Run Max 2', category: 'Tênis', brand: 'Aero', stock: 42, reserved: 6, price: 549.9, cost: 298, margin: 45.8, supplier: 'Aero Indústria · Novo Hamburgo, RS', updated: '08/10/2026' },
  { sku: 'FON-1180', name: 'Fone Nimbus ANC Pro', category: 'Fones', brand: 'Nimbus', stock: 8, reserved: 3, price: 899.9, cost: 512, margin: 43.1, supplier: 'Nimbus Import · Manaus, AM', updated: '07/10/2026' },
  { sku: 'CAF-2201', name: 'Cafeteira Kaffa Espresso', category: 'Cafeteiras', brand: 'Kaffa', stock: 15, reserved: 1, price: 1290, cost: 740, margin: 42.6, supplier: 'Kaffa do Brasil · Joinville, SC', updated: '09/10/2026' },
  { sku: 'MOC-0930', name: 'Mochila Urban 25L', category: 'Mochilas', brand: 'Aero', stock: 0, reserved: 0, price: 289.9, cost: 131, margin: 54.8, supplier: 'Aero Indústria · Novo Hamburgo, RS', updated: '01/10/2026' },
  { sku: 'REL-3310', name: 'Relógio Pulse Fit', category: 'Relógios', brand: 'Pulse', stock: 27, reserved: 4, price: 649.9, cost: 350, margin: 46.1, supplier: 'Pulse Tech · Campinas, SP', updated: '06/10/2026' },
  { sku: 'CAM-5120', name: 'Câmera Instantânea Lumi', category: 'Câmeras', brand: 'Lumi', stock: 5, reserved: 2, price: 479, cost: 290, margin: 39.5, supplier: 'Lumi Óptica · Curitiba, PR', updated: '28/09/2026' },
  { sku: 'SOM-0871', name: 'Caixa de Som Onda 360', category: 'Áudio', brand: 'Onda', stock: 63, reserved: 9, price: 329.9, cost: 170, margin: 48.5, supplier: 'Onda Áudio · Santa Rita do Sapucaí, MG', updated: '03/10/2026' },
  { sku: 'NOT-9001', name: 'Notebook Vega 14" OLED', category: 'Informática', brand: 'Vega', stock: 3, reserved: 1, price: 5499, cost: 4120, margin: 25.1, supplier: 'Vega Computadores · Jundiaí, SP', updated: '02/10/2026' },
]
const COLUMNS: Array<{ key: Key; label: string; width: number; align?: 'right' }> = [
  { key: 'name', label: 'Produto', width: 230 },
  { key: 'sku', label: 'SKU', width: 110 },
  { key: 'category', label: 'Categoria', width: 130 },
  { key: 'brand', label: 'Marca', width: 100 },
  { key: 'stock', label: 'Estoque', width: 100, align: 'right' },
  { key: 'reserved', label: 'Reservado', width: 110, align: 'right' },
  { key: 'price', label: 'Preço', width: 120, align: 'right' },
  { key: 'cost', label: 'Custo', width: 120, align: 'right' },
  { key: 'margin', label: 'Margem', width: 100, align: 'right' },
  { key: 'supplier', label: 'Fornecedor', width: 260 },
  { key: 'updated', label: 'Atualizado', width: 120 },
]
const DEFAULT_WIDTHS = Object.fromEntries(COLUMNS.map((c) => [c.key, c.width])) as Record<Key, number>
const MIN = 72
const MAX = 520

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const clamp = (n: number) => Math.min(MAX, Math.max(MIN, Math.round(n)))

function cell(r: Row, key: Key) {
  switch (key) {
    case 'name':
      return <span className="font-medium">{r.name}</span>
    case 'sku':
      return <span className="font-mono text-xs text-muted-foreground">{r.sku}</span>
    case 'stock':
      return r.stock === 0 ? <Badge variant="destructive">Esgotado</Badge> : <span className="tabular-nums">{r.stock}</span>
    case 'reserved':
      return <span className="tabular-nums text-muted-foreground">{r.reserved}</span>
    case 'price':
      return <span className="tabular-nums">{brl(r.price)}</span>
    case 'cost':
      return <span className="tabular-nums text-muted-foreground">{brl(r.cost)}</span>
    case 'margin':
      return <span className={cn('tabular-nums', r.margin < 30 ? 'text-rose-600' : r.margin >= 45 ? 'text-emerald-600' : '')}>{r.margin.toLocaleString('pt-BR')}%</span>
    case 'supplier':
    case 'updated':
      return <span className="text-muted-foreground">{r[key]}</span>
    default:
      return r[key]
  }
}

export default function DatatableComColunasFixasERedimensionaveis() {
  const [widths, setWidths] = useState<Record<Key, number>>(DEFAULT_WIDTHS)
  const [pinned, setPinned] = useState(true)
  const [resizing, setResizing] = useState<Key | null>(null)

  const total = COLUMNS.reduce((s, c) => s + widths[c.key], 0)
  const changed = COLUMNS.some((c) => widths[c.key] !== c.width)

  const startResize = (e: ReactPointerEvent<HTMLDivElement>, key: Key) => {
    e.preventDefault()
    const startX = e.clientX
    const startW = widths[key]
    setResizing(key)
    const onMove = (ev: PointerEvent) => setWidths((w) => ({ ...w, [key]: clamp(startW + ev.clientX - startX) }))
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      setResizing(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const stickyCls = (i: number) => (pinned && i === 0 ? 'sticky left-0 z-10 bg-card shadow-[inset_-1px_0_0_var(--border)]' : '')

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Estoque e margens</h2>
            <p className="mt-1 text-sm text-muted-foreground">Arraste a borda direita de um cabeçalho para redimensionar (duplo clique restaura). Role na horizontal com a primeira coluna fixa.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Label htmlFor="cfr-pin" className="flex cursor-pointer items-center gap-2 text-sm font-normal">
              <Switch id="cfr-pin" size="sm" checked={pinned} onCheckedChange={setPinned} />
              <Pin className="size-3.5 text-muted-foreground" /> Fixar primeira coluna
            </Label>
            <Button variant="outline" size="sm" disabled={!changed} onClick={() => setWidths(DEFAULT_WIDTHS)}>
              <RotateCcw data-icon="inline-start" /> Redefinir larguras
            </Button>
          </div>
        </div>

        <div className={cn('mt-6 rounded-xl border bg-card', resizing && 'select-none [&_*]:cursor-col-resize')}>
          <Table className="table-fixed" style={{ width: total, minWidth: '100%' }}>
            <colgroup>
              {COLUMNS.map((c) => (
                <col key={c.key} style={{ width: widths[c.key] }} />
              ))}
            </colgroup>
            <TableHeader>
              <TableRow>
                {COLUMNS.map((c, i) => (
                  <TableHead key={c.key} className={cn('relative overflow-hidden', c.align === 'right' && 'text-right', stickyCls(i), resizing === c.key && 'bg-muted/60')}>
                    <span className="block truncate">{c.label}</span>
                    {resizing === c.key && <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-primary px-1 text-[10px] font-medium text-primary-foreground tabular-nums">{widths[c.key]}px</span>}
                    <div
                      role="separator"
                      aria-orientation="vertical"
                      aria-label={`Redimensionar coluna ${c.label}`}
                      onPointerDown={(e) => startResize(e, c.key)}
                      onDoubleClick={() => setWidths((w) => ({ ...w, [c.key]: c.width }))}
                      className={cn('absolute inset-y-0 right-0 w-2 cursor-col-resize touch-none after:absolute after:inset-y-2 after:right-0.5 after:w-px after:bg-border hover:after:w-0.5 hover:after:bg-primary', resizing === c.key && 'after:w-0.5 after:bg-primary')}
                    />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.sku} className="group">
                  {COLUMNS.map((c, i) => (
                    <TableCell key={c.key} className={cn('overflow-hidden text-ellipsis', c.align === 'right' && 'text-right', stickyCls(i), pinned && i === 0 && 'group-hover:bg-muted')}>
                      {cell(r, c.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5 text-xs text-muted-foreground">
            <span>
              {COLUMNS.length} colunas · largura total <span className="font-medium text-foreground tabular-nums">{total.toLocaleString('pt-BR')} px</span>
            </span>
            <span>{pinned ? 'Coluna "Produto" fixa à esquerda' : 'Nenhuma coluna fixa'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
