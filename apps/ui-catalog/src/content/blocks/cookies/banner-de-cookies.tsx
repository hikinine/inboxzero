'use client'

import { useState } from 'react'
import { Cookie, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'

export default function BannerDeCookies() {
  const [visible, setVisible] = useState(true)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto min-h-[520px] max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="size-6 rounded-md bg-primary" />
            <span className="h-3 w-16 rounded bg-muted" />
          </div>
          <div className="hidden gap-6 sm:flex">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="h-3 w-12 rounded bg-muted" />
            ))}
          </div>
          <span className="h-7 w-20 rounded-lg bg-muted" />
        </div>
        <div className="px-6 py-12 sm:px-12">
          <span className="block h-4 w-24 rounded bg-muted" />
          <span className="mt-4 block h-9 w-3/4 max-w-lg rounded bg-muted" />
          <span className="mt-2 block h-9 w-1/2 max-w-sm rounded bg-muted" />
          <span className="mt-5 block h-4 w-full max-w-md rounded bg-muted/70" />
          <span className="mt-2 block h-4 w-2/3 max-w-sm rounded bg-muted/70" />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <span key={i} className="block aspect-[4/3] rounded-xl bg-gradient-to-br from-muted to-muted-foreground/10" />
            ))}
          </div>
        </div>

        {!visible && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
              Mostrar banner de novo
            </Button>
          </div>
        )}

        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 48, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-x-0 bottom-0 border-t bg-card/95 p-4 backdrop-blur sm:p-5"
              role="region"
              aria-label="Aviso de cookies"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex flex-1 items-start gap-3 pr-8 lg:pr-0">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    <Cookie className="size-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">Usamos cookies</div>
                    <p className="text-sm text-muted-foreground">
                      Eles lembram suas preferências e nos ajudam a medir o que funciona. Você decide quais aceitar.{' '}
                      <a href="#" className="underline underline-offset-4 hover:text-foreground">
                        Política de cookies
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
                  <Button variant="ghost" size="sm">
                    Preferências
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setVisible(false)}>
                    Rejeitar
                  </Button>
                  <Button size="sm" onClick={() => setVisible(false)}>
                    Aceitar tudo
                  </Button>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fechar aviso de cookies"
                onClick={() => setVisible(false)}
                className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
