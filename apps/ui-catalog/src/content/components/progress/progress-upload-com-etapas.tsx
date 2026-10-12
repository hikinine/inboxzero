'use client'

import { useEffect, useState } from 'react'
import { Check, CloudUpload, FileSpreadsheet, FileText, Image, Pause, Play, X, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Arquivo {
  nome: string
  tamanho: number
  Icon: LucideIcon
}

const ARQUIVOS: Arquivo[] = [
  { nome: 'contatos-outubro.csv', tamanho: 2.1, Icon: FileSpreadsheet },
  { nome: 'contrato-kavo.pdf', tamanho: 4.8, Icon: FileText },
  { nome: 'banner-campanha.png', tamanho: 3.4, Icon: Image },
]
const TOTAL_MB = ARQUIVOS.reduce((a, f) => a + f.tamanho, 0)
const ETAPAS = ['Enviando', 'Processando', 'Publicado']
const VELOCIDADE = 0.32 // MB por tick

const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export default function ProgressUploadComEtapas() {
  const [enviado, setEnviado] = useState(3.6)
  const [pausado, setPausado] = useState(false)
  const [processado, setProcessado] = useState(0)

  const uploadCompleto = enviado >= TOTAL_MB
  const etapa = !uploadCompleto ? 0 : processado < 100 ? 1 : 2

  useEffect(() => {
    if (pausado || uploadCompleto) return
    const id = setInterval(() => setEnviado((v) => Math.min(TOTAL_MB, v + VELOCIDADE)), 250)
    return () => clearInterval(id)
  }, [pausado, uploadCompleto])

  useEffect(() => {
    if (!uploadCompleto || processado >= 100) return
    const id = setInterval(() => setProcessado((v) => Math.min(100, v + 5)), 200)
    return () => clearInterval(id)
  }, [uploadCompleto, processado])

  const pct = Math.round((enviado / TOTAL_MB) * 100)
  const restanteSeg = pausado ? null : Math.ceil(((TOTAL_MB - enviado) / VELOCIDADE) * 0.25)

  // Progresso individual: os arquivos sobem em sequência.
  let acumulado = 0
  const porArquivo = ARQUIVOS.map((f) => {
    const inicio = acumulado
    acumulado += f.tamanho
    const feito = Math.max(0, Math.min(f.tamanho, enviado - inicio))
    return { ...f, feito, pctArq: Math.round((feito / f.tamanho) * 100) }
  })

  const reiniciar = () => {
    setEnviado(0)
    setProcessado(0)
    setPausado(false)
  }

  return (
    <div className="w-full max-w-md rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b p-4">
        <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', etapa === 2 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-primary/10 text-primary')}>{etapa === 2 ? <Check className="size-4" /> : <CloudUpload className="size-4" />}</span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium">{etapa === 2 ? 'Tudo publicado' : etapa === 1 ? 'Processando arquivos' : pausado ? 'Envio pausado' : 'Enviando 3 arquivos'}</div>
          <div className="text-xs text-muted-foreground tabular-nums">
            {fmt(Math.min(enviado, TOTAL_MB))} MB de {fmt(TOTAL_MB)} MB{restanteSeg !== null && !uploadCompleto ? ` · ${restanteSeg}s restantes` : ''}
          </div>
        </div>
        {!uploadCompleto ? (
          <>
            <Button size="icon-sm" variant="outline" aria-label={pausado ? 'Retomar' : 'Pausar'} onClick={() => setPausado((p) => !p)}>
              {pausado ? <Play /> : <Pause />}
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Cancelar envio" onClick={reiniciar}>
              <X />
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" onClick={reiniciar}>
            Enviar de novo
          </Button>
        )}
      </div>

      <div className="space-y-3 p-4">
        <ol className="flex items-center gap-2">
          {ETAPAS.map((e, i) => {
            const estado = i < etapa ? 'done' : i === etapa ? 'current' : 'pending'
            return (
              <li key={e} className="flex flex-1 items-center gap-2">
                <span className={cn('flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium', estado === 'done' && 'bg-emerald-500 text-white', estado === 'current' && 'bg-primary text-primary-foreground', estado === 'pending' && 'bg-muted text-muted-foreground')}>{estado === 'done' ? <Check className="size-3" /> : i + 1}</span>
                <span className={cn('text-xs', estado === 'pending' ? 'text-muted-foreground' : 'font-medium')}>{e}</span>
                {i < ETAPAS.length - 1 && <span className={cn('h-px flex-1', i < etapa ? 'bg-emerald-500' : 'bg-border')} aria-hidden />}
              </li>
            )
          })}
        </ol>

        <Progress value={etapa === 0 ? pct : processado} className={cn('gap-1.5 [&_[data-slot=progress-track]]:h-2', etapa === 2 && '[&_[data-slot=progress-indicator]]:bg-emerald-500')}>
          <ProgressLabel className="text-xs text-muted-foreground">{etapa === 0 ? 'Upload' : etapa === 1 ? 'Validando e indexando' : 'Concluído'}</ProgressLabel>
          <ProgressValue className="text-xs" />
        </Progress>
      </div>

      <ul className="divide-y border-t">
        {porArquivo.map((f) => {
          const completo = f.pctArq === 100
          const ativo = !completo && f.feito > 0
          return (
            <li key={f.nome} className="flex items-center gap-3 px-4 py-2.5">
              <f.Icon className={cn('size-4 shrink-0', completo ? 'text-emerald-500' : ativo ? 'text-primary' : 'text-muted-foreground')} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className={cn('truncate', !ativo && !completo && 'text-muted-foreground')}>{f.nome}</span>
                  <span className="shrink-0 text-muted-foreground tabular-nums">{completo ? `${fmt(f.tamanho)} MB` : ativo ? `${fmt(f.feito)} / ${fmt(f.tamanho)} MB` : 'Na fila'}</span>
                </div>
                <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-muted">
                  <span className={cn('block h-full rounded-full transition-[width] duration-200', completo ? 'bg-emerald-500' : 'bg-primary')} style={{ width: `${f.pctArq}%` }} />
                </span>
              </div>
              {completo && <Check className="size-3.5 shrink-0 text-emerald-500" />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
