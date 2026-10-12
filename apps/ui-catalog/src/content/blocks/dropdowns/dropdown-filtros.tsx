'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Grupo = 'status' | 'prioridade' | 'responsavel'

interface Opcao {
  value: string
  label: string
  cor?: string
  iniciais?: string
}

const OPCOES: Record<Grupo, Opcao[]> = {
  status: [
    { value: 'aberto', label: 'Aberto', cor: 'bg-sky-500' },
    { value: 'andamento', label: 'Em andamento', cor: 'bg-amber-500' },
    { value: 'concluido', label: 'Concluído', cor: 'bg-emerald-500' },
    { value: 'cancelado', label: 'Cancelado', cor: 'bg-rose-500' },
  ],
  prioridade: [
    { value: 'alta', label: 'Alta', cor: 'bg-rose-500' },
    { value: 'media', label: 'Média', cor: 'bg-amber-500' },
    { value: 'baixa', label: 'Baixa', cor: 'bg-muted-foreground/40' },
  ],
  responsavel: [
    { value: 'ana', label: 'Ana Souza', iniciais: 'AS' },
    { value: 'bruno', label: 'Bruno Rocha', iniciais: 'BR' },
    { value: 'carla', label: 'Carla Mendes', iniciais: 'CM' },
    { value: 'diego', label: 'Diego Lima', iniciais: 'DL' },
  ],
}

const TITULOS: Record<Grupo, string> = { status: 'Status', prioridade: 'Prioridade', responsavel: 'Responsável' }
const GRUPOS: Grupo[] = ['status', 'prioridade', 'responsavel']

type Selecao = Record<Grupo, string[]>

const INICIAL: Selecao = { status: ['aberto', 'andamento'], prioridade: ['alta'], responsavel: ['ana'] }

function Marcador({ o }: { o: Opcao }) {
  if (o.iniciais) {
    return (
      <Avatar size="sm">
        <AvatarFallback>{o.iniciais}</AvatarFallback>
      </Avatar>
    )
  }
  return <span className={cn('size-2 rounded-full', o.cor)} />
}

export default function DropdownFiltros() {
  const [sel, setSel] = useState<Selecao>(INICIAL)
  const total = GRUPOS.reduce((n, g) => n + sel[g].length, 0)

  function alternar(grupo: Grupo, value: string) {
    setSel((prev) => {
      const atual = prev[grupo]
      return { ...prev, [grupo]: atual.includes(value) ? atual.filter((v) => v !== value) : [...atual, value] }
    })
  }
  const limpar = () => setSel({ status: [], prioridade: [], responsavel: [] })

  const ativos = GRUPOS.flatMap((g) => sel[g].map((v) => ({ grupo: g, opcao: OPCOES[g].find((o) => o.value === v)! })))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dropdowns</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Filtros</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Status, prioridade e responsável em checkboxes, com contagem no gatilho, chips dos filtros ativos e botão de aplicar. O menu real e o painel aberto compartilham o estado.</p>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="flex flex-wrap items-center gap-2 border-b p-3">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                <Filter data-icon="inline-start" /> Filtros
                {total > 0 && <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5">{total}</Badge>}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {GRUPOS.map((g, i) => (
                  <DropdownMenuGroup key={g}>
                    {i > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel>{TITULOS[g]}</DropdownMenuLabel>
                    {OPCOES[g].map((o) => (
                      <DropdownMenuCheckboxItem key={o.value} checked={sel[g].includes(o.value)} onCheckedChange={() => alternar(g, o.value)} closeOnClick={false}>
                        <Marcador o={o} /> {o.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {ativos.map(({ grupo, opcao }) => (
              <Badge key={`${grupo}-${opcao.value}`} variant="outline" className="gap-1.5 pr-1">
                <Marcador o={opcao} />
                {opcao.label}
                <button type="button" aria-label={`Remover filtro ${opcao.label}`} onClick={() => alternar(grupo, opcao.value)} className="rounded-sm p-0.5 hover:bg-muted">
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {total > 0 && (
              <Button variant="ghost" size="sm" onClick={limpar}>
                Limpar tudo
              </Button>
            )}
            <span className="ml-auto text-sm text-muted-foreground">{total > 0 ? '18 de 64 tarefas' : '64 tarefas'}</span>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1fr_320px]">
            <div className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border px-3 py-2.5">
                  <div className="size-4 rounded border" />
                  <div className="h-3 flex-1 rounded bg-muted" style={{ maxWidth: `${55 - i * 6}%` }} />
                  <div className="h-5 w-16 rounded-full bg-muted" />
                  <div className="size-6 rounded-full bg-muted" />
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
              {GRUPOS.map((g, i) => (
                <div key={g}>
                  {i > 0 && <div className="-mx-1 my-1 h-px bg-border" />}
                  <p className="px-1.5 py-1 text-xs font-medium text-muted-foreground">{TITULOS[g]}</p>
                  {OPCOES[g].map((o) => {
                    const id = `inl-${g}-${o.value}`
                    return (
                      <Label key={o.value} htmlFor={id} className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-sm font-normal hover:bg-accent">
                        <Checkbox id={id} checked={sel[g].includes(o.value)} onCheckedChange={() => alternar(g, o.value)} />
                        <Marcador o={o} />
                        {o.label}
                      </Label>
                    )
                  })}
                </div>
              ))}
              <div className="-mx-1 my-1 h-px bg-border" />
              <div className="flex items-center justify-between gap-2 p-1">
                <Button variant="ghost" size="sm" onClick={limpar} disabled={total === 0}>
                  Limpar
                </Button>
                <Button size="sm">Aplicar filtros{total > 0 ? ` (${total})` : ''}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
