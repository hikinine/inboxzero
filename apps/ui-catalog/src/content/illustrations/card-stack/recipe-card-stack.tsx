'use client'

import { useEffect, useState } from 'react'
import { Check, ChefHat, Clock, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Recipe Card Stack": fichas de receita pautadas, levemente bagunçadas. Na ficha da frente os ingredientes são
// ticados um a um, o carimbo "Pronto!" cai com mola e a ficha faz um arco para a direita e volta por baixo da pilha,
// revelando a próxima receita.
interface Recipe {
  title: string
  time: string
  yield: string
  ingredients: readonly string[]
  tint: string
}

const RECIPES: readonly Recipe[] = [
  { title: 'Pão de queijo', time: '25 min', yield: '20 un.', ingredients: ['500 g de polvilho azedo', '2 ovos', '200 g de queijo meia cura', '1 xíc. de leite'], tint: 'text-amber-600 dark:text-amber-400' },
  { title: 'Moqueca baiana', time: '50 min', yield: '4 porções', ingredients: ['800 g de peixe em postas', '200 ml de leite de coco', '2 col. de azeite de dendê', '1 pimentão vermelho'], tint: 'text-orange-600 dark:text-orange-400' },
  { title: 'Brigadeiro', time: '20 min', yield: '30 un.', ingredients: ['1 lata de leite condensado', '2 col. de cacau em pó', '1 col. de manteiga', 'Chocolate granulado'], tint: 'text-rose-600 dark:text-rose-400' },
  { title: 'Bolo de cenoura', time: '45 min', yield: '12 fatias', ingredients: ['3 cenouras médias', '3 ovos', '2 xíc. de farinha de trigo', '1 xíc. de óleo'], tint: 'text-emerald-600 dark:text-emerald-400' },
]

const N = RECIPES.length
const TICKS_PER_CARD = 9
const ROT = [-2, 4, -5, 3] as const

export default function RecipeCardStack() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 480)
    return () => clearInterval(id)
  }, [])
  const head = Math.floor(t / TICKS_PER_CARD) % N
  const local = t % TICKS_PER_CARD
  const checked = Math.min(local, 4)
  const done = local >= 5

  return (
    <div className="relative h-[320px] w-[420px] text-foreground">
      {RECIPES.map((r, i) => {
        const depth = (i - head + N) % N
        const front = depth === 0
        const target = { x: depth * 9, y: -depth * 9, rotate: ROT[depth]!, scale: 1 - depth * 0.035 }
        const returning = depth === N - 1
        return (
          <motion.div
            key={r.title}
            initial={false}
            animate={
              returning
                ? { x: [0, 250, target.x], y: [0, -16, target.y], rotate: [ROT[0], 16, target.rotate], scale: [1, 0.95, target.scale], zIndex: [11, 11, 1] }
                : { ...target, zIndex: 10 - depth }
            }
            transition={returning ? { duration: 1.1, times: [0, 0.45, 1], ease: 'easeInOut' } : { type: 'spring', stiffness: 200, damping: 24 }}
            className="absolute left-[86px] top-[52px] h-[216px] w-[240px] overflow-hidden rounded-lg border bg-card shadow-md"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 21px, var(--border) 21px, var(--border) 22px)',
              backgroundPosition: '0 50px',
            }}
          >
            <span className="absolute inset-y-0 left-7 w-px bg-rose-400/40" />
            <div className="relative px-4 pt-3 pl-10">
              <div className="flex items-center gap-1.5">
                <ChefHat className={cn('size-4', r.tint)} />
                <p className="text-base font-semibold tracking-tight">{r.title}</p>
              </div>
              <div className="mt-1 flex gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {r.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3" />
                  {r.yield}
                </span>
              </div>
              <p className="mt-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Ingredientes</p>
              <ul className="mt-1">
                {r.ingredients.map((ing, k) => {
                  const on = front && k < checked
                  return (
                    <li key={ing} className="flex h-[22px] items-center gap-2 text-xs">
                      <span className={cn('flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border transition-colors', on ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-muted-foreground/40')}>
                        {on && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
                            <Check className="size-2.5" strokeWidth={3} />
                          </motion.span>
                        )}
                      </span>
                      <span className={cn('truncate transition-colors', on && 'text-muted-foreground line-through')}>{ing}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <AnimatePresence>
              {front && done && (
                <motion.div
                  initial={{ opacity: 0, scale: 2, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: -14 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                  className="absolute bottom-4 right-3 rounded-md border-2 border-emerald-500 px-2 py-0.5 text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400"
                >
                  Pronto!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {RECIPES.map((r, i) => (
          <span key={r.title} className={cn('h-1.5 rounded-full transition-all', i === head ? 'w-5 bg-foreground' : 'w-1.5 bg-muted-foreground/30')} />
        ))}
      </div>
    </div>
  )
}
