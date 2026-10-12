'use client'

import { useState } from 'react'
import { Cookie, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Estado = 'aberto' | 'aceito' | 'rejeitado'

const LINHAS = [100, 95, 88, 100, 70]

export default function CookiesEmCardFlutuante() {
  const [estado, setEstado] = useState<Estado>('aberto')

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto min-h-[520px] max-w-5xl overflow-hidden rounded-2xl border bg-muted/30">
        <div className="flex items-center justify-between border-b bg-background px-6 py-3">
          <span className="flex items-center gap-2">
            <span className="size-6 rounded-md bg-primary" />
            <span className="h-3 w-14 rounded bg-muted" />
          </span>
          <span className="h-7 w-24 rounded-lg bg-muted" />
        </div>
        <div className="mx-auto max-w-2xl px-6 py-10" aria-hidden>
          <span className="block h-3 w-20 rounded bg-muted-foreground/15" />
          <span className="mt-4 block h-8 w-5/6 rounded bg-muted-foreground/15" />
          <span className="mt-2 block h-8 w-3/5 rounded bg-muted-foreground/15" />
          <div className="mt-6 flex items-center gap-3">
            <span className="size-8 rounded-full bg-muted-foreground/15" />
            <span className="h-3 w-32 rounded bg-muted-foreground/15" />
          </div>
          <span className="mt-8 block aspect-[16/7] w-full rounded-xl bg-gradient-to-br from-muted to-muted-foreground/15" />
          <div className="mt-8 space-y-2.5">
            {LINHAS.map((w, i) => (
              <span key={i} className="block h-3 rounded bg-muted-foreground/10" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {estado === 'aberto' && (
            <motion.div
              key="card"
              role="dialog"
              aria-label="Consentimento de cookies"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="absolute bottom-4 left-4 w-[calc(100%-2rem)] max-w-sm rounded-2xl border bg-card p-5 shadow-2xl sm:bottom-6 sm:left-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Cookie className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Biscoitos? Só os digitais.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Usamos cookies para lembrar suas preferências e entender o que funciona por aqui. Nada vai para terceiros sem você permitir.</p>
                </div>
                <button type="button" aria-label="Fechar" onClick={() => setEstado('rejeitado')} className="-mt-1 -mr-1 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setEstado('rejeitado')}>
                  Só essenciais
                </Button>
                <Button onClick={() => setEstado('aceito')}>Aceitar todos</Button>
              </div>
              <a href="#" className="mt-3 block text-center text-xs text-muted-foreground underline-offset-4 hover:underline">
                Gerenciar preferências
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {estado !== 'aberto' && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm sm:bottom-6 sm:left-6">
            <span className={cn('size-1.5 rounded-full', estado === 'aceito' ? 'bg-emerald-500' : 'bg-muted-foreground/50')} />
            {estado === 'aceito' ? 'Cookies aceitos' : 'Só essenciais'}
            <button type="button" className="ml-1 font-medium text-foreground underline-offset-4 hover:underline" onClick={() => setEstado('aberto')}>
              Alterar
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
