'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const FILTERS = ['Todos', 'Branding', 'Web', 'Mobile', 'Editorial'] as const
type Filter = (typeof FILTERS)[number]

const WORKS: Array<{ title: string; cat: Exclude<Filter, 'Todos'>; ratio: string; tone: string; year: string }> = [
  { title: 'Identidade visual Café Mirante', cat: 'Branding', ratio: 'aspect-[3/4]', tone: 'from-amber-400 to-orange-600', year: '2026' },
  { title: 'Site da Pousada Maré Alta', cat: 'Web', ratio: 'aspect-[4/3]', tone: 'from-sky-400 to-blue-600', year: '2026' },
  { title: 'App Rota Fácil', cat: 'Mobile', ratio: 'aspect-[9/14]', tone: 'from-emerald-400 to-teal-600', year: '2025' },
  { title: 'Revista Horizonte, edição 12', cat: 'Editorial', ratio: 'aspect-square', tone: 'from-rose-400 to-pink-600', year: '2025' },
  { title: 'Embalagens Chá da Serra', cat: 'Branding', ratio: 'aspect-[4/5]', tone: 'from-lime-400 to-green-600', year: '2026' },
  { title: 'E-commerce Loja Bem-te-vi', cat: 'Web', ratio: 'aspect-[16/10]', tone: 'from-violet-400 to-purple-700', year: '2025' },
  { title: 'Relatório anual Instituto Sol', cat: 'Editorial', ratio: 'aspect-[3/4]', tone: 'from-slate-500 to-slate-800', year: '2024' },
  { title: 'App Minha Horta', cat: 'Mobile', ratio: 'aspect-[4/5]', tone: 'from-fuchsia-400 to-rose-600', year: '2024' },
]

export default function PortfolioEmMasonry() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const visible = filter === 'Todos' ? WORKS : WORKS.filter((w) => w.cat === filter)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Portfólio</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Trabalhos selecionados</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoria">
            {FILTERS.map((f) => {
              const active = f === filter
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${active ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:border-foreground/30 hover:text-foreground'}`}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((w) => (
            <a key={w.title} href="#" className={`group relative mb-4 block break-inside-avoid overflow-hidden rounded-xl bg-gradient-to-br ${w.tone} ${w.ratio}`}>
              <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/25 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
                <circle cx="300" cy="110" r="90" fill="currentColor" />
                <path d="M-20 420 L180 180 L260 280 L420 100 V420 Z" fill="currentColor" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                  {w.cat} · {w.year}
                </p>
                <p className="mt-1 flex items-center justify-between gap-2 font-semibold text-white">
                  {w.title}
                  <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
