'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, X } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

export default function BannerDeLancamentoComGradiente() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <section className="w-full px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-6xl justify-center">
          <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
            Mostrar banner de novo
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 text-white shadow-lg">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <motion.div className="absolute -top-20 -left-10 size-64 rounded-full bg-white/20 blur-3xl" animate={{ x: [0, 30, 0], y: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -right-10 -bottom-24 size-72 rounded-full bg-fuchsia-400/30 blur-3xl" animate={{ x: [0, -20, 0], y: [0, -14, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] bg-[size:22px_22px] opacity-40" />
        </div>

        <div className="relative grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="size-3.5" /> Lançamento · 12 de outubro
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">O Copiloto de Vendas chegou</h2>
            <p className="mt-3 max-w-lg text-white/80">Ele lê a conversa, sugere a próxima mensagem e preenche o CRM sozinho. Disponível hoje para todos os planos, sem custo extra até dezembro.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="bg-white text-indigo-700 hover:bg-white/90">
                Ativar no meu painel <ArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/15 hover:text-white">
                Ver demonstração de 2 min
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className="size-2 rounded-full bg-emerald-300" /> Juliana Prado · WhatsApp
              </div>
              <p className="mt-2 rounded-lg bg-white/15 px-3 py-2 text-sm">Oi! Fechei o plano anual mas não recebi o acesso ainda.</p>
              <div className="mt-3 rounded-lg border border-dashed border-white/40 p-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-white/70">
                  <Sparkles className="size-3" /> Sugestão do copiloto
                </div>
                <p className="mt-1.5 text-sm">Oi, Juliana! Já liberei seu acesso — chega por e-mail em 2 min. Quer que eu agende um onboarding?</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-indigo-700">Enviar</span>
                  <span className="rounded-md bg-white/15 px-2 py-1 text-[11px]">Editar</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <button type="button" aria-label="Fechar banner" onClick={() => setVisible(false)} className="absolute top-3 right-3 rounded-md p-1 text-white/70 transition-colors hover:bg-white/15 hover:text-white">
          <X className="size-4" />
        </button>
      </div>
    </section>
  )
}
