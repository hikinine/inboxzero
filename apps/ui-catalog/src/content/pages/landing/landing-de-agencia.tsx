'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Mail, MapPin, MessageCircle, Minus, Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'

const NAV = ['Trabalhos', 'Serviços', 'Estúdio', 'Jornal']
const CLIENTES = ['Natura Fit', 'Banco Alto', 'Cervejaria Juá', 'Rede Mova', 'Café Serra', 'Lumi', 'Kavo', 'Prisma Dados']
const ESTATS: Array<[string, string]> = [
  ['12', 'anos de estúdio'],
  ['140+', 'projetos entregues'],
  ['9', 'prêmios de design'],
]
const ini = (s: string) => s.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

function VerticeNavbar() {
  return (
    <header className="w-full px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" className="text-sm font-bold uppercase tracking-[0.3em]">
          Vértice<sup className="ml-0.5 text-[9px]">®</sup>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <a href="#" className="group flex items-center gap-1.5 text-sm font-medium">
          Iniciar projeto <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  )
}

function Marquee() {
  const items = [...CLIENTES, ...CLIENTES]
  return (
    <div className="mt-16 overflow-hidden border-y py-5" aria-hidden>
      <motion.div className="flex w-max gap-12 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
        {items.map((c, i) => (
          <span key={`${c}-${i}`} className="flex items-center gap-12 text-xl font-semibold tracking-tight text-muted-foreground/60">
            {c} <span className="size-1.5 rounded-full bg-border" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function VerticeHero() {
  return (
    <section className="w-full px-6 pt-12 pb-16 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-500" /> Estúdio de design e tecnologia · São Paulo e Lisboa
        </p>
        <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl lg:text-[7.5rem]">
          Marcas que crescem.
          <br />
          <span className="font-serif font-normal italic text-muted-foreground">Produtos</span> que vendem.
        </h1>
        <div className="mt-12 grid gap-10 border-t pt-8 lg:grid-cols-[1.2fr_1fr]">
          <p className="max-w-xl text-lg text-muted-foreground">Somos 18 pessoas entre estrategistas, designers e engenheiros. Criamos marcas, sites e produtos digitais para empresas que querem sair do lugar-comum.</p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between lg:justify-end lg:gap-12">
            <dl className="grid grid-cols-3 gap-6">
              {ESTATS.map(([n, l]) => (
                <div key={l}>
                  <dd className="text-3xl font-semibold tracking-tight tabular-nums">{n}</dd>
                  <dt className="text-xs text-muted-foreground">{l}</dt>
                </div>
              ))}
            </dl>
            <Button size="lg" className="rounded-none">
              Ver trabalhos <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
      <Marquee />
    </section>
  )
}

const SERVICOS: Array<{ n: string; t: string; d: string; tags: string[] }> = [
  { n: '01', t: 'Branding', d: 'Posicionamento, identidade visual, naming e sistema de marca pronto para escalar em qualquer ponto de contato.', tags: ['Estratégia', 'Identidade', 'Naming', 'Brandbook'] },
  { n: '02', t: 'Sites e e-commerce', d: 'Sites institucionais e lojas rápidas, acessíveis e fáceis de editar, com CMS e integração de pagamentos.', tags: ['Next.js', 'Shopify', 'CMS', 'SEO'] },
  { n: '03', t: 'Produto digital', d: 'Pesquisa, UX e UI de apps e plataformas, do protótipo ao design system implementado com o seu time.', tags: ['Pesquisa', 'UX', 'Design system', 'Front-end'] },
  { n: '04', t: 'Conteúdo e motion', d: 'Campanhas, vídeos curtos e motion para redes sociais e lançamento de produto.', tags: ['Campanhas', 'Motion', 'Social', 'Fotografia'] },
]

function VerticeServicos() {
  const [open, setOpen] = useState(0)
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">O que fazemos</h2>
          <span className="hidden text-sm text-muted-foreground sm:block">Quatro frentes, um time só</span>
        </div>
        <ul className="mt-10 border-t">
          {SERVICOS.map((s, i) => {
            const on = open === i
            return (
              <li key={s.n} className="border-b">
                <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-6 py-6 text-left sm:gap-10">
                  <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
                  <span className={`flex-1 text-2xl font-medium tracking-tight transition-colors sm:text-4xl ${on ? '' : 'text-foreground/70'}`}>{s.t}</span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">{on ? <Minus className="size-4" /> : <Plus className="size-4" />}</span>
                </button>
                {on && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 pb-8 pl-10 sm:grid-cols-[2fr_1fr] sm:pl-[4.5rem]">
                    <p className="max-w-xl text-muted-foreground">{s.d}</p>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {s.tags.map((t) => (
                        <span key={t} className="h-fit rounded-full border px-3 py-1 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

type Cat = 'Branding' | 'Web' | 'Produto'
const PROJETOS: Array<{ t: string; c: Cat; y: string; tone: string; big?: boolean }> = [
  { t: 'Cervejaria Juá', c: 'Branding', y: '2026', tone: 'from-amber-300 to-orange-500', big: true },
  { t: 'Banco Alto · app', c: 'Produto', y: '2026', tone: 'from-slate-600 to-slate-900' },
  { t: 'Natura Fit · loja', c: 'Web', y: '2025', tone: 'from-emerald-300 to-teal-600' },
  { t: 'Rede Mova', c: 'Branding', y: '2025', tone: 'from-rose-300 to-pink-600' },
  { t: 'Café Serra · site', c: 'Web', y: '2025', tone: 'from-stone-300 to-stone-600', big: true },
  { t: 'Lumi · design system', c: 'Produto', y: '2024', tone: 'from-sky-300 to-indigo-600' },
]
const FILTROS: Array<Cat | 'Todos'> = ['Todos', 'Branding', 'Web', 'Produto']

function VerticeTrabalhos() {
  const [f, setF] = useState<Cat | 'Todos'>('Todos')
  const list = PROJETOS.filter((p) => f === 'Todos' || p.c === f)
  return (
    <section className="w-full bg-muted/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Trabalhos selecionados</h2>
          <div className="flex flex-wrap gap-2">
            {FILTROS.map((x) => (
              <button key={x} type="button" onClick={() => setF(x)} className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${f === x ? 'border-foreground bg-foreground text-background' : 'hover:border-foreground/40'}`}>
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <a key={p.t} href="#" className={`group relative overflow-hidden rounded-2xl ${p.big && f === 'Todos' ? 'lg:col-span-2' : ''}`}>
              <div className={`aspect-[4/3] w-full bg-gradient-to-br ${p.tone} transition-transform duration-500 group-hover:scale-[1.03]`} />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <div>
                  <div className="text-lg font-medium">{p.t}</div>
                  <div className="text-xs text-white/70">
                    {p.c} · {p.y}
                  </div>
                </div>
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const PROCESSO: Array<{ n: string; t: string; d: string; w: string }> = [
  { n: '1', t: 'Descoberta', d: 'Imersão no negócio, entrevistas com clientes e análise de concorrentes.', w: '1–2 semanas' },
  { n: '2', t: 'Estratégia', d: 'Posicionamento, arquitetura de marca ou de produto e plano de entregas.', w: '2 semanas' },
  { n: '3', t: 'Design', d: 'Conceito, iterações semanais com o seu time e protótipos testados com gente de verdade.', w: '4–8 semanas' },
  { n: '4', t: 'Lançamento', d: 'Implementação, QA, treinamento e acompanhamento dos primeiros 30 dias.', w: '2–4 semanas' },
]

function VerticeProcesso() {
  return (
    <section className="w-full bg-foreground px-6 py-20 text-background sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-background/60">Processo</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Sem mistério, com ritmo.</h2>
            <p className="mt-4 max-w-sm text-background/70">Projetos de 8 a 16 semanas, com entrega toda sexta e um canal direto com quem está fazendo.</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-background/15 sm:grid-cols-2">
            {PROCESSO.map((p) => (
              <li key={p.n} className="bg-foreground p-6">
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-semibold tracking-tighter text-background/30">{p.n}</span>
                  <span className="rounded-full border border-background/20 px-2.5 py-0.5 text-[11px] text-background/70">{p.w}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium">{p.t}</h3>
                <p className="mt-2 text-sm text-background/70">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

const DEPOS = [
  { n: 'Helena Barros', r: 'CMO · Cervejaria Juá', q: 'Chegamos com um logo e saímos com uma marca que o time inteiro sabe explicar. As vendas no e-commerce cresceram 38% no trimestre do relançamento.' },
  { n: 'Diego Tavares', r: 'Head de produto · Banco Alto', q: 'O design system que a Vértice entregou virou a base de três squads. Nunca mais discutimos botão.' },
  { n: 'Carla Menezes', r: 'Fundadora · Café Serra', q: 'Site no ar em cinco semanas e o pedido online dobrou. Equipe presente do começo ao fim.' },
]

function VerticeDepoimentos() {
  const [principal, ...outros] = DEPOS
  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.4fr_1fr]">
        <figure className="flex flex-col justify-between rounded-2xl border p-8 sm:p-12">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">“{principal.q}”</blockquote>
          <figcaption className="mt-10 flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback>{ini(principal.n)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{principal.n}</div>
              <div className="text-muted-foreground">{principal.r}</div>
            </div>
          </figcaption>
        </figure>
        <div className="grid gap-6">
          {outros.map((d) => (
            <figure key={d.n} className="flex flex-col justify-between rounded-2xl bg-muted/40 p-6">
              <blockquote className="text-sm leading-relaxed">“{d.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback>{ini(d.n)}</AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <div className="font-medium">{d.n}</div>
                  <div className="text-muted-foreground">{d.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function VerticeContato() {
  const [sent, setSent] = useState(false)
  return (
    <section className="w-full border-t px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Vamos conversar?</h2>
          <p className="mt-4 max-w-md text-muted-foreground">Conte o que você precisa. Respondemos em até um dia útil com próximos passos e uma estimativa honesta.</p>
          <ul className="mt-10 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" /> ola@vertice.studio
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-4 text-muted-foreground" /> +55 11 98877-1200 (WhatsApp)
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" /> Rua Aspicuelta, 422 · Vila Madalena, São Paulo
            </li>
          </ul>
        </div>
        <form
          className="grid gap-5 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="v-nome">Nome</Label>
            <Input id="v-nome" placeholder="Seu nome" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v-email">E-mail</Label>
            <Input id="v-email" type="email" placeholder="voce@empresa.com.br" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v-empresa">Empresa</Label>
            <Input id="v-empresa" placeholder="Nome da empresa" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="v-orc">Orçamento</Label>
            <NativeSelect id="v-orc" className="w-full" defaultValue="50-100">
              <NativeSelectOption value="ate-50">Até R$ 50 mil</NativeSelectOption>
              <NativeSelectOption value="50-100">R$ 50 a 100 mil</NativeSelectOption>
              <NativeSelectOption value="100-250">R$ 100 a 250 mil</NativeSelectOption>
              <NativeSelectOption value="250">Acima de R$ 250 mil</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="v-msg">Sobre o projeto</Label>
            <Textarea id="v-msg" rows={5} placeholder="O que você quer lançar, prazo e o que já existe hoje." />
          </div>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">{sent ? 'Briefing enviado. A Helena, nossa diretora de contas, responde em até 24 h.' : 'Ao enviar, você concorda com a nossa política de privacidade.'}</p>
            <Button type="submit" size="lg" className="rounded-none" disabled={sent}>
              {sent ? 'Enviado' : 'Enviar briefing'} <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

const FOOTER: Array<[string, string[]]> = [
  ['Social', ['Instagram', 'LinkedIn', 'Behance', 'YouTube']],
  ['Estúdio', ['Sobre', 'Carreiras', 'Jornal', 'Imprensa']],
  ['Legal', ['Privacidade', 'Termos']],
]

function VerticeFooter() {
  return (
    <footer className="w-full overflow-hidden border-t px-6 pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER.map(([t, links]) => (
              <div key={t}>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t}</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:underline">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <div>São Paulo · Lisboa</div>
            <div className="mt-1">ola@vertice.studio</div>
          </div>
        </div>
        <div className="mt-10 select-none text-[22vw] font-bold leading-none tracking-tighter text-muted-foreground/15 sm:text-[12rem]" aria-hidden>
          VÉRTICE
        </div>
        <div className="flex flex-col gap-2 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Vértice Estúdio Ltda.</span>
          <span>Feito com calma, entregue no prazo.</span>
        </div>
      </div>
    </footer>
  )
}

export default function LandingDeAgencia() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <VerticeNavbar />
      <VerticeHero />
      <VerticeServicos />
      <VerticeTrabalhos />
      <VerticeProcesso />
      <VerticeDepoimentos />
      <VerticeContato />
      <VerticeFooter />
    </div>
  )
}
