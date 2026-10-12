'use client'

import type { ReactNode } from 'react'
import { BarChart3, Inbox, LayoutDashboard, Menu, Minus, Plus, Settings, ShoppingBag, Users, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

const ITENS = [
  { nome: 'Tênis Corrida Pro', variante: 'Tam. 42 · Preto', qtd: 1, preco: 499.9, cor: 'from-sky-500/40 to-sky-500/5' },
  { nome: 'Camiseta Dry Fit', variante: 'M · Branca', qtd: 2, preco: 89.9, cor: 'from-emerald-500/40 to-emerald-500/5' },
  { nome: 'Garrafa Térmica 1L', variante: 'Inox', qtd: 1, preco: 129, cor: 'from-amber-500/40 to-amber-500/5' },
]
const NAV = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Inbox', icon: Inbox, badge: '12' },
  { label: 'Contatos', icon: Users },
  { label: 'Relatórios', icon: BarChart3 },
  { label: 'Configurações', icon: Settings },
]
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const subtotal = ITENS.reduce((acc, i) => acc + i.preco * i.qtd, 0)

function Carrinho({ compacto }: { compacto?: boolean }) {
  return (
    <ul className={cn('divide-y', compacto && 'text-xs')}>
      {ITENS.map((i) => (
        <li key={i.nome} className="flex gap-3 py-3">
          <div className={cn('shrink-0 rounded-lg bg-gradient-to-br', i.cor, compacto ? 'size-10' : 'size-14')} />
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium">{i.nome}</div>
            <div className="text-muted-foreground">{i.variante}</div>
            <div className="mt-1 flex items-center justify-between">
              <div className="inline-flex items-center rounded-md border">
                <Button size="icon-xs" variant="ghost" aria-label="Diminuir">
                  <Minus />
                </Button>
                <span className="w-5 text-center tabular-nums">{i.qtd}</span>
                <Button size="icon-xs" variant="ghost" aria-label="Aumentar">
                  <Plus />
                </Button>
              </div>
              <span className="font-medium tabular-nums">{brl(i.preco * i.qtd)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function DrawerLateral() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <Demo title="Gatilhos (direita e esquerda)">
        <div className="flex flex-wrap gap-2">
          <Drawer swipeDirection="right">
            <DrawerTrigger render={<Button />}>
              <ShoppingBag data-icon="inline-start" /> Carrinho ({ITENS.length})
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="border-b pb-4">
                <DrawerTitle>Seu carrinho</DrawerTitle>
                <DrawerDescription>{ITENS.length} itens · frete grátis acima de R$ 299</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4">
                <Carrinho />
              </div>
              <DrawerFooter className="border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium tabular-nums">{brl(subtotal)}</span>
                </div>
                <Button>Finalizar compra</Button>
                <DrawerClose render={<Button variant="ghost" />}>Continuar comprando</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Drawer swipeDirection="left">
            <DrawerTrigger render={<Button variant="outline" />}>
              <Menu data-icon="inline-start" /> Menu
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="flex-row items-center justify-between border-b pb-4">
                <div>
                  <DrawerTitle>Lumi CRM</DrawerTitle>
                  <DrawerDescription>ana@lumi.com.br</DrawerDescription>
                </div>
                <DrawerClose render={<Button size="icon-sm" variant="ghost" aria-label="Fechar" />}>
                  <X />
                </DrawerClose>
              </DrawerHeader>
              <nav className="flex flex-col gap-0.5 p-2">
                {NAV.map((n, i) => (
                  <a key={n.label} href="#" className={cn('flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-muted', i === 1 && 'bg-muted font-medium')}>
                    <n.icon className="size-4 text-muted-foreground" />
                    {n.label}
                    {n.badge && <span className="ml-auto rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">{n.badge}</span>}
                  </a>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </Demo>

      <Demo title="Conteúdo (inline)">
        <div className="flex h-80 overflow-hidden rounded-xl border bg-muted/40">
          <div className="flex-1 space-y-3 p-4" aria-hidden>
            <div className="h-3 w-28 rounded bg-muted-foreground/20" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 rounded-lg bg-muted-foreground/10" />
              <div className="h-20 rounded-lg bg-muted-foreground/10" />
            </div>
            <div className="h-3 w-40 rounded bg-muted-foreground/20" />
            <div className="h-3 w-24 rounded bg-muted-foreground/20" />
          </div>
          <div className="flex w-64 shrink-0 flex-col rounded-l-xl border-l bg-popover text-sm text-popover-foreground shadow-xl">
            <div className="border-b p-3">
              <div className="font-heading font-medium">Seu carrinho</div>
              <div className="text-xs text-muted-foreground">{ITENS.length} itens</div>
            </div>
            <div className="flex-1 overflow-hidden px-3">
              <Carrinho compacto />
            </div>
            <div className="border-t p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums">{brl(subtotal)}</span>
              </div>
              <Button size="sm" className="w-full">
                Finalizar compra
              </Button>
            </div>
          </div>
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
