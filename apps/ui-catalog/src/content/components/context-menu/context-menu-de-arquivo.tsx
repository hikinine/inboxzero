'use client'

import { useState, type ReactNode } from 'react'
import { Check, ChevronRight, Copy, Download, ExternalLink, FileText, FolderInput, Link2, Mail, Pencil, Share2, Star, Trash2, Users, type LucideIcon } from 'lucide-react'
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu'
import { cn } from '@/lib/utils'

export default function ContextMenuDeArquivo() {
  const [favorito, setFavorito] = useState(false)
  return (
    <div className="grid w-full max-w-lg gap-5 sm:grid-cols-[1fr_auto]">
      <Demo title="Área (clique com o botão direito)">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-52 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/30 text-sm">
            <div className="relative flex size-12 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <FileText className="size-6" />
              {favorito && <Star className="absolute -top-1 -right-1 size-4 fill-amber-400 text-amber-400" />}
            </div>
            <div className="font-medium">relatorio-q3.pdf</div>
            <div className="text-xs text-muted-foreground">2,4 MB · editado há 2 h</div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel>relatorio-q3.pdf</ContextMenuLabel>
            <ContextMenuItem>
              <ExternalLink /> Abrir <ContextMenuShortcut>↵</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Download /> Baixar <ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Pencil /> Renomear <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Copy /> Duplicar <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <FolderInput /> Mover para…
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Share2 /> Compartilhar
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem>
                  <Link2 /> Copiar link
                </ContextMenuItem>
                <ContextMenuItem>
                  <Mail /> Enviar por e-mail
                </ContextMenuItem>
                <ContextMenuItem>
                  <Users /> Convidar pessoas
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuCheckboxItem checked={favorito} onCheckedChange={(v) => setFavorito(v)}>
              <Star /> Favorito
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <Trash2 /> Mover para a lixeira <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Demo>
      <Demo title="Conteúdo (inline)">
        <div className="w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="px-1.5 py-1 text-xs font-medium text-muted-foreground">relatorio-q3.pdf</div>
          <Linha icon={ExternalLink} label="Abrir" kbd="↵" />
          <Linha icon={Download} label="Baixar" kbd="⌘D" />
          <Sep />
          <Linha icon={Pencil} label="Renomear" kbd="F2" />
          <Linha icon={Copy} label="Duplicar" kbd="⌘C" />
          <Linha icon={FolderInput} label="Mover para…" />
          <Linha icon={Share2} label="Compartilhar" sub ativo />
          <Linha icon={Star} label="Favorito" check={favorito} />
          <Sep />
          <Linha icon={Trash2} label="Mover para a lixeira" kbd="⌘⌫" destrutivo />
        </div>
      </Demo>
    </div>
  )
}

function Sep() {
  return <div className="-mx-1 my-1 h-px bg-border" />
}

function Linha({ icon: Icon, label, kbd, sub, check, ativo, destrutivo }: { icon: LucideIcon; label: string; kbd?: string; sub?: boolean; check?: boolean; ativo?: boolean; destrutivo?: boolean }) {
  return (
    <div className={cn('flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm', ativo && 'bg-accent text-accent-foreground', destrutivo && 'text-destructive')}>
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
      {kbd && <span className="ml-auto text-xs tracking-widest text-muted-foreground">{kbd}</span>}
      {sub && <ChevronRight className="ml-auto size-4" />}
      {check && <Check className="ml-auto size-4" />}
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
