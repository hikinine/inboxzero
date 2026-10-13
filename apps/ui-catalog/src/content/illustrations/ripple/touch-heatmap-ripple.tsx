'use client'

import { useEffect, useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Touch Heatmap Ripple": mapa de calor de cliques sendo gravado sobre o wireframe de uma landing page. Cada toque
// abre uma onda no ponto clicado e soma calor à mancha da região (azul → âmbar → vermelho conforme acumula); o botão
// de compra concentra a maior parte. Depois de 18 toques o mapa esmaece e a gravação recomeça.
const W = 420
const H = 300
const SPOTS = [
  { id: 'cta', x: 150, y: 168 },
  { id: 'menu', x: 352, y: 54 },
  { id: 'card1', x: 92, y: 248 },
  { id: 'card2', x: 210, y: 252 },
  { id: 'logo', x: 52, y: 54 },
  { id: 'video', x: 316, y: 150 },
] as const
type SpotId = (typeof SPOTS)[number]['id']
// sequência de toques (com repetições para concentrar calor)
const TAPS: readonly SpotId[] = ['cta', 'video', 'cta', 'menu', 'cta', 'card1', 'cta', 'video', 'card2', 'cta', 'cta', 'logo', 'video', 'cta', 'card1', 'cta', 'menu', 'cta']
const jitter = (n: number) => ((Math.sin(n * 17.31) * 1000) % 1) * 14

function heatColor(count: number) {
  if (count >= 6) return 'rgb(244 63 94)'
  if (count >= 3) return 'rgb(245 158 11)'
  return 'rgb(14 165 233)'
}

export default function TouchHeatmapRipple() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s >= TAPS.length + 4 ? 0 : s + 1)), 420)
    return () => clearInterval(id)
  }, [])
  const done = TAPS.slice(0, Math.min(step, TAPS.length))
  const counts = SPOTS.map((s) => done.filter((d) => d === s.id).length)
  const recording = step < TAPS.length
  const lastSpot = step > 0 && step <= TAPS.length ? SPOTS.find((s) => s.id === TAPS[step - 1])! : null
  const tapX = lastSpot ? lastSpot.x + jitter(step) : 0
  const tapY = lastSpot ? lastSpot.y + jitter(step + 5) : 0

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-foreground shadow-sm" style={{ width: W, height: H }}>
      {/* wireframe da página */}
      <div className="absolute inset-0 p-4">
        <div className="flex items-center justify-between">
          <span className="h-4 w-16 rounded bg-muted" />
          <span className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2.5 w-10 rounded bg-muted" />
            ))}
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <span className="block h-4 w-full rounded bg-muted-foreground/25" />
            <span className="block h-4 w-3/4 rounded bg-muted-foreground/25" />
            <span className="block h-2.5 w-5/6 rounded bg-muted" />
            <span className="mt-3 block h-8 w-28 rounded-md bg-primary/80" />
          </div>
          <span className="block h-[104px] rounded-lg bg-muted" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-14 rounded-lg border bg-background" />
          ))}
        </div>
      </div>

      {/* manchas de calor */}
      {SPOTS.map((s, i) => {
        const c = counts[i]!
        return (
          <motion.span
            key={s.id}
            className="pointer-events-none absolute rounded-full mix-blend-multiply blur-xl dark:mix-blend-screen"
            style={{ left: s.x - 50, top: s.y - 50, width: 100, height: 100, background: `radial-gradient(circle, ${heatColor(c)} 0%, transparent 70%)` }}
            animate={{ opacity: recording || step <= TAPS.length + 2 ? Math.min(c * 0.16, 0.95) : 0, scale: 0.6 + Math.min(c, 8) * 0.08 }}
            transition={{ duration: 0.4 }}
          />
        )
      })}

      {/* toque atual */}
      <AnimatePresence>
        {lastSpot && (
          <motion.span key={step} className="pointer-events-none absolute" style={{ left: tapX, top: tapY }} exit={{ opacity: 0 }}>
            <motion.span className="absolute -left-6 -top-6 size-12 rounded-full border-2 border-foreground/60" initial={{ scale: 0.2, opacity: 1 }} animate={{ scale: 1.4, opacity: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
            <motion.span className="absolute -left-1.5 -top-1.5 size-3 rounded-full bg-foreground/70" initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: [0, 1, 0] }} transition={{ duration: 0.4 }} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* legenda */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border bg-background/90 px-2.5 py-1 text-[10px] shadow-sm backdrop-blur">
        <MousePointerClick className="size-3 text-muted-foreground" />
        <span className="tabular-nums">{done.length} cliques</span>
        <span className="h-1.5 w-14 rounded-full bg-gradient-to-r from-sky-500 via-amber-500 to-rose-500" />
        {recording && <motion.span className="size-1.5 rounded-full bg-rose-500" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />}
      </div>
    </div>
  )
}
