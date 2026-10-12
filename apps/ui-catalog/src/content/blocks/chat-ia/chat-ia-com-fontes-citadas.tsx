'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BookOpen, ExternalLink, FileText, MessageSquareText, Send, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Fonte {
  n: number
  Icon: LucideIcon
  titulo: string
  origem: string
  trecho: string
}

const FONTES: Fonte[] = [
  { n: 1, Icon: BookOpen, titulo: 'Política de reembolso', origem: 'Central de ajuda · 3 out', trecho: 'Pedidos cancelados em até 7 dias após a compra têm reembolso integral, no mesmo meio de pagamento.' },
  { n: 2, Icon: FileText, titulo: 'Contrato padrão — cláusula 4.2', origem: 'Documentos · Jurídico', trecho: 'Após o período de arrependimento, o valor é convertido em crédito para uso em até 12 meses.' },
  { n: 3, Icon: MessageSquareText, titulo: 'Conversa com Juliana Prado', origem: 'WhatsApp · 11 out, 16:40', trecho: 'Comprei na terça (7/10) e quero cancelar, não vou conseguir usar.' },
]

type Parte = { t: string } | { c: number }

const RESPOSTA: Parte[] = [
  { t: 'Sim, a Juliana tem direito a reembolso integral. A compra foi feita em 7 de outubro e o pedido de cancelamento chegou em 11 de outubro, dentro dos 7 dias de arrependimento' },
  { c: 1 },
  { c: 3 },
  { t: '. O valor volta no mesmo cartão em até 5 dias úteis. Se ela preferir, pode converter em crédito válido por 12 meses' },
  { c: 2 },
  { t: '. Quer que eu prepare a resposta com as duas opções?' },
]

export default function ChatIaComFontesCitadas() {
  const [ativa, setAtiva] = useState<number | null>(null)
  const toggle = (n: number) => setAtiva((a) => (a === n ? null : n))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border bg-card">
          <div className="flex items-center gap-3 border-b px-5 py-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Assistente Clickmax</p>
              <p className="text-xs text-muted-foreground">Responde com base nos seus documentos e conversas</p>
            </div>
            <Badge variant="secondary">Com fontes</Badge>
          </div>

          <div className="space-y-5 p-5">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">A Juliana Prado pediu cancelamento. Ela tem direito a reembolso?</div>
            </div>

            <div className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                <Sparkles className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed">
                  {RESPOSTA.map((p, i) =>
                    'c' in p ? (
                      <button
                        key={i}
                        type="button"
                        onMouseEnter={() => setAtiva(p.c)}
                        onMouseLeave={() => setAtiva(null)}
                        onClick={() => toggle(p.c)}
                        aria-label={`Fonte ${p.c}`}
                        className={cn(
                          'mx-0.5 inline-flex size-[18px] -translate-y-0.5 items-center justify-center rounded-md border text-[10px] font-semibold tabular-nums transition-colors',
                          ativa === p.c ? 'border-primary bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:border-primary/50 hover:text-foreground',
                        )}
                      >
                        {p.c}
                      </button>
                    ) : (
                      <span key={i}>{p.t}</span>
                    ),
                  )}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Fontes ({FONTES.length})</p>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                    {FONTES.map((f) => (
                      <li key={f.n}>
                        <button
                          type="button"
                          onMouseEnter={() => setAtiva(f.n)}
                          onMouseLeave={() => setAtiva(null)}
                          onClick={() => toggle(f.n)}
                          className={cn('flex h-full w-full flex-col gap-1.5 rounded-xl border bg-background p-3 text-left transition-all', ativa === f.n ? 'border-primary ring-2 ring-primary/20' : 'hover:border-foreground/20')}
                        >
                          <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-semibold text-foreground">{f.n}</span>
                            <f.Icon className="size-3.5 shrink-0" />
                            <span className="truncate">{f.origem}</span>
                          </span>
                          <span className="text-sm leading-snug font-medium">{f.titulo}</span>
                          <span className="line-clamp-2 text-xs text-muted-foreground">{f.trecho}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  <Button variant="ghost" size="icon-xs" aria-label="Resposta útil">
                    <ThumbsUp />
                  </Button>
                  <Button variant="ghost" size="icon-xs" aria-label="Resposta ruim">
                    <ThumbsDown />
                  </Button>
                  <Button variant="ghost" size="xs" className="ml-auto text-muted-foreground">
                    <ExternalLink data-icon="inline-start" /> Abrir conversa
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <form className="flex items-center gap-2 border-t p-3" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Pergunte com base nos seus documentos e conversas…" aria-label="Pergunta" className="h-9" />
            <Button type="submit" size="icon" aria-label="Enviar">
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
