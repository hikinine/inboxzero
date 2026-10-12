'use client'

import { motion } from 'motion/react'

const WORDMARKS = [
  { name: 'NORTE', cls: 'text-2xl font-black tracking-tight' },
  { name: 'aurora', cls: 'font-serif text-2xl italic' },
  { name: 'Pontual.', cls: 'text-2xl font-semibold' },
  { name: 'VELA', cls: 'text-lg font-light tracking-[0.35em]' },
  { name: 'kombi', cls: 'font-mono text-xl' },
  { name: 'Farol&Co', cls: 'text-2xl font-bold tracking-tight' },
  { name: 'lumen', cls: 'text-2xl font-medium' },
  { name: 'Maré', cls: 'font-serif text-2xl' },
] as const

type Shape = 'ring' | 'bars' | 'diamond' | 'tri' | 'dots' | 'wave' | 'cross' | 'hex'

const TILES: Array<{ name: string; shape: Shape }> = [
  { name: 'Nuvem Fit', shape: 'ring' },
  { name: 'Casa Prisma', shape: 'bars' },
  { name: 'Dona Flor', shape: 'diamond' },
  { name: 'Trilha', shape: 'tri' },
  { name: 'Ponto Certo', shape: 'dots' },
  { name: 'Onda Surf', shape: 'wave' },
  { name: 'Cruz Vet', shape: 'cross' },
  { name: 'Hexa Labs', shape: 'hex' },
]

function Mark({ shape }: { shape: Shape }) {
  switch (shape) {
    case 'ring':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'bars':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="6" width="4" height="15" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      )
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
          <path d="M12 2l10 10-10 10L2 12z" />
        </svg>
      )
    case 'tri':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" aria-hidden>
          <path d="M12 3l9 17H3z" />
        </svg>
      )
    case 'dots':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
          <path d="M2 9c3-4 5-4 8 0s5 4 8 0 3-3 4-2" />
          <path d="M2 16c3-4 5-4 8 0s5 4 8 0 3-3 4-2" />
        </svg>
      )
    case 'cross':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
          <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
        </svg>
      )
    case 'hex':
      return (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" aria-hidden>
          <path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" />
        </svg>
      )
    default:
      return null
  }
}

export default function LogoCloudEmDuasFaixasOpostas() {
  return (
    <section className="w-full overflow-hidden border-y bg-muted/30 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Mais de <span className="font-semibold text-foreground">2.400 empresas</span> atendem com a Clickmax — de marcas nacionais a negócios de bairro
        </p>
      </div>

      <div className="mt-10 space-y-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="overflow-hidden">
          <motion.div className="flex w-max items-center" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
            {[...WORDMARKS, ...WORDMARKS].map((w, i) => (
              <span key={`${w.name}-${i}`} className="flex items-center">
                <span className={`px-8 whitespace-nowrap text-muted-foreground/70 ${w.cls}`}>{w.name}</span>
                <span className="size-1.5 rounded-full bg-border" aria-hidden />
              </span>
            ))}
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div className="flex w-max gap-4 px-2" animate={{ x: ['-50%', '0%'] }} transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}>
            {[...TILES, ...TILES].map((t, i) => (
              <span key={`${t.name}-${i}`} className="flex h-14 items-center gap-3 rounded-xl border bg-card px-4 text-muted-foreground">
                <Mark shape={t.shape} />
                <span className="text-sm font-semibold tracking-tight whitespace-nowrap">{t.name}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
