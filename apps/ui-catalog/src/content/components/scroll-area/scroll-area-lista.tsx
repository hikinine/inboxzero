'use client'

import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const VERSOES = Array.from({ length: 24 }, (_, i) => {
  const data = new Date(2026, 9, 12)
  data.setDate(data.getDate() - i * 9)
  return {
    v: `v2.${24 - i}.0`,
    data: data.toLocaleDateString('pt-BR'),
    tipo: i % 6 === 0 ? 'Maior' : i % 3 === 0 ? 'Correção' : 'Recurso',
  }
})

const CAMPANHAS = [
  { nome: 'Black Friday 2026', meta: '12 mil envios', grad: 'from-rose-500/70 to-orange-400/70' },
  { nome: 'Reativação Q4', meta: '3,4 mil envios', grad: 'from-sky-500/70 to-indigo-500/70' },
  { nome: 'Lançamento Pulse', meta: '8,1 mil envios', grad: 'from-emerald-500/70 to-teal-400/70' },
  { nome: 'Webinar CRM', meta: '1,9 mil envios', grad: 'from-violet-500/70 to-fuchsia-400/70' },
  { nome: 'NPS trimestral', meta: '5,6 mil envios', grad: 'from-amber-500/70 to-yellow-400/70' },
  { nome: 'Carrinho abandonado', meta: '2,2 mil envios', grad: 'from-slate-500/70 to-zinc-400/70' },
]

const TAGS = ['cliente-vip', 'lead-quente', 'trial', 'churn-risco', 'enterprise', 'indicação', 'evento-sp', 'newsletter', 'reativar', 'parceiro', 'suporte-aberto', 'upsell', 'onboarding', 'nps-promotor', 'inadimplente', 'beta', 'webinar', 'ecommerce', 'agência', 'educação', 'saúde', 'fintech']

export default function ScrollAreaLista() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="grid gap-6 sm:grid-cols-[13rem_1fr]">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Lista vertical</p>
          <ScrollArea className="h-64 w-full rounded-lg border">
            <div className="p-3">
              <p className="mb-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">Versões</p>
              {VERSOES.map((v, i) => (
                <div key={v.v}>
                  <div className="flex items-center justify-between py-1.5 text-sm">
                    <span className="font-mono text-xs">{v.v}</span>
                    <span className="text-xs text-muted-foreground">{v.data}</span>
                  </div>
                  {i < VERSOES.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Tags (caixa baixa)</p>
          <ScrollArea className="h-64 w-full rounded-lg border">
            <div className="flex flex-wrap gap-1.5 p-3">
              {TAGS.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Horizontal com cards</p>
        <ScrollArea className="w-full rounded-lg border whitespace-nowrap">
          <div className="flex w-max gap-3 p-3">
            {CAMPANHAS.map((c) => (
              <figure key={c.nome} className="w-40 shrink-0 space-y-2">
                <div className={`h-24 w-full rounded-md bg-gradient-to-br ${c.grad}`} />
                <figcaption className="text-xs">
                  <div className="truncate font-medium">{c.nome}</div>
                  <div className="text-muted-foreground">{c.meta}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
