'use client'

import { ArrowUpRight, Bell, Home, Inbox, KanbanSquare, LineChart, Search, Settings, Users } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const NAV = [
  { Icon: Home, label: 'Visão geral', active: true },
  { Icon: Inbox, label: 'Inbox' },
  { Icon: KanbanSquare, label: 'Pipeline' },
  { Icon: Users, label: 'Contatos' },
  { Icon: LineChart, label: 'Relatórios' },
  { Icon: Settings, label: 'Configurações' },
]
const KPIS = [
  ['Receita (mês)', 'R$ 184.320', '+18,4%'],
  ['Novos leads', '1.284', '+6,1%'],
  ['Taxa de resposta', '96%', '+2 pp'],
  ['Ticket médio', 'R$ 1.902', '+4,8%'],
]
const DATA = Array.from({ length: 12 }, (_, i) => ({ d: `${i + 1}`, v: 20 + Math.round(Math.sin(i / 2) * 8 + i * 2.2) }))
const CONFIG = { v: { label: 'Receita', color: 'var(--chart-1)' } } satisfies ChartConfig
const DEALS = [
  ['Lumi Tecnologia', 'Proposta', 'R$ 24.000', 'AS'],
  ['Kavo Ltda', 'Negociação', 'R$ 12.500', 'BR'],
  ['Nuvem Fit', 'Fechamento', 'R$ 31.200', 'CM'],
  ['Prisma Dados', 'Qualificado', 'R$ 8.900', 'DL'],
]

export default function DashboardVisaoGeral() {
  return (
    <div className="flex min-h-[720px] w-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-sidebar p-3 md:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold">
          <span className="size-5 rounded-md bg-primary" /> Acme
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {NAV.map((n) => (
            <a key={n.label} href="#" className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${n.active ? 'bg-sidebar-accent font-medium' : 'text-muted-foreground hover:bg-sidebar-accent'}`}>
              <n.Icon className="size-4" /> {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-md border p-2 text-sm">
          <Avatar size="sm">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="truncate font-medium">Ana Souza</div>
            <div className="truncate text-xs text-muted-foreground">Plano Pro</div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center gap-3 border-b px-6">
          <h1 className="font-medium">Visão geral</h1>
          <div className="relative ml-auto hidden w-64 sm:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar…" className="pl-8" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notificações">
            <Bell />
          </Button>
          <Button size="sm">Novo negócio</Button>
        </header>

        <main className="space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map(([l, v, d]) => (
              <Card key={l} size="sm">
                <CardHeader>
                  <CardDescription>{l}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">{v}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="gap-1">
                    <ArrowUpRight className="size-3" /> {d}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Receita diária</CardTitle>
                <CardDescription>Últimos 12 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={CONFIG} className="h-[220px] w-full">
                  <AreaChart data={DATA} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="d" tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Area dataKey="v" type="natural" fill="var(--color-v)" fillOpacity={0.3} stroke="var(--color-v)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Negócios quentes</CardTitle>
                <CardDescription>Fecham esta semana</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Empresa</TableHead>
                      <TableHead>Etapa</TableHead>
                      <TableHead className="pr-4 text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DEALS.map(([c, s, v, a]) => (
                      <TableRow key={c}>
                        <TableCell className="pl-4">
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback>{a}</AvatarFallback>
                            </Avatar>
                            {c}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{s}</Badge>
                        </TableCell>
                        <TableCell className="pr-4 text-right tabular-nums">{v}</TableCell>
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
