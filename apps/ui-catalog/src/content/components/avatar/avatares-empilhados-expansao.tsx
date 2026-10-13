'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const PESSOAS = [
  { ini: 'AS', nome: 'Ana Souza', cargo: 'Produto', cor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300' },
  { ini: 'BM', nome: 'Bruno Melo', cargo: 'Front-end', cor: 'bg-sky-500/15 text-sky-700 dark:text-sky-300' },
  { ini: 'CL', nome: 'Carla Lima', cargo: 'Design', cor: 'bg-violet-500/15 text-violet-700 dark:text-violet-300' },
  { ini: 'DT', nome: 'Diego Torres', cargo: 'Back-end', cor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
  { ini: 'EF', nome: 'Elisa Farias', cargo: 'Dados', cor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  { ini: 'FN', nome: 'Felipe Nunes', cargo: 'QA', cor: 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300' },
  { ini: 'GR', nome: 'Gabi Ramos', cargo: 'Suporte', cor: 'bg-teal-500/15 text-teal-700 dark:text-teal-300' },
] as const

const mola = { type: 'spring', stiffness: 380, damping: 28 } as const

function Leque() {
  const [aberto, setAberto] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)} onFocus={() => setAberto(true)} onBlur={() => setAberto(false)} tabIndex={0} aria-label="Equipe do projeto">
        {PESSOAS.slice(0, 5).map((p, i) => (
          <motion.div key={p.ini} animate={{ marginLeft: i === 0 ? 0 : aberto ? 6 : -14 }} transition={mola} style={{ zIndex: 10 - i }}>
            <Avatar size="lg" className="ring-2 ring-background">
              <AvatarFallback className={cn('font-medium', p.cor)}>{p.ini}</AvatarFallback>
            </Avatar>
          </motion.div>
        ))}
      </div>
      <motion.span animate={{ opacity: aberto ? 0 : 1 }} className="text-sm text-muted-foreground">
        5 pessoas
      </motion.span>
    </div>
  )
}

function Destaque() {
  const [ativo, setAtivo] = useState<number | null>(null)
  return (
    <div className="flex items-end" onMouseLeave={() => setAtivo(null)}>
      {PESSOAS.slice(0, 6).map((p, i) => {
        const eu = ativo === i
        const vizinho = ativo !== null && Math.abs(ativo - i) === 1
        return (
          <motion.div
            key={p.ini}
            onMouseEnter={() => setAtivo(i)}
            animate={{ y: eu ? -10 : vizinho ? -3 : 0, scale: eu ? 1.25 : vizinho ? 1.08 : 1, marginLeft: i === 0 ? 0 : -10 }}
            transition={mola}
            className="relative"
            style={{ zIndex: eu ? 20 : 10 - i }}
          >
            <AnimatePresence>
              {eu && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 0.8 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-center text-xs text-background shadow"
                >
                  <div className="font-medium">{p.nome}</div>
                  <div className="text-[10px] opacity-70">{p.cargo}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <Avatar className="ring-2 ring-background">
              <AvatarFallback className={cn('text-xs font-medium', p.cor)}>{p.ini}</AvatarFallback>
            </Avatar>
          </motion.div>
        )
      })}
    </div>
  )
}

function ContadorExpansivel() {
  const [expandido, setExpandido] = useState(false)
  const visiveis = 3
  const resto = PESSOAS.slice(visiveis)

  return (
    <div className="w-full">
      <motion.div layout className="flex flex-wrap items-center gap-y-2">
        {PESSOAS.slice(0, visiveis).map((p, i) => (
          <motion.div layout key={p.ini} className={cn('ring-2 ring-background rounded-full', i > 0 && '-ml-2')} style={{ zIndex: 10 - i }}>
            <Avatar size="sm">
              <AvatarFallback className={cn('text-[10px] font-medium', p.cor)}>{p.ini}</AvatarFallback>
            </Avatar>
          </motion.div>
        ))}
        <AnimatePresence initial={false}>
          {expandido &&
            resto.map((p, i) => (
              <motion.div
                layout
                key={p.ini}
                initial={{ opacity: 0, scale: 0.4, x: -12 }}
                animate={{ opacity: 1, scale: 1, x: 0, transition: { ...mola, delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.4 }}
                className="-ml-2 rounded-full ring-2 ring-background"
              >
                <Avatar size="sm">
                  <AvatarFallback className={cn('text-[10px] font-medium', p.cor)}>{p.ini}</AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
        </AnimatePresence>
        <motion.button
          layout
          type="button"
          onClick={() => setExpandido((e) => !e)}
          aria-expanded={expandido}
          className="-ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-semibold ring-2 ring-background hover:bg-accent"
        >
          {expandido ? 'menos' : `+${resto.length}`}
        </motion.button>
        <motion.button layout type="button" aria-label="Convidar pessoa" className="ml-2 flex size-6 items-center justify-center rounded-full border border-dashed text-muted-foreground hover:text-foreground">
          <Plus className="size-3" />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function AvataresEmpilhadosExpansao() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Caixa title="Leque: abre no hover">
        <Leque />
      </Caixa>
      <Caixa title="Destaque com nome (efeito dock)">
        <div className="pt-12">
          <Destaque />
        </div>
      </Caixa>
      <Caixa title="Contador que expande">
        <ContadorExpansivel />
      </Caixa>
    </div>
  )
}

function Caixa({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 text-xs font-medium text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
