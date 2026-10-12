'use client'

import { useState } from 'react'
import { Building2, Check, CreditCard, Rocket, TriangleAlert, User, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Passo {
  titulo: string
  Icon: LucideIcon
}

const PASSOS: Passo[] = [
  { titulo: 'Conta', Icon: User },
  { titulo: 'Empresa', Icon: Building2 },
  { titulo: 'Pagamento', Icon: CreditCard },
  { titulo: 'Lançar', Icon: Rocket },
]

const ERROS_EMPRESA = ['CNPJ não encontrado na Receita Federal.', 'Informe o segmento de atuação.']

type Estado = 'done' | 'error' | 'current' | 'pending'

const ESTILO: Record<Estado, { circulo: string; linha: string; texto: string }> = {
  done: { circulo: 'border-emerald-500 bg-emerald-500 text-white', linha: 'bg-emerald-500', texto: 'Concluído' },
  error: { circulo: 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400', linha: 'bg-rose-500/50', texto: 'Precisa de atenção' },
  current: { circulo: 'border-primary bg-background text-primary ring-4 ring-primary/15', linha: 'bg-border', texto: 'Etapa atual' },
  pending: { circulo: 'border-border bg-background text-muted-foreground', linha: 'bg-border', texto: 'Pendente' },
}

export default function StepperIconesEErro() {
  const [atual, setAtual] = useState(2)
  const [erroEmpresa, setErroEmpresa] = useState(true)
  const maxAlcancado = 2

  const estadoDe = (i: number): Estado => {
    if (i === 1 && erroEmpresa) return 'error'
    if (i < atual) return 'done'
    if (i === atual) return 'current'
    return 'pending'
  }

  return (
    <div className="w-full max-w-lg space-y-7">
      <div className="space-y-5">
        <p className="text-xs font-medium text-muted-foreground">Com ícones, etapa com erro e navegação por clique</p>
        <ol className="grid grid-cols-4">
          {PASSOS.map((p, i) => {
            const estado = estadoDe(i)
            const s = ESTILO[estado]
            const clicavel = i <= maxAlcancado
            return (
              <li key={p.titulo} className="relative flex flex-col items-center gap-2 text-center">
                {i < PASSOS.length - 1 && <span className={cn('absolute top-5 left-1/2 h-0.5 w-full', estadoDe(i + 1) === 'pending' ? 'bg-border' : s.linha)} aria-hidden />}
                <button type="button" disabled={!clicavel} onClick={() => setAtual(i)} aria-current={estado === 'current' ? 'step' : undefined} aria-label={`${p.titulo}: ${s.texto}`} className={cn('relative z-10 flex size-10 items-center justify-center rounded-full border-2 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed', s.circulo, clicavel && 'cursor-pointer')}>
                  {estado === 'done' ? <Check className="size-4" /> : <p.Icon className="size-4" />}
                  {estado === 'error' && (
                    <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-rose-500 text-white ring-2 ring-background">
                      <TriangleAlert className="size-2.5" />
                    </span>
                  )}
                </button>
                <span className={cn('text-xs', estado === 'pending' ? 'text-muted-foreground' : 'font-medium', estado === 'error' && 'text-rose-600 dark:text-rose-400')}>{p.titulo}</span>
                <span className="hidden text-[10px] text-muted-foreground sm:block">{estado === 'error' ? `${ERROS_EMPRESA.length} erros` : s.texto}</span>
              </li>
            )
          })}
        </ol>

        <div className="rounded-xl border bg-card p-4">
          {atual === 1 && erroEmpresa ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-rose-500" />
                <div>
                  <div className="font-medium">Corrija os dados da empresa para continuar</div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
                    {ERROS_EMPRESA.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button size="sm" onClick={() => setErroEmpresa(false)}>
                Marcar como corrigido
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm">
                <div className="font-medium">
                  Etapa {atual + 1} de {PASSOS.length}: {PASSOS[atual]?.titulo}
                </div>
                <div className="text-xs text-muted-foreground">{erroEmpresa ? 'A etapa Empresa ainda tem pendências; clique nela para corrigir.' : 'Tudo certo até aqui.'}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={atual === 0} onClick={() => setAtual((a) => a - 1)}>
                  Voltar
                </Button>
                <Button size="sm" disabled={erroEmpresa || atual === PASSOS.length - 1} onClick={() => setAtual((a) => Math.min(PASSOS.length - 1, a + 1))}>
                  {atual === PASSOS.length - 2 ? 'Lançar' : 'Avançar'}
                </Button>
              </div>
            </div>
          )}
        </div>
        {!erroEmpresa && (
          <Button variant="link" size="xs" className="h-auto p-0" onClick={() => { setErroEmpresa(true); setAtual(2) }}>
            Reiniciar demonstração
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground">Compacto, só ícones com status</p>
        <ol className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
          {PASSOS.map((p, i) => {
            const estado: Estado = i === 0 ? 'done' : i === 1 ? 'error' : i === 2 ? 'current' : 'pending'
            const s = ESTILO[estado]
            return (
              <li key={p.titulo} className="flex items-center gap-3">
                <span className={cn('relative flex size-8 items-center justify-center rounded-full border-2', s.circulo)} aria-label={`${p.titulo}: ${s.texto}`}>
                  {estado === 'done' ? <Check className="size-3.5" /> : <p.Icon className="size-3.5" />}
                  {estado === 'error' && <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-rose-500 ring-2 ring-background" aria-hidden />}
                </span>
                {i < PASSOS.length - 1 && <span className={cn('h-0.5 w-6 rounded-full', estado === 'done' ? 'bg-emerald-500' : 'bg-border')} aria-hidden />}
              </li>
            )
          })}
          <span className="ml-auto text-xs text-muted-foreground">1 pendência</span>
        </ol>
      </div>
    </div>
  )
}
