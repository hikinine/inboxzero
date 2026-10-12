'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Expand, Shrink } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type GroupKey = 'region' | 'seller' | 'month'
interface Sale {
  id: string
  seller: string
  initials: string
  region: string
  month: string
  orders: number
  revenue: number
  goal: number
}

const SALES: Sale[] = [
  { id: 's1', seller: 'Ana Souza', initials: 'AS', region: 'Sudeste', month: 'Agosto', orders: 182, revenue: 98400, goal: 90000 },
  { id: 's2', seller: 'Ana Souza', initials: 'AS', region: 'Sudeste', month: 'Setembro', orders: 203, revenue: 112900, goal: 95000 },
  { id: 's3', seller: 'Ana Souza', initials: 'AS', region: 'Sudeste', month: 'Outubro', orders: 97, revenue: 54200, goal: 100000 },
  { id: 's4', seller: 'Bruno Rocha', initials: 'BR', region: 'Sul', month: 'Agosto', orders: 121, revenue: 61300, goal: 70000 },
  { id: 's5', seller: 'Bruno Rocha', initials: 'BR', region: 'Sul', month: 'Setembro', orders: 140, revenue: 73800, goal: 70000 },
  { id: 's6', seller: 'Bruno Rocha', initials: 'BR', region: 'Sul', month: 'Outubro', orders: 66, revenue: 35100, goal: 72000 },
  { id: 's7', seller: 'Carla Mendes', initials: 'CM', region: 'Sudeste', month: 'Agosto', orders: 158, revenue: 84700, goal: 80000 },
  { id: 's8', seller: 'Carla Mendes', initials: 'CM', region: 'Sudeste', month: 'Setembro', orders: 149, revenue: 79300, goal: 85000 },
  { id: 's9', seller: 'Carla Mendes', initials: 'CM', region: 'Sudeste', month: 'Outubro', orders: 71, revenue: 39900, goal: 85000 },
  { id: 's10', seller: 'Diego Lima', initials: 'DL', region: 'Nordeste', month: 'Agosto', orders: 94, revenue: 47600, goal: 50000 },
  { id: 's11', seller: 'Diego Lima', initials: 'DL', region: 'Nordeste', month: 'Setembro', orders: 118, revenue: 62100, goal: 55000 },
  { id: 's12', seller: 'Diego Lima', initials: 'DL', region: 'Nordeste', month: 'Outubro', orders: 52, revenue: 27800, goal: 58000 },
]
const GROUPS: Array<{ key: GroupKey; label: string }> = [
  { key: 'region', label: 'Região' },
  { key: 'seller', label: 'Vendedor' },
  { key: 'month', label: 'Mês' },
]
const MONTH_ORDER = ['Agosto', 'Setembro', 'Outubro']
const ACCENTS = ['border-l-sky-500', 'border-l-violet-500', 'border-l-emerald-500', 'border-l-amber-500']

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const pct = (v: number) => `${Math.round(v * 100)}%`

function Attainment({ revenue, goal }: { revenue: number; goal: number }) {
  const r = revenue / goal
  return <span className={cn('font-medium tabular-nums', r >= 1 ? 'text-emerald-600' : r >= 0.8 ? 'text-amber-600' : 'text-rose-600')}>{pct(r)}</span>
}

export default function DatatableAgrupadaComSubtotais() {
  const [groupKey, setGroupKey] = useState<GroupKey>('region')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const groups = useMemo(() => {
    const map = new Map<string, Sale[]>()
    for (const s of SALES) {
      const k = s[groupKey]
      const list = map.get(k)
      if (list) list.push(s)
      else map.set(k, [s])
    }
    const keys = [...map.keys()].sort((a, b) => (groupKey === 'month' ? MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b) : a.localeCompare(b, 'pt-BR')))
    return keys.map((key, i) => {
      const items = map.get(key) ?? []
      return {
        key,
        accent: ACCENTS[i % ACCENTS.length] ?? '',
        items,
        orders: items.reduce((a, s) => a + s.orders, 0),
        revenue: items.reduce((a, s) => a + s.revenue, 0),
        goal: items.reduce((a, s) => a + s.goal, 0),
      }
    })
  }, [groupKey])

  const totalOrders = SALES.reduce((a, s) => a + s.orders, 0)
  const totalRevenue = SALES.reduce((a, s) => a + s.revenue, 0)
  const totalGoal = SALES.reduce((a, s) => a + s.goal, 0)
  const groupLabel = GROUPS.find((g) => g.key === groupKey)?.label ?? ''
  const toggle = (key: string) =>
    setCollapsed((s) => {
      const next = new Set(s)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Vendas por {groupLabel.toLowerCase()}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Escolha a chave de agrupamento; cada grupo mostra subtotal, participação na receita e atingimento da meta.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ToggleGroup
              variant="outline"
              size="sm"
              spacing={0}
              aria-label="Agrupar por"
              value={[groupKey]}
              onValueChange={(v) => {
                const next = v[0]
                if (next === 'region' || next === 'seller' || next === 'month') {
                  setGroupKey(next)
                  setCollapsed(new Set())
                }
              }}
            >
              {GROUPS.map((g) => (
                <ToggleGroupItem key={g.key} value={g.key} className="aria-pressed:bg-muted">
                  {g.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(collapsed.size === 0 ? new Set(groups.map((g) => g.key)) : new Set())}>
              {collapsed.size === 0 ? <Shrink data-icon="inline-start" /> : <Expand data-icon="inline-start" />}
              {collapsed.size === 0 ? 'Recolher todos' : 'Expandir todos'}
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[38%] pl-4">{groupLabel} / vendedor</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="text-right">Pedidos</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="w-44">Participação</TableHead>
                <TableHead className="text-right">Meta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.flatMap((g) => {
                const open = !collapsed.has(g.key)
                const share = g.revenue / totalRevenue
                const header = (
                  <TableRow key={`g-${g.key}`} className={cn('border-l-4 bg-muted/40 hover:bg-muted/60', g.accent)}>
                    <TableCell className="pl-3">
                      <button type="button" onClick={() => toggle(g.key)} aria-expanded={open} className="flex items-center gap-2 font-medium">
                        <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', !open && '-rotate-90')} />
                        {g.key}
                        <Badge variant="secondary" className="font-normal">{g.items.length}</Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{open ? '' : 'recolhido'}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{g.orders}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{brl(g.revenue)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${share * 100}%` }} />
                        </div>
                        <span className="w-9 text-right text-xs tabular-nums">{pct(share)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Attainment revenue={g.revenue} goal={g.goal} />
                    </TableCell>
                  </TableRow>
                )
                const children = open
                  ? g.items.map((s) => (
                      <TableRow key={s.id} className="border-l-4 border-l-transparent">
                        <TableCell className="pl-11">
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback>{s.initials}</AvatarFallback>
                            </Avatar>
                            <span>{s.seller}</span>
                            {groupKey !== 'region' && <span className="text-xs text-muted-foreground">· {s.region}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{s.month}</TableCell>
                        <TableCell className="text-right tabular-nums">{s.orders}</TableCell>
                        <TableCell className="text-right tabular-nums">{brl(s.revenue)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground tabular-nums">{pct(s.revenue / g.revenue)} do grupo</TableCell>
                        <TableCell className="text-right">
                          <Attainment revenue={s.revenue} goal={s.goal} />
                        </TableCell>
                      </TableRow>
                    ))
                  : []
                return [header, ...children]
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="pl-4 font-medium">Total geral · {groups.length} grupos</TableCell>
                <TableCell className="text-right tabular-nums">{totalOrders}</TableCell>
                <TableCell className="text-right tabular-nums">{brl(totalRevenue)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">100%</TableCell>
                <TableCell className="text-right">
                  <Attainment revenue={totalRevenue} goal={totalGoal} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </section>
  )
}
