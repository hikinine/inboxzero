'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { FileSearch, Languages, Mic, Network, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Celula({ Icon, titulo, texto, className, children }: { Icon: LucideIcon; titulo: string; texto: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('group relative flex flex-col overflow-hidden rounded-2xl border bg-card', className)}>
      <div className="relative z-10 p-6 pb-0">
        <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Icon className="size-3.5" /> {titulo}
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed">{texto}</p>
      </div>
      <div className="relative mt-4 flex flex-1 items-center justify-center bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-6">{children}</div>
    </div>
  )
}

/* 1 — rede neural com pulsos */
const CAMADAS = [
  [40, 90, 140, 190],
  [65, 115, 165],
  [40, 90, 140, 190],
  [115],
]
function RedeNeural() {
  const xs = [30, 110, 190, 270]
  const ligacoes: { a: [number, number]; b: [number, number]; i: number }[] = []
  let n = 0
  for (let c = 0; c < CAMADAS.length - 1; c++) {
    for (const y1 of CAMADAS[c]) for (const y2 of CAMADAS[c + 1]) ligacoes.push({ a: [xs[c], y1], b: [xs[c + 1], y2], i: n++ })
  }
  return (
    <svg viewBox="0 0 300 230" className="h-auto w-full max-w-sm" role="img" aria-label="Rede neural processando sinais">
      {ligacoes.map(({ a, b, i }) => (
        <g key={i}>
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--border)" strokeWidth="1" />
          {i % 4 === 0 && (
            <motion.line
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke="var(--primary)"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={{ pathLength: 0.2, pathOffset: 0, opacity: 0 }}
              animate={{ pathOffset: [0, 0.8], opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: (i % 9) * 0.25 + Math.floor(a[0] / 80) * 0.5, ease: 'easeInOut' }}
            />
          )}
        </g>
      ))}
      {CAMADAS.map((col, c) =>
        col.map((y, k) => (
          <motion.circle
            key={`${c}-${k}`}
            cx={xs[c]}
            cy={y}
            r={c === 3 ? 14 : 8}
            fill={c === 3 ? 'var(--primary)' : 'var(--card)'}
            stroke={c === 3 ? 'var(--primary)' : 'var(--foreground)'}
            strokeOpacity={0.5}
            strokeWidth="1.5"
            style={{ transformOrigin: `${xs[c]}px ${y}px` }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: c * 0.4 + k * 0.15 }}
          />
        )),
      )}
    </svg>
  )
}

/* 2 — geração de texto */
const FRASE = 'Olá, Mariana! Seu pedido #8812 sai hoje para Curitiba e chega até quinta. Quer receber o rastreio no WhatsApp?'
function Digitando() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setN((v) => (v >= FRASE.length + 24 ? 0 : v + 1)), 45)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="ml-auto w-fit rounded-xl rounded-br-sm bg-muted px-3 py-2 text-xs">cadê meu pedido?</div>
      <div className="min-h-[76px] rounded-xl rounded-bl-sm border bg-background px-3 py-2 text-xs leading-relaxed">
        <Sparkles className="mr-1 inline size-3 text-primary" />
        {FRASE.slice(0, n)}
        <motion.span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-primary" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
      </div>
    </div>
  )
}

/* 3 — leitura de documento */
function Scanner() {
  return (
    <div className="relative w-40 rounded-lg border bg-background p-3 shadow-sm">
      {[100, 80, 92, 60, 88, 70, 95, 50].map((w, i) => (
        <div key={i} className="relative mb-1.5 h-1.5 overflow-hidden rounded-full bg-muted-foreground/25" style={{ width: `${w}%` }}>
          <motion.div className="absolute inset-0 bg-primary" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.4, times: [0, 0.08, 0.35] }} />
        </div>
      ))}
      <motion.div className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-primary/25 to-transparent" animate={{ top: ['0%', '85%', '0%'] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="absolute inset-x-0 top-1/2 h-px bg-primary" />
      </motion.div>
    </div>
  )
}

/* 4 — voz */
function Onda() {
  return (
    <div className="flex h-20 items-center gap-1">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-primary"
          style={{ opacity: 0.35 + (Math.sin(i / 2) + 1) * 0.3 }}
          animate={{ height: [8, 12 + ((i * 37) % 52), 8] }}
          transition={{ duration: 0.9 + (i % 5) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
        />
      ))}
    </div>
  )
}

/* 5 — tradução */
const IDIOMAS = [
  ['pt', 'Frete grátis acima de R$ 199'],
  ['es', 'Envío gratis desde R$ 199'],
  ['en', 'Free shipping over R$ 199'],
] as const
function Traducao() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % IDIOMAS.length), 1800)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="flex w-full max-w-[220px] flex-col items-center gap-3">
      <div className="flex gap-1.5">
        {IDIOMAS.map(([sigla], k) => (
          <span key={sigla} className={cn('rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase transition-colors', k === i ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground')}>
            {sigla}
          </span>
        ))}
      </div>
      <motion.p key={i} initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} className="w-full rounded-lg border bg-background px-3 py-2 text-center text-xs">
        {IDIOMAS[i][1]}
      </motion.p>
    </div>
  )
}

export default function BentoComIlustracoesAnimadasDeIa() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">Cinco modelos trabalhando juntos no seu atendimento</h2>
          <p className="max-w-sm text-muted-foreground">Entende, lê, escreve, fala e traduz. Tudo treinado com o catálogo e as políticas da sua loja.</p>
        </div>

        <div className="mt-12 grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Celula Icon={Network} titulo="Raciocínio" texto="Classifica a intenção, consulta pedido e estoque e decide a próxima ação em menos de 1 segundo." className="lg:row-span-2">
            <RedeNeural />
          </Celula>
          <Celula Icon={Sparkles} titulo="Escrita" texto="Respostas no tom da marca, com dados reais do pedido.">
            <Digitando />
          </Celula>
          <Celula Icon={FileSearch} titulo="Leitura de documentos" texto="Notas fiscais, comprovantes e boletos lidos e conferidos.">
            <Scanner />
          </Celula>
          <Celula Icon={Mic} titulo="Voz" texto="Atende ligações e transcreve áudios do WhatsApp.">
            <Onda />
          </Celula>
          <Celula Icon={Languages} titulo="Tradução" texto="Venda para o Mercosul sem contratar outro time.">
            <Traducao />
          </Celula>
        </div>
      </div>
    </section>
  )
}
