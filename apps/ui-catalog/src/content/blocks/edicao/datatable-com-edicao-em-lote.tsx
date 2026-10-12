'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Archive, Check, Minus, Plus, Star, Undo2, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Status = 'Ativo' | 'Rascunho' | 'Arquivado'
interface Product {
  id: string
  sku: string
  name: string
  category: string
  price: number
  stock: number
  status: Status
  featured: boolean
}

const INITIAL: Product[] = [
  { id: 'p1', sku: 'TEN-0412', name: 'Tênis Aero Run Max 2', category: 'Tênis', price: 549.9, stock: 42, status: 'Ativo', featured: true },
  { id: 'p2', sku: 'FON-1180', name: 'Fone Nimbus ANC Pro', category: 'Fones', price: 899.9, stock: 8, status: 'Ativo', featured: false },
  { id: 'p3', sku: 'CAF-2201', name: 'Cafeteira Kaffa Espresso', category: 'Cafeteiras', price: 1290, stock: 15, status: 'Ativo', featured: true },
  { id: 'p4', sku: 'MOC-0930', name: 'Mochila Urban 25L', category: 'Mochilas', price: 289.9, stock: 0, status: 'Rascunho', featured: false },
  { id: 'p5', sku: 'REL-3310', name: 'Relógio Pulse Fit', category: 'Relógios', price: 649.9, stock: 27, status: 'Ativo', featured: false },
  { id: 'p6', sku: 'CAM-5120', name: 'Câmera Instantânea Lumi', category: 'Câmeras', price: 479, stock: 5, status: 'Rascunho', featured: false },
  { id: 'p7', sku: 'SOM-0871', name: 'Caixa de Som Onda 360', category: 'Áudio', price: 329.9, stock: 63, status: 'Ativo', featured: false },
  { id: 'p8', sku: 'CAM-7788', name: 'Camiseta Dry Aero', category: 'Vestuário', price: 89.9, stock: 210, status: 'Arquivado', featured: false },
]
const TONE: Record<Status, 'default' | 'secondary' | 'outline'> = { Ativo: 'default', Rascunho: 'secondary', Arquivado: 'outline' }

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DatatableComEdicaoEmLote() {
  const [rows, setRows] = useState<Product[]>(INITIAL)
  const [selected, setSelected] = useState<Set<string>>(new Set(['p2', 'p5']))
  const [history, setHistory] = useState<Product[][]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [statusTo, setStatusTo] = useState<Status>('Ativo')
  const [pct, setPct] = useState('10')

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(null), 3200)
    return () => clearTimeout(t)
  }, [message])

  const all = rows.length > 0 && selected.size === rows.length
  const some = selected.size > 0 && !all
  const chosen = rows.filter((r) => selected.has(r.id))
  const allFeatured = chosen.length > 0 && chosen.every((r) => r.featured)

  const apply = (label: string, fn: (r: Product) => Product) => {
    setHistory((h) => [...h.slice(-9), rows])
    setRows((list) => list.map((r) => (selected.has(r.id) ? fn(r) : r)))
    setMessage(`${label} em ${selected.size} ${selected.size === 1 ? 'produto' : 'produtos'}`)
  }
  const undo = () => {
    const prev = history[history.length - 1]
    if (!prev) return
    setRows(prev)
    setHistory((h) => h.slice(0, -1))
    setMessage('Última ação desfeita')
  }
  const toggleAll = (on: boolean) => setSelected(on ? new Set(rows.map((r) => r.id)) : new Set())
  const toggleOne = (id: string) =>
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const factor = Math.max(0, Number(pct) || 0) / 100

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Catálogo</h2>
            <p className="mt-1 text-sm text-muted-foreground">Selecione linhas para liberar as ações em massa: status, preço, destaque e arquivamento, com desfazer.</p>
          </div>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {message && (
                <motion.span key={message} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-sm text-emerald-600" role="status">
                  <Check className="size-4" /> {message}
                </motion.span>
              )}
            </AnimatePresence>
            <Button variant="outline" size="sm" disabled={history.length === 0} onClick={undo}>
              <Undo2 data-icon="inline-start" /> Desfazer{history.length > 0 ? ` (${history.length})` : ''}
            </Button>
          </div>
        </div>

        <div className="relative mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox aria-label="Selecionar todos" checked={all} indeterminate={some} onCheckedChange={(on) => toggleAll(Boolean(on))} />
                </TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Estoque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24 text-center">Destaque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => {
                const on = selected.has(r.id)
                return (
                  <TableRow key={r.id} data-state={on ? 'selected' : undefined} className={cn(r.status === 'Arquivado' && 'text-muted-foreground')}>
                    <TableCell>
                      <Checkbox aria-label={`Selecionar ${r.name}`} checked={on} onCheckedChange={() => toggleOne(r.id)} />
                    </TableCell>
                    <TableCell>
                      <div className={cn('font-medium', r.status === 'Arquivado' && 'line-through')}>{r.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{r.sku}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.category}</TableCell>
                    <TableCell className="text-right tabular-nums">{brl(r.price)}</TableCell>
                    <TableCell className={cn('text-right tabular-nums', r.stock === 0 && 'text-rose-600')}>{r.stock}</TableCell>
                    <TableCell>
                      <Badge variant={TONE[r.status]}>{r.status}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Star className={cn('mx-auto size-4', r.featured ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30')} aria-label={r.featured ? 'Em destaque' : 'Sem destaque'} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          <AnimatePresence>
            {selected.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="sticky bottom-4 z-10 mx-3 mb-3 flex flex-wrap items-center gap-2 rounded-xl border bg-background/95 p-2 shadow-xl backdrop-blur"
              >
                <div className="flex items-center gap-1 pl-2 text-sm">
                  <span className="font-medium tabular-nums">{selected.size}</span>
                  <span className="text-muted-foreground">{selected.size === 1 ? 'selecionado' : 'selecionados'}</span>
                  <Button variant="ghost" size="icon-xs" aria-label="Limpar seleção" onClick={() => setSelected(new Set())}>
                    <X />
                  </Button>
                </div>
                <Separator orientation="vertical" className="hidden h-6 sm:block" />
                <div className="flex items-center gap-1">
                  <Label htmlFor="del-status" className="sr-only">Novo status</Label>
                  <NativeSelect id="del-status" size="sm" value={statusTo} onChange={(e) => setStatusTo(e.target.value as Status)}>
                    <NativeSelectOption value="Ativo">Ativo</NativeSelectOption>
                    <NativeSelectOption value="Rascunho">Rascunho</NativeSelectOption>
                    <NativeSelectOption value="Arquivado">Arquivado</NativeSelectOption>
                  </NativeSelect>
                  <Button size="sm" variant="outline" onClick={() => apply(`Status "${statusTo}" aplicado`, (r) => ({ ...r, status: statusTo }))}>Aplicar status</Button>
                </div>
                <Separator orientation="vertical" className="hidden h-6 sm:block" />
                <InputGroup className="h-7 w-44">
                  <InputGroupAddon>
                    <InputGroupText className="text-xs">Preço</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput type="number" min={0} max={90} aria-label="Percentual de ajuste de preço" value={pct} onChange={(e) => setPct(e.target.value)} className="text-xs" />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText className="text-xs">%</InputGroupText>
                    <InputGroupButton size="icon-xs" aria-label="Reduzir preço" disabled={factor === 0} onClick={() => apply(`Preço reduzido em ${pct}%`, (r) => ({ ...r, price: Math.round(r.price * (1 - factor) * 100) / 100 }))}>
                      <Minus />
                    </InputGroupButton>
                    <InputGroupButton size="icon-xs" aria-label="Aumentar preço" disabled={factor === 0} onClick={() => apply(`Preço aumentado em ${pct}%`, (r) => ({ ...r, price: Math.round(r.price * (1 + factor) * 100) / 100 }))}>
                      <Plus />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <Button size="sm" variant="outline" onClick={() => apply(allFeatured ? 'Destaque removido' : 'Destaque aplicado', (r) => ({ ...r, featured: !allFeatured }))}>
                  <Star data-icon="inline-start" className={cn(allFeatured && 'fill-amber-500 text-amber-500')} /> {allFeatured ? 'Remover destaque' : 'Destacar'}
                </Button>
                <Button size="sm" variant="destructive" className="ml-auto" onClick={() => apply('Arquivado', (r) => ({ ...r, status: 'Arquivado', featured: false }))}>
                  <Archive data-icon="inline-start" /> Arquivar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
