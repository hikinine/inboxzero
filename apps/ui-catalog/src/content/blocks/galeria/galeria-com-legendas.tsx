'use client'

import { ArrowRight, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PHOTOS = [
  { n: '01', cat: 'Escritório', title: 'Novo escritório na Vila Madalena', place: 'São Paulo, SP', tone: 'from-amber-300 via-orange-400 to-rose-500', shape: 'arco' },
  { n: '02', cat: 'Evento', title: 'Encontro anual de clientes', place: 'Florianópolis, SC', tone: 'from-sky-400 via-blue-500 to-indigo-600', shape: 'barras' },
  { n: '03', cat: 'Time', title: 'Imersão de produto na serra', place: 'Campos do Jordão, SP', tone: 'from-emerald-400 via-teal-500 to-cyan-600', shape: 'montanha' },
  { n: '04', cat: 'Produto', title: 'Lançamento do app no palco principal', place: 'Rio de Janeiro, RJ', tone: 'from-fuchsia-500 via-purple-500 to-violet-700', shape: 'arco' },
  { n: '05', cat: 'Comunidade', title: 'Meetup de atendimento digital', place: 'Recife, PE', tone: 'from-lime-300 via-green-400 to-emerald-600', shape: 'barras' },
  { n: '06', cat: 'Bastidores', title: 'Gravação do podcast Fala, Cliente', place: 'São Paulo, SP', tone: 'from-slate-500 via-slate-600 to-zinc-800', shape: 'montanha' },
] as const

export default function GaleriaComLegendas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Camera className="size-3.5" /> Galeria
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Registros do último ano</h2>
            <p className="mt-3 text-muted-foreground">Escritório novo, eventos com clientes e muito bastidor. Tudo com legenda, porque contexto importa.</p>
          </div>
          <Button variant="ghost" className="w-fit">
            Ver todas as fotos <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((p) => (
            <figure key={p.n} className="group">
              <a href="#" className={`relative block aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${p.tone}`}>
                <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-white/30 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
                  {p.shape === 'arco' && <path d="M60 300 V180 a140 140 0 0 1 280 0 V300 Z" fill="currentColor" />}
                  {p.shape === 'barras' && [0, 1, 2, 3, 4].map((i) => <rect key={i} x={40 + i * 70} y={60 + (i % 2) * 40} width="40" height="240" rx="20" fill="currentColor" />)}
                  {p.shape === 'montanha' && <path d="M0 300 L110 150 L190 230 L270 120 L400 300 Z" fill="currentColor" />}
                </svg>
              </a>
              <figcaption className="mt-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-muted-foreground">{p.n}</span>
                  <span className="h-px w-4 bg-border" />
                  <span className="font-medium uppercase tracking-wider text-muted-foreground">{p.cat}</span>
                </div>
                <p className="mt-1.5 font-medium leading-snug group-hover:underline">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.place}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
