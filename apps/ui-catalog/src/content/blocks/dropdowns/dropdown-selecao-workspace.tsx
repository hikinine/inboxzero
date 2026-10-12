'use client'

import { useState } from 'react'
import { Bell, Check, ChevronsUpDown, Plus, Search, Settings, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'

interface Workspace {
  id: string
  nome: string
  plano: string
  membros: number
  ini: string
  cor: string
  papel: string
}

const WORKSPACES: Workspace[] = [
  { id: 'lumi', nome: 'Lumi Tecnologia', plano: 'Pro', membros: 12, ini: 'LT', cor: 'from-violet-500 to-fuchsia-500', papel: 'Administradora' },
  { id: 'kavo', nome: 'Kavo Ltda', plano: 'Starter', membros: 4, ini: 'K', cor: 'from-sky-500 to-cyan-400', papel: 'Editora' },
  { id: 'nuvem', nome: 'Nuvem Fit', plano: 'Business', membros: 27, ini: 'NF', cor: 'from-emerald-500 to-lime-400', papel: 'Visualizadora' },
  { id: 'pulso', nome: 'Agência Pulso', plano: 'Pro', membros: 9, ini: 'AP', cor: 'from-amber-500 to-orange-500', papel: 'Convidada' },
]

function Logo({ ws, className }: { ws: Workspace; className?: string }) {
  return <span className={cn('flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br font-semibold text-white', ws.cor, className)}>{ws.ini}</span>
}

export default function DropdownSelecaoWorkspace() {
  const [atualId, setAtualId] = useState('lumi')
  const atual = WORKSPACES.find((w) => w.id === atualId) ?? WORKSPACES[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dropdowns</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Seleção de workspace</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Troca de conta no canto da barra: lista com plano e membros, item atual marcado e atalhos para convidar e criar. O menu real fica na barra; ao lado, o mesmo menu aberto.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="flex items-center gap-2 border-b px-3 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="h-9 gap-2 px-1.5" aria-label="Trocar workspace" />}>
                  <Logo ws={atual} className="size-6 text-[11px]" />
                  <span className="text-sm font-semibold">{atual.nome}</span>
                  <Badge variant="outline" className="hidden sm:inline-flex">
                    {atual.plano}
                  </Badge>
                  <ChevronsUpDown className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-72">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Seus workspaces</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={atualId} onValueChange={(v) => setAtualId(String(v))}>
                      {WORKSPACES.map((w) => (
                        <DropdownMenuRadioItem key={w.id} value={w.id} className="gap-2.5 py-1.5">
                          <Logo ws={w} className="size-7 text-[11px]" />
                          <span className="flex min-w-0 flex-col leading-tight">
                            <span className="truncate font-medium">{w.nome}</span>
                            <span className="truncate text-xs text-muted-foreground">
                              {w.plano} · {w.membros} membros · {w.papel}
                            </span>
                          </span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserPlus /> Convidar para {atual.nome.split(' ')[0]} <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings /> Configurações do workspace
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus /> Criar novo workspace
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative ml-auto hidden w-56 sm:block">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar…" className="pl-8" aria-label="Buscar" />
              </div>
              <Button variant="ghost" size="icon" aria-label="Notificações">
                <Bell />
              </Button>
              <Avatar size="sm">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-5">
              <p className="text-xs text-muted-foreground">Você está em</p>
              <div className="mt-1 flex items-center gap-3">
                <Logo ws={atual} className="size-10 text-sm" />
                <div>
                  <p className="text-lg font-semibold">{atual.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {atual.papel} · plano {atual.plano}
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ['Membros', String(atual.membros)],
                  ['Projetos', String(atual.membros * 2 - 3)],
                  ['Automações', String(atual.membros + 6)],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">{l}</p>
                    <p className="text-xl font-semibold tabular-nums">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto w-72 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <p className="px-1.5 py-1 text-xs font-medium text-muted-foreground">Seus workspaces</p>
            {WORKSPACES.map((w) => (
              <button key={w.id} type="button" onClick={() => setAtualId(w.id)} className={cn('flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left text-sm hover:bg-accent', w.id === atualId && 'bg-accent')}>
                <Logo ws={w} className="size-7 text-[11px]" />
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate font-medium">{w.nome}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {w.plano} · {w.membros} membros
                  </span>
                </span>
                {w.id === atualId && <Check className="size-4" />}
              </button>
            ))}
            <div className="-mx-1 my-1 h-px bg-border" />
            <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-accent">
              <UserPlus className="size-4 text-muted-foreground" /> Convidar membros
              <KbdGroup className="ml-auto">
                <Kbd>⌘</Kbd>
                <Kbd>I</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-accent">
              <Settings className="size-4 text-muted-foreground" /> Configurações do workspace
            </div>
            <div className="-mx-1 my-1 h-px bg-border" />
            <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-accent">
              <Plus className="size-4 text-muted-foreground" /> Criar novo workspace
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
