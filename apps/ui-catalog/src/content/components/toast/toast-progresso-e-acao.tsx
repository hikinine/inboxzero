'use client'

import { useEffect, useRef, useState } from 'react'
import { Archive, CircleCheck, Download, FileSpreadsheet, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Toaster, toast } from '@/components/ui/toast'

const DURACAO = 5000

function ToastDesfazer({ onFim }: { onFim: () => void }) {
  const [restante, setRestante] = useState(DURACAO)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    if (pausado) return
    const inicio = Date.now()
    const base = restante
    const id = setInterval(() => {
      const r = base - (Date.now() - inicio)
      if (r <= 0) {
        clearInterval(id)
        onFim()
      } else setRestante(r)
    }, 50)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pausado])

  return (
    <div onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)} className="relative overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-lg">
      <div className="flex items-center gap-3 p-4">
        <Archive className="size-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Conversa arquivada</p>
          <p className="text-sm text-muted-foreground">Carla Mendes · Kavo Ltda</p>
        </div>
        <Button variant="outline" size="sm" onClick={onFim}>
          Desfazer
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Fechar" className="text-muted-foreground" onClick={onFim}>
          <X />
        </Button>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-muted" aria-hidden>
        <span className="block h-full bg-primary" style={{ width: `${(restante / DURACAO) * 100}%` }} />
      </span>
      <span className="sr-only">{pausado ? 'Pausado' : `Some em ${Math.ceil(restante / 1000)} segundos`}</span>
    </div>
  )
}

export default function ToastProgressoEAcao() {
  const [visivel, setVisivel] = useState(true)
  const [progresso, setProgresso] = useState(42)
  const intervalo = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const id = setInterval(() => setProgresso((p) => (p >= 100 ? 0 : p + 2)), 120)
    return () => clearInterval(id)
  }, [])

  useEffect(
    () => () => {
      if (intervalo.current) clearInterval(intervalo.current)
    },
    [],
  )

  const exportar = () => {
    if (intervalo.current) clearInterval(intervalo.current)
    const id = toast.add({ type: 'loading', title: 'Exportando relatório', description: '0% · lendo negócios', timeout: 0 })
    let p = 0
    intervalo.current = setInterval(() => {
      p += 10
      if (p < 100) {
        toast.update(id, { description: `${p}% · ${p < 50 ? 'lendo negócios' : 'gerando planilha'}` })
        return
      }
      if (intervalo.current) clearInterval(intervalo.current)
      toast.update(id, { type: 'success', title: 'Relatório pronto', description: 'vendas-outubro.xlsx · 1,2 MB', timeout: 6000, actionProps: { children: 'Baixar', onClick: () => toast.close(id) } })
    }, 350)
  }

  const arquivar = () => {
    const id = toast.add({ title: 'Conversa arquivada', description: 'Você tem 5 segundos para desfazer.', timeout: 5000, actionProps: { children: 'Desfazer', onClick: () => toast.close(id) } })
  }

  return (
    <Toaster>
      <div className="w-full max-w-md space-y-7">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Toasts reais: progresso atualizado e ação</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={exportar}>
              <FileSpreadsheet data-icon="inline-start" /> Exportar relatório
            </Button>
            <Button variant="outline" size="sm" onClick={arquivar}>
              <Archive data-icon="inline-start" /> Arquivar com desfazer
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Desfazer com tempo visível (pausa ao passar o mouse)</p>
          {visivel ? (
            <ToastDesfazer onFim={() => setVisivel(false)} />
          ) : (
            <div className="flex items-center justify-between rounded-2xl border border-dashed px-4 py-3 text-sm text-muted-foreground">
              O toast sumiu.
              <Button variant="ghost" size="sm" onClick={() => setVisivel(true)}>
                Mostrar de novo
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Progresso e sucesso (inline)</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg">
              <Spinner className="shrink-0" aria-label="Exportando" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">Exportando relatório</p>
                  <span className="text-xs text-muted-foreground tabular-nums">{progresso}%</span>
                </div>
                <span className="block h-1 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full rounded-full bg-primary transition-[width] duration-100" style={{ width: `${progresso}%` }} />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border bg-popover p-4 text-popover-foreground shadow-lg">
              <CircleCheck className="size-4 shrink-0 text-emerald-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Relatório pronto</p>
                <p className="text-sm text-muted-foreground">vendas-outubro.xlsx · 1,2 MB</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Download data-icon="inline-start" /> Baixar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Toaster>
  )
}
