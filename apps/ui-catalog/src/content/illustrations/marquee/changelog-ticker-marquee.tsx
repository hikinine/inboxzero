'use client'

import { Bug, Rocket, Sparkles, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

// "Changelog Ticker Marquee": card de "Novidades" com uma linha do tempo vertical que sobe sem parar — cada entrada
// tem versão, tipo (Novo, Melhoria, Correção) com ícone e cor, título e data, presa a um trilho com pontos. Fade em
// cima e embaixo, selo "ao vivo" pulsando no cabeçalho e a versão atual fixa.
type Kind = 'novo' | 'melhoria' | 'correcao'
const KIND: Record<Kind, { label: string; Icon: LucideIcon; pill: string; dot: string }> = {
  novo: { label: 'Novo', Icon: Sparkles, pill: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  melhoria: { label: 'Melhoria', Icon: Wrench, pill: 'bg-sky-500/10 text-sky-600 dark:text-sky-400', dot: 'bg-sky-500' },
  correcao: { label: 'Correção', Icon: Bug, pill: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
}
const ENTRIES: ReadonlyArray<{ v: string; kind: Kind; title: string; date: string }> = [
  { v: 'v2.14', kind: 'novo', title: 'Pix parcelado no checkout', date: '10 out' },
  { v: 'v2.13', kind: 'melhoria', title: 'Relatórios 2x mais rápidos', date: '03 out' },
  { v: 'v2.13', kind: 'correcao', title: 'Cupom não aplicava no frete', date: '01 out' },
  { v: 'v2.12', kind: 'novo', title: 'Automação por tags no CRM', date: '24 set' },
  { v: 'v2.11', kind: 'melhoria', title: 'Editor de e-mail com blocos', date: '17 set' },
  { v: 'v2.11', kind: 'correcao', title: 'Fuso horário na agenda', date: '15 set' },
  { v: 'v2.10', kind: 'novo', title: 'Área de membros com trilhas', date: '09 set' },
]

function Entry({ e }: { e: (typeof ENTRIES)[number] }) {
  const k = KIND[e.kind]
  return (
    <div className="relative pb-3 pl-6">
      <span className="absolute left-[7px] top-0 h-full w-px bg-border" />
      <span className={`absolute left-[3px] top-3 size-[9px] rounded-full ring-4 ring-card ${k.dot}`} />
      <div className="rounded-lg border bg-background/60 p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-muted px-1 font-mono text-[9px] font-semibold">{e.v}</span>
          <span className={`flex items-center gap-1 rounded-full px-1.5 py-px text-[9px] font-medium ${k.pill}`}>
            <k.Icon className="size-2.5" />
            {k.label}
          </span>
          <span className="ml-auto text-[9px] text-muted-foreground">{e.date}</span>
        </div>
        <div className="mt-1 text-[12px] font-medium">{e.title}</div>
      </div>
    </div>
  )
}

export default function ChangelogTickerMarquee() {
  return (
    <div className="flex h-[380px] w-[340px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-lg">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Rocket className="size-3.5" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Novidades</div>
          <div className="text-[10px] text-muted-foreground">versão atual v2.14.2</div>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
          <span className="relative flex size-1.5">
            <motion.span className="absolute inset-0 rounded-full bg-emerald-500" animate={{ scale: [1, 2.4], opacity: [0.7, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span className="relative size-1.5 rounded-full bg-emerald-500" />
          </span>
          ao vivo
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden px-4" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 85%, transparent)' }}>
        <motion.div animate={{ y: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {[...ENTRIES, ...ENTRIES].map((e, i) => (
            <Entry key={i} e={e} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
