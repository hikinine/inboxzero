'use client'

import { useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Cena = 'arco' | 'barras' | 'montanha' | 'sol' | 'ondas' | 'grade'

const FOTOS: Array<{ titulo: string; descricao: string; tone: string; cena: Cena }> = [
  { titulo: 'Serra da Mantiqueira ao amanhecer', descricao: 'Imersão de produto · Campos do Jordão, SP', tone: 'from-orange-400 via-rose-400 to-purple-600', cena: 'montanha' },
  { titulo: 'Plenária do encontro anual', descricao: '420 clientes · Florianópolis, SC', tone: 'from-sky-500 to-indigo-600', cena: 'barras' },
  { titulo: 'Recepção do novo escritório', descricao: 'Vila Madalena · São Paulo, SP', tone: 'from-emerald-400 to-teal-600', cena: 'arco' },
  { titulo: 'Fim de tarde na Praia do Rosa', descricao: 'Offsite do time de engenharia · Imbituba, SC', tone: 'from-yellow-300 to-amber-500', cena: 'sol' },
  { titulo: 'Estúdio do podcast', descricao: 'Gravação do episódio 48 · São Paulo, SP', tone: 'from-fuchsia-500 to-violet-700', cena: 'ondas' },
  { titulo: 'Parede de post-its do roadmap', descricao: 'Planejamento de 2027 · Recife, PE', tone: 'from-slate-600 to-slate-900', cena: 'grade' },
]

function Cenario({ tipo }: { tipo: Cena }) {
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30" aria-hidden="true">
      {tipo === 'arco' && <path d="M60 225 V140 a140 140 0 0 1 280 0 V225 Z" fill="currentColor" />}
      {tipo === 'barras' && [0, 1, 2, 3, 4].map((i) => <rect key={i} x={50 + i * 66} y={50 + (i % 2) * 30} width="36" height="200" rx="18" fill="currentColor" />)}
      {tipo === 'montanha' && <path d="M0 225 L110 90 L190 170 L270 60 L400 225 Z" fill="currentColor" />}
      {tipo === 'sol' && (
        <>
          <circle cx="200" cy="150" r="80" fill="currentColor" />
          <rect x="0" y="150" width="400" height="75" fill="currentColor" opacity="0.7" />
        </>
      )}
      {tipo === 'ondas' && (
        <>
          <path d="M0 130 C60 90 120 170 180 130 S300 90 400 130 V225 H0 Z" fill="currentColor" />
          <path d="M0 175 C60 135 120 215 180 175 S300 135 400 175 V225 H0 Z" fill="currentColor" opacity="0.6" />
        </>
      )}
      {tipo === 'grade' && [40, 100, 160, 220, 280, 340].map((x) => [40, 110, 180].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="10" fill="currentColor" />))}
    </svg>
  )
}

const BOTAO_ESCURO = 'rounded-full border-white/30 bg-black/35 text-white hover:bg-black/55 hover:text-white dark:border-white/30 dark:bg-black/35 dark:hover:bg-black/55'

export default function GaleriaComLightboxInline() {
  const [idx, setIdx] = useState(0)
  const ir = (delta: number) => setIdx((i) => (i + delta + FOTOS.length) % FOTOS.length)
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') ir(-1)
    if (e.key === 'ArrowRight') ir(1)
  }
  const foto = FOTOS[idx] ?? FOTOS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Galeria</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Bastidores de 2026</h2>
          </div>
          <p className="text-sm text-muted-foreground">Clique nas miniaturas ou use as setas do teclado</p>
        </div>

        <div tabIndex={0} onKeyDown={onKey} aria-live="polite" className="group relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={idx} className={cn('absolute inset-0 bg-gradient-to-br', foto.tone)} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <Cenario tipo={foto.cena} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-white">
            <p className="text-lg font-semibold">{foto.titulo}</p>
            <p className="text-sm text-white/80">{foto.descricao}</p>
          </div>
          <span className="absolute top-4 left-4 rounded-full bg-black/40 px-2.5 py-1 font-mono text-xs text-white backdrop-blur">
            {idx + 1} / {FOTOS.length}
          </span>
          <Button size="icon-sm" variant="outline" aria-label="Ampliar foto" className={cn('absolute top-4 right-4', BOTAO_ESCURO)}>
            <Expand />
          </Button>
          <Button size="icon" variant="outline" onClick={() => ir(-1)} aria-label="Foto anterior" className={cn('absolute top-1/2 left-4 -translate-y-1/2', BOTAO_ESCURO)}>
            <ChevronLeft />
          </Button>
          <Button size="icon" variant="outline" onClick={() => ir(1)} aria-label="Próxima foto" className={cn('absolute top-1/2 right-4 -translate-y-1/2', BOTAO_ESCURO)}>
            <ChevronRight />
          </Button>
        </div>

        <ul className="mt-4 grid grid-cols-6 gap-2 sm:gap-3">
          {FOTOS.map((f, i) => (
            <li key={f.titulo}>
              <button
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Mostrar: ${f.titulo}`}
                aria-current={i === idx}
                className={cn('relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br transition-all', f.tone, i === idx ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : 'opacity-60 hover:opacity-100')}
              >
                <Cenario tipo={f.cena} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
