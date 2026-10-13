'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const EVENTOS = [
  { iniciais: 'JS', nome: 'Juliana S.', cidade: 'Recife', acao: 'assinou o plano Pro' },
  { iniciais: 'MR', nome: 'Marcelo R.', cidade: 'Joinville', acao: 'deu nota 5 no suporte' },
  { iniciais: 'AC', nome: 'Aline C.', cidade: 'Belém', acao: 'convidou 4 pessoas do time' },
  { iniciais: 'PT', nome: 'Pedro T.', cidade: 'Uberlândia', acao: 'renovou por mais 1 ano' },
  { iniciais: 'LF', nome: 'Larissa F.', cidade: 'Natal', acao: 'emitiu a 1.000ª nota fiscal' },
  { iniciais: 'GB', nome: 'Gustavo B.', cidade: 'Maringá', acao: 'assinou o plano Equipe' },
]

const NUVEM = [
  { i: 'RA', x: 6, y: 18, s: 'size-10', d: 0 },
  { i: 'TC', x: 78, y: 8, s: 'size-8', d: 0.6 },
  { i: 'BM', x: 86, y: 62, s: 'size-11', d: 1.1 },
  { i: 'VN', x: 2, y: 70, s: 'size-8', d: 0.3 },
  { i: 'HD', x: 62, y: 84, s: 'size-9', d: 0.9 },
]

const TONS = ['from-sky-400 to-indigo-500', 'from-amber-400 to-rose-500', 'from-emerald-400 to-teal-600', 'from-fuchsia-400 to-violet-600', 'from-orange-400 to-amber-600']

function Gauge({ valor, ativo }: { valor: number; ativo: boolean }) {
  // arco de 180°, valor de -100 a 100 (NPS)
  const frac = (valor + 100) / 200
  return (
    <svg viewBox="0 0 120 68" className="h-auto w-28" role="img" aria-label={`NPS ${valor}`}>
      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="var(--muted)" strokeWidth="10" strokeLinecap="round" />
      <motion.path
        d="M10 60 A50 50 0 0 1 110 60"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: ativo ? frac : 0 }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
      />
      <text x="60" y="58" textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--foreground)">
        {valor}
      </text>
    </svg>
  )
}

export default function StatsComProvaSocialAnimada() {
  const ref = useRef<HTMLDivElement>(null)
  const emVista = useInView(ref, { once: true, amount: 0.3 })
  const [indice, setIndice] = useState(2)
  const [ativos, setAtivos] = useState(12408)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndice((v) => v + 1)
      setAtivos((a) => a + 1 + Math.floor(Math.random() * 3))
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  const visiveis = [0, 1, 2].map((k) => ({ ...EVENTOS[(indice - k) % EVENTOS.length], chave: indice - k }))

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Ao vivo agora
          </div>
          <p className="mt-4 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={ativos} className="inline-block" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }}>
                {ativos.toLocaleString('pt-BR')}
              </motion.span>
            </AnimatePresence>
          </p>
          <p className="text-muted-foreground">empresas usando o Caixa Certo neste momento</p>

          <div className="relative mt-8 h-56">
            {NUVEM.map((a, k) => (
              <motion.div key={a.i} className="absolute" style={{ left: `${a.x}%`, top: `${a.y}%` }} animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + k * 0.4, repeat: Infinity, ease: 'easeInOut', delay: a.d }}>
                <div className={cn('flex items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ring-4 ring-card', a.s, TONS[k % TONS.length])}>{a.i}</div>
              </motion.div>
            ))}

            <div className="absolute inset-x-0 top-1/2 mx-auto flex max-w-xs -translate-y-1/2 flex-col gap-2">
              <AnimatePresence initial={false} mode="popLayout">
                {visiveis.map((ev, k) => (
                  <motion.div
                    key={ev.chave}
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1 - k * 0.3, y: 0, scale: 1 - k * 0.04 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className="flex items-center gap-3 rounded-xl border bg-background/90 px-3 py-2.5 shadow-md backdrop-blur"
                  >
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px]">{ev.iniciais}</AvatarFallback>
                    </Avatar>
                    <p className="min-w-0 flex-1 truncate text-xs">
                      <span className="font-medium">{ev.nome}</span> de {ev.cidade} {ev.acao}
                    </p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{k === 0 ? 'agora' : `${k * 2} min`}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-6 rounded-2xl border bg-card p-6">
            <div>
              <p className="text-sm text-muted-foreground">Nota média</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">4,9</p>
              <p className="text-xs text-muted-foreground">3.812 avaliações na Capterra e Google</p>
            </div>
            <div className="relative" aria-label="4,9 de 5 estrelas">
              <div className="flex gap-0.5 text-muted">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <motion.div className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-amber-400" initial={{ width: 0 }} animate={{ width: emVista ? '98%' : 0 }} transition={{ duration: 1.4, ease: 'easeOut' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 shrink-0 fill-current" />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 rounded-2xl border bg-card p-6">
            <div>
              <p className="text-sm text-muted-foreground">NPS</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">Zona de excelência</p>
              <p className="text-xs text-muted-foreground">Pesquisa com 2.140 clientes em set/2026</p>
            </div>
            <Gauge valor={74} ativo={emVista} />
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">Renovam no ano seguinte</p>
              <p className="text-3xl font-semibold tracking-tight">96%</p>
            </div>
            <div className="mt-4 flex h-2 gap-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.span
                  key={i}
                  className={cn('flex-1 rounded-full', i < 24 ? 'bg-primary' : 'bg-muted')}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: emVista ? 1 : 0 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
