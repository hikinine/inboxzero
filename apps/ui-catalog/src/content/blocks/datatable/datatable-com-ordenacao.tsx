'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Row {
  sku: string
  name: string
  category: string
  stock: number
  price: number
  updated: string
}

const ROWS: Row[] = [
  { sku: 'TEN-0412', name: 'Tênis Aero Run Max 2', category: 'Tênis', stock: 42, price: 549.9, updated: '2026-10-08' },
  { sku: 'FON-1180', name: 'Fone Nimbus ANC Pro', category: 'Fones', stock: 8, price: 399.9, updated: '2026-10-07' },
  { sku: 'CAF-2201', name: 'Cafeteira Kaffa Espresso', category: 'Cafeteiras', stock: 15, price: 1290, updated: '2026-10-09' },
  { sku: 'MOC-0930', name: 'Mochila Urban 25L', category: 'Mochilas', stock: 0, price: 289.9, updated: '2026-10-01' },
  { sku: 'REL-3310', name: 'Relógio Pulse Fit', category: 'Relógios', stock: 27, price: 649.9, updated: '2026-10-06' },
  { sku: 'CAM-5120', name: 'Câmera Instantânea Lumi', category: 'Câmeras', stock: 5, price: 479, updated: '2026-09-28' },
  { sku: 'SOM-0871', name: 'Caixa de Som Onda 360', category: 'Áudio', stock: 63, price: 329.9, updated: '2026-10-03' },
  { sku: 'CAM-7788', name: 'Camiseta Dry Aero', category: 'Vestuário', stock: 210, price: 89.9, updated: '2026-10-09' },
  { sku: 'TEN-0520', name: 'Tênis Trilha Trail X', category: 'Tênis', stock: 12, price: 429.9, updated: '2026-09-30' },
  { sku: 'FON-1402', name: 'Fone Aero Buds 2', category: 'Fones', stock: 88, price: 399.9, updated: '2026-10-05' },
  { sku: 'CAF-2305', name: 'Cápsulas Kaffa Intenso', category: 'Cafeteiras', stock: 340, price: 34.9, updated: '2026-10-08' },
  { sku: 'NOT-9001', name: 'Notebook Vega 14" OLED', category: 'Informática', stock: 3, price: 5499, updated: '2026-10-02' },
]

type SortKey = keyof Row
type Dir = 'asc' | 'desc'
const COLUMNS: Array<{ key: SortKey; label: string; align?: 'right' }> = [
  { key: 'sku', label: 'SKU' },
  { key: 'name', label: 'Produto' },
  { key: 'category', label: 'Categoria' },
  { key: 'stock', label: 'Estoque', align: 'right' },
  { key: 'price', label: 'Preço', align: 'right' },
  { key: 'updated', label: 'Atualizado' },
]
const PAGE_SIZE = 5

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const fmtDate = (iso: string) => iso.split('-').reverse().join('/')

function compare(a: Row, b: Row, key: SortKey): number {
  const x = a[key]
  const y = b[key]
  if (typeof x === 'number' && typeof y === 'number') return x - y
  return String(x).localeCompare(String(y), 'pt-BR')
}

function stockBadge(stock: number) {
  if (stock === 0) return <Badge variant="destructive">Esgotado</Badge>
  if (stock < 10) return <Badge variant="secondary">Baixo</Badge>
  return <Badge variant="outline">Em estoque</Badge>
}

export default function DatatableComOrdenacao() {
  const [sort, setSort] = useState<{ key: SortKey; dir: Dir }>({ key: 'name', dir: 'asc' })
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    const list = [...ROWS].sort((a, b) => compare(a, b, sort.key))
    return sort.dir === 'asc' ? list : list.reverse()
  }, [sort])

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const slice = sorted.slice(start, start + PAGE_SIZE)

  const toggle = (key: SortKey) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))
    setPage(1)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Produtos</h2>
            <p className="mt-1 text-sm text-muted-foreground">Clique no cabeçalho para ordenar. Ordenado por {COLUMNS.find((c) => c.key === sort.key)?.label.toLowerCase()} ({sort.dir === 'asc' ? 'crescente' : 'decrescente'}).</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                {COLUMNS.map((c) => {
                  const active = sort.key === c.key
                  return (
                    <TableHead key={c.key} aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'} className={cn(c.align === 'right' && 'text-right')}>
                      <button
                        type="button"
                        onClick={() => toggle(c.key)}
                        className={cn('inline-flex items-center gap-1 rounded hover:text-foreground', c.align === 'right' && 'flex-row-reverse', active ? 'text-foreground' : 'text-muted-foreground')}
                      >
                        {c.label}
                        {active ? sort.dir === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" /> : <ChevronsUpDown className="size-3.5 opacity-50" />}
                      </button>
                    </TableHead>
                  )
                })}
                <TableHead className="w-28" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {slice.map((r) => (
                <TableRow key={r.sku}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{r.sku}</TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.category}</TableCell>
                  <TableCell className="text-right tabular-nums">{r.stock}</TableCell>
                  <TableCell className="text-right tabular-nums">{brl(r.price)}</TableCell>
                  <TableCell className="text-muted-foreground">{fmtDate(r.updated)}</TableCell>
                  <TableCell>{stockBadge(r.stock)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium text-foreground">{start + 1}–{Math.min(start + PAGE_SIZE, sorted.length)}</span> de {sorted.length} produtos
            </p>
            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    text="Anterior"
                    aria-disabled={page === 1}
                    className={cn(page === 1 && 'pointer-events-none opacity-50')}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.max(1, p - 1))
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      href="#"
                      isActive={n === page}
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(n)
                      }}
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    text="Próxima"
                    aria-disabled={page === pages}
                    className={cn(page === pages && 'pointer-events-none opacity-50')}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.min(pages, p + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  )
}
