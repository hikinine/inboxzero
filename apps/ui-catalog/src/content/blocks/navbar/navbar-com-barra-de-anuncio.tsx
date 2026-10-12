'use client'

import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const AVISOS = [
  { tag: 'Novo', text: 'Copiloto de vendas com IA disponível em todos os planos.', cta: 'Conhecer' },
  { tag: 'Evento', text: 'Webinar ao vivo: atendimento no WhatsApp em escala — 22 de outubro, 15h.', cta: 'Reservar vaga' },
  { tag: '-30%', text: 'Plano anual com 30% de desconto até sexta-feira.', cta: 'Aproveitar' },
]

interface Link {
  label: string
  badge?: string
}

const LINKS: Link[] = [{ label: 'Produto' }, { label: 'Preços' }, { label: 'Integrações', badge: '300+' }, { label: 'Clientes' }, { label: 'Blog' }]

export default function NavbarComBarraDeAnuncio() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const aviso = AVISOS[idx] ?? AVISOS[0]!
  const go = (d: number) => setIdx((i) => (i + d + AVISOS.length) % AVISOS.length)

  const navBtn = 'text-primary-foreground/70 hover:bg-primary-foreground/15 hover:text-primary-foreground'

  return (
    <header className="w-full bg-background">
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div key="aviso" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-primary text-primary-foreground">
            <div className="mx-auto flex h-10 max-w-7xl items-center gap-2 px-3 sm:px-6">
              <Button variant="ghost" size="icon-xs" aria-label="Aviso anterior" onClick={() => go(-1)} className={`hidden sm:inline-flex ${navBtn}`}>
                <ChevronLeft />
              </Button>
              <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden text-sm">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[11px] font-semibold">{aviso.tag}</span>
                    <span className="truncate">{aviso.text}</span>
                    <a href="#" className="hidden shrink-0 items-center gap-1 font-medium underline-offset-4 hover:underline sm:inline-flex">
                      {aviso.cta} <ArrowRight className="size-3.5" />
                    </a>
                  </motion.p>
                </AnimatePresence>
              </div>
              <Button variant="ghost" size="icon-xs" aria-label="Próximo aviso" onClick={() => go(1)} className={`hidden sm:inline-flex ${navBtn}`}>
                <ChevronRight />
              </Button>
              <span className="hidden text-[11px] text-primary-foreground/60 tabular-nums sm:inline">
                {idx + 1}/{AVISOS.length}
              </span>
              <Button variant="ghost" size="icon-xs" aria-label="Fechar aviso" onClick={() => setVisible(false)} className={navBtn}>
                <X />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="size-6 rounded-md bg-primary" /> Acme
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {LINKS.map((l) => (
              <a key={l.label} href="#" className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {l.label}
                {l.badge && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                    {l.badge}
                  </Badge>
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Entrar
            </Button>
            <Button size="sm">Começar grátis</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
              <Menu />
            </Button>
          </div>
        </div>
      </div>

      {!visible && (
        <div className="flex justify-center border-b bg-muted/40 py-1.5 text-xs text-muted-foreground">
          Barra de anúncio fechada.
          <button type="button" className="ml-1 underline underline-offset-4 hover:text-foreground" onClick={() => setVisible(true)}>
            Mostrar de novo
          </button>
        </div>
      )}
    </header>
  )
}
