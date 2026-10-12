'use client'

import { ArrowRight, Backpack, Camera, Coffee, Footprints, Headphones, Shirt, Snowflake, Watch, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const CATEGORIES: Array<{ label: string; Icon: LucideIcon; gradient: string }> = [
  { label: 'Tênis', Icon: Footprints, gradient: 'from-neutral-600 to-neutral-900' },
  { label: 'Fones', Icon: Headphones, gradient: 'from-violet-400 to-violet-700' },
  { label: 'Cafeteiras', Icon: Coffee, gradient: 'from-amber-300 to-orange-600' },
  { label: 'Mochilas', Icon: Backpack, gradient: 'from-emerald-400 to-emerald-700' },
  { label: 'Relógios', Icon: Watch, gradient: 'from-sky-400 to-sky-700' },
  { label: 'Câmeras', Icon: Camera, gradient: 'from-pink-400 to-rose-600' },
  { label: 'Vestuário', Icon: Shirt, gradient: 'from-stone-400 to-stone-700' },
]

export default function BannerDeCategoriaEmDestaque() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <a href="#" className="group relative overflow-hidden rounded-2xl bg-slate-900 text-white md:col-span-2 md:row-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-900 to-black transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
            <svg className="absolute inset-0 size-full text-white/10 transition-transform duration-700 group-hover:scale-105" viewBox="0 0 400 240" preserveAspectRatio="none" aria-hidden="true">
              <circle cx="330" cy="60" r="110" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="330" cy="60" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="330" cy="60" r="50" fill="currentColor" opacity="0.4" />
              <path d="M0 200 Q 100 140 200 190 T 400 170" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M0 225 Q 120 170 220 215 T 400 200" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <Snowflake className="absolute right-8 top-8 size-16 text-white/30 transition-transform duration-700 group-hover:rotate-45" strokeWidth={1} aria-hidden="true" />
            <div className="relative flex h-full min-h-[320px] flex-col justify-end p-8 sm:p-10">
              <Badge variant="secondary" className="w-fit bg-white/15 text-white hover:bg-white/15">Nova coleção</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Inverno 26</h2>
              <p className="mt-2 max-w-sm text-white/70">Jaquetas, segunda pele e acessórios para treinar com qualquer temperatura.</p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors group-hover:bg-white/90">
                Ver coleção <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>

          <a href="#" className="group relative overflow-hidden rounded-2xl text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-800 transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
            <Footprints className="absolute -bottom-6 -right-6 size-40 text-white/20 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1} aria-hidden="true" />
            <div className="relative flex h-full min-h-[200px] flex-col justify-between p-6">
              <span className="w-fit rounded-md bg-black/25 px-2 py-0.5 text-xs font-medium backdrop-blur">Até 40% off</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Corrida</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/80">
                  Ver tênis e roupas <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </a>

          <a href="#" className="group relative overflow-hidden rounded-2xl text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-800 transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
            <Headphones className="absolute -bottom-6 -right-6 size-40 text-white/20 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1} aria-hidden="true" />
            <div className="relative flex h-full min-h-[200px] flex-col justify-between p-6">
              <span className="w-fit rounded-md bg-black/25 px-2 py-0.5 text-xs font-medium backdrop-blur">Frete grátis</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Áudio</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/80">
                  Fones e caixas de som <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h3 className="font-medium">Navegue por categoria</h3>
          <Button variant="ghost" size="sm" nativeButton={false} render={<a href="#" />}>
            Todas as categorias <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <div className="-mx-6 mt-4 flex gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
          {CATEGORIES.map((c) => (
            <a key={c.label} href="#" className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center">
              <span className={cn('flex size-20 items-center justify-center rounded-full bg-gradient-to-br text-white ring-2 ring-transparent ring-offset-2 ring-offset-background transition group-hover:ring-primary', c.gradient)}>
                <c.Icon className="size-8 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.4} />
              </span>
              <span className="text-xs font-medium">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
