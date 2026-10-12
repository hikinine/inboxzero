'use client'

import { ArrowRight, Home, LifeBuoy, Mail, Menu, Navigation, Package, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Entregas', 'Rastrear', 'Para empresas', 'Ajuda']

function RotaLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Navigation className="size-4" />
      </span>
      Rota
    </a>
  )
}

function RotaNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <RotaLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" className="hidden md:inline-flex">
          Pedir uma entrega
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Rota</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function LostIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="mx-auto h-44 w-auto" role="img" aria-label="Mapa com rota interrompida">
      <defs>
        <pattern id="rota-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" className="fill-none stroke-border" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="10" y="10" width="300" height="180" rx="16" className="fill-muted stroke-border" />
      <rect x="10" y="10" width="300" height="180" rx="16" fill="url(#rota-grid)" />
      <path d="M 50 150 C 90 150, 90 80, 140 80 S 190 130, 230 110" className="fill-none stroke-foreground" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
      <circle cx="50" cy="150" r="7" className="fill-background stroke-foreground" strokeWidth="3" />
      <g className="stroke-rose-500" strokeWidth="3.5" strokeLinecap="round">
        <path d="M 252 96 L 272 116" />
        <path d="M 272 96 L 252 116" />
      </g>
      <g transform="translate(262 60)">
        <path d="M 0 -22 L 0 22 M -22 0 L 22 0" className="stroke-muted-foreground/40" strokeWidth="2" />
        <circle r="26" className="fill-none stroke-muted-foreground/40" strokeWidth="2" />
        <path d="M 0 -14 L 6 0 L 0 14 L -6 0 Z" className="fill-foreground" />
      </g>
    </svg>
  )
}

const LINKS = [
  { Icon: Home, t: 'Página inicial', d: 'Voltar ao começo' },
  { Icon: Package, t: 'Rastrear entrega', d: 'Com o código do pedido' },
  { Icon: LifeBuoy, t: 'Central de ajuda', d: 'Dúvidas frequentes' },
  { Icon: Mail, t: 'Falar com a gente', d: 'Resposta em 1 dia útil' },
]

function RotaFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <RotaLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Entregas', 'Rastrear', 'Ajuda', 'Status', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Rota Entregas</span>
      </div>
    </footer>
  )
}

export default function Pagina404() {
  return (
    <div className="flex w-full min-h-screen flex-col bg-background text-foreground">
      <RotaNavbar />
      <main className="flex flex-1 items-center px-6 py-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <LostIllustration />
          <Badge variant="outline" className="mt-6 font-mono">
            Erro 404
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Essa rota não existe</h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">A página que você procura foi movida, apagada ou o endereço está com algum erro de digitação. Vamos te colocar de volta no caminho.</p>
          <form className="mx-auto mt-8 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Buscar no site ou colar código de rastreio" aria-label="Buscar" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton type="submit" variant="default" size="sm">
                  Buscar
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((l) => (
              <a key={l.t} href="#" className="group flex flex-col items-start rounded-2xl border bg-card p-4 text-left transition-colors hover:bg-muted/50">
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <l.Icon className="size-4" />
                </span>
                <span className="mt-3 flex items-center gap-1 text-sm font-medium">
                  {l.t} <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="text-xs text-muted-foreground">{l.d}</span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <RotaFooter />
    </div>
  )
}
