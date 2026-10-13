'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  Apple,
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  BellRing,
  ChartLine,
  CreditCard,
  Delete,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Play,
  ScanFace,
  ShieldCheck,
  Signal,
  Star,
  Target,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Logo({ invertido = false }: { invertido?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
      <span className={cn('relative flex size-8 items-center justify-center overflow-hidden rounded-full', invertido ? 'bg-background' : 'bg-indigo-600')}>
        <span className={cn('absolute -bottom-2 size-6 rounded-full', invertido ? 'bg-indigo-600' : 'bg-indigo-300')} />
        <span className={cn('absolute top-1.5 size-2 rounded-full', invertido ? 'bg-indigo-600' : 'bg-white')} />
      </span>
      brisa
    </a>
  )
}

function Navbar() {
  return (
    <header className="w-full px-6">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {['Conta', 'Cartão', 'Investimentos', 'Segurança', 'Ajuda'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
          Abrir conta grátis
        </Button>
      </div>
    </header>
  )
}

function Celular({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative w-[230px] shrink-0 rounded-[2.4rem] border-[6px] border-foreground/90 bg-background p-1 shadow-2xl', className)}>
      <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground/90" />
      <div className="h-[460px] overflow-hidden rounded-[1.9rem] bg-background">
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-medium">
          9:41
          <span className="flex items-center gap-1">
            <Signal className="size-3" />
            <Wifi className="size-3" />
            <BatteryFull className="size-3.5" />
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

function TelaInicio() {
  const [oculto, setOculto] = useState(false)
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">Olá, Marina</div>
        <BellRing className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-4 rounded-2xl bg-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between text-[11px] opacity-80">
          Saldo disponível
          <button type="button" onClick={() => setOculto((o) => !o)} aria-label={oculto ? 'Mostrar saldo' : 'Ocultar saldo'}>
            {oculto ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
        </div>
        <div className="mt-1 text-2xl font-semibold tabular-nums">{oculto ? 'R$ ••••••' : 'R$ 8.426,90'}</div>
        <div className="mt-1 text-[11px] opacity-80">+ R$ 61,20 de rendimento no mês</div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[10px]">
        {[
          [ArrowLeftRight, 'Pix'],
          [CreditCard, 'Cartão'],
          [ChartLine, 'Investir'],
          [Target, 'Metas'],
        ].map(([I, l]) => {
          const Icone = I as LucideIcon
          return (
            <div key={l as string} className="flex flex-col items-center gap-1">
              <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Icone className="size-4" />
              </span>
              {l as string}
            </div>
          )
        })}
      </div>
      <div className="mt-5 text-xs font-medium">Hoje</div>
      <ul className="mt-2 space-y-2.5 text-[11px]">
        {[
          ['Salário · Lumen Tech', '+ R$ 6.800,00', true],
          ['Mercado Pão de Mel', '− R$ 214,37', false],
          ['Pix para João Pedro', '− R$ 80,00', false],
          ['Conta de luz · Enel', '− R$ 162,90', false],
        ].map(([n, v, entrada]) => (
          <li key={n as string} className="flex items-center gap-2">
            <span className={cn('flex size-7 items-center justify-center rounded-full', entrada ? 'bg-emerald-500/15 text-emerald-600' : 'bg-muted text-muted-foreground')}>
              {entrada ? <ArrowDownLeft className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
            </span>
            <span className="flex-1 truncate">{n as string}</span>
            <span className={cn('font-medium tabular-nums', entrada && 'text-emerald-600')}>{v as string}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TelaPix() {
  return (
    <div className="flex h-[420px] flex-col px-4 pt-4">
      <div className="text-xs text-muted-foreground">Pix para</div>
      <div className="mt-2 flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback className="bg-amber-500/15 text-[10px] text-amber-700">JP</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">João Pedro Lima</div>
          <div className="text-[10px] text-muted-foreground">Banco Inter · ***.482.391-**</div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="text-[11px] text-muted-foreground">Valor</div>
        <div className="text-4xl font-semibold tabular-nums">R$ 80,00</div>
        <Badge variant="secondary" className="mt-2 text-[10px]">
          Sem tarifa
        </Badge>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-y-2 pb-3 text-center text-lg">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0'].map((k) => (
          <span key={k} className="py-1">
            {k}
          </span>
        ))}
        <span className="flex items-center justify-center">
          <Delete className="size-4" />
        </span>
      </div>
      <div className="rounded-full bg-indigo-600 py-2.5 text-center text-xs font-medium text-white">Enviar Pix</div>
    </div>
  )
}

function TelaInvestimentos() {
  return (
    <div className="px-4 pt-4">
      <div className="text-xs text-muted-foreground">Seu patrimônio</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">R$ 42.180,55</div>
      <div className="text-[11px] font-medium text-emerald-600">+ 12,4% em 12 meses</div>
      <svg viewBox="0 0 200 90" className="mt-4 w-full" aria-hidden>
        <defs>
          <linearGradient id="brisa-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="text-indigo-500">
          <path d="M0 75 C 20 70, 30 72, 45 62 S 75 58, 90 50 S 120 46, 135 36 S 170 26, 200 12 L200 90 L0 90 Z" fill="url(#brisa-area)" />
          <motion.path
            d="M0 75 C 20 70, 30 72, 45 62 S 75 58, 90 50 S 120 46, 135 36 S 170 26, 200 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.6 }}
          />
        </g>
      </svg>
      <ul className="mt-4 space-y-2 text-[11px]">
        {[
          ['Caixinha Viagem', '110% CDI', 'R$ 6.200', 'bg-sky-500'],
          ['Tesouro Selic 2029', '14,9% a.a.', 'R$ 18.400', 'bg-indigo-500'],
          ['CDB Brisa', '105% CDI', 'R$ 12.500', 'bg-violet-500'],
          ['Reserva', 'Liquidez diária', 'R$ 5.080', 'bg-emerald-500'],
        ].map(([n, t, v, c]) => (
          <li key={n} className="flex items-center gap-2 rounded-xl border p-2">
            <span className={cn('h-7 w-1 rounded-full', c)} />
            <span className="flex-1">
              <span className="block font-medium">{n}</span>
              <span className="text-muted-foreground">{t}</span>
            </span>
            <span className="font-medium tabular-nums">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-6 pt-14 sm:pt-20">
      <div className="pointer-events-none absolute top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-violet-500/25 to-sky-400/25 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1">
          <span className="mr-1 size-1.5 rounded-full bg-emerald-500" /> Rende 110% do CDI desde o primeiro real
        </Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">Dinheiro leve como uma brisa.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Conta digital, cartão sem anuidade e investimentos automáticos num app só. Sem tarifa, sem letra miúda, sem fila.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
            Abrir minha conta <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full">
            Conhecer o cartão
          </Button>
        </div>
      </div>
      <div className="relative mx-auto mt-16 flex h-[420px] max-w-4xl items-start justify-center sm:h-[480px]">
        <motion.div className="absolute hidden sm:block" initial={{ opacity: 0, x: 0, rotate: 0 }} animate={{ opacity: 1, x: -230, y: 50, rotate: -9 }} transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 16 }}>
          <Celular>
            <TelaPix />
          </Celular>
        </motion.div>
        <motion.div className="absolute hidden sm:block" initial={{ opacity: 0, x: 0, rotate: 0 }} animate={{ opacity: 1, x: 230, y: 50, rotate: 9 }} transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 16 }}>
          <Celular>
            <TelaInvestimentos />
          </Celular>
        </motion.div>
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 70, damping: 16 }}>
          <Celular className="w-[250px]">
            <TelaInicio />
          </Celular>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  )
}

const FEATURES = [
  { tag: 'Pix', titulo: 'Pix agendado, recorrente e por aproximação', texto: 'Programe o aluguel todo dia 5, divida a conta do bar e pague encostando o celular. Tudo sem tarifa.', Icon: ArrowLeftRight, cor: 'from-sky-500 to-indigo-500' },
  { tag: 'Cartão', titulo: 'Cartão sem anuidade com 1% de volta', texto: 'Cashback que cai na conta no dia seguinte. Cartão virtual novo a cada compra online, se você quiser.', Icon: CreditCard, cor: 'from-violet-500 to-fuchsia-500' },
  { tag: 'Metas', titulo: 'Caixinhas que guardam sozinhas', texto: 'Arredonde as compras, guarde parte do salário e acompanhe cada meta com previsão de quando vai chegar lá.', Icon: Target, cor: 'from-emerald-500 to-teal-500' },
]

function Features() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que um banco deveria ser</h2>
          <p className="mt-3 text-muted-foreground">E nada do que te irrita nele.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.tag} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group overflow-hidden rounded-3xl border bg-card">
              <div className={cn('relative flex h-40 items-center justify-center bg-gradient-to-br', f.cor)}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_60%)]" />
                <motion.span whileHover={{ rotate: -8, scale: 1.08 }} className="relative flex size-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur">
                  <f.Icon className="size-8" />
                </motion.span>
              </div>
              <div className="p-6">
                <Badge variant="secondary">{f.tag}</Badge>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{f.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.texto}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SEGURANCA: Array<{ Icon: LucideIcon; titulo: string; texto: string }> = [
  { Icon: ScanFace, titulo: 'Biometria facial', texto: 'Transferências acima de R$ 500 pedem seu rosto.' },
  { Icon: KeyRound, titulo: 'Modo rua', texto: 'Limite menor automático fora de casa, de noite.' },
  { Icon: Lock, titulo: 'Criptografia ponta a ponta', texto: 'Seus dados trafegam e ficam cifrados.' },
  { Icon: BellRing, titulo: 'Alerta em tempo real', texto: 'Cada centavo que sai vira notificação.' },
]

function Seguranca() {
  return (
    <section className="w-full bg-foreground px-6 py-20 text-background sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto flex size-72 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute inset-0 rounded-full border border-background/20" animate={{ scale: [0.5, 1.15], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i, ease: 'easeOut' }} />
          ))}
          <span className="relative flex size-28 items-center justify-center rounded-[2rem] bg-indigo-600 shadow-2xl shadow-indigo-600/40">
            <ShieldCheck className="size-14 text-white" />
          </span>
        </div>
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-indigo-300">Segurança</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Seu dinheiro protegido em camadas</h2>
          <p className="mt-4 max-w-lg opacity-70">Instituição autorizada pelo Banco Central e saldo coberto pelo FGC até R$ 250 mil.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {SEGURANCA.map((s) => (
              <div key={s.titulo} className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/10">
                  <s.Icon className="size-5" />
                </span>
                <div>
                  <div className="font-medium">{s.titulo}</div>
                  <p className="text-sm opacity-60">{s.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const DEPOIMENTOS = [
  { nome: 'Thiago Martins', ini: 'TM', cidade: 'Porto Alegre', texto: 'Larguei o banco tradicional depois de 12 anos. Economizo R$ 59 por mês só de tarifa.', nota: 5 },
  { nome: 'Fernanda Costa', ini: 'FC', cidade: 'Salvador', texto: 'As caixinhas me fizeram guardar para a viagem sem nem perceber. Já fui e voltei de Lisboa!', nota: 5 },
  { nome: 'Rodrigo Alves', ini: 'RA', cidade: 'Goiânia', texto: 'O modo rua me salvou quando roubaram meu celular no centro. Bloqueei tudo pelo computador.', nota: 5 },
  { nome: 'Aline Barbosa', ini: 'AB', cidade: 'Manaus', texto: 'Atendimento por chat responde em minutos, de verdade. E o cashback cai no dia seguinte.', nota: 4 },
  { nome: 'Lucas Ribeiro', ini: 'LR', cidade: 'São Paulo', texto: 'Uso o Pix recorrente para pagar a diarista e o aluguel. Nunca mais esqueci.', nota: 5 },
  { nome: 'Juliana Freitas', ini: 'JF', cidade: 'Curitiba', texto: 'O gráfico de gastos por categoria abriu meus olhos para o quanto eu gastava com delivery.', nota: 5 },
]

function Depoimentos() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-amber-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">4,9 de 5 com 210 mil avaliações</h2>
        </div>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {DEPOIMENTOS.map((d) => (
            <figure key={d.nome} className="mb-4 break-inside-avoid rounded-2xl border bg-card p-5">
              <div className="flex text-amber-500">
                {Array.from({ length: d.nota }, (_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed">“{d.texto}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-2.5">
                <Avatar size="sm">
                  <AvatarFallback className="bg-indigo-500/15 text-[10px] text-indigo-700 dark:text-indigo-300">{d.ini}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{d.nome}</span>
                <span className="text-xs text-muted-foreground">· {d.cidade}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const QR = [
  '1111111010111111',
  '1000001011100001',
  '1011101001101101',
  '1011101110101101',
  '1000001010100001',
  '1111111010111111',
  '0000000011000000',
  '1101011100110110',
  '0110100111001011',
  '1011011010110100',
  '0000000101101011',
  '1111111001010110',
  '1000001011011001',
  '1011101100110111',
  '1000001011001010',
  '1111111010110101',
]

function Download() {
  return (
    <section className="w-full px-6 pb-20 sm:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 px-8 py-14 text-white sm:px-14">
        <div className="absolute -right-20 -bottom-24 size-80 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Baixe e abra sua conta em 4 minutos.</h2>
            <p className="mt-4 max-w-md text-white/75">Só precisa do seu documento e de uma selfie. O cartão chega em até 7 dias úteis.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                [Apple, 'Baixar na', 'App Store'],
                [Play, 'Disponível no', 'Google Play'],
              ].map(([I, s, b]) => {
                const Icone = I as LucideIcon
                return (
                  <a key={b as string} href="#" className="flex items-center gap-3 rounded-xl bg-black/80 px-4 py-2.5 transition-colors hover:bg-black">
                    <Icone className="size-6" />
                    <span className="leading-tight">
                      <span className="block text-[10px] opacity-70">{s as string}</span>
                      <span className="block text-sm font-semibold">{b as string}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-5 justify-self-start md:justify-self-end">
            <div className="rounded-2xl bg-white p-3 shadow-xl">
              <svg viewBox="0 0 16 16" className="size-32 text-indigo-950" shapeRendering="crispEdges" aria-label="QR code para baixar o app">
                {QR.flatMap((linha, y) => linha.split('').map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)))}
              </svg>
            </div>
            <div className="max-w-[9rem] text-sm text-white/80">Aponte a câmera do celular para baixar</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-xs text-muted-foreground">
            Brisa Instituição de Pagamento S.A. · CNPJ 38.204.117/0001-62 · Autorizada pelo Banco Central do Brasil. Ouvidoria 0800 591 2040.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          {[
            ['Produtos', ['Conta', 'Cartão', 'Investimentos']],
            ['Ajuda', ['Central de ajuda', 'Tarifas', 'Ouvidoria']],
            ['Empresa', ['Sobre', 'Carreiras', 'Imprensa']],
          ].map(([t, ls]) => (
            <div key={t as string}>
              <div className="font-medium">{t as string}</div>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                {(ls as string[]).map((l) => (
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
      </div>
    </footer>
  )
}

export default function LandingDeAppDeFinancas() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <Seguranca />
      <Depoimentos />
      <Download />
      <Footer />
    </div>
  )
}
