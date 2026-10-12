'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, Banknote, Bell, ChartColumn, ChevronsUpDown, CreditCard, House, Package, Percent, Plus, QrCode, Search, ShoppingBag, ShoppingCart, Tag, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Pagamento = 'Pix' | 'Cartão' | 'Boleto'
type StatusPedido = 'Pago' | 'Pendente' | 'Enviado' | 'Cancelado'
type Filtro = 'Todos' | 'Pagos' | 'Pendentes'

interface Pedido {
  id: string
  cliente: string
  iniciais: string
  itens: number
  pagamento: Pagamento
  status: StatusPedido
  total: string
  quando: string
}

const NAV: { Icon: LucideIcon; label: string; badge?: string; active?: boolean }[] = [
  { Icon: House, label: 'Início' },
  { Icon: ShoppingCart, label: 'Pedidos', badge: '12', active: true },
  { Icon: Package, label: 'Produtos' },
  { Icon: Users, label: 'Clientes' },
  { Icon: Tag, label: 'Descontos' },
  { Icon: ChartColumn, label: 'Relatórios' },
]

const CANAIS = [
  { nome: 'Loja online', detalhe: 'aurorashop.com.br', ok: true },
  { nome: 'Mercado Livre', detalhe: '38 anúncios ativos', ok: true },
  { nome: 'Instagram Shop', detalhe: 'sincronizando catálogo…', ok: false },
]

const STATS: { Icon: LucideIcon; label: string; valor: string; delta: string; up: boolean }[] = [
  { Icon: Banknote, label: 'Receita hoje', valor: 'R$ 12.480', delta: '+14%', up: true },
  { Icon: ShoppingCart, label: 'Pedidos', valor: '48', delta: '+6', up: true },
  { Icon: ShoppingBag, label: 'Ticket médio', valor: 'R$ 260', delta: '-2,1%', up: false },
  { Icon: Percent, label: 'Conversão', valor: '2,8%', delta: '+0,4 pp', up: true },
]

const FLUXO = [
  { label: 'Novos', n: 48 },
  { label: 'Pagos', n: 31 },
  { label: 'Em separação', n: 22 },
  { label: 'Enviados', n: 14 },
  { label: 'Entregues', n: 9 },
]

const PEDIDOS: Pedido[] = [
  { id: '#5821', cliente: 'Mariana Lopes', iniciais: 'ML', itens: 3, pagamento: 'Pix', status: 'Pago', total: 'R$ 489,70', quando: 'há 4 min' },
  { id: '#5820', cliente: 'Carlos Eduardo', iniciais: 'CE', itens: 1, pagamento: 'Cartão', status: 'Enviado', total: 'R$ 299,00', quando: 'há 22 min' },
  { id: '#5819', cliente: 'Fernanda Dias', iniciais: 'FD', itens: 2, pagamento: 'Boleto', status: 'Pendente', total: 'R$ 158,90', quando: 'há 1 h' },
  { id: '#5818', cliente: 'Rafael Nunes', iniciais: 'RN', itens: 5, pagamento: 'Cartão', status: 'Pago', total: 'R$ 1.240,00', quando: 'há 2 h' },
  { id: '#5817', cliente: 'Juliana Alves', iniciais: 'JA', itens: 1, pagamento: 'Pix', status: 'Cancelado', total: 'R$ 89,90', quando: 'há 3 h' },
  { id: '#5816', cliente: 'Pedro Henrique', iniciais: 'PH', itens: 2, pagamento: 'Cartão', status: 'Pendente', total: 'R$ 376,00', quando: 'há 5 h' },
]

const PRODUTOS = [
  { nome: 'Tênis Runner Pro', sku: 'TR-042', vendidos: 84, receita: 'R$ 25.116', estoque: 12, cor: 'from-sky-500/70 to-sky-500/10' },
  { nome: 'Jaqueta Corta-vento', sku: 'JC-118', vendidos: 61, receita: 'R$ 18.239', estoque: 34, cor: 'from-violet-500/70 to-violet-500/10' },
  { nome: 'Garrafa Térmica 1L', sku: 'GT-007', vendidos: 57, receita: 'R$ 5.643', estoque: 4, cor: 'from-emerald-500/70 to-emerald-500/10' },
  { nome: 'Mochila Urbana 25L', sku: 'MU-301', vendidos: 39, receita: 'R$ 9.321', estoque: 52, cor: 'from-amber-500/70 to-amber-500/10' },
  { nome: 'Boné Trail', sku: 'BT-014', vendidos: 28, receita: 'R$ 2.492', estoque: 71, cor: 'from-rose-500/70 to-rose-500/10' },
]
const ESTOQUE_MAX = 80

const PAG_ICON: Record<Pagamento, LucideIcon> = { Pix: QrCode, Cartão: CreditCard, Boleto: Banknote }
const STATUS_BADGE: Record<StatusPedido, 'default' | 'secondary' | 'outline' | 'destructive'> = { Pago: 'default', Enviado: 'secondary', Pendente: 'outline', Cancelado: 'destructive' }
const FILTROS: Filtro[] = ['Todos', 'Pagos', 'Pendentes']

export default function DashboardShellEcommerce() {
  const [filtro, setFiltro] = useState<Filtro>('Todos')
  const [aberta, setAberta] = useState(true)
  const pedidos = PEDIDOS.filter((p) => (filtro === 'Todos' ? true : filtro === 'Pagos' ? p.status === 'Pago' || p.status === 'Enviado' : p.status === 'Pendente'))

  return (
    <div className="flex min-h-[640px] w-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar md:flex">
        <button type="button" className="m-2 flex items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-sidebar-accent">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-400 text-sm font-semibold text-white">A</span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold">Aurora Shop</span>
            <span className="block truncate text-xs text-muted-foreground">aurorashop.com.br</span>
          </span>
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </button>

        <nav className="px-2">
          <p className="px-2 pt-2 pb-1 text-xs font-medium text-muted-foreground">Loja</p>
          {NAV.map((n) => (
            <a key={n.label} href="#" className={cn('flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors', n.active ? 'bg-sidebar-accent font-medium' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground')}>
              <n.Icon className="size-4" />
              <span className="flex-1">{n.label}</span>
              {n.badge && <span className="rounded-md bg-primary px-1.5 text-[11px] font-medium text-primary-foreground tabular-nums">{n.badge}</span>}
            </a>
          ))}
          <p className="px-2 pt-4 pb-1 text-xs font-medium text-muted-foreground">Canais de venda</p>
          {CANAIS.map((c) => (
            <a key={c.nome} href="#" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
              <span className={cn('size-2 shrink-0 rounded-full', c.ok ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')} />
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-foreground">{c.nome}</span>
                <span className="block truncate text-[11px]">{c.detalhe}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between gap-2 border-t p-3">
          <Label htmlFor="loja-aberta" className="flex flex-col gap-0.5 font-normal">
            <span className="text-sm font-medium">{aberta ? 'Loja aberta' : 'Loja pausada'}</span>
            <span className="text-xs text-muted-foreground">{aberta ? '14 visitantes agora' : 'Checkout desativado'}</span>
          </Label>
          <Switch id="loja-aberta" checked={aberta} onCheckedChange={setAberta} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">Aurora Shop</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Pedidos</span>
          </nav>
          <div className="relative ml-auto hidden w-56 lg:block">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar pedido, cliente ou SKU" className="pl-8" aria-label="Buscar" />
          </div>
          <Button size="sm">
            <Plus data-icon="inline-start" /> Criar pedido
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Notificações">
            <Bell />
          </Button>
          <Avatar size="sm">
            <AvatarFallback>LM</AvatarFallback>
          </Avatar>
        </header>

        <main className="space-y-4 p-4 sm:p-6">
          <div className="grid grid-cols-2 divide-x divide-y rounded-xl border bg-card lg:grid-cols-4 lg:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <s.Icon className="size-4 text-muted-foreground" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">{s.label}</p>
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-lg font-semibold tabular-nums">{s.valor}</span>
                    <span className={cn('flex items-center text-xs font-medium', s.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                      {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {s.delta}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium">Fluxo de pedidos de hoje</p>
              <span className="text-xs text-muted-foreground">Atualizado há 1 min</span>
            </div>
            <ol className="grid grid-cols-5 gap-2">
              {FLUXO.map((f, i) => (
                <li key={f.label}>
                  <div className="h-1.5 rounded-full bg-primary" style={{ opacity: 1 - i * 0.18 }} />
                  <p className="mt-2 text-lg font-semibold tabular-nums">{f.n}</p>
                  <p className="truncate text-xs text-muted-foreground">{f.label}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
            <div className="overflow-hidden rounded-xl border bg-card">
              <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
                <p className="text-sm font-medium">Pedidos recentes</p>
                <div className="ml-auto inline-flex rounded-lg bg-muted p-0.5">
                  {FILTROS.map((f) => (
                    <button key={f} type="button" onClick={() => setFiltro(f)} aria-pressed={filtro === f} className={cn('rounded-md px-2.5 py-1 text-xs font-medium transition-colors', filtro === f ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4">Pedido</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-4 text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((p) => {
                    const Icon = PAG_ICON[p.pagamento]
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="pl-4">
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback>{p.iniciais}</AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <div className="font-medium">{p.cliente}</div>
                              <div className="text-xs text-muted-foreground">
                                {p.id} · {p.itens} {p.itens === 1 ? 'item' : 'itens'} · {p.quando}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Icon className="size-4" /> {p.pagamento}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS_BADGE[p.status]}>{p.status}</Badge>
                        </TableCell>
                        <TableCell className="pr-4 text-right font-medium tabular-nums">{p.total}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="rounded-xl border bg-card">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-medium">Mais vendidos</p>
                <span className="text-xs text-muted-foreground">Últimos 7 dias</span>
              </div>
              <ol className="divide-y">
                {PRODUTOS.map((pr, i) => (
                  <li key={pr.sku} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="w-4 text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                    <span className={cn('size-9 shrink-0 rounded-md bg-gradient-to-br', pr.cor)} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{pr.nome}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1 flex-1 rounded-full bg-muted">
                          <div className={cn('h-full rounded-full', pr.estoque <= 10 ? 'bg-rose-500' : pr.estoque <= 30 ? 'bg-amber-500' : 'bg-emerald-500')} style={{ width: `${(pr.estoque / ESTOQUE_MAX) * 100}%` }} />
                        </div>
                        <span className={cn('text-[11px] tabular-nums', pr.estoque <= 10 ? 'font-medium text-rose-600 dark:text-rose-400' : 'text-muted-foreground')}>{pr.estoque} em estoque</span>
                      </div>
                    </div>
                    <div className="text-right leading-tight">
                      <p className="text-sm font-medium tabular-nums">{pr.receita}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">{pr.vendidos} un.</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
