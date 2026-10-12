'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, BookOpen, ChartBar, Check, CircleHelp, Code, FileText, Languages, Lock, Menu, MessageSquare, Plug, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Produto', 'Casos de uso', 'Preços', 'Docs', 'Blog']
const LOGOS = ['Kavo', 'Banco Alto', 'Trilha Log', 'Dona Flor', 'Mova Saúde', 'Prisma Dados']

function SinteseLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
        <Sparkles className="size-4" />
      </span>
      Síntese
    </a>
  )
}

function SinteseNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-4">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border bg-background/80 px-5 shadow-sm backdrop-blur">
        <SinteseLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="rounded-full">
            Entrar
          </Button>
          <Button size="sm" className="rounded-full">
            Testar grátis <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Síntese</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
              <Button className="mt-4">Testar grátis</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const BEAMS = [
  { left: '6%', delay: 0, duration: 6 },
  { left: '22%', delay: 1.6, duration: 7.5 },
  { left: '38%', delay: 0.5, duration: 5.5 },
  { left: '54%', delay: 2.4, duration: 8 },
  { left: '70%', delay: 1.1, duration: 6.5 },
  { left: '86%', delay: 3, duration: 7 },
]

function Beams() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {BEAMS.map((b) => (
        <span key={b.left} className="absolute inset-y-0 w-px bg-border/70" style={{ left: b.left }}>
          <motion.span
            className="absolute left-0 top-0 h-40 w-px bg-gradient-to-b from-transparent via-violet-500 to-fuchsia-500"
            initial={{ y: '-160px' }}
            animate={{ y: ['-160px', '720px'] }}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' }}
          />
        </span>
      ))}
      <div className="absolute left-1/2 top-16 size-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

const FONTES = [
  { n: 'Política de reembolso.pdf', t: 'PDF · 12 páginas', ok: true },
  { n: 'Central de ajuda', t: 'Site · 184 artigos', ok: true },
  { n: 'Tickets resolvidos', t: 'Zendesk · 9.420', ok: true },
  { n: 'Manual do produto', t: 'Notion · sincronizando', ok: false },
]

function TypingDots() {
  return (
    <span className="inline-flex gap-1" aria-label="Digitando">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
      ))}
    </span>
  )
}

function ChatMockup() {
  return (
    <div className="relative mx-auto mt-14 w-full max-w-4xl">
      <div className="absolute -inset-1 -z-10 rounded-[28px] bg-gradient-to-r from-violet-500/30 via-fuchsia-500/20 to-sky-500/30 blur-xl" aria-hidden />
      <div className="grid overflow-hidden rounded-2xl border bg-card shadow-2xl md:grid-cols-[1fr_260px]">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <div className="text-sm font-medium">Assistente da Kavo</div>
              <div className="text-xs text-muted-foreground">Responde em pt-BR · 4 fontes conectadas</div>
            </div>
            <Badge variant="secondary" className="hidden gap-1.5 sm:inline-flex">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Online
            </Badge>
          </div>
          <div className="flex-1 space-y-4 p-4 text-left text-sm">
            <div className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-primary-foreground">Qual o prazo de reembolso para pedidos internacionais?</p>
            </div>
            <div className="flex gap-3">
              <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                <Sparkles className="size-3.5" />
              </span>
              <div className="max-w-[85%] space-y-2">
                <p className="rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 leading-relaxed">
                  Para pedidos internacionais, o reembolso é processado em até <strong>10 dias úteis</strong> após a aprovação da devolução. O valor volta no mesmo método de pagamento. Taxas de importação não são reembolsáveis.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Política de reembolso · p. 3', 'Central de ajuda · Internacional'].map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                      <FileText className="size-3" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-primary-foreground">E se o produto chegou com defeito?</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted">
                <Sparkles className="size-3.5" />
              </span>
              <div className="rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5">
                <TypingDots />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t p-3">
            <div className="h-9 flex-1 rounded-lg border bg-background px-3 text-left text-xs leading-9 text-muted-foreground">Pergunte qualquer coisa…</div>
            <Button size="sm">Enviar</Button>
          </div>
        </div>
        <aside className="hidden border-l bg-muted/30 p-4 text-left md:block">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Fontes conectadas</div>
          <ul className="mt-3 space-y-2.5">
            {FONTES.map((f) => (
              <li key={f.n} className="flex items-start gap-2.5 text-xs">
                <span className={`mt-1 size-2 shrink-0 rounded-full ${f.ok ? 'bg-emerald-500' : 'animate-pulse bg-amber-500'}`} />
                <div className="min-w-0">
                  <div className="truncate font-medium">{f.n}</div>
                  <div className="text-muted-foreground">{f.t}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-lg border bg-background p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Precisão esta semana</span>
              <span className="font-semibold tabular-nums">97,4%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full w-[97%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
            </div>
            <p className="mt-2 text-muted-foreground">1.284 respostas · 33 escaladas para humano</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SinteseHero() {
  return (
    <section className="relative isolate w-full overflow-hidden px-6 pt-20 pb-12 sm:pt-28">
      <Beams />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Badge variant="outline" className="gap-2 rounded-full bg-background py-1 pl-1.5 pr-3">
          <span className="rounded-full bg-violet-500/15 px-1.5 py-px text-[10px] font-semibold text-violet-700 dark:text-violet-300">Novo</span>
          Síntese 2.0 com memória de longo prazo
        </Badge>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">Respostas certas, em segundos, com os dados da sua empresa.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Conecte documentos, tickets e o seu site. A Síntese responde clientes e colaboradores citando a fonte — sem inventar, sem treinar modelo.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="rounded-full">
            Criar assistente grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-background">
            Falar com vendas
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Sem cartão · 200 respostas grátis por mês · Dados hospedados no Brasil</p>
      </div>
      <ChatMockup />
    </section>
  )
}

const NUMEROS: Array<[string, string]> = [
  ['2,4 mi', 'respostas por mês'],
  ['97%', 'resolvidas sem humano'],
  ['9 s', 'tempo médio de resposta'],
]

function SinteseProva() {
  return (
    <section className="w-full border-y bg-muted/30 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:justify-between">
        <dl className="grid grid-cols-3 gap-8 text-center lg:text-left">
          {NUMEROS.map(([n, l]) => (
            <div key={l}>
              <dd className="text-2xl font-semibold tabular-nums">{n}</dd>
              <dt className="text-xs text-muted-foreground">{l}</dt>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-semibold tracking-tight text-muted-foreground/60">
          {LOGOS.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

const DOCS: Array<{ n: string; p: number }> = [
  { n: 'Política de reembolso.pdf', p: 100 },
  { n: 'Central de ajuda · 184 artigos', p: 100 },
  { n: 'casabrisa.com.br', p: 62 },
]
const GUARDRAILS = ['Só responde com fonte citada', 'Escala para humano quando não sabe', 'Mascara CPF, cartão e e-mail', 'Recusa temas fora do escopo']
const CANAIS = ['WhatsApp', 'Widget do site', 'Slack', 'E-mail', 'Instagram', 'Telegram']
const USO = [42, 58, 51, 73, 66, 88, 94]
const CODE = ["import { Sintese } from '@sintese/sdk'", "const bot = new Sintese({ key: 'sk_live_…' })", "await bot.ask('Qual o prazo de reembolso?')"]

function Cell({ Icon, title, desc, className = '', children }: { Icon: LucideIcon; title: string; desc: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`flex flex-col rounded-2xl border bg-card p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5" />
        </span>
      </div>
      {children}
    </div>
  )
}

function SinteseBento() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">Plataforma</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Um assistente que conhece o seu negócio</h2>
          <p className="mt-3 text-muted-foreground">Da ingestão dos documentos ao atendimento no WhatsApp, tudo com controle de qualidade embutido.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <Cell Icon={BookOpen} title="Treine com o que você já tem" desc="Arraste PDFs, conecte o Drive, a Central de Ajuda e o seu site. A indexação roda sozinha e avisa quando algo muda." className="md:col-span-4">
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {DOCS.map((d) => (
                <div key={d.n} className="rounded-lg border bg-background p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate font-medium">{d.n}</span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: `${d.p}%` }} />
                  </div>
                  <div className="mt-1 text-muted-foreground">{d.p === 100 ? 'Indexado' : `${d.p}% · indexando`}</div>
                </div>
              ))}
            </div>
          </Cell>
          <Cell Icon={ShieldCheck} title="Guardrails" desc="Regras que a IA não pode quebrar." className="md:col-span-2">
            <ul className="mt-5 space-y-2.5 text-sm">
              {GUARDRAILS.map((g) => (
                <li key={g} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">{g}</span>
                  <span className="relative h-4 w-7 shrink-0 rounded-full bg-emerald-500" aria-hidden>
                    <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-white" />
                  </span>
                </li>
              ))}
            </ul>
          </Cell>
          <Cell Icon={Plug} title="Onde o cliente está" desc="Um assistente, todos os canais." className="md:col-span-2">
            <div className="mt-5 flex flex-wrap gap-2">
              {CANAIS.map((c, i) => (
                <span key={c} className={`rounded-full border px-3 py-1 text-xs ${i < 4 ? 'bg-background' : 'border-dashed text-muted-foreground'}`}>
                  {c}
                </span>
              ))}
            </div>
          </Cell>
          <Cell Icon={ChartBar} title="Análises" desc="Resolução automática, últimos 7 dias." className="md:col-span-2">
            <div className="mt-5 flex h-24 items-end gap-1.5">
              {USO.map((v, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-violet-500/80" style={{ height: `${v}%` }} />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>seg</span>
              <span>dom</span>
            </div>
          </Cell>
          <Cell Icon={Languages} title="12 idiomas e uma API" desc="Responde no idioma da pergunta." className="md:col-span-2">
            <div className="mt-4 flex gap-1.5">
              {['PT', 'ES', 'EN', 'FR'].map((l) => (
                <span key={l} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium">
                  {l}
                </span>
              ))}
            </div>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-foreground p-3 font-mono text-[11px] leading-relaxed text-background">
              <code>{CODE.join('\n')}</code>
            </pre>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Code className="size-3.5" /> SDK em JavaScript, Python e Go
            </div>
          </Cell>
        </div>
      </div>
    </section>
  )
}

interface Plano {
  id: string
  name: string
  price: string
  per: string
  d: string
  f: string[]
  hot?: boolean
}

const PLANOS: Plano[] = [
  { id: 'starter', name: 'Starter', price: 'R$ 0', per: 'para sempre', d: 'Para testar com um canal.', f: ['200 respostas por mês', '1 assistente', '5 fontes', 'Widget do site'] },
  { id: 'pro', name: 'Pro', price: 'R$ 349', per: '/mês', d: 'Para times de suporte em crescimento.', f: ['5.000 respostas por mês', '3 assistentes', 'Fontes ilimitadas', 'WhatsApp e Slack', 'Escalação para humano'], hot: true },
  { id: 'business', name: 'Business', price: 'R$ 1.290', per: '/mês', d: 'Para operações com SLA.', f: ['25.000 respostas por mês', 'Assistentes ilimitados', 'SSO e auditoria', 'API e webhooks', 'Gerente de sucesso'] },
]

function SintesePricing() {
  const [sel, setSel] = useState('pro')
  const atual = PLANOS.find((p) => p.id === sel)
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">Preços</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pague pelo que a IA resolve</h2>
          <p className="mt-3 text-muted-foreground">Cobrança por resposta, não por assento. Escolha um plano para ver o que está incluso.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PLANOS.map((p) => {
            const on = sel === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSel(p.id)}
                aria-pressed={on}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 text-left transition-all ${on ? 'border-violet-500 shadow-lg ring-1 ring-violet-500' : 'hover:border-foreground/30'}`}
              >
                {p.hot && <Badge className="absolute -top-3 left-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">Mais escolhido</Badge>}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{p.name}</h3>
                  <span className={`flex size-5 items-center justify-center rounded-full border ${on ? 'border-violet-500 bg-violet-500 text-white' : ''}`}>{on && <Check className="size-3" />}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tabular-nums">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.per}</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.f.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-violet-500" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-card p-5 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Plano selecionado: <strong className="text-foreground">{atual?.name}</strong> · sem fidelidade, cancele quando quiser.
          </p>
          <Button className="rounded-full">
            Começar com o {atual?.name} <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  )
}

const FAQ: Array<[string, string]> = [
  ['A Síntese inventa respostas?', 'Não. Ela só responde com base nas fontes conectadas e cita de onde tirou. Se não encontra, diz que não sabe e oferece escalar para um humano.'],
  ['Meus dados treinam o modelo de alguém?', 'Não. Seus documentos ficam isolados por conta, criptografados e hospedados no Brasil. Nada é usado para treinar modelos.'],
  ['Quanto tempo leva para colocar no ar?', 'Uns 10 minutos: suba um PDF ou cole o link do site, teste no playground e copie o widget para a sua página.'],
  ['Funciona no WhatsApp?', 'Sim, a partir do plano Pro. Conectamos ao seu número oficial via API do WhatsApp Business em poucos cliques.'],
  ['E quando a IA não sabe responder?', 'Ela transfere a conversa para a sua equipe com um resumo do que foi perguntado e das fontes consultadas.'],
  ['Posso mudar de plano depois?', 'Quando quiser. O upgrade vale na hora e o downgrade entra na próxima fatura, sem multa.'],
]

function SinteseFaq() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">Dúvidas</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
            <p className="mt-3 text-muted-foreground">Não achou o que procurava? Fale com a gente pelo chat — sim, é a Síntese respondendo.</p>
            <Button variant="outline" className="mt-6 rounded-full">
              <MessageSquare data-icon="inline-start" /> Abrir chat
            </Button>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2">
            {FAQ.map(([q, a]) => (
              <div key={q}>
                <dt className="flex items-start gap-2 font-medium">
                  <CircleHelp className="mt-0.5 size-4 shrink-0 text-violet-500" /> {q}
                </dt>
                <dd className="mt-2 pl-6 text-sm text-muted-foreground">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function SinteseCta() {
  return (
    <section className="w-full px-6 pb-20 sm:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 px-6 py-16 text-center text-white sm:px-16">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" aria-hidden />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Seu primeiro assistente no ar em 10 minutos.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">Suba um PDF, cole o link do seu site e veja a Síntese responder. Sem cartão, sem call de vendas.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="secondary" className="rounded-full">
              Criar assistente grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">
              Ver documentação
            </Button>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-white/70">
            <Lock className="size-3.5" /> LGPD, criptografia em repouso e servidores em São Paulo
          </p>
        </div>
      </div>
    </section>
  )
}

const FOOTER: Array<[string, string[]]> = [
  ['Produto', ['Assistentes', 'Fontes', 'Canais', 'Análises', 'Preços']],
  ['Desenvolvedores', ['Documentação', 'API', 'SDKs', 'Status']],
  ['Empresa', ['Sobre', 'Blog', 'Carreiras', 'Contato']],
  ['Legal', ['Privacidade', 'Termos', 'LGPD', 'Segurança']],
]

function SinteseFooter() {
  return (
    <footer className="w-full border-t px-6 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <SinteseLogo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">IA de atendimento que cita a fonte. Feita em Florianópolis, usada no Brasil inteiro.</p>
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
          <span>© 2026 Síntese Inteligência Ltda. CNPJ 45.120.398/0001-07</span>
          <span>Florianópolis, SC</span>
        </div>
      </div>
    </footer>
  )
}

export default function LandingDeProdutoDeIa() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <SinteseNavbar />
      <SinteseHero />
      <SinteseProva />
      <SinteseBento />
      <SintesePricing />
      <SinteseFaq />
      <SinteseCta />
      <SinteseFooter />
    </div>
  )
}
