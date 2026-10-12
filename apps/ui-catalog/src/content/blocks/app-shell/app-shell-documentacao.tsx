'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, Copy, Github, Info, Moon, Search, Sun, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const SECOES = [
  { titulo: 'Começando', itens: ['Introdução', 'Instalação', 'Configuração', 'Primeiros passos'] },
  { titulo: 'Guias', itens: ['Autenticação', 'Webhooks', 'Paginação', 'Limites de uso', 'Erros'] },
  { titulo: 'Referência', itens: ['Clientes', 'Pedidos', 'Pagamentos', 'Assinaturas'] },
]
const NOVOS = ['Assinaturas']

const TOC = ['Visão geral', 'Configurando um endpoint', 'Eventos disponíveis', 'Verificando a assinatura', 'Tentativas e retries']

const CODIGO = [
  "import { Nimbus } from '@nimbus/sdk'",
  '',
  "const nimbus = new Nimbus({ apiKey: 'nb_live_…' })",
  '',
  '// Registra o endpoint que vai receber os eventos',
  'await nimbus.webhooks.create({',
  "  url: 'https://meuapp.com.br/webhooks/nimbus',",
  "  eventos: ['pedido.criado', 'pagamento.aprovado'],",
  '})',
]

const EVENTOS = [
  ['pedido.criado', 'Um novo pedido foi criado no checkout.'],
  ['pagamento.aprovado', 'O pagamento foi confirmado pela adquirente.'],
  ['pagamento.recusado', 'A transação foi recusada; o motivo vem no payload.'],
  ['assinatura.cancelada', 'O cliente cancelou ou a cobrança falhou 3 vezes.'],
]

export default function AppShellDocumentacao() {
  const [pagina, setPagina] = useState('Webhooks')
  const [secaoAtiva, setSecaoAtiva] = useState(1)
  const [copiado, setCopiado] = useState(false)
  const [escuro, setEscuro] = useState(false)

  return (
    <div className="flex min-h-[640px] w-full flex-col bg-background text-foreground">
      <header className="flex h-14 items-center gap-3 border-b px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </span>
          <span className="hidden sm:inline">Nimbus Docs</span>
        </a>
        <NativeSelect size="sm" defaultValue="v3" aria-label="Versão da documentação">
          <NativeSelectOption value="v3">v3.2 (atual)</NativeSelectOption>
          <NativeSelectOption value="v2">v2.9</NativeSelectOption>
          <NativeSelectOption value="v1">v1 (legado)</NativeSelectOption>
        </NativeSelect>
        <InputGroup className="mx-auto hidden w-full max-w-xs md:flex">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar na documentação" aria-label="Buscar na documentação" />
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <nav className="ml-auto hidden items-center gap-1 text-sm lg:flex">
          {['Guias', 'API', 'Changelog'].map((l) => (
            <a key={l} href="#" className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <Button variant="ghost" size="icon-sm" aria-label="Repositório no GitHub">
          <Github />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Alternar tema" onClick={() => setEscuro((e) => !e)}>
          {escuro ? <Sun /> : <Moon />}
        </Button>
        <Button size="sm" variant="outline">
          Entrar
        </Button>
      </header>

      <div className="grid flex-1 md:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_200px]">
        <aside className="hidden border-r md:block">
          <nav className="sticky top-0 space-y-5 p-4">
            {SECOES.map((s, si) => (
              <div key={s.titulo}>
                <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.titulo}</p>
                <ul className="space-y-0.5">
                  {s.itens.map((item) => {
                    const ativo = pagina === item
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            setPagina(item)
                            setSecaoAtiva(si)
                          }}
                          aria-current={ativo ? 'page' : undefined}
                          className={cn('flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors', ativo ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground')}
                        >
                          <span className="flex-1 truncate">{item}</span>
                          {NOVOS.includes(item) && (
                            <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                              Novo
                            </Badge>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 px-4 py-6 sm:px-8 lg:px-12">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{SECOES[secaoAtiva]?.titulo ?? 'Guias'}</span>
            <span>/</span>
            <span className="text-foreground">{pagina}</span>
          </nav>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{pagina}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Receba notificações em tempo real sempre que algo acontecer na sua conta: um pedido criado, um pagamento aprovado ou uma assinatura cancelada. Você registra uma URL e a Nimbus envia um POST assinado para ela.</p>

          <Alert className="mt-6">
            <Info />
            <AlertTitle>Endpoints precisam responder em até 5 segundos</AlertTitle>
            <AlertDescription>Processe o evento de forma assíncrona e responda 200 imediatamente. Respostas lentas contam como falha e entram na fila de retries.</AlertDescription>
          </Alert>

          <h2 className="mt-10 text-xl font-semibold tracking-tight">Configurando um endpoint</h2>
          <p className="mt-2 text-muted-foreground">Use o SDK ou o painel para registrar a URL e escolher quais eventos quer receber.</p>
          <div className="mt-4 overflow-hidden rounded-lg border bg-muted/40">
            <div className="flex items-center justify-between border-b px-3 py-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Terminal className="size-3.5" /> webhooks.ts
              </span>
              <Button variant="ghost" size="icon-xs" aria-label="Copiar código" onClick={() => setCopiado(true)}>
                {copiado ? <Check /> : <Copy />}
              </Button>
            </div>
            <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed">
              <code>
                {CODIGO.map((l, i) => (
                  <span key={i} className="block">
                    <span className="mr-4 inline-block w-4 text-right text-muted-foreground/60 select-none">{i + 1}</span>
                    {l}
                  </span>
                ))}
              </code>
            </pre>
          </div>

          <h2 className="mt-10 text-xl font-semibold tracking-tight">Eventos disponíveis</h2>
          <div className="mt-4 overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="pl-4">Evento</TableHead>
                  <TableHead>Quando é disparado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EVENTOS.map(([ev, desc]) => (
                  <TableRow key={ev}>
                    <TableCell className="pl-4">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{ev}</code>
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">{desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <a href="#" className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" /> Anterior
              </span>
              <span className="mt-1 block font-medium group-hover:underline">Autenticação</span>
            </a>
            <a href="#" className="group rounded-lg border p-4 text-right transition-colors hover:bg-muted/50">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Próximo <ArrowRight className="size-3.5" />
              </span>
              <span className="mt-1 block font-medium group-hover:underline">Paginação</span>
            </a>
          </div>
        </article>

        <aside className="hidden border-l xl:block">
          <Toc />
        </aside>
      </div>
    </div>
  )
}

function Toc() {
  const [ativo, setAtivo] = useState(1)
  return (
    <div className="sticky top-0 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nesta página</p>
      <ul className="mt-3 border-l">
        {TOC.map((t, i) => (
          <li key={t}>
            <button type="button" onClick={() => setAtivo(i)} className={cn('-ml-px block w-full border-l-2 py-1 pl-3 text-left text-sm transition-colors', ativo === i ? 'border-foreground font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
              {t}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
        Esta página foi útil?
        <div className="mt-2 flex gap-1.5">
          <Button size="xs" variant="outline">
            Sim
          </Button>
          <Button size="xs" variant="outline">
            Não
          </Button>
        </div>
      </div>
    </div>
  )
}
