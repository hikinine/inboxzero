'use client'

import { useState } from 'react'
import { ArrowRight, Clock, Menu, Activity } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Produto', 'Preços', 'Blog', 'Comunidade']
const CATEGORIES = ['Todos', 'Cultura', 'Recrutamento', 'Gestão', 'Remoto', 'Produto'] as const
type Category = (typeof CATEGORIES)[number]

interface Post {
  title: string
  excerpt: string
  category: Exclude<Category, 'Todos'>
  author: string
  date: string
  read: string
  tone: string
}

const FEATURED: Post = {
  title: 'O que 400 gestores nos contaram sobre feedback contínuo',
  excerpt: 'Entrevistamos líderes de empresas de 20 a 2.000 pessoas para entender por que a avaliação anual morreu — e o que está tomando o lugar dela.',
  category: 'Gestão',
  author: 'Carolina Mendes',
  date: '9 out 2026',
  read: '11 min',
  tone: 'from-violet-500 via-fuchsia-500 to-orange-400',
}

const POSTS: Post[] = [
  { title: 'Onboarding remoto que não parece uma lista de vídeos', excerpt: 'Como montar as duas primeiras semanas de alguém que nunca vai pisar no escritório.', category: 'Remoto', author: 'Rafael Lima', date: '6 out 2026', read: '7 min', tone: 'from-sky-400 to-indigo-500' },
  { title: 'Entrevista por competências: um roteiro que funciona', excerpt: 'Perguntas que separam quem fez de quem só esteve perto de quem fez.', category: 'Recrutamento', author: 'Beatriz Souza', date: '2 out 2026', read: '6 min', tone: 'from-emerald-400 to-teal-600' },
  { title: 'Rituais de time que sobrevivem ao crescimento', excerpt: 'O que manter, o que matar e o que inventar quando o time passa de 30 pessoas.', category: 'Cultura', author: 'Carolina Mendes', date: '28 set 2026', read: '8 min', tone: 'from-amber-400 to-rose-500' },
  { title: 'Novidade: ciclos de avaliação com metas em cascata', excerpt: 'Metas da empresa viram metas de área que viram metas individuais — sem planilha.', category: 'Produto', author: 'Equipe Pulso', date: '24 set 2026', read: '4 min', tone: 'from-slate-500 to-slate-800' },
  { title: 'PDI que a pessoa realmente abre', excerpt: 'Planos de desenvolvimento curtos, com um próximo passo claro, batem qualquer modelo de 12 páginas.', category: 'Gestão', author: 'Rafael Lima', date: '19 set 2026', read: '5 min', tone: 'from-pink-400 to-fuchsia-600' },
  { title: 'Como medir clima sem cansar o time com pesquisas', excerpt: 'Pulsos curtos, frequência certa e, principalmente, o que fazer com a resposta.', category: 'Cultura', author: 'Beatriz Souza', date: '15 set 2026', read: '9 min', tone: 'from-cyan-400 to-blue-600' },
]

const ini = (s: string) => s.split(' ').map((p) => p[0]).slice(0, 2).join('')

function PulsoLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <Activity className="size-5" /> Pulso
    </a>
  )
}

function PulsoNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <PulsoLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${l === 'Blog' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">Pedir demonstração</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Pulso</SheetTitle>
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

function Cover({ tone, className = '' }: { tone: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${tone} ${className}`}>
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" aria-hidden />
      <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-white/20 blur-2xl" aria-hidden />
    </div>
  )
}

function PulsoDestaque() {
  return (
    <section className="w-full px-6 pt-12 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Blog da Pulso</h1>
          <p className="mt-3 text-lg text-muted-foreground">Gente, cultura e gestão, escritos por quem faz RH todo dia.</p>
        </div>
        <a href="#" className="group mt-10 grid gap-6 rounded-3xl border bg-card p-4 transition-colors hover:bg-muted/40 lg:grid-cols-[1.2fr_1fr] lg:p-5">
          <Cover tone={FEATURED.tone} className="aspect-[16/9] lg:aspect-auto lg:min-h-[320px]" />
          <div className="flex flex-col justify-center p-2 lg:p-4">
            <div className="flex items-center gap-2">
              <Badge>Destaque</Badge>
              <Badge variant="outline">{FEATURED.category}</Badge>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight group-hover:underline sm:text-3xl">{FEATURED.title}</h2>
            <p className="mt-3 text-muted-foreground">{FEATURED.excerpt}</p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <Avatar>
                <AvatarFallback>{ini(FEATURED.author)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{FEATURED.author}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  {FEATURED.date} · <Clock className="size-3" /> {FEATURED.read} de leitura
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}

function PulsoGrade() {
  const [cat, setCat] = useState<Category>('Todos')
  const list = cat === 'Todos' ? POSTS : POSTS.filter((p) => p.category === cat)
  return (
    <section className="w-full px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${cat === c ? 'border-foreground bg-foreground text-background' : 'bg-background text-muted-foreground hover:text-foreground'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article key={p.title} className="group flex flex-col">
              <Cover tone={p.tone} className="aspect-[16/10]" />
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">{p.category}</Badge>
                <span>{p.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {p.read}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-medium leading-snug group-hover:underline">
                <a href="#">{p.title}</a>
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <Avatar size="sm">
                  <AvatarFallback>{ini(p.author)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{p.author}</span>
              </div>
            </article>
          ))}
        </div>
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="Anterior" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">14</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="Próxima" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  )
}

function PulsoNewsletter() {
  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-muted/50 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Um e-mail por semana, sem enrolação</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Os melhores textos sobre gente e gestão, mais o que mudou na Pulso. Assinado por 18 mil pessoas de RH.</p>
        <form className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <Input type="email" placeholder="voce@empresa.com.br" aria-label="E-mail" className="h-10 bg-background" />
          <Button type="submit" size="lg" className="h-10">
            Assinar <ArrowRight data-icon="inline-end" />
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">Sem spam. Cancele com um clique.</p>
      </div>
    </section>
  )
}

function PulsoFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <PulsoLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Produto', 'Preços', 'Blog', 'Comunidade', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Pulso Pessoas</span>
      </div>
    </footer>
  )
}

export default function PaginaDeBlog() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <PulsoNavbar />
      <PulsoDestaque />
      <PulsoGrade />
      <PulsoNewsletter />
      <PulsoFooter />
    </div>
  )
}
