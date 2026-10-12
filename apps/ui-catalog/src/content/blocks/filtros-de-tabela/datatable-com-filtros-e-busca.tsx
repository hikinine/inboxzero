'use client'

import { useMemo, useState } from 'react'
import { Search, SearchX, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const PLANS = ['Starter', 'Pro', 'Business'] as const
type Plan = (typeof PLANS)[number]
const STATUSES = ['Ativo', 'Pendente', 'Inativo'] as const
type Status = (typeof STATUSES)[number]

interface Customer {
  id: string
  name: string
  initials: string
  email: string
  plan: Plan
  status: Status
  city: string
  mrr: number
}

const CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Ana Souza', initials: 'AS', email: 'ana@lojadaana.com.br', plan: 'Pro', status: 'Ativo', city: 'São Paulo', mrr: 290 },
  { id: 'c2', name: 'Bruno Rocha', initials: 'BR', email: 'bruno@rochafit.com', plan: 'Starter', status: 'Pendente', city: 'Curitiba', mrr: 90 },
  { id: 'c3', name: 'Carla Mendes', initials: 'CM', email: 'carla@mendesarq.com.br', plan: 'Business', status: 'Ativo', city: 'Belo Horizonte', mrr: 890 },
  { id: 'c4', name: 'Diego Lima', initials: 'DL', email: 'diego@limatech.io', plan: 'Pro', status: 'Inativo', city: 'Recife', mrr: 0 },
  { id: 'c5', name: 'Elisa Farias', initials: 'EF', email: 'elisa@fariasdoces.com', plan: 'Starter', status: 'Ativo', city: 'Porto Alegre', mrr: 90 },
  { id: 'c6', name: 'Fábio Teixeira', initials: 'FT', email: 'fabio@teixeiralog.com.br', plan: 'Business', status: 'Ativo', city: 'Campinas', mrr: 890 },
  { id: 'c7', name: 'Gabriela Nunes', initials: 'GN', email: 'gabi@nunesestudio.com', plan: 'Pro', status: 'Pendente', city: 'Florianópolis', mrr: 290 },
  { id: 'c8', name: 'Henrique Alves', initials: 'HA', email: 'henrique@alvesmoveis.com.br', plan: 'Starter', status: 'Inativo', city: 'Goiânia', mrr: 0 },
]

const DOT: Record<Status, string> = { Ativo: 'bg-emerald-500', Pendente: 'bg-amber-500', Inativo: 'bg-muted-foreground/50' }
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const isPlan = (v: unknown): v is Plan => typeof v === 'string' && (PLANS as readonly string[]).includes(v)

export default function DatatableComFiltrosEBusca() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'todos' | Status>('todos')
  const [plans, setPlans] = useState<Set<Plan>>(new Set())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CUSTOMERS.filter(
      (c) =>
        (q === '' || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)) &&
        (status === 'todos' || c.status === status) &&
        (plans.size === 0 || plans.has(c.plan)),
    )
  }, [query, status, plans])

  const active = query.trim() !== '' || status !== 'todos' || plans.size > 0
  const clear = () => {
    setQuery('')
    setStatus('todos')
    setPlans(new Set())
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight">Clientes</h2>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <InputGroup className="w-full sm:max-w-xs">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar por nome, e-mail ou cidade" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Buscar clientes" />
          </InputGroup>
          <div className="flex items-center gap-2">
            <Label htmlFor="status" className="sr-only">Status</Label>
            <NativeSelect id="status" value={status} onChange={(e) => setStatus(e.target.value as 'todos' | Status)}>
              <NativeSelectOption value="todos">Todos os status</NativeSelectOption>
              {STATUSES.map((s) => (
                <NativeSelectOption key={s} value={s}>{s}</NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <ToggleGroup variant="outline" size="sm" multiple aria-label="Plano" value={[...plans]} onValueChange={(v) => setPlans(new Set(v.filter(isPlan)))}>
            {PLANS.map((p) => (
              <ToggleGroupItem key={p} value={p} className="aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground">
                {p}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="ml-auto flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">{filtered.length}</span> de {CUSTOMERS.length}
            </span>
            {active && (
              <Button variant="ghost" size="xs" onClick={clear}>
                <X data-icon="inline-start" /> Limpar
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead className="text-right">MRR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-14 text-center">
                    <SearchX className="mx-auto size-7 text-muted-foreground" />
                    <p className="mt-2 font-medium">Nenhum cliente encontrado</p>
                    <p className="text-sm text-muted-foreground">Ajuste a busca ou os filtros.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>{c.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{c.plan}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <span className={cn('size-2 rounded-full', DOT[c.status])} /> {c.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.city}</TableCell>
                    <TableCell className="text-right tabular-nums">{brl(c.mrr)}</TableCell>
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
