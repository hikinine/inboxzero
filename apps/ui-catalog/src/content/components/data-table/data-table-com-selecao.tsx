'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Status = 'Paga' | 'Pendente' | 'Atrasada' | 'Rascunho'
type SortKey = 'cliente' | 'vencimento' | 'valor'
interface Sort {
  key: SortKey
  dir: 'asc' | 'desc'
}
interface Fatura {
  id: string
  cliente: string
  empresa: string
  status: Status
  vencimento: string
  valor: number
}

const FATURAS: Fatura[] = [
  { id: 'NF-2041', cliente: 'Ana Souza', empresa: 'Lumi Tecnologia', status: 'Paga', vencimento: '2026-10-05', valor: 4290 },
  { id: 'NF-2042', cliente: 'Bruno Rocha', empresa: 'Rocha & Filhos', status: 'Pendente', vencimento: '2026-10-12', valor: 1290 },
  { id: 'NF-2043', cliente: 'Carla Mendes', empresa: 'Mendes Advocacia', status: 'Atrasada', vencimento: '2026-09-28', valor: 780 },
  { id: 'NF-2044', cliente: 'Diego Lima', empresa: 'Studio Lima', status: 'Paga', vencimento: '2026-10-01', valor: 2480 },
  { id: 'NF-2045', cliente: 'Elisa Farias', empresa: 'Farias Imóveis', status: 'Rascunho', vencimento: '2026-10-20', valor: 350 },
  { id: 'NF-2046', cliente: 'Felipe Costa', empresa: 'Costa Logística', status: 'Pendente', vencimento: '2026-10-15', valor: 6120 },
  { id: 'NF-2047', cliente: 'Gabriela Nunes', empresa: 'Nunes Arquitetura', status: 'Paga', vencimento: '2026-09-30', valor: 1980 },
  { id: 'NF-2048', cliente: 'Henrique Alves', empresa: 'Alves Contabilidade', status: 'Atrasada', vencimento: '2026-09-22', valor: 540 },
]

const DOT: Record<Status, string> = { Paga: 'bg-emerald-500', Pendente: 'bg-amber-500', Atrasada: 'bg-rose-500', Rascunho: 'bg-muted-foreground' }
const POR_PAGINA = 5
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const data = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString('pt-BR')

export default function DataTableComSelecao() {
  const [busca, setBusca] = useState('')
  const [sort, setSort] = useState<Sort>({ key: 'vencimento', dir: 'asc' })
  const [pagina, setPagina] = useState(1)
  const [selecionadas, setSelecionadas] = useState<Set<string>>(() => new Set(['NF-2042', 'NF-2046']))

  const linhas = useMemo(() => {
    const q = busca.trim().toLowerCase()
    const filtradas = q ? FATURAS.filter((f) => [f.id, f.cliente, f.empresa].some((s) => s.toLowerCase().includes(q))) : FATURAS
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...filtradas].sort((a, b) => (sort.key === 'valor' ? (a.valor - b.valor) * dir : a[sort.key].localeCompare(b[sort.key]) * dir))
  }, [busca, sort])

  const totalPaginas = Math.max(1, Math.ceil(linhas.length / POR_PAGINA))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const visiveis = linhas.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA)
  const todasSelecionadas = visiveis.length > 0 && visiveis.every((f) => selecionadas.has(f.id))

  const alternarTodas = (marcar: boolean) =>
    setSelecionadas((prev) => {
      const next = new Set(prev)
      visiveis.forEach((f) => (marcar ? next.add(f.id) : next.delete(f.id)))
      return next
    })
  const alternar = (id: string, marcar: boolean) =>
    setSelecionadas((prev) => {
      const next = new Set(prev)
      if (marcar) next.add(id)
      else next.delete(id)
      return next
    })
  const ordenar = (key: SortKey) => setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  return (
    <div className="w-full max-w-3xl rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-2 border-b p-3">
        <InputGroup className="w-full sm:w-64">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar fatura ou cliente…"
            aria-label="Buscar"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value)
              setPagina(1)
            }}
          />
        </InputGroup>
        <div className="ml-auto flex items-center gap-2">
          {selecionadas.size > 0 ? (
            <>
              <span className="text-xs text-muted-foreground">{selecionadas.size} selecionada(s)</span>
              <Button size="sm" variant="outline">
                <Download data-icon="inline-start" /> Exportar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setSelecionadas(new Set())}>
                <Trash2 data-icon="inline-start" /> Excluir
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline">
              <SlidersHorizontal data-icon="inline-start" /> Colunas
            </Button>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 pl-3">
              <Checkbox aria-label="Selecionar todas" checked={todasSelecionadas} onCheckedChange={(v) => alternarTodas(v)} />
            </TableHead>
            <TableHead>Fatura</TableHead>
            <SortHead label="Cliente" k="cliente" sort={sort} onSort={ordenar} />
            <TableHead>Status</TableHead>
            <SortHead label="Vencimento" k="vencimento" sort={sort} onSort={ordenar} />
            <SortHead label="Valor" k="valor" sort={sort} onSort={ordenar} align="right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {visiveis.map((f) => {
            const sel = selecionadas.has(f.id)
            return (
              <TableRow key={f.id} data-state={sel ? 'selected' : undefined}>
                <TableCell className="pl-3">
                  <Checkbox aria-label={`Selecionar ${f.id}`} checked={sel} onCheckedChange={(v) => alternar(f.id, v)} />
                </TableCell>
                <TableCell className="font-mono text-xs">{f.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{f.cliente}</div>
                  <div className="text-xs text-muted-foreground">{f.empresa}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    <span className={cn('size-1.5 rounded-full', DOT[f.status])} /> {f.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{data(f.vencimento)}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">{brl(f.valor)}</TableCell>
              </TableRow>
            )
          })}
          {visiveis.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-20 text-center text-muted-foreground">
                Nenhuma fatura encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t px-3 py-2 text-xs text-muted-foreground">
        <span>
          {selecionadas.size} de {linhas.length} linha(s) selecionada(s)
        </span>
        <div className="flex items-center gap-3">
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="outline" aria-label="Primeira página" disabled={paginaAtual === 1} onClick={() => setPagina(1)}>
              <ChevronsLeft />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Página anterior" disabled={paginaAtual === 1} onClick={() => setPagina(paginaAtual - 1)}>
              <ChevronLeft />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Próxima página" disabled={paginaAtual === totalPaginas} onClick={() => setPagina(paginaAtual + 1)}>
              <ChevronRight />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Última página" disabled={paginaAtual === totalPaginas} onClick={() => setPagina(totalPaginas)}>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SortHead({ label, k, sort, onSort, align }: { label: string; k: SortKey; sort: Sort; onSort: (k: SortKey) => void; align?: 'right' }) {
  const ativo = sort.key === k
  const Icon = !ativo ? ArrowUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown
  return (
    <TableHead className={align === 'right' ? 'text-right' : undefined}>
      <button
        type="button"
        onClick={() => onSort(k)}
        className={cn('inline-flex h-7 items-center gap-1 rounded-md px-2 font-medium hover:bg-muted', align === 'right' ? '-mr-2' : '-ml-2', ativo ? 'text-foreground' : 'text-muted-foreground')}
      >
        {label} <Icon className="size-3.5" />
      </button>
    </TableHead>
  )
}
