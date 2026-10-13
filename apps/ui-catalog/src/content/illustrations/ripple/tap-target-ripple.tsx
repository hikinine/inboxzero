'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownLeft, ArrowUpRight, Barcode, QrCode } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Tap Target Ripple": tela de carteira digital num celular. Um "dedo" (círculo translúcido) passeia pelos alvos e,
// a cada toque, afunda, solta um anel de toque por fora e uma onda estilo Material por dentro do alvo (recortada
// pelas bordas, nascendo do ponto tocado). O botão principal muda para "Pago" ao ser tocado. Sequência em loop.
type Target = { id: string; x: number; y: number; w: number; h: number }
const TILES: ReadonlyArray<Target & { label: string; Icon: LucideIcon; tone: string }> = [
  { id: 'pix', x: 14, y: 112, w: 92, h: 64, label: 'Pix', Icon: QrCode, tone: 'text-emerald-500' },
  { id: 'boleto', x: 114, y: 112, w: 92, h: 64, label: 'Boleto', Icon: Barcode, tone: 'text-sky-500' },
  { id: 'receber', x: 14, y: 184, w: 92, h: 64, label: 'Receber', Icon: ArrowDownLeft, tone: 'text-violet-500' },
  { id: 'transferir', x: 114, y: 184, w: 92, h: 64, label: 'Transferir', Icon: ArrowUpRight, tone: 'text-amber-500' },
]
const BUTTON: Target = { id: 'pagar', x: 14, y: 300, w: 192, h: 44 }
const ALL: Target[] = [...TILES, BUTTON]
// ponto tocado dentro de cada alvo (fração), para a onda nascer fora do centro
const SEQ: ReadonlyArray<{ id: string; fx: number; fy: number }> = [
  { id: 'pix', fx: 0.35, fy: 0.4 },
  { id: 'transferir', fx: 0.6, fy: 0.55 },
  { id: 'pagar', fx: 0.7, fy: 0.5 },
  { id: 'boleto', fx: 0.45, fy: 0.6 },
  { id: 'receber', fx: 0.55, fy: 0.35 },
]

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function TapTargetRipple() {
  const [step, setStep] = useState(0)
  const [press, setPress] = useState(0) // incrementa a cada toque (dispara as ondas)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      let s = 0
      while (!cancelled) {
        setStep(s)
        await sleep(650)
        if (cancelled) return
        setPress((p) => p + 1)
        if (SEQ[s].id === 'pagar') setPaid(true)
        if (s === 0) setPaid(false)
        await sleep(900)
        s = (s + 1) % SEQ.length
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const cur = SEQ[step]
  const t = ALL.find((a) => a.id === cur.id)!
  const px = t.x + t.w * cur.fx
  const py = t.y + t.h * cur.fy

  const ripple = (target: Target) =>
    press > 0 && target.id === cur.id ? (
      <motion.span
        key={press}
        className="pointer-events-none absolute size-10 rounded-full bg-current"
        style={{ left: target.w * cur.fx - 20, top: target.h * cur.fy - 20 }}
        initial={{ scale: 0, opacity: 0.3 }}
        animate={{ scale: 6, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    ) : null

  return (
    <div className="flex h-[420px] w-[300px] items-center justify-center text-foreground">
      <div className="relative h-[380px] w-[220px] overflow-hidden rounded-[30px] border-[6px] border-foreground/90 bg-background shadow-xl">
        <div className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/90" />
        <div className="absolute left-4 top-9 text-[10px] text-muted-foreground">Saldo disponível</div>
        <div className="absolute left-4 top-[52px] text-xl font-semibold tabular-nums">R$ 2.348,10</div>
        <div className="absolute left-4 top-[86px] text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Ações</div>

        {TILES.map((tile) => (
          <motion.div
            key={tile.id}
            className={cn('absolute flex flex-col items-start justify-between overflow-hidden rounded-xl border bg-card p-2.5', tile.tone)}
            style={{ left: tile.x, top: tile.y, width: tile.w, height: tile.h }}
            animate={{ scale: press > 0 && cur.id === tile.id ? [1, 0.94, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {ripple(tile)}
            <tile.Icon className="size-4" />
            <span className="text-[11px] font-medium text-foreground">{tile.label}</span>
          </motion.div>
        ))}

        <div className="absolute left-4 top-[262px] text-[10px] text-muted-foreground">Conta de luz · Enel · vence hoje</div>
        <motion.div
          className={cn('absolute flex items-center justify-center overflow-hidden rounded-xl text-sm font-medium transition-colors duration-300', paid ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground')}
          style={{ left: BUTTON.x, top: BUTTON.y, width: BUTTON.w, height: BUTTON.h }}
          animate={{ scale: press > 0 && cur.id === 'pagar' ? [1, 0.95, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white">
            {ripple(BUTTON)}
          </span>
          <span className="relative">{paid ? 'Pago ✓' : 'Pagar R$ 187,40'}</span>
        </motion.div>

        {/* dedo */}
        <motion.div className="pointer-events-none absolute left-0 top-0 z-10" animate={{ x: px - 18, y: py - 18 }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
          <motion.span
            key={`ring-${press}`}
            className="absolute inset-0 rounded-full border-2 border-foreground/40"
            initial={{ scale: 1, opacity: press > 0 ? 0.8 : 0 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.span key={`dot-${press}`} className="block size-9 rounded-full border border-foreground/30 bg-foreground/20 backdrop-blur-[1px]" initial={{ scale: 0.75 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} />
        </motion.div>
      </div>
    </div>
  )
}
