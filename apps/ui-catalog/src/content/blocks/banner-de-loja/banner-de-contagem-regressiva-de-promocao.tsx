'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, BellRing, Flame, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const START_SECONDS = 2 * 86400 + 14 * 3600 + 36 * 60 + 12
const pad = (n: number) => String(n).padStart(2, '0')

export default function BannerDeContagemRegressivaDePromocao() {
  const [left, setLeft] = useState(START_SECONDS)
  const [slimHidden, setSlimHidden] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  const days = Math.floor(left / 86400)
  const hours = Math.floor((left % 86400) / 3600)
  const minutes = Math.floor((left % 3600) / 60)
  const seconds = left % 60
  const parts: Array<[string, number]> = [
    ['Dias', days],
    ['Horas', hours],
    ['Min', minutes],
    ['Seg', seconds],
  ]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-4">
        {!slimHidden && (
          <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl border bg-card px-12 py-3 text-sm">
            <span className="flex items-center gap-2">
              <Flame className="size-4 text-orange-500" />
              <span>
                <span className="font-medium">Última chamada:</span> 40% off em fones e caixas de som
              </span>
            </span>
            <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold tabular-nums" aria-live="off">
              {pad(days * 24 + hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
            <a href="#" className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline">
              Aproveitar <ArrowRight className="size-3.5" />
            </a>
            <Button variant="ghost" size="icon-sm" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Fechar aviso" onClick={() => setSlimHidden(true)}>
              <X />
            </Button>
          </div>
        )}

        <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-8 text-white sm:p-12">
          <div className="absolute -left-20 -top-24 size-80 rounded-full bg-violet-600/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 right-10 size-72 rounded-full bg-fuchsia-600/30 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <Badge variant="secondary" className="bg-white/15 text-white hover:bg-white/15">
                <Flame data-icon="inline-start" className="text-orange-400" /> Black Friday antecipada
              </Badge>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Até <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">60% off</span> em toda a loja
              </h2>
              <p className="mt-3 max-w-md text-white/70">Preços liberados só até o fim da contagem. Cadastre-se para receber o aviso 1 hora antes de acabar.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" variant="secondary">
                  Ver ofertas <ArrowRight data-icon="inline-end" />
                </Button>
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  <BellRing data-icon="inline-start" /> Avise-me
                </Button>
              </div>
            </div>
            <div>
              <div className="text-center text-xs font-medium uppercase tracking-wider text-white/60 lg:text-left">A promoção termina em</div>
              <div className="mt-3 flex items-start gap-2 sm:gap-3" aria-live="polite" aria-label={`Termina em ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`}>
                {parts.map(([label, value], i) => (
                  <div key={label} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex w-16 flex-col items-center rounded-xl border border-white/15 bg-white/10 py-3 backdrop-blur sm:w-20">
                      <span className="text-3xl font-semibold tabular-nums sm:text-4xl">{pad(value)}</span>
                      <span className="mt-1 text-[10px] uppercase tracking-wide text-white/60">{label}</span>
                    </div>
                    {i < parts.length - 1 && <span className="pt-3 text-2xl font-semibold text-white/40 sm:text-3xl">:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {slimHidden && (
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={() => setSlimHidden(false)}>Mostrar faixa de última chamada</Button>
          </div>
        )}
      </div>
    </section>
  )
}
