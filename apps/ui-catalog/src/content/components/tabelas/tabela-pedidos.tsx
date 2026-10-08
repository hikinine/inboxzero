'use client'

import { MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const ORDERS = [
  { id: '#10482', client: 'Ana Souza', initials: 'AS', total: 'R$ 1.290,00', status: 'Pago', date: '08/10/2026' },
  { id: '#10481', client: 'Bruno Rocha', initials: 'BR', total: 'R$ 349,90', status: 'Pendente', date: '08/10/2026' },
  { id: '#10480', client: 'Carla Mendes', initials: 'CM', total: 'R$ 2.480,00', status: 'Pago', date: '07/10/2026' },
  { id: '#10479', client: 'Diego Lima', initials: 'DL', total: 'R$ 99,00', status: 'Reembolsado', date: '07/10/2026' },
  { id: '#10478', client: 'Elisa Farias', initials: 'EF', total: 'R$ 780,00', status: 'Falhou', date: '06/10/2026' },
]

const TONE: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = { Pago: 'default', Pendente: 'secondary', Reembolsado: 'outline', Falhou: 'destructive' }

export default function TabelaPedidos() {
  return (
    <div className="w-full max-w-4xl rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox aria-label="Selecionar todos" />
            </TableHead>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {ORDERS.map((o) => (
            <TableRow key={o.id}>
              <TableCell>
                <Checkbox aria-label={`Selecionar ${o.id}`} />
              </TableCell>
              <TableCell className="font-mono text-xs">{o.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback>{o.initials}</AvatarFallback>
                  </Avatar>
                  {o.client}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={TONE[o.status]}>{o.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{o.date}</TableCell>
              <TableCell className="text-right tabular-nums">{o.total}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Ações" />}>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem>Reenviar recibo</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Cancelar pedido</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
