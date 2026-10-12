'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'

const PASSOS = ['Carregando seu painel…', 'Buscando negócios abertos…', 'Calculando metas do mês…', 'Quase lá…']

const LINHAS = [
  { nome: 'Contatos do Google', status: 'ok', detalhe: '1.284 contatos' },
  { nome: 'RD Station', status: 'sync', detalhe: 'Sincronizando 340 leads…' },
  { nome: 'ERP Omie', status: 'fila', detalhe: 'Aguardando' },
]

export default function SpinnerPaginaInteiraEInline() {
  const [passo, setPasso] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPasso((p) => (p + 1) % PASSOS.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="w-full max-w-lg space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Página inteira, com etapas</p>
        <div className="relative h-60 overflow-hidden rounded-xl border bg-background">
          <div className="flex h-full" aria-hidden>
            <div className="w-36 shrink-0 space-y-2 border-r p-3">
              <Skeleton className="h-5 w-20" />
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-3 w-full" />
              ))}
            </div>
            <div className="flex-1 space-y-3 p-4">
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-14" />
                ))}
              </div>
              <Skeleton className="h-24" />
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-[2px]">
            <Spinner className="size-8 text-primary" aria-label="Carregando" />
            <p className="text-sm font-medium">{PASSOS[passo]}</p>
            <div className="flex gap-1" aria-hidden>
              {PASSOS.map((_, i) => (
                <span key={i} className={`h-1 w-5 rounded-full transition-colors ${i <= passo ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Inline, em lista de integrações</p>
        <div className="divide-y rounded-xl border bg-card">
          {LINHAS.map((l) => (
            <div key={l.nome} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              <span className="flex size-5 items-center justify-center">
                {l.status === 'sync' ? <Spinner className="text-primary" aria-label="Sincronizando" /> : l.status === 'ok' ? <span className="size-2 rounded-full bg-emerald-500" aria-hidden /> : <span className="size-2 rounded-full bg-muted-foreground/40" aria-hidden />}
              </span>
              <span className="flex-1">{l.nome}</span>
              <span className="text-xs text-muted-foreground">{l.detalhe}</span>
              {l.status === 'sync' && <Badge variant="secondary">Em andamento</Badge>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Dentro do campo</p>
          <Label htmlFor="sp-cnpj">CNPJ</Label>
          <div className="relative">
            <Input id="sp-cnpj" defaultValue="12.345.678/0001-95" readOnly className="pr-8 font-mono tabular-nums" />
            <Spinner className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground" aria-label="Consultando" />
          </div>
          <p className="text-xs text-muted-foreground">Consultando na Receita Federal…</p>
        </div>

        <div className="space-y-1.5">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Sobre o avatar</p>
          <div className="flex items-center gap-3">
            <span className="relative">
              <Avatar size="lg">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
                <Spinner className="size-4" aria-label="Enviando foto" />
              </span>
            </span>
            <div className="text-sm">
              <div className="font-medium">Ana Souza</div>
              <div className="text-xs text-muted-foreground">Enviando nova foto…</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
