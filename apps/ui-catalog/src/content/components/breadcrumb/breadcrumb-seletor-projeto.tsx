'use client'

import { useState, type ReactNode } from 'react'
import { Check, ChevronDown, ChevronsUpDown, Plus, Settings } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Projeto {
  id: string
  nome: string
  cor: string
}
const PROJETOS: Projeto[] = [
  { id: 'crm', nome: 'CRM Lumi', cor: 'bg-sky-500' },
  { id: 'site', nome: 'Site institucional', cor: 'bg-emerald-500' },
  { id: 'app', nome: 'App do cliente', cor: 'bg-violet-500' },
  { id: 'ajuda', nome: 'Central de ajuda', cor: 'bg-amber-500' },
]
const WORKSPACES = [
  { id: 'lumi', nome: 'Lumi Tecnologia', ini: 'L' },
  { id: 'rocha', nome: 'Rocha & Filhos', ini: 'R' },
  { id: 'studio', nome: 'Studio Lima', ini: 'S' },
]
const AMBIENTES = [
  { id: 'prod', label: 'Produção', classe: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' },
  { id: 'staging', label: 'Staging', classe: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
  { id: 'dev', label: 'Desenvolvimento', classe: 'bg-muted text-muted-foreground' },
]
const SELETOR = '-ml-1.5 h-7 gap-1.5 px-1.5 font-medium text-foreground'

export default function BreadcrumbSeletorProjeto() {
  const [projeto, setProjeto] = useState<Projeto>(PROJETOS[0] ?? { id: 'crm', nome: 'CRM Lumi', cor: 'bg-sky-500' })
  const [aberto, setAberto] = useState(false)
  const [ws, setWs] = useState(WORKSPACES[0] ?? { id: 'lumi', nome: 'Lumi Tecnologia', ini: 'L' })
  const [amb, setAmb] = useState('prod')
  const ambiente = AMBIENTES.find((a) => a.id === amb) ?? AMBIENTES[0]

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>Projeto como primeiro item (busca no popover)</Legenda>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Popover open={aberto} onOpenChange={setAberto}>
                <PopoverTrigger render={<Button variant="ghost" size="xs" className={SELETOR} aria-label="Trocar projeto" />}>
                  <span className={cn('size-3 rounded-sm', projeto.cor)} />
                  {projeto.nome}
                  <ChevronsUpDown className="size-3.5 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-0">
                  <Command>
                    <CommandInput placeholder="Buscar projeto…" />
                    <CommandList>
                      <CommandEmpty>Nenhum projeto encontrado.</CommandEmpty>
                      <CommandGroup heading="Projetos">
                        {PROJETOS.map((p) => (
                          <CommandItem
                            key={p.id}
                            value={p.nome}
                            onSelect={() => {
                              setProjeto(p)
                              setAberto(false)
                            }}
                          >
                            <span className={cn('size-3 rounded-sm', p.cor)} /> {p.nome}
                            {p.id === projeto.id && (
                              <CommandShortcut>
                                <Check className="size-4 text-foreground" />
                              </CommandShortcut>
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem onSelect={() => setAberto(false)}>
                          <Plus /> Novo projeto
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Configurações</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Integrações</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <Legenda>Workspace e ambiente como seletores</Legenda>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="xs" className={SELETOR} aria-label="Trocar workspace" />}>
                  <span className="flex size-4 items-center justify-center rounded bg-primary text-[10px] font-semibold text-primary-foreground">{ws.ini}</span>
                  {ws.nome}
                  <ChevronsUpDown className="size-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={ws.id} onValueChange={(v) => setWs((atual) => WORKSPACES.find((w) => w.id === v) ?? atual)}>
                      {WORKSPACES.map((w) => (
                        <DropdownMenuRadioItem key={w.id} value={w.id}>
                          <span className="flex size-4 items-center justify-center rounded bg-muted text-[10px] font-semibold">{w.ini}</span>
                          {w.nome}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Plus /> Criar workspace
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings /> Configurações
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Projetos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{projeto.nome}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<button type="button" aria-label="Trocar ambiente" className={cn('ml-1 inline-flex h-5 items-center gap-1 rounded-4xl px-2 text-xs font-medium', ambiente?.classe)} />}
                >
                  {ambiente?.label}
                  <ChevronDown className="size-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-44">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Ambiente</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={amb} onValueChange={(v) => setAmb(String(v))}>
                      {AMBIENTES.map((a) => (
                        <DropdownMenuRadioItem key={a.id} value={a.id}>
                          {a.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
