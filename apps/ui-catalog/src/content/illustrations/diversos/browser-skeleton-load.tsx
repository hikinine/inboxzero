'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Lock, RotateCw, ShoppingBag, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Browser Skeleton Load": janela de navegador carregando uma loja. O endereço é digitado, a barra de progresso
// corre no topo enquanto o skeleton pisca, e o conteúdo real (hero, produtos com preço e nota) entra em
// crossfade no lugar exato dos blocos. Depois o botão de recarregar gira e o ciclo recomeça.
const URL_TEXT = 'lojadaana.com.br'
const PRODUCTS = [
  { name: 'Caneca de cerâmica', price: 'R$ 59,90', g: 'from-amber-300 to-orange-500' },
  { name: 'Vela aromática', price: 'R$ 42,00', g: 'from-rose-300 to-fuchsia-500' },
  { name: 'Tábua de madeira', price: 'R$ 89,00', g: 'from-lime-300 to-emerald-600' },
] as const

type Phase = 'typing' | 'loading' | 'loaded' | 'reload'

export default function BrowserSkeletonLoad() {
  const [phase, setPhase] = useState<Phase>('typing')
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (phase === 'typing') {
      if (chars < URL_TEXT.length) {
        const t = setTimeout(() => setChars((c) => c + 1), 60)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setPhase('loading'), 300)
      return () => clearTimeout(t)
    }
    const next: Record<Exclude<Phase, 'typing'>, [Phase, number]> = { loading: ['loaded', 1700], loaded: ['reload', 2600], reload: ['loading', 600] }
    const [to, ms] = next[phase]
    const t = setTimeout(() => setPhase(to), ms)
    return () => clearTimeout(t)
  }, [phase, chars])

  const loaded = phase === 'loaded'
  const sk = 'rounded-md bg-muted'

  return (
    <div className="flex h-[310px] w-[460px] flex-col overflow-hidden rounded-xl border bg-card text-foreground shadow-lg">
      {/* barra do navegador */}
      <div className="relative flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </span>
        <ChevronLeft className="size-3.5 text-muted-foreground" />
        <ChevronRight className="size-3.5 text-muted-foreground/50" />
        <motion.span animate={{ rotate: phase === 'reload' ? 360 : 0 }} transition={{ duration: phase === 'reload' ? 0.6 : 0 }}>
          <RotateCw className="size-3.5 text-muted-foreground" />
        </motion.span>
        <div className="flex h-6 flex-1 items-center gap-1.5 rounded-md bg-background px-2 text-[11px]">
          <Lock className="size-3 text-emerald-500" />
          <span>{URL_TEXT.slice(0, chars)}</span>
          {phase === 'typing' && <motion.span className="h-3 w-px bg-foreground" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />}
        </div>
        {/* progresso */}
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-sky-500"
          initial={false}
          animate={phase === 'loading' ? { width: ['0%', '70%', '92%'], opacity: 1 } : phase === 'loaded' ? { width: '100%', opacity: 0 } : { width: '0%', opacity: 0 }}
          transition={phase === 'loading' ? { duration: 1.6, times: [0, 0.4, 1], ease: 'easeOut' } : { duration: 0.35 }}
        />
      </div>

      {/* página */}
      <div className="relative flex-1 p-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {loaded ? (
            <motion.div key="page" initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-bold">
                  <ShoppingBag className="size-4 text-amber-500" /> Loja da Ana
                </span>
                <span className="flex gap-3 text-[10px] text-muted-foreground">
                  <span>Casa</span>
                  <span>Cozinha</span>
                  <span>Presentes</span>
                </span>
              </div>
              <div className="mt-3 rounded-lg bg-gradient-to-r from-amber-500/15 to-rose-500/15 p-3">
                <p className="text-base font-semibold tracking-tight">Coleção de outono chegou</p>
                <p className="text-[11px] text-muted-foreground">Frete grátis acima de R$ 199 para todo o Brasil.</p>
                <span className="mt-2 inline-block rounded-md bg-foreground px-2.5 py-1 text-[10px] font-medium text-background">Ver novidades</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {PRODUCTS.map((p, i) => (
                  <motion.div key={p.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
                    <div className={cn('h-14 rounded-md bg-gradient-to-br', p.g)} />
                    <p className="mt-1 truncate text-[10px] font-medium">{p.name}</p>
                    <p className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold">{p.price}</span>
                      <span className="flex items-center gap-0.5 text-muted-foreground">
                        <Star className="size-2.5 fill-amber-400 text-amber-400" />
                        4,{8 - i}
                      </span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: phase === 'typing' ? 0.35 : 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.div animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="flex items-center justify-between">
                  <span className={cn(sk, 'h-4 w-24')} />
                  <span className="flex gap-3">
                    <span className={cn(sk, 'h-2.5 w-8')} />
                    <span className={cn(sk, 'h-2.5 w-10')} />
                    <span className={cn(sk, 'h-2.5 w-12')} />
                  </span>
                </div>
                <div className={cn(sk, 'mt-3 h-[84px] w-full p-3')}>
                  <span className="block h-3.5 w-48 rounded bg-muted-foreground/15" />
                  <span className="mt-2 block h-2.5 w-64 rounded bg-muted-foreground/10" />
                  <span className="mt-3 block h-5 w-20 rounded bg-muted-foreground/15" />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i}>
                      <span className={cn(sk, 'block h-14')} />
                      <span className={cn(sk, 'mt-1.5 block h-2 w-4/5')} />
                      <span className={cn(sk, 'mt-1 block h-2 w-1/2')} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
