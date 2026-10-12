'use client'

import { useState, type ReactNode } from 'react'
import { Apple, ArrowRight, ArrowUpRight, Bell, ChevronLeft, ChevronRight, CreditCard, Leaf, Lock, Menu, PiggyBank, Play, Plus, QrCode, ShoppingBag, Smartphone, Sparkles, Star, Target, TrendingUp, Utensils, Wallet, type LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Recursos', 'Segurança', 'Planos', 'Ajuda']

function KayaLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Leaf className="size-4" />
      </span>
      Kaya
    </a>
  )
}

function StoreButton({ Icon, small, big }: { Icon: LucideIcon; small: string; big: string }) {
  return (
    <a href="#" className="inline-flex items-center gap-2.5 rounded-xl bg-foreground px-4 py-2.5 text-background transition hover:opacity-90">
      <Icon className="size-6" />
      <span className="leading-tight">
        <small className="block text-[10px] opacity-70">{small}</small>
        <b className="block text-sm font-semibold">{big}</b>
      </span>
    </a>
  )
}

function Phone({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-[260px] rounded-[2.4rem] border-[6px] border-foreground/90 bg-background shadow-2xl ${className}`}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground/90" aria-hidden />
      <div className="h-[520px] overflow-hidden rounded-[2rem] bg-background pt-9">{children}</div>
    </div>
  )
}

function KayaNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <KayaLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" className="hidden rounded-full bg-emerald-600 text-white hover:bg-emerald-600/90 md:inline-flex">
          <Smartphone data-icon="inline-start" /> Baixar o app
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Kaya</SheetTitle>
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
    </header>
  )
}

const TX = [
  { Icon: Utensils, t: 'Padaria Santa Clara', c: 'Alimentação', v: '- R$ 24,90' },
  { Icon: ShoppingBag, t: 'Mercado Bom Preço', c: 'Mercado', v: '- R$ 212,35' },
  { Icon: Wallet, t: 'Salário · Prisma Dados', c: 'Renda', v: '+ R$ 6.800,00', pos: true },
]

function HomeScreen() {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] text-muted-foreground">Bom dia,</div>
          <div className="text-sm font-semibold">Marina</div>
        </div>
        <span className="flex size-7 items-center justify-center rounded-full bg-muted">
          <Bell className="size-3.5" />
        </span>
      </div>
      <div className="mt-4 rounded-2xl bg-emerald-600 p-4 text-white">
        <div className="text-[11px] opacity-80">Saldo total</div>
        <div className="mt-1 text-2xl font-semibold tabular-nums">R$ 8.432,10</div>
        <div className="mt-2 flex items-center gap-1 text-[11px]">
          <TrendingUp className="size-3" /> +12% em relação a setembro
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px] text-muted-foreground">
        {[
          [Plus, 'Pagar'],
          [ArrowUpRight, 'Pix'],
          [QrCode, 'Cobrar'],
          [CreditCard, 'Cartão'],
        ].map(([I, l], i) => {
          const Icon = I as LucideIcon
          return (
            <div key={i}>
              <span className="mx-auto flex size-9 items-center justify-center rounded-xl bg-muted text-foreground">
                <Icon className="size-4" />
              </span>
              <div className="mt-1">{String(l)}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="font-medium">Gastos da semana</span>
        <span className="text-muted-foreground">R$ 980</span>
      </div>
      <div className="mt-2 flex h-14 items-end gap-1.5">
        {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
          <div key={i} className={`flex-1 rounded-t ${i === 5 ? 'bg-emerald-600' : 'bg-emerald-500/40'}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-4 space-y-2.5">
        {TX.map((t) => (
          <div key={t.t} className="flex items-center gap-2.5 text-xs">
            <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
              <t.Icon className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{t.t}</div>
              <div className="text-[10px] text-muted-foreground">{t.c}</div>
            </div>
            <span className={`tabular-nums ${t.pos ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{t.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function KayaHero() {
  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="size-3" /> Novo: metas compartilhadas com a família
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Seu dinheiro, organizado sem esforço.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            A Kaya conecta todos os seus bancos e cartões, categoriza cada gasto automaticamente e avisa antes de você estourar o orçamento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <StoreButton Icon={Apple} small="Baixar na" big="App Store" />
            <StoreButton Icon={Play} small="Disponível no" big="Google Play" />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </span>
              <strong className="text-foreground">4,9</strong> · 43 mil avaliações
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="size-3.5" /> Open Finance regulado pelo Banco Central
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden />
          <Phone className="relative rotate-[-4deg]">
            <HomeScreen />
          </Phone>
        </div>
      </div>
    </section>
  )
}

const CATS = [
  ['Padaria Santa Clara', 'Alimentação', 'bg-amber-500'],
  ['Uber', 'Transporte', 'bg-sky-500'],
  ['Netflix', 'Assinaturas', 'bg-rose-500'],
  ['Farmácia Vida', 'Saúde', 'bg-emerald-500'],
]
const GOALS = [
  ['Viagem para Fortaleza', 72, 'R$ 3.600 de R$ 5.000'],
  ['Reserva de emergência', 45, 'R$ 9.000 de R$ 20.000'],
  ['Notebook novo', 90, 'R$ 5.400 de R$ 6.000'],
]

function KayaFeatures() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl space-y-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Categorização automática</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Cada gasto no lugar certo, sem você digitar nada</h2>
            <p className="mt-4 text-muted-foreground">A Kaya lê a transação, reconhece o estabelecimento e classifica em segundos. Errou? Corrija uma vez e ela aprende para sempre.</p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            {CATS.map(([t, c, tone]) => (
              <div key={t} className="flex items-center gap-3 border-b py-3 last:border-0">
                <span className={`size-2.5 rounded-full ${tone}`} />
                <span className="flex-1 text-sm font-medium">{t}</span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5 lg:order-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Target className="size-4" /> Suas metas
            </div>
            <div className="mt-4 space-y-4">
              {GOALS.map(([t, v, h]) => (
                <div key={String(t)}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{t}</span>
                    <span className="tabular-nums text-muted-foreground">{v}%</span>
                  </div>
                  <Progress value={Number(v)} className="mt-1.5" />
                  <div className="mt-1 text-xs text-muted-foreground">{h}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:order-2">
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Metas</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Guarde para o que importa, no piloto automático</h2>
            <p className="mt-4 text-muted-foreground">Defina um objetivo e a Kaya separa um pouco toda semana. Você acompanha o progresso e recebe um aviso quando chegar lá.</p>
          </div>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Contas e cartões</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Todos os bancos numa tela só</h2>
            <p className="mt-4 text-muted-foreground">Conecte via Open Finance e veja saldo, fatura e limite de cada conta lado a lado — atualizados várias vezes por dia.</p>
          </div>
          <div className="relative h-60">
            {[
              ['Banco Horizonte', 'Final 4821', 'R$ 3.210,00', 'from-slate-700 to-slate-900', 'left-0 top-0 rotate-[-6deg]'],
              ['Cartão Aurora', 'Final 0193', 'Fatura R$ 1.480,55', 'from-emerald-600 to-emerald-800', 'left-10 top-12 rotate-[2deg]'],
              ['Conta Kaya', 'Rende 102% do CDI', 'R$ 4.102,10', 'from-amber-500 to-orange-700', 'left-20 top-24 rotate-[8deg]'],
            ].map(([n, s, v, grad, pos]) => (
              <div key={n} className={`absolute h-36 w-64 rounded-2xl bg-gradient-to-br p-4 text-white shadow-xl ${grad} ${pos}`}>
                <div className="flex items-center justify-between text-xs opacity-80">
                  <span>{n}</span>
                  <CreditCard className="size-4" />
                </div>
                <div className="mt-8 text-lg font-semibold tabular-nums">{v}</div>
                <div className="text-xs opacity-80">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const SCREENS: Array<[string, string]> = [
  ['Início', 'Saldo, gastos da semana e últimas transações'],
  ['Extrato', 'Todas as contas num só extrato, com busca'],
  ['Metas', 'Objetivos com aporte automático'],
  ['Cartões', 'Fatura, limite e melhor dia de compra'],
  ['Relatórios', 'Para onde o dinheiro foi, mês a mês'],
]

function MiniScreen({ index }: { index: number }) {
  const bars = [30, 55, 45, 80, 60]
  return (
    <div className="px-3 pt-1">
      <div className="h-2 w-16 rounded bg-muted" />
      {index === 0 && (
        <div className="mt-3 rounded-xl bg-emerald-600 p-3 text-white">
          <div className="h-2 w-10 rounded bg-white/40" />
          <div className="mt-2 text-base font-semibold">R$ 8.432</div>
        </div>
      )}
      {index === 1 && (
        <div className="mt-3 space-y-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-6 rounded-md bg-muted" />
              <span className="h-2 flex-1 rounded bg-muted" />
              <span className="h-2 w-8 rounded bg-muted" />
            </div>
          ))}
        </div>
      )}
      {index === 2 && (
        <div className="mt-3 space-y-3">
          {[72, 45, 90].map((v, i) => (
            <div key={i}>
              <div className="h-2 w-20 rounded bg-muted" />
              <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
      {index === 3 && (
        <div className="mt-3 space-y-2">
          {['from-slate-700 to-slate-900', 'from-emerald-600 to-emerald-800', 'from-amber-500 to-orange-700'].map((g) => (
            <div key={g} className={`h-16 rounded-xl bg-gradient-to-br ${g}`} />
          ))}
        </div>
      )}
      {index === 4 && (
        <div className="mt-3">
          <div className="flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-emerald-500/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-3 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="h-2 flex-1 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function KayaTelas() {
  const [i, setI] = useState(0)
  const prev = () => setI((v) => (v - 1 + SCREENS.length) % SCREENS.length)
  const next = () => setI((v) => (v + 1) % SCREENS.length)
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Telas</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Um app que você vai gostar de abrir</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Tela anterior" onClick={prev}>
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" aria-label="Próxima tela" onClick={next}>
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="mt-10 overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${i} * (200px + 1.5rem)))` }}>
            {SCREENS.map(([t, d], idx) => (
              <div key={t} className={`w-[200px] shrink-0 transition-opacity ${idx === i ? 'opacity-100' : 'opacity-50'}`}>
                <div className="mx-auto w-[200px] rounded-[2rem] border-[5px] border-foreground/90 bg-background shadow-lg">
                  <div className="h-[340px] overflow-hidden rounded-[1.6rem] pt-5">
                    <MiniScreen index={idx} />
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex gap-1.5">
          {SCREENS.map((s, idx) => (
            <button key={s[0]} type="button" aria-label={`Ir para ${s[0]}`} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-6 bg-foreground' : 'w-1.5 bg-muted-foreground/40'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

const REVIEWS = [
  { n: 'Paula S.', s: 'App Store', t: 'Finalmente parei de usar planilha. A categorização acerta quase tudo e as metas me fizeram guardar R$ 4 mil em 5 meses.' },
  { n: 'Diego M.', s: 'Google Play', t: 'Conectei 3 bancos em 2 minutos. O aviso de fatura alta já me salvou de juros duas vezes.' },
  { n: 'Renata L.', s: 'App Store', t: 'Bonito, rápido e sem propaganda. O plano gratuito já resolve a vida de quem tem uma conta só.' },
]

function KayaAvaliacoes() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [Apple, 'App Store', '4,9', '12,4 mil avaliações', 'Escolha dos editores'],
            [Play, 'Google Play', '4,8', '31 mil avaliações', 'Mais de 1 milhão de downloads'],
          ].map(([I, store, nota, qtd, tag]) => {
            const Icon = I as LucideIcon
            return (
              <div key={String(store)} className="flex items-center gap-5 rounded-2xl border bg-card p-6">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background">
                  <Icon className="size-7" />
                </span>
                <div>
                  <div className="text-sm text-muted-foreground">{String(store)}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-semibold tabular-nums">{String(nota)}</span>
                    <span className="flex gap-0.5 text-amber-500">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {String(qtd)} · {String(tag)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <div key={r.n} className="rounded-2xl border bg-card p-6">
              <div className="flex gap-0.5 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed">“{r.t}”</p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <Avatar size="sm">
                  <AvatarFallback>{r.n[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{r.n}</span>
                <span className="text-muted-foreground">· {r.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function KayaDownload() {
  const cells = Array.from({ length: 64 }, (_, i) => (i * 7919) % 5 < 2)
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-3xl bg-emerald-600 px-8 py-12 text-white sm:px-14 lg:grid-cols-[1.4fr_auto]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Baixe a Kaya e comece em 2 minutos.</h2>
          <p className="mt-3 max-w-lg text-white/80">Grátis para uma conta. Sem cartão de crédito, sem pegadinha. Aponte a câmera para o código ou escolha a sua loja.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StoreButton Icon={Apple} small="Baixar na" big="App Store" />
            <StoreButton Icon={Play} small="Disponível no" big="Google Play" />
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-white/80">
            <PiggyBank className="size-4" /> Mais de 1,2 milhão de pessoas já economizam com a Kaya
          </div>
        </div>
        <div className="mx-auto rounded-2xl bg-white p-3 shadow-xl">
          <div className="grid size-40 grid-cols-8 gap-0.5" aria-label="QR code ilustrativo">
            {cells.map((on, i) => (
              <span key={i} className={`rounded-[2px] ${on ? 'bg-slate-900' : 'bg-transparent'}`} />
            ))}
          </div>
          <div className="mt-2 text-center text-[11px] font-medium text-slate-700">kaya.app/baixar</div>
        </div>
      </div>
    </section>
  )
}

function KayaFooter() {
  return (
    <footer className="w-full border-t bg-background px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <KayaLogo />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {['Recursos', 'Segurança', 'Planos', 'Ajuda', 'Privacidade', 'Termos'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          Trabalhe conosco <ArrowRight className="size-3.5" />
        </a>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-xs text-muted-foreground">© 2026 Kaya Finanças S.A. · Instituição de pagamento autorizada pelo Banco Central do Brasil.</p>
    </footer>
  )
}

export default function LandingDeAppMobile() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <KayaNavbar />
      <KayaHero />
      <KayaFeatures />
      <KayaTelas />
      <KayaAvaliacoes />
      <KayaDownload />
      <KayaFooter />
    </div>
  )
}
