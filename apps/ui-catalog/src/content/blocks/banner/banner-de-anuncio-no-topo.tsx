'use client'

import { useState } from 'react'
import { ArrowRight, Megaphone, Sparkles, TriangleAlert, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'

type Id = 'novidade' | 'promocao' | 'aviso'

export default function BannerDeAnuncioNoTopo() {
  const [hidden, setHidden] = useState<Record<Id, boolean>>({ novidade: false, promocao: false, aviso: false })
  const close = (id: Id) => setHidden((h) => ({ ...h, [id]: true }))
  const anyHidden = Object.values(hidden).some(Boolean)

  const closeButton = (id: Id, className: string) => (
    <button type="button" aria-label="Fechar aviso" onClick={() => close(id)} className={`shrink-0 rounded-md p-1 transition-colors ${className}`}>
      <X className="size-4" />
    </button>
  )

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-3">
        <AnimatePresence initial={false}>
          {!hidden.novidade && (
            <motion.div key="novidade" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="flex items-center gap-3 rounded-xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                <Sparkles className="size-4 shrink-0" />
                <p className="min-w-0 flex-1 truncate">
                  <span className="font-medium">Novo:</span> automações com IA já estão disponíveis em todos os planos.
                </p>
                <a href="#" className="hidden shrink-0 items-center gap-1 font-medium underline-offset-4 hover:underline sm:inline-flex">
                  Conhecer <ArrowRight className="size-3.5" />
                </a>
                {closeButton('novidade', 'hover:bg-primary-foreground/15')}
              </div>
            </motion.div>
          )}

          {!hidden.promocao && (
            <motion.div key="promocao" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-4 py-2.5 text-sm text-white">
                <Megaphone className="size-4 shrink-0" />
                <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">-30%</span>
                <p className="min-w-0 flex-1 truncate">Plano anual com 30% de desconto até sexta-feira, 16 de outubro.</p>
                <Button size="xs" className="hidden shrink-0 bg-white text-zinc-900 hover:bg-white/90 sm:inline-flex">
                  Aproveitar
                </Button>
                {closeButton('promocao', 'hover:bg-white/15')}
              </div>
            </motion.div>
          )}

          {!hidden.aviso && (
            <motion.div key="aviso" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-950 dark:text-amber-100">
                <TriangleAlert className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="min-w-0 flex-1 truncate">
                  <span className="font-medium">Manutenção programada:</span> sábado, 17 de outubro, das 02:00 às 04:00 (horário de Brasília).
                </p>
                <a href="#" className="hidden shrink-0 font-medium underline underline-offset-4 sm:inline">
                  Ver detalhes
                </a>
                {closeButton('aviso', 'hover:bg-amber-500/20')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {anyHidden && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" size="sm" onClick={() => setHidden({ novidade: false, promocao: false, aviso: false })}>
              Restaurar banners
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
