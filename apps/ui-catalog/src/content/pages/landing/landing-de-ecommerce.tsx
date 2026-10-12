'use client'

import { useState } from 'react'
import { ArrowRight, Check, Flower2, Gift, Heart, Lamp, Menu, RefreshCw, Search, ShieldCheck, ShoppingBag, Sofa, Star, Tag, Truck, User, Utensils, Zap, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CATEGORIAS_NAV = ['Sala', 'Quarto', 'Cozinha', 'Plantas', 'Iluminação', 'Presentes', 'Ofertas']
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Contador({ n }: { n: number }) {
  return <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">{n}</span>
}

function BrisaNavbar({ count, wishes }: { count: number; wishes: number }) {
  return (
    <header className="w-full border-b bg-background">
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6 py-2 text-xs">
          <span className="flex items-center gap-1.5">
            <Truck className="size-3.5" /> Frete grátis acima de R$ 299
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <RefreshCw className="size-3.5" /> Troca grátis em 30 dias
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <ShieldCheck className="size-3.5" /> Compra protegida
          </span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
          <Menu />
        </Button>
        <a href="#" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <span className="size-3 rounded-full bg-emerald-500" />
          Casa Brisa
        </a>
        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar tapete, luminária, vaso…" className="h-10 rounded-full pl-9" aria-label="Buscar produtos" />
        </div>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button variant="ghost" size="icon" aria-label="Minha conta">
            <User />
          </Button>
          <Button variant="ghost" size="icon" className="relative" aria-label={`Favoritos: ${wishes}`}>
            <Heart />
            {wishes > 0 && <Contador n={wishes} />}
          </Button>
          <Button variant="ghost" size="icon" className="relative" aria-label={`Sacola com ${count} itens`}>
            <ShoppingBag />
            {count > 0 && <Contador n={count} />}
          </Button>
        </div>
      </div>
      <nav className="hidden border-t md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-7 px-6 text-sm">
          {CATEGORIAS_NAV.map((c) => (
            <a key={c} href="#" className={`py-3 ${c === 'Ofertas' ? 'font-medium text-rose-600 dark:text-rose-400' : 'text-muted-foreground hover:text-foreground'}`}>
              {c}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

const BANNERS = [
  { t: 'Plantas que não morrem', s: 'Kits a partir de R$ 89,90', tone: 'from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900' },
  { t: 'Luz certa para ler', s: 'Luminárias de mesa', tone: 'from-sky-100 to-indigo-200 dark:from-sky-950 dark:to-indigo-900' },
]

function BrisaHero() {
  return (
    <section className="w-full px-6 pt-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 p-8 dark:from-amber-950 dark:via-orange-950 dark:to-rose-950 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-orange-300/50 blur-2xl dark:bg-orange-700/30" aria-hidden />
          <div className="pointer-events-none absolute bottom-10 right-10 hidden h-56 w-40 rotate-6 rounded-2xl bg-gradient-to-b from-stone-300 to-stone-500 shadow-xl dark:from-stone-600 dark:to-stone-800 md:block" aria-hidden />
          <div className="pointer-events-none absolute bottom-24 right-44 hidden size-28 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 shadow-lg md:block" aria-hidden />
          <Badge className="w-fit bg-foreground text-background">Coleção Outono 2026</Badge>
          <h1 className="mt-4 max-w-lg text-4xl font-semibold tracking-tight sm:text-6xl">Sua casa com cara de domingo.</h1>
          <p className="mt-3 max-w-md text-muted-foreground">Até 40% off em tapetes, mantas e luminárias. Só até domingo, enquanto durar o estoque.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full">
              Ver ofertas <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-background/60 backdrop-blur">
              Novidades
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {BANNERS.map((b) => (
            <a key={b.t} href="#" className={`group flex min-h-[200px] flex-col justify-end rounded-3xl bg-gradient-to-br p-6 ${b.tone}`}>
              <span className="text-xs text-muted-foreground">{b.s}</span>
              <span className="mt-1 flex items-center justify-between text-xl font-medium">
                {b.t} <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const CATS: Array<{ Icon: LucideIcon; l: string; n: number }> = [
  { Icon: Sofa, l: 'Sala', n: 128 },
  { Icon: Lamp, l: 'Iluminação', n: 64 },
  { Icon: Utensils, l: 'Cozinha', n: 212 },
  { Icon: Flower2, l: 'Plantas', n: 96 },
  { Icon: Gift, l: 'Presentes', n: 150 },
  { Icon: Tag, l: 'Outlet', n: 41 },
]

function BrisaCategorias() {
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 md:grid-cols-6">
        {CATS.map((c) => (
          <a key={c.l} href="#" className="group flex flex-col items-center gap-3 rounded-2xl bg-muted/50 px-3 py-5 text-center transition-colors hover:bg-muted">
            <span className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm transition-transform group-hover:scale-105">
              <c.Icon className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-medium">{c.l}</span>
              <span className="text-xs text-muted-foreground">{c.n} itens</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

interface Produto {
  id: number
  n: string
  cat: string
  price: number
  old?: number
  tone: string
  badge?: string
  rating: string
  reviews: number
}

const PRODUTOS: Produto[] = [
  { id: 1, n: 'Tapete de juta natural 2×3 m', cat: 'Sala', price: 489, old: 629, tone: 'from-amber-200 to-amber-400 dark:from-amber-900 dark:to-amber-700', badge: '-22%', rating: '4,8', reviews: 312 },
  { id: 2, n: 'Manta de tricô caramelo', cat: 'Quarto', price: 219.9, tone: 'from-orange-200 to-rose-300 dark:from-orange-900 dark:to-rose-800', badge: 'Novo', rating: '4,9', reviews: 87 },
  { id: 3, n: 'Luminária de piso arco', cat: 'Iluminação', price: 1290, tone: 'from-stone-300 to-stone-500 dark:from-stone-700 dark:to-stone-900', rating: '4,7', reviews: 154 },
  { id: 4, n: 'Vaso de cerâmica terracota 40 cm', cat: 'Plantas', price: 129, tone: 'from-red-200 to-orange-300 dark:from-red-900 dark:to-orange-800', rating: '4,6', reviews: 203 },
  { id: 5, n: 'Cadeira de jantar nogueira', cat: 'Cozinha', price: 549, old: 690, tone: 'from-yellow-100 to-amber-300 dark:from-yellow-900 dark:to-amber-800', badge: '-20%', rating: '4,8', reviews: 96 },
  { id: 6, n: 'Jogo de panelas de ferro 5 peças', cat: 'Cozinha', price: 899, tone: 'from-zinc-300 to-zinc-500 dark:from-zinc-700 dark:to-zinc-900', rating: '4,9', reviews: 421 },
  { id: 7, n: 'Espelho orgânico 80 cm', cat: 'Sala', price: 379, tone: 'from-sky-100 to-slate-300 dark:from-sky-900 dark:to-slate-800', badge: 'Novo', rating: '4,7', reviews: 58 },
  { id: 8, n: 'Kit 6 suculentas com cachepô', cat: 'Plantas', price: 89.9, tone: 'from-emerald-200 to-green-400 dark:from-emerald-900 dark:to-green-800', rating: '4,9', reviews: 760 },
]

function BrisaProdutos({ cart, wish, onAdd, onWish }: { cart: number[]; wish: number[]; onAdd: (id: number) => void; onWish: (id: number) => void }) {
  return (
    <section className="w-full px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mais vendidos</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Os queridinhos da semana</h2>
          </div>
          <a href="#" className="hidden items-center gap-1 text-sm font-medium underline-offset-4 hover:underline sm:inline-flex">
            Ver todos <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {PRODUTOS.map((p) => {
            const inCart = cart.includes(p.id)
            const liked = wish.includes(p.id)
            return (
              <article key={p.id} className="group flex flex-col">
                <div className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${p.tone}`}>
                  {p.badge && <span className={`absolute left-3 top-3 rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.badge === 'Novo' ? 'bg-background text-foreground' : 'bg-rose-600 text-white'}`}>{p.badge}</span>}
                  <button
                    type="button"
                    onClick={() => onWish(p.id)}
                    aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    aria-pressed={liked}
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
                  >
                    <Heart className={`size-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
                <div className="mt-3 flex-1">
                  <div className="text-xs text-muted-foreground">{p.cat}</div>
                  <h3 className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug">{p.n}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-amber-400 text-amber-400" /> {p.rating} <span>({p.reviews})</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex flex-col leading-tight">
                    {p.old && <span className="text-xs text-muted-foreground line-through">{brl(p.old)}</span>}
                    <span className="font-semibold tabular-nums">{brl(p.price)}</span>
                  </div>
                  <Button size="sm" variant={inCart ? 'secondary' : 'default'} className="rounded-full" onClick={() => onAdd(p.id)} aria-label={`${inCart ? 'Na sacola' : 'Adicionar'}: ${p.n}`}>
                    {inCart ? <Check data-icon="inline-start" /> : <ShoppingBag data-icon="inline-start" />}
                    <span className="hidden sm:inline">{inCart ? 'Na sacola' : 'Adicionar'}</span>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const OFERTAS: Array<{ n: string; de: number; por: number; sold: number; tone: string }> = [
  { n: 'Sofá retrátil 3 lugares em linho', de: 3490, por: 2590, sold: 72, tone: 'from-stone-200 to-stone-400 dark:from-stone-600 dark:to-stone-800' },
  { n: 'Mesa de centro em carvalho', de: 1190, por: 790, sold: 54, tone: 'from-amber-200 to-yellow-400 dark:from-amber-800 dark:to-yellow-700' },
  { n: 'Jogo de cama 400 fios casal', de: 459, por: 289, sold: 88, tone: 'from-slate-200 to-sky-300 dark:from-slate-600 dark:to-sky-800' },
]

function BrisaOfertas() {
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-7xl rounded-3xl bg-foreground p-6 text-background sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-background/60">
              <Zap className="size-3.5" /> Ofertas relâmpago
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Só hoje, até acabar</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-background/60">Termina em</span>
            {['04', '12', '33'].map((t, i) => (
              <span key={i} className="rounded-md bg-background/10 px-2 py-1 font-mono text-base font-semibold tabular-nums">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {OFERTAS.map((o) => (
            <article key={o.n} className="flex gap-4 rounded-2xl bg-background/5 p-4 ring-1 ring-background/10">
              <div className={`size-24 shrink-0 rounded-xl bg-gradient-to-br ${o.tone}`} />
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-semibold text-white">-{Math.round((1 - o.por / o.de) * 100)}%</span>
                <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug">{o.n}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-semibold tabular-nums">{brl(o.por)}</span>
                  <span className="text-xs text-background/50 line-through">{brl(o.de)}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-background/15">
                  <div className="h-full rounded-full bg-rose-500" style={{ width: `${o.sold}%` }} />
                </div>
                <div className="mt-1 text-[11px] text-background/60">{o.sold}% vendido</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const AVALIACOES = [
  { n: 'Patrícia Moreira', c: 'Curitiba, PR', q: 'O tapete chegou em 4 dias e é exatamente como na foto. A textura da juta é linda e já virou o centro da sala.', p: 'Tapete de juta natural' },
  { n: 'Thiago Reis', c: 'Recife, PE', q: 'Comprei a luminária arco com medo do tamanho, mas o atendimento me ajudou a medir. Ficou perfeita no canto de leitura.', p: 'Luminária de piso arco' },
  { n: 'Luana Freitas', c: 'Belo Horizonte, MG', q: 'As suculentas vieram saudáveis e com um guia de cuidados. Já é a terceira vez que compro de presente.', p: 'Kit 6 suculentas' },
]

function BrisaAvaliacoes() {
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Avaliações</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Quem comprou, recomenda</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex gap-0.5 text-amber-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <strong>4,8</strong> <span className="text-muted-foreground">· 12.430 avaliações</span>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {AVALIACOES.map((a) => (
            <figure key={a.n} className="flex flex-col rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="flex gap-0.5 text-amber-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <Check className="size-3" /> Compra verificada
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed">“{a.q}”</blockquote>
              <figcaption className="mt-5 border-t pt-4 text-xs">
                <div className="font-medium">
                  {a.n} <span className="font-normal text-muted-foreground">· {a.c}</span>
                </div>
                <div className="mt-0.5 text-muted-foreground">Comprou: {a.p}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrisaNewsletter() {
  const [ok, setOk] = useState(false)
  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl bg-emerald-700 p-8 text-white dark:bg-emerald-900 sm:p-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">10% off na primeira compra</h2>
          <p className="mt-2 text-white/80">Receba lançamentos e ofertas antes de todo mundo. Sem spam, prometido — no máximo um e-mail por semana.</p>
        </div>
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            setOk(true)
          }}
        >
          <Input type="email" placeholder="seu@email.com.br" aria-label="E-mail" className="h-11 rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50" />
          <Button type="submit" size="lg" variant="secondary" className="h-11 rounded-full">
            {ok ? 'Cupom enviado!' : 'Quero o cupom'}
          </Button>
        </form>
      </div>
    </section>
  )
}

const FOOTER: Array<[string, string[]]> = [
  ['Loja', ['Sala', 'Quarto', 'Cozinha', 'Plantas', 'Iluminação']],
  ['Ajuda', ['Trocas e devoluções', 'Rastrear pedido', 'Prazos de entrega', 'Fale conosco']],
  ['Casa Brisa', ['Sobre nós', 'Lojas físicas', 'Trabalhe conosco', 'Blog']],
]

function BrisaFooter() {
  return (
    <footer className="w-full border-t px-6 pt-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a href="#" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              <span className="size-3 rounded-full bg-emerald-500" />
              Casa Brisa
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Decoração e objetos feitos por artesãos brasileiros, com entrega para todo o país.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Pix', 'Visa', 'Master', 'Elo', 'Boleto'].map((p) => (
                <span key={p} className="rounded-md border bg-muted/40 px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>
          </div>
          {FOOTER.map(([t, links]) => (
            <div key={t}>
              <div className="text-sm font-medium">{t}</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Casa Brisa Comércio Ltda. CNPJ 31.887.204/0001-55</span>
          <span>Av. Paulista, 1.000 · São Paulo, SP</span>
        </div>
      </div>
    </footer>
  )
}

export default function LandingDeEcommerce() {
  const [cart, setCart] = useState<number[]>([])
  const [wish, setWish] = useState<number[]>([])
  const add = (id: number) => setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
  const toggleWish = (id: number) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <BrisaNavbar count={cart.length} wishes={wish.length} />
      <BrisaHero />
      <BrisaCategorias />
      <BrisaProdutos cart={cart} wish={wish} onAdd={add} onWish={toggleWish} />
      <BrisaOfertas />
      <BrisaAvaliacoes />
      <BrisaNewsletter />
      <BrisaFooter />
    </div>
  )
}
