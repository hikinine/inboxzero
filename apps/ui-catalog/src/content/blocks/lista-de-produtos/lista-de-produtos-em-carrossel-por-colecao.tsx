'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Armchair, Bike, Camera, Coffee, Cpu, Dumbbell, Footprints, Headphones, Heart, Keyboard, Lamp, Laptop, Monitor, Mouse, Shirt, Sofa, Speaker, Star, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  old?: number
  rating: number
  gradient: string
  Icon: LucideIcon
  tag?: string
}
interface Collection {
  id: string
  label: string
  Icon: LucideIcon
  title: string
  products: Product[]
}

const COLLECTIONS: Collection[] = [
  {
    id: 'tech',
    label: 'Tech',
    Icon: Cpu,
    title: 'Setup completo para trabalhar e jogar',
    products: [
      { id: 't1', name: 'Notebook Vega 14" OLED', price: 5499, rating: 4.8, gradient: 'from-slate-500 to-slate-800', Icon: Laptop, tag: 'Lançamento' },
      { id: 't2', name: 'Monitor Arco 27" 144 Hz', price: 1890, old: 2190, rating: 4.7, gradient: 'from-indigo-400 to-blue-700', Icon: Monitor },
      { id: 't3', name: 'Teclado Mecânico 65%', price: 489, rating: 4.9, gradient: 'from-violet-400 to-violet-700', Icon: Keyboard, tag: 'Mais vendido' },
      { id: 't4', name: 'Mouse Sem Fio Glide', price: 159, old: 199, rating: 4.6, gradient: 'from-sky-400 to-sky-700', Icon: Mouse },
      { id: 't5', name: 'Fone Nimbus ANC Pro', price: 899.9, rating: 4.8, gradient: 'from-fuchsia-400 to-purple-700', Icon: Headphones },
      { id: 't6', name: 'Webcam Lumi 4K', price: 649, rating: 4.5, gradient: 'from-teal-400 to-cyan-700', Icon: Camera },
    ],
  },
  {
    id: 'casa',
    label: 'Casa & café',
    Icon: Coffee,
    title: 'Para deixar a casa com cara de café da esquina',
    products: [
      { id: 'c1', name: 'Cafeteira Kaffa Espresso', price: 1290, rating: 4.9, gradient: 'from-amber-300 to-orange-600', Icon: Coffee, tag: 'Mais vendido' },
      { id: 'c2', name: 'Poltrona Lounge Linho', price: 1590, old: 1890, rating: 4.7, gradient: 'from-stone-400 to-stone-700', Icon: Armchair },
      { id: 'c3', name: 'Luminária Arc Piso', price: 429.9, rating: 4.6, gradient: 'from-yellow-300 to-amber-600', Icon: Lamp },
      { id: 'c4', name: 'Sofá Modular 3 Lugares', price: 3290, rating: 4.8, gradient: 'from-emerald-400 to-emerald-700', Icon: Sofa, tag: 'Frete grátis' },
      { id: 'c5', name: 'Caixa de Som Onda 360', price: 329.9, old: 399.9, rating: 4.4, gradient: 'from-cyan-400 to-sky-700', Icon: Speaker },
      { id: 'c6', name: 'Cápsulas Kaffa Intenso', price: 34.9, rating: 4.8, gradient: 'from-orange-400 to-red-700', Icon: Coffee },
    ],
  },
  {
    id: 'esporte',
    label: 'Esporte',
    Icon: Dumbbell,
    title: 'Tudo para o treino de amanhã',
    products: [
      { id: 'e1', name: 'Tênis Aero Run Max 2', price: 549.9, old: 699.9, rating: 4.8, gradient: 'from-neutral-600 to-neutral-900', Icon: Footprints, tag: '-21%' },
      { id: 'e2', name: 'Relógio Pulse Fit', price: 649.9, rating: 4.7, gradient: 'from-sky-400 to-sky-700', Icon: Watch },
      { id: 'e3', name: 'Camiseta Dry Aero', price: 89.9, rating: 4.3, gradient: 'from-lime-400 to-green-700', Icon: Shirt },
      { id: 'e4', name: 'Bicicleta Urbana Vento', price: 2890, rating: 4.6, gradient: 'from-rose-400 to-red-700', Icon: Bike, tag: 'Novo' },
      { id: 'e5', name: 'Kit Halteres 20 kg', price: 399, old: 459, rating: 4.5, gradient: 'from-zinc-500 to-zinc-800', Icon: Dumbbell },
      { id: 'e6', name: 'Fone Onda Sport', price: 259.9, rating: 4.5, gradient: 'from-indigo-400 to-blue-700', Icon: Headphones },
    ],
  },
]

const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ListaDeProdutosEmCarrosselPorColecao() {
  const [collectionId, setCollectionId] = useState('tech')
  const [favs, setFavs] = useState<Set<string>>(new Set(['t3']))
  const [api, setApi] = useState<CarouselApi>()
  const [snap, setSnap] = useState(0)
  const [snaps, setSnaps] = useState(0)

  const collection = COLLECTIONS.find((c) => c.id === collectionId) ?? COLLECTIONS[0]!

  useEffect(() => {
    if (!api) return
    const update = () => {
      setSnap(api.selectedScrollSnap())
      setSnaps(api.scrollSnapList().length)
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  const toggleFav = (id: string) =>
    setFavs((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Coleções</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{collection.title}</h2>

        <Carousel key={collection.id} opts={{ align: 'start' }} setApi={setApi} className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Coleção">
              {COLLECTIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={c.id === collectionId}
                  onClick={() => setCollectionId(c.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                    c.id === collectionId ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <c.Icon className="size-3.5" /> {c.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground tabular-nums">
                {snap + 1} / {Math.max(snaps, 1)}
              </span>
              <CarouselPrevious className="static inset-auto my-0" aria-label="Produtos anteriores" />
              <CarouselNext className="static inset-auto my-0" aria-label="Próximos produtos" />
            </div>
          </div>

          <CarouselContent className="mt-6">
            {collection.products.map((p) => (
              <CarouselItem key={p.id} className="basis-[78%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <article className="group h-full rounded-xl border bg-card p-3">
                  <div className={cn('relative aspect-[4/5] overflow-hidden rounded-lg bg-gradient-to-br', p.gradient)}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p.Icon className="size-16 text-white/90 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.2} />
                    </div>
                    {p.tag && <Badge variant="secondary" className="absolute left-2.5 top-2.5">{p.tag}</Badge>}
                    <Button
                      variant="secondary"
                      size="icon-xs"
                      className="absolute right-2.5 top-2.5 rounded-full"
                      aria-label={favs.has(p.id) ? 'Remover dos favoritos' : 'Favoritar'}
                      aria-pressed={favs.has(p.id)}
                      onClick={() => toggleFav(p.id)}
                    >
                      <Heart className={cn(favs.has(p.id) && 'fill-rose-500 text-rose-500')} />
                    </Button>
                  </div>
                  <h3 className="mt-3 truncate text-sm font-medium">{p.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold tabular-nums">{brl(p.price)}</span>
                      {p.old && <span className="text-xs text-muted-foreground line-through tabular-nums">{brl(p.old)}</span>}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-amber-500 text-amber-500" /> {p.rating.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="mt-3 w-full">Adicionar</Button>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: Math.max(snaps, 1) }, (_, i) => (
              <span key={i} className={cn('h-1.5 rounded-full transition-all', i === snap ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30')} />
            ))}
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
            Ver toda a coleção {collection.label} <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
