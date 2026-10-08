'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const LINKS = ['Produto', 'Preços', 'Clientes', 'Docs', 'Blog']

export default function NavbarSimples() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="size-6 rounded-md bg-primary" /> Acme
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l} href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">Começar grátis</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Acme</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {LINKS.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
              <Button className="mt-4">Começar grátis</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
