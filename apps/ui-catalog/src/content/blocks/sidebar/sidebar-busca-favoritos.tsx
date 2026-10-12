'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChartLine, Clock, CreditCard, FileText, House, Inbox, ListChecks, Megaphone, PanelLeft, Plug, Search, Settings, SquareKanban, Star, Users, Zap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Item {
  id: string
  Icon: LucideIcon
  label: string
  secao: string
}

const ITENS: Item[] = [
  { id: 'inicio', Icon: House, label: 'Início', secao: 'Principal' },
  { id: 'inbox', Icon: Inbox, label: 'Inbox', secao: 'Principal' },
  { id: 'tarefas', Icon: ListChecks, label: 'Tarefas', secao: 'Principal' },
  { id: 'pipeline', Icon: SquareKanban, label: 'Pipeline de vendas', secao: 'Vendas' },
  { id: 'contatos', Icon: Users, label: 'Contatos', secao: 'Vendas' },
  { id: 'propostas', Icon: FileText, label: 'Propostas', secao: 'Vendas' },
  { id: 'campanhas', Icon: Megaphone, label: 'Campanhas', secao: 'Marketing' },
  { id: 'relatorios', Icon: ChartLine, label: 'Relatórios', secao: 'Marketing' },
  { id: 'integracoes', Icon: Plug, label: 'Integrações', secao: 'Administração' },
  { id: 'faturamento', Icon: CreditCard, label: 'Faturamento', secao: 'Administração' },
  { id: 'config', Icon: Settings, label: 'Configurações', secao: 'Administração' },
]
const SECOES = ['Principal', 'Vendas', 'Marketing', 'Administração']
const RECENTES = ['propostas', 'contatos', 'relatorios']
const COLUNAS = ['Novos', 'Em contato', 'Proposta']

function normalizar(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

function Linha({ item, ativo, favorito, onSelecionar, onFavoritar }: { item: Item; ativo: boolean; favorito: boolean; onSelecionar: () => void; onFavoritar: () => void }) {
  return (
    <div className={cn('group/linha flex items-center rounded-md pr-1 transition-colors hover:bg-sidebar-accent', ativo && 'bg-sidebar-accent')}>
      <button type="button" onClick={onSelecionar} aria-current={ativo ? 'page' : undefined} className={cn('flex h-8 min-w-0 flex-1 items-center gap-2 px-2 text-left text-sm', ativo ? 'font-medium' : 'text-muted-foreground group-hover/linha:text-foreground')}>
        <item.Icon className="size-4 shrink-0" />
        <span className="truncate">{item.label}</span>
      </button>
      <button type="button" onClick={onFavoritar} aria-pressed={favorito} aria-label={favorito ? `Remover ${item.label} dos favoritos` : `Adicionar ${item.label} aos favoritos`} className={cn('rounded p-1 transition-opacity hover:text-foreground focus-visible:opacity-100', favorito ? 'text-amber-500 opacity-100' : 'text-muted-foreground opacity-0 group-hover/linha:opacity-100')}>
        <Star className={cn('size-3.5', favorito && 'fill-current')} />
      </button>
    </div>
  )
}

export default function SidebarBuscaFavoritos() {
  const [busca, setBusca] = useState('')
  const [ativo, setAtivo] = useState('pipeline')
  const [favoritos, setFavoritos] = useState<string[]>(['pipeline', 'inbox', 'relatorios'])
  const termo = normalizar(busca.trim())
  const resultados = termo ? ITENS.filter((i) => normalizar(i.label).includes(termo)) : []
  const atual = ITENS.find((i) => i.id === ativo) ?? ITENS[0]

  function favoritar(id: string) {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  const linha = (item: Item) => <Linha key={item.id} item={item} ativo={item.id === ativo} favorito={favoritos.includes(item.id)} onSelecionar={() => setAtivo(item.id)} onFavoritar={() => favoritar(item.id)} />

  return (
    <div className="flex min-h-[640px] w-full bg-muted/30 text-foreground">
      <aside className="m-3 hidden w-64 shrink-0 flex-col rounded-xl border bg-sidebar shadow-sm md:flex">
        <div className="flex items-center gap-2 px-3 pt-3 pb-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </span>
          <span className="flex-1 font-semibold">Prisma</span>
          <Button variant="ghost" size="icon-xs" aria-label="Recolher menu">
            <PanelLeft />
          </Button>
        </div>

        <div className="px-3 pb-2">
          <InputGroup className="bg-background">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar no menu" aria-label="Buscar no menu" />
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <nav className="min-h-0 flex-1 space-y-4 overflow-y-auto px-2 pb-2">
          {termo ? (
            <div>
              <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">
                {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
              </p>
              {resultados.length ? resultados.map(linha) : <p className="px-2 py-4 text-center text-xs text-muted-foreground">Nada encontrado para “{busca}”.</p>}
            </div>
          ) : (
            <>
              <div>
                <p className="flex items-center gap-1.5 px-2 pb-1 text-xs font-medium text-muted-foreground">
                  <Star className="size-3" /> Favoritos
                </p>
                {favoritos.length ? ITENS.filter((i) => favoritos.includes(i.id)).map(linha) : <p className="px-2 py-2 text-xs text-muted-foreground">Passe o mouse em um item e clique na estrela.</p>}
              </div>
              <div>
                <p className="flex items-center gap-1.5 px-2 pb-1 text-xs font-medium text-muted-foreground">
                  <Clock className="size-3" /> Recentes
                </p>
                {RECENTES.map((id) => ITENS.find((i) => i.id === id))
                  .filter((i): i is Item => Boolean(i))
                  .map(linha)}
              </div>
              {SECOES.map((s) => (
                <div key={s}>
                  <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">{s}</p>
                  {ITENS.filter((i) => i.secao === s).map(linha)}
                </div>
              ))}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 border-t p-3">
          <Avatar size="sm">
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <span className="min-w-0 text-sm leading-tight">
            <span className="block truncate font-medium">Carla Mendes</span>
            <span className="block truncate text-xs text-muted-foreground">carla@prisma.app</span>
          </span>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-3 md:pl-0">
        <div className="flex h-full flex-col rounded-xl border bg-background">
          <div className="flex items-center gap-2 border-b px-5 py-3">
            <atual.Icon className="size-4 text-muted-foreground" />
            <h1 className="text-sm font-semibold">{atual.label}</h1>
            {favoritos.includes(atual.id) && <Star className="size-3.5 fill-current text-amber-500" aria-label="Favorito" />}
            <Skeleton className="ml-auto h-7 w-24" />
          </div>
          <div className="grid flex-1 gap-4 p-5 sm:grid-cols-3">
            {COLUNAS.map((c, ci) => (
              <div key={c} className="rounded-lg bg-muted/50 p-2">
                <div className="flex items-center justify-between px-1 pb-2 text-xs font-medium text-muted-foreground">
                  {c}
                  <span className="tabular-nums">{4 - ci}</span>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 - ci }, (_, i) => (
                    <div key={i} className="space-y-2 rounded-md border bg-card p-3">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <div className="flex items-center justify-between pt-1">
                        <Skeleton className="h-4 w-12 rounded-full" />
                        <Skeleton className="size-5 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
