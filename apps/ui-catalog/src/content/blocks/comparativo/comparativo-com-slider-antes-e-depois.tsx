'use client'

import { useRef, useState } from 'react'
import { Check, MoveHorizontal, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const CONVERSAS = [
  { ini: 'JP', nome: 'Juliana Prado', canal: 'WhatsApp', assunto: 'Orçamento do plano anual', espera: '3h' },
  { ini: 'ML', nome: 'Marcos Lima', canal: 'Instagram', assunto: 'Troca do pedido #4821', espera: '5h' },
  { ini: 'NF', nome: 'Nuvem Fit', canal: 'E-mail', assunto: 'Integração com a Shopify', espera: '1 dia' },
  { ini: 'BN', nome: 'Beatriz Nunes', canal: 'WhatsApp', assunto: 'Agendar demonstração', espera: '8h' },
  { ini: 'CP', nome: 'Casa Prisma', canal: 'Telegram', assunto: 'Segunda via do boleto', espera: '2h' },
]

const METRICAS = [
  { label: 'Tempo médio de resposta', antes: '3h 40min', depois: '4 min' },
  { label: 'Conversas sem resposta', antes: '38', depois: '0' },
  { label: 'Leads convertidos no mês', antes: '12', depois: '47' },
]

function Mockup({ modo }: { modo: 'antes' | 'depois' }) {
  const antes = modo === 'antes'
  return (
    <div className={cn('flex h-full flex-col', antes ? 'bg-muted/70' : 'bg-card')}>
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <span className="truncate text-xs font-medium">{antes ? '4 apps abertos · planilha_v7_final.xlsx' : 'Inbox · todos os canais'}</span>
        <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold', antes ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400')}>
          {antes ? '38 pendentes' : 'Tudo respondido'}
        </span>
      </div>
      <ul className="divide-y">
        {CONVERSAS.map((c) => (
          <li key={c.nome} className="flex items-center gap-3 px-4 py-2.5">
            <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium', antes ? 'bg-muted-foreground/15 text-muted-foreground' : 'bg-primary/10 text-primary')}>{c.ini}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium">{c.nome}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{antes ? `${c.canal} · sem resposta há ${c.espera}` : `${c.canal} · ${c.assunto}`}</span>
            </span>
            {antes ? <X className="size-3.5 shrink-0 text-rose-500" /> : <Check className="size-3.5 shrink-0 text-emerald-500" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ComparativoComSliderAntesEDepois() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const t = pos / 100

  const update = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.width === 0) return
    setPos(Math.round(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))))
  }

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Antes e depois</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Arraste e veja o atendimento mudar</h2>
          <p className="mt-3 text-muted-foreground">À esquerda, a rotina com planilha e quatro apps. À direita, a mesma semana com a Lumio.</p>
        </div>

        <div
          ref={ref}
          className="relative mt-10 h-[300px] touch-none overflow-hidden rounded-2xl border bg-card select-none"
          onPointerDown={(e) => {
            dragging.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            update(e.clientX)
          }}
          onPointerMove={(e) => {
            if (dragging.current) update(e.clientX)
          }}
          onPointerUp={() => {
            dragging.current = false
          }}
          onPointerCancel={() => {
            dragging.current = false
          }}
        >
          <div className="absolute inset-0">
            <Mockup modo="antes" />
          </div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <Mockup modo="depois" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-primary" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-md">
              <MoveHorizontal className="size-4" />
            </span>
          </div>
          <Badge variant="outline" className="pointer-events-none absolute top-3 left-3 z-10 bg-background/90">
            Antes
          </Badge>
          <Badge className="pointer-events-none absolute top-3 right-3 z-10">Depois</Badge>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <span className="text-xs text-muted-foreground">Antes</span>
          <Slider value={[pos]} onValueChange={(v) => setPos(Array.isArray(v) ? (v[0] ?? 50) : v)} min={0} max={100} step={1} aria-label="Revelar o depois" className="flex-1" />
          <span className="text-xs text-muted-foreground">Depois</span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {METRICAS.map((m) => (
            <div key={m.label} className="rounded-xl border bg-card p-5">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight tabular-nums" style={{ opacity: 0.3 + 0.7 * (1 - t) }}>
                  {m.antes}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="text-2xl font-semibold tracking-tight text-emerald-600 tabular-nums dark:text-emerald-400" style={{ opacity: 0.3 + 0.7 * t }}>
                  {m.depois}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
