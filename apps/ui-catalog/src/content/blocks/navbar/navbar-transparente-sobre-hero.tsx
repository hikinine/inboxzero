'use client'

import { useState } from 'react'
import { ArrowRight, Menu, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const LINKS = ['Produto', 'Clientes', 'Preços', 'Blog']

export default function NavbarTransparenteSobreHero() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <section className="w-full sm:px-6 sm:py-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden bg-zinc-950 text-white sm:rounded-3xl">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/40 via-fuchsia-500/20 to-transparent blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-80 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        </div>

        <header className={cn('relative z-10 transition-colors duration-300', scrolled ? 'border-b border-white/10 bg-zinc-950/70 backdrop-blur-md' : 'border-b border-transparent bg-transparent')}>
          <div className="flex h-16 items-center justify-between px-6 sm:px-10">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <span className="size-6 rounded-md bg-white" /> Acme
            </a>
            <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
              {LINKS.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                  {l}
                </a>
              ))}
            </nav>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10 hover:text-white">
                Entrar
              </Button>
              <Button size="sm" className="bg-white text-zinc-950 hover:bg-white/90">
                Começar grátis
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white md:hidden" aria-label="Abrir menu">
              <Menu />
            </Button>
          </div>
        </header>

        <div className="relative z-10 px-6 pt-16 pb-20 text-center sm:px-10 sm:pt-24 sm:pb-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Novo: Copiloto de vendas com IA
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Atenda no WhatsApp como uma empresa grande</h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">Inbox único, CRM e automações no mesmo lugar. Seu time responde em minutos — e você enxerga tudo.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="bg-white text-zinc-950 hover:bg-white/90">
              Começar grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Play data-icon="inline-start" /> Ver demonstração
            </Button>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-2 border-t border-white/10 px-6 py-3">
          <Switch size="sm" id="nav-scroll" checked={scrolled} onCheckedChange={setScrolled} className="data-unchecked:bg-white/20" />
          <Label htmlFor="nav-scroll" className="text-xs font-normal text-white/60">
            Simular página rolada (navbar ganha fundo e blur)
          </Label>
        </div>
      </div>
    </section>
  )
}
