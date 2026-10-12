'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell, Briefcase, CalendarDays, ChartLine, FileText, House, Mail, PanelLeft, Phone, Plus, Search, Settings, SquareKanban, UserRound, Users, X, Zap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'

type Etapa = 'Qualificado' | 'Proposta' | 'Negociação' | 'Fechamento'

interface Negocio {
  id: number
  nome: string
  empresa: string
  etapa: Etapa
  valor: string
  resp: string
  contato: string
  telefone: string
  email: string
  proximo: string
}

const NAV: { Icon: LucideIcon; label: string; active?: boolean }[] = [
  { Icon: House, label: 'Início' },
  { Icon: Briefcase, label: 'Negócios', active: true },
  { Icon: Users, label: 'Contatos' },
  { Icon: SquareKanban, label: 'Pipeline' },
  { Icon: CalendarDays, label: 'Agenda' },
  { Icon: ChartLine, label: 'Relatórios' },
  { Icon: Settings, label: 'Configurações' },
]

const ETAPAS: Etapa[] = ['Qualificado', 'Proposta', 'Negociação', 'Fechamento']

const NEGOCIOS: Negocio[] = [
  { id: 1, nome: 'Implantação do CRM', empresa: 'Clínica Vida', etapa: 'Proposta', valor: 'R$ 24.000', resp: 'AS', contato: 'Marina Costa', telefone: '(11) 98877-1020', email: 'marina@clinicavida.com.br', proximo: 'Call de alinhamento · qui, 15h' },
  { id: 2, nome: 'Licenças para 3 lojas', empresa: 'Agência Pulso', etapa: 'Negociação', valor: 'R$ 12.500', resp: 'BR', contato: 'Pedro Henrique', telefone: '(11) 99876-5432', email: 'pedro@agenciapulso.com', proximo: 'Enviar proposta revisada · hoje' },
  { id: 3, nome: 'Automação de WhatsApp', empresa: 'Bistrô Oliva', etapa: 'Fechamento', valor: 'R$ 8.900', resp: 'CM', contato: 'Juliana Alves', telefone: '(11) 97654-3210', email: 'juliana@bistrooliva.com.br', proximo: 'Assinatura do contrato · sex' },
  { id: 4, nome: 'Integração com ERP', empresa: 'Kavo Ltda', etapa: 'Qualificado', valor: 'R$ 31.200', resp: 'DL', contato: 'Bruno Rocha', telefone: '(19) 98123-4567', email: 'bruno@kavo.com.br', proximo: 'Reunião de descoberta · 15 out' },
  { id: 5, nome: 'Portal do cliente', empresa: 'Banco Vetor', etapa: 'Proposta', valor: 'R$ 58.000', resp: 'AS', contato: 'Renata Martins', telefone: '(21) 99345-6789', email: 'renata@bancovetor.com.br', proximo: 'Apresentação para a diretoria · 20 out' },
]

export default function AppShellBarraDeComando() {
  const [aberto, setAberto] = useState(true)
  const [selecionado, setSelecionado] = useState<number | null>(2)
  const atual = NEGOCIOS.find((n) => n.id === selecionado) ?? null

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setAberto((a) => !a)
      }
      if (e.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function escolher(id: number) {
    setSelecionado(id)
    setAberto(false)
  }

  return (
    <div className="flex min-h-[640px] w-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r bg-sidebar md:flex">
        <div className="flex h-14 items-center gap-2 border-b px-4 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </span>
          Órbita CRM
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {NAV.map((n) => (
            <a key={n.label} href="#" className={cn('flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors', n.active ? 'bg-sidebar-accent font-medium' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground')}>
              <n.Icon className="size-4" /> {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t p-3">
          <Avatar size="sm">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-sm leading-tight">
            <div className="truncate font-medium">Ana Souza</div>
            <div className="truncate text-xs text-muted-foreground">ana@orbita.app</div>
          </div>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <header className="relative z-20 flex h-14 items-center gap-2 border-b bg-background px-4">
          <Button variant="ghost" size="icon-sm" aria-label="Alternar menu" className="md:hidden">
            <PanelLeft />
          </Button>
          <button type="button" onClick={() => setAberto(true)} aria-expanded={aberto} className="mx-auto flex h-8 w-full max-w-md items-center gap-2 rounded-lg border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted">
            <Search className="size-4" />
            <span className="flex-1 truncate text-left">Buscar ou executar um comando…</span>
            <Kbd className="hidden sm:inline-flex">⌘K</Kbd>
          </button>
          <Button size="sm" className="hidden sm:inline-flex">
            <Plus data-icon="inline-start" /> Negócio
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Notificações">
            <Bell />
          </Button>
          <Avatar size="sm">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </header>

        {aberto && (
          <>
            <div className="absolute inset-0 z-10 bg-background/40" onClick={() => setAberto(false)} aria-hidden="true" />
            <div className="absolute top-16 left-1/2 z-30 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
              <Command className="rounded-xl border shadow-lg" loop>
                <CommandInput placeholder="Digite um comando ou busque negócios, contatos…" />
                <CommandList>
                  <CommandEmpty>Nenhum resultado para essa busca.</CommandEmpty>
                  <CommandGroup heading="Ações">
                    <CommandItem onSelect={() => setAberto(false)}>
                      <Plus /> Novo negócio <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setAberto(false)}>
                      <UserRound /> Novo contato <CommandShortcut>⌘U</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setAberto(false)}>
                      <Phone /> Registrar ligação
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Negócios">
                    {NEGOCIOS.map((n) => (
                      <CommandItem key={n.id} value={`${n.nome} ${n.empresa}`} onSelect={() => escolher(n.id)}>
                        <Briefcase />
                        <span className="flex-1 truncate">
                          {n.nome} <span className="text-muted-foreground">· {n.empresa}</span>
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">{n.valor}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Ir para">
                    <CommandItem onSelect={() => setAberto(false)}>
                      <SquareKanban /> Pipeline <CommandShortcut>G P</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setAberto(false)}>
                      <ChartLine /> Relatórios <CommandShortcut>G R</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => setAberto(false)}>
                      <Settings /> Configurações <CommandShortcut>⌘,</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </>
        )}

        <div className="grid flex-1 lg:grid-cols-[1fr_320px]">
          <main className="min-w-0 p-4 sm:p-6">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Negócios</h1>
                <p className="text-sm text-muted-foreground">{NEGOCIOS.length} abertos · R$ 134.600 em pipeline</p>
              </div>
              <Badge variant="outline">Outubro</Badge>
            </div>
            <ul className="divide-y rounded-xl border bg-card">
              {NEGOCIOS.map((n) => {
                const ativo = n.id === selecionado
                return (
                  <li key={n.id}>
                    <button type="button" onClick={() => setSelecionado(n.id)} aria-pressed={ativo} className={cn('flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50', ativo && 'bg-muted/60')}>
                      <span className={cn('h-8 w-1 shrink-0 rounded-full', ativo ? 'bg-primary' : 'bg-transparent')} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{n.nome}</p>
                        <p className="truncate text-xs text-muted-foreground">{n.empresa}</p>
                      </div>
                      <Badge variant="outline" className="hidden sm:inline-flex">
                        {n.etapa}
                      </Badge>
                      <span className="w-20 text-right text-sm font-medium tabular-nums">{n.valor}</span>
                      <Avatar size="sm">
                        <AvatarFallback>{n.resp}</AvatarFallback>
                      </Avatar>
                    </button>
                  </li>
                )
              })}
            </ul>
          </main>

          <aside className="border-t bg-muted/30 lg:border-t-0 lg:border-l">
            {atual ? (
              <div className="flex h-full flex-col">
                <div className="flex items-start gap-2 border-b px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Detalhes</p>
                    <p className="truncate text-sm font-semibold">{atual.nome}</p>
                    <p className="truncate text-xs text-muted-foreground">{atual.empresa}</p>
                  </div>
                  <Button variant="ghost" size="icon-xs" aria-label="Fechar painel" onClick={() => setSelecionado(null)}>
                    <X />
                  </Button>
                </div>
                <div className="space-y-5 p-4 text-sm">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Valor</p>
                      <p className="text-2xl font-semibold tabular-nums">{atual.valor}</p>
                    </div>
                    <Avatar>
                      <AvatarFallback>{atual.resp}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="mb-2 text-xs text-muted-foreground">Etapa</p>
                    <ol className="flex items-center gap-1.5">
                      {ETAPAS.map((e, i) => (
                        <li key={e} className={cn('h-1.5 flex-1 rounded-full', i <= ETAPAS.indexOf(atual.etapa) ? 'bg-primary' : 'bg-muted')} title={e} />
                      ))}
                    </ol>
                    <p className="mt-1.5 text-xs font-medium">
                      {atual.etapa} <span className="font-normal text-muted-foreground">· {ETAPAS.indexOf(atual.etapa) + 1} de {ETAPAS.length}</span>
                    </p>
                  </div>
                  <div className="space-y-2 rounded-lg border bg-background p-3">
                    <p className="flex items-center gap-2 font-medium">
                      <UserRound className="size-4 text-muted-foreground" /> {atual.contato}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="size-4" /> {atual.telefone}
                    </p>
                    <p className="flex items-center gap-2 truncate text-muted-foreground">
                      <Mail className="size-4 shrink-0" /> <span className="truncate">{atual.email}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Próxima atividade</p>
                    <p className="mt-1 flex items-center gap-2">
                      <CalendarDays className="size-4 text-muted-foreground" /> {atual.proximo}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <FileText data-icon="inline-start" /> Proposta
                    </Button>
                    <Button size="sm" className="flex-1">
                      Avançar etapa
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted-foreground">
                <Briefcase className="size-6" />
                Selecione um negócio ou use <Kbd>⌘K</Kbd> para buscar.
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
