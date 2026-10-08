'use client'

import { ArrowUpRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const CH_NAV_LINKS = ['Áreas', 'Capacidades', 'Processo', 'Contratação', 'FAQ']

export default function CodehallNavbar() {
  return (
    <header className="w-full border-b bg-background [--acc:var(--brand,#d7ff4f)] [--on-acc:var(--brand-foreground,#10120e)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-(--acc) text-base font-black text-(--on-acc)">C</span>
          <span className="leading-tight">
            <b className="block text-[15px] font-bold">Codehall</b>
            <small className="block text-xs text-muted-foreground">Software house · IA aplicada</small>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {CH_NAV_LINKS.map((l) => (
            <a key={l} href="#" className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="hidden items-center gap-1.5 rounded-full bg-(--acc) px-4 py-2 text-sm font-semibold text-(--on-acc) transition hover:brightness-105 md:inline-flex">
          Falar com a gente <ArrowUpRight className="size-4" />
        </a>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Codehall</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {CH_NAV_LINKS.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
              <a href="#" className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-(--acc) px-4 py-2 text-sm font-semibold text-(--on-acc)">
                Falar com a gente <ArrowUpRight className="size-4" />
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
