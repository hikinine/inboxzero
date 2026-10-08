'use client'

import { Calendar, FileText, Inbox, Search, Settings, User, Zap } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'

export default function CommandPalette() {
  return (
    <Command className="w-full max-w-md rounded-xl border shadow-lg">
      <CommandInput placeholder="Digite um comando ou busque…" />
      <CommandList>
        <CommandEmpty>Nada encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <Inbox /> Abrir inbox <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Zap /> Nova automação <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Calendar /> Agendar reunião
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recentes">
          <CommandItem>
            <FileText /> Proposta · Lumi Tecnologia
          </CommandItem>
          <CommandItem>
            <User /> Ana Souza
          </CommandItem>
          <CommandItem>
            <Search /> leads sem resposta há 2 dias
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem>
            <Settings /> Preferências <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
