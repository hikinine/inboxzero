'use client'

import { useEffect, useRef, useState } from 'react'
import { CircleCheck, Download, File, FileSpreadsheet, FileText, type LucideIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Status = 'Pago' | 'Pendente' | 'Enviado' | 'Cancelado'
interface Order {
  id: string
  customer: string
  initials: string
  date: string
  status: Status
  total: number
}

const ORDERS: Order[] = [
  { id: '#10482', customer: 'Ana Souza', initials: 'AS', date: '08/10/2026', status: 'Pago', total: 1290 },
  { id: '#10481', customer: 'Bruno Rocha', initials: 'BR', date: '08/10/2026', status: 'Pendente', total: 349.9 },
  { id: '#10480', customer: 'Carla Mendes', initials: 'CM', date: '07/10/2026', status: 'Enviado', total: 2480 },
  { id: '#10479', customer: 'Diego Lima', initials: 'DL', date: '07/10/2026', status: 'Cancelado', total: 99 },
  { id: '#10478', customer: 'Elisa Farias', initials: 'EF', date: '06/10/2026', status: 'Pago', total: 780 },
  { id: '#10477', customer: 'Fábio Teixeira', initials: 'FT', date: '05/10/2026', status: 'Enviado', total: 1049.8 },
  { id: '#10476', customer: 'Gabriela Nunes', initials: 'GN', date: '05/10/2026', status: 'Pago', total: 429.9 },
  { id: '#10475', customer: 'Henrique Alves', initials: 'HA', date: '04/10/2026', status: 'Pendente', total: 5499 },
]
const TONE: Record<Status, 'default' | 'secondary' | 'outline' | 'destructive'> = { Pago: 'default', Pendente: 'secondary', Enviado: 'outline', Cancelado: 'destructive' }

type Format = 'csv' | 'xlsx' | 'pdf'
const FORMATS: Array<{ value: Format; label: string; Icon: LucideIcon }> = [
  { value: 'csv', label: 'CSV (.csv)', Icon: FileText },
  { value: 'xlsx', label: 'Excel (.xlsx)', Icon: FileSpreadsheet },
  { value: 'pdf', label: 'PDF (.pdf)', Icon: File },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DatatableComExportacao() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['#10482', '#10480', '#10478']))
  const [exporting, setExporting] = useState<Format | null>(null)
  const [result, setResult] = useState<{ file: string; count: number } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const all = selected.size === ORDERS.length
  const some = selected.size > 0 && !all
  const toggleAll = (on: boolean) => setSelected(on ? new Set(ORDERS.map((o) => o.id)) : new Set())
  const toggleOne = (id: string, on: boolean) =>
    setSelected((s) => {
      const n = new Set(s)
      if (on) n.add(id)
      else n.delete(id)
      return n
    })

  const exportAs = (format: Format) => {
    const count = selected.size || ORDERS.length
    setResult(null)
    setExporting(format)
    timer.current = setTimeout(() => {
      setExporting(null)
      setResult({ file: `pedidos-outubro-2026.${format}`, count })
    }, 1200)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Pedidos</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {selected.size > 0 ? (
                <>
                  <span className="font-medium text-foreground">{selected.size}</span> de {ORDERS.length} selecionados ·{' '}
                  <button type="button" className="underline underline-offset-4 hover:text-foreground" onClick={() => setSelected(new Set())}>limpar seleção</button>
                </>
              ) : (
                'Nenhuma linha selecionada — a exportação inclui todos os pedidos.'
              )}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="sm" disabled={exporting !== null} />}>
              {exporting ? <Spinner data-icon="inline-start" /> : <Download data-icon="inline-start" />}
              {exporting ? 'Exportando…' : selected.size > 0 ? `Exportar (${selected.size})` : 'Exportar tudo'}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Formato</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {FORMATS.map((f) => (
                <DropdownMenuItem key={f.value} onClick={() => exportAs(f.value)}>
                  <f.Icon /> {f.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-6 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox aria-label="Selecionar todos" checked={all} indeterminate={some} onCheckedChange={(on) => toggleAll(on)} />
                </TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((o) => {
                const on = selected.has(o.id)
                return (
                  <TableRow key={o.id} data-state={on ? 'selected' : undefined}>
                    <TableCell>
                      <Checkbox aria-label={`Selecionar ${o.id}`} checked={on} onCheckedChange={(v) => toggleOne(o.id, v)} />
                    </TableCell>
                    <TableCell className="font-mono text-xs">{o.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback>{o.initials}</AvatarFallback>
                        </Avatar>
                        {o.customer}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{o.date}</TableCell>
                    <TableCell>
                      <Badge variant={TONE[o.status]}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{brl(o.total)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Alert className="mt-4">
            <CircleCheck className="text-emerald-600" />
            <AlertTitle>Exportação concluída</AlertTitle>
            <AlertDescription>
              {result.file} · {result.count} {result.count === 1 ? 'linha' : 'linhas'} · simulação, nenhum arquivo foi baixado.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  )
}
