'use client'

import { useState } from 'react'
import { ArrowRight, CircleCheck, Repeat2, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CARDS = [
  { Icon: ShoppingBag, label: 'Pedidos hoje', value: '128', delta: '+12%', bars: [40, 55, 45, 70, 65, 90, 80] },
  { Icon: TrendingUp, label: 'Ticket médio', value: 'R$ 186', delta: '+4,8%', bars: [50, 48, 60, 58, 70, 72, 78] },
  { Icon: Users, label: 'Novos clientes', value: '41', delta: '+9%', bars: [30, 42, 38, 50, 61, 57, 74] },
  { Icon: Repeat2, label: 'Recompra', value: '32%', delta: '+2,1 pp', bars: [60, 62, 58, 66, 70, 69, 75] },
]

export default function HeroComCapturaDeEmail() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Vitrine Analytics</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Os números da sua loja, antes do café.</h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            Conecte Shopify, Nuvemshop ou Tray e receba todo dia às 8h o resumo do que vendeu, do que parou e do que vale empurrar.
          </p>

          <form
            className="mt-8 max-w-md"
            onSubmit={(e) => {
              e.preventDefault()
              if (email.trim()) setEnviado(true)
            }}
          >
            <Label htmlFor="hero-captura-email" className="sr-only">
              Seu e-mail de trabalho
            </Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="hero-captura-email"
                type="email"
                placeholder="voce@sualoja.com.br"
                className="h-10 flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="h-10 px-4">
                Quero o resumo <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {enviado ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CircleCheck className="size-3.5" /> Pronto! Seu primeiro resumo chega amanhã às 8h.
                </span>
              ) : (
                'Grátis por 14 dias. Sem cartão de crédito.'
              )}
            </p>
          </form>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <AvatarGroup>
              {['JP', 'LM', 'RA', 'TS'].map((n) => (
                <Avatar key={n} size="sm">
                  <AvatarFallback>{n}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+3k</AvatarGroupCount>
            </AvatarGroup>
            <span>
              <strong className="text-foreground">3.200 lojistas</strong> já recebem o resumo
            </span>
          </div>
        </div>

        <div className="rounded-3xl bg-muted/50 p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {CARDS.map((c) => (
              <div key={c.label} className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <c.Icon className="size-4" />
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{c.delta}</span>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">{c.label}</div>
                <div className="text-xl font-semibold tabular-nums">{c.value}</div>
                <div className="mt-3 flex h-8 items-end gap-1">
                  {c.bars.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${i === c.bars.length - 1 ? 'bg-primary' : 'bg-primary/25'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Resumo de terça, 8h02 · comparado com a semana anterior</p>
        </div>
      </div>
    </section>
  )
}
