'use client'

import { useState } from 'react'
import { ArrowRight, Check, Menu, Plug, Search, Webhook } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'

const NAV = ['Produto', 'Integrações', 'Preços', 'Docs']
const CATS = ['Todas', 'Comunicação', 'Vendas', 'Pagamentos', 'Produtividade', 'Dados'] as const
type Cat = (typeof CATS)[number]

interface Integration {
  id: string
  name: string
  cat: Exclude<Cat, 'Todas'>
  desc: string
  mark: string
  tone: string
  on: boolean
  popular?: boolean
}

const APPS: Integration[] = [
  { id: 'whatsapp', name: 'WhatsApp Business', cat: 'Comunicação', desc: 'Envie e receba mensagens pela API oficial da Meta.', mark: 'W', tone: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', on: true, popular: true },
  { id: 'slack', name: 'Slack', cat: 'Comunicação', desc: 'Alertas de novos leads e pedidos no canal que você escolher.', mark: 'S', tone: 'bg-violet-500/15 text-violet-700 dark:text-violet-400', on: true },
  { id: 'gmail', name: 'Gmail', cat: 'Comunicação', desc: 'Leia e responda e-mails sem sair do Ponte.', mark: 'G', tone: 'bg-rose-500/15 text-rose-700 dark:text-rose-400', on: false },
  { id: 'rd', name: 'RD Station', cat: 'Vendas', desc: 'Sincronize leads e etapas do funil nos dois sentidos.', mark: 'RD', tone: 'bg-sky-500/15 text-sky-700 dark:text-sky-400', on: true, popular: true },
  { id: 'pipedrive', name: 'Pipedrive', cat: 'Vendas', desc: 'Crie negócios automaticamente a partir de conversas.', mark: 'P', tone: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', on: false },
  { id: 'stripe', name: 'Stripe', cat: 'Pagamentos', desc: 'Links de pagamento e status de cobrança em tempo real.', mark: 'S', tone: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-400', on: false },
  { id: 'mp', name: 'Mercado Pago', cat: 'Pagamentos', desc: 'Pix, cartão e boleto com conciliação automática.', mark: 'MP', tone: 'bg-sky-500/15 text-sky-700 dark:text-sky-400', on: true, popular: true },
  { id: 'pagarme', name: 'Pagar.me', cat: 'Pagamentos', desc: 'Split de pagamento e antifraude integrados.', mark: 'Pm', tone: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', on: false },
  { id: 'notion', name: 'Notion', cat: 'Produtividade', desc: 'Transforme conversas em páginas e tarefas.', mark: 'N', tone: 'bg-slate-500/15 text-slate-700 dark:text-slate-300', on: false },
  { id: 'gcal', name: 'Google Agenda', cat: 'Produtividade', desc: 'Agende reuniões e envie convites pelo chat.', mark: 'GA', tone: 'bg-sky-500/15 text-sky-700 dark:text-sky-400', on: true },
  { id: 'sheets', name: 'Google Sheets', cat: 'Dados', desc: 'Exporte relatórios para planilhas atualizadas sozinhas.', mark: 'GS', tone: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', on: false },
  { id: 'metabase', name: 'Metabase', cat: 'Dados', desc: 'Dashboards de BI com os dados brutos do Ponte.', mark: 'M', tone: 'bg-sky-500/15 text-sky-700 dark:text-sky-400', on: false },
]

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

function PonteLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Plug className="size-4" />
      </span>
      Ponte
    </a>
  )
}

function PonteNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <PonteLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${l === 'Integrações' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">Criar conta</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Ponte</SheetTitle>
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

function PonteDiretorio() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<Cat>('Todas')
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(APPS.map((a) => [a.id, a.on])))
  const nq = norm(q.trim())
  const list = APPS.filter((a) => (cat === 'Todas' || a.cat === cat) && (!nq || norm(a.name + ' ' + a.desc).includes(nq)))
  const activeCount = Object.values(enabled).filter(Boolean).length

  return (
    <>
      <section className="w-full px-6 pt-16 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Integrações</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Conecte o Ponte às ferramentas que você já usa</h1>
            <p className="mt-4 text-lg text-muted-foreground">Mais de 60 integrações nativas, webhooks e uma API aberta. Ative com um clique, sem código.</p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <InputGroup className="h-10 max-w-md">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Buscar integração…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar integração" />
            </InputGroup>
            <span className="text-sm text-muted-foreground">
              <strong className="text-foreground">{activeCount}</strong> ativas no seu workspace
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${cat === c ? 'border-foreground bg-foreground text-background' : 'bg-background text-muted-foreground hover:text-foreground'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {list.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-12 text-center text-sm text-muted-foreground">Nenhuma integração encontrada para “{q.trim()}”.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((a) => {
                const on = enabled[a.id] ?? false
                return (
                  <div key={a.id} className={`flex flex-col rounded-2xl border p-5 transition-colors ${on ? 'bg-card' : 'bg-card/50'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <span className={`flex size-11 items-center justify-center rounded-xl text-sm font-bold ${a.tone}`}>{a.mark}</span>
                      <Switch checked={on} onCheckedChange={(v) => setEnabled((s) => ({ ...s, [a.id]: Boolean(v) }))} aria-label={`Ativar ${a.name}`} />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <h3 className="font-medium">{a.name}</h3>
                      {a.popular && (
                        <Badge variant="secondary" className="text-[10px]">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 flex-1 text-sm text-muted-foreground">{a.desc}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{a.cat}</span>
                      {on ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Check className="size-3" /> Conectado
                        </span>
                      ) : (
                        <a href="#" className="hover:text-foreground">
                          Configurar
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function PonteDestaque() {
  const nodes = ['CRM', 'ERP', 'Planilha']
  return (
    <section className="w-full px-6 py-12 pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-3xl border bg-card p-8 lg:grid-cols-2 lg:p-12">
        <div>
          <Badge variant="outline" className="gap-1.5">
            <Webhook className="size-3" /> Para desenvolvedores
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Não achou a sua? Webhooks e API para o resto.</h2>
          <p className="mt-3 text-muted-foreground">Cada evento do Ponte — nova conversa, pagamento confirmado, etapa alterada — pode disparar um webhook assinado. A API REST cobre tudo o que a interface faz.</p>
          <ul className="mt-5 space-y-2 text-sm">
            {['Eventos assinados com HMAC e reenvio automático', 'SDKs em TypeScript, Python e PHP', 'Ambiente de sandbox com dados fictícios'].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="size-4 text-emerald-500" /> {i}
              </li>
            ))}
          </ul>
          <Button className="mt-6">
            Ler a documentação <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <div className="relative mx-auto h-64 w-full max-w-sm">
          <svg viewBox="0 0 320 240" className="absolute inset-0 h-full w-full" aria-hidden>
            {[40, 120, 200].map((y) => (
              <path key={y} d={`M 160 120 C 230 120, 230 ${y}, 290 ${y}`} className="fill-none stroke-border" strokeWidth="2" strokeDasharray="5 5" />
            ))}
            <path d="M 30 120 H 160" className="fill-none stroke-border" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
          <div className="absolute left-0 top-1/2 flex size-14 -translate-y-1/2 items-center justify-center rounded-2xl border bg-background text-xs font-semibold shadow-sm">App</div>
          <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Plug className="size-7" />
          </div>
          {nodes.map((n, i) => (
            <div key={n} className="absolute right-0 flex h-10 w-20 -translate-y-1/2 items-center justify-center rounded-xl border bg-background text-xs font-medium shadow-sm" style={{ top: `${(40 + i * 80) / 2.4}%` }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PonteFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <PonteLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Produto', 'Integrações', 'Docs', 'Status', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Ponte Automação</span>
      </div>
    </footer>
  )
}

export default function PaginaDeIntegracoes() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <PonteNavbar />
      <PonteDiretorio />
      <PonteDestaque />
      <PonteFooter />
    </div>
  )
}
