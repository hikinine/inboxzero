'use client'

import { Fragment, useState } from 'react'
import { ArrowRight, Check, Clock, Landmark, Menu, Minus, ShieldCheck, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const NAV = ['Recursos', 'Preços', 'Clientes', 'Ajuda']
const ini = (s: string) => s.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

function FaturaLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-md bg-emerald-600 text-sm font-bold text-white">F</span>
      Fatura Fácil
    </a>
  )
}

function FaturaNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <FaturaLogo />
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map((l, i) => (
            <a key={l} href="#" className={i === 1 ? 'font-medium' : 'text-muted-foreground hover:text-foreground'}>
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Entrar
          </Button>
          <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
            Criar conta
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  )
}

interface Plano {
  id: string
  name: string
  m: number
  y: number
  d: string
  f: string[]
  cta: string
  hot?: boolean
}

const PLANOS: Plano[] = [
  { id: 'essencial', name: 'Essencial', m: 29, y: 23, d: 'Para quem está começando a faturar.', f: ['Até 30 notas por mês', 'Cobrança por Pix e boleto', 'Lembretes automáticos de vencimento', 'Relatório mensal', 'Suporte por e-mail'], cta: 'Começar grátis' },
  { id: 'pro', name: 'Profissional', m: 79, y: 63, d: 'Para quem fatura todo dia.', f: ['Notas ilimitadas', 'Pix, boleto e cartão', 'Recorrência e parcelamento', 'Integração contábil', 'Até 5 usuários', 'Suporte por WhatsApp'], cta: 'Testar 14 dias grátis', hot: true },
]

function FaturaPlanos() {
  const [anual, setAnual] = useState(true)
  return (
    <section className="w-full px-6 pt-16 pb-16 sm:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="outline">Preços</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Dois planos. Zero letras miúdas.</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Emita notas, cobre por Pix e receba no mesmo dia. Comece grátis e só pague quando faturar.</p>
        <div className="mt-8 inline-flex items-center rounded-full border bg-muted/40 p-1 text-sm">
          <button type="button" onClick={() => setAnual(false)} className={`rounded-full px-4 py-1.5 transition-colors ${!anual ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>
            Mensal
          </button>
          <button type="button" onClick={() => setAnual(true)} className={`flex items-center gap-2 rounded-full px-4 py-1.5 transition-colors ${anual ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>
            Anual <span className="rounded-full bg-emerald-500/15 px-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">-20%</span>
          </button>
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {PLANOS.map((p) => (
          <div key={p.id} className={`flex flex-col rounded-3xl p-8 ${p.hot ? 'bg-foreground text-background' : 'border bg-card'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              {p.hot && <span className="rounded-full bg-background/15 px-2.5 py-0.5 text-xs">Mais popular</span>}
            </div>
            <p className={`mt-1 text-sm ${p.hot ? 'text-background/70' : 'text-muted-foreground'}`}>{p.d}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight tabular-nums">R$ {anual ? p.y : p.m}</span>
              <span className={`text-sm ${p.hot ? 'text-background/70' : 'text-muted-foreground'}`}>/mês</span>
            </div>
            <p className={`mt-1 text-xs ${p.hot ? 'text-background/60' : 'text-muted-foreground'}`}>{anual ? `R$ ${p.y * 12} cobrados por ano` : 'Cobrado mensalmente, sem fidelidade'}</p>
            <Button className="mt-6" size="lg" variant={p.hot ? 'secondary' : 'default'}>
              {p.cta} <ArrowRight data-icon="inline-end" />
            </Button>
            <ul className="mt-8 space-y-3 text-sm">
              {p.f.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className={`mt-0.5 size-4 shrink-0 ${p.hot ? 'text-emerald-400' : 'text-emerald-500'}`} /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

type Cel = boolean | string
const TABELA: Array<{ g: string; rows: Array<[string, Cel, Cel]> }> = [
  { g: 'Notas e cobranças', rows: [['Notas fiscais por mês', '30', 'Ilimitadas'], ['Cobrança por Pix e boleto', true, true], ['Cartão de crédito', false, true], ['Recorrência e parcelamento', false, true], ['Lembrete de vencimento', true, true]] },
  { g: 'Clientes e equipe', rows: [['Cadastro de clientes', '100', 'Ilimitado'], ['Usuários', '1', 'Até 5'], ['Portal do cliente', false, true]] },
  { g: 'Integrações', rows: [['Exportação para o contador', true, true], ['Integração contábil (Omie, Conta Azul)', false, true], ['API e webhooks', false, true]] },
  { g: 'Suporte', rows: [['E-mail', true, true], ['WhatsApp', false, true], ['Onboarding guiado', false, true]] },
]

function Valor({ v }: { v: Cel }) {
  if (v === true) return <Check className="mx-auto size-4 text-emerald-500" />
  if (v === false) return <Minus className="mx-auto size-4 text-muted-foreground/40" />
  return <span>{v}</span>
}

function FaturaTabela() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Compare os planos</h2>
          <p className="mt-3 text-muted-foreground">Tudo o que está incluso em cada um, sem surpresa na fatura.</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-1/2 pl-5">Recurso</TableHead>
                <TableHead className="text-center">Essencial</TableHead>
                <TableHead className="bg-muted/50 text-center font-semibold text-foreground">Profissional</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TABELA.map((g) => (
                <Fragment key={g.g}>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableCell colSpan={3} className="pl-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {g.g}
                    </TableCell>
                  </TableRow>
                  {g.rows.map(([n, a, b]) => (
                    <TableRow key={n}>
                      <TableCell className="pl-5">{n}</TableCell>
                      <TableCell className="text-center text-sm">
                        <Valor v={a} />
                      </TableCell>
                      <TableCell className="bg-muted/50 text-center text-sm">
                        <Valor v={b} />
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}

const DEPOS = [
  { n: 'Renata Albuquerque', r: 'Arquiteta autônoma · Recife', q: 'Antes eu perdia uma tarde por mês com notas. Agora emito em 30 segundos e o Pix cai na hora.' },
  { n: 'Marcos Vinícius', r: 'Sócio · MV Contabilidade', q: 'Indico para todos os meus clientes MEI. A exportação chega certinha, sem retrabalho.' },
  { n: 'Juliana Prado', r: 'Fundadora · Studio Prado', q: 'A cobrança recorrente resolveu minha inadimplência. Clientes recebem o lembrete e pagam sem eu precisar cobrar.' },
]

function FaturaDepoimentos() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-0.5 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">4,9 de 5 em mais de 1.200 avaliações</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Autônomos, pequenos negócios e contadores que trocaram a planilha pelo Fatura Fácil.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPOS.map((d) => (
            <figure key={d.n} className="flex flex-col rounded-2xl border bg-card p-6">
              <blockquote className="flex-1 text-sm leading-relaxed">“{d.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{ini(d.n)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{d.n}</div>
                  <div className="text-xs text-muted-foreground">{d.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const GARANTIAS = [
  { Icon: Clock, t: '14 dias grátis', d: 'Teste o Profissional sem cartão de crédito.' },
  { Icon: ShieldCheck, t: 'Cancele quando quiser', d: 'Sem multa, sem ligação de retenção.' },
  { Icon: Landmark, t: 'Dados no Brasil', d: 'Servidores em São Paulo e conformidade com a LGPD.' },
]

function FaturaGarantias() {
  return (
    <section className="w-full border-t px-6 py-14">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {GARANTIAS.map((g) => (
          <div key={g.t} className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <g.Icon className="size-5" />
            </span>
            <div>
              <div className="font-medium">{g.t}</div>
              <div className="text-sm text-muted-foreground">{g.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FaturaFooter() {
  return (
    <footer className="w-full border-t bg-muted/30 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <FaturaLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Recursos', 'Preços', 'Ajuda', 'Privacidade', 'Termos'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span className="text-xs">© 2026 Fatura Fácil Tecnologia Ltda.</span>
      </div>
    </footer>
  )
}

export default function PaginaDePricingSimples() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <FaturaNavbar />
      <FaturaPlanos />
      <FaturaTabela />
      <FaturaDepoimentos />
      <FaturaGarantias />
      <FaturaFooter />
    </div>
  )
}
