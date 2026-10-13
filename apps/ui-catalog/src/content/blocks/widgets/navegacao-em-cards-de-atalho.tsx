'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Boxes, ChartColumn, Plug, Receipt, Search, Settings, ShoppingBag, Star, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'

interface Atalho {
  id: string
  Icon: LucideIcon
  titulo: string
  contagem: string
  detalhe: string
  tom: string
  alerta?: string
}

const ATALHOS: Atalho[] = [
  { id: 'pedidos', Icon: ShoppingBag, titulo: 'Pedidos', contagem: '128', detalhe: 'novos hoje', tom: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', alerta: '12 atrasados' },
  { id: 'clientes', Icon: Users, titulo: 'Clientes', contagem: '4.812', detalhe: 'ativos', tom: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  { id: 'produtos', Icon: Boxes, titulo: 'Produtos', contagem: '356', detalhe: 'no catálogo', tom: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', alerta: '7 sem estoque' },
  { id: 'financeiro', Icon: Receipt, titulo: 'Financeiro', contagem: 'R$ 48,2 mil', detalhe: 'a receber', tom: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { id: 'relatorios', Icon: ChartColumn, titulo: 'Relatórios', contagem: '14', detalhe: 'salvos', tom: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  { id: 'integracoes', Icon: Plug, titulo: 'Integrações', contagem: '9', detalhe: 'conectadas', tom: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
  { id: 'config', Icon: Settings, titulo: 'Configurações', contagem: '3', detalhe: 'pendências', tom: 'bg-muted text-foreground' },
]

export default function NavegacaoEmCardsDeAtalho() {
  const [busca, setBusca] = useState('')
  const [favoritos, setFavoritos] = useState<string[]>(['pedidos', 'financeiro'])

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return ATALHOS.filter((a) => !termo || a.titulo.toLowerCase().includes(termo)).sort((a, b) => Number(favoritos.includes(b.id)) - Number(favoritos.includes(a.id)))
  }, [busca, favoritos])

  const alternar = (id: string) => setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  return (
    <section className="w-full px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Bom dia, Patrícia</h2>
            <p className="text-sm text-muted-foreground">Ir direto para onde você trabalha mais. Favoritos aparecem primeiro.</p>
          </div>
          <InputGroup className="sm:w-64">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Filtrar atalhos" aria-label="Filtrar atalhos" value={busca} onChange={(e) => setBusca(e.target.value)} />
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <motion.ul layout className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence initial={false}>
            {lista.map((a, i) => {
              const fav = favoritos.includes(a.id)
              return (
                <motion.li key={a.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} className="relative">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group flex h-full flex-col rounded-xl border bg-card p-4 transition-colors outline-none hover:border-foreground/20 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-start justify-between">
                      <span className={cn('flex size-10 items-center justify-center rounded-lg', a.tom)}>
                        <a.Icon className="size-5" />
                      </span>
                      <span className="flex size-7 items-center justify-center rounded-full border text-muted-foreground transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">{a.titulo}</p>
                    <p className="mt-0.5 text-2xl font-semibold tracking-tight tabular-nums">
                      {a.contagem} <span className="text-xs font-normal text-muted-foreground">{a.detalhe}</span>
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      {a.alerta ? (
                        <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400">
                          {a.alerta}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Tudo em dia</span>
                      )}
                      {i < 9 && <Kbd className="opacity-0 transition-opacity group-hover:opacity-100">G {i + 1}</Kbd>}
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => alternar(a.id)}
                    aria-label={fav ? `Remover ${a.titulo} dos favoritos` : `Favoritar ${a.titulo}`}
                    aria-pressed={fav}
                    className="absolute top-4 right-14 flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                  >
                    <Star className={cn('size-4', fav && 'fill-amber-400 text-amber-400')} />
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
          {lista.length === 0 && <li className="col-span-full rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">Nenhum atalho para “{busca}”.</li>}
        </motion.ul>
      </div>
    </section>
  )
}
