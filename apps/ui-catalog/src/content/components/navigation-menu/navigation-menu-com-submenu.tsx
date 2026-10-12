'use client'

import type { ReactNode } from 'react'
import { ArrowRight, BarChart3, KanbanSquare, MessagesSquare, Sparkles, Zap, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

interface Produto {
  titulo: string
  desc: string
  icon: LucideIcon
}

const PRODUTOS: Produto[] = [
  { titulo: 'CRM', desc: 'Pipeline visual, negócios e follow-ups.', icon: KanbanSquare },
  { titulo: 'Automações', desc: 'Fluxos com IA para WhatsApp e e-mail.', icon: Zap },
  { titulo: 'Atendimento', desc: 'Inbox compartilhada e multicanal.', icon: MessagesSquare },
  { titulo: 'Relatórios', desc: 'Métricas de vendas em tempo real.', icon: BarChart3 },
]

const SOLUCOES = [
  { titulo: 'Varejo', desc: 'Recupere carrinhos e fidelize clientes.' },
  { titulo: 'Serviços', desc: 'Agendamentos, lembretes e cobrança.' },
  { titulo: 'Educação', desc: 'Matrículas e relacionamento com alunos.' },
  { titulo: 'SaaS', desc: 'Onboarding, expansão e retenção.' },
]

function EntradaProduto({ p }: { p: Produto }) {
  return (
    <>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <p.icon className="size-4" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium leading-none">{p.titulo}</span>
        <span className="text-xs text-muted-foreground">{p.desc}</span>
      </span>
    </>
  )
}

function DestaqueIA({ children }: { children?: ReactNode }) {
  return (
    <>
      <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Sparkles className="size-4" />
      </span>
      <span className="mt-auto flex flex-col gap-1">
        <span className="text-sm font-medium">Lumi IA</span>
        <span className="text-xs text-muted-foreground">Respostas sugeridas, resumo de conversas e previsão de fechamento.</span>
      </span>
      {children}
    </>
  )
}

export default function NavigationMenuComSubmenu() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <Demo title="Barra de navegação (passe o mouse em Produtos)">
        <div className="flex items-center justify-between gap-4 rounded-xl border bg-card px-3 py-2">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="size-6 rounded-md bg-primary" aria-hidden /> Lumi
          </a>
          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[520px] grid-cols-[200px_1fr] gap-1 p-1">
                    <NavigationMenuLink href="#" className="h-full flex-col items-start justify-between rounded-lg bg-gradient-to-b from-muted/60 to-muted p-3">
                      <DestaqueIA>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Conhecer <ArrowRight className="size-3" />
                        </span>
                      </DestaqueIA>
                    </NavigationMenuLink>
                    <ul className="grid gap-1">
                      {PRODUTOS.map((p) => (
                        <li key={p.titulo}>
                          <NavigationMenuLink href="#" className="items-start">
                            <EntradaProduto p={p} />
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-1">
                    {SOLUCOES.map((s) => (
                      <li key={s.titulo}>
                        <NavigationMenuLink href="#" className="flex-col items-start gap-0.5">
                          <span className="text-sm font-medium leading-none">{s.titulo}</span>
                          <span className="text-xs text-muted-foreground">{s.desc}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Preços
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm">Começar grátis</Button>
          </div>
        </div>
      </Demo>

      <Demo title="Painel “Produtos” (inline)">
        <div className="inline-grid w-full max-w-[520px] grid-cols-1 gap-1 rounded-lg bg-popover p-1 text-popover-foreground shadow ring-1 ring-foreground/10 sm:grid-cols-[200px_1fr]">
          <a href="#" className="flex h-full flex-col items-start justify-between gap-2 rounded-lg bg-gradient-to-b from-muted/60 to-muted p-3 text-sm transition-colors hover:bg-muted">
            <DestaqueIA>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Conhecer <ArrowRight className="size-3" />
              </span>
            </DestaqueIA>
          </a>
          <ul className="grid gap-1">
            {PRODUTOS.map((p) => (
              <li key={p.titulo}>
                <a href="#" className="flex items-start gap-2 rounded-md p-2 text-sm transition-colors hover:bg-muted">
                  <EntradaProduto p={p} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Demo>
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
