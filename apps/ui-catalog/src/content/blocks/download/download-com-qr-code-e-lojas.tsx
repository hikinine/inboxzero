'use client'

import { Smartphone, Star } from 'lucide-react'
import { motion } from 'motion/react'

const N = 25

// Padrões fixos de um QR (localizadores, alinhamento e temporização); o resto é preenchido de forma determinística.
function moduloFixo(x: number, y: number): boolean | null {
  const cantos: Array<[number, number]> = [
    [0, 0],
    [N - 7, 0],
    [0, N - 7],
  ]
  for (const [fx, fy] of cantos) {
    const dx = x - fx
    const dy = y - fy
    if (dx >= -1 && dx <= 7 && dy >= -1 && dy <= 7) {
      if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return false
      return Math.min(dx, dy, 6 - dx, 6 - dy) !== 1
    }
  }
  const ax = x - 16
  const ay = y - 16
  if (ax >= 0 && ax <= 4 && ay >= 0 && ay <= 4) return Math.min(ax, ay, 4 - ax, 4 - ay) !== 1
  if (y === 6 && x > 7 && x < N - 8) return x % 2 === 0
  if (x === 6 && y > 7 && y < N - 8) return y % 2 === 0
  return null
}

let semente = 20261012
function aleatorio() {
  semente = (semente * 48271) % 2147483647
  return semente / 2147483647
}

const MODULOS: Array<[number, number]> = []
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    const fixo = moduloFixo(x, y)
    const ligado = fixo ?? aleatorio() < 0.45
    if (ligado) MODULOS.push([x, y])
  }
}

const PASSOS = [
  { n: '1', texto: 'Abra a câmera do celular e aponte para o código.' },
  { n: '2', texto: 'Toque no link que aparece e instale pela loja oficial.' },
  { n: '3', texto: 'Entre com o mesmo login do painel. Pronto.' },
]

export default function DownloadComQrCodeELojas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl bg-foreground p-8 text-background sm:p-12 md:grid-cols-[auto_1fr] md:gap-14">
        <div className="relative mx-auto w-fit">
          <div className="relative overflow-hidden rounded-2xl bg-background p-4 shadow-xl">
            <svg viewBox={`0 0 ${N} ${N}`} className="size-48 sm:size-56" shapeRendering="crispEdges" role="img" aria-label="QR code para baixar o app">
              {MODULOS.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-foreground" />
              ))}
            </svg>
            <motion.span className="pointer-events-none absolute inset-x-3 h-0.5 rounded-full bg-primary shadow-[0_0_12px_2px_var(--primary)]" animate={{ top: ['8%', '92%', '8%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />
          </div>
          <p className="mt-4 text-center text-xs text-background/60">Aponte a câmera para instalar</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-background/60">App para iOS e Android</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Escaneie e instale em dez segundos</h2>
          <ol className="mt-6 space-y-3">
            {PASSOS.map((p) => (
              <li key={p.n} className="flex gap-3 text-sm text-background/80">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-background/30 text-xs font-semibold">{p.n}</span>
                {p.texto}
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-3 rounded-xl border border-background/25 px-4 py-2.5 transition-colors hover:bg-background/10">
              <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden="true">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase opacity-70">Baixar na</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a href="#" className="inline-flex items-center gap-3 rounded-xl border border-background/25 px-4 py-2.5 transition-colors hover:bg-background/10">
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path d="M4 2.6 13.5 12 4 21.4z" className="fill-sky-400" />
                <path d="M4 2.6 16.3 9.3 13.5 12z" className="fill-emerald-400" />
                <path d="M4 21.4 13.5 12l2.8 2.7z" className="fill-rose-400" />
                <path d="M16.3 9.3 20.3 11.4c.5.3.5.9 0 1.2l-4 2.1L13.5 12z" className="fill-amber-400" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase opacity-70">Disponível no</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-background/60">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" /> 4,8 · 12 mil avaliações
            </span>
            <span className="inline-flex items-center gap-1">
              <Smartphone className="size-3.5" /> iOS 16+ e Android 10+
            </span>
            <span>Versão 4.12 · 48 MB · Grátis</span>
          </div>
        </div>
      </div>
    </section>
  )
}
