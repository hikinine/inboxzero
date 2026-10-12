'use client'

import { useState } from 'react'
import { Columns3, Eye, RotateCcw } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Status = 'Pago' | 'Pendente' | 'Enviado' | 'Cancelado'
interface Order {
  id: string
  customer: string
  initials: string
  email: string
  status: Status
  items: number
  total: number
  date: string
  payment: string
}

const ORDERS: Order[] = [
  { id: '#10482', customer: 'Ana Souza', initials: 'AS', email: 'ana.souza@exemplo.com', status: 'Pago', items: 3, total: 1290, date: '08/10/2026', payment: 'Pix' },
  { id: '#10481', customer: 'Bruno Rocha', initials: 'BR', email: 'bruno.rocha@exemplo.com', status: 'Pendente', items: 1, total: 349.9, date: '08/10/2026', payment: 'Boleto' },
  { id: '#10480', customer: 'Carla Mendes', initials: 'CM', email: 'carla.mendes@exemplo.com', status: 'Enviado', items: 2, total: 2480, date: '07/10/2026', payment: 'Cartão' },
  { id: '#10479', customer: 'Diego Lima', initials: 'DL', email: 'diego.lima@exemplo.com', status: 'Cancelado', items: 1, total: 99, date: '07/10/2026', payment: 'Cartão' },
  { id: '#10478', customer: 'Elisa Farias', initials: 'EF', email: 'elisa.farias@exemplo.com', status: 'Pago', items: 4, total: 780, date: '06/10/2026', payment: 'Pix' },
  { id: '#10477', customer: 'Fábio Teixeira', initials: 'FT', email: 'fabio.teixeira@exemplo.com', status: 'Enviado', items: 2, total: 1049.8, date: '05/10/2026', payment: 'Cartão' },
]

type ColKey = 'id' | 'customer' | 'email' | 'status' | 'items' | 'total' | 'date' | 'payment'
const COLUMNS: Array<{ key: ColKey; label: string; align?: 'right'; locked?: boolean }> = [
  { key: 'id', label: 'Pedido', locked: true },
  { key: 'customer', label: 'Cliente' },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status' },
  { key: 'items', label: 'Itens', align: 'right' },
  { key: 'total', label: 'Total', align: 'right' },
  { key: 'date', label: 'Data' },
  { key: 'payment', label: 'Pagamento' },
]
const DEFAULT_HIDDEN: ColKey[] = ['email', 'payment']
const TONE: Record<Status, 'default' | 'secondary' | 'outline' | 'destructive'> = { Pago: 'default', Pendente: 'secondary', Enviado: 'outline', Cancelado: 'destructive' }

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function cell(o: Order, key: ColKey) {
  switch (key) {
    case 'id':
      return <span className="font-mono text-xs">{o.id}</span>
    case 'customer':
      return (
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>{o.initials}</AvatarFallback>
          </Avatar>
          {o.customer}
        </div>
      )
    case 'email':
      return <span className="text-muted-foreground">{o.email}</span>
    case 'status':
      return <Badge variant={TONE[o.status]}>{o.status}</Badge>
    case 'items':
      return <span className="tabular-nums">{o.items}</span>
    case 'total':
      return <span className="tabular-nums">{brl(o.total)}</span>
    case 'date':
      return <span className="text-muted-foreground">{o.date}</span>
    case 'payment':
      return o.payment
    default:
      return null
  }
}

export default function DatatableComColunasOcultaveis() {
  const [hidden, setHidden] = useState<Set<ColKey>>(new Set(DEFAULT_HIDDEN))
  const visible = COLUMNS.filter((c) => !hidden.has(c.key))
  const isDefault = hidden.size === DEFAULT_HIDDEN.length && DEFAULT_HIDDEN.every((k) => hidden.has(k))

  const setVisible = (key: ColKey, show: boolean) =>
    setHidden((s) => {
      const n = new Set(s)
      if (show) n.delete(key)
      else n.add(key)
      return n
    })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Pedidos recentes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {visible.length} de {COLUMNS.length} colunas visíveis
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isDefault && (
              <Button variant="ghost" size="sm" onClick={() => setHidden(new Set(DEFAULT_HIDDEN))}>
                <RotateCcw data-icon="inline-start" /> Redefinir
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
                <Columns3 data-icon="inline-start" /> Colunas
                <Badge variant="secondary" className="ml-1">{visible.length}</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Exibir colunas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {COLUMNS.map((c) => (
                  <DropdownMenuCheckboxItem key={c.key} checked={!hidden.has(c.key)} disabled={c.locked} onCheckedChange={(checked) => setVisible(c.key, checked)}>
                    {c.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                {visible.map((c) => (
                  <TableHead key={c.key} className={cn(c.align === 'right' && 'text-right')}>{c.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((o) => (
                <TableRow key={o.id}>
                  {visible.map((c) => (
                    <TableCell key={c.key} className={cn(c.align === 'right' && 'text-right')}>{cell(o, c.key)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {hidden.size > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
              <span>Ocultas:</span>
              {COLUMNS.filter((c) => hidden.has(c.key)).map((c) => (
                <button key={c.key} type="button" onClick={() => setVisible(c.key, true)} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted hover:text-foreground" aria-label={`Mostrar coluna ${c.label}`}>
                  <Eye className="size-3" /> {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
