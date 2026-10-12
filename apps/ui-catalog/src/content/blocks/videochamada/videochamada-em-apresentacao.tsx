'use client'

import { useState } from 'react'
import { Captions, ChevronLeft, ChevronRight, Hand, Mic, MicOff, MonitorUp, PhoneOff, Video, VideoOff } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const SLIDES = [
  { titulo: 'Resultados do 3º trimestre', subtitulo: 'Receita, retenção e pipeline', barras: [52, 61, 58, 74, 80, 92], destaque: 'R$ 4,2 mi', rotulo: 'receita recorrente anual', legenda: 'Fechamos o trimestre 27% acima da meta, puxados pelo plano Business.' },
  { titulo: 'Retenção por coorte', subtitulo: 'Clientes que entraram em 2025', barras: [100, 94, 91, 90, 89, 89], destaque: '94%', rotulo: 'retenção líquida de receita', legenda: 'A coorte de 2025 estabilizou em 89% depois do sexto mês.' },
  { titulo: 'Pipeline para o 4º trimestre', subtitulo: 'Oportunidades acima de R$ 50 mil', barras: [30, 45, 48, 66, 71, 88], destaque: '138', rotulo: 'oportunidades abertas', legenda: 'O pipeline cobre 3,2 vezes a meta do trimestre que vem.' },
]
const MESES = ['abr', 'mai', 'jun', 'jul', 'ago', 'set']

interface Participante {
  nome: string
  iniciais: string
  tone: string
  mudo: boolean
  cam: boolean
  apresentando?: boolean
  falando?: boolean
}

const PARTICIPANTES: Participante[] = [
  { nome: 'Você', iniciais: 'PS', tone: 'from-sky-600/60 to-cyan-500/30', mudo: false, cam: true, apresentando: true },
  { nome: 'Marina Costa', iniciais: 'MC', tone: 'from-violet-600/60 to-fuchsia-500/30', mudo: false, cam: true, falando: true },
  { nome: 'Rafael Andrade', iniciais: 'RA', tone: 'from-emerald-600/60 to-teal-500/30', mudo: true, cam: true },
  { nome: 'Carla Mendes', iniciais: 'CM', tone: 'from-rose-600/60 to-pink-500/30', mudo: false, cam: true },
  { nome: 'Bruno Lima', iniciais: 'BL', tone: 'from-amber-600/60 to-orange-500/30', mudo: true, cam: false },
]

const BOTAO = 'flex size-10 items-center justify-center rounded-full transition-colors [&_svg]:size-4'

export default function VideochamadaEmApresentacao() {
  const [slide, setSlide] = useState(0)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [maoLevantada, setMaoLevantada] = useState(false)
  const atual = SLIDES[slide] ?? SLIDES[0]
  const max = Math.max(...atual.barras)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl rounded-2xl bg-zinc-950 p-3 text-white shadow-2xl sm:p-4">
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Revisão trimestral · Diretoria</p>
            <p className="text-xs text-zinc-400">6 participantes · 00:31:07</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300">
            <MonitorUp className="size-3.5" /> <span className="hidden sm:inline">Você está compartilhando a tela</span>
            <span className="sm:hidden">Compartilhando</span>
          </span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_180px]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="relative overflow-hidden rounded-xl bg-zinc-900 p-3 ring-2 ring-emerald-400/70 sm:p-5">
              <motion.div key={slide} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="aspect-video rounded-lg bg-background p-5 text-foreground shadow-xl sm:p-8">
                <div className="flex h-full flex-col">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{atual.subtitulo}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-2xl">{atual.titulo}</h3>
                  <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-6 pt-4">
                    <div>
                      <div className="flex h-24 items-end gap-2 sm:h-32">
                        {atual.barras.map((b, i) => (
                          <motion.div key={`${slide}-${i}`} initial={{ height: 0 }} animate={{ height: `${(b / max) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} className={cn('flex-1 rounded-t', i === atual.barras.length - 1 ? 'bg-primary' : 'bg-primary/35')} />
                        ))}
                      </div>
                      <div className="mt-1.5 flex gap-2">
                        {MESES.map((m) => (
                          <span key={m} className="flex-1 text-center text-[10px] text-muted-foreground">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-semibold tracking-tight tabular-nums sm:text-5xl">{atual.destaque}</p>
                      <p className="text-xs text-muted-foreground">{atual.rotulo}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-300">
                <span className="truncate">
                  Resultados-Q3.pdf · slide {slide + 1} de {SLIDES.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => setSlide((s) => Math.max(0, s - 1))} disabled={slide === 0} aria-label="Slide anterior" className="rounded-md bg-zinc-800 p-1.5 hover:bg-zinc-700 disabled:opacity-40">
                    <ChevronLeft className="size-4" />
                  </button>
                  {SLIDES.map((s, i) => (
                    <button key={s.titulo} type="button" onClick={() => setSlide(i)} aria-label={`Ir para o slide ${i + 1}`} className={cn('h-1.5 rounded-full transition-all', i === slide ? 'w-5 bg-white' : 'w-1.5 bg-zinc-600')} />
                  ))}
                  <button type="button" onClick={() => setSlide((s) => Math.min(SLIDES.length - 1, s + 1))} disabled={slide === SLIDES.length - 1} aria-label="Próximo slide" className="rounded-md bg-zinc-800 p-1.5 hover:bg-zinc-700 disabled:opacity-40">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm">
              <Captions className="mt-0.5 size-4 shrink-0 text-zinc-400" />
              <motion.p key={`legenda-${slide}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-200">
                <span className="text-zinc-400">Você:</span> {atual.legenda}
              </motion.p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button type="button" aria-label={micOn ? 'Desativar microfone' : 'Ativar microfone'} aria-pressed={!micOn} onClick={() => setMicOn((v) => !v)} className={cn(BOTAO, micOn ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white text-zinc-900')}>
                {micOn ? <Mic /> : <MicOff />}
              </button>
              <button type="button" aria-label={camOn ? 'Desligar câmera' : 'Ligar câmera'} aria-pressed={!camOn} onClick={() => setCamOn((v) => !v)} className={cn(BOTAO, camOn ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white text-zinc-900')}>
                {camOn ? <Video /> : <VideoOff />}
              </button>
              <button type="button" aria-label={maoLevantada ? 'Abaixar a mão' : 'Levantar a mão'} aria-pressed={maoLevantada} onClick={() => setMaoLevantada((v) => !v)} className={cn(BOTAO, maoLevantada ? 'bg-amber-400 text-zinc-900' : 'bg-zinc-800 hover:bg-zinc-700')}>
                <Hand />
              </button>
              <button type="button" className="flex h-10 items-center gap-2 rounded-full bg-rose-500 px-4 text-xs font-medium transition-colors hover:bg-rose-400">
                <MonitorUp className="size-4" /> Parar de compartilhar
              </button>
              <button type="button" aria-label="Sair da reunião" className={cn(BOTAO, 'bg-zinc-800 text-rose-400 hover:bg-zinc-700')}>
                <PhoneOff />
              </button>
            </div>
          </div>

          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-1">
            {PARTICIPANTES.map((p) => {
              const mudo = p.nome === 'Você' ? !micOn : p.mudo
              const cam = p.nome === 'Você' ? camOn : p.cam
              return (
                <li key={p.nome} className={cn('relative aspect-video overflow-hidden rounded-lg bg-zinc-900 ring-2 ring-transparent', p.falando && 'ring-emerald-400', cam && `bg-gradient-to-br ${p.tone}`)}>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{p.iniciais}</span>
                  {p.nome === 'Você' && maoLevantada && (
                    <span className="absolute top-1 left-1 flex size-5 items-center justify-center rounded bg-amber-400 text-zinc-900">
                      <Hand className="size-3" />
                    </span>
                  )}
                  {!cam && <VideoOff className="absolute top-1 right-1 size-3 text-zinc-400" />}
                  <span className="absolute bottom-1 left-1 flex max-w-[calc(100%-0.5rem)] items-center gap-1 rounded bg-black/50 px-1 py-0.5 text-[10px]">
                    {mudo ? <MicOff className="size-2.5 shrink-0 text-rose-400" /> : <Mic className="size-2.5 shrink-0" />}
                    <span className="truncate">
                      {p.nome}
                      {p.apresentando ? ' · apresentando' : ''}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
