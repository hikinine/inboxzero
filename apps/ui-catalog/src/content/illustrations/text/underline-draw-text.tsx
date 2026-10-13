'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'

// "Underline Draw Text": título com anotações feitas "à mão" que se desenham em sequência — rabisco ondulado sob
// "mais", círculo à mão livre em volta de "menos esforço", marca-texto atrás de "todo santo dia" e um bilhete com
// seta curva. Cada traço é um SVG esticado sobre a própria palavra (viewBox na proporção aproximada, sem medir DOM); tudo apaga junto e redesenha.
const PERIOD = 7

// janela [ini, fim] de desenho de cada traço dentro do ciclo, em fração do período
const draw = (a: number, b: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: [0, 0, 1, 1, 1], opacity: [0, 1, 1, 1, 0] },
  transition: { duration: PERIOD, times: [0, a, b, 0.88, 0.97], repeat: Infinity, ease: 'easeInOut' as const },
})

function Mark({ children, svg, className = '' }: { children: ReactNode; svg: ReactNode; className?: string }) {
  return (
    <span className="relative inline-block">
      <span className={`pointer-events-none absolute ${className}`}>{svg}</span>
      <span className="relative">{children}</span>
    </span>
  )
}

export default function UnderlineDrawText() {
  return (
    <div className="relative flex h-[280px] w-[480px] items-center justify-center text-foreground">
      <h3 className="max-w-[400px] text-center text-[38px] font-semibold leading-[1.2] tracking-tight">
        Venda{' '}
        <Mark
          className="-bottom-2 inset-x-0 h-3"
          svg={
            <svg viewBox="0 0 80 12" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
              <motion.path d="M2 8 Q 11 1 21 8 T 40 8 T 59 8 T 78 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-amber-500" {...draw(0.04, 0.14)} />
            </svg>
          }
        >
          mais
        </Mark>{' '}
        com{' '}
        <Mark
          className="-inset-x-4 -inset-y-3"
          svg={
            <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
              <motion.path
                d="M 42 56 C 6 42, 24 11, 126 7 C 228 3, 297 17, 291 36 C 285 59, 180 69, 102 64 C 48 62, 18 50, 36 28 C 48 17, 78 11, 108 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-rose-500"
               
                {...draw(0.2, 0.36)}
              />
            </svg>
          }
        >
          menos esforço
        </Mark>
        ,{' '}
        <Mark
          className="inset-x-[-4px] bottom-0 top-[45%]"
          svg={
            <svg viewBox="0 0 270 24" preserveAspectRatio="none" className="size-full overflow-visible" aria-hidden>
              <motion.path d="M3 14 C 80 11, 190 15, 267 12" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" className="text-emerald-400/45" {...draw(0.42, 0.56)} />
            </svg>
          }
        >
          todo santo dia
        </Mark>
        .
      </h3>

      {/* bilhete + seta */}
      <motion.span
        className="absolute right-3 top-6 rotate-6 font-serif text-lg italic text-rose-500"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] }}
        transition={{ duration: PERIOD, times: [0, 0.6, 0.68, 0.88, 0.97], repeat: Infinity }}
      >
        é sério!
      </motion.span>
      <svg viewBox="0 0 80 70" className="absolute right-12 top-12 h-[70px] w-[80px] overflow-visible" aria-hidden>
        <motion.path d="M 66 6 C 70 30, 50 52, 14 58 M 14 58 L 26 50 M 14 58 L 24 66" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-rose-500" {...draw(0.66, 0.78)} />
      </svg>
    </div>
  )
}
