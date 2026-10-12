'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ExternalLink, RefreshCw, ServerCrash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ERROR_ID = 'err_2Kx9fA7bQm3ZpL'

export default function Erro500() {
  const [retrying, setRetrying] = useState(false)
  const [copied, setCopied] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const list = timers.current
    return () => list.forEach(clearTimeout)
  }, [])

  const retry = () => {
    setRetrying(true)
    timers.current.push(setTimeout(() => setRetrying(false), 1500))
  }
  const copy = () => {
    setCopied(true)
    timers.current.push(setTimeout(() => setCopied(false), 1500))
  }

  return (
    <section className="flex w-full min-h-[560px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border bg-card">
        <div className="h-1.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />
        <div className="p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <ServerCrash className="size-5" />
            </span>
            <Badge variant="destructive">500 · Erro interno</Badge>
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Algo quebrou do nosso lado</h1>
          <p className="mt-2 text-muted-foreground">Não foi você. Nossa equipe já foi avisada automaticamente e está olhando. Tente de novo em alguns instantes.</p>

          <div className="mt-6 rounded-lg border bg-muted/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">ID do erro</div>
                <code className="block truncate font-mono text-sm">{ERROR_ID}</code>
              </div>
              <Button variant="outline" size="sm" onClick={copy} className="shrink-0">
                {copied ? <Check data-icon="inline-start" className="text-emerald-500" /> : <Copy data-icon="inline-start" />}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">12 out 2026, 14:32:07 (BRT) · região sa-east-1</div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button onClick={retry} disabled={retrying}>
              <RefreshCw data-icon="inline-start" className={cn(retrying && 'animate-spin')} />
              {retrying ? 'Tentando…' : 'Tentar de novo'}
            </Button>
            <a href="#" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Ver status do sistema <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
