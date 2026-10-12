'use client'

import { useState } from 'react'
import { ArrowRight, BookOpen, Mail, Menu, MessageCircle, Sailboat, Search } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const NAV = ['Cursos', 'Para empresas', 'Preços', 'Ajuda']

interface Group {
  cat: string
  items: Array<[string, string]>
}

const GROUPS: Group[] = [
  {
    cat: 'Conta e acesso',
    items: [
      ['Esqueci minha senha. Como recupero?', 'Na tela de login, clique em “Esqueci a senha”. Enviamos um link válido por 30 minutos para o e-mail cadastrado.'],
      ['Posso usar a mesma conta em dois aparelhos?', 'Sim, até três aparelhos ao mesmo tempo. O quarto login desconecta o mais antigo.'],
      ['Como troco o e-mail da conta?', 'Em Configurações → Conta → E-mail. Você confirma o novo endereço por um código de 6 dígitos.'],
    ],
  },
  {
    cat: 'Pagamentos',
    items: [
      ['Quais formas de pagamento vocês aceitam?', 'Cartão de crédito (parcelado em até 12x), Pix e boleto. Empresas podem pagar por fatura mensal.'],
      ['Como funciona a garantia de 7 dias?', 'Se não gostar de um curso, peça reembolso em até 7 dias após a compra. O estorno cai em até 2 faturas.'],
      ['Recebo nota fiscal?', 'Sim, a NF-e é enviada automaticamente para o seu e-mail até 48 horas depois da confirmação do pagamento.'],
      ['Posso mudar de assinatura mensal para anual?', 'Pode. A diferença proporcional é cobrada na hora e o desconto anual já vale a partir desse pagamento.'],
    ],
  },
  {
    cat: 'Certificados',
    items: [
      ['Quando recebo meu certificado?', 'Assim que concluir 100% das aulas e a avaliação final, o certificado fica disponível em PDF na página do curso.'],
      ['O certificado tem validade acadêmica?', 'Os certificados são de curso livre, válidos como horas complementares na maioria das universidades. Confira o regulamento da sua.'],
      ['Posso verificar a autenticidade de um certificado?', 'Sim. Cada certificado tem um código único verificável em vela.com.br/verificar.'],
    ],
  },
  {
    cat: 'Aulas e conteúdo',
    items: [
      ['Posso baixar as aulas para assistir offline?', 'No aplicativo, sim. Os vídeos ficam disponíveis por 30 dias e são renovados ao abrir o app conectado.'],
      ['As aulas têm legenda?', 'Todas as aulas têm legendas em português e a maioria também em inglês e espanhol.'],
      ['Por quanto tempo tenho acesso ao curso?', 'Cursos comprados avulsos ficam para sempre. Cursos da assinatura ficam enquanto ela estiver ativa.'],
    ],
  },
  {
    cat: 'Para instrutores',
    items: [
      ['Como publico um curso na Vela?', 'Cadastre-se como instrutor, envie o programa e uma aula de amostra. A curadoria responde em até 10 dias.'],
      ['Qual a divisão de receita?', 'Instrutores recebem 70% das vendas diretas e uma parte proporcional ao tempo assistido na assinatura.'],
      ['Quando recebo os pagamentos?', 'Todo dia 15, via Pix ou transferência, referente às vendas do mês anterior, descontadas as taxas de cartão.'],
    ],
  },
]

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

function VelaLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <Sailboat className="size-5" /> Vela
    </a>
  )
}

function VelaNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <VelaLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${l === 'Ajuda' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            Entrar
          </Button>
          <Button size="sm">Assinar</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Vela</SheetTitle>
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

function VelaCentral() {
  const [q, setQ] = useState('')
  const [active, setActive] = useState('Todos')
  const nq = norm(q.trim())
  const visible = GROUPS.filter((g) => active === 'Todos' || g.cat === active)
    .map((g) => ({ ...g, items: nq ? g.items.filter(([a, b]) => norm(a + ' ' + b).includes(nq)) : g.items }))
    .filter((g) => g.items.length > 0)
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <section className="w-full border-b bg-muted/30 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Central de ajuda</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Como podemos ajudar?</h1>
          <InputGroup className="mx-auto mt-8 h-12 max-w-xl bg-background">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Busque por certificado, reembolso, senha…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar na central de ajuda" className="text-base" />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <p className="mt-3 text-xs text-muted-foreground">{nq ? `${visible.reduce((n, g) => n + g.items.length, 0)} resultado(s) para “${q.trim()}”` : `${total} respostas em ${GROUPS.length} temas`}</p>
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Temas</div>
            <nav className="mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0.5">
              {['Todos', ...GROUPS.map((g) => g.cat)].map((c) => {
                const count = c === 'Todos' ? total : (GROUPS.find((g) => g.cat === c)?.items.length ?? 0)
                const on = active === c
                return (
                  <button key={c} type="button" onClick={() => setActive(c)} className={`flex shrink-0 items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${on ? 'bg-muted font-medium' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}>
                    {c}
                    <span className="rounded-full bg-background px-1.5 text-[11px] tabular-nums text-muted-foreground ring-1 ring-border">{count}</span>
                  </button>
                )
              })}
            </nav>
          </aside>
          <div className="space-y-10">
            {visible.length === 0 && (
              <div className="rounded-2xl border border-dashed p-10 text-center">
                <BookOpen className="mx-auto size-6 text-muted-foreground" />
                <p className="mt-3 font-medium">Nada encontrado para “{q.trim()}”</p>
                <p className="mt-1 text-sm text-muted-foreground">Tente outra palavra ou fale com a gente abaixo.</p>
              </div>
            )}
            {visible.map((g) => (
              <div key={g.cat}>
                <h2 className="text-xl font-semibold tracking-tight">{g.cat}</h2>
                <Accordion className="mt-2 rounded-2xl border bg-card px-5">
                  {g.items.map(([question, answer]) => (
                    <AccordionItem key={question} value={question}>
                      <AccordionTrigger className="py-4 text-left">{question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function VelaSuporte() {
  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-muted/40 p-8 sm:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Não achou? A gente responde.</h2>
            <p className="mt-2 text-muted-foreground">Time de suporte em português, com gente que faz os cursos também.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { Icon: MessageCircle, t: 'Chat ao vivo', d: 'Segunda a sexta, 9h às 18h. Tempo médio de espera: 2 minutos.', cta: 'Abrir chat' },
              { Icon: Mail, t: 'E-mail', d: 'ajuda@vela.com.br — resposta em até 1 dia útil, com histórico.', cta: 'Enviar e-mail' },
            ].map((c) => (
              <div key={c.t} className="flex flex-col rounded-2xl border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <c.Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-medium">{c.t}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{c.d}</p>
                <Button variant="outline" className="mt-5 w-fit">
                  {c.cta} <ArrowRight data-icon="inline-end" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function VelaFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <VelaLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Cursos', 'Instrutores', 'Para empresas', 'Status', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Vela Educação</span>
      </div>
    </footer>
  )
}

export default function PaginaDeFaq() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <VelaNavbar />
      <VelaCentral />
      <VelaSuporte />
      <VelaFooter />
    </div>
  )
}
