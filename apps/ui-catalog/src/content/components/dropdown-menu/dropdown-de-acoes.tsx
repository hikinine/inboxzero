'use client'

import type { ReactNode } from 'react'
import { Archive, Check, ChevronDown, ChevronRight, Copy, FolderInput, MoreHorizontal, Pencil, Share2, Trash2, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const ETAPAS = ['Qualificação', 'Proposta enviada', 'Negociação', 'Fechamento']

function MenuAcoes() {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Proposta #2041</DropdownMenuLabel>
        <DropdownMenuItem>
          <Pencil /> Editar <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy /> Duplicar <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 /> Compartilhar
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <FolderInput /> Mover para etapa
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {ETAPAS.map((e, i) => (
            <DropdownMenuItem key={e}>
              {e}
              {i === 1 && <Check className="ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem>
        <Archive /> Arquivar <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <Trash2 /> Excluir <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  )
}

export default function DropdownDeAcoes() {
  return (
    <div className="grid w-full max-w-lg gap-5 sm:grid-cols-[1fr_auto]">
      <Demo title="Gatilhos">
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Ações <ChevronDown data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-52">
              <MenuAcoes />
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Mais ações" />}>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-52">
              <MenuAcoes />
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-xs text-muted-foreground">Com submenu, atalhos e item destrutivo</span>
        </div>
      </Demo>

      <Demo title="Conteúdo (inline)">
        <div className="w-52 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="px-1.5 py-1 text-xs font-medium text-muted-foreground">Proposta #2041</div>
          <Linha icon={Pencil} label="Editar" kbd="⌘E" ativo />
          <Linha icon={Copy} label="Duplicar" kbd="⌘D" />
          <Linha icon={Share2} label="Compartilhar" />
          <Sep />
          <Linha icon={FolderInput} label="Mover para etapa" sub />
          <Linha icon={Archive} label="Arquivar" kbd="⇧⌘A" />
          <Sep />
          <Linha icon={Trash2} label="Excluir" kbd="⌘⌫" destrutivo />
        </div>
      </Demo>
    </div>
  )
}

function Sep() {
  return <div className="-mx-1 my-1 h-px bg-border" />
}

function Linha({ icon: Icon, label, kbd, sub, ativo, destrutivo }: { icon: LucideIcon; label: string; kbd?: string; sub?: boolean; ativo?: boolean; destrutivo?: boolean }) {
  return (
    <div className={cn('flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm', ativo && 'bg-accent text-accent-foreground', destrutivo && 'text-destructive')}>
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
      {kbd && <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', ativo && 'text-accent-foreground')}>{kbd}</span>}
      {sub && <ChevronRight className="ml-auto size-4" />}
    </div>
  )
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
