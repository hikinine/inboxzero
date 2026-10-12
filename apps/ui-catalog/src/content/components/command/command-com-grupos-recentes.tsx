'use client'

import type { ReactNode } from 'react'
import { Clock, FileText, Inbox, LayoutDashboard, Plus, Settings, Upload, Users, Zap, type LucideIcon } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

interface Entrada {
  label: string
  icon: LucideIcon
  keys?: string[]
  meta?: string
}

const RECENTES: Entrada[] = [
  { label: 'Proposta · Lumi Tecnologia', icon: FileText, meta: 'há 5 min' },
  { label: 'Pipeline de vendas', icon: LayoutDashboard, meta: 'há 1 h' },
  { label: 'Ana Souza', icon: Users, meta: 'ontem' },
]

const PAGINAS: Entrada[] = [
  { label: 'Visão geral', icon: LayoutDashboard, keys: ['G', 'D'] },
  { label: 'Inbox', icon: Inbox, keys: ['G', 'I'] },
  { label: 'Contatos', icon: Users, keys: ['G', 'C'] },
  { label: 'Configurações', icon: Settings, keys: ['⌘', ','] },
]

const ACOES: Entrada[] = [
  { label: 'Novo contato', icon: Plus, keys: ['⌘', 'N'] },
  { label: 'Criar automação', icon: Zap, keys: ['⇧', '⌘', 'A'] },
  { label: 'Importar planilha', icon: Upload, keys: ['⇧', '⌘', 'I'] },
]

function Atalho({ keys }: { keys: string[] }) {
  return (
    <CommandShortcut>
      <KbdGroup>
        {keys.map((k, i) => (
          <Kbd key={i}>{k}</Kbd>
        ))}
      </KbdGroup>
    </CommandShortcut>
  )
}

function Grupo({ heading, itens }: { heading: ReactNode; itens: Entrada[] }) {
  return (
    <CommandGroup heading={heading}>
      {itens.map((it) => (
        <CommandItem key={it.label} value={it.label}>
          <it.icon /> {it.label}
          {it.keys ? <Atalho keys={it.keys} /> : null}
          {it.meta ? <CommandShortcut className="tracking-normal">{it.meta}</CommandShortcut> : null}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export default function CommandComGruposRecentes() {
  return (
    <Command className="w-full max-w-md border shadow-lg">
      <CommandInput placeholder="Buscar páginas, contatos ou ações…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado. Tente outro termo.</CommandEmpty>
        <Grupo
          heading={
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3" /> Recentes
            </span>
          }
          itens={RECENTES}
        />
        <CommandSeparator />
        <Grupo heading="Páginas" itens={PAGINAS} />
        <CommandSeparator />
        <Grupo heading="Ações" itens={ACOES} />
      </CommandList>
      <div className="-mx-1 -mb-1 mt-1 flex items-center gap-4 rounded-b-xl border-t bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <KbdGroup>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
          </KbdGroup>
          navegar
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>↵</Kbd> abrir
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5">
          <Kbd>esc</Kbd> fechar
        </span>
      </div>
    </Command>
  )
}
