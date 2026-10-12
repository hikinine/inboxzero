'use client'

import { useMemo, useState } from 'react'
import { Backpack, ChevronDown, Footprints, Layers, Palette, PanelLeftClose, PanelLeftOpen, Ruler, SearchX, Shirt, Star, Tag, Wallet, Watch, X, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Tênis', 'Camisetas', 'Mochilas', 'Relógios'] as const
const SIZES = ['P', 'M', 'G', 'GG'] as const
const COLORS = [
  { name: 'Preto', dot: 'bg-neutral-900' },
  { name: 'Branco', dot: 'bg-white border' },
  { name: 'Azul', dot: 'bg-sky-500' },
  { name: 'Verde', dot: 'bg-emerald-500' },
  { name: 'Vermelho', dot: 'bg-rose-500' },
] as const
const BRANDS = ['Aero', 'Trilha', 'Nimbus'] as const
const MAX = 800
type Category = (typeof CATEGORIES)[number]
type Size = (typeof SIZES)[number]
type Color = (typeof COLORS)[number]['name']
type Brand = (typeof BRANDS)[number]
type GroupId = 'categoria' | 'tamanho' | 'cor' | 'preco' | 'marca'

interface Product {
  id: string
  name: string
  category: Category
  sizes: Size[]
  color: Color
  brand: Brand
  price: number
  rating: number
  gradient: string
  Icon: LucideIcon
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Tênis Aero Run Max 2', category: 'Tênis', sizes: ['M', 'G'], color: 'Preto', brand: 'Aero', price: 549.9, rating: 4.8, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints },
  { id: 'p2', name: 'Camiseta Dry Aero', category: 'Camisetas', sizes: ['P', 'M', 'G', 'GG'], color: 'Branco', brand: 'Aero', price: 89.9, rating: 4.3, gradient: 'from-stone-300 to-stone-500', Icon: Shirt },
  { id: 'p3', name: 'Mochila Trilha 30L', category: 'Mochilas', sizes: ['M'], color: 'Verde', brand: 'Trilha', price: 249.9, rating: 4.5, gradient: 'from-emerald-400 to-emerald-700', Icon: Backpack },
  { id: 'p4', name: 'Relógio Nimbus Sport', category: 'Relógios', sizes: ['P', 'M'], color: 'Azul', brand: 'Nimbus', price: 459.9, rating: 4.5, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
  { id: 'p5', name: 'Tênis Trilha Trail X', category: 'Tênis', sizes: ['G', 'GG'], color: 'Vermelho', brand: 'Trilha', price: 429.9, rating: 4.4, gradient: 'from-rose-400 to-rose-700', Icon: Footprints },
  { id: 'p6', name: 'Camiseta Trilha Térmica', category: 'Camisetas', sizes: ['M', 'G'], color: 'Preto', brand: 'Trilha', price: 129.9, rating: 4.6, gradient: 'from-zinc-600 to-zinc-900', Icon: Shirt },
  { id: 'p7', name: 'Mochila Urban 25L', category: 'Mochilas', sizes: ['M'], color: 'Azul', brand: 'Aero', price: 289.9, rating: 4.6, gradient: 'from-indigo-400 to-blue-700', Icon: Backpack },
  { id: 'p8', name: 'Relógio Aero Pulse', category: 'Relógios', sizes: ['M', 'G'], color: 'Preto', brand: 'Aero', price: 649.9, rating: 4.7, gradient: 'from-slate-500 to-slate-800', Icon: Watch },
  { id: 'p9', name: 'Camiseta Nimbus Run', category: 'Camisetas', sizes: ['P', 'M'], color: 'Verde', brand: 'Nimbus', price: 99.9, rating: 4.2, gradient: 'from-lime-400 to-green-700', Icon: Shirt },
  { id: 'p10', name: 'Tênis Aero Street', category: 'Tênis', sizes: ['P', 'M', 'G'], color: 'Branco', brand: 'Aero', price: 349.9, rating: 4.5, gradient: 'from-neutral-200 to-neutral-400', Icon: Footprints },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function toggleIn<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  if (next.has(value)) next.delete(value)
  else next.add(value)
  return next
}

const GROUPS: Array<{ id: GroupId; label: string; Icon: LucideIcon }> = [
  { id: 'categoria', label: 'Categoria', Icon: Layers },
  { id: 'tamanho', label: 'Tamanho', Icon: Ruler },
  { id: 'cor', label: 'Cor', Icon: Palette },
  { id: 'preco', label: 'Preço', Icon: Wallet },
  { id: 'marca', label: 'Marca', Icon: Tag },
]

function Group({ id, label, Icon, open, onOpenChange, count, children }: { id: GroupId; label: string; Icon: LucideIcon; open: boolean; onOpenChange: (open: boolean) => void; count: number; children: React.ReactNode }) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className="border-b py-1 last:border-0">
      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium hover:bg-muted" aria-controls={`fsc-${id}`}>
        <Icon className="size-4 text-muted-foreground" />
        <span className="flex-1 text-left">{label}</span>
        {count > 0 && <span className="rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground tabular-nums">{count}</span>}
        <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </CollapsibleTrigger>
      <CollapsibleContent id={`fsc-${id}`}>
        <div className="px-2 pb-3 pt-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function FiltrosEmSidebarColapsavel() {
  const [collapsed, setCollapsed] = useState(false)
  const [openGroups, setOpenGroups] = useState<Set<GroupId>>(new Set(['categoria', 'tamanho', 'preco']))
  const [cats, setCats] = useState<Set<Category>>(new Set(['Tênis']))
  const [sizes, setSizes] = useState<Set<Size>>(new Set())
  const [colors, setColors] = useState<Set<Color>>(new Set())
  const [brands, setBrands] = useState<Set<Brand>>(new Set())
  const [range, setRange] = useState<[number, number]>([0, MAX])

  const counts: Record<GroupId, number> = {
    categoria: cats.size,
    tamanho: sizes.size,
    cor: colors.size,
    preco: range[0] > 0 || range[1] < MAX ? 1 : 0,
    marca: brands.size,
  }
  const active = Object.values(counts).reduce((a, b) => a + b, 0)

  const results = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cats.size === 0 || cats.has(p.category)) &&
          (sizes.size === 0 || p.sizes.some((s) => sizes.has(s))) &&
          (colors.size === 0 || colors.has(p.color)) &&
          (brands.size === 0 || brands.has(p.brand)) &&
          p.price >= range[0] &&
          p.price <= range[1],
      ),
    [cats, sizes, colors, brands, range],
  )

  const clearAll = () => {
    setCats(new Set())
    setSizes(new Set())
    setColors(new Set())
    setBrands(new Set())
    setRange([0, MAX])
  }
  const openFromRail = (id: GroupId) => {
    setCollapsed(false)
    setOpenGroups((s) => new Set(s).add(id))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Esportes</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Corrida e trilha</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{results.length}</span> produtos
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <aside className={cn('shrink-0 rounded-xl border bg-card transition-[width] duration-300 lg:w-64', collapsed && 'lg:w-14')}>
            <div className={cn('flex items-center border-b px-2 py-2', collapsed ? 'justify-center' : 'justify-between pl-4')}>
              {!collapsed && (
                <span className="text-sm font-medium">
                  Filtros {active > 0 && <span className="text-muted-foreground">({active})</span>}
                </span>
              )}
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label={collapsed ? 'Expandir filtros' : 'Recolher filtros'} onClick={() => setCollapsed((c) => !c)} />}>
                  {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                </TooltipTrigger>
                <TooltipContent side="right">{collapsed ? 'Expandir' : 'Recolher'}</TooltipContent>
              </Tooltip>
            </div>

            {collapsed ? (
              <nav className="flex gap-1 p-2 lg:flex-col" aria-label="Grupos de filtro">
                {GROUPS.map((g) => (
                  <Tooltip key={g.id}>
                    <TooltipTrigger render={<Button variant="ghost" size="icon" className="relative" aria-label={`Abrir filtro ${g.label}`} onClick={() => openFromRail(g.id)} />}>
                      <g.Icon />
                      {counts[g.id] > 0 && <span className="absolute right-1 top-1 size-2 rounded-full bg-primary" aria-hidden="true" />}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {g.label}
                      {counts[g.id] > 0 ? ` · ${counts[g.id]} ativo${counts[g.id] > 1 ? 's' : ''}` : ''}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </nav>
            ) : (
              <div className="px-2 py-1">
                <Group id="categoria" label="Categoria" Icon={Layers} open={openGroups.has('categoria')} onOpenChange={() => setOpenGroups((s) => toggleIn(s, 'categoria'))} count={counts.categoria}>
                  <div className="space-y-1">
                    {CATEGORIES.map((c) => (
                      <Label key={c} htmlFor={`fsc-cat-${c}`} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1 font-normal">
                        <Checkbox id={`fsc-cat-${c}`} checked={cats.has(c)} onCheckedChange={() => setCats((s) => toggleIn(s, c))} />
                        <span className="flex-1">{c}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{PRODUCTS.filter((p) => p.category === c).length}</span>
                      </Label>
                    ))}
                  </div>
                </Group>
                <Group id="tamanho" label="Tamanho" Icon={Ruler} open={openGroups.has('tamanho')} onOpenChange={() => setOpenGroups((s) => toggleIn(s, 'tamanho'))} count={counts.tamanho}>
                  <div className="grid grid-cols-4 gap-1.5">
                    {SIZES.map((s) => (
                      <button key={s} type="button" aria-pressed={sizes.has(s)} onClick={() => setSizes((set) => toggleIn(set, s))} className={cn('h-8 rounded-md border text-xs font-medium transition-colors', sizes.has(s) ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted')}>
                        {s}
                      </button>
                    ))}
                  </div>
                </Group>
                <Group id="cor" label="Cor" Icon={Palette} open={openGroups.has('cor')} onOpenChange={() => setOpenGroups((s) => toggleIn(s, 'cor'))} count={counts.cor}>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                      <button key={c.name} type="button" aria-label={`Cor ${c.name}`} aria-pressed={colors.has(c.name)} onClick={() => setColors((s) => toggleIn(s, c.name))} className={cn('size-7 rounded-full ring-2 ring-offset-2 ring-offset-card transition', c.dot, colors.has(c.name) ? 'ring-primary' : 'ring-transparent hover:ring-border')} />
                    ))}
                  </div>
                </Group>
                <Group id="preco" label="Preço" Icon={Wallet} open={openGroups.has('preco')} onOpenChange={() => setOpenGroups((s) => toggleIn(s, 'preco'))} count={counts.preco}>
                  <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                    <span>{brl(range[0])}</span>
                    <span>{brl(range[1])}</span>
                  </div>
                  <Slider
                    className="mt-3"
                    min={0}
                    max={MAX}
                    step={50}
                    value={range}
                    aria-label="Faixa de preço"
                    onValueChange={(v) => {
                      if (typeof v !== 'number') setRange([v[0] ?? 0, v[1] ?? MAX])
                    }}
                  />
                </Group>
                <Group id="marca" label="Marca" Icon={Tag} open={openGroups.has('marca')} onOpenChange={() => setOpenGroups((s) => toggleIn(s, 'marca'))} count={counts.marca}>
                  <div className="space-y-1">
                    {BRANDS.map((b) => (
                      <Label key={b} htmlFor={`fsc-brand-${b}`} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1 font-normal">
                        <Checkbox id={`fsc-brand-${b}`} checked={brands.has(b)} onCheckedChange={() => setBrands((s) => toggleIn(s, b))} />
                        <span className="flex-1">{b}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{PRODUCTS.filter((p) => p.brand === b).length}</span>
                      </Label>
                    ))}
                  </div>
                </Group>
                {active > 0 && (
                  <div className="px-2 pb-2 pt-3">
                    <Button variant="outline" size="sm" className="w-full" onClick={clearAll}>
                      <X data-icon="inline-start" /> Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            )}
          </aside>

          <div className="min-w-0 flex-1">
            {active > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                {[...cats].map((c) => (
                  <button key={c} type="button" onClick={() => setCats((s) => toggleIn(s, c))} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 hover:bg-muted" aria-label={`Remover ${c}`}>
                    {c} <X className="size-3" />
                  </button>
                ))}
                {[...sizes].map((s) => (
                  <button key={s} type="button" onClick={() => setSizes((set) => toggleIn(set, s))} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 hover:bg-muted" aria-label={`Remover tamanho ${s}`}>
                    Tam. {s} <X className="size-3" />
                  </button>
                ))}
                {[...colors].map((c) => (
                  <button key={c} type="button" onClick={() => setColors((s) => toggleIn(s, c))} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 hover:bg-muted" aria-label={`Remover cor ${c}`}>
                    {c} <X className="size-3" />
                  </button>
                ))}
                {[...brands].map((b) => (
                  <button key={b} type="button" onClick={() => setBrands((s) => toggleIn(s, b))} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 hover:bg-muted" aria-label={`Remover marca ${b}`}>
                    {b} <X className="size-3" />
                  </button>
                ))}
                {counts.preco > 0 && (
                  <button type="button" onClick={() => setRange([0, MAX])} className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 hover:bg-muted" aria-label="Remover faixa de preço">
                    {brl(range[0])} – {brl(range[1])} <X className="size-3" />
                  </button>
                )}
              </div>
            )}
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                <SearchX className="size-8 text-muted-foreground" />
                <p className="mt-3 font-medium">Nada encontrado com esses filtros</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>Limpar filtros</Button>
              </div>
            ) : (
              <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', collapsed && 'xl:grid-cols-4')}>
                {results.map((p) => (
                  <article key={p.id} className="rounded-xl border bg-card p-3">
                    <div className={cn('flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br', p.gradient)}>
                      <p.Icon className="size-14 text-white/90" strokeWidth={1.25} />
                    </div>
                    <div className="mt-3 text-[11px] text-muted-foreground">
                      {p.brand} · {p.color} · {p.sizes.join(' ')}
                    </div>
                    <h3 className="truncate text-sm font-medium">{p.name}</h3>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm font-semibold tabular-nums">{brl(p.price)}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')}
                      </span>
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
