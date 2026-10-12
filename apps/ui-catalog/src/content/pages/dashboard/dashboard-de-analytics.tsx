'use client'

import { Activity, ArrowDownRight, ArrowUpRight, Bell, CalendarDays, ChevronsUpDown, Clock, Database, FileText, Gauge, Globe, LayoutDashboard, MousePointerClick, Search, Settings, Target, Users, Zap } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MAIN_NAV = [
  { Icon: LayoutDashboard, label: 'Visão geral', active: true },
  { Icon: Activity, label: 'Tempo real', badge: '38' },
  { Icon: FileText, label: 'Páginas' },
  { Icon: MousePointerClick, label: 'Eventos' },
  { Icon: Target, label: 'Funis' },
  { Icon: Users, label: 'Públicos' },
]
const CONFIG_NAV = [
  { Icon: Database, label: 'Fontes de dados' },
  { Icon: Globe, label: 'Domínios' },
  { Icon: Settings, label: 'Configurações' },
]

const KPIS = [
  { l: 'Visitantes únicos', v: '84.212', d: '+12,4%', up: true },
  { l: 'Sessões', v: '131.908', d: '+8,1%', up: true },
  { l: 'Taxa de conversão', v: '3,42%', d: '-0,3 pp', up: false },
  { l: 'Tempo médio', v: '4m 12s', d: '+18s', up: true },
]

const TRAFFIC = [
  { d: '1 out', visitantes: 2400, sessoes: 3900 },
  { d: '3 out', visitantes: 2650, sessoes: 4100 },
  { d: '5 out', visitantes: 2210, sessoes: 3600 },
  { d: '7 out', visitantes: 3100, sessoes: 4800 },
  { d: '9 out', visitantes: 3380, sessoes: 5100 },
  { d: '11 out', visitantes: 2980, sessoes: 4700 },
  { d: '13 out', visitantes: 3550, sessoes: 5600 },
  { d: '15 out', visitantes: 3720, sessoes: 5900 },
  { d: '17 out', visitantes: 3300, sessoes: 5200 },
  { d: '19 out', visitantes: 3950, sessoes: 6300 },
  { d: '21 out', visitantes: 4120, sessoes: 6500 },
  { d: '23 out', visitantes: 3890, sessoes: 6100 },
  { d: '25 out', visitantes: 4400, sessoes: 6900 },
  { d: '27 out', visitantes: 4680, sessoes: 7300 },
]
const TRAFFIC_CONFIG = {
  visitantes: { label: 'Visitantes', color: 'var(--primary)' },
  sessoes: { label: 'Sessões', color: 'var(--chart-2)' },
} satisfies ChartConfig

const SOURCES = [
  { fonte: 'Orgânico', sessoes: 52400 },
  { fonte: 'Direto', sessoes: 28100 },
  { fonte: 'Social', sessoes: 19800 },
  { fonte: 'E-mail', sessoes: 14200 },
  { fonte: 'Pago', sessoes: 11300 },
  { fonte: 'Indicação', sessoes: 6100 },
]
const SOURCES_CONFIG = { sessoes: { label: 'Sessões', color: 'var(--primary)' } } satisfies ChartConfig

const PAGES = [
  { p: '/', views: '41.208', unicos: '28.410', tempo: '1m 48s', rej: '38%', up: true },
  { p: '/precos', views: '18.934', unicos: '15.201', tempo: '2m 31s', rej: '29%', up: true },
  { p: '/blog/como-medir-retencao', views: '12.117', unicos: '11.380', tempo: '6m 04s', rej: '61%', up: false },
  { p: '/cadastro', views: '9.802', unicos: '9.115', tempo: '0m 58s', rej: '22%', up: true },
  { p: '/docs/instalacao', views: '7.455', unicos: '5.920', tempo: '4m 40s', rej: '44%', up: false },
  { p: '/integracoes', views: '5.310', unicos: '4.871', tempo: '1m 36s', rej: '51%', up: true },
]

const EVENTS = [
  { e: 'signup_completed', u: 'MC', d: 'plano: growth · origem: google', t: 'há 2 min' },
  { e: 'checkout_started', u: 'RN', d: 'valor: R$ 297 · cupom: OUT10', t: 'há 5 min' },
  { e: 'report_created', u: 'LP', d: 'tipo: funil · 4 etapas', t: 'há 9 min' },
  { e: 'integration_connected', u: 'JA', d: 'app: google_sheets', t: 'há 14 min' },
  { e: 'trial_expiring', u: 'DS', d: 'dias restantes: 2', t: 'há 21 min' },
  { e: 'pageview', u: 'VM', d: '/blog/como-medir-retencao', t: 'há 22 min' },
]

function MetricaSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Gauge className="size-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-semibold">Métrica</span>
                <span className="text-xs text-muted-foreground">Workspace Lumi</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV.map((n) => (
                <SidebarMenuItem key={n.label}>
                  <SidebarMenuButton isActive={n.active} tooltip={n.label} render={<a href="#" />}>
                    <n.Icon />
                    <span>{n.label}</span>
                  </SidebarMenuButton>
                  {n.badge && <SidebarMenuBadge>{n.badge}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Configurar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CONFIG_NAV.map((n) => (
                <SidebarMenuItem key={n.label}>
                  <SidebarMenuButton tooltip={n.label} render={<a href="#" />}>
                    <n.Icon />
                    <span>{n.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <div className="rounded-lg border bg-background p-3 text-xs group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-1.5 font-medium">
                <Zap className="size-3.5" /> Plano Pro
              </div>
              <p className="mt-1 text-muted-foreground">1,2 mi de 2 mi eventos usados este mês.</p>
              <div className="mt-2 h-1.5 rounded-full bg-muted">
                <div className="h-full w-[60%] rounded-full bg-primary" />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar size="sm">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="flex flex-col leading-tight">
                <span className="font-medium">Ana Souza</span>
                <span className="text-xs text-muted-foreground">ana@lumi.com.br</span>
              </span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default function DashboardDeAnalytics() {
  return (
    <SidebarProvider className="min-h-screen w-full bg-background text-foreground">
      <MetricaSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger aria-label="Alternar menu lateral" />
          <Separator orientation="vertical" className="mx-1 h-4 w-px self-center!" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden sm:inline-flex">
                <BreadcrumbLink href="#">Lumi</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Visão geral</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar páginas, eventos…" className="w-64 pl-8" aria-label="Buscar" />
            </div>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <CalendarDays data-icon="inline-start" /> Últimos 30 dias
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notificações">
              <Bell />
            </Button>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Visão geral</h1>
              <p className="text-sm text-muted-foreground">lumi.com.br · comparando com os 30 dias anteriores</p>
            </div>
            <Tabs defaultValue="30d">
              <TabsList>
                <TabsTrigger value="7d">7 dias</TabsTrigger>
                <TabsTrigger value="30d">30 dias</TabsTrigger>
                <TabsTrigger value="90d">90 dias</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((k) => (
              <Card key={k.l} size="sm">
                <CardHeader>
                  <CardDescription>{k.l}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">{k.v}</CardTitle>
                  <CardAction>
                    <Badge variant="outline" className={`gap-1 ${k.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {k.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {k.d}
                    </Badge>
                  </CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Visitantes e sessões</CardTitle>
                <CardDescription>Por dia, outubro de 2026</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={TRAFFIC_CONFIG} className="h-[260px] w-full">
                  <AreaChart data={TRAFFIC} margin={{ left: 4, right: 4 }}>
                    <defs>
                      <linearGradient id="metrica-vis" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-visitantes)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--color-visitantes)" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="metrica-ses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-sessoes)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-sessoes)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="d" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Area dataKey="sessoes" type="monotone" fill="url(#metrica-ses)" stroke="var(--color-sessoes)" strokeWidth={2} />
                    <Area dataKey="visitantes" type="monotone" fill="url(#metrica-vis)" stroke="var(--color-visitantes)" strokeWidth={2} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fontes de tráfego</CardTitle>
                <CardDescription>Sessões por origem</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={SOURCES_CONFIG} className="h-[260px] w-full">
                  <BarChart data={SOURCES} layout="vertical" margin={{ left: 0, right: 8 }}>
                    <CartesianGrid horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="fonte" type="category" tickLine={false} axisLine={false} width={72} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="sessoes" fill="var(--color-sessoes)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Páginas mais acessadas</CardTitle>
                <CardDescription>Top 6 por visualizações</CardDescription>
                <CardAction>
                  <Button variant="ghost" size="sm">
                    Ver todas
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Página</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="hidden text-right sm:table-cell">Únicos</TableHead>
                      <TableHead className="hidden text-right md:table-cell">Tempo</TableHead>
                      <TableHead className="pr-4 text-right">Rejeição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PAGES.map((p) => (
                      <TableRow key={p.p}>
                        <TableCell className="pl-4 font-mono text-xs">{p.p}</TableCell>
                        <TableCell className="text-right tabular-nums">{p.views}</TableCell>
                        <TableCell className="hidden text-right tabular-nums text-muted-foreground sm:table-cell">{p.unicos}</TableCell>
                        <TableCell className="hidden text-right tabular-nums text-muted-foreground md:table-cell">{p.tempo}</TableCell>
                        <TableCell className="pr-4 text-right">
                          <span className={`inline-flex items-center justify-end gap-1 tabular-nums ${p.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {p.up ? <ArrowDownRight className="size-3" /> : <ArrowUpRight className="size-3" />}
                            {p.rej}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Eventos recentes</CardTitle>
                <CardDescription>Fluxo em tempo real</CardDescription>
                <CardAction>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-emerald-500" /> ao vivo
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent className="px-0">
                <ul className="divide-y">
                  {EVENTS.map((e, i) => (
                    <li key={i} className="flex items-start gap-3 px-4 py-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>{e.u}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-mono text-xs font-medium">{e.e}</div>
                        <div className="truncate text-xs text-muted-foreground">{e.d}</div>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="size-3" /> {e.t}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
