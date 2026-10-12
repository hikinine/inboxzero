'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Package, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const ITENS = [
  { nome: 'Tênis de corrida Vento 2', detalhe: 'Tam. 41 · Preto', qtd: 1, preco: 499.9, cor: 'from-slate-400/50 to-slate-600/50' },
  { nome: 'Meia esportiva (3 pares)', detalhe: 'Tam. 39-43', qtd: 2, preco: 59.9, cor: 'from-sky-400/50 to-indigo-600/50' },
  { nome: 'Garrafa térmica 750 ml', detalhe: 'Verde', qtd: 1, preco: 129, cor: 'from-emerald-400/50 to-teal-600/50' },
]
const ETAPAS = ['Confirmado', 'Separação', 'Enviado', 'Entregue']
const ETAPA_ATUAL = 2
const FRETE = 24.9
const RASTREIO = 'BR482130077BR'

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CardPedido() {
  const [copiado, setCopiado] = useState(false)
  const subtotal = ITENS.reduce((s, i) => s + i.preco * i.qtd, 0)

  useEffect(() => {
    if (!copiado) return
    const t = setTimeout(() => setCopiado(false), 1500)
    return () => clearTimeout(t)
  }, [copiado])

  function copiar() {
    navigator.clipboard?.writeText(RASTREIO).catch(() => {})
    setCopiado(true)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Pedido #48213</CardTitle>
        <CardDescription>Feito em 10 out 2026 · Pagamento via Pix</CardDescription>
        <CardAction>
          <Badge className="bg-sky-500/15 text-sky-700 dark:text-sky-400">
            <Truck data-icon="inline-start" /> Em transporte
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <ol className="flex items-center gap-1" aria-label="Etapas da entrega">
          {ETAPAS.map((e, i) => (
            <li key={e} className="flex flex-1 flex-col gap-1.5">
              <div className={`h-1 rounded-full ${i <= ETAPA_ATUAL ? 'bg-primary' : 'bg-muted'}`} />
              <span className={`text-[11px] ${i <= ETAPA_ATUAL ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{e}</span>
            </li>
          ))}
        </ol>

        <ul className="space-y-3">
          {ITENS.map((i) => (
            <li key={i.nome} className="flex items-center gap-3">
              <div className={`size-12 shrink-0 rounded-lg bg-gradient-to-br ${i.cor}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{i.nome}</div>
                <div className="text-xs text-muted-foreground">
                  {i.detalhe} · {i.qtd}×
                </div>
              </div>
              <div className="text-sm font-medium tabular-nums">{brl(i.preco * i.qtd)}</div>
            </li>
          ))}
        </ul>

        <Separator />

        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums">{brl(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Frete (Sedex)</dt>
            <dd className="tabular-nums">{brl(FRETE)}</dd>
          </div>
          <div className="flex justify-between font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{brl(subtotal + FRETE)}</dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3">
        <div className="flex items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-muted-foreground" />
            <span className="font-mono text-xs">{RASTREIO}</span>
          </div>
          <Button variant="ghost" size="xs" onClick={copiar}>
            {copiado ? (
              <>
                <Check data-icon="inline-start" /> Copiado
              </>
            ) : (
              <>
                <Copy data-icon="inline-start" /> Copiar
              </>
            )}
          </Button>
        </div>
        <Button className="w-full">
          <Truck data-icon="inline-start" /> Rastrear pedido
        </Button>
      </CardFooter>
    </Card>
  )
}
