'use client'

import { ArrowRight, Check, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const BULLETS = ['Sem cartão de crédito', 'Setup em 5 minutos', 'Cancele quando quiser']

export default function HeroSplitComMockup() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="outline">Plataforma de vendas</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">O painel que seu time comercial vai abrir todo dia.</h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">Pipeline, metas e conversas no mesmo lugar. Veja o que fecha, o que trava e o que a IA sugere fazer agora.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Criar conta <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost">
              Falar com vendas
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <Check className="size-4 text-emerald-500" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-muted/60" />
          <Card className="shadow-xl">
            <CardHeader>
              <CardDescription>Receita no mês</CardDescription>
              <CardTitle className="text-3xl tabular-nums">R$ 184.320</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="size-3" /> +18,4%
                </Badge>
                <span className="text-muted-foreground">vs. mês anterior</span>
              </div>
              <svg viewBox="0 0 400 120" className="h-28 w-full text-primary">
                <defs>
                  <linearGradient id="hsm-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="currentColor" stopOpacity="0.25" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 95 C 40 90, 60 70, 100 72 S 160 50, 200 55 S 260 30, 300 28 S 360 18, 400 10 V 120 H 0 Z" fill="url(#hsm-fill)" />
                <path d="M0 95 C 40 90, 60 70, 100 72 S 160 50, 200 55 S 260 30, 300 28 S 360 18, 400 10" fill="none" stroke="currentColor" strokeWidth="2.5" />
              </svg>
              <div className="grid grid-cols-3 gap-3 text-sm">
                {[
                  ['Leads', '1.284'],
                  ['Propostas', '312'],
                  ['Fechadas', '97'],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">{l}</div>
                    <div className="text-lg font-semibold tabular-nums">{v}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
