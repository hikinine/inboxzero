'use client'

import { useState } from 'react'
import { Activity, ArrowRight, BookOpen, Bot, Briefcase, ChevronDown, FileText, GraduationCap, Inbox, Menu, MessageSquare, ShoppingBag, Stethoscope, Users, Workflow } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const LINKS = ['Preços', 'Clientes', 'Docs', 'Blog']

const MEGA = [
  {
    title: 'Plataforma',
    items: [
      { Icon: Inbox, t: 'Inbox unificado', d: 'WhatsApp, Instagram e e-mail num só lugar' },
      { Icon: Users, t: 'CRM', d: 'Contatos, etapas e histórico completo' },
      { Icon: Workflow, t: 'Automações', d: 'Fluxos sem código para triagem e follow-up' },
      { Icon: Bot, t: 'Assistente de IA', d: 'Resumo, sugestão de resposta e triagem' },
    ],
  },
  {
    title: 'Soluções',
    items: [
      { Icon: ShoppingBag, t: 'Varejo', d: 'Pedidos, trocas e pós-venda por mensagem' },
      { Icon: Stethoscope, t: 'Clínicas', d: 'Agendamento e confirmação automática' },
      { Icon: GraduationCap, t: 'Educação', d: 'Matrícula e suporte ao aluno' },
      { Icon: Briefcase, t: 'Agências', d: 'Várias contas, um painel' },
    ],
  },
  {
    title: 'Recursos',
    items: [
      { Icon: BookOpen, t: 'Documentação', d: 'Guias de configuração e API' },
      { Icon: FileText, t: 'Guias práticos', d: 'Playbooks de atendimento e vendas' },
      { Icon: MessageSquare, t: 'Comunidade', d: '4 mil gestores trocando experiências' },
      { Icon: Activity, t: 'Status', d: 'Disponibilidade em tempo real' },
    ],
  },
]

export default function NavbarComMegaMenu() {
  const [open, setOpen] = useState(true)

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="size-6 rounded-md bg-primary" /> Acme
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground ${open ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
          >
            Produto <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
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
              {MEGA.map((col) => (
                <div key={col.title} className="mb-2">
                  <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{col.title}</p>
                  {col.items.map((it) => (
                    <a key={it.t} href="#" className="block rounded-md px-3 py-1.5 text-sm hover:bg-muted">
                      {it.t}
                    </a>
                  ))}
                </div>
              ))}
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
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="hidden border-t bg-background md:block">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-3">
              {MEGA.map((col) => (
                <div key={col.title}>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{col.title}</p>
                  <ul className="mt-3 space-y-1">
                    {col.items.map(({ Icon, t, d }) => (
                      <li key={t}>
                        <a href="#" className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground group-hover:text-foreground">
                            <Icon className="size-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium">{t}</span>
                            <span className="block text-xs text-muted-foreground">{d}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t bg-muted/40">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-3 text-sm">
                <Badge>Novo</Badge>
                <span className="text-muted-foreground">Assistente de IA 2.0 já está disponível para todos os planos.</span>
                <a href="#" className="ml-auto inline-flex items-center gap-1 font-medium hover:underline">
                  Ver novidades <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
