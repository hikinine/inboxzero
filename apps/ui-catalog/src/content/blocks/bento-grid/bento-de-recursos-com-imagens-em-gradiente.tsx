'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Bot, ChartColumn, CreditCard, Gift, Truck, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Art = 'waves' | 'orbs' | 'route' | 'rings' | 'bars'
interface CellDef {
  title: string
  text: string
  gradient: string
  Icon: LucideIcon
  art: Art
  className?: string
}

const CELLS: CellDef[] = [
  { title: 'Checkout em um toque', text: 'Pix, cartão salvo e carteiras digitais sem sair da página do produto.', gradient: 'from-violet-500 via-fuchsia-500 to-rose-400', Icon: CreditCard, art: 'waves', className: 'md:col-span-2' },
  { title: 'Recomendações por IA', text: 'Vitrines que aprendem com cada clique e cada carrinho abandonado.', gradient: 'from-emerald-400 via-teal-500 to-cyan-600', Icon: Bot, art: 'orbs' },
  { title: 'Logística integrada', text: 'Etiquetas, rastreio e SLA de entrega por região em um painel.', gradient: 'from-amber-300 via-orange-500 to-rose-500', Icon: Truck, art: 'route' },
  { title: 'Fidelidade e cashback', text: 'Pontos, níveis e cupons automáticos para quem volta.', gradient: 'from-sky-400 via-blue-600 to-indigo-700', Icon: Gift, art: 'rings' },
  { title: 'Painel de vendas em tempo real', text: 'Receita, conversão e estoque atualizados a cada minuto.', gradient: 'from-slate-600 via-slate-800 to-neutral-950', Icon: ChartColumn, art: 'bars', className: 'md:col-span-2' },
]

function Artwork({ kind }: { kind: Art }) {
  if (kind === 'waves')
    return (
      <motion.svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 size-full text-white" aria-hidden="true" animate={{ x: [0, -12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M-20 120 C 60 60, 140 180, 220 120 S 380 60, 440 120" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <path d="M-20 150 C 60 90, 140 210, 220 150 S 380 90, 440 150" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M-20 90 C 60 30, 140 150, 220 90 S 380 30, 440 90" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <rect x="250" y="40" width="110" height="68" rx="10" fill="currentColor" opacity="0.18" />
        <rect x="264" y="56" width="40" height="8" rx="4" fill="currentColor" opacity="0.6" />
        <rect x="264" y="76" width="80" height="6" rx="3" fill="currentColor" opacity="0.4" />
      </motion.svg>
    )
  if (kind === 'orbs')
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-white" aria-hidden="true">
        <motion.circle cx="60" cy="70" r="34" fill="currentColor" opacity="0.25" animate={{ x: [0, 12, 0], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="140" cy="60" r="22" fill="currentColor" opacity="0.35" animate={{ x: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="110" cy="140" r="40" fill="currentColor" opacity="0.18" animate={{ y: [0, -12, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="150" cy="150" r="6" fill="currentColor" opacity="0.7" />
      </svg>
    )
  if (kind === 'route')
    return (
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-white" aria-hidden="true">
        <g stroke="currentColor" opacity="0.15" strokeWidth="1">
          {[40, 80, 120, 160].map((v) => (
            <g key={v}>
              <line x1={v} y1="0" x2={v} y2="200" />
              <line x1="0" y1={v} x2="200" y2={v} />
            </g>
          ))}
        </g>
        <motion.path d="M30 160 L 80 160 L 80 100 L 140 100 L 140 50 L 175 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" strokeDasharray="6 8" animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} />
        <circle cx="30" cy="160" r="6" fill="currentColor" opacity="0.9" />
        <circle cx="175" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.9" />
      </svg>
    )
  if (kind === 'rings')
    return (
      <motion.svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-white" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '140px 70px' }}>
        <g fill="none" stroke="currentColor">
          <circle cx="140" cy="70" r="20" strokeWidth="2" opacity="0.6" />
          <circle cx="140" cy="70" r="40" strokeWidth="1.5" opacity="0.4" strokeDasharray="6 10" />
          <circle cx="140" cy="70" r="62" strokeWidth="1" opacity="0.25" />
          <circle cx="140" cy="70" r="86" strokeWidth="1" opacity="0.15" strokeDasharray="2 12" />
        </g>
        <circle cx="180" cy="70" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="140" cy="8" r="3" fill="currentColor" opacity="0.6" />
      </motion.svg>
    )
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 size-full text-white" aria-hidden="true">
      {[30, 48, 40, 62, 55, 74, 68, 88, 80, 96].map((h, i) => (
        <motion.rect key={i} x={40 + i * 32} y={170 - h * 1.3} width="20" height={h * 1.3} rx="3" fill="currentColor" opacity={i === 9 ? 0.9 : 0.35} animate={{ opacity: [i === 9 ? 0.9 : 0.35, i === 9 ? 0.9 : 0.55, i === 9 ? 0.9 : 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }} />
      ))}
      <path d="M40 150 L 72 130 L 104 138 L 136 110 L 168 118 L 200 95 L 232 102 L 264 78 L 296 86 L 328 60 L 360 50" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" strokeLinejoin="round" />
    </svg>
  )
}

export default function BentoDeRecursosComImagensEmGradiente() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Plataforma</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tudo que uma loja precisa, do carrinho à entrega</h2>
          <p className="mt-3 text-muted-foreground">Cinco módulos que conversam entre si. Passe o mouse para ver cada um ganhar vida.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CELLS.map((c) => (
            <a key={c.title} href="#" className={cn('group relative min-h-[260px] overflow-hidden rounded-2xl text-white', c.className)}>
              <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-105', c.gradient)} aria-hidden="true" />
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" aria-hidden="true">
                <Artwork kind={c.art} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
              <div className="relative flex h-full min-h-[260px] flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <c.Icon className="size-5" />
                  </span>
                  <span className="flex size-8 translate-y-1 items-center justify-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/75">{c.text}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
