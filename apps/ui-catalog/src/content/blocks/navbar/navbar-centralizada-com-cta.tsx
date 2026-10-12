'use client'

import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'

const LINKS = ['Produto', 'Soluções', 'Preços', 'Clientes', 'Blog']

export default function NavbarCentralizadaComCta() {
  const [active, setActive] = useState('Produto')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="w-full bg-muted/30 px-4 py-4 sm:px-6">
      <header className="mx-auto max-w-6xl rounded-2xl border bg-background/90 shadow-sm backdrop-blur">
        <div className="grid h-14 grid-cols-[1fr_auto] items-center px-3 sm:px-4 md:grid-cols-[1fr_auto_1fr]">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">A</span> Acme
          </a>
          <nav className="hidden items-center gap-0.5 rounded-full border bg-muted/50 p-1 md:flex" aria-label="Principal">
            {LINKS.map((l) => {
              const isActive = l === active
              return (
                <a
                  key={l}
                  href="#"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(l)
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {l}
                </a>
              )
            })}
          </nav>
          <div className="hidden items-center justify-end gap-1 md:flex">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm">
              Agendar demo <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="justify-self-end md:hidden" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.nav key="mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t md:hidden" aria-label="Menu mobile">
              <div className="flex flex-col gap-1 p-3">
                {LINKS.map((l) => (
                  <a key={l} href="#" className={`rounded-lg px-3 py-2 text-sm ${l === active ? 'bg-muted font-medium' : 'hover:bg-muted'}`}>
                    {l}
                  </a>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button variant="outline">Entrar</Button>
                  <Button>Agendar demo</Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}
