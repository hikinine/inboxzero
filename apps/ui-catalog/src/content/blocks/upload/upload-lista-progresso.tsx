'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, CircleAlert, File, FileImage, FileSpreadsheet, FileText, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

type Status = 'enviando' | 'concluido' | 'erro'
type Tipo = 'pdf' | 'imagem' | 'planilha' | 'outro'

interface Arquivo {
  id: number
  nome: string
  tamanho: string
  tipo: Tipo
  progresso: number
  status: Status
  erro?: string
  passo: number
}

const ICONES: Record<Tipo, LucideIcon> = { pdf: FileText, imagem: FileImage, planilha: FileSpreadsheet, outro: File }

const INICIAL: Arquivo[] = [
  { id: 1, nome: 'contrato-lumi-2026.pdf', tamanho: '2,4 MB', tipo: 'pdf', progresso: 100, status: 'concluido', passo: 0 },
  { id: 2, nome: 'fachada-loja-campinas.jpg', tamanho: '4,1 MB', tipo: 'imagem', progresso: 38, status: 'enviando', passo: 4 },
  { id: 3, nome: 'planilha-leads-setembro.xlsx', tamanho: '860 KB', tipo: 'planilha', progresso: 12, status: 'enviando', passo: 9 },
  { id: 4, nome: 'apresentacao-institucional.pptx', tamanho: '18,2 MB', tipo: 'outro', progresso: 0, status: 'erro', erro: 'Arquivo acima do limite de 10 MB', passo: 6 },
  { id: 5, nome: 'logo-lumi.svg', tamanho: '32 KB', tipo: 'imagem', progresso: 100, status: 'concluido', passo: 0 },
]

export default function UploadListaProgresso() {
  const [arquivos, setArquivos] = useState<Arquivo[]>(INICIAL)

  useEffect(() => {
    const id = window.setInterval(() => {
      setArquivos((prev) =>
        prev.map((a): Arquivo => {
          if (a.status !== 'enviando') return a
          const progresso = Math.min(100, a.progresso + a.passo)
          return progresso >= 100 ? { ...a, progresso: 100, status: 'concluido' } : { ...a, progresso }
        }),
      )
    }, 600)
    return () => window.clearInterval(id)
  }, [])

  const concluidos = arquivos.filter((a) => a.status === 'concluido').length
  const enviando = arquivos.filter((a) => a.status === 'enviando').length
  const geral = arquivos.length ? Math.round(arquivos.reduce((s, a) => s + a.progresso, 0) / arquivos.length) : 0

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">{enviando > 0 ? `Enviando ${enviando} ${enviando === 1 ? 'arquivo' : 'arquivos'}…` : 'Envio concluído'}</h2>
                <p className="text-sm text-muted-foreground">
                  {concluidos} de {arquivos.length} concluídos
                </p>
              </div>
              <span className="text-2xl font-semibold tabular-nums">{geral}%</span>
            </div>
            <Progress value={geral} className="mt-4" aria-label="Progresso geral" />
          </div>

          <ul className="divide-y">
            {arquivos.map((a) => {
              const Icon = ICONES[a.tipo]
              return (
                <li key={a.id} className="flex items-center gap-3 px-5 py-3">
                  <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted', a.status === 'erro' && 'bg-destructive/10 text-destructive')}>
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{a.nome}</p>
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">{a.status === 'erro' ? '' : a.status === 'concluido' ? a.tamanho : `${a.progresso}% · ${a.tamanho}`}</span>
                    </div>
                    {a.status === 'erro' ? (
                      <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                        <CircleAlert className="size-3.5" /> {a.erro}
                      </p>
                    ) : (
                      <Progress value={a.progresso} className="mt-2" aria-label={`Progresso de ${a.nome}`} />
                    )}
                  </div>
                  {a.status === 'enviando' && (
                    <Button variant="ghost" size="icon-sm" aria-label={`Cancelar envio de ${a.nome}`} onClick={() => setArquivos((prev) => prev.filter((x) => x.id !== a.id))}>
                      <X />
                    </Button>
                  )}
                  {a.status === 'concluido' && (
                    <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" aria-label="Concluído">
                      <Check className="size-4" />
                    </span>
                  )}
                  {a.status === 'erro' && (
                    <Button variant="outline" size="sm" onClick={() => setArquivos((prev) => prev.map((x): Arquivo => (x.id === a.id ? { ...x, status: 'enviando', progresso: 0, erro: undefined } : x)))}>
                      <RotateCcw data-icon="inline-start" /> Tentar de novo
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center justify-between border-t bg-muted/40 px-5 py-3">
            <Button variant="ghost" size="sm" onClick={() => setArquivos((prev) => prev.filter((a) => a.status !== 'concluido'))} disabled={concluidos === 0}>
              Limpar concluídos
            </Button>
            <Button size="sm" variant="outline" onClick={() => setArquivos(INICIAL)}>
              Reiniciar demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
