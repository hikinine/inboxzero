'use client'

import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Sale {
  id: string
  name: string
  sku: string
  category: string
  units: number
  revenue: number
}

const CATEGORIES = ['Tênis', 'Fones', 'Cafeteiras']
const SALES: Sale[] = [
  { id: 's1', name: 'Tênis Aero Run Max 2', sku: 'TEN-0412', category: 'Tênis', units: 184, revenue: 101181.6 },
  { id: 's2', name: 'Tênis Trilha Trail X', sku: 'TEN-0520', category: 'Tênis', units: 97, revenue: 41700.3 },
  { id: 's3', name: 'Tênis Aero Street', sku: 'TEN-0610', category: 'Tênis', units: 142, revenue: 49686 },
  { id: 's4', name: 'Fone Nimbus ANC Pro', sku: 'FON-1180', category: 'Fones', units: 221, revenue: 88377.9 },
  { id: 's5', name: 'Fone Aero Buds 2', sku: 'FON-1402', category: 'Fones', units: 318, revenue: 127168.2 },
  { id: 's6', name: 'Fone Aero Kids', sku: 'FON-1510', category: 'Fones', units: 64, revenue: 9593.6 },
  { id: 's7', name: 'Cafeteira Kaffa Espresso', sku: 'CAF-2201', category: 'Cafeteiras', units: 58, revenue: 74820 },
  { id: 's8', name: 'Cápsulas Kaffa Intenso', sku: 'CAF-2305', category: 'Cafeteiras', units: 1210, revenue: 42229 },
  { id: 's9', name: 'Moedor Kaffa Compact', sku: 'CAF-2410', category: 'Cafeteiras', units: 39, revenue: 13611 },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DatatableAgrupada() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set(['Cafeteiras']))

  const groups = useMemo(
    () =>
      CATEGORIES.map((cat) => {
        const items = SALES.filter((s) => s.category === cat)
        return { cat, items, units: items.reduce((a, s) => a + s.units, 0), revenue: items.reduce((a, s) => a + s.revenue, 0) }
      }),
    [],
  )
  const totalUnits = groups.reduce((a, g) => a + g.units, 0)
  const totalRevenue = groups.reduce((a, g) => a + g.revenue, 0)

  const toggle = (cat: string) =>
    setCollapsed((s) => {
      const n = new Set(s)
      if (n.has(cat)) n.delete(cat)
      else n.add(cat)
      return n
    })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Vendas por categoria</h2>
            <p className="mt-1 text-sm text-muted-foreground">Outubro de 2026 · {SALES.length} produtos em {groups.length} categorias</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCollapsed(new Set())} disabled={collapsed.size === 0}>Expandir tudo</Button>
            <Button variant="outline" size="sm" onClick={() => setCollapsed(new Set(CATEGORIES))} disabled={collapsed.size === CATEGORIES.length}>Recolher tudo</Button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Unidades</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="w-40 text-right">Participação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((g) => {
                const open = !collapsed.has(g.cat)
                const share = Math.round((g.revenue / totalRevenue) * 100)
                return (
                  <GroupRows key={g.cat} open={open} onToggle={() => toggle(g.cat)} group={g} share={share} totalRevenue={totalRevenue} />
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total geral</TableCell>
                <TableCell className="text-right tabular-nums">{totalUnits.toLocaleString('pt-BR')}</TableCell>
                <TableCell className="text-right tabular-nums">{brl(totalRevenue)}</TableCell>
                <TableCell className="text-right tabular-nums">100%</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </section>
  )
}

function GroupRows({
  group,
  open,
  onToggle,
  share,
  totalRevenue,
}: {
  group: { cat: string; items: Sale[]; units: number; revenue: number }
  open: boolean
  onToggle: () => void
  share: number
  totalRevenue: number
}) {
  return (
    <>
      <TableRow className="bg-muted/50 hover:bg-muted/70">
        <TableCell colSpan={2}>
          <button type="button" onClick={onToggle} aria-expanded={open} className="flex items-center gap-2 font-medium">
            <ChevronRight className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-90')} />
            {group.cat}
            <Badge variant="secondary">{group.items.length}</Badge>
          </button>
        </TableCell>
        <TableCell className="text-right font-medium tabular-nums">{group.units.toLocaleString('pt-BR')}</TableCell>
        <TableCell className="text-right font-medium tabular-nums">{brl(group.revenue)}</TableCell>
        <TableCell className="text-right">
          <span className="inline-flex items-center gap-2 tabular-nums">
            <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted-foreground/20">
              <span className="block h-full rounded-full bg-primary" style={{ width: `${share}%` }} />
            </span>
            {share}%
          </span>
        </TableCell>
      </TableRow>
      {open &&
        group.items.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="pl-10">{s.name}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{s.sku}</TableCell>
            <TableCell className="text-right tabular-nums">{s.units.toLocaleString('pt-BR')}</TableCell>
            <TableCell className="text-right tabular-nums">{brl(s.revenue)}</TableCell>
            <TableCell className="text-right text-muted-foreground tabular-nums">{((s.revenue / totalRevenue) * 100).toFixed(1).replace('.', ',')}%</TableCell>
          </TableRow>
        ))}
    </>
  )
}
