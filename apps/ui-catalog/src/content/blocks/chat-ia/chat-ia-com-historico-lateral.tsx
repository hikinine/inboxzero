'use client'

import { useState } from 'react'
import { MessageSquare, Plus, Search, Send, Sparkles, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Msg {
  from: 'user' | 'bot'
  text: string
}

type Grupo = 'Hoje' | 'Ontem' | 'Semana passada'

interface Conversa {
  id: string
  titulo: string
  quando: string
  grupo: Grupo
  msgs: Msg[]
}

const CONVERSAS: Conversa[] = [
  {
    id: 'c1',
    titulo: 'Resumo das conversas de hoje',
    quando: '14:32',
    grupo: 'Hoje',
    msgs: [
      { from: 'user', text: 'Resume o que aconteceu no inbox hoje.' },
      { from: 'bot', text: 'Entraram 42 conversas: 24 pelo WhatsApp, 13 pelo Instagram e 5 por e-mail. 11 viraram oportunidade (R$ 38.400,00 em pipeline) e 2 pediram cancelamento — ambas já estão com o Rafael.' },
      { from: 'user', text: 'Quem ficou sem resposta?' },
      { from: 'bot', text: 'Três contatos esperam há mais de 1 hora: Juliana Prado, Casa Prisma e Marcos Lima. Quer que eu envie uma mensagem de retomada para eles?' },
    ],
  },
  {
    id: 'c2',
    titulo: 'Follow-up para leads frios',
    quando: '11:05',
    grupo: 'Hoje',
    msgs: [
      { from: 'user', text: 'Monta um follow-up para quem não responde há 7 dias.' },
      { from: 'bot', text: 'Encontrei 14 leads parados. Sugestão: “Oi, {nome}! Passando para saber se ainda faz sentido conversar sobre o atendimento da {empresa}. Posso te mostrar em 15 min como funciona?”' },
    ],
  },
  {
    id: 'c3',
    titulo: 'Canal que mais converte',
    quando: 'Ontem',
    grupo: 'Ontem',
    msgs: [
      { from: 'user', text: 'Qual canal converteu mais nos últimos 30 dias?' },
      { from: 'bot', text: 'WhatsApp: 18% (142 conversas), Instagram: 11% (96) e e-mail: 6% (51). O WhatsApp também tem o menor tempo de resposta, 4 minutos.' },
    ],
  },
  {
    id: 'c4',
    titulo: 'Mensagem de boas-vindas',
    quando: 'Ontem',
    grupo: 'Ontem',
    msgs: [
      { from: 'user', text: 'Escreve uma boas-vindas curta para novos clientes.' },
      { from: 'bot', text: '“Bem-vindo à Nuvem Fit! Seu acesso já está liberado. Qualquer dúvida, é só responder aqui — a gente responde em minutos.”' },
    ],
  },
  {
    id: 'c5',
    titulo: 'Relatório semanal de vendas',
    quando: 'sex',
    grupo: 'Semana passada',
    msgs: [
      { from: 'user', text: 'Fecha o relatório da semana.' },
      { from: 'bot', text: 'Semana de 6 a 10 de outubro: R$ 71.300,00 fechados em 23 negócios. Ticket médio de R$ 3.100,00, 9% acima da semana anterior.' },
    ],
  },
  {
    id: 'c6',
    titulo: 'Integração com a Shopify',
    quando: 'qui',
    grupo: 'Semana passada',
    msgs: [
      { from: 'user', text: 'Como ligo os pedidos da Shopify ao CRM?' },
      { from: 'bot', text: 'Em Integrações, conecte a loja e marque “criar contato a cada pedido”. Os pedidos aparecem na linha do tempo do cliente em até 1 minuto.' },
    ],
  },
]

const GRUPOS: Grupo[] = ['Hoje', 'Ontem', 'Semana passada']

export default function ChatIaComHistoricoLateral() {
  const [ativa, setAtiva] = useState('c1')
  const [texto, setTexto] = useState('')
  const [extra, setExtra] = useState<Record<string, Msg[]>>({})

  const conv = CONVERSAS.find((c) => c.id === ativa) ?? CONVERSAS[0]!
  const msgs = [...conv.msgs, ...(extra[conv.id] ?? [])]

  const enviar = () => {
    const t = texto.trim()
    if (!t) return
    setExtra((e) => ({
      ...e,
      [conv.id]: [...(e[conv.id] ?? []), { from: 'user', text: t }, { from: 'bot', text: 'Anotado. Vou cruzar isso com os dados do CRM e te trago os números em instantes.' }],
    }))
    setTexto('')
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid h-[560px] max-w-5xl overflow-hidden rounded-2xl border bg-card md:grid-cols-[260px_1fr]">
        <aside className="hidden flex-col border-r bg-muted/30 md:flex">
          <div className="flex items-center gap-2 p-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar conversas" aria-label="Buscar conversas" className="h-8 bg-background pl-8" />
            </div>
            <Button size="icon" variant="outline" aria-label="Nova conversa">
              <Plus />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {GRUPOS.map((g) => (
              <div key={g} className="mt-2">
                <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{g}</p>
                {CONVERSAS.filter((c) => c.grupo === g).map((c) => {
                  const sel = c.id === ativa
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setAtiva(c.id)}
                      aria-current={sel ? 'true' : undefined}
                      className={cn('group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors', sel ? 'bg-background shadow-sm' : 'text-muted-foreground hover:bg-background/60 hover:text-foreground')}
                    >
                      <MessageSquare className="size-4 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{c.titulo}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground group-hover:hidden">{c.quando}</span>
                      <Trash2 className="hidden size-3.5 shrink-0 text-muted-foreground group-hover:block" aria-hidden />
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="border-t p-3 text-xs text-muted-foreground">12 conversas · plano Pro</div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-3 border-b px-5 py-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{conv.titulo}</p>
              <p className="text-xs text-muted-foreground">Assistente Clickmax · baseado nos dados do seu CRM</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={`${conv.id}-${i}`} className={cn('flex gap-3', m.from === 'user' && 'flex-row-reverse')}>
                {m.from === 'bot' ? (
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                    <Sparkles className="size-3.5" />
                  </span>
                ) : (
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">AS</span>
                )}
                <div className={cn('max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed', m.from === 'user' ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm bg-muted')}>{m.text}</div>
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t p-3"
            onSubmit={(e) => {
              e.preventDefault()
              enviar()
            }}
          >
            <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Pergunte sobre leads, vendas ou atendimento…" aria-label="Mensagem" className="h-9" />
            <Button type="submit" size="icon" aria-label="Enviar" disabled={!texto.trim()}>
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
