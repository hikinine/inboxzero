'use client'

import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, Bot, GitBranch, LifeBuoy, Sparkles, Webhook, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

interface Atalho {
  titulo: string
  desc: string
  Icon: LucideIcon
}

const ATALHOS: Atalho[] = [
  { titulo: 'Agentes de IA', desc: 'Atendem e qualificam leads sozinhos.', Icon: Bot },
  { titulo: 'Webhooks', desc: 'Eventos em tempo real para o seu stack.', Icon: Webhook },
  { titulo: 'Fluxos', desc: 'Automação visual sem código.', Icon: GitBranch },
]

const RECURSOS = [
  { titulo: 'Documentação', Icon: BookOpen },
  { titulo: 'Central de ajuda', Icon: LifeBuoy },
]

const RODAPE = ['Changelog', 'Roadmap', 'Status']

function Destaque() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-md p-3 text-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-sky-500/10 to-violet-500/20" aria-hidden />
      <div className="relative">
        <Badge className="gap-1">
          <Sparkles /> Novo
        </Badge>
        <div className="mt-6 flex h-16 items-end gap-1" aria-hidden>
          {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-primary/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-3 font-medium">Previsão de fechamento</div>
        <div className="text-xs text-muted-foreground">A IA estima a chance de cada negócio fechar e sugere o próximo passo.</div>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
          Ver o lançamento <ArrowRight className="size-3" />
        </span>
      </div>
    </div>
  )
}

function LinhaAtalho({ a }: { a: Atalho }) {
  return (
    <>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <a.Icon className="size-4" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm leading-none font-medium">{a.titulo}</span>
        <span className="text-xs text-muted-foreground">{a.desc}</span>
      </span>
    </>
  )
}

function PainelNovidades({ Link }: { Link: (p: { children: ReactNode; className?: string }) => ReactNode }) {
  return (
    <div className="w-[560px] max-w-full p-1">
      <div className="grid grid-cols-[220px_1fr] gap-1">
        <Link className="p-0">
          <Destaque />
        </Link>
        <ul className="grid content-start gap-1">
          {ATALHOS.map((a) => (
            <li key={a.titulo}>
              <Link className="items-start">
                <LinhaAtalho a={a} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-1 flex items-center gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
        {RODAPE.map((r) => (
          <a key={r} href="#" className="hover:text-foreground">
            {r}
          </a>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden /> Todos os sistemas operando
        </span>
      </div>
    </div>
  )
}

export default function NavigationMenuDestaqueDeProduto() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Barra com menu centralizado (passe o mouse em Novidades)</p>
        <div className="flex items-center justify-between gap-4 rounded-full border bg-muted/40 py-1.5 pr-1.5 pl-4">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-5 rounded-full bg-gradient-to-br from-primary to-violet-500" aria-hidden /> Lumi
          </a>
          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full">Novidades</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <PainelNovidades Link={({ children, className }) => <NavigationMenuLink href="#" className={className}>{children}</NavigationMenuLink>} />
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full">Recursos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-56 gap-1 p-1">
                    {RECURSOS.map((r) => (
                      <li key={r.titulo}>
                        <NavigationMenuLink href="#">
                          <r.Icon className="text-muted-foreground" /> {r.titulo}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={`${navigationMenuTriggerStyle()} rounded-full`}>
                  Preços
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Avatar size="sm">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Painel “Novidades” (inline)</p>
        <div className="inline-block max-w-full rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10">
          <PainelNovidades Link={({ children, className }) => <a href="#" className={`flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-muted ${className ?? ''}`}>{children}</a>} />
        </div>
      </div>
    </div>
  )
}
