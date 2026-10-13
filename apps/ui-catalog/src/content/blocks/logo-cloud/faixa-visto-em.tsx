'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Veiculo {
  nome: string
  tipo: 'Imprensa' | 'Comunidade' | 'Podcast'
  manchete: string
  cor: string
  estilo: string
}

const VEICULOS: Veiculo[] = [
  { nome: 'Exame', tipo: 'Imprensa', manchete: '“A startup catarinense que quer acabar com a planilha do pequeno varejo”', cor: 'group-hover:text-rose-600 dark:group-hover:text-rose-400', estilo: 'font-serif text-2xl font-bold tracking-tight' },
  { nome: 'Valor', tipo: 'Imprensa', manchete: '“Rodada de R$ 40 milhões para expandir no Nordeste”', cor: 'group-hover:text-sky-700 dark:group-hover:text-sky-400', estilo: 'font-serif text-2xl italic' },
  { nome: 'Startupi', tipo: 'Imprensa', manchete: '“Entre as 100 startups para ficar de olho em 2026”', cor: 'group-hover:text-orange-500', estilo: 'text-xl font-black lowercase tracking-tighter' },
  { nome: 'Product Hunt', tipo: 'Comunidade', manchete: '#2 produto do dia, com 1.380 votos', cor: 'group-hover:text-orange-600 dark:group-hover:text-orange-400', estilo: 'text-lg font-semibold' },
  { nome: 'TabNews', tipo: 'Comunidade', manchete: 'Post mais votado da semana sobre arquitetura do produto', cor: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400', estilo: 'font-mono text-lg font-bold' },
  { nome: 'Hipsters.tech', tipo: 'Podcast', manchete: 'Episódio 412: como escalar suporte com 6 pessoas', cor: 'group-hover:text-violet-600 dark:group-hover:text-violet-400', estilo: 'text-lg font-medium tracking-wide uppercase' },
]

export default function FaixaVistoEm() {
  const [ativo, setAtivo] = useState<Veiculo | null>(null)

  return (
    <section className="w-full px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 rounded-2xl border bg-card px-6 py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
          <div className="flex shrink-0 items-center gap-3 lg:w-40 lg:flex-col lg:items-start">
            <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Newspaper className="size-4" />
            </span>
            <p className="text-sm leading-tight font-medium">
              Como visto em
              <span className="block text-xs font-normal text-muted-foreground">imprensa e comunidade</span>
            </p>
          </div>

          <div className="hidden h-14 w-px bg-border lg:block" />

          <div className="min-w-0 flex-1">
            <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6" onMouseLeave={() => setAtivo(null)}>
              {VEICULOS.map((v) => (
                <li key={v.nome}>
                  <button
                    type="button"
                    onMouseEnter={() => setAtivo(v)}
                    onFocus={() => setAtivo(v)}
                    className={cn(
                      'group flex h-10 w-full items-center justify-center rounded-md text-muted-foreground/60 grayscale transition-all duration-300 outline-none hover:scale-105 hover:grayscale-0 focus-visible:ring-2 focus-visible:ring-ring',
                      ativo && ativo.nome !== v.nome && 'opacity-40',
                    )}
                    aria-label={`${v.nome} — ${v.manchete}`}
                  >
                    <span className={cn('transition-colors', v.estilo, v.cor)}>{v.nome}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 h-10 border-t pt-4">
              <AnimatePresence mode="wait">
                {ativo ? (
                  <motion.p key={ativo.nome} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }} className="truncate text-sm">
                    <span className="mr-2 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">{ativo.tipo}</span>
                    {ativo.manchete}
                  </motion.p>
                ) : (
                  <motion.p key="dica" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-muted-foreground">
                    Passe o mouse sobre um veículo para ler a menção.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
