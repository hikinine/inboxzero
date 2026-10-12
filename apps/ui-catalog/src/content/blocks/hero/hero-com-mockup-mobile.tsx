'use client'

import { ArrowLeftRight, ArrowRight, Battery, Bell, Check, CreditCard, House, QrCode, Send, Settings, Signal, Smartphone, Wifi } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const MOVIMENTACOES = [
  { nome: 'Pix recebido', detalhe: 'Clínica Vida', valor: '+ R$ 1.250,00', positivo: true },
  { nome: 'iFood', detalhe: 'Alimentação', valor: '- R$ 47,90', positivo: false },
  { nome: 'Uber', detalhe: 'Transporte', valor: '- R$ 23,50', positivo: false },
  { nome: 'Salário', detalhe: 'Lumi Tecnologia', valor: '+ R$ 6.800,00', positivo: true },
]

const BULLETS = ['Pix ilimitado e grátis', 'Boletos por R$ 0', 'Cartão sem anuidade']

export default function HeroComMockupMobile() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="secondary">Conta PJ sem tarifa</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Sua empresa, na palma da mão.</h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">
            A Fluxo é a conta digital feita para MEI e pequenas empresas: Pix, boletos, cartão e extrato inteligente no mesmo app.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              Abrir conta grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline">
              <Smartphone data-icon="inline-start" /> Baixar o app
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

        <div className="relative mx-auto w-[280px]">
          <div className="absolute top-20 -left-6 z-10 hidden items-center gap-2 rounded-xl border bg-card p-3 shadow-lg sm:flex lg:-left-16">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <QrCode className="size-4" />
            </span>
            <div className="text-xs">
              <div className="font-medium">Pix recebido</div>
              <div className="text-muted-foreground">agora · R$ 1.250,00</div>
            </div>
          </div>

          <div className="relative rounded-[2.75rem] border-[6px] border-foreground/85 bg-background shadow-2xl dark:border-muted-foreground/40">
            <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground/85 dark:bg-muted-foreground/40" />
            <div className="overflow-hidden rounded-[2.3rem]">
              <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-medium">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <Signal className="size-3" /> <Wifi className="size-3" /> <Battery className="size-3" />
                </span>
              </div>
              <div className="flex items-center justify-between px-5 pt-3">
                <div>
                  <div className="text-xs text-muted-foreground">Bom dia,</div>
                  <div className="text-base font-semibold">Marina Castro</div>
                </div>
                <span className="flex size-8 items-center justify-center rounded-full bg-muted">
                  <Bell className="size-4" />
                </span>
              </div>
              <div className="mx-5 mt-4 rounded-2xl bg-primary p-4 text-primary-foreground">
                <div className="text-xs opacity-80">Saldo disponível</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">R$ 8.432,10</div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                  {[
                    { Icon: QrCode, label: 'Pix' },
                    { Icon: Send, label: 'Pagar' },
                    { Icon: ArrowLeftRight, label: 'Transferir' },
                  ].map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-1 rounded-lg bg-primary-foreground/10 py-2">
                      <a.Icon className="size-4" /> {a.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 pt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Últimas movimentações</span>
                  <span className="text-muted-foreground">Ver todas</span>
                </div>
                <ul className="mt-2 divide-y">
                  {MOVIMENTACOES.map((m) => (
                    <li key={m.nome + m.detalhe} className="flex items-center gap-3 py-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{m.nome[0]}</span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-medium">{m.nome}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{m.detalhe}</div>
                      </div>
                      <span className={`text-xs font-medium tabular-nums ${m.positivo ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{m.valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 flex items-center justify-around border-t px-4 py-3 text-muted-foreground">
                <House className="size-5 text-foreground" />
                <ArrowLeftRight className="size-5" />
                <CreditCard className="size-5" />
                <Settings className="size-5" />
              </div>
              <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-foreground/80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
