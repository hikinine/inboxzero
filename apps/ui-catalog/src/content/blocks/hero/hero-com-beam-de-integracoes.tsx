'use client'

import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Seis integrações (logos textuais) enviam feixes para um núcleo central.
const LOGOS = [
  { nome: 'Shopify', lado: 'esq', y: 50, fontWeight: 700, fontFamily: 'inherit', letterSpacing: '-0.02em', fontStyle: 'normal' },
  { nome: 'Bling', lado: 'esq', y: 130, fontWeight: 500, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', letterSpacing: '0', fontStyle: 'normal' },
  { nome: 'RD Station', lado: 'esq', y: 210, fontWeight: 400, fontFamily: 'ui-serif, Georgia, serif', letterSpacing: '0', fontStyle: 'italic' },
  { nome: 'Pagar.me', lado: 'dir', y: 50, fontWeight: 600, fontFamily: 'inherit', letterSpacing: '0.04em', fontStyle: 'normal' },
  { nome: 'Nuvemshop', lado: 'dir', y: 130, fontWeight: 300, fontFamily: 'inherit', letterSpacing: '0', fontStyle: 'italic' },
  { nome: 'MELHOR ENVIO', lado: 'dir', y: 210, fontWeight: 800, fontFamily: 'inherit', letterSpacing: '0.18em', fontStyle: 'normal' },
] as const

const CX = 400
const CY = 130
const X_ESQ = 110
const X_DIR = 690

function caminho(lado: 'esq' | 'dir', y: number) {
  const x = lado === 'esq' ? X_ESQ + 62 : X_DIR - 62
  const c1 = lado === 'esq' ? x + 110 : x - 110
  const c2 = lado === 'esq' ? CX - 110 : CX + 110
  return `M ${x} ${y} C ${c1} ${y}, ${c2} ${CY}, ${CX} ${CY}`
}

export default function HeroComBeamDeIntegracoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="text-primary" /> 120+ integrações nativas
          </Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">Conecte sua loja a tudo que você já usa.</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            A Conecta sincroniza pedidos, estoque, pagamentos e fretes entre as suas ferramentas em segundos — sem planilha, sem desenvolvedor, sem retrabalho.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">
              Começar grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline">
              Ver todas as integrações
            </Button>
          </div>
        </div>

        {/* Diagrama de feixes (desktop) */}
        <div className="relative mt-14 hidden sm:block">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
          <svg viewBox="0 0 800 260" className="relative h-auto w-full text-foreground" role="img" aria-label="Seis integrações enviando dados para o núcleo da Conecta">
            <defs>
              <linearGradient id="hbi-feixe" x1="0" x2="1">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="0.5" stopColor="var(--primary)" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {LOGOS.map((l, i) => {
              const d = caminho(l.lado, l.y)
              const x = l.lado === 'esq' ? X_ESQ : X_DIR
              return (
                <g key={l.nome}>
                  <path d={d} fill="none" stroke="var(--border)" strokeWidth="1.5" />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="url(#hbi-feixe)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.28, pathSpacing: 1, pathOffset: 0 }}
                    animate={{ pathLength: 0.28, pathSpacing: 1, pathOffset: 1 }}
                    transition={{ duration: 2.2 + (i % 3) * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.35 }}
                  />
                  <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
                    <rect x={x - 62} y={l.y - 18} width="124" height="36" rx="18" fill="var(--card)" stroke="var(--border)" />
                    <text
                      x={x}
                      y={l.y + 4.5}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight={l.fontWeight}
                      fontFamily={l.fontFamily}
                      fontStyle={l.fontStyle}
                      letterSpacing={l.letterSpacing}
                      fill="var(--foreground)"
                    >
                      {l.nome}
                    </text>
                  </motion.g>
                </g>
              )
            })}

            <motion.circle
              cx={CX}
              cy={CY}
              r="44"
              fill="var(--primary)"
              fillOpacity="0.1"
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              animate={{ scale: [1, 1.4, 1], fillOpacity: [0.1, 0.02, 0.1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <rect x={CX - 32} y={CY - 32} width="64" height="64" rx="18" fill="var(--primary)" />
            <foreignObject x={CX - 32} y={CY - 32} width="64" height="64">
              <div className="flex size-16 items-center justify-center text-primary-foreground">
                <Sparkles className="size-7" />
              </div>
            </foreignObject>
            <text x={CX} y={CY + 58} textAnchor="middle" fontSize="12" fontWeight="500" fill="var(--muted-foreground)">
              Conecta
            </text>
          </svg>
        </div>

        {/* Versão compacta (mobile) */}
        <ul className="mt-10 flex flex-wrap justify-center gap-2 sm:hidden">
          {LOGOS.map((l) => (
            <li key={l.nome} className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              {l.nome}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-muted-foreground">Sincronização a cada 30 segundos · API aberta e webhooks · Dados hospedados no Brasil</p>
      </div>
    </section>
  )
}
