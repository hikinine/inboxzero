'use client'

import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BarChart3, Mail, MessageSquareText, Mic, RotateCcw, Send, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
}

interface Sugestao {
  icon: LucideIcon
  title: string
  subtitle: string
  prompt: string
  reply: string
}

const SUGESTOES: Sugestao[] = [
  { icon: MessageSquareText, title: 'Resumir conversas', subtitle: 'O que aconteceu hoje no inbox', prompt: 'Resuma as conversas de hoje', reply: 'Hoje entraram 38 conversas: 21 pelo WhatsApp, 12 pelo Instagram e 5 por e-mail. 9 viraram oportunidade e 3 pediram orçamento.' },
  { icon: Mail, title: 'Criar follow-up', subtitle: 'Para leads parados há 7 dias', prompt: 'Crie um follow-up para leads frios', reply: 'Encontrei 14 leads sem resposta há mais de 7 dias. Preparei uma mensagem curta com oferta de demonstração. Quer revisar antes de enviar?' },
  { icon: BarChart3, title: 'Canal que mais converte', subtitle: 'Comparativo dos últimos 30 dias', prompt: 'Qual canal converte mais?', reply: 'Nos últimos 30 dias o WhatsApp converteu 18%, o Instagram 11% e o e-mail 6%. O WhatsApp também tem o menor tempo de resposta: 4 minutos.' },
]

const INITIAL: Msg[] = [
  { id: 1, from: 'user', text: 'Quantas oportunidades abrimos esta semana?' },
  { id: 2, from: 'bot', text: 'Esta semana foram 27 oportunidades, 12% acima da semana passada. A maior é a Nuvem Fit, com R$ 18.900,00.' },
]

export default function WidgetDeChatIaComSugestoes() {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextId = useRef(100)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const send = (prompt: string, reply?: string) => {
    const clean = prompt.trim()
    if (!clean || typing) return
    setMsgs((m) => [...m, { id: nextId.current++, from: 'user', text: clean }])
    setText('')
    setTyping(true)
    timer.current = setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: nextId.current++, from: 'bot', text: reply ?? 'Entendi. Vou buscar esses dados no CRM e já te trago um resumo com os números.' }])
    }, 1100)
  }

  return (
    <section className="flex w-full min-h-[640px] items-center justify-center px-6 py-16 sm:py-24">
      <div className="w-full max-w-2xl rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center gap-3 border-b p-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
            <Sparkles className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Assistente Lumio</span>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Pergunte sobre leads, vendas e atendimento. Respostas baseadas nos dados do seu CRM.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMsgs(INITIAL)} aria-label="Limpar conversa">
            <RotateCcw data-icon="inline-start" /> Limpar
          </Button>
        </div>

        <div className="grid gap-3 border-b bg-muted/30 p-5 sm:grid-cols-3">
          {SUGESTOES.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => send(s.prompt, s.reply)}
                className="flex flex-col items-start gap-2 rounded-xl border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <Icon className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">{s.title}</span>
                <span className="text-xs text-muted-foreground">{s.subtitle}</span>
              </button>
            )
          })}
        </div>

        <div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-5">
          {msgs.map((m) => (
            <div key={m.id} className={cn('flex gap-3', m.from === 'user' && 'flex-row-reverse')}>
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                  m.from === 'bot' ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white' : 'bg-muted text-muted-foreground',
                )}
              >
                {m.from === 'bot' ? <Sparkles className="size-3.5" /> : 'PS'}
              </span>
              <div className={cn('max-w-[80%] rounded-2xl px-3.5 py-2 text-sm', m.from === 'user' ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm bg-muted')}>{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                <Sparkles className="size-3.5" />
              </span>
              <span className="text-xs text-muted-foreground">Analisando os dados…</span>
            </div>
          )}
        </div>

        <form
          className="flex items-center gap-2 border-t p-4"
          onSubmit={(e) => {
            e.preventDefault()
            send(text)
          }}
        >
          <Button type="button" variant="ghost" size="icon" aria-label="Falar">
            <Mic />
          </Button>
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Pergunte qualquer coisa sobre seus dados…" aria-label="Pergunta" className="h-9" />
          <Button type="submit" size="icon" aria-label="Enviar" disabled={!text.trim() || typing}>
            <Send />
          </Button>
        </form>
      </div>
    </section>
  )
}
