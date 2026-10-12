'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { animate } from 'motion/react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const TOTAL = 12480
const AVATARES = ['AS', 'BR', 'CM', 'DL', 'EF']

export default function ListaDeEsperaComContador() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    const controls = animate(0, TOTAL, {
      duration: 2.4,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [])

  const total = joined ? count + 1 : count

  return (
    <section className="w-full px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Badge variant="secondary" className="gap-1.5">
          <span className="size-1.5 rounded-full bg-primary" /> Lançamento em novembro
        </Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Entre na lista de espera do Clickmax Flows</h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">Automações visuais para WhatsApp, Instagram e e-mail. Quem está na lista entra primeiro e paga metade no primeiro ano.</p>

        <div className="mt-10">
          <div className="text-6xl font-semibold tracking-tighter tabular-nums sm:text-7xl">{total.toLocaleString('pt-BR')}</div>
          <div className="mt-2 text-sm text-muted-foreground">pessoas na fila agora</div>
        </div>

        {joined ? (
          <div className="mt-8 flex w-full max-w-md items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-left">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-4" />
            </span>
            <div className="min-w-0 text-sm">
              <div className="font-medium">Você está na lista!</div>
              <div className="truncate text-muted-foreground">
                Posição #{total.toLocaleString('pt-BR')} · confirmação enviada para {email || 'seu e-mail'}
              </div>
            </div>
          </div>
        ) : (
          <form
            className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              setJoined(true)
            }}
          >
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@empresa.com" aria-label="Seu e-mail" className="h-10 flex-1" />
            <Button type="submit" size="lg" className="h-10">
              Entrar na lista <ArrowRight data-icon="inline-end" />
            </Button>
          </form>
        )}

        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <AvatarGroup>
            {AVATARES.map((a) => (
              <Avatar key={a} size="sm">
                <AvatarFallback>{a}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+12k</AvatarGroupCount>
          </AvatarGroup>
          <span>
            <strong className="text-foreground">Ana, Bruno</strong> e mais {(TOTAL - 2).toLocaleString('pt-BR')} já entraram
          </span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Sem spam. Um único e-mail quando abrir o acesso.</p>
      </div>
    </section>
  )
}
