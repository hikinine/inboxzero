'use client'

import { Bell, CreditCard, LogOut, Plus, Search, Settings, Sparkles, UserRound, Zap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'

const LINKS = ['Visão geral', 'Projetos', 'Tarefas', 'Relatórios', 'Equipe']

export default function HeaderBuscaAvatar() {
  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </span>
          <span className="hidden sm:inline">Fluxo</span>
        </a>
        <InputGroup className="mx-auto w-full max-w-sm">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar projetos, tarefas, pessoas…" aria-label="Buscar" />
          <InputGroupAddon align="inline-end" className="hidden sm:flex">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <Button size="sm" className="hidden sm:inline-flex">
          <Plus data-icon="inline-start" /> Novo
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
          <Bell />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu do usuário" />}>
            <Avatar>
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Ana Souza</span>
                <span className="text-xs font-normal">ana@fluxo.app</span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRound /> Perfil <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard /> Faturamento
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings /> Configurações <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Sparkles /> Fazer upgrade
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6">
        {LINKS.map((l, i) => (
          <a key={l} href="#" className={`-mb-px border-b-2 px-3 py-2.5 text-sm whitespace-nowrap transition-colors ${i === 0 ? 'border-foreground font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {l}
          </a>
        ))}
      </nav>
    </header>
  )
}
