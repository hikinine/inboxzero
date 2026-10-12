'use client'

import { useState } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Menu, MessageCircle, Phone, Route, Send } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

const NAV = ['Soluções', 'Rastreamento', 'Para transportadoras', 'Contato']

function TrilhaLogo() {
  return (
    <a href="#" className="flex items-center gap-2 font-semibold">
      <span className="flex size-7 items-center justify-center rounded-md bg-amber-500 text-white">
        <Route className="size-4" />
      </span>
      Trilha
    </a>
  )
}

function TrilhaNavbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <TrilhaLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((l) => (
            <a key={l} href="#" className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${l === 'Contato' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {l}
            </a>
          ))}
        </nav>
        <Button size="sm" variant="outline" className="hidden md:inline-flex">
          Rastrear encomenda
        </Button>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Trilha</SheetTitle>
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

function TrilhaForm() {
  const [ok, setOk] = useState(false)
  const [lgpd, setLgpd] = useState(false)
  return (
    <form
      className="rounded-2xl border bg-card p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault()
        setOk(true)
      }}
    >
      <h2 className="text-xl font-semibold tracking-tight">Fale com o time comercial</h2>
      <p className="mt-1 text-sm text-muted-foreground">Respondemos em até 1 dia útil. Para suporte a entregas, use o rastreamento.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ct-nome">Nome</Label>
          <Input id="ct-nome" placeholder="Seu nome" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ct-email">E-mail corporativo</Label>
          <Input id="ct-email" type="email" placeholder="voce@empresa.com.br" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ct-empresa">Empresa</Label>
          <Input id="ct-empresa" placeholder="Nome da empresa" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ct-tel">Telefone</Label>
          <Input id="ct-tel" placeholder="(11) 99999-0000" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="ct-assunto">Assunto</Label>
          <NativeSelect id="ct-assunto" defaultValue="cotacao" className="w-full">
            <NativeSelectOption value="cotacao">Cotação de frete</NativeSelectOption>
            <NativeSelectOption value="integracao">Integração com meu e-commerce</NativeSelectOption>
            <NativeSelectOption value="transportadora">Quero ser transportadora parceira</NativeSelectOption>
            <NativeSelectOption value="outro">Outro assunto</NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="ct-msg">Mensagem</Label>
          <Textarea id="ct-msg" rows={4} placeholder="Conte o volume mensal de envios, as regiões e o que você precisa." />
        </div>
      </div>
      <div className="mt-5 flex items-start gap-2">
        <Checkbox id="ct-lgpd" checked={lgpd} onCheckedChange={(v) => setLgpd(Boolean(v))} />
        <Label htmlFor="ct-lgpd" className="text-xs leading-relaxed font-normal text-muted-foreground">
          Autorizo a Trilha a usar meus dados para responder este contato, conforme a Política de Privacidade.
        </Label>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={!lgpd}>
          <Send data-icon="inline-start" /> Enviar mensagem
        </Button>
        {ok && <span className="text-sm text-emerald-600 dark:text-emerald-400">Recebido! Retornamos em breve.</span>}
      </div>
    </form>
  )
}

const CHANNELS = [
  { Icon: Mail, t: 'E-mail', v: 'comercial@trilha.log.br', d: 'Para propostas e parcerias' },
  { Icon: Phone, t: 'Telefone', v: '(11) 4000-2200', d: 'Segunda a sexta, 8h às 18h' },
  { Icon: MessageCircle, t: 'WhatsApp', v: '(11) 98888-2200', d: 'Resposta em minutos no horário comercial' },
  { Icon: MapPin, t: 'Sede', v: 'Av. das Nações Unidas, 14.401', d: 'Chácara Santo Antônio · São Paulo, SP' },
]

function TrilhaCanais() {
  return (
    <div className="space-y-4">
      <ul className="divide-y rounded-2xl border bg-card">
        {CHANNELS.map((c) => (
          <li key={c.t} className="flex items-start gap-4 p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <c.Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs text-muted-foreground">{c.t}</div>
              <div className="font-medium">{c.v}</div>
              <div className="text-xs text-muted-foreground">{c.d}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 rounded-2xl border border-dashed p-4 text-sm">
        <Clock className="size-4 shrink-0 text-muted-foreground" />
        <span>
          Agora são <strong>14:32</strong> em São Paulo — estamos online.
        </span>
        <span className="ml-auto size-2 rounded-full bg-emerald-500" />
      </div>
    </div>
  )
}

function TrilhaMapa() {
  const blocks: Array<[number, number, number, number]> = [
    [20, 20, 110, 70],
    [150, 20, 90, 70],
    [260, 20, 140, 70],
    [420, 20, 160, 70],
    [20, 110, 110, 90],
    [150, 110, 90, 90],
    [260, 110, 140, 90],
    [420, 110, 160, 90],
    [20, 220, 110, 80],
    [150, 220, 90, 80],
    [260, 220, 140, 80],
    [420, 220, 160, 80],
  ]
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-card">
        <div className="grid lg:grid-cols-[1fr_320px]">
          <svg viewBox="0 0 600 320" className="h-72 w-full lg:h-96" role="img" aria-label="Mapa estilizado da região da sede">
            <rect width="600" height="320" className="fill-muted" />
            {blocks.map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="8" className="fill-background stroke-border" />
            ))}
            <path d="M 0 95 H 600" className="stroke-border" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 0 210 H 600" className="stroke-border" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 140 0 V 320" className="stroke-border" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 410 0 V 320" className="stroke-border" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 520 0 C 560 90, 540 200, 600 300" className="fill-none stroke-sky-500/40" strokeWidth="14" strokeLinecap="round" />
            <path d="M 60 300 C 120 230, 260 260, 330 170 S 440 120, 480 150" className="fill-none stroke-amber-500" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
            <circle cx="60" cy="300" r="6" className="fill-foreground" />
            <g>
              <circle cx="480" cy="150" r="22" className="fill-amber-500/20">
                <animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="480" cy="150" r="10" className="fill-amber-500 stroke-background" strokeWidth="3" />
            </g>
          </svg>
          <div className="flex flex-col justify-center gap-4 border-t p-8 lg:border-l lg:border-t-0">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sede</div>
            <div>
              <div className="text-xl font-semibold tracking-tight">São Paulo, SP</div>
              <p className="mt-1 text-sm text-muted-foreground">Av. das Nações Unidas, 14.401 — Torre B, 12º andar. Estacionamento conveniado no prédio.</p>
            </div>
            <div className="text-sm text-muted-foreground">Também em Curitiba, Recife e Belo Horizonte.</div>
            <Button variant="outline" className="w-fit">
              Abrir no mapa <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const FAQ: Array<[string, string]> = [
  ['Qual o prazo para receber uma cotação?', 'Cotações padrão saem em até 4 horas úteis. Operações com mais de 10 mil envios por mês recebem uma proposta completa em 2 dias.'],
  ['Vocês atendem o Brasil inteiro?', 'Sim, com malha própria no Sul e Sudeste e transportadoras parceiras auditadas nas demais regiões.'],
  ['Como integro meu e-commerce?', 'Temos plugin para as principais plataformas e API REST documentada. A integração média leva uma tarde.'],
  ['Minha encomenda atrasou. O que faço?', 'Use a página de rastreamento com o código do envio — lá você abre uma ocorrência e acompanha a resposta.'],
]

function TrilhaFaq() {
  return (
    <section className="w-full px-6 pb-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Perguntas rápidas</h2>
        <Accordion className="mt-4">
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-4">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function TrilhaFooter() {
  return (
    <footer className="w-full border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <TrilhaLogo />
        <nav className="flex flex-wrap justify-center gap-5">
          {['Soluções', 'Rastreamento', 'Transportadoras', 'Carreiras', 'Privacidade'].map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <span>© 2026 Trilha Logística S.A.</span>
      </div>
    </footer>
  )
}

export default function PaginaDeContato() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <TrilhaNavbar />
      <section className="w-full px-6 pt-16 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contato</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Vamos conversar sobre a sua operação</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Frete mais barato, prazo mais curto e rastreamento que o cliente entende. Diga o que você precisa.</p>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <TrilhaForm />
            <TrilhaCanais />
          </div>
        </div>
      </section>
      <TrilhaMapa />
      <TrilhaFaq />
      <TrilhaFooter />
    </div>
  )
}
