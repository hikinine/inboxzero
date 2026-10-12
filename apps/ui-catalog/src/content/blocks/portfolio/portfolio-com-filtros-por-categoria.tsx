'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

const CATEGORIAS = ['Todos', 'Sites', 'Apps', 'Branding', 'Sistemas'] as const
type Categoria = (typeof CATEGORIAS)[number]

interface Projeto {
  titulo: string
  cliente: string
  cat: Exclude<Categoria, 'Todos'>
  ano: string
  resultado: string
  tone: string
  forma: 'circulo' | 'barras' | 'onda' | 'grade'
}

const PROJETOS: Projeto[] = [
  { titulo: 'Site institucional e portal de vagas', cliente: 'Construtora Alvorada', cat: 'Sites', ano: '2026', resultado: '+140% candidaturas', tone: 'from-amber-400 to-orange-600', forma: 'barras' },
  { titulo: 'App de delivery com rastreio ao vivo', cliente: 'Padaria Santa Clara', cat: 'Apps', ano: '2026', resultado: '4,9 nas lojas', tone: 'from-rose-400 to-pink-600', forma: 'circulo' },
  { titulo: 'Rebranding e sistema de identidade', cliente: 'Café Mirante', cat: 'Branding', ano: '2025', resultado: '+32% reconhecimento', tone: 'from-emerald-400 to-teal-600', forma: 'onda' },
  { titulo: 'ERP de estoque para 14 lojas', cliente: 'Farmácias Bem Viver', cat: 'Sistemas', ano: '2025', resultado: '−27% ruptura', tone: 'from-sky-400 to-blue-600', forma: 'grade' },
  { titulo: 'E-commerce com checkout em um clique', cliente: 'Loja Bem-te-vi', cat: 'Sites', ano: '2025', resultado: '+38% conversão', tone: 'from-violet-400 to-purple-700', forma: 'circulo' },
  { titulo: 'App de treinos com planos por IA', cliente: 'Studio Corpo Livre', cat: 'Apps', ano: '2024', resultado: '12 mil usuários', tone: 'from-lime-400 to-green-600', forma: 'barras' },
  { titulo: 'Naming, logo e embalagens', cliente: 'Chá da Serra', cat: 'Branding', ano: '2024', resultado: '3 prêmios de design', tone: 'from-fuchsia-400 to-rose-600', forma: 'grade' },
  { titulo: 'Portal do paciente com telemedicina', cliente: 'Clínica Vitalis', cat: 'Sistemas', ano: '2024', resultado: '−41% chamados', tone: 'from-slate-500 to-slate-800', forma: 'onda' },
]

function Forma({ tipo }: { tipo: Projeto['forma'] }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30" aria-hidden="true">
      {tipo === 'circulo' && <circle cx="66" cy="38" r="30" fill="currentColor" />}
      {tipo === 'barras' && [0, 1, 2, 3].map((i) => <rect key={i} x={12 + i * 22} y={30 + (i % 2) * 18} width="12" height="90" rx="6" fill="currentColor" />)}
      {tipo === 'onda' && <path d="M0 60 C25 30 45 90 70 60 S95 40 100 55 V100 H0 Z" fill="currentColor" />}
      {tipo === 'grade' && [16, 40, 64, 88].map((x) => [16, 40, 64, 88].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="currentColor" />))}
    </svg>
  )
}

export default function PortfolioComFiltrosPorCategoria() {
  const [cat, setCat] = useState<Categoria>('Todos')
  const visiveis = cat === 'Todos' ? PROJETOS : PROJETOS.filter((p) => p.cat === cat)
  const contagem = (c: Categoria) => (c === 'Todos' ? PROJETOS.length : PROJETOS.filter((p) => p.cat === c).length)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Portfólio</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Projetos por área</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {visiveis.length} de {PROJETOS.length} projetos
          </p>
          <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0" aria-label="Filtrar por categoria">
            {CATEGORIAS.map((c) => {
              const ativo = c === cat
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setCat(c)}
                  className={cn(
                    'flex shrink-0 items-center justify-between gap-4 rounded-full border px-3.5 py-1.5 text-sm transition-colors lg:rounded-lg lg:border-transparent lg:px-3',
                    ativo ? 'border-foreground bg-foreground text-background lg:bg-muted lg:font-medium lg:text-foreground' : 'text-muted-foreground hover:text-foreground lg:hover:bg-muted/60',
                  )}
                >
                  {c}
                  <span className="hidden text-xs tabular-nums text-muted-foreground lg:inline">{contagem(c)}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <motion.ul layout className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visiveis.map((p) => (
              <motion.li key={p.titulo} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}>
                <a href="#" className="group flex h-full gap-4 rounded-xl border bg-card p-3 transition-colors hover:border-foreground/20">
                  <span className={`relative size-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br sm:size-28 ${p.tone}`}>
                    <Forma tipo={p.forma} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col py-0.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {p.cat} · {p.ano}
                    </span>
                    <span className="mt-1 font-semibold leading-snug group-hover:underline">{p.titulo}</span>
                    <span className="mt-0.5 text-sm text-muted-foreground">{p.cliente}</span>
                    <span className="mt-auto flex items-center justify-between pt-2 text-sm font-medium">
                      {p.resultado}
                      <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
