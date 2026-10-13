'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { CalendarDays, Check, Clock, Instagram, Leaf, MapPin, Menu, Minus, Phone, Plus, Quote, Star, Users, UtensilsCrossed, Wine } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const NAV = ['Cardápio', 'Reservas', 'O chef', 'Eventos', 'Contato']

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-full border-2 border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400">
        <UtensilsCrossed className="size-4" />
      </span>
      <span className="font-serif text-xl leading-none font-semibold tracking-tight">
        Casa Jabuticaba
        <span className="block text-[10px] font-sans font-normal uppercase tracking-[0.25em] text-muted-foreground">cozinha brasileira</span>
      </span>
    </a>
  )
}

function Navbar() {
  return (
    <header className="w-full border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="hidden rounded-full bg-amber-600 text-white hover:bg-amber-700 sm:inline-flex">Reservar mesa</Button>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Casa Jabuticaba</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {NAV.map((l) => (
                  <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                    {l}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function Prato() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="absolute inset-6 rounded-full bg-amber-500/20 blur-3xl" aria-hidden />
      <svg viewBox="0 0 400 400" className="relative size-full" aria-label="Ilustração de prato com moqueca">
        <ellipse cx="200" cy="360" rx="150" ry="16" className="fill-foreground/10" />
        <circle cx="200" cy="200" r="168" className="fill-card stroke-border" strokeWidth="2" />
        <circle cx="200" cy="200" r="132" className="fill-muted/60 stroke-border" strokeWidth="1.5" />
        <circle cx="200" cy="205" r="104" className="fill-orange-400/80 dark:fill-orange-500/70" />
        <circle cx="200" cy="205" r="104" fill="url(#brilho)" />
        <circle cx="170" cy="180" r="26" className="fill-amber-100 dark:fill-amber-200" />
        <circle cx="236" cy="226" r="22" className="fill-amber-100 dark:fill-amber-200" />
        <circle cx="160" cy="240" r="13" className="fill-rose-500" />
        <circle cx="250" cy="170" r="11" className="fill-rose-500" />
        <circle cx="214" cy="190" r="9" className="fill-yellow-300" />
        <circle cx="190" cy="250" r="8" className="fill-yellow-300" />
        {[
          [140, 205, -30],
          [262, 205, 25],
          [205, 145, 10],
          [215, 262, -15],
          [180, 215, 40],
        ].map(([x, y, r], i) => (
          <path key={i} d="M0 0 C 6 -10, 18 -10, 22 0 C 18 6, 6 6, 0 0 Z" transform={`translate(${x} ${y}) rotate(${r})`} className="fill-emerald-600 dark:fill-emerald-500" />
        ))}
        <defs>
          <radialGradient id="brilho" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 80"
          className="absolute top-[4%] h-24 w-6 text-muted-foreground/50"
          style={{ left: `${40 + i * 9}%` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 0.8, 0], y: [20, -10, -30] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
          aria-hidden
        >
          <path d="M10 80 C 0 64, 20 52, 10 38 C 0 24, 20 14, 10 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </motion.svg>
      ))}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute right-0 bottom-10 rounded-2xl border bg-background/95 p-3 shadow-lg backdrop-blur"
      >
        <div className="text-xs text-muted-foreground">Prato da semana</div>
        <div className="font-serif font-semibold">Moqueca de banana-da-terra</div>
        <div className="text-sm font-medium text-amber-600 dark:text-amber-400">R$ 78,00</div>
      </motion.div>
      <div className="absolute top-12 left-0 flex items-center gap-2 rounded-full border bg-background/95 px-3 py-1.5 text-xs shadow-md">
        <Leaf className="size-3.5 text-emerald-600" /> Opção vegana
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge variant="outline" className="gap-1.5 rounded-full border-amber-600/30 text-amber-700 dark:text-amber-400">
            <Star className="size-3 fill-current" /> Guia Paladar 2026 · Melhor brasileiro
          </Badge>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            Comida de vó,
            <br />
            <span className="italic text-amber-600 dark:text-amber-400">com sotaque de chef.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">Ingredientes de pequenos produtores, fogo a lenha e receitas de todas as regiões do Brasil, no coração de Pinheiros.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full bg-amber-600 text-white hover:bg-amber-700">
              <CalendarDays data-icon="inline-start" /> Reservar mesa
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Ver cardápio
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t pt-6">
            {[
              ['4,8', 'no Google'],
              ['32', 'produtores'],
              ['2014', 'desde'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-serif text-2xl font-semibold">{n}</dt>
                <dd className="text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Prato />
      </div>
    </section>
  )
}

interface PratoItem {
  nome: string
  desc: string
  preco: string
  tag?: string
}

const CARDAPIO: Record<string, PratoItem[]> = {
  entradas: [
    { nome: 'Pastel de feira de costela', desc: 'Massa crocante, costela desfiada e vinagrete', preco: 'R$ 36', tag: 'Mais pedido' },
    { nome: 'Bolinho de mandioca com queijo da Canastra', desc: 'Seis unidades, maionese de alho', preco: 'R$ 34' },
    { nome: 'Ceviche de caju', desc: 'Caju, leite de tigre de coco e pimenta-de-cheiro', preco: 'R$ 39', tag: 'Vegano' },
    { nome: 'Pão de queijo na chapa', desc: 'Com manteiga de garrafa', preco: 'R$ 24' },
  ],
  principais: [
    { nome: 'Moqueca de banana-da-terra', desc: 'Leite de coco, dendê, arroz de coentro', preco: 'R$ 78', tag: 'Vegano' },
    { nome: 'Arroz de pato', desc: 'Pato confitado, linguiça artesanal e tucupi', preco: 'R$ 92' },
    { nome: 'Picanha na brasa', desc: 'Farofa de banana, vinagrete e mandioca frita', preco: 'R$ 118', tag: 'Para dois' },
    { nome: 'Peixe do dia na folha de bananeira', desc: 'Pirão, arroz e salada de palmito', preco: 'R$ 96' },
  ],
  sobremesas: [
    { nome: 'Pudim de tapioca', desc: 'Calda de rapadura e coco queimado', preco: 'R$ 29' },
    { nome: 'Cartola', desc: 'Banana, queijo coalho, açúcar e canela', preco: 'R$ 31', tag: 'Clássico' },
    { nome: 'Sorvete de jabuticaba', desc: 'Feito na casa, com farofa de castanha', preco: 'R$ 26' },
  ],
  bebidas: [
    { nome: 'Caipirinha de cajá', desc: 'Cachaça de Salinas, cajá e rapadura', preco: 'R$ 34' },
    { nome: 'Suco de cupuaçu', desc: 'Natural, 400 ml', preco: 'R$ 16' },
    { nome: 'Vinho da Serra Gaúcha (taça)', desc: 'Tinto ou branco da semana', preco: 'R$ 38' },
  ],
}

const ABAS = [
  ['entradas', 'Entradas'],
  ['principais', 'Principais'],
  ['sobremesas', 'Sobremesas'],
  ['bebidas', 'Bebidas'],
] as const

function Cardapio() {
  return (
    <section className="w-full bg-muted/40 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">Cardápio</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Feito para dividir</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Muda a cada estação, conforme o que chega dos nossos produtores.</p>
        </div>
        <Tabs defaultValue="principais" className="mt-10 items-center">
          <TabsList className="h-10 rounded-full p-1">
            {ABAS.map(([v, l]) => (
              <TabsTrigger key={v} value={v} className="rounded-full px-4">
                {l}
              </TabsTrigger>
            ))}
          </TabsList>
          {ABAS.map(([v]) => (
            <TabsContent key={v} value={v} className="mt-8 w-full">
              <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
                {CARDAPIO[v].map((p) => (
                  <li key={p.nome}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-lg font-semibold">{p.nome}</span>
                      <span className="flex-1 border-b border-dotted border-muted-foreground/40" aria-hidden />
                      <span className="font-medium tabular-nums text-amber-700 dark:text-amber-400">{p.preco}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{p.desc}</span>
                      {p.tag && (
                        <Badge variant="secondary" className="h-5 text-[10px]">
                          {p.tag}
                        </Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

const HORAS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']

function Reservas() {
  const [data, setData] = useState<Date | undefined>(new Date(2026, 9, 17))
  const [pessoas, setPessoas] = useState(2)
  const [hora, setHora] = useState('20:00')
  const [enviado, setEnviado] = useState(false)

  return (
    <section className="w-full px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">Reservas</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Guardamos sua mesa</h2>
          <p className="mt-3 max-w-md text-muted-foreground">Reservas até 30 dias antes. Para grupos acima de 10 pessoas, fale com a gente pelo WhatsApp.</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 text-muted-foreground" />
              <span>
                <strong className="font-medium">Ter a sáb</strong> 12h–15h e 19h–23h
                <br />
                <strong className="font-medium">Dom</strong> 12h–17h
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 text-muted-foreground" /> (11) 3032-8890
            </li>
            <li className="flex gap-3">
              <Wine className="mt-0.5 size-4 text-muted-foreground" /> Rolha livre às terças
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {enviado ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="size-7" />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold">Mesa reservada!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {data ? format(data, "EEEE, d 'de' MMMM", { locale: ptBR }) : ''} às {hora}, para {pessoas} {pessoas === 1 ? 'pessoa' : 'pessoas'}.
                  <br />A confirmação chegou no seu WhatsApp.
                </p>
                <Button variant="outline" className="mt-6 rounded-full" onClick={() => setEnviado(false)}>
                  Fazer outra reserva
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault()
                  setEnviado(true)
                }}
                className="grid gap-5 sm:grid-cols-2"
              >
                <div className="space-y-1.5">
                  <Label>Data</Label>
                  <Popover>
                    <PopoverTrigger render={<Button type="button" variant="outline" className="w-full justify-start font-normal capitalize" />}>
                      <CalendarDays data-icon="inline-start" className="text-muted-foreground" />
                      {data ? format(data, "EEE, d 'de' MMM", { locale: ptBR }) : 'Escolha o dia'}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" locale={ptBR} selected={data} onSelect={setData} defaultMonth={data} disabled={[{ before: new Date(2026, 9, 13) }, { dayOfWeek: [1] }]} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1.5">
                  <Label>Pessoas</Label>
                  <div className="flex h-9 items-center justify-between rounded-md border px-1">
                    <Button type="button" size="icon-sm" variant="ghost" aria-label="Menos pessoas" onClick={() => setPessoas((p) => Math.max(1, p - 1))}>
                      <Minus />
                    </Button>
                    <span className="flex items-center gap-1.5 text-sm tabular-nums">
                      <Users className="size-3.5 text-muted-foreground" /> {pessoas}
                    </span>
                    <Button type="button" size="icon-sm" variant="ghost" aria-label="Mais pessoas" onClick={() => setPessoas((p) => Math.min(10, p + 1))}>
                      <Plus />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Horário</Label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {HORAS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHora(h)}
                        className={cn(
                          'h-9 rounded-md border text-sm tabular-nums transition-colors',
                          hora === h ? 'border-amber-600 bg-amber-600 text-white' : 'hover:bg-muted',
                        )}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-nome">Nome</Label>
                  <Input id="r-nome" defaultValue="Juliana Prado" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="r-tel">WhatsApp</Label>
                  <Input id="r-tel" defaultValue="(11) 98765-4321" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="r-obs">Observações</Label>
                  <Textarea id="r-obs" placeholder="Aniversário, alergias, cadeira para bebê…" rows={2} />
                </div>
                <Button type="submit" size="lg" className="rounded-full bg-amber-600 text-white hover:bg-amber-700 sm:col-span-2">
                  Confirmar reserva
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const DEPOIMENTOS = [
  { nome: 'Renata Albuquerque', ini: 'RA', texto: 'O arroz de pato me levou direto para Belém. Atendimento caloroso e carta de cachaças impecável.', onde: 'Google' },
  { nome: 'Marcos Vinícius', ini: 'MV', texto: 'Comemoramos nosso aniversário de casamento aqui. Trouxeram a cartola com velinha sem a gente pedir.', onde: 'TripAdvisor' },
  { nome: 'Patrícia Gomes', ini: 'PG', texto: 'Finalmente um lugar com opções veganas que não são só salada. A moqueca de banana é obrigatória.', onde: 'Instagram' },
]

function Depoimentos() {
  return (
    <section className="w-full border-y bg-amber-50/60 px-6 py-20 dark:bg-amber-950/10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl font-semibold tracking-tight">Quem provou, voltou</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <figure key={d.nome} className={cn('relative rounded-2xl border bg-card p-6', i === 1 && 'md:-translate-y-4')}>
              <Quote className="size-6 text-amber-600/40" />
              <blockquote className="mt-3 font-serif text-lg leading-snug">{d.texto}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-amber-500/15 text-amber-800 dark:text-amber-300">{d.ini}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium">{d.nome}</div>
                  <div className="text-xs text-muted-foreground">via {d.onde}</div>
                </div>
                <div className="flex text-amber-500">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Mapa() {
  return (
    <section className="w-full px-6 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">Como chegar</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight">Na esquina mais gostosa de Pinheiros</h2>
          <address className="mt-6 space-y-1 not-italic text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="size-4 text-amber-600" /> Rua dos Pinheiros, 1.204
            </div>
            <div className="pl-6">Pinheiros, São Paulo/SP · 05422-002</div>
            <div className="pl-6">Metrô Fradique Coutinho a 400 m · Valet R$ 30</div>
          </address>
          <Button variant="outline" className="mt-6 rounded-full">
            Abrir no mapa
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-3xl border bg-muted/60">
          <svg viewBox="0 0 600 340" className="block w-full text-muted-foreground" aria-label="Mapa estilizado da região">
            <rect x="360" y="30" width="170" height="110" rx="14" className="fill-emerald-500/20" />
            <text x="445" y="90" textAnchor="middle" className="fill-emerald-700 text-[13px] dark:fill-emerald-400">Praça Benedito Calixto</text>
            <path d="M-20 250 Q 200 220 620 280" fill="none" className="stroke-sky-400/40" strokeWidth="18" strokeLinecap="round" />
            {[60, 170, 300, 520].map((x) => (
              <line key={x} x1={x} y1="-10" x2={x - 40} y2="350" stroke="currentColor" strokeOpacity="0.25" strokeWidth="10" />
            ))}
            {[60, 160, 300].map((y) => (
              <line key={y} x1="-10" y1={y} x2="610" y2={y + 20} stroke="currentColor" strokeOpacity="0.25" strokeWidth="10" />
            ))}
            <line x1="-10" y1="160" x2="610" y2="180" className="stroke-amber-500/60" strokeWidth="12" />
            <text x="30" y="150" className="fill-muted-foreground text-[12px]">Rua dos Pinheiros</text>
            <text x="190" y="320" className="fill-muted-foreground text-[12px]">Rua Teodoro Sampaio</text>
          </svg>
          <div className="absolute top-[47%] left-[44%] -translate-x-1/2 -translate-y-full">
            <motion.span className="absolute top-full left-1/2 -ml-4 -mt-2 size-8 rounded-full bg-amber-500/40" animate={{ scale: [0.6, 1.8], opacity: [0.8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
            <div className="relative flex flex-col items-center">
              <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-medium whitespace-nowrap text-white shadow-lg">Casa Jabuticaba</span>
              <span className="-mt-1 size-3 rotate-45 bg-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full bg-foreground px-6 py-14 text-background">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl font-semibold">Casa Jabuticaba</div>
          <p className="mt-3 max-w-sm text-sm opacity-70">Cozinha brasileira de raiz, servida com calma. Receba o cardápio da estação no seu e-mail.</p>
          <form className="mt-5 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input aria-label="Seu e-mail" placeholder="seu@email.com" className="border-background/20 bg-background/10 text-background placeholder:text-background/50" />
            <Button type="submit" className="bg-amber-600 text-white hover:bg-amber-700">
              Assinar
            </Button>
          </form>
        </div>
        <FooterCol titulo="Visite">
          <li>Rua dos Pinheiros, 1.204</li>
          <li>Ter a sáb · 12h–23h</li>
          <li>Dom · 12h–17h</li>
        </FooterCol>
        <FooterCol titulo="Siga">
          <li className="flex items-center gap-2">
            <Instagram className="size-4" /> @casajabuticaba
          </li>
          <li>Eventos privados</li>
          <li>Trabalhe conosco</li>
        </FooterCol>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-background/15 pt-6 text-xs opacity-60 sm:flex-row sm:justify-between">
        <span>© 2026 Casa Jabuticaba Restaurante Ltda.</span>
        <span>Aceitamos Pix, cartões e vale-refeição</span>
      </div>
    </footer>
  )
}

function FooterCol({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-sm font-medium">{titulo}</div>
      <ul className="mt-3 space-y-2 text-sm opacity-70">{children}</ul>
    </div>
  )
}

export default function LandingDeRestaurante() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <Hero />
      <Cardapio />
      <Reservas />
      <Depoimentos />
      <Mapa />
      <Footer />
    </div>
  )
}
