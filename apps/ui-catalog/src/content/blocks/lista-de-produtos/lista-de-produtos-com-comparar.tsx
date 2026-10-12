'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeftRight, Check, Star, Watch, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  old?: number
  rating: number
  reviews: number
  gradient: string
  tag?: string
  screen: string
  battery: number
  weight: number
  water: string
  gps: boolean
}

const PRODUCTS: Product[] = [
  { id: 'pulse', name: 'Relógio Pulse Fit', price: 649.9, old: 799.9, rating: 4.7, reviews: 341, gradient: 'from-sky-400 to-sky-700', tag: 'Mais vendido', screen: '1,4" AMOLED', battery: 7, weight: 32, water: '5 ATM', gps: true },
  { id: 'active', name: 'Relógio Aero Active 2', price: 899.9, rating: 4.8, reviews: 188, gradient: 'from-neutral-600 to-neutral-900', tag: 'Novo', screen: '1,5" AMOLED', battery: 10, weight: 38, water: '10 ATM', gps: true },
  { id: 'sport', name: 'Relógio Nimbus Sport', price: 459.9, old: 549.9, rating: 4.5, reviews: 276, gradient: 'from-violet-400 to-violet-700', screen: '1,3" LCD', battery: 12, weight: 29, water: '5 ATM', gps: false },
  { id: 'lite', name: 'Relógio Onda Lite', price: 299.9, rating: 4.3, reviews: 512, gradient: 'from-teal-400 to-cyan-700', screen: '1,2" LCD', battery: 14, weight: 26, water: '3 ATM', gps: false },
  { id: 'trail', name: 'Relógio Trilha GPS', price: 1290, rating: 4.9, reviews: 97, gradient: 'from-emerald-400 to-emerald-700', tag: 'Premium', screen: '1,4" MIP solar', battery: 21, weight: 45, water: '10 ATM', gps: true },
  { id: 'kids', name: 'Relógio Aero Kids', price: 199.9, old: 249.9, rating: 4.4, reviews: 143, gradient: 'from-rose-300 to-pink-600', screen: '1,1" LCD', battery: 5, weight: 24, water: '3 ATM', gps: true },
]
const MAX = 3

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Nota ${value.toLocaleString('pt-BR')} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn('size-3', i < Math.round(value) ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted-foreground/40')} />
      ))}
    </span>
  )
}

export default function ListaDeProdutosComComparar() {
  const [selected, setSelected] = useState<string[]>(['pulse', 'active'])
  const [showTable, setShowTable] = useState(false)

  const items = selected.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p))
  const full = selected.length >= MAX

  const toggle = (id: string) => {
    setSelected((list) => {
      if (list.includes(id)) return list.filter((x) => x !== id)
      if (list.length >= MAX) return list
      return [...list, id]
    })
  }
  const remove = (id: string) => setSelected((list) => list.filter((x) => x !== id))
  const clear = () => {
    setSelected([])
    setShowTable(false)
  }

  const best = {
    price: Math.min(...items.map((i) => i.price)),
    battery: Math.max(...items.map((i) => i.battery)),
    weight: Math.min(...items.map((i) => i.weight)),
    rating: Math.max(...items.map((i) => i.rating)),
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Smartwatches</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Compare antes de escolher</h2>
            <p className="mt-3 text-muted-foreground">Marque até {MAX} relógios e veja tela, bateria, peso e resistência lado a lado.</p>
          </div>
          <p className="text-sm text-muted-foreground">{PRODUCTS.length} produtos</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => {
            const on = selected.includes(p.id)
            const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0
            return (
              <article key={p.id} className={cn('rounded-xl border bg-card p-3 transition-shadow', on && 'border-primary ring-1 ring-primary/30')}>
                <div className={cn('relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Watch className="size-16 text-white/90" strokeWidth={1.1} />
                  </div>
                  <div className="absolute left-3 top-3 flex gap-1.5">
                    {p.tag && <Badge variant="secondary">{p.tag}</Badge>}
                    {off > 0 && <Badge variant="secondary">-{off}%</Badge>}
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium">{p.name}</h3>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Stars value={p.rating} /> {p.rating.toLocaleString('pt-BR')} ({p.reviews})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold tabular-nums">{brl(p.price)}</div>
                    {p.old && <div className="text-xs text-muted-foreground line-through tabular-nums">{brl(p.old)}</div>}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
                  <Label htmlFor={`cmp-${p.id}`} className={cn('flex cursor-pointer items-center gap-2 text-xs font-normal', !on && full && 'cursor-not-allowed opacity-50')}>
                    <Checkbox id={`cmp-${p.id}`} checked={on} disabled={!on && full} onCheckedChange={() => toggle(p.id)} /> Comparar
                  </Label>
                  <Button size="sm" variant="outline">Comprar</Button>
                </div>
              </article>
            )
          })}
        </div>

        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="sticky bottom-4 z-10 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border bg-background/95 p-3 shadow-xl backdrop-blur"
            >
              <div className="flex items-center gap-2">
                {items.map((i) => (
                  <div key={i.id} className={cn('relative flex size-11 items-center justify-center rounded-lg bg-gradient-to-br', i.gradient)}>
                    <Watch className="size-5 text-white/90" />
                    <button type="button" onClick={() => remove(i.id)} aria-label={`Remover ${i.name} da comparação`} className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full border bg-background text-muted-foreground hover:text-foreground">
                      <X className="size-2.5" />
                    </button>
                  </div>
                ))}
                {Array.from({ length: MAX - items.length }, (_, i) => (
                  <div key={i} className="size-11 rounded-lg border border-dashed" aria-hidden="true" />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-medium tabular-nums">{selected.length} de {MAX}</span> <span className="text-muted-foreground">selecionados</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clear}>Limpar</Button>
                <Button size="sm" disabled={selected.length < 2} onClick={() => setShowTable((s) => !s)}>
                  <ArrowLeftRight data-icon="inline-start" /> {showTable ? 'Ocultar comparação' : `Comparar (${selected.length})`}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTable && items.length >= 2 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="mt-6 rounded-xl border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Especificação</TableHead>
                      {items.map((i) => (
                        <TableHead key={i.id}>
                          <div className="flex items-center gap-2 py-2">
                            <div className={cn('flex size-9 items-center justify-center rounded-lg bg-gradient-to-br', i.gradient)}>
                              <Watch className="size-4 text-white/90" />
                            </div>
                            <span className="font-medium">{i.name}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground">Preço</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id} className={cn('tabular-nums', i.price === best.price && 'font-semibold text-emerald-600')}>{brl(i.price)}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">Tela</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id}>{i.screen}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">Bateria</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id} className={cn('tabular-nums', i.battery === best.battery && 'font-semibold text-emerald-600')}>até {i.battery} dias</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">Peso</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id} className={cn('tabular-nums', i.weight === best.weight && 'font-semibold text-emerald-600')}>{i.weight} g</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">Resistência à água</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id}>{i.water}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">GPS integrado</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id}>{i.gps ? <Check className="size-4 text-emerald-600" aria-label="Sim" /> : <X className="size-4 text-muted-foreground" aria-label="Não" />}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-muted-foreground">Avaliação</TableCell>
                      {items.map((i) => (
                        <TableCell key={i.id} className={cn(i.rating === best.rating && 'font-semibold')}>
                          <span className="flex items-center gap-1.5">
                            <Stars value={i.rating} /> {i.rating.toLocaleString('pt-BR')}
                          </span>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell />
                      {items.map((i) => (
                        <TableCell key={i.id}>
                          <Button size="sm">Comprar</Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
