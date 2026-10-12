'use client'

import { useState } from 'react'
import { ArrowRight, Bot, Check, Inbox, KanbanSquare, LineChart, Menu, MessageSquare, Play, ShieldCheck, Sparkles, Star, Workflow, Zap } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'

const NAV_LINKS = ['Produto', 'Soluções', 'Preços', 'Clientes', 'Docs']
const ini = (s: string) => s.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

function FluxoLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Zap className="size-4" />
      </span>
      Fluxo
    </a>
  )
}

function FluxoNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <FluxoLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">
            Começar grátis <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Fluxo</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((l) => (
                <a key={l} href="#" className="rounded-md px-3 py-2 text-sm hover:bg-muted">
                  {l}
                </a>
              ))}
              <Button className="mt-4">Começar grátis</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const CONVERSAS = [
  { n: 'Marina Castro', c: 'WhatsApp', p: 'Consigo parcelar em 12x?', t: '09:41', unread: true },
  { n: 'Grupo Vitória', c: 'Instagram', p: 'Manda a proposta atualizada', t: '09:33', unread: true },
  { n: 'Rafael Nunes', c: 'E-mail', p: 'Re: contrato anual', t: '08:57', unread: false },
  { n: 'Dona Flor Doces', c: 'WhatsApp', p: 'Obrigada! Fechado então', t: 'ontem', unread: false },
]

function FluxoHero() {
  return (
    <section className="relative w-full overflow-hidden px-6 pt-20 pb-16 sm:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Badge variant="outline" className="gap-1.5 py-1">
          <Sparkles className="size-3" /> Novo: agente de IA que responde em 8 segundos
        </Badge>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">Todas as conversas de venda num só lugar.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          WhatsApp, Instagram e e-mail num inbox compartilhado, com IA que qualifica, pipeline visual e automações que fecham negócio enquanto você dorme.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">
            Começar grátis por 14 dias <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            <Play data-icon="inline-start" /> Ver demonstração
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <AvatarGroup>
            {['MC', 'RN', 'LP', 'JA'].map((n) => (
              <Avatar key={n} size="sm">
                <AvatarFallback>{n}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+3k</AvatarGroupCount>
          </AvatarGroup>
          <span>
            <strong className="text-foreground">3.200+</strong> times vendem com o Fluxo
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl">
          <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">app.fluxo.com.br/inbox</span>
          </div>
          <div className="grid min-h-[380px] grid-cols-[52px_1fr] md:grid-cols-[52px_280px_1fr]">
            <div className="flex flex-col items-center gap-3 border-r py-4">
              {[Inbox, KanbanSquare, Bot, LineChart].map((I, i) => (
                <span key={i} className={`flex size-8 items-center justify-center rounded-lg ${i === 0 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                  <I className="size-4" />
                </span>
              ))}
            </div>
            <div className="hidden border-r md:block">
              <div className="flex items-center justify-between border-b px-4 py-3 text-sm font-medium">
                Conversas <Badge variant="secondary">12</Badge>
              </div>
              {CONVERSAS.map((c) => (
                <div key={c.n} className={`flex items-start gap-3 border-b px-4 py-3 text-left ${c.unread ? 'bg-muted/50' : ''}`}>
                  <Avatar size="sm">
                    <AvatarFallback>{ini(c.n)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">{c.n}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{c.t}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="rounded bg-muted px-1 py-px text-[10px]">{c.c}</span>
                      <span className="truncate">{c.p}</span>
                    </div>
                  </div>
                  {c.unread && <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
                </div>
              ))}
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-3 border-b px-4 py-3">
                <Avatar size="sm">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">Marina Castro</div>
                  <div className="text-xs text-muted-foreground">WhatsApp · atribuída a você</div>
                </div>
                <Badge variant="outline" className="hidden sm:inline-flex">
                  Proposta enviada
                </Badge>
              </div>
              <div className="flex-1 space-y-3 p-4 text-sm">
                <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">Oi! Vi o plano Growth no site. Consigo parcelar em 12x?</p>
                <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">Consegue sim, Marina! Em 12x fica R$ 24,75 por mês. Quer que eu gere o link?</p>
                <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2">Quero! Pode mandar.</p>
                <div className="rounded-xl border border-dashed p-3">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <Bot className="size-3.5 text-muted-foreground" /> Sugestão da IA · intenção de compra alta
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Enviar link de pagamento e mover o negócio para “Fechamento”.</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="xs">Aplicar</Button>
                    <Button size="xs" variant="ghost">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t p-3">
                <div className="h-8 flex-1 rounded-lg border bg-background px-3 text-xs leading-8 text-muted-foreground">Escreva uma mensagem…</div>
                <Button size="sm">Enviar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const LOGOS = ['Nuvem Fit', 'Kavo', 'Prisma Dados', 'Lumi', 'Casa Mina', 'Trilha Log']

function FluxoLogos() {
  return (
    <section className="w-full border-y bg-muted/30 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Confiado por times de venda em todo o Brasil</p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {LOGOS.map((l) => (
            <div key={l} className="flex items-center justify-center text-lg font-semibold tracking-tight text-muted-foreground/70">
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FluxoFeatures() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Funcionalidades</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que um time de vendas por mensagem precisa</h2>
          <p className="mt-3 text-muted-foreground">Sem gambiarras com planilha, sem trocar de aba. O Fluxo cuida da fila, da IA e do funil.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Inbox className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Inbox unificado</h3>
            <p className="mt-1 text-sm text-muted-foreground">WhatsApp, Instagram, e-mail e chat do site numa fila só, com atribuição automática e fila justa.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['WhatsApp', 'Instagram', 'E-mail', 'Chat do site', 'Telegram', 'Messenger'].map((c, i) => (
                <span key={c} className={`rounded-full border px-3 py-1 text-xs ${i < 4 ? 'bg-background' : 'border-dashed text-muted-foreground'}`}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Bot className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-medium">IA que qualifica</h3>
            <p className="mt-1 text-sm text-muted-foreground">Resume a conversa, detecta a intenção e sugere a próxima ação.</p>
            <div className="mt-5 space-y-2">
              {[
                ['Intenção', 'Compra', 92],
                ['Urgência', 'Alta', 78],
                ['Orçamento', 'Definido', 64],
              ].map(([k, v, p]) => (
                <div key={String(k)} className="text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <KanbanSquare className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Pipeline visual</h3>
            <p className="mt-1 text-sm text-muted-foreground">Arraste negócios entre etapas e veja o funil fechar.</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ['Novo', 3],
                ['Proposta', 2],
                ['Fechado', 1],
              ].map(([t, n]) => (
                <div key={String(t)} className="space-y-1.5">
                  <div className="text-[10px] font-medium uppercase text-muted-foreground">{t}</div>
                  {Array.from({ length: Number(n) }).map((_, i) => (
                    <div key={i} className="h-7 rounded-md border bg-background" />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Workflow className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Automações sem código</h3>
            <p className="mt-1 text-sm text-muted-foreground">Follow-up, lembrete, etiqueta e transferência de dono — disparados por gatilhos que você escolhe.</p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              {['Lead sem resposta há 2h', 'Enviar lembrete', 'Esperar 1 dia', 'Marcar “frio”'].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-2">
                  <span className={`rounded-lg border px-3 py-1.5 ${i === 0 ? 'border-primary bg-primary/5 font-medium' : 'bg-background'}`}>{s}</span>
                  {i < arr.length - 1 && <ArrowRight className="size-3 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="mt-4 text-lg font-medium">LGPD e permissões</h3>
            <p className="mt-1 text-sm text-muted-foreground">Papéis por equipe, trilha de auditoria e dados hospedados no Brasil.</p>
            <ul className="mt-5 space-y-1.5 text-xs">
              {['Criptografia em repouso', 'Exclusão sob demanda', 'Logs de acesso'].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="size-3.5 text-emerald-500" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { n: '01', t: 'Conecte seus canais', d: 'Leia um QR code, autorize o Instagram e aponte o e-mail. Leva 5 minutos.' },
  { n: '02', t: 'Convide o time', d: 'Defina papéis, equipes e a regra de distribuição das conversas.' },
  { n: '03', t: 'Deixe a IA trabalhar', d: 'Ela qualifica, sugere respostas e move o negócio no funil. Você fecha.' },
]

function FluxoComoFunciona() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Como funciona</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">No ar em uma tarde, não em um trimestre</h2>
        </div>
        <ol className="relative mt-12 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" aria-hidden />
          {STEPS.map((s) => (
            <li key={s.n} className="relative">
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full border bg-background text-sm font-semibold">{s.n}</span>
              <h3 className="mt-5 text-lg font-medium">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const PLANS = [
  { name: 'Start', m: 97, y: 77, d: 'Para começar a vender por mensagem.', f: ['1 número de WhatsApp', '3 usuários', 'Pipeline básico', 'Suporte por e-mail'], hot: false },
  { name: 'Growth', m: 297, y: 237, d: 'Para times que precisam de IA e automação.', f: ['3 números + Instagram', '15 usuários', 'IA de qualificação', 'Automações ilimitadas', 'Relatórios avançados'], hot: true },
  { name: 'Scale', m: 797, y: 637, d: 'Para operações com várias equipes.', f: ['Canais ilimitados', 'Usuários ilimitados', 'API e webhooks', 'SSO e auditoria', 'Gerente de conta'], hot: false },
]

function FluxoPricing() {
  const [yearly, setYearly] = useState(true)
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Preços</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Um plano para cada tamanho de time</h2>
          <p className="mt-3 text-muted-foreground">Sem taxa de implantação. Cancele quando quiser.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Label htmlFor="fluxo-billing" className={!yearly ? 'text-foreground' : 'text-muted-foreground'}>
              Mensal
            </Label>
            <Switch id="fluxo-billing" checked={yearly} onCheckedChange={(v) => setYearly(Boolean(v))} />
            <Label htmlFor="fluxo-billing" className={yearly ? 'text-foreground' : 'text-muted-foreground'}>
              Anual{' '}
              <Badge variant="secondary" className="ml-1">
                2 meses grátis
              </Badge>
            </Label>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 ${p.hot ? 'border-primary shadow-lg ring-1 ring-primary' : 'bg-card'}`}>
              {p.hot && <Badge className="absolute -top-3 left-6">Mais escolhido</Badge>}
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.d}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tabular-nums">R$ {yearly ? p.y : p.m}</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <Button className="mt-6" variant={p.hot ? 'default' : 'outline'}>
                Assinar {p.name}
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.f.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QUOTES = [
  { n: 'Letícia Prado', r: 'Head comercial · Nuvem Fit', q: 'Em duas semanas o tempo médio de resposta caiu de 3 horas para 9 minutos. A IA pega o que a gente deixava passar de madrugada.' },
  { n: 'João Almeida', r: 'Fundador · Kavo', q: 'Antes era planilha + 4 celulares. Hoje cada vendedor vê só a fila dele e eu vejo o funil inteiro. Simples assim.' },
  { n: 'Camila Rocha', r: 'Gerente de vendas · Prisma Dados', q: 'As automações de follow-up recuperaram R$ 60 mil em propostas que estavam paradas no primeiro mês.' },
]

function FluxoDepoimentos() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Clientes</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem usa, recomenda</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.n} className="flex flex-col rounded-2xl border bg-card p-6">
              <div className="flex gap-0.5 text-amber-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed">“{q.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{ini(q.n)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{q.n}</div>
                  <div className="text-xs text-muted-foreground">{q.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQ: Array<[string, string]> = [
  ['Preciso trocar meu número de WhatsApp?', 'Não. Você conecta o número que já usa, inclusive o WhatsApp Business. A migração mantém o histórico.'],
  ['A IA responde sozinha para o cliente?', 'Só se você quiser. Por padrão ela sugere e o vendedor aprova. Você pode liberar respostas automáticas por etapa ou horário.'],
  ['Quantas pessoas podem atender ao mesmo tempo?', 'Depende do plano, mas todas no mesmo número — cada uma vê a própria fila e o gestor vê tudo.'],
  ['Tem integração com meu ERP ou CRM?', 'Sim. Integrações nativas com os principais sistemas e API aberta com webhooks para o restante.'],
  ['Como funciona o teste grátis?', '14 dias com todos os recursos do Growth, sem cartão. No fim você escolhe o plano ou simplesmente para de usar.'],
]

function FluxoFaq() {
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Dúvidas</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
        </div>
        <Accordion className="mt-10 rounded-2xl border bg-card px-6" defaultValue={[FAQ[0][0]]}>
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-4 text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function FluxoCta() {
  return (
    <section className="w-full px-6 pb-20 sm:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-background sm:px-16">
        <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/40 blur-3xl" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Comece a vender por mensagem hoje.</h2>
            <p className="mt-3 max-w-xl text-background/70">Crie sua conta, conecte o WhatsApp e atenda o primeiro cliente antes do café esfriar.</p>
          </div>
          <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="seu@empresa.com.br" className="h-10 border-background/20 bg-background/10 text-background placeholder:text-background/50" aria-label="E-mail" />
            <Button type="submit" size="lg" variant="secondary" className="h-10">
              Criar conta <ArrowRight data-icon="inline-end" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

const FOOTER_COLS: Array<[string, string[]]> = [
  ['Produto', ['Inbox', 'Pipeline', 'Automações', 'IA', 'Relatórios']],
  ['Empresa', ['Sobre', 'Carreiras', 'Clientes', 'Imprensa']],
  ['Recursos', ['Documentação', 'API', 'Status', 'Comunidade']],
  ['Legal', ['Privacidade', 'Termos', 'LGPD']],
]

function FluxoFooter() {
  return (
    <footer className="w-full border-t bg-background px-6 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <FluxoLogo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Vendas por mensagem, do primeiro “oi” ao contrato assinado.</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MessageSquare className="size-3.5" /> Suporte humano, de segunda a sábado
            </div>
          </div>
          {FOOTER_COLS.map(([t, links]) => (
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
          <span>© 2026 Fluxo Tecnologia Ltda. CNPJ 12.345.678/0001-90</span>
          <span>São Paulo, SP</span>
        </div>
      </div>
    </footer>
  )
}

export default function LandingSaasCompleta() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <FluxoNavbar />
      <FluxoHero />
      <FluxoLogos />
      <FluxoFeatures />
      <FluxoComoFunciona />
      <FluxoPricing />
      <FluxoDepoimentos />
      <FluxoFaq />
      <FluxoCta />
      <FluxoFooter />
    </div>
  )
}
