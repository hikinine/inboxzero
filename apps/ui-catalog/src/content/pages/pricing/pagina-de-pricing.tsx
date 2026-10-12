'use client'

import { Fragment, useState } from 'react'
import { ArrowRight, Check, Cloud, Headset, Menu, Minus } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Produto', 'Preços', 'Clientes', 'Central de ajuda']

function NimboLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-lg bg-sky-600 text-white">
        <Cloud className="size-4" />
      </span>
      Nimbo
    </a>
  )
}

function NimboNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <NimboLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l, i) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${i === 1 ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">Teste 14 dias grátis</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Nimbo</SheetTitle>
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

const PLANS = [
  { name: 'Essencial', m: 149, y: 119, d: 'Para equipes pequenas que estão organizando o atendimento.', agents: 'até 3 atendentes', f: ['WhatsApp e e-mail', 'Caixa de entrada compartilhada', 'Respostas prontas', 'Relatórios básicos'] },
  { name: 'Profissional', m: 399, y: 319, d: 'Para operações que precisam de automação e métricas.', agents: 'até 15 atendentes', f: ['Tudo do Essencial', 'Instagram, Telegram e chat do site', 'Chatbot com IA', 'SLA e filas por equipe', 'Relatórios avançados'], hot: true },
  { name: 'Empresa', m: 0, y: 0, d: 'Para grandes volumes, várias marcas e requisitos de segurança.', agents: 'atendentes ilimitados', f: ['Tudo do Profissional', 'Múltiplas marcas e países', 'SSO, auditoria e DPA', 'API dedicada e SLA de 99,9%', 'Gerente de sucesso'] },
]

type Cell = boolean | string
const COMPARE: Array<{ group: string; rows: Array<[string, Cell, Cell, Cell]> }> = [
  { group: 'Canais', rows: [['WhatsApp Business', true, true, true], ['Instagram e Messenger', false, true, true], ['Chat do site e app', false, true, true], ['Telefonia (URA)', false, false, true]] },
  { group: 'Automação', rows: [['Respostas prontas', true, true, true], ['Chatbot com IA', false, true, true], ['Roteamento por habilidade', false, true, true], ['Webhooks e API', 'Somente leitura', true, true]] },
  { group: 'Suporte e segurança', rows: [['Suporte', 'E-mail', 'Chat 24/5', 'Dedicado 24/7'], ['Histórico de conversas', '6 meses', '2 anos', 'Ilimitado'], ['SSO (SAML)', false, false, true], ['Dados no Brasil', true, true, true]] },
]

function CellValue({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto size-4 text-emerald-500" aria-label="Incluído" />
  if (v === false) return <Minus className="mx-auto size-4 text-muted-foreground/40" aria-label="Não incluído" />
  return <span className="text-xs">{v}</span>
}

function NimboPlanos() {
  const [yearly, setYearly] = useState(true)
  return (
    <section className="w-full px-6 pt-16 pb-20 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Preços</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Preço simples, suporte de verdade</h1>
          <p className="mt-4 text-lg text-muted-foreground">Comece com 14 dias grátis em qualquer plano. Mude ou cancele quando quiser.</p>
          <div className="mt-8 inline-flex rounded-full border bg-muted p-1 text-sm">
            {(['Mensal', 'Anual'] as const).map((o) => {
              const active = (o === 'Anual') === yearly
              return (
                <button key={o} type="button" onClick={() => setYearly(o === 'Anual')} className={`rounded-full px-4 py-1.5 transition-colors ${active ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground'}`}>
                  {o}
                  {o === 'Anual' && <span className="ml-1.5 text-xs text-emerald-600 dark:text-emerald-400">-20%</span>}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 ${p.hot ? 'border-sky-600 shadow-lg ring-1 ring-sky-600' : 'bg-card'}`}>
              {p.hot && <Badge className="absolute -top-3 left-6 bg-sky-600 text-white">Recomendado</Badge>}
              <h2 className="text-lg font-medium">{p.name}</h2>
              <p className="min-h-10 text-sm text-muted-foreground">{p.d}</p>
              <div className="mt-6 flex items-baseline gap-1">
                {p.m > 0 ? (
                  <>
                    <span className="text-4xl font-semibold tabular-nums">R$ {yearly ? p.y : p.m}</span>
                    <span className="text-sm text-muted-foreground">/mês</span>
                  </>
                ) : (
                  <span className="text-4xl font-semibold">Sob consulta</span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.agents}</p>
              <Button className={`mt-6 ${p.hot ? 'bg-sky-600 text-white hover:bg-sky-600/90' : ''}`} variant={p.hot ? 'default' : 'outline'}>
                {p.m > 0 ? 'Começar teste grátis' : 'Falar com vendas'}
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.f.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400" /> {f}
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

function NimboComparativo() {
  return (
    <section className="w-full bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Compare os planos em detalhe</h2>
          <p className="mt-3 text-muted-foreground">Tudo o que cada plano inclui, sem letra miúda.</p>
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="w-[40%] px-5 py-4 text-left font-medium text-muted-foreground">Recurso</th>
                {PLANS.map((p) => (
                  <th key={p.name} className={`px-4 py-4 text-center font-semibold ${p.hot ? 'bg-sky-600/5' : ''}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((g) => (
                <Fragment key={g.group}>
                  <tr className="border-b bg-muted/40">
                    <td colSpan={4} className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {g.group}
                    </td>
                  </tr>
                  {g.rows.map(([f, a, b, c]) => (
                    <tr key={f} className="border-b last:border-0">
                      <td className="px-5 py-3">{f}</td>
                      <td className="px-4 py-3 text-center">
                        <CellValue v={a} />
                      </td>
                      <td className="bg-sky-600/5 px-4 py-3 text-center">
                        <CellValue v={b} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CellValue v={c} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

const FAQ: Array<[string, string]> = [
  ['O que conta como atendente?', 'Qualquer pessoa que responde conversas. Gestores que só acompanham relatórios não contam.'],
  ['Posso trocar de plano no meio do mês?', 'Sim. O upgrade é imediato e a diferença é cobrada proporcional. Downgrade vale a partir do próximo ciclo.'],
  ['O WhatsApp tem custo à parte?', 'A Nimbo não cobra por mensagem. A Meta cobra por conversa iniciada pela empresa; mostramos esse custo no painel.'],
  ['Preciso de cartão para testar?', 'Não. Os 14 dias são liberados só com e-mail e você escolhe o plano no fim do teste.'],
  ['Vocês emitem nota fiscal?', 'Sim, NF-e automática todo mês com CNPJ, e aceitamos boleto e Pix no plano anual.'],
  ['Como funciona o cancelamento?', 'Dois cliques em Configurações → Plano. Seus dados ficam disponíveis para exportação por 90 dias.'],
]

function NimboFaq() {
  const half = Math.ceil(FAQ.length / 2)
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas sobre cobrança</h2>
        </div>
        <div className="mt-10 grid gap-x-10 md:grid-cols-2">
          {[FAQ.slice(0, half), FAQ.slice(half)].map((col, i) => (
            <Accordion key={i}>
              {col.map(([q, a]) => (
                <AccordionItem key={q} value={q}>
                  <AccordionTrigger className="py-4">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

function NimboCta() {
  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 rounded-3xl border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Headset className="size-6" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Precisa de algo sob medida?</h2>
            <p className="mt-1 text-muted-foreground">Volume acima de 100 mil conversas por mês, integração com sistema próprio ou requisitos de compliance? A gente monta junto.</p>
          </div>
        </div>
        <Button size="lg" className="shrink-0">
          Falar com vendas <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  )
}

function NimboFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <NimboLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Produto', 'Preços', 'Segurança', 'Status', 'Termos'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Nimbo Atendimento</span>
      </div>
    </footer>
  )
}

export default function PaginaDePricing() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <NimboNavbar />
      <NimboPlanos />
      <NimboComparativo />
      <NimboFaq />
      <NimboCta />
      <NimboFooter />
    </div>
  )
}
