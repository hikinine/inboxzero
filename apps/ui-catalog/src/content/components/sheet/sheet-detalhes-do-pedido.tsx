'use client'

import { Check, MapPin, Package, Printer, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type Status = 'Pago' | 'Enviado' | 'Pendente'

interface Pedido {
  num: string
  cliente: string
  status: Status
  total: number
  itens: { nome: string; qtd: number; preco: number; grad: string }[]
}

const PEDIDOS: Pedido[] = [
  { num: '#10482', cliente: 'Ana Souza', status: 'Enviado', total: 1489, itens: [{ nome: 'Fone Bluetooth Pulse', qtd: 1, preco: 1290, grad: 'from-sky-500/60 to-indigo-500/60' }, { nome: 'Capa protetora', qtd: 2, preco: 99.5, grad: 'from-amber-500/60 to-orange-400/60' }] },
  { num: '#10479', cliente: 'Bruno Rocha', status: 'Pago', total: 349.9, itens: [{ nome: 'Teclado compacto K2', qtd: 1, preco: 349.9, grad: 'from-emerald-500/60 to-teal-400/60' }] },
  { num: '#10471', cliente: 'Carla Mendes', status: 'Pendente', total: 2480, itens: [{ nome: 'Monitor 27" 4K', qtd: 1, preco: 2480, grad: 'from-violet-500/60 to-fuchsia-400/60' }] },
]

const PONTO: Record<Status, string> = { Pago: 'bg-emerald-500', Enviado: 'bg-sky-500', Pendente: 'bg-amber-500' }
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const ETAPAS = ['Confirmado', 'Pago', 'Enviado', 'Entregue']

function Detalhes({ p }: { p: Pedido }) {
  const etapa = p.status === 'Enviado' ? 2 : p.status === 'Pago' ? 1 : 0
  return (
    <div className="space-y-4 text-sm">
      <ol className="flex items-center gap-1.5">
        {ETAPAS.map((e, i) => (
          <li key={e} className="flex flex-1 flex-col gap-1">
            <span className={cn('h-1 rounded-full', i <= etapa ? 'bg-primary' : 'bg-muted')} />
            <span className={cn('text-[10px]', i <= etapa ? 'font-medium' : 'text-muted-foreground')}>{e}</span>
          </li>
        ))}
      </ol>

      <div className="space-y-2">
        {p.itens.map((it) => (
          <div key={it.nome} className="flex items-center gap-3">
            <span className={cn('size-11 shrink-0 rounded-md bg-gradient-to-br', it.grad)} aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{it.nome}</div>
              <div className="text-xs text-muted-foreground tabular-nums">
                {it.qtd} × {brl(it.preco)}
              </div>
            </div>
            <span className="tabular-nums">{brl(it.qtd * it.preco)}</span>
          </div>
        ))}
      </div>

      <Separator />
      <div className="space-y-1 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="tabular-nums">{brl(p.total)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Frete</span>
          <span className="text-emerald-600 dark:text-emerald-400">Grátis</span>
        </div>
        <div className="flex justify-between pt-1 text-sm font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{brl(p.total)}</span>
        </div>
      </div>

      <Separator />
      <div className="grid gap-3 text-xs sm:grid-cols-2">
        <div className="flex gap-2">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          <div>
            <div className="font-medium text-foreground">Entrega</div>
            <div className="text-muted-foreground">Rua Augusta, 1200 · Consolação · São Paulo, SP</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Truck className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          <div>
            <div className="font-medium text-foreground">Transportadora</div>
            <div className="text-muted-foreground">Loggi · previsão 11/10 · código BR4821SP</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SheetDetalhesDoPedido() {
  return (
    <div className="w-full max-w-lg space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Abrir a partir da lista</p>
        <div className="divide-y rounded-xl border bg-card">
          {PEDIDOS.map((p) => (
            <div key={p.num} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{p.num}</span>
              <span className="flex-1 truncate">{p.cliente}</span>
              <Badge variant="outline">
                <span className={cn('size-1.5 rounded-full', PONTO[p.status])} aria-hidden /> {p.status}
              </Badge>
              <span className="w-24 text-right tabular-nums">{brl(p.total)}</span>
              <Sheet>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>Ver</SheetTrigger>
                <SheetContent side="right" className="sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Package className="size-4" /> Pedido {p.num}
                      <Badge variant="outline">
                        <span className={cn('size-1.5 rounded-full', PONTO[p.status])} aria-hidden /> {p.status}
                      </Badge>
                    </SheetTitle>
                    <SheetDescription>
                      {p.cliente} · feito em 08/10/2026 às 09:12 · Pix
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto px-4">
                    <Detalhes p={p} />
                  </div>
                  <SheetFooter className="flex-row justify-end border-t">
                    <Button variant="outline" size="sm">
                      <Printer data-icon="inline-start" /> Nota fiscal
                    </Button>
                    <SheetClose render={<Button size="sm" />}>
                      <Check data-icon="inline-start" /> Concluir
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Painel (inline)</p>
        <div className="max-w-sm rounded-xl border bg-popover text-popover-foreground shadow-sm">
          <div className="space-y-0.5 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium">
              <Package className="size-4" /> Pedido #10482
              <Badge variant="outline">
                <span className="size-1.5 rounded-full bg-sky-500" aria-hidden /> Enviado
              </Badge>
            </h3>
            <p className="text-sm text-muted-foreground">Ana Souza · feito em 08/10/2026 às 09:12 · Pix</p>
          </div>
          <div className="px-4 pb-4">
            <Detalhes p={PEDIDOS[0]!} />
          </div>
          <div className="flex justify-end gap-2 border-t p-4">
            <Button variant="outline" size="sm">
              <Printer data-icon="inline-start" /> Nota fiscal
            </Button>
            <Button size="sm">
              <Check data-icon="inline-start" /> Concluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
