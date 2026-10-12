'use client'

import { useState } from 'react'
import { ChevronRight, MapPin, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Status = 'Entregue' | 'A caminho' | 'Separando'

interface Pedido {
  num: string
  cliente: string
  cidade: string
  data: string
  status: Status
  itens: { nome: string; qtd: number; preco: number }[]
  rastreio: string
}

const PEDIDOS: Pedido[] = [
  { num: '#10482', cliente: 'Ana Souza', cidade: 'São Paulo, SP', data: '08/10', status: 'A caminho', rastreio: 'BR4821SP', itens: [{ nome: 'Fone Bluetooth Pulse', qtd: 1, preco: 1290 }, { nome: 'Capa protetora', qtd: 2, preco: 99.5 }] },
  { num: '#10479', cliente: 'Bruno Rocha', cidade: 'Curitiba, PR', data: '07/10', status: 'Entregue', rastreio: 'BR4790PR', itens: [{ nome: 'Teclado compacto K2', qtd: 1, preco: 349.9 }] },
  { num: '#10471', cliente: 'Carla Mendes', cidade: 'Recife, PE', data: '06/10', status: 'Separando', rastreio: '—', itens: [{ nome: 'Monitor 27" 4K', qtd: 1, preco: 2480 }, { nome: 'Suporte articulado', qtd: 1, preco: 189 }, { nome: 'Cabo DisplayPort 2 m', qtd: 2, preco: 59.9 }] },
  { num: '#10466', cliente: 'Diego Lima', cidade: 'Belo Horizonte, MG', data: '05/10', status: 'Entregue', rastreio: 'BR4660MG', itens: [{ nome: 'Mouse vertical', qtd: 1, preco: 219 }] },
]

const PONTO: Record<Status, string> = { Entregue: 'bg-emerald-500', 'A caminho': 'bg-sky-500', Separando: 'bg-amber-500' }
const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const totalDe = (p: Pedido) => p.itens.reduce((a, i) => a + i.qtd * i.preco, 0)

export default function TabelaLinhasExpansiveis() {
  const [abertos, setAbertos] = useState<Set<string>>(new Set(['#10482']))
  const todos = abertos.size === PEDIDOS.length

  const alternar = (num: string) =>
    setAbertos((s) => {
      const n = new Set(s)
      if (n.has(num)) n.delete(num)
      else n.add(num)
      return n
    })

  return (
    <div className="w-full max-w-2xl rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div>
          <h3 className="text-sm font-medium">Pedidos recentes</h3>
          <p className="text-xs text-muted-foreground">Expanda uma linha para ver os itens e a entrega.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setAbertos(todos ? new Set() : new Set(PEDIDOS.map((p) => p.num)))}>
          {todos ? 'Recolher tudo' : 'Expandir tudo'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 pl-3" />
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="pr-4 text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PEDIDOS.map((p) => {
            const aberto = abertos.has(p.num)
            return (
              <Linha key={p.num} p={p} aberto={aberto} onToggle={() => alternar(p.num)} />
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function Linha({ p, aberto, onToggle }: { p: Pedido; aberto: boolean; onToggle: () => void }) {
  return (
    <>
      <TableRow className={cn(aberto && 'border-b-0')}>
        <TableCell className="pl-3">
          <Button variant="ghost" size="icon-xs" aria-label={aberto ? `Recolher pedido ${p.num}` : `Expandir pedido ${p.num}`} aria-expanded={aberto} onClick={onToggle}>
            <ChevronRight className={cn('transition-transform', aberto && 'rotate-90')} />
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs">{p.num}</TableCell>
        <TableCell>
          <div className="leading-tight">
            <div>{p.cliente}</div>
            <div className="text-xs text-muted-foreground">{p.cidade}</div>
          </div>
        </TableCell>
        <TableCell className="text-muted-foreground">{p.data}</TableCell>
        <TableCell>
          <Badge variant="outline">
            <span className={cn('size-1.5 rounded-full', PONTO[p.status])} aria-hidden /> {p.status}
          </Badge>
        </TableCell>
        <TableCell className="pr-4 text-right tabular-nums">{brl(totalDe(p))}</TableCell>
      </TableRow>
      {aberto && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell colSpan={6} className="px-4 py-3 whitespace-normal">
            <div className="grid gap-4 sm:grid-cols-[1fr_14rem]">
              <ul className="divide-y rounded-lg border bg-background text-xs">
                {p.itens.map((i) => (
                  <li key={i.nome} className="flex items-center gap-3 px-3 py-2">
                    <span className="size-7 shrink-0 rounded-md bg-gradient-to-br from-muted to-muted-foreground/20" aria-hidden />
                    <span className="flex-1">{i.nome}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {i.qtd} × {brl(i.preco)}
                    </span>
                    <span className="w-20 text-right font-medium tabular-nums">{brl(i.qtd * i.preco)}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 text-xs">
                <div className="flex gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Entrega em <span className="text-foreground">{p.cidade}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Truck className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Rastreio <code className="rounded bg-muted px-1 font-mono text-foreground">{p.rastreio}</code>
                  </span>
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
