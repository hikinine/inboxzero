'use client'

import { useMemo, useState } from 'react'
import { Backpack, Coffee, Footprints, Headphones, LayoutGrid, List, SlidersHorizontal, Star, Watch, Camera, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

type SortKey = 'relevancia' | 'menor' | 'maior' | 'vendidos' | 'novos' | 'avaliacao'
const SORTS: Array<{ value: SortKey; label: string }> = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor', label: 'Menor preço' },
  { value: 'maior', label: 'Maior preço' },
  { value: 'vendidos', label: 'Mais vendidos' },
  { value: 'novos', label: 'Novidades' },
  { value: 'avaliacao', label: 'Melhor avaliação' },
]

interface Product {
  id: string
  name: string
  price: number
  old?: number
  rating: number
  sales: number
  isNew: boolean
  freeShipping: boolean
  gradient: string
  Icon: LucideIcon
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tênis Aero Run Max 2', price: 549.9, old: 699.9, rating: 4.8, sales: 1240, isNew: false, freeShipping: true, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints },
  { id: 'p2', name: 'Fone Nimbus ANC Pro', price: 399.9, old: 499.9, rating: 4.7, sales: 980, isNew: false, freeShipping: true, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'p3', name: 'Cafeteira Kaffa Espresso', price: 1290, rating: 4.9, sales: 310, isNew: true, freeShipping: true, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'p4', name: 'Mochila Urban 25L', price: 289.9, old: 349.9, rating: 4.6, sales: 2100, isNew: false, freeShipping: false, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'p5', name: 'Relógio Pulse Fit', price: 649.9, rating: 4.7, sales: 760, isNew: true, freeShipping: true, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
  { id: 'p6', name: 'Câmera Instantânea Lumi', price: 479, old: 549, rating: 4.4, sales: 150, isNew: true, freeShipping: false, gradient: 'from-pink-400 to-rose-600', Icon: Camera },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function BarraDeFiltrosComOrdenacao() {
  const [sort, setSort] = useState<SortKey>('relevancia')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [free, setFree] = useState(false)
  const [sale, setSale] = useState(false)

  const list = useMemo(() => {
    const items = PRODUCTS.filter((p) => (!free || p.freeShipping) && (!sale || p.old !== undefined))
    switch (sort) {
      case 'menor': return items.sort((a, b) => a.price - b.price)
      case 'maior': return items.sort((a, b) => b.price - a.price)
      case 'vendidos': return items.sort((a, b) => b.sales - a.sales)
      case 'novos': return items.sort((a, b) => Number(b.isNew) - Number(a.isNew))
      case 'avaliacao': return items.sort((a, b) => b.rating - a.rating)
      default: return items
    }
  }, [sort, free, sale])

  const activeFilters = Number(free) + Number(sale)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal data-icon="inline-start" /> Filtros
            {activeFilters > 0 && <Badge variant="secondary" className="ml-1">{activeFilters}</Badge>}
          </Button>
          <Toggle variant="outline" size="sm" pressed={free} onPressedChange={setFree} aria-label="Somente frete grátis">
            Frete grátis
          </Toggle>
          <Toggle variant="outline" size="sm" pressed={sale} onPressedChange={setSale} aria-label="Somente em promoção">
            Em promoção
          </Toggle>
          <span className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium text-foreground">{list.length}</span> de {PRODUCTS.length} produtos
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Label htmlFor="ordenacao" className="sr-only">Ordenar por</Label>
            <NativeSelect id="ordenacao" size="sm" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              {SORTS.map((s) => (
                <NativeSelectOption key={s.value} value={s.value}>{s.label}</NativeSelectOption>
              ))}
            </NativeSelect>
            <ToggleGroup
              variant="outline"
              size="sm"
              spacing={0}
              aria-label="Modo de visualização"
              value={[view]}
              onValueChange={(v) => {
                const next = v[0]
                if (next === 'grid' || next === 'list') setView(next)
              }}
            >
              <ToggleGroupItem value="grid" aria-label="Ver em grade" className="aria-pressed:bg-muted">
                <LayoutGrid />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Ver em lista" className="aria-pressed:bg-muted">
                <List />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">Nenhum produto atende aos filtros selecionados.</p>
        ) : (
          <div className={cn('mt-6 grid gap-4', view === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1')}>
            {list.map((p) => (
              <article key={p.id} className={cn('rounded-xl border bg-card p-3', view === 'list' && 'flex items-center gap-4')}>
                <div className={cn('relative flex items-center justify-center rounded-lg bg-gradient-to-br', p.gradient, view === 'grid' ? 'aspect-square' : 'size-20 shrink-0')}>
                  <p.Icon className={cn('text-white/90', view === 'grid' ? 'size-14' : 'size-8')} strokeWidth={1.25} />
                  {p.isNew && view === 'grid' && <Badge variant="secondary" className="absolute left-2.5 top-2.5">Novo</Badge>}
                </div>
                <div className={cn('min-w-0 flex-1', view === 'grid' && 'mt-3')}>
                  <h3 className="truncate text-sm font-medium">{p.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')} · {p.sales.toLocaleString('pt-BR')} vendidos
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-semibold tabular-nums">{brl(p.price)}</span>
                    {p.old && <span className="text-xs text-muted-foreground line-through tabular-nums">{brl(p.old)}</span>}
                  </div>
                </div>
                {view === 'list' && (
                  <Button size="sm" variant="outline">Ver produto</Button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
