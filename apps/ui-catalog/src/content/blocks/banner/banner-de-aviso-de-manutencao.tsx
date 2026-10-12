'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ExternalLink, Wrench, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const INICIAL = 2 * 86400 + 5 * 3600 + 12 * 60 + 40

type Nivel = 'alto' | 'medio' | 'nenhum'

const SERVICOS: Array<{ name: string; impacto: string; nivel: Nivel }> = [
  { name: 'API e webhooks', impacto: 'Indisponível na janela', nivel: 'alto' },
  { name: 'Painel web', impacto: 'Somente leitura', nivel: 'medio' },
  { name: 'Envio pelo WhatsApp', impacto: 'Enfileirado, entrega depois', nivel: 'medio' },
  { name: 'Apps iOS e Android', impacto: 'Sem impacto', nivel: 'nenhum' },
]

const COR: Record<Nivel, string> = { alto: 'bg-rose-500', medio: 'bg-amber-500', nenhum: 'bg-emerald-500' }

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function fmt(total: number) {
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return d > 0 ? `${d}d ${pad(h)}h ${pad(m)}min` : `${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function BannerDeAvisoDeManutencao() {
  const [remaining, setRemaining] = useState(INICIAL)
  const [open, setOpen] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const amberBtn = 'text-amber-900 hover:bg-amber-500/20 hover:text-amber-950 dark:text-amber-200 dark:hover:text-amber-100'

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatePresence initial={false} mode="wait">
          {visible ? (
            <motion.div key="banner" role="status" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="overflow-hidden rounded-xl border border-amber-500/40 bg-amber-500/10">
              <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    <Wrench className="size-4" />
                  </span>
                  <div className="min-w-0 text-sm">
                    <p className="font-medium text-amber-950 dark:text-amber-100">Manutenção programada: sábado, 17 de outubro, das 02:00 às 04:00 (horário de Brasília)</p>
                    <p className="text-amber-900/80 dark:text-amber-200/80">
                      Vamos migrar o banco de dados para uma infraestrutura nova. Começa em <span className="font-semibold text-amber-950 tabular-nums dark:text-amber-100">{fmt(remaining)}</span>.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <Button variant="ghost" size="sm" className={amberBtn} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                    Detalhes <ChevronDown data-icon="inline-end" className={cn('transition-transform', open && 'rotate-180')} />
                  </Button>
                  <Button nativeButton={false} render={<a href="#" />} variant="outline" size="sm" className="border-amber-500/40 bg-transparent hover:bg-amber-500/15 dark:bg-transparent">
                    Página de status <ExternalLink data-icon="inline-end" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" aria-label="Fechar aviso" className={amberBtn} onClick={() => setVisible(false)}>
                    <X />
                  </Button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div key="detalhes" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="grid gap-px border-t border-amber-500/30 bg-amber-500/20 sm:grid-cols-2 lg:grid-cols-4">
                      {SERVICOS.map((s) => (
                        <div key={s.name} className="bg-background/70 px-4 py-3 text-sm">
                          <p className="font-medium">{s.name}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className={cn('size-1.5 rounded-full', COR[s.nivel])} />
                            {s.impacto}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-amber-500/30 px-4 py-2 text-xs text-amber-900/80 dark:text-amber-200/80">
                      <span>Avisaremos por e-mail 1 hora antes de começar e assim que terminar.</span>
                      <button type="button" className="font-medium underline underline-offset-4 hover:text-amber-950 dark:hover:text-amber-100">
                        Adicionar ao calendário
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="fechado" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
              <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
                Mostrar aviso de novo
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
