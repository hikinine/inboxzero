'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Captions, Maximize, Pause, Play, Volume2 } from 'lucide-react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DURACAO = 96
const LEGENDAS: { inicio: number; fim: number; texto: string }[] = [
  { inicio: 0, fim: 12, texto: 'Bem-vindo ao tour do painel de atendimento.' },
  { inicio: 12, fim: 28, texto: 'À esquerda ficam as filas: WhatsApp, Instagram e e-mail.' },
  { inicio: 28, fim: 47, texto: 'Clique em uma conversa para ver o histórico completo do contato.' },
  { inicio: 47, fim: 66, texto: 'As respostas rápidas ficam no atalho de barra (/).' },
  { inicio: 66, fim: 84, texto: 'Transfira para outra pessoa com o botão de encaminhar.' },
  { inicio: 84, fim: 96, texto: 'É isso! Bons atendimentos.' },
]
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const CONTROLE = 'text-white hover:bg-white/15 hover:text-white'

export default function AspectRatioVideoLegendas() {
  const [tocando, setTocando] = useState(false)
  const [tempo, setTempo] = useState(30)
  const [cc, setCc] = useState(true)

  useEffect(() => {
    if (!tocando) return
    const t = setInterval(() => setTempo((v) => (v + 1 >= DURACAO ? 0 : v + 1)), 1000)
    return () => clearInterval(t)
  }, [tocando])

  const atual = LEGENDAS.find((l) => tempo >= l.inicio && tempo < l.fim)

  return (
    <div className="w-full max-w-lg space-y-6">
      <div>
        <Legenda>16:9 com legendas, controles e transcrição</Legenda>
        <div className="overflow-hidden rounded-xl border bg-card">
          <AspectRatio
            ratio={16 / 9}
            className="group/video bg-gradient-to-br from-indigo-500/40 via-slate-700/70 to-sky-500/40 dark:from-indigo-500/30 dark:via-slate-900 dark:to-sky-500/30"
          >
            <div className="absolute inset-6 rounded-lg border border-white/15 bg-black/20 p-3" aria-hidden>
              <div className="flex gap-2">
                <div className="h-2 w-16 rounded bg-white/30" />
                <div className="h-2 w-10 rounded bg-white/20" />
              </div>
              <div className="mt-3 grid grid-cols-[1fr_2fr] gap-2">
                <div className="space-y-1.5">
                  <div className="h-6 rounded bg-white/25" />
                  <div className="h-6 rounded bg-white/10" />
                  <div className="h-6 rounded bg-white/10" />
                </div>
                <div className="rounded bg-white/10" />
              </div>
            </div>
            <button type="button" aria-label={tocando ? 'Pausar' : 'Reproduzir'} onClick={() => setTocando((v) => !v)} className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  'flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur transition-opacity',
                  tocando && 'opacity-0 group-hover/video:opacity-100',
                )}
              >
                {tocando ? <Pause className="size-6 fill-current" /> : <Play className="ml-0.5 size-6 fill-current" />}
              </span>
            </button>
            {cc && atual && (
              <div className="pointer-events-none absolute inset-x-0 bottom-12 flex justify-center px-6">
                <span className="rounded bg-black/75 px-2 py-1 text-center text-sm text-white">{atual.texto}</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-6 pb-2 text-white">
              <div
                className="relative h-1 w-full rounded-full bg-white/30"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={DURACAO}
                aria-valuenow={tempo}
                aria-label="Progresso do vídeo"
              >
                <div className="h-full rounded-full bg-white" style={{ width: `${(tempo / DURACAO) * 100}%` }} />
                {LEGENDAS.map((l) => (
                  <span key={l.inicio} className="absolute top-0 h-full w-px bg-black/40" style={{ left: `${(l.inicio / DURACAO) * 100}%` }} />
                ))}
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <Button variant="ghost" size="icon-xs" className={CONTROLE} aria-label={tocando ? 'Pausar' : 'Reproduzir'} onClick={() => setTocando((v) => !v)}>
                  {tocando ? <Pause /> : <Play />}
                </Button>
                <Button variant="ghost" size="icon-xs" className={CONTROLE} aria-label="Volume">
                  <Volume2 />
                </Button>
                <span className="ml-1 font-mono text-[11px] tabular-nums">
                  {fmt(tempo)} / {fmt(DURACAO)}
                </span>
                <Button variant="ghost" size="xs" aria-pressed={cc} className={cn('ml-auto', CONTROLE, cc && 'bg-white/20')} onClick={() => setCc((v) => !v)}>
                  <Captions data-icon="inline-start" /> CC
                </Button>
                <Button variant="ghost" size="icon-xs" className={CONTROLE} aria-label="Tela cheia">
                  <Maximize />
                </Button>
              </div>
            </div>
          </AspectRatio>
          <ol className="max-h-40 divide-y overflow-y-auto text-sm" aria-label="Transcrição">
            {LEGENDAS.map((l) => (
              <li key={l.inicio}>
                <button
                  type="button"
                  onClick={() => setTempo(l.inicio)}
                  className={cn('flex w-full gap-3 px-3 py-2 text-left hover:bg-muted/60', atual === l && 'bg-primary/5')}
                >
                  <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">{fmt(l.inicio)}</span>
                  <span className={atual === l ? 'font-medium' : 'text-muted-foreground'}>{l.texto}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <Legenda>9:16 vertical e 21:9 cinematográfico</Legenda>
        <div className="grid grid-cols-[auto_1fr] items-start gap-3">
          <AspectRatio ratio={9 / 16} className="w-28 overflow-hidden rounded-xl bg-gradient-to-b from-rose-500/40 via-fuchsia-600/40 to-indigo-600/50">
            <span className="absolute top-2 left-2 rounded-full bg-black/40 px-1.5 py-0.5 text-[10px] text-white">0:15</span>
            <div className="absolute inset-x-2 bottom-3 rounded bg-black/70 px-1.5 py-1 text-center text-[10px] leading-tight text-white">Responda em segundos</div>
          </AspectRatio>
          <AspectRatio
            ratio={21 / 9}
            className="overflow-hidden rounded-xl bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 dark:from-slate-900 dark:via-slate-700 dark:to-slate-900"
          >
            <div className="absolute inset-x-0 top-0 h-[12%] bg-black" />
            <div className="absolute inset-x-0 bottom-0 h-[12%] bg-black" />
            <div className="absolute inset-x-0 bottom-[16%] text-center text-xs text-white/90">— Vamos começar pelo pipeline.</div>
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
