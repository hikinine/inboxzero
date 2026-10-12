'use client'

import { ArrowRight, ArrowUpRight, HeartHandshake, MapPin, Menu, ShieldCheck, Sparkles, Stethoscope, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Produto', 'Clientes', 'Sobre', 'Carreiras', 'Blog']

function LumenLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Stethoscope className="size-4" />
      </span>
      Lumen
    </a>
  )
}

function LumenNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <LumenLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${l === 'Sobre' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" className="hidden md:inline-flex">
          Agendar demonstração
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Lumen</SheetTitle>
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

function LumenMissao() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nossa missão</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Tecnologia para quem cuida de gente.</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            A Lumen nasceu em 2019 dentro de uma clínica de família em Curitiba, cansada de agenda em papel e prontuário perdido. Hoje somos o sistema de gestão de mais de 1.200 clínicas e consultórios no Brasil.
          </p>
          <p className="mt-4 text-muted-foreground">Acreditamos que cada minuto que a recepção não gasta com burocracia é um minuto a mais de atenção para o paciente.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>
              Conheça o produto <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="outline">Ver vagas abertas</Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-muted via-muted to-muted-foreground/25" />
          <div className="absolute -bottom-6 -left-4 max-w-xs rounded-2xl border bg-card p-5 shadow-xl sm:-left-8">
            <p className="text-sm leading-relaxed">“Nunca mais procurei um prontuário. O tempo que sobra vai para conversar com o paciente.”</p>
            <div className="mt-3 text-xs text-muted-foreground">Dra. Helena Marques · Clínica Viver, Curitiba</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const STATS: Array<[string, string]> = [
  ['1.200+', 'clínicas atendidas'],
  ['4,8 mi', 'consultas por ano'],
  ['98%', 'de renovação anual'],
  ['140', 'pessoas no time'],
]

function LumenNumeros() {
  return (
    <section className="w-full border-y bg-muted/30 px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map(([n, l]) => (
          <div key={l} className="text-center md:text-left">
            <div className="text-4xl font-semibold tracking-tight tabular-nums">{n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const TIMELINE: Array<[string, string, string]> = [
  ['2019', 'Nasce a Lumen', 'Três sócios, uma clínica e a primeira agenda digital rodando num notebook na recepção.'],
  ['2020', 'Teleconsulta em 3 semanas', 'A pandemia acelerou tudo: lançamos vídeo, receita digital e pagamento online para 50 clínicas.'],
  ['2021', 'Série A de R$ 40 milhões', 'Investimento para expandir o time de produto e abrir o escritório em São Paulo.'],
  ['2022', 'App do paciente', 'Confirmação por WhatsApp, resultados de exames e histórico na mão do paciente.'],
  ['2024', '1.000 clínicas', 'Chegamos a mil clientes ativos e à certificação SBIS de prontuário eletrônico.'],
  ['2026', 'América Latina', 'Primeiras clínicas no Chile e na Colômbia, com o mesmo time de suporte em português e espanhol.'],
]

function LumenTimeline() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nossa história</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Sete anos construindo com quem atende</h2>
          <p className="mt-4 text-muted-foreground">Cada funcionalidade nasceu de uma conversa com recepcionistas, médicos e gestores. Alguns marcos do caminho.</p>
        </div>
        <ol className="relative border-l pl-8">
          {TIMELINE.map(([y, t, d], i) => (
            <li key={y} className={i < TIMELINE.length - 1 ? 'pb-10' : ''}>
              <span className={`absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 border-background ${i === TIMELINE.length - 1 ? 'bg-primary' : 'bg-muted-foreground/60'}`} />
              <div className="text-xs font-semibold tabular-nums text-muted-foreground">{y}</div>
              <h3 className="mt-1 text-lg font-medium">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const TEAM: Array<[string, string, string]> = [
  ['Ana Beatriz Lopes', 'CEO e cofundadora', 'from-rose-400 to-orange-300'],
  ['Carlos Eduardo Dias', 'CTO e cofundador', 'from-sky-400 to-indigo-400'],
  ['Mariana Teixeira', 'Diretora de produto', 'from-emerald-400 to-teal-300'],
  ['Felipe Andrade', 'Head de engenharia', 'from-amber-400 to-yellow-300'],
  ['Juliana Costa', 'Head de sucesso do cliente', 'from-violet-400 to-fuchsia-300'],
  ['Rodrigo Pereira', 'Diretor comercial', 'from-slate-400 to-slate-300'],
  ['Patrícia Nogueira', 'Diretora médica', 'from-pink-400 to-rose-300'],
  ['Lucas Martins', 'Head de design', 'from-cyan-400 to-sky-300'],
]
const ini = (s: string) => s.split(' ').map((p) => p[0]).slice(0, 2).join('')

function LumenEquipe() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Liderança</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem toca a Lumen no dia a dia</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            Conheça o time todo <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map(([n, r, g]) => (
            <div key={n}>
              <div className={`flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br text-3xl font-semibold text-white ${g}`}>{ini(n)}</div>
              <div className="mt-3 text-sm font-medium">{n}</div>
              <div className="text-xs text-muted-foreground">{r}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const VALUES = [
  { Icon: HeartHandshake, t: 'Paciente no centro', d: 'Toda decisão de produto começa pela pergunta: isso melhora a vida de quem está na sala de espera?' },
  { Icon: ShieldCheck, t: 'Privacidade por padrão', d: 'Dados de saúde são sagrados. Criptografia, auditoria e LGPD não são feature, são o mínimo.' },
  { Icon: Sparkles, t: 'Simplicidade radical', d: 'Se a recepção precisa de treinamento para usar, a gente ainda não terminou.' },
  { Icon: Users, t: 'Time de verdade', d: 'Suporte por telefone com gente que já trabalhou em clínica. Sem robô, sem fila.' },
]

function LumenValores() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Valores</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O que não negociamos</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <v.Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-medium">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const JOBS: Array<[string, string, string]> = [
  ['Engenheira(o) de software sênior', 'Engenharia', 'Remoto · Brasil'],
  ['Designer de produto', 'Design', 'Híbrido · São Paulo'],
  ['Especialista em sucesso do cliente', 'Atendimento', 'Híbrido · Curitiba'],
]

function LumenVagas() {
  return (
    <section className="w-full px-6 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-card">
        <div className="grid lg:grid-cols-[1fr_1.2fr]">
          <div className="bg-foreground p-8 text-background sm:p-12">
            <Badge variant="secondary">Estamos contratando</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Vem cuidar de quem cuida</h2>
            <p className="mt-3 text-background/70">Time remoto-first com encontros trimestrais, plano de saúde desde o primeiro dia e orçamento anual de estudos.</p>
            <Button variant="secondary" className="mt-6">
              Ver todas as vagas <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <ul className="divide-y">
            {JOBS.map(([t, a, l]) => (
              <li key={t} className="flex items-center justify-between gap-4 p-6">
                <div>
                  <div className="font-medium">{t}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline">{a}</Badge>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {l}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label={`Ver vaga ${t}`}>
                  <ArrowUpRight />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function LumenFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <LumenLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Produto', 'Clientes', 'Carreiras', 'Imprensa', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Lumen Saúde Ltda. · Curitiba, PR</span>
      </div>
    </footer>
  )
}

export default function PaginaSobre() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <LumenNavbar />
      <LumenMissao />
      <LumenNumeros />
      <LumenTimeline />
      <LumenEquipe />
      <LumenValores />
      <LumenVagas />
      <LumenFooter />
    </div>
  )
}
