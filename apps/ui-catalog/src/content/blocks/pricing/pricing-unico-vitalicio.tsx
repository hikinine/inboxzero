'use client'

import { Check, Flame, Lock, RefreshCw, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const INCLUIDO = [
  'Todos os 120 componentes e 40 blocos',
  'Arquivo Figma + código React e Tailwind',
  'Modo claro e escuro em tudo',
  'Atualizações vitalícias',
  'Licença comercial para projetos ilimitados',
  'Acesso à comunidade no Discord',
  'Fontes dos ícones e das ilustrações',
  'Novos kits lançados a cada trimestre',
]

export default function PricingUnicoVitalicio() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Pague uma vez. Use para sempre.</h2>
          <p className="mt-3 text-muted-foreground">Sem mensalidade, sem renovação. Uma licença, todos os seus projetos.</p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-[1fr_1.1fr]">
          <div className="p-8 sm:p-10">
            <Badge variant="secondary" className="gap-1">
              <Flame className="text-orange-500" /> Preço de lançamento · 50% off
            </Badge>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">Studio Kit · Licença vitalícia</h3>
            <p className="mt-2 text-sm text-muted-foreground">O kit completo de interface para quem constrói produtos em React.</p>
            <div className="mt-8 flex items-end gap-3">
              <span className="text-lg text-muted-foreground line-through tabular-nums">R$ 997</span>
              <span className="text-5xl font-semibold tabular-nums">R$ 497</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">pagamento único · ou 12x de R$ 49,90</p>
            <Button size="lg" className="mt-6 w-full">
              Comprar acesso vitalício
            </Button>
            <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" /> Garantia incondicional de 30 dias
              </li>
              <li className="flex items-center gap-2">
                <Lock className="size-4" /> Pagamento seguro por Pix ou cartão
              </li>
            </ul>
          </div>

          <div className="border-t bg-muted/40 p-8 sm:p-10 lg:border-t-0 lg:border-l">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">O que está incluído</p>
            <ul className="mt-4 space-y-3 text-sm">
              {INCLUIDO.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {i}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3 rounded-xl border bg-background p-4 text-sm">
              <RefreshCw className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Atualizações para sempre.</span> Comprou uma vez, recebe todas as versões futuras — sem taxa de upgrade.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">Mais de 2.300 designers e devs já compraram · nota 4,9 em 410 avaliações</p>
      </div>
    </section>
  )
}
