'use client'

import type { ReactNode } from 'react'
import { Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SCENES: Record<string, ReactNode> = {
  montanha: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30" aria-hidden="true">
      <circle cx="320" cy="70" r="32" fill="currentColor" />
      <path d="M0 300 L120 140 L200 220 L280 110 L400 300 Z" fill="currentColor" />
    </svg>
  ),
  ondas: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30" aria-hidden="true">
      <path d="M0 180 C60 140 120 220 180 180 S300 140 400 180 V300 H0 Z" fill="currentColor" />
      <path d="M0 230 C60 190 120 270 180 230 S300 190 400 230 V300 H0 Z" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  circulos: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/40" aria-hidden="true">
      <circle cx="200" cy="150" r="50" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="200" cy="150" r="95" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="200" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  linhas: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={-100 + i * 90} y1="320" x2={60 + i * 90} y2="-20" stroke="currentColor" strokeWidth="14" />
      ))}
    </svg>
  ),
  sol: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/35" aria-hidden="true">
      <circle cx="200" cy="200" r="110" fill="currentColor" />
      <rect x="0" y="200" width="400" height="100" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  grade: (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/40" aria-hidden="true">
      {[40, 100, 160, 220, 280, 340].map((x) => [40, 110, 180, 250].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="currentColor" />))}
    </svg>
  ),
}

const MEDIA = [
  { title: 'Serra da Mantiqueira ao amanhecer', meta: 'Foto · Campos do Jordão, SP', span: 'md:col-span-2 md:row-span-2', tone: 'from-orange-400 via-rose-400 to-purple-600', scene: 'montanha' },
  { title: 'Encontro anual de clientes', meta: 'Vídeo · 2 min', span: '', tone: 'from-sky-500 to-indigo-600', scene: 'circulos' },
  { title: 'Novo escritório', meta: 'Foto · Vila Madalena, SP', span: '', tone: 'from-emerald-400 to-teal-600', scene: 'grade' },
  { title: 'Bastidores do podcast', meta: 'Foto · Estúdio', span: 'md:col-span-2', tone: 'from-fuchsia-500 to-violet-700', scene: 'ondas' },
  { title: 'Praia do Rosa', meta: 'Foto · Imbituba, SC', span: '', tone: 'from-yellow-300 to-amber-500', scene: 'sol' },
  { title: 'Imersão de produto', meta: 'Galeria · 24 fotos', span: 'md:col-span-3', tone: 'from-slate-600 to-slate-900', scene: 'linhas' },
]

export default function GaleriaEmBento() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Galeria</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Um ano em imagens</h2>
          </div>
          <p className="text-sm text-muted-foreground">6 de 148 mídias</p>
        </div>
        <div className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4">
          {MEDIA.map((m, i) => (
            <figure key={m.title} className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${m.tone} ${m.span}`}>
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">{SCENES[m.scene]}</div>
              <span className="absolute top-3 left-3 rounded-full bg-black/30 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur">{String(i + 1).padStart(2, '0')}</span>
              <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-3 bg-background/90 p-3 backdrop-blur transition-transform duration-300 group-hover:translate-y-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{m.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{m.meta}</p>
                </div>
                <Button size="icon-sm" variant="outline" aria-label={`Ampliar: ${m.title}`}>
                  <Maximize2 />
                </Button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
