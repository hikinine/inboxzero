'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Bell, CreditCard, Home, Package, Percent, Settings, ShoppingBag, ShoppingCart, Store, Tag, Users } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Period = '7d' | '30d' | '90d'

const NAV: { Icon: LucideIcon; label: string; active?: boolean }[] = [
  { Icon: Home, label: 'Início', active: true },
  { Icon: ShoppingCart, label: 'Pedidos' },
  { Icon: Package, label: 'Produtos' },
  { Icon: Users, label: 'Clientes' },
  { Icon: Tag, label: 'Promoções' },
  { Icon: CreditCard, label: 'Financeiro' },
  { Icon: Settings, label: 'Configurações' },
]
const PERIODS: { id: Period; label: string }[] = [
  { id: '7d', label: '7 dias' },
  { id: '30d', label: '30 dias' },
  { id: '90d', label: '90 dias' },
]
const KPIS: { Icon: LucideIcon; label: string; value: string; delta: string; up: boolean }[] = [
  { Icon: ShoppingBag, label: 'Receita', value: 'R$ 184.320', delta: '+12,4%', up: true },
  { Icon: ShoppingCart, label: 'Pedidos', value: '2.318', delta: '+8,1%', up: true },
  { Icon: CreditCard, label: 'Ticket médio', value: 'R$ 79,52', delta: '-1,2%', up: false },
  { Icon: Percent, label: 'Conversão', value: '3,4%', delta: '+0,3 pp', up: true },
]

function series(n: number, base: number, amp: number) {
  return Array.from({ length: n }, (_, i) => ({ d: `${i + 1}`, v: Math.round(base + Math.sin(i / 1.8) * amp + (i * amp) / n) }))
}
const DATA: Record<Period, { d: string; v: number }[]> = { '7d': series(7, 24, 6), '30d': series(30, 22, 8), '90d': series(90, 18, 10) }
const CONFIG = { v: { label: 'Receita (R$ mil)', color: 'var(--chart-1)' } } satisfies ChartConfig

const ORDERS = [
  { id: '#10492', client: 'Ana Souza', initials: 'AS', total: 'R$ 349,90', status: 'Pago' },
  { id: '#10491', client: 'Bruno Rocha', initials: 'BR', total: 'R$ 1.290,00', status: 'Enviado' },
  { id: '#10490', client: 'Carla Mendes', initials: 'CM', total: 'R$ 89,90', status: 'Pendente' },
  { id: '#10489', client: 'Diego Lima', initials: 'DL', total: 'R$ 459,00', status: 'Pago' },
]
const STATUS: Record<string, 'default' | 'secondary' | 'outline'> = { Pago: 'default', Enviado: 'secondary', Pendente: 'outline' }

export default function DashboardShellKpi() {
  const [period, setPeriod] = useState<Period>('30d')
  return (
    <div className="flex min-h-[640px] w-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-sidebar p-3 md:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="size-3.5" />
          </span>
          Lojix
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {NAV.map((n) => (
            <a key={n.label} href="#" className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${n.active ? 'bg-sidebar-accent font-medium' : 'text-muted-foreground hover:bg-sidebar-accent'}`}>
              <n.Icon className="size-4" /> {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto rounded-md border bg-background p-3 text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Loja aberta
          </div>
          <p className="mt-1 text-muted-foreground">lojix.com.br · 14 visitantes agora</p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center gap-3 border-b px-4 sm:px-6">
          <h1 className="font-medium">Início</h1>
          <div className="ml-auto inline-flex rounded-lg border bg-muted/40 p-0.5">
            {PERIODS.map((p) => (
              <button key={p.id} type="button" onClick={() => setPeriod(p.id)} className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${period === p.id ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" aria-label="Notificações">
            <Bell />
          </Button>
          <Avatar>
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </header>

        <main className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((k) => (
              <Card key={k.label} size="sm">
                <CardContent className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <k.Icon className="size-5 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="text-xl font-semibold tabular-nums">{k.value}</p>
                    <p className={`mt-0.5 flex items-center gap-1 text-xs ${k.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {k.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {k.delta} <span className="text-muted-foreground">vs. período anterior</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Receita por dia</CardTitle>
                <CardDescription>Últimos {PERIODS.find((p) => p.id === period)?.label}, em R$ mil</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={CONFIG} className="h-[220px] w-full">
                  <AreaChart data={DATA[period]} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="d" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Area dataKey="v" type="natural" fill="var(--color-v)" fillOpacity={0.25} stroke="var(--color-v)" strokeWidth={2} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Últimos pedidos</CardTitle>
                <CardDescription>Atualizado há 1 min</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Cliente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="pr-4 text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="pl-4">
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback>{o.initials}</AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <div>{o.client}</div>
                              <div className="text-xs text-muted-foreground">{o.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS[o.status] ?? 'outline'}>{o.status}</Badge>
                        </TableCell>
                        <TableCell className="pr-4 text-right tabular-nums">{o.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
