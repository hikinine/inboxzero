'use client'

import { useMemo, useState } from 'react'
import { Backpack, ChevronRight, Coffee, Footprints, Headphones, Heart, SearchX, Star, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Tênis', 'Fones', 'Cafeteiras', 'Mochilas', 'Relógios'] as const
type Category = (typeof CATEGORIES)[number]
const BRANDS = ['Aero', 'Nimbus', 'Kaffa', 'Trilha'] as const
type Brand = (typeof BRANDS)[number]
const MAX = 1500

interface Product {
  id: string
  name: string
  category: Category
  brand: Brand
  price: number
  rating: number
  freeShipping: boolean
  gradient: string
  Icon: LucideIcon
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tênis Aero Run Max 2', category: 'Tênis', brand: 'Aero', price: 549.9, rating: 4.8, freeShipping: true, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints },
  { id: 'p2', name: 'Fone Nimbus ANC', category: 'Fones', brand: 'Nimbus', price: 399.9, rating: 4.7, freeShipping: true, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'p3', name: 'Cafeteira Kaffa Espresso', category: 'Cafeteiras', brand: 'Kaffa', price: 1290, rating: 4.9, freeShipping: true, gradient: 'from-amber-300 to-orange-600', Icon: Coffee },
  { id: 'p4', name: 'Mochila Trilha 30L', category: 'Mochilas', brand: 'Trilha', price: 249.9, rating: 4.5, freeShipping: false, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'p5', name: 'Relógio Aero Pulse', category: 'Relógios', brand: 'Aero', price: 649.9, rating: 4.6, freeShipping: true, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
  { id: 'p6', name: 'Tênis Trilha Trail X', category: 'Tênis', brand: 'Trilha', price: 429.9, rating: 4.4, freeShipping: false, gradient: 'from-rose-400 to-rose-700', Icon: Footprints },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function toggleIn<T>(set: Set<T>, value: T, on: boolean): Set<T> {
  const next = new Set(set)
  if (on) next.add(value)
  else next.delete(value)
  return next
}

export default function CategoriaComFiltrosLaterais() {
  const [cats, setCats] = useState<Set<Category>>(new Set())
  const [brands, setBrands] = useState<Set<Brand>>(new Set())
  const [range, setRange] = useState<[number, number]>([0, MAX])
  const [freeOnly, setFreeOnly] = useState(false)
  const [favs, setFavs] = useState<Set<string>>(new Set())

  const results = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cats.size === 0 || cats.has(p.category)) &&
          (brands.size === 0 || brands.has(p.brand)) &&
          p.price >= range[0] &&
          p.price <= range[1] &&
          (!freeOnly || p.freeShipping),
      ),
    [cats, brands, range, freeOnly],
  )

  const priceActive = range[0] > 0 || range[1] < MAX
  const activeCount = cats.size + brands.size + (freeOnly ? 1 : 0) + (priceActive ? 1 : 0)
  const clear = () => {
    setCats(new Set())
    setBrands(new Set())
    setRange([0, MAX])
    setFreeOnly(false)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <a href="#" className="hover:text-foreground">Início</a>
          <ChevronRight className="size-3.5" />
          <a href="#" className="hover:text-foreground">Loja</a>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">Todos os produtos</span>
        </nav>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight">Todos os produtos</h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{results.length}</span> de {PRODUCTS.length} produtos
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                Filtros {activeCount > 0 && <Badge variant="secondary">{activeCount}</Badge>}
              </h3>
              <Button variant="ghost" size="xs" onClick={clear} disabled={activeCount === 0}>Limpar</Button>
            </div>
            <Separator />

            <fieldset>
              <legend className="text-sm font-medium">Categoria</legend>
              <div className="mt-3 space-y-2.5">
                {CATEGORIES.map((c) => {
                  const id = `cat-${c}`
                  const count = PRODUCTS.filter((p) => p.category === c).length
                  return (
                    <div key={c} className="flex items-center gap-2">
                      <Checkbox id={id} checked={cats.has(c)} onCheckedChange={(on) => setCats((s) => toggleIn(s, c, on))} />
                      <Label htmlFor={id} className="flex-1 font-normal">{c}</Label>
                      <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
                    </div>
                  )
                })}
              </div>
            </fieldset>
            <Separator />

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Preço</span>
                <span className="text-xs text-muted-foreground tabular-nums">{brl(range[0])} – {brl(range[1])}</span>
              </div>
              <Slider
                className="mt-4"
                min={0}
                max={MAX}
                step={50}
                value={range}
                aria-label="Faixa de preço"
                onValueChange={(v) => {
                  if (typeof v !== 'number') setRange([v[0] ?? 0, v[1] ?? MAX])
                }}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>R$ 0</span>
                <span>R$ 1.500</span>
              </div>
            </div>
            <Separator />

            <fieldset>
              <legend className="text-sm font-medium">Marca</legend>
              <div className="mt-3 space-y-2.5">
                {BRANDS.map((b) => {
                  const id = `marca-${b}`
                  return (
                    <div key={b} className="flex items-center gap-2">
                      <Checkbox id={id} checked={brands.has(b)} onCheckedChange={(on) => setBrands((s) => toggleIn(s, b, on))} />
                      <Label htmlFor={id} className="font-normal">{b}</Label>
                    </div>
                  )
                })}
              </div>
            </fieldset>
            <Separator />

            <div className="flex items-center gap-2">
              <Checkbox id="frete" checked={freeOnly} onCheckedChange={(on) => setFreeOnly(on)} />
              <Label htmlFor="frete" className="font-normal">Somente frete grátis</Label>
            </div>
          </aside>

          <div>
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
                <SearchX className="size-8 text-muted-foreground" />
                <p className="mt-3 font-medium">Nenhum produto com esses filtros</p>
                <p className="mt-1 text-sm text-muted-foreground">Tente ampliar a faixa de preço ou remover categorias.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clear}>Limpar filtros</Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <article key={p.id} className="rounded-xl border bg-card p-3">
                    <div className={cn('relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p.Icon className="size-16 text-white/90" strokeWidth={1.25} />
                      </div>
                      {p.freeShipping && <Badge variant="secondary" className="absolute left-3 top-3">Frete grátis</Badge>}
                      <Button
                        variant="secondary"
                        size="icon-sm"
                        className="absolute right-3 top-3 rounded-full"
                        aria-label={`Favoritar ${p.name}`}
                        aria-pressed={favs.has(p.id)}
                        onClick={() => setFavs((s) => toggleIn(s, p.id, !s.has(p.id)))}
                      >
                        <Heart className={cn(favs.has(p.id) && 'fill-rose-500 text-rose-500')} />
                      </Button>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">{p.brand} · {p.category}</div>
                    <h3 className="mt-0.5 font-medium leading-tight">{p.name}</h3>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3.5 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-semibold tabular-nums">{brl(p.price)}</span>
                      <Button size="sm" variant="outline">Adicionar</Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
