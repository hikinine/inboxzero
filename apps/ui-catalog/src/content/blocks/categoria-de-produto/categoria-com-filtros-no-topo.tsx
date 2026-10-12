'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Headphones, Heart, SearchX, Speaker, Star, X, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

const KINDS = ['Over-ear', 'In-ear', 'Caixa de som'] as const
const BRANDS = ['Aero', 'Nimbus', 'Onda'] as const
const COLORS = [
  { name: 'Preto', dot: 'bg-neutral-900' },
  { name: 'Branco', dot: 'bg-white border' },
  { name: 'Azul', dot: 'bg-sky-500' },
  { name: 'Verde', dot: 'bg-emerald-500' },
] as const
const PRICE_RANGES = [
  { id: 'todos', label: 'Qualquer preço', max: Infinity },
  { id: '300', label: 'Até R$ 300', max: 300 },
  { id: '600', label: 'Até R$ 600', max: 600 },
  { id: '1000', label: 'Até R$ 1.000', max: 1000 },
] as const
type Kind = (typeof KINDS)[number]
type Brand = (typeof BRANDS)[number]
type Color = (typeof COLORS)[number]['name']
type Sort = 'relevancia' | 'menor' | 'maior' | 'nota'

interface Product {
  id: string
  name: string
  kind: Kind
  brand: Brand
  color: Color
  price: number
  rating: number
  reviews: number
  freeShipping: boolean
  gradient: string
  Icon: LucideIcon
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Fone Nimbus ANC Pro', kind: 'Over-ear', brand: 'Nimbus', color: 'Preto', price: 899.9, rating: 4.8, reviews: 212, freeShipping: true, gradient: 'from-violet-400 to-violet-700', Icon: Headphones },
  { id: 'p2', name: 'Fone Aero Buds 2', kind: 'In-ear', brand: 'Aero', color: 'Branco', price: 399.9, rating: 4.7, reviews: 341, freeShipping: true, gradient: 'from-sky-300 to-sky-600', Icon: Headphones },
  { id: 'p3', name: 'Caixa Onda 360', kind: 'Caixa de som', brand: 'Onda', color: 'Azul', price: 329.9, rating: 4.4, reviews: 129, freeShipping: false, gradient: 'from-teal-400 to-cyan-700', Icon: Speaker },
  { id: 'p4', name: 'Fone Aero Studio', kind: 'Over-ear', brand: 'Aero', color: 'Verde', price: 1199, rating: 4.9, reviews: 98, freeShipping: true, gradient: 'from-emerald-400 to-emerald-700', Icon: Headphones },
  { id: 'p5', name: 'Fone Nimbus Lite', kind: 'In-ear', brand: 'Nimbus', color: 'Preto', price: 199.9, rating: 4.3, reviews: 540, freeShipping: false, gradient: 'from-neutral-500 to-neutral-800', Icon: Headphones },
  { id: 'p6', name: 'Caixa Onda Mini', kind: 'Caixa de som', brand: 'Onda', color: 'Verde', price: 179.9, rating: 4.2, reviews: 86, freeShipping: false, gradient: 'from-lime-400 to-emerald-600', Icon: Speaker },
  { id: 'p7', name: 'Fone Onda Sport', kind: 'In-ear', brand: 'Onda', color: 'Azul', price: 259.9, rating: 4.5, reviews: 203, freeShipping: true, gradient: 'from-indigo-400 to-blue-700', Icon: Headphones },
  { id: 'p8', name: 'Fone Nimbus Kids', kind: 'Over-ear', brand: 'Nimbus', color: 'Branco', price: 149.9, rating: 4.6, reviews: 64, freeShipping: false, gradient: 'from-rose-300 to-pink-600', Icon: Headphones },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function toggleIn<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

function FacetButton({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" className={cn(count > 0 && 'border-primary text-foreground')} />}>
        {label}
        {count > 0 ? <Badge className="ml-1 h-5 min-w-5 px-1">{count}</Badge> : <ChevronDown className="text-muted-foreground" />}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 gap-0.5 p-1.5">
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default function CategoriaComFiltrosNoTopo() {
  const [kinds, setKinds] = useState<Set<Kind>>(new Set())
  const [brands, setBrands] = useState<Set<Brand>>(new Set())
  const [colors, setColors] = useState<Set<Color>>(new Set())
  const [price, setPrice] = useState<(typeof PRICE_RANGES)[number]['id']>('todos')
  const [freeOnly, setFreeOnly] = useState(false)
  const [sort, setSort] = useState<Sort>('relevancia')
  const [favs, setFavs] = useState<Set<string>>(new Set())

  const maxPrice = PRICE_RANGES.find((r) => r.id === price)?.max ?? Infinity
  const results = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) => (kinds.size === 0 || kinds.has(p.kind)) && (brands.size === 0 || brands.has(p.brand)) && (colors.size === 0 || colors.has(p.color)) && p.price <= maxPrice && (!freeOnly || p.freeShipping),
    )
    if (sort === 'menor') list.sort((a, b) => a.price - b.price)
    if (sort === 'maior') list.sort((a, b) => b.price - a.price)
    if (sort === 'nota') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [kinds, brands, colors, maxPrice, freeOnly, sort])

  const chips: Array<{ key: string; label: string; onRemove: () => void }> = [
    ...[...kinds].map((k) => ({ key: `k-${k}`, label: k, onRemove: () => setKinds((s) => toggleIn(s, k)) })),
    ...[...brands].map((b) => ({ key: `b-${b}`, label: b, onRemove: () => setBrands((s) => toggleIn(s, b)) })),
    ...[...colors].map((c) => ({ key: `c-${c}`, label: c, onRemove: () => setColors((s) => toggleIn(s, c)) })),
    ...(price !== 'todos' ? [{ key: 'price', label: PRICE_RANGES.find((r) => r.id === price)?.label ?? '', onRemove: () => setPrice('todos') }] : []),
    ...(freeOnly ? [{ key: 'free', label: 'Frete grátis', onRemove: () => setFreeOnly(false) }] : []),
  ]
  const clearAll = () => {
    setKinds(new Set())
    setBrands(new Set())
    setColors(new Set())
    setPrice('todos')
    setFreeOnly(false)
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <a href="#" className="hover:text-foreground">Início</a>
          <ChevronRight className="size-3" />
          <a href="#" className="hover:text-foreground">Eletrônicos</a>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Fones e áudio</span>
        </nav>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Fones e áudio</h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{results.length}</span> de {PRODUCTS.length} produtos
          </p>
        </div>

        <div className="mt-6 rounded-xl border bg-card p-3">
          <div className="flex flex-wrap items-center gap-2">
            <FacetButton label="Tipo" count={kinds.size}>
              {KINDS.map((k) => (
                <Label key={k} htmlFor={`cft-k-${k}`} className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 font-normal hover:bg-muted">
                  <Checkbox id={`cft-k-${k}`} checked={kinds.has(k)} onCheckedChange={() => setKinds((s) => toggleIn(s, k))} />
                  <span className="flex-1">{k}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{PRODUCTS.filter((p) => p.kind === k).length}</span>
                </Label>
              ))}
            </FacetButton>
            <FacetButton label="Marca" count={brands.size}>
              {BRANDS.map((b) => (
                <Label key={b} htmlFor={`cft-b-${b}`} className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 font-normal hover:bg-muted">
                  <Checkbox id={`cft-b-${b}`} checked={brands.has(b)} onCheckedChange={() => setBrands((s) => toggleIn(s, b))} />
                  <span className="flex-1">{b}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{PRODUCTS.filter((p) => p.brand === b).length}</span>
                </Label>
              ))}
            </FacetButton>
            <FacetButton label="Cor" count={colors.size}>
              <div className="flex flex-wrap gap-2 p-1.5">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={`Cor ${c.name}`}
                    aria-pressed={colors.has(c.name)}
                    onClick={() => setColors((s) => toggleIn(s, c.name))}
                    className={cn('size-7 rounded-full ring-2 ring-offset-2 ring-offset-popover transition', c.dot, colors.has(c.name) ? 'ring-primary' : 'ring-transparent hover:ring-border')}
                  />
                ))}
              </div>
            </FacetButton>
            <FacetButton label="Preço" count={price === 'todos' ? 0 : 1}>
              <RadioGroup value={price} onValueChange={(v) => setPrice(v as typeof price)} className="gap-0.5">
                {PRICE_RANGES.map((r) => (
                  <Label key={r.id} htmlFor={`cft-p-${r.id}`} className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 font-normal hover:bg-muted">
                    <RadioGroupItem id={`cft-p-${r.id}`} value={r.id} /> {r.label}
                  </Label>
                ))}
              </RadioGroup>
            </FacetButton>

            <Label htmlFor="cft-free" className="ml-1 flex cursor-pointer items-center gap-2 text-sm font-normal">
              <Switch id="cft-free" size="sm" checked={freeOnly} onCheckedChange={setFreeOnly} /> Frete grátis
            </Label>

            <div className="ml-auto flex items-center gap-2">
              <Label htmlFor="cft-sort" className="text-xs text-muted-foreground">Ordenar</Label>
              <NativeSelect id="cft-sort" size="sm" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <NativeSelectOption value="relevancia">Relevância</NativeSelectOption>
                <NativeSelectOption value="menor">Menor preço</NativeSelectOption>
                <NativeSelectOption value="maior">Maior preço</NativeSelectOption>
                <NativeSelectOption value="nota">Melhor avaliação</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>
          {chips.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
              {chips.map((c) => (
                <button key={c.key} type="button" onClick={c.onRemove} className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs hover:bg-muted" aria-label={`Remover filtro ${c.label}`}>
                  {c.label} <X className="size-3 text-muted-foreground" />
                </button>
              ))}
              <Button variant="ghost" size="xs" onClick={clearAll}>Limpar tudo</Button>
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
            <SearchX className="size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">Nenhum produto com esses filtros</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>Limpar filtros</Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((p) => (
              <article key={p.id} className="group rounded-xl border bg-card p-3">
                <div className={cn('relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p.Icon className="size-14 text-white/90 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.25} />
                  </div>
                  {p.freeShipping && <Badge variant="secondary" className="absolute left-2.5 top-2.5">Frete grátis</Badge>}
                  <Button
                    variant="secondary"
                    size="icon-xs"
                    className="absolute right-2.5 top-2.5 rounded-full"
                    aria-label={favs.has(p.id) ? 'Remover dos favoritos' : 'Favoritar'}
                    aria-pressed={favs.has(p.id)}
                    onClick={() => setFavs((s) => toggleIn(s, p.id))}
                  >
                    <Heart className={cn(favs.has(p.id) && 'fill-rose-500 text-rose-500')} />
                  </Button>
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">
                  {p.brand} · {p.kind} · {p.color}
                </div>
                <h3 className="truncate text-sm font-medium">{p.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold tabular-nums">{brl(p.price)}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')} ({p.reviews})
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
