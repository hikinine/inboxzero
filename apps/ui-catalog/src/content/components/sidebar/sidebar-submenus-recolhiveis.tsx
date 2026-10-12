'use client'

import { useState, type CSSProperties } from 'react'
import { ChevronRight, ChevronsUpDown, FolderKanban, House, Inbox, Plus, Settings, Users, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Item {
  id: string
  label: string
  Icon: LucideIcon
  badge?: string
  filhos?: { id: string; label: string }[]
  acao?: boolean
}

const ITENS: Item[] = [
  { id: 'inicio', label: 'Início', Icon: House },
  { id: 'inbox', label: 'Inbox', Icon: Inbox, badge: '12' },
  {
    id: 'projetos',
    label: 'Projetos',
    Icon: FolderKanban,
    acao: true,
    filhos: [
      { id: 'pulse', label: 'Lançamento Pulse' },
      { id: 'site', label: 'Site novo' },
      { id: 'app', label: 'App mobile' },
    ],
  },
  { id: 'contatos', label: 'Contatos', Icon: Users },
  {
    id: 'config',
    label: 'Configurações',
    Icon: Settings,
    filhos: [
      { id: 'geral', label: 'Geral' },
      { id: 'equipe', label: 'Equipe' },
      { id: 'cobranca', label: 'Cobrança' },
    ],
  },
]

const LARGURA: CSSProperties = { '--sidebar-width': '15rem' } as CSSProperties

export default function SidebarSubmenusRecolhiveis() {
  const [aberto, setAberto] = useState<Record<string, boolean>>({ projetos: true, config: false })
  const [ativo, setAtivo] = useState('pulse')

  const caminho = (() => {
    for (const it of ITENS) {
      if (it.id === ativo) return [it.label]
      const f = it.filhos?.find((x) => x.id === ativo)
      if (f) return [it.label, f.label]
    }
    return ['Início']
  })()

  return (
    <SidebarProvider style={LARGURA} className="h-[460px] min-h-0 w-full max-w-2xl overflow-hidden rounded-xl border">
      <Sidebar collapsible="none" className="border-r">
        <SidebarHeader>
          <button type="button" className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-left text-sm hover:bg-sidebar-accent">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">L</span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate font-medium">Lumi Tecnologia</span>
              <span className="block truncate text-[11px] text-muted-foreground">Plano Pro</span>
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ITENS.map((it) => {
                  const temFilhos = !!it.filhos?.length
                  const expandido = aberto[it.id] ?? false
                  const paiAtivo = it.id === ativo || !!it.filhos?.some((f) => f.id === ativo)
                  return (
                    <SidebarMenuItem key={it.id}>
                      <SidebarMenuButton
                        isActive={!temFilhos && it.id === ativo}
                        onClick={() => {
                          if (temFilhos) setAberto((m) => ({ ...m, [it.id]: !expandido }))
                          else setAtivo(it.id)
                        }}
                        className={cn(temFilhos && paiAtivo && 'font-medium')}
                      >
                        <it.Icon />
                        <span>{it.label}</span>
                        {temFilhos && <ChevronRight className={cn('ml-auto transition-transform', expandido && 'rotate-90')} />}
                      </SidebarMenuButton>
                      {it.badge && <SidebarMenuBadge>{it.badge}</SidebarMenuBadge>}
                      {it.acao && (
                        <SidebarMenuAction showOnHover aria-label={`Novo em ${it.label}`} className="right-7">
                          <Plus />
                        </SidebarMenuAction>
                      )}
                      {temFilhos && expandido && (
                        <SidebarMenuSub>
                          {it.filhos!.map((f) => (
                            <SidebarMenuSubItem key={f.id}>
                              <SidebarMenuSubButton
                                href="#"
                                isActive={f.id === ativo}
                                onClick={(e) => {
                                  e.preventDefault()
                                  setAtivo(f.id)
                                }}
                              >
                                <span>{f.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-2 rounded-md px-1.5 py-1 text-xs">
            <Avatar size="sm">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate font-medium">Ana Souza</div>
              <div className="truncate text-muted-foreground">ana@lumi.com.br</div>
            </div>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="flex h-12 items-center gap-1.5 border-b px-4 text-sm">
          {caminho.map((c, i) => (
            <span key={c} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 text-muted-foreground" />}
              <span className={i === caminho.length - 1 ? 'font-medium' : 'text-muted-foreground'}>{c}</span>
            </span>
          ))}
        </header>
        <div className="space-y-3 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-2 rounded-lg border p-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
          <div className="space-y-2 rounded-lg border p-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-3" style={{ width: `${90 - i * 12}%` }} />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
