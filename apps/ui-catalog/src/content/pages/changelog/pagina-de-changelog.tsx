'use client'

import { useState } from 'react'
import { Bell, Hammer, Menu, Rss } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Docs', 'Changelog', 'Status', 'Blog']
const TYPES = ['Novo', 'Melhoria', 'Correção'] as const
type Kind = (typeof TYPES)[number]
type Filter = 'Todos' | Kind

interface Release {
  version: string
  date: string
  title: string
  summary: string
  items: Array<{ kind: Kind; text: string }>
  people: string[]
  major?: boolean
}

const RELEASES: Release[] = [
  {
    version: 'v4.2.0',
    date: '10 out 2026',
    title: 'Deploys por branch de preview',
    summary: 'Cada pull request ganha uma URL própria com banco isolado, pronta para o time de produto revisar.',
    items: [
      { kind: 'Novo', text: 'Ambientes de preview automáticos por branch, com expiração configurável.' },
      { kind: 'Novo', text: 'Comentário no PR com link, status do build e tempo de execução.' },
      { kind: 'Melhoria', text: 'Cache de dependências 2,3x mais rápido em monorepos com pnpm.' },
      { kind: 'Correção', text: 'Variáveis de ambiente com quebra de linha eram truncadas no runtime.' },
    ],
    people: ['AM', 'RS', 'LC'],
    major: true,
  },
  {
    version: 'v4.1.3',
    date: '2 out 2026',
    title: 'Correções de rollback e logs',
    summary: 'Pequenas correções reportadas pela comunidade.',
    items: [
      { kind: 'Correção', text: 'Rollback não restaurava as variáveis de ambiente da versão anterior.' },
      { kind: 'Correção', text: 'Logs com mais de 10 mil linhas travavam a busca no navegador.' },
      { kind: 'Melhoria', text: 'Busca nos logs agora aceita expressões regulares.' },
    ],
    people: ['RS'],
  },
  {
    version: 'v4.1.0',
    date: '18 set 2026',
    title: 'Métricas de runtime em tempo real',
    summary: 'CPU, memória e requisições por segundo direto no painel, sem instalar agente.',
    items: [
      { kind: 'Novo', text: 'Painel de métricas com retenção de 30 dias em todos os planos.' },
      { kind: 'Novo', text: 'Alertas por Slack e e-mail quando a memória passa de 85%.' },
      { kind: 'Melhoria', text: 'Página de serviço carrega 40% mais rápido com paginação dos deploys.' },
    ],
    people: ['AM', 'LC', 'PB'],
  },
  {
    version: 'v4.0.2',
    date: '5 set 2026',
    title: 'Ajustes pós-lançamento',
    summary: 'Estabilização da versão 4.0.',
    items: [
      { kind: 'Correção', text: 'Build falhava em projetos Next.js com output standalone e imagens remotas.' },
      { kind: 'Correção', text: 'Token de API com escopo de leitura conseguia disparar deploys.' },
    ],
    people: ['PB', 'RS'],
  },
  {
    version: 'v4.0.0',
    date: '26 ago 2026',
    title: 'Forja 4: nova CLI, novos planos, mesma simplicidade',
    summary: 'Reescrevemos a CLI em Go, unificamos os planos e abrimos a região São Paulo para todos.',
    items: [
      { kind: 'Novo', text: 'CLI `forja` com login por navegador, deploy em um comando e logs em streaming.' },
      { kind: 'Novo', text: 'Região sa-east-1 (São Paulo) disponível em todos os planos.' },
      { kind: 'Melhoria', text: 'Planos Hobby e Pro passam a incluir domínios customizados ilimitados.' },
      { kind: 'Melhoria', text: 'Novo painel de cobrança com previsão de gasto do mês.' },
    ],
    people: ['AM', 'RS', 'LC', 'PB', 'JV'],
    major: true,
  },
  {
    version: 'v3.9.1',
    date: '12 ago 2026',
    title: 'Suporte a Bun 1.2',
    summary: 'Builds com Bun detectados automaticamente pelo lockfile.',
    items: [
      { kind: 'Novo', text: 'Detecção automática de projetos Bun e cache do bun.lockb.' },
      { kind: 'Correção', text: 'Cron jobs com fuso horário diferente de UTC rodavam uma hora adiantados.' },
    ],
    people: ['JV'],
  },
]

const TONE: Record<Kind, string> = {
  Novo: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Melhoria: 'bg-sky-500/15 text-sky-700 dark:text-sky-400',
  Correção: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
}

function ForjaLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
        <Hammer className="size-4" />
      </span>
      Forja
    </a>
  )
}

function ForjaNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <ForjaLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${l === 'Changelog' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" variant="outline" className="hidden md:inline-flex">
          Abrir console
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Forja</SheetTitle>
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

function ForjaTimeline() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const list = RELEASES.map((r) => ({ ...r, items: filter === 'Todos' ? r.items : r.items.filter((i) => i.kind === filter) })).filter((r) => r.items.length > 0)

  return (
    <section className="w-full px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Changelog</h1>
            <p className="mt-3 text-lg text-muted-foreground">Tudo que mudou na Forja, versão por versão.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Rss data-icon="inline-start" /> RSS
            </Button>
            <Button variant="outline" size="sm">
              <Bell data-icon="inline-start" /> Receber por e-mail
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2 border-b pb-6">
          {(['Todos', ...TYPES] as Filter[]).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${filter === f ? 'border-foreground bg-foreground text-background' : 'bg-background text-muted-foreground hover:text-foreground'}`}>
              {f}
            </button>
          ))}
        </div>

        <ol className="mt-10 space-y-12">
          {list.map((r) => (
            <li key={r.version} className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
              <div className="md:sticky md:top-6 md:self-start">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{r.version}</span>
                  {r.major && <Badge variant="secondary">Grande versão</Badge>}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{r.date}</div>
              </div>
              <article className="relative border-l pl-8 md:pl-10">
                <span className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-background ${r.major ? 'bg-primary' : 'bg-muted-foreground/60'}`} />
                <h2 className="text-xl font-semibold tracking-tight">{r.title}</h2>
                <p className="mt-1 text-muted-foreground">{r.summary}</p>
                <ul className="mt-5 space-y-3">
                  {r.items.map((i) => (
                    <li key={i.text} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 w-[76px] shrink-0 rounded-md px-2 py-0.5 text-center text-[11px] font-medium ${TONE[i.kind]}`}>{i.kind}</span>
                      <span className="leading-relaxed">{i.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <AvatarGroup>
                    {r.people.map((p) => (
                      <Avatar key={p} size="sm">
                        <AvatarFallback>{p}</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  {r.people.length} {r.people.length === 1 ? 'pessoa contribuiu' : 'pessoas contribuíram'}
                </div>
              </article>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <Button variant="outline">Carregar versões anteriores</Button>
        </div>
      </div>
    </section>
  )
}

function ForjaFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <ForjaLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Docs', 'Changelog', 'Status', 'Preços', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Forja Cloud</span>
      </div>
    </footer>
  )
}

export default function PaginaDeChangelog() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <ForjaNavbar />
      <ForjaTimeline />
      <ForjaFooter />
    </div>
  )
}
