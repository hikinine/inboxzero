'use client'

import { Fragment, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronRight, TrendingDown } from 'lucide-react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type Periodo = '7d' | '30d'

const ETAPAS = ['Visitas', 'Produto visto', 'Carrinho', 'Checkout', 'Compra'] as const

const DADOS: Record<Periodo, number[]> = {
  '7d': [18420, 9310, 2480, 1620, 1094],
  '30d': [76800, 41250, 12960, 6120, 4380],
}

const fmt = (n: number) => n.toLocaleString('pt-BR')

export default function FunilDeConversaoHorizontal() {
  const [periodo, setPeriodo] = useState<Periodo>('30d')
  const valores = DADOS[periodo]
  const topo = valores[0]
  const taxas = valores.slice(1).map((v, i) => v / valores[i])
  const pior = taxas.reduce((idx, t, i) => (t < taxas[idx] ? i : idx), 0)
  const perdidos = valores[pior] - valores[pior + 1]

  return (
    <section className="w-full px-6 py-12">
      <Card className="mx-auto max-w-6xl">
        <CardHeader>
          <CardTitle>Funil de conversão da loja</CardTitle>
          <CardDescription>
            {((valores[valores.length - 1] / topo) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}% das visitas viram compra
          </CardDescription>
          <CardAction>
            <ToggleGroup value={[periodo]} onValueChange={(v) => v[0] && setPeriodo(v[0] as Periodo)} variant="outline" size="sm">
              <ToggleGroupItem value="7d">7 dias</ToggleGroupItem>
              <ToggleGroupItem value="30d">30 dias</ToggleGroupItem>
            </ToggleGroup>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-[720px] items-stretch">
              {valores.map((v, i) => {
                const pct = v / topo
                const naQueda = i === pior || i === pior + 1
                return (
                  <Fragment key={ETAPAS[i]}>
                    <div className="flex flex-1 flex-col">
                      <p className="text-xs text-muted-foreground">
                        <span className="mr-1 font-mono">{String(i + 1).padStart(2, '0')}</span>
                        {ETAPAS[i]}
                      </p>
                      <motion.p key={`${periodo}-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xl font-semibold tracking-tight tabular-nums">
                        {fmt(v)}
                      </motion.p>
                      <p className="text-xs text-muted-foreground tabular-nums">{(pct * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% do topo</p>
                      <div className="mt-4 flex h-44 items-center rounded-lg bg-muted/50 px-2">
                        <motion.div
                          className={cn('w-full rounded-md', naQueda ? 'bg-primary' : 'bg-primary/70')}
                          style={{ opacity: 1 - i * 0.12 }}
                          initial={false}
                          animate={{ height: `${Math.max(pct * 100, 4)}%` }}
                          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        />
                      </div>
                    </div>
                    {i < valores.length - 1 && (
                      <div className="flex w-20 shrink-0 flex-col items-center justify-end pb-[72px]">
                        <span
                          className={cn(
                            'rounded-full border px-2 py-0.5 text-xs font-medium tabular-nums',
                            i === pior ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-background text-muted-foreground',
                          )}
                        >
                          {(taxas[i] * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                        </span>
                        <ChevronRight className={cn('mt-1 size-4', i === pior ? 'text-rose-500' : 'text-muted-foreground/50')} />
                        {i === pior && <span className="mt-0.5 text-[10px] font-medium text-rose-600 uppercase dark:text-rose-400">maior queda</span>}
                      </div>
                    )}
                  </Fragment>
                )
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t">
          <div className="flex items-start gap-3 text-sm">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <TrendingDown className="size-4" />
            </span>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">
                {ETAPAS[pior]} → {ETAPAS[pior + 1]}
              </span>{' '}
              perde {fmt(perdidos)} pessoas ({((1 - taxas[pior]) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%). Teste frete visível na página do produto e botão de compra fixo no mobile.
            </p>
          </div>
        </CardFooter>
      </Card>
    </section>
  )
}
