'use client'

import { Fragment } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, ChevronDown, CreditCard, Keyboard, LifeBuoy, LogOut, Search, Settings, User, Users } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

interface ItemMenu {
  Icon: LucideIcon
  label: string
  atalho?: string[]
}

const GRUPOS: ItemMenu[][] = [
  [
    { Icon: User, label: 'Meu perfil', atalho: ['⌘', 'P'] },
    { Icon: Settings, label: 'Configurações', atalho: ['⌘', ','] },
    { Icon: Bell, label: 'Notificações' },
  ],
  [
    { Icon: Users, label: 'Equipe Lumi' },
    { Icon: CreditCard, label: 'Plano e cobrança' },
  ],
  [
    { Icon: Keyboard, label: 'Atalhos de teclado', atalho: ['⌘', 'K'] },
    { Icon: LifeBuoy, label: 'Suporte' },
  ],
]

function Cabecalho() {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <Avatar>
        <AvatarFallback>AS</AvatarFallback>
        <AvatarBadge className="bg-emerald-500" />
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">Ana Souza</p>
        <p className="truncate text-xs text-muted-foreground">ana@lumi.com.br</p>
      </div>
    </div>
  )
}

export default function DropdownUsuario() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dropdowns</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Menu do usuário</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Avatar com status, nome e e-mail no topo, grupos de ações com atalhos e saída em destaque. O menu real abre na barra; ao lado, o mesmo menu aberto.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="rounded-xl border bg-card">
            <div className="flex items-center gap-3 border-b px-4 py-2.5">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs text-primary-foreground">L</span>
                Lumi CRM
              </div>
              <div className="relative ml-auto hidden w-64 sm:block">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar contatos, negócios…" className="pl-8" aria-label="Buscar" />
              </div>
              <Button variant="ghost" size="icon" aria-label="Notificações">
                <Bell />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" className="h-9 gap-2 px-1.5" />}>
                  <Avatar size="sm">
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium sm:inline">Ana Souza</span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-0 font-normal">
                      <Cabecalho />
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  {GRUPOS.map((g, gi) => (
                    <Fragment key={gi}>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {g.map((it) => (
                          <DropdownMenuItem key={it.label}>
                            <it.Icon /> {it.label}
                            {it.atalho && <DropdownMenuShortcut>{it.atalho.join('')}</DropdownMenuShortcut>}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </Fragment>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut /> Sair
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-3 p-4">
              <div className="h-3 w-40 rounded bg-muted" />
              <div className="grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-20 rounded-lg border bg-muted/40" />
                ))}
              </div>
              <div className="h-32 rounded-lg border bg-muted/40" />
            </div>
          </div>

          <div className="mx-auto w-64 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <Cabecalho />
            {GRUPOS.map((g, gi) => (
              <div key={gi}>
                <div className="-mx-1 my-1 h-px bg-border" />
                {g.map((it) => (
                  <div key={it.label} className="flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm hover:bg-accent">
                    <it.Icon className="size-4 text-muted-foreground" />
                    <span>{it.label}</span>
                    {it.atalho && (
                      <KbdGroup className="ml-auto">
                        {it.atalho.map((k) => (
                          <Kbd key={k}>{k}</Kbd>
                        ))}
                      </KbdGroup>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div className="-mx-1 my-1 h-px bg-border" />
            <div className="flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm text-destructive hover:bg-destructive/10">
              <LogOut className="size-4" />
              <span>Sair</span>
              <KbdGroup className="ml-auto">
                <Kbd>⇧</Kbd>
                <Kbd>⌘</Kbd>
                <Kbd>Q</Kbd>
              </KbdGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
