'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Check, CheckCheck, Send } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type Msg = { tipo: 'msg'; id: number; de: 'eu' | 'ela'; texto: string; hora: string; lida?: boolean } | { tipo: 'dia'; id: number; label: string }

const INICIAL: Msg[] = [
  { tipo: 'dia', id: 1, label: 'Ontem' },
  { tipo: 'msg', id: 2, de: 'ela', texto: 'Oi, Ana! Recebi a proposta. Dá pra incluir a integração com o Omie no plano Pro?', hora: '17:42' },
  { tipo: 'msg', id: 3, de: 'eu', texto: 'Dá sim, Carla. Entra como módulo adicional, sem mudar o valor do plano.', hora: '17:50', lida: true },
  { tipo: 'msg', id: 4, de: 'ela', texto: 'Perfeito. E o prazo de implantação continua 4 semanas?', hora: '17:51' },
  { tipo: 'dia', id: 5, label: 'Hoje' },
  { tipo: 'msg', id: 6, de: 'eu', texto: 'Continua. Já reservei a equipe para começar dia 20/10.', hora: '09:12', lida: true },
  { tipo: 'msg', id: 7, de: 'ela', texto: 'Ótimo! Vou alinhar com o financeiro e te retorno até sexta.', hora: '09:15' },
  { tipo: 'msg', id: 8, de: 'eu', texto: 'Combinado. Se precisar, mando o contrato revisado ainda hoje.', hora: '09:16', lida: false },
]

const RAPIDAS = ['Combinado!', 'Posso ligar agora?', 'Envio o contrato hoje', 'Qual o melhor horário?', 'Obrigada pelo retorno']

export default function ScrollAreaDeChat() {
  const [msgs, setMsgs] = useState<Msg[]>(INICIAL)
  const [texto, setTexto] = useState('')
  const [digitando, setDigitando] = useState(false)
  const fimRef = useRef<HTMLDivElement>(null)
  const enviadas = useRef(0)

  useEffect(() => {
    if (enviadas.current === 0) return
    fimRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [msgs.length, digitando])

  const enviar = () => {
    const t = texto.trim()
    if (!t) return
    enviadas.current += 1
    setMsgs((m) => [...m, { tipo: 'msg', id: Date.now(), de: 'eu', texto: t, hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), lida: false }])
    setTexto('')
    setDigitando(true)
    setTimeout(() => {
      setDigitando(false)
      setMsgs((m) => [...m, { tipo: 'msg', id: Date.now() + 1, de: 'ela', texto: 'Recebido, obrigada! 🙌', hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }])
    }, 1600)
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b px-4 py-2.5">
        <Avatar>
          <AvatarFallback>CM</AvatarFallback>
          <AvatarBadge className="bg-emerald-500" />
        </Avatar>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-sm font-medium">Carla Mendes</div>
          <div className="text-xs text-muted-foreground">Kavo Ltda · online</div>
        </div>
        <Button size="sm" variant="ghost" onClick={() => { enviadas.current += 1; fimRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }}>
          <ArrowDown data-icon="inline-start" /> Fim
        </Button>
      </div>

      <ScrollArea className="h-72">
        <div className="space-y-2 p-4">
          {msgs.map((m) =>
            m.tipo === 'dia' ? (
              <div key={m.id} className="flex items-center gap-3 py-1">
                <span className="h-px flex-1 bg-border" />
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{m.label}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            ) : (
              <div key={m.id} className={cn('flex', m.de === 'eu' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-[78%] rounded-2xl px-3 py-2 text-sm', m.de === 'eu' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md bg-muted')}>
                  <p className="leading-snug">{m.texto}</p>
                  <div className={cn('mt-1 flex items-center justify-end gap-1 text-[10px]', m.de === 'eu' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                    {m.hora}
                    {m.de === 'eu' && (m.lida ? <CheckCheck className="size-3" /> : <Check className="size-3" />)}
                  </div>
                </div>
              </div>
            ),
          )}
          {digitando && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3 py-2.5" aria-label="Carla está digitando">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={fimRef} />
        </div>
      </ScrollArea>

      <div className="border-t">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max gap-1.5 px-3 pt-2.5 pb-1">
            {RAPIDAS.map((r) => (
              <button key={r} type="button" onClick={() => setTexto(r)} className="rounded-full border px-2.5 py-1 text-xs hover:bg-muted">
                {r}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>
        <form
          className="flex items-center gap-2 p-3 pt-1.5"
          onSubmit={(e) => {
            e.preventDefault()
            enviar()
          }}
        >
          <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva uma mensagem…" aria-label="Mensagem" className="rounded-full" />
          <Button type="submit" size="icon" aria-label="Enviar" className="shrink-0 rounded-full" disabled={!texto.trim()}>
            <Send />
          </Button>
        </form>
      </div>
    </div>
  )
}
