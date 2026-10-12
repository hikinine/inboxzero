'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const TAMANHOS = ['size-3', 'size-4', 'size-6', 'size-8', 'size-10']
const CORES = ['text-primary', 'text-emerald-500', 'text-amber-500', 'text-destructive', 'text-muted-foreground']

export default function SpinnerVariantes() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Tamanhos</p>
        <div className="flex items-center gap-5">
          {TAMANHOS.map((t) => (
            <Spinner key={t} className={t} aria-label="Carregando" />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Cores</p>
        <div className="flex items-center gap-5">
          {CORES.map((c) => (
            <Spinner key={c} className={`size-5 ${c}`} aria-label="Carregando" />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Dentro de botão</p>
        <div className="flex flex-wrap items-center gap-2">
          <Button disabled>
            <Spinner data-icon="inline-start" aria-label="Salvando" /> Salvando…
          </Button>
          <Button variant="outline" disabled>
            <Spinner data-icon="inline-start" aria-label="Processando" /> Processando pagamento
          </Button>
          <Button variant="secondary" size="sm" disabled>
            <Spinner data-icon="inline-start" aria-label="Enviando" /> Enviando
          </Button>
          <Button size="icon" variant="ghost" disabled aria-label="Carregando">
            <Spinner />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com texto</p>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner aria-label="Sincronizando" /> Sincronizando 1.284 contatos…
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-card py-8 text-center">
            <Spinner className="size-6 text-primary" aria-label="Gerando relatório" />
            <p className="text-sm font-medium">Gerando relatório</p>
            <p className="text-xs text-muted-foreground">Isso costuma levar menos de um minuto.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
