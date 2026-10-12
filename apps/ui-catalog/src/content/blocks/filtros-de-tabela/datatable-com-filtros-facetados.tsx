'use client'

import { useMemo, useState } from 'react'
import { ListFilter, Search, SearchX, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type FacetKey = 'status' | 'channel' | 'city' | 'payment'
interface Order {
  id: string
  customer: string
  initials: string
  status: string
  channel: string
  city: string
  payment: string
  total: number
  date: string
}

const ORDERS: Order[] = [
  { id: '#10482', customer: 'Ana Souza', initials: 'AS', status: 'Pago', channel: 'Site', city: 'São Paulo', payment: 'Pix', total: 1290, date: '08/10/2026' },
  { id: '#10481', customer: 'Bruno Rocha', initials: 'BR', status: 'Pendente', channel: 'App', city: 'Curitiba', payment: 'Boleto', total: 349.9, date: '08/10/2026' },
  { id: '#10480', customer: 'Carla Mendes', initials: 'CM', status: 'Enviado', channel: 'Marketplace', city: 'Belo Horizonte', payment: 'Cartão', total: 2480, date: '07/10/2026' },
  { id: '#10479', customer: 'Diego Lima', initials: 'DL', status: 'Cancelado', channel: 'Site', city: 'Recife', payment: 'Cartão', total: 99, date: '07/10/2026' },
  { id: '#10478', customer: 'Elisa Farias', initials: 'EF', status: 'Pago', channel: 'WhatsApp', city: 'Porto Alegre', payment: 'Pix', total: 780, date: '06/10/2026' },
  { id: '#10477', customer: 'Fábio Teixeira', initials: 'FT', status: 'Enviado', channel: 'App', city: 'São Paulo', payment: 'Cartão', total: 1049.8, date: '05/10/2026' },
  { id: '#10476', customer: 'Gabriela Nunes', initials: 'GN', status: 'Pago', channel: 'Site', city: 'Florianópolis', payment: 'Pix', total: 429.9, date: '05/10/2026' },
  { id: '#10475', customer: 'Henrique Alves', initials: 'HA', status: 'Pendente', channel: 'Marketplace', city: 'Goiânia', payment: 'Boleto', total: 5499, date: '04/10/2026' },
  { id: '#10474', customer: 'Isabela Prado', initials: 'IP', status: 'Pago', channel: 'App', city: 'São Paulo', payment: 'Cartão', total: 189.9, date: '04/10/2026' },
  { id: '#10473', customer: 'João Cabral', initials: 'JC', status: 'Enviado', channel: 'WhatsApp', city: 'Salvador', payment: 'Pix', total: 2199, date: '03/10/2026' },
  { id: '#10472', customer: 'Karina Melo', initials: 'KM', status: 'Cancelado', channel: 'Site', city: 'Curitiba', payment: 'Pix', total: 64.9, date: '02/10/2026' },
  { id: '#10471', customer: 'Lucas Brito', initials: 'LB', status: 'Pago', channel: 'Marketplace', city: 'Belo Horizonte', payment: 'Cartão', total: 899.9, date: '01/10/2026' },
]
const FACETS: Array<{ key: FacetKey; label: string }> = [
  { key: 'status', label: 'Status' },
  { key: 'channel', label: 'Canal' },
  { key: 'city', label: 'Cidade' },
  { key: 'payment', label: 'Pagamento' },
]
const DOT: Record<string, string> = { Pago: 'bg-emerald-500', Pendente: 'bg-amber-500', Enviado: 'bg-sky-500', Cancelado: 'bg-rose-500' }
const EMPTY: Record<FacetKey, Set<string>> = { status: new Set(), channel: new Set(), city: new Set(), payment: new Set() }

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function matches(o: Order, query: string, filters: Record<FacetKey, Set<string>>, skip?: FacetKey) {
  if (query && !norm(`${o.id} ${o.customer}`).includes(norm(query))) return false
  return FACETS.every((f) => f.key === skip || filters[f.key].size === 0 || filters[f.key].has(o[f.key]))
}

export default function DatatableComFiltrosFacetados() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Record<FacetKey, Set<string>>>(EMPTY)

  const results = useMemo(() => ORDERS.filter((o) => matches(o, query, filters)), [query, filters])
  const active = FACETS.reduce((s, f) => s + filters[f.key].size, 0)

  const optionsFor = (key: FacetKey) => {
    const counts = new Map<string, number>()
    for (const o of ORDERS) {
      if (!counts.has(o[key])) counts.set(o[key], 0)
      if (matches(o, query, filters, key)) counts.set(o[key], (counts.get(o[key]) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'))
  }
  const toggle = (key: FacetKey, value: string) =>
    setFilters((f) => {
      const next = new Set(f[key])
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return { ...f, [key]: next }
    })
  const clearFacet = (key: FacetKey) => setFilters((f) => ({ ...f, [key]: new Set() }))
  const clearAll = () => {
    setFilters(EMPTY)
    setQuery('')
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Pedidos</h2>
            <p className="mt-1 text-sm text-muted-foreground">Filtros facetados por coluna: cada popover mostra as opções com a contagem considerando os outros filtros.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{results.length}</span> de {ORDERS.length} pedidos
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <InputGroup className="w-full sm:w-64">
            <InputGroupAddon>
              <Search className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar por pedido ou cliente" aria-label="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} />
          </InputGroup>
          {FACETS.map((f) => {
            const selected = filters[f.key]
            const options = optionsFor(f.key)
            return (
              <Popover key={f.key}>
                <PopoverTrigger render={<Button variant="outline" size="sm" className="border-dashed" />}>
                  <ListFilter className="text-muted-foreground" /> {f.label}
                  {selected.size > 0 && (
                    <>
                      <Separator orientation="vertical" className="mx-1 h-4" />
                      {selected.size > 2 ? (
                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">{selected.size} selecionados</Badge>
                      ) : (
                        [...selected].map((v) => (
                          <Badge key={v} variant="secondary" className="rounded-sm px-1 font-normal">{v}</Badge>
                        ))
                      )}
                    </>
                  )}
                </PopoverTrigger>
                <PopoverContent align="start" className="w-56 gap-0 p-0">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground">{f.label}</div>
                  <Separator />
                  <div className="max-h-64 overflow-y-auto p-1">
                    {options.map(([value, count]) => (
                      <Label key={value} htmlFor={`dff-${f.key}-${value}`} className={cn('flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 font-normal hover:bg-muted', count === 0 && !selected.has(value) && 'opacity-50')}>
                        <Checkbox id={`dff-${f.key}-${value}`} checked={selected.has(value)} onCheckedChange={() => toggle(f.key, value)} />
                        {f.key === 'status' && <span className={cn('size-2 rounded-full', DOT[value] ?? 'bg-muted-foreground')} aria-hidden="true" />}
                        <span className="flex-1 truncate">{value}</span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">{count}</span>
                      </Label>
                    ))}
                  </div>
                  {selected.size > 0 && (
                    <>
                      <Separator />
                      <Button variant="ghost" size="sm" className="m-1 justify-center" onClick={() => clearFacet(f.key)}>Limpar {f.label.toLowerCase()}</Button>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            )
          })}
          {(active > 0 || query) && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Limpar filtros <X data-icon="inline-end" />
            </Button>
          )}
        </div>

        <div className="mt-4 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-14 text-center">
                    <SearchX className="mx-auto size-7 text-muted-foreground" />
                    <p className="mt-2 font-medium">Nenhum pedido encontrado</p>
                    <Button variant="outline" size="sm" className="mt-3" onClick={clearAll}>Limpar filtros</Button>
                  </TableCell>
                </TableRow>
              ) : (
                results.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">{o.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback>{o.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{o.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <span className={cn('size-2 rounded-full', DOT[o.status] ?? 'bg-muted-foreground')} aria-hidden="true" /> {o.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{o.channel}</TableCell>
                    <TableCell className="text-muted-foreground">{o.city}</TableCell>
                    <TableCell className="text-muted-foreground">{o.payment}</TableCell>
                    <TableCell className="text-right tabular-nums">{brl(o.total)}</TableCell>
                    <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
