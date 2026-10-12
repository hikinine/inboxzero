'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Rows2, Rows3, Rows4, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type Density = 'compacta' | 'padrao' | 'espacosa'
type Status = 'Aprovada' | 'Pendente' | 'Estornada' | 'Recusada'
interface Tx {
  id: string
  customer: string
  initials: string
  method: string
  status: Status
  amount: number
  date: string
}

const NAMES = ['Ana Souza', 'Bruno Rocha', 'Carla Mendes', 'Diego Lima', 'Elisa Farias', 'Fábio Teixeira', 'Gabriela Nunes', 'Henrique Alves', 'Isabela Prado', 'João Cabral', 'Karina Melo', 'Lucas Brito']
const METHODS = ['Pix', 'Cartão', 'Boleto']
const STATUSES: Status[] = ['Aprovada', 'Aprovada', 'Pendente', 'Aprovada', 'Estornada', 'Aprovada', 'Recusada', 'Pendente']
const AMOUNTS = [1290, 349.9, 2480, 99, 780, 1049.8, 429.9, 5499, 189.9, 2199, 64.9, 899.9]
const ROWS: Tx[] = Array.from({ length: 24 }, (_, i) => {
  const name = NAMES[i % NAMES.length] ?? 'Cliente'
  return {
    id: `#${10500 - i}`,
    customer: name,
    initials: name
      .split(' ')
      .map((n) => n[0] ?? '')
      .join(''),
    method: METHODS[i % METHODS.length] ?? 'Pix',
    status: STATUSES[i % STATUSES.length] ?? 'Aprovada',
    amount: AMOUNTS[(i * 5) % AMOUNTS.length] ?? 0,
    date: `${String(12 - Math.floor(i / 2)).padStart(2, '0')}/10/2026`,
  }
})
const DENSITY: Record<Density, { label: string; Icon: LucideIcon; cell: string; head: string }> = {
  compacta: { label: 'Compacta', Icon: Rows4, cell: 'py-1 text-xs', head: 'h-8 text-xs' },
  padrao: { label: 'Padrão', Icon: Rows3, cell: 'py-2', head: 'h-10' },
  espacosa: { label: 'Espaçosa', Icon: Rows2, cell: 'py-4', head: 'h-12' },
}
const TONE: Record<Status, 'default' | 'secondary' | 'outline' | 'destructive'> = { Aprovada: 'default', Pendente: 'secondary', Estornada: 'outline', Recusada: 'destructive' }
const PAGE_SIZES = [5, 10, 20]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DatatableComDensidadeESelecaoDePagina() {
  const [density, setDensity] = useState<Density>('padrao')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const pages = Math.max(1, Math.ceil(ROWS.length / pageSize))
  const start = (page - 1) * pageSize
  const slice = useMemo(() => ROWS.slice(start, start + pageSize), [start, pageSize])
  const d = DENSITY[density]
  const total = slice.reduce((s, r) => s + (r.status === 'Aprovada' ? r.amount : 0), 0)

  const go = (n: number) => setPage(Math.min(pages, Math.max(1, n)))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Transações</h2>
            <p className="mt-1 text-sm text-muted-foreground">Densidade e tamanho de página com estado real. {ROWS.length} transações em outubro.</p>
          </div>
          <ToggleGroup
            variant="outline"
            size="sm"
            spacing={0}
            aria-label="Densidade das linhas"
            value={[density]}
            onValueChange={(v) => {
              const next = v[0]
              if (next === 'compacta' || next === 'padrao' || next === 'espacosa') setDensity(next)
            }}
          >
            {(Object.keys(DENSITY) as Density[]).map((k) => {
              const opt = DENSITY[k]
              return (
                <ToggleGroupItem key={k} value={k} aria-label={opt.label} className="aria-pressed:bg-muted">
                  <opt.Icon /> <span className="hidden sm:inline">{opt.label}</span>
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={d.head}>Transação</TableHead>
                <TableHead className={d.head}>Cliente</TableHead>
                <TableHead className={d.head}>Método</TableHead>
                <TableHead className={d.head}>Status</TableHead>
                <TableHead className={cn(d.head, 'text-right')}>Valor</TableHead>
                <TableHead className={d.head}>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slice.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className={cn(d.cell, 'font-mono text-xs text-muted-foreground')}>{r.id}</TableCell>
                  <TableCell className={d.cell}>
                    <div className="flex items-center gap-2">
                      {density !== 'compacta' && (
                        <Avatar size="sm">
                          <AvatarFallback>{r.initials}</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="font-medium">{r.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className={cn(d.cell, 'text-muted-foreground')}>{r.method}</TableCell>
                  <TableCell className={d.cell}>
                    <Badge variant={TONE[r.status]} className={cn(density === 'compacta' && 'h-4 px-1.5 text-[10px]')}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className={cn(d.cell, 'text-right tabular-nums', r.status === 'Estornada' && 'text-muted-foreground line-through')}>{brl(r.amount)}</TableCell>
                  <TableCell className={cn(d.cell, 'text-muted-foreground')}>{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-3 border-t px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="dsp-size" className="text-xs text-muted-foreground">Linhas por página</Label>
                <NativeSelect
                  id="dsp-size"
                  size="sm"
                  value={String(pageSize)}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setPage(1)
                  }}
                >
                  {PAGE_SIZES.map((n) => (
                    <NativeSelectOption key={n} value={String(n)}>{n}</NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
              <span className="text-xs text-muted-foreground">
                Aprovado nesta página: <span className="font-medium text-foreground tabular-nums">{brl(total)}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground tabular-nums">
                {start + 1}–{Math.min(start + pageSize, ROWS.length)} de {ROWS.length}
              </span>
              <div className="flex items-center gap-0.5">
                <Button variant="outline" size="icon-sm" aria-label="Primeira página" disabled={page === 1} onClick={() => go(1)}>
                  <ChevronsLeft />
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="Página anterior" disabled={page === 1} onClick={() => go(page - 1)}>
                  <ChevronLeft />
                </Button>
                <span className="px-2 text-xs tabular-nums">
                  Página <span className="font-medium">{page}</span> de {pages}
                </span>
                <Button variant="outline" size="icon-sm" aria-label="Próxima página" disabled={page === pages} onClick={() => go(page + 1)}>
                  <ChevronRight />
                </Button>
                <Button variant="outline" size="icon-sm" aria-label="Última página" disabled={page === pages} onClick={() => go(pages)}>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
