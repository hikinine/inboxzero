'use client'

import { useEffect, useMemo, useState } from 'react'
import { Braces, Check, Download, FileSpreadsheet, FileText, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type ColKey = 'id' | 'customer' | 'email' | 'plan' | 'status' | 'city' | 'mrr' | 'since'
interface Customer {
  id: string
  customer: string
  initials: string
  email: string
  plan: string
  status: string
  city: string
  mrr: number
  since: string
}

const COLUMNS: Array<{ key: ColKey; label: string; align?: 'right' }> = [
  { key: 'id', label: 'ID' },
  { key: 'customer', label: 'Cliente' },
  { key: 'email', label: 'E-mail' },
  { key: 'plan', label: 'Plano' },
  { key: 'status', label: 'Status' },
  { key: 'city', label: 'Cidade' },
  { key: 'mrr', label: 'MRR', align: 'right' },
  { key: 'since', label: 'Cliente desde' },
]
const CUSTOMERS: Customer[] = [
  { id: 'C-1001', customer: 'Ana Souza', initials: 'AS', email: 'ana@lojadaana.com.br', plan: 'Pro', status: 'Ativo', city: 'São Paulo', mrr: 290, since: '12/03/2024' },
  { id: 'C-1002', customer: 'Bruno Rocha', initials: 'BR', email: 'bruno@rochafit.com', plan: 'Starter', status: 'Pendente', city: 'Curitiba', mrr: 90, since: '08/07/2025' },
  { id: 'C-1003', customer: 'Carla Mendes', initials: 'CM', email: 'carla@mendesarq.com.br', plan: 'Business', status: 'Ativo', city: 'Belo Horizonte', mrr: 890, since: '21/01/2023' },
  { id: 'C-1004', customer: 'Diego Lima', initials: 'DL', email: 'diego@limatech.io', plan: 'Pro', status: 'Inativo', city: 'Recife', mrr: 0, since: '30/11/2024' },
  { id: 'C-1005', customer: 'Elisa Farias', initials: 'EF', email: 'elisa@fariasdoces.com', plan: 'Starter', status: 'Ativo', city: 'Porto Alegre', mrr: 90, since: '02/05/2026' },
  { id: 'C-1006', customer: 'Fábio Teixeira', initials: 'FT', email: 'fabio@teixeiralog.com.br', plan: 'Business', status: 'Ativo', city: 'Campinas', mrr: 890, since: '17/09/2022' },
  { id: 'C-1007', customer: 'Gabriela Nunes', initials: 'GN', email: 'gabi@nunesestudio.com', plan: 'Pro', status: 'Pendente', city: 'Florianópolis', mrr: 290, since: '25/06/2026' },
  { id: 'C-1008', customer: 'Henrique Alves', initials: 'HA', email: 'henrique@alvesmoveis.com.br', plan: 'Starter', status: 'Inativo', city: 'Goiânia', mrr: 0, since: '04/02/2025' },
]
type Format = 'csv' | 'xlsx' | 'json'
const FORMATS: Array<{ value: Format; label: string; hint: string; Icon: LucideIcon }> = [
  { value: 'csv', label: 'CSV', hint: 'separado por ponto e vírgula', Icon: FileText },
  { value: 'xlsx', label: 'Excel', hint: 'planilha .xlsx', Icon: FileSpreadsheet },
  { value: 'json', label: 'JSON', hint: 'uma lista de objetos', Icon: Braces },
]
const DOT: Record<string, string> = { Ativo: 'bg-emerald-500', Pendente: 'bg-amber-500', Inativo: 'bg-muted-foreground/50' }
type Phase = 'idle' | 'exporting' | 'done'

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const raw = (c: Customer, key: ColKey): string => (key === 'mrr' ? String(c.mrr) : c[key])

export default function DatatableComExportacaoEColunasEscolhidas() {
  const [cols, setCols] = useState<Set<ColKey>>(new Set(['id', 'customer', 'plan', 'status', 'city', 'mrr']))
  const [format, setFormat] = useState<Format>('csv')
  const [scope, setScope] = useState<'todas' | 'selecionadas'>('todas')
  const [selected, setSelected] = useState<Set<string>>(new Set(['C-1001', 'C-1003', 'C-1006']))
  const [filename, setFilename] = useState('clientes-outubro')
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (phase !== 'exporting') return
    const t = setTimeout(() => setPhase('done'), 1400)
    return () => clearTimeout(t)
  }, [phase])

  const orderedCols = COLUMNS.filter((c) => cols.has(c.key))
  const rows = scope === 'selecionadas' ? CUSTOMERS.filter((c) => selected.has(c.id)) : CUSTOMERS
  const allCols = cols.size === COLUMNS.length
  const someCols = cols.size > 0 && !allCols
  const allRows = selected.size === CUSTOMERS.length
  const someRows = selected.size > 0 && !allRows

  const preview = useMemo(() => {
    const sample = rows.slice(0, 3)
    if (format === 'json') {
      const data = sample.map((c) => Object.fromEntries(orderedCols.map((col) => [col.key, col.key === 'mrr' ? c.mrr : c[col.key]])))
      return JSON.stringify(data, null, 2)
    }
    const header = orderedCols.map((c) => c.label).join(';')
    const lines = sample.map((c) => orderedCols.map((col) => raw(c, col.key)).join(';'))
    return [header, ...lines].join('\n')
  }, [rows, orderedCols, format])
  const sizeKb = Math.max(0.1, Math.round(((preview.length / Math.max(1, Math.min(rows.length, 3))) * rows.length * (format === 'xlsx' ? 1.8 : 1)) / 1024 * 10) / 10)

  const toggleCol = (key: ColKey) =>
    setCols((s) => {
      const next = new Set(s)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  const toggleRow = (id: string) =>
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const canExport = cols.size > 0 && rows.length > 0 && filename.trim().length > 0
  const ext = format === 'xlsx' ? 'xlsx' : format

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Clientes</h2>
            <p className="mt-1 text-sm text-muted-foreground">Escolha as colunas, o formato e o escopo. As colunas fora da exportação ficam esmaecidas na tabela.</p>
          </div>
          <Badge variant="outline">{selected.size} linhas selecionadas</Badge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox aria-label="Selecionar todas" checked={allRows} indeterminate={someRows} onCheckedChange={(on) => setSelected(on ? new Set(CUSTOMERS.map((c) => c.id)) : new Set())} />
                  </TableHead>
                  {COLUMNS.filter((c) => c.key !== 'email').map((c) => (
                    <TableHead key={c.key} className={cn(c.align === 'right' && 'text-right', !cols.has(c.key) && 'text-muted-foreground/50')}>{c.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {CUSTOMERS.map((c) => {
                  const on = selected.has(c.id)
                  return (
                    <TableRow key={c.id} data-state={on ? 'selected' : undefined}>
                      <TableCell>
                        <Checkbox aria-label={`Selecionar ${c.customer}`} checked={on} onCheckedChange={() => toggleRow(c.id)} />
                      </TableCell>
                      <TableCell className={cn('font-mono text-xs', !cols.has('id') && 'opacity-40')}>{c.id}</TableCell>
                      <TableCell className={cn(!cols.has('customer') && 'opacity-40')}>
                        <div className="flex items-center gap-2">
                          <Avatar size="sm">
                            <AvatarFallback>{c.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{c.customer}</div>
                            <div className={cn('text-[11px] text-muted-foreground', !cols.has('email') && 'opacity-50')}>{c.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className={cn(!cols.has('plan') && 'opacity-40')}>
                        <Badge variant={c.plan === 'Business' ? 'default' : c.plan === 'Pro' ? 'secondary' : 'outline'}>{c.plan}</Badge>
                      </TableCell>
                      <TableCell className={cn(!cols.has('status') && 'opacity-40')}>
                        <span className="flex items-center gap-2">
                          <span className={cn('size-2 rounded-full', DOT[c.status] ?? 'bg-muted-foreground')} aria-hidden="true" /> {c.status}
                        </span>
                      </TableCell>
                      <TableCell className={cn('text-muted-foreground', !cols.has('city') && 'opacity-40')}>{c.city}</TableCell>
                      <TableCell className={cn('text-right tabular-nums', !cols.has('mrr') && 'opacity-40')}>{brl(c.mrr)}</TableCell>
                      <TableCell className={cn('text-muted-foreground', !cols.has('since') && 'opacity-40')}>{c.since}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <aside className="rounded-xl border bg-card p-5 lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-center gap-2 font-medium">
              <Download className="size-4 text-muted-foreground" /> Exportar
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Colunas ({cols.size}/{COLUMNS.length})</span>
              <Label htmlFor="exp-all" className="flex cursor-pointer items-center gap-2 text-xs font-normal">
                <Checkbox id="exp-all" checked={allCols} indeterminate={someCols} onCheckedChange={(on) => setCols(on ? new Set(COLUMNS.map((c) => c.key)) : new Set())} /> Todas
              </Label>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
              {COLUMNS.map((c) => (
                <Label key={c.key} htmlFor={`exp-col-${c.key}`} className="flex cursor-pointer items-center gap-2 text-sm font-normal">
                  <Checkbox id={`exp-col-${c.key}`} checked={cols.has(c.key)} onCheckedChange={() => toggleCol(c.key)} /> {c.label}
                </Label>
              ))}
            </div>

            <Separator className="my-4" />
            <span className="text-xs font-medium text-muted-foreground">Formato</span>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v === 'xlsx' || v === 'json' ? v : 'csv')} className="mt-2 gap-1.5">
              {FORMATS.map((f) => (
                <Label key={f.value} htmlFor={`exp-fmt-${f.value}`} className={cn('flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm font-normal transition-colors', format === f.value && 'border-primary bg-primary/5')}>
                  <RadioGroupItem id={`exp-fmt-${f.value}`} value={f.value} />
                  <f.Icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">
                    {f.label} <span className="text-xs text-muted-foreground">· {f.hint}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>

            <Separator className="my-4" />
            <span className="text-xs font-medium text-muted-foreground">Linhas</span>
            <RadioGroup value={scope} onValueChange={(v) => setScope(v === 'selecionadas' ? 'selecionadas' : 'todas')} className="mt-2 gap-1.5">
              <Label htmlFor="exp-scope-all" className="flex cursor-pointer items-center gap-2 text-sm font-normal">
                <RadioGroupItem id="exp-scope-all" value="todas" /> Todas ({CUSTOMERS.length})
              </Label>
              <Label htmlFor="exp-scope-sel" className={cn('flex cursor-pointer items-center gap-2 text-sm font-normal', selected.size === 0 && 'opacity-50')}>
                <RadioGroupItem id="exp-scope-sel" value="selecionadas" disabled={selected.size === 0} /> Somente selecionadas ({selected.size})
              </Label>
            </RadioGroup>

            <Separator className="my-4" />
            <Label htmlFor="exp-name" className="text-xs font-medium text-muted-foreground">Nome do arquivo</Label>
            <div className="mt-1.5 flex items-center gap-1.5">
              <Input id="exp-name" value={filename} onChange={(e) => setFilename(e.target.value)} className="h-8" />
              <span className="text-xs text-muted-foreground">.{ext}</span>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Prévia ({Math.min(rows.length, 3)} de {rows.length} linhas)</span>
                <span className="tabular-nums">~{sizeKb.toLocaleString('pt-BR')} KB</span>
              </div>
              <pre className="max-h-36 overflow-auto rounded-lg bg-muted/50 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">{cols.size === 0 ? 'Escolha ao menos uma coluna.' : preview}</pre>
            </div>

            <Button className="mt-4 w-full" disabled={!canExport || phase === 'exporting'} variant={phase === 'done' ? 'secondary' : 'default'} onClick={() => setPhase(phase === 'done' ? 'idle' : 'exporting')} aria-live="polite">
              {phase === 'exporting' ? (
                <>
                  <Spinner data-icon="inline-start" /> Gerando {filename.trim()}.{ext}…
                </>
              ) : phase === 'done' ? (
                <>
                  <Check data-icon="inline-start" /> Pronto · exportar de novo
                </>
              ) : (
                <>
                  <Download data-icon="inline-start" /> Exportar {rows.length} linhas
                </>
              )}
            </Button>
          </aside>
        </div>
      </div>
    </section>
  )
}
