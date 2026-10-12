'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Mail, Trash2, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Checkbox } from '@/components/ui/checkbox'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Plano = 'Starter' | 'Pro' | 'Business'
type Status = 'Ativo' | 'Trial' | 'Inadimplente'

interface Cliente {
  id: number
  nome: string
  ini: string
  empresa: string
  plano: Plano
  status: Status
  mrr: string
}

const CLIENTES: Cliente[] = [
  { id: 1, nome: 'Ana Souza', ini: 'AS', empresa: 'Lumi Tecnologia', plano: 'Pro', status: 'Ativo', mrr: 'R$ 490' },
  { id: 2, nome: 'Bruno Rocha', ini: 'BR', empresa: 'Kavo Ltda', plano: 'Starter', status: 'Trial', mrr: 'R$ 0' },
  { id: 3, nome: 'Carla Mendes', ini: 'CM', empresa: 'Nuvem Fit', plano: 'Business', status: 'Ativo', mrr: 'R$ 1.290' },
  { id: 4, nome: 'Diego Lima', ini: 'DL', empresa: 'Prisma Dados', plano: 'Pro', status: 'Inadimplente', mrr: 'R$ 490' },
  { id: 5, nome: 'Juliana Alves', ini: 'JA', empresa: 'Bistrô Oliva', plano: 'Starter', status: 'Ativo', mrr: 'R$ 149' },
  { id: 6, nome: 'Marina Costa', ini: 'MC', empresa: 'Clínica Vida', plano: 'Business', status: 'Ativo', mrr: 'R$ 1.290' },
  { id: 7, nome: 'Pedro Henrique', ini: 'PH', empresa: 'Agência Pulso', plano: 'Pro', status: 'Ativo', mrr: 'R$ 490' },
  { id: 8, nome: 'Renata Martins', ini: 'RM', empresa: 'Banco Vetor', plano: 'Business', status: 'Trial', mrr: 'R$ 0' },
]

const TOTAL = 1284
const STATUS_CLASSE: Record<Status, string> = {
  Ativo: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  Trial: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  Inadimplente: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
}

export default function FooterPaginacaoSelecao() {
  const [selecionados, setSelecionados] = useState<number[]>([3, 6])
  const [porPagina, setPorPagina] = useState(10)
  const [pagina, setPagina] = useState(1)
  const paginas = Math.ceil(TOTAL / porPagina)
  const inicio = (pagina - 1) * porPagina + 1
  const fim = Math.min(pagina * porPagina, TOTAL)
  const todos = selecionados.length === CLIENTES.length

  function alternar(id: number, marcado: boolean) {
    setSelecionados((prev) => (marcado ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id)))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h2 className="text-base font-semibold">Clientes</h2>
            <p className="text-xs text-muted-foreground">Selecione linhas para ver as ações em lote no rodapé.</p>
          </div>
          <Badge variant="outline">{TOTAL.toLocaleString('pt-BR')} no total</Badge>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4">
                <Checkbox checked={todos} onCheckedChange={(v) => setSelecionados(v ? CLIENTES.map((c) => c.id) : [])} aria-label="Selecionar todos" />
              </TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-4 text-right">MRR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CLIENTES.map((c) => {
              const marcado = selecionados.includes(c.id)
              return (
                <TableRow key={c.id} data-state={marcado ? 'selected' : undefined}>
                  <TableCell className="pl-4">
                    <Checkbox checked={marcado} onCheckedChange={(v) => alternar(c.id, v === true)} aria-label={`Selecionar ${c.nome}`} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback>{c.ini}</AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <div className="font-medium">{c.nome}</div>
                        <div className="text-xs text-muted-foreground">{c.empresa}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{c.plano}</TableCell>
                  <TableCell>
                    <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', STATUS_CLASSE[c.status])}>{c.status}</span>
                  </TableCell>
                  <TableCell className="pr-4 text-right tabular-nums">{c.mrr}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <footer className="flex flex-wrap items-center gap-3 border-t bg-muted/30 px-4 py-2.5 text-sm">
          {selecionados.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{selecionados.length} selecionados</Badge>
              <ButtonGroup>
                <Button variant="outline" size="sm">
                  <Mail data-icon="inline-start" /> E-mail
                </Button>
                <Button variant="outline" size="sm">
                  <Download data-icon="inline-start" /> Exportar
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <Trash2 data-icon="inline-start" /> Excluir
                </Button>
              </ButtonGroup>
              <Button variant="ghost" size="sm" onClick={() => setSelecionados([])}>
                <X data-icon="inline-start" /> Limpar
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Mostrando{' '}
              <span className="font-medium text-foreground tabular-nums">
                {inicio}–{fim}
              </span>{' '}
              de <span className="font-medium text-foreground tabular-nums">{TOTAL.toLocaleString('pt-BR')}</span> clientes
            </p>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Linhas por página</span>
              <NativeSelect
                size="sm"
                value={String(porPagina)}
                onChange={(e) => {
                  setPorPagina(Number(e.target.value))
                  setPagina(1)
                }}
                aria-label="Linhas por página"
              >
                <NativeSelectOption value="10">10</NativeSelectOption>
                <NativeSelectOption value="25">25</NativeSelectOption>
                <NativeSelectOption value="50">50</NativeSelectOption>
              </NativeSelect>
            </label>
            <span className="text-xs text-muted-foreground tabular-nums">
              Página {pagina} de {paginas}
            </span>
            <ButtonGroup>
              <Button variant="outline" size="icon-sm" aria-label="Primeira página" disabled={pagina === 1} onClick={() => setPagina(1)}>
                <ChevronsLeft />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Página anterior" disabled={pagina === 1} onClick={() => setPagina((p) => p - 1)}>
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Próxima página" disabled={pagina === paginas} onClick={() => setPagina((p) => p + 1)}>
                <ChevronRight />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Última página" disabled={pagina === paginas} onClick={() => setPagina(paginas)}>
                <ChevronsRight />
              </Button>
            </ButtonGroup>
          </div>
        </footer>
      </div>
    </section>
  )
}
