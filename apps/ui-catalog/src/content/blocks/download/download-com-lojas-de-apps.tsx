'use client'

import { BarChart3, Battery, Bell, Inbox, Signal, Star, Users, Wifi } from 'lucide-react'
import { motion } from 'motion/react'

const QR = ['11111110101', '10000010110', '10111010011', '10111010101', '10111010010', '10000010111', '11111110101', '00000000110', '10110111011', '01011010101', '11010011110']

const CHATS = [
  { i: 'AS', n: 'Ana Souza', m: 'Consigo trocar o plano hoje?', t: '09:41', u: 2 },
  { i: 'JP', n: 'João Pedro', m: 'Perfeito, obrigado!', t: '09:32', u: 0 },
  { i: 'LM', n: 'Loja Mirante', m: 'Pedido #4821 saiu para entrega', t: '08:57', u: 1 },
]

export default function DownloadComLojasDeApps() {
  return (
    <section className="w-full overflow-hidden px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">App para celular</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Seu atendimento no bolso</h2>
          <p className="mt-4 max-w-md text-muted-foreground">Responda, transfira conversas e acompanhe a fila de onde estiver. Notificações em tempo real e modo offline para quando o sinal falha.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="inline-flex items-center gap-3 rounded-xl bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90">
              <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase opacity-80">Baixar na</span>
                <span className="block text-base font-semibold">App Store</span>
              </span>
            </a>
            <a href="#" className="inline-flex items-center gap-3 rounded-xl bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90">
              <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
                <path d="M4 2.6 13.5 12 4 21.4z" className="fill-sky-400" />
                <path d="M4 2.6 16.3 9.3 13.5 12z" className="fill-emerald-400" />
                <path d="M4 21.4 13.5 12l2.8 2.7z" className="fill-rose-400" />
                <path d="M16.3 9.3 20.3 11.4c.5.3.5.9 0 1.2l-4 2.1L13.5 12z" className="fill-amber-400" />
              </svg>
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase opacity-80">Disponível no</span>
                <span className="block text-base font-semibold">Google Play</span>
              </span>
            </a>
          </div>
          <div className="mt-8 flex items-center gap-5">
            <svg viewBox="0 0 11 11" className="size-20 shrink-0 rounded-lg border bg-background p-1.5" aria-label="QR code para baixar o app">
              {QR.map((row, y) => row.split('').map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-foreground" /> : null)))}
            </svg>
            <div className="text-sm">
              <p className="font-medium">Aponte a câmera para baixar</p>
              <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 tabular-nums">4,8 · 12 mil avaliações</span>
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl sm:size-96" aria-hidden="true" />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="w-[272px] rounded-[2.75rem] border-[10px] border-foreground/90 bg-background shadow-2xl">
            <div className="relative overflow-hidden rounded-[2.1rem]">
              <div className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground/90" aria-hidden="true" />
              <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-medium">
                <span>09:41</span>
                <span className="flex items-center gap-1">
                  <Signal className="size-3" /> <Wifi className="size-3" /> <Battery className="size-3.5" />
                </span>
              </div>
              <div className="px-5 pt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Bom dia,</p>
                    <p className="font-semibold">Mariana</p>
                  </div>
                  <span className="relative flex size-8 items-center justify-center rounded-full bg-muted">
                    <Bell className="size-4" />
                    <span className="absolute top-1 right-1 size-2 rounded-full bg-rose-500" />
                  </span>
                </div>
                <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-4 text-primary-foreground">
                  <p className="text-xs opacity-80">Conversas hoje</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">128</p>
                  <p className="mt-1 text-xs opacity-80">+12% vs. ontem · 1 min 40 s de resposta</p>
                </div>
                <p className="mt-5 text-xs font-medium text-muted-foreground">Fila</p>
                <ul className="mt-2 space-y-2">
                  {CHATS.map((c) => (
                    <li key={c.n} className="flex items-center gap-3 rounded-xl border p-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium">{c.i}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium">{c.n}</span>
                        <span className="block truncate text-[11px] text-muted-foreground">{c.m}</span>
                      </span>
                      <span className="flex flex-col items-end gap-1 text-[10px] text-muted-foreground">
                        {c.t}
                        {c.u > 0 && <span className="rounded-full bg-primary px-1.5 text-[9px] font-semibold text-primary-foreground">{c.u}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 flex items-center justify-around border-t px-4 py-3 text-muted-foreground">
                <Inbox className="size-5 text-foreground" />
                <Users className="size-5" />
                <BarChart3 className="size-5" />
                <Bell className="size-5" />
              </div>
              <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-foreground/80" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
