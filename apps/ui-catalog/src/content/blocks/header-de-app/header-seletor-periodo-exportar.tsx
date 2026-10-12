'use client'

import { useState, type ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight, CalendarDays, CircleCheck, Download, FileSpreadsheet, FileText, Mail, Share2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

type Periodo = 'hoje' | '7d' | '30d' | '90d' | 'ano'

const PERIODOS: { id: Periodo; label: string; intervalo: string }[] = [
  { id: 'hoje', label: 'Hoje', intervalo: '12 de outubro' },
  { id: '7d', label: 'Últimos 7 dias', intervalo: '6 – 12 de outubro' },
  { id: '30d', label: 'Últimos 30 dias', intervalo: '13 de setembro – 12 de outubro' },
  { id: '90d', label: 'Últimos 90 dias', intervalo: '15 de julho – 12 de outubro' },
  { id: 'ano', label: 'Este ano', intervalo: '1 de janeiro – 12 de outubro' },
]

// `items` deixa o SelectValue mostrar o ícone do período já no primeiro paint.
const ITEMS: Record<string, ReactNode> = Object.fromEntries(
  PERIODOS.map((p) => [
    p.id,
    <>
      <CalendarDays className="size-4 text-muted-foreground" />
      {p.label}
    </>,
  ]),
)

const DADOS: Record<Periodo, { valores: number[]; deltas: number[] }> = {
  hoje: { valores: [12480, 48, 260, 2], deltas: [14, 6.2, -2.1, -50] },
  '7d': { valores: [74200, 291, 255, 9], deltas: [8.4, 5.1, 1.3, 12.5] },
  '30d': { valores: [318900, 1240, 257, 38], deltas: [12.4, 9.8, 2.6, -8.1] },
  '90d': { valores: [902400, 3510, 257, 104], deltas: [21.7, 18.2, 3, 4.4] },
  ano: { valores: [2841000, 11020, 258, 310], deltas: [34.2, 29.9, 3.4, -2.2] },
}

const COLUNAS: { label: string; moeda?: boolean; inverso?: boolean }[] = [
  { label: 'Receita', moeda: true },
  { label: 'Pedidos' },
  { label: 'Ticket médio', moeda: true },
  { label: 'Reembolsos', inverso: true },
]

function fmt(v: number, moeda?: boolean) {
  const n = v.toLocaleString('pt-BR')
  return moeda ? `R$ ${n}` : n
}

export default function HeaderSeletorPeriodoExportar() {
  const [periodo, setPeriodo] = useState<Periodo>('30d')
  const [comparar, setComparar] = useState(true)
  const [aviso, setAviso] = useState<string | null>(null)
  const atual = PERIODOS.find((p) => p.id === periodo) ?? PERIODOS[2]
  const dados = DADOS[periodo]

  function exportar(formato: string) {
    setAviso(`Exportação em ${formato} iniciada — você recebe o arquivo por e-mail em instantes.`)
  }

  return (
    <div className="w-full bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">Relatório de vendas</h1>
            <p className="text-xs text-muted-foreground">{atual.intervalo} · atualizado há 3 min</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <Select
              value={periodo}
              onValueChange={(v) => {
                if (v) setPeriodo(v)
              }}
              items={ITEMS}
            >
              <SelectTrigger className="w-44" aria-label="Período do relatório">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERIODOS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <CalendarDays className="size-4 self-center text-muted-foreground" />
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex h-8 items-center gap-2 rounded-lg border px-2.5">
              <Switch id="rel-comparar" size="sm" checked={comparar} onCheckedChange={setComparar} />
              <Label htmlFor="rel-comparar" className="text-xs font-normal">
                Comparar
              </Label>
            </div>
            <Button variant="outline" size="sm">
              <Share2 data-icon="inline-start" /> Compartilhar
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button size="sm" />}>
                <Download data-icon="inline-start" /> Exportar
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Baixar agora</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => exportar('CSV')}>
                    <FileSpreadsheet /> CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportar('Excel')}>
                    <FileSpreadsheet /> Excel (.xlsx)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportar('PDF')}>
                    <FileText /> PDF com gráficos
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => exportar('envio semanal')}>
                  <Mail /> Agendar envio por e-mail
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {aviso && (
        <div className="border-b bg-emerald-500/10">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-sm sm:px-6">
            <CircleCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
            <span className="flex-1">{aviso}</span>
            <Button variant="ghost" size="icon-xs" aria-label="Fechar aviso" onClick={() => setAviso(null)}>
              <X />
            </Button>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-4 px-4 py-4 sm:px-6 lg:grid-cols-4 lg:divide-x">
        {COLUNAS.map((c, i) => {
          const delta = dados.deltas[i]
          const bom = c.inverso ? delta < 0 : delta > 0
          return (
            <div key={c.label} className="px-2 lg:px-6 lg:first:pl-0">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums">{fmt(dados.valores[i], c.moeda)}</p>
              {comparar && (
                <p className={cn('mt-0.5 flex items-center gap-1 text-xs', bom ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                  {delta > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {Math.abs(delta).toLocaleString('pt-BR')}% <span className="text-muted-foreground">vs. período anterior</span>
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
