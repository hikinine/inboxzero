'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface Chip {
  id: string
  group: string
  label: string
  swatch?: string
}

const INITIAL: Chip[] = [
  { id: 'cat-tenis', group: 'Categoria', label: 'Tênis' },
  { id: 'cor-preto', group: 'Cor', label: 'Preto', swatch: 'bg-neutral-900' },
  { id: 'cor-azul', group: 'Cor', label: 'Azul', swatch: 'bg-sky-500' },
  { id: 'tam-42', group: 'Tamanho', label: '42' },
  { id: 'preco', group: 'Preço', label: 'R$ 200 – R$ 600' },
  { id: 'marca-aero', group: 'Marca', label: 'Aero' },
]
const SUGGESTED: Chip[] = [
  { id: 'frete', group: 'Entrega', label: 'Frete grátis' },
  { id: 'promo', group: 'Oferta', label: 'Em promoção' },
  { id: 'tam-41', group: 'Tamanho', label: '41' },
  { id: 'cor-branco', group: 'Cor', label: 'Branco', swatch: 'bg-white border' },
  { id: 'nota', group: 'Avaliação', label: '4 estrelas ou mais' },
]
const GRADIENTS = ['from-neutral-600 to-neutral-900', 'from-sky-400 to-sky-700', 'from-rose-400 to-rose-700', 'from-amber-200 to-amber-500']

export default function FiltrosEmChips() {
  const [active, setActive] = useState<Chip[]>(INITIAL)
  const available = SUGGESTED.filter((s) => !active.some((a) => a.id === s.id))
  const results = Math.max(3, 128 - active.length * 19)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm">
              <span className="font-medium">Filtros ativos</span>{' '}
              <span className="text-muted-foreground">({active.length})</span>
            </div>
            <Button variant="ghost" size="xs" disabled={active.length === 0} onClick={() => setActive([])}>
              Limpar tudo
            </Button>
          </div>

          <div className="mt-3 flex min-h-9 flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {active.map((chip) => (
                <motion.span
                  key={chip.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-background pl-3 pr-1 text-sm"
                >
                  {chip.swatch && <span className={cn('size-3 rounded-full', chip.swatch)} aria-hidden="true" />}
                  <span className="text-muted-foreground">{chip.group}:</span>
                  <span className="font-medium">{chip.label}</span>
                  <button
                    type="button"
                    aria-label={`Remover filtro ${chip.group}: ${chip.label}`}
                    onClick={() => setActive((list) => list.filter((c) => c.id !== chip.id))}
                    className="ml-0.5 flex size-6 items-center justify-center rounded-full hover:bg-muted"
                  >
                    <X className="size-3.5" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            {active.length === 0 && <p className="self-center text-sm text-muted-foreground">Nenhum filtro aplicado — mostrando todos os produtos.</p>}
          </div>

          {available.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Sugestões</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {available.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActive((list) => [...list, chip])}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full border border-dashed px-3 text-sm text-muted-foreground transition-colors hover:border-solid hover:bg-muted hover:text-foreground"
                  >
                    <Plus className="size-3.5" />
                    {chip.swatch && <span className={cn('size-3 rounded-full', chip.swatch)} aria-hidden="true" />}
                    {chip.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">{results}</span> resultados
          </p>
          <span className="text-muted-foreground">Ordenado por relevância</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-hidden="true">
          {GRADIENTS.map((g, i) => (
            <div key={i} className="rounded-xl border bg-card p-3">
              <div className={cn('aspect-square rounded-lg bg-gradient-to-br', g)} />
              <div className="mt-3 h-3 w-3/4 rounded bg-muted" />
              <div className="mt-2 h-3 w-1/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
