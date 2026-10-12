'use client'

import { useState, type ReactNode } from 'react'
import { Hand, MessageSquare, Mic, MicOff, MonitorUp, MoreHorizontal, PhoneOff, Users, Video, VideoOff } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Participante {
  id: string
  name: string
  initials: string
  muted: boolean
  camera: boolean
  gradient: string
  speaking?: boolean
  host?: boolean
  you?: boolean
}

const PARTICIPANTES: Participante[] = [
  { id: 'marina', name: 'Marina Costa', initials: 'MC', muted: false, camera: true, gradient: 'from-violet-600/60 to-fuchsia-500/30', speaking: true, host: true },
  { id: 'voce', name: 'Você', initials: 'PS', muted: false, camera: true, gradient: 'from-sky-600/60 to-cyan-500/30', you: true },
  { id: 'rafael', name: 'Rafael Andrade', initials: 'RA', muted: true, camera: true, gradient: 'from-emerald-600/60 to-teal-500/30' },
  { id: 'bruno', name: 'Bruno Lima', initials: 'BL', muted: true, camera: false, gradient: 'from-amber-600/60 to-orange-500/30' },
  { id: 'carla', name: 'Carla Mendes', initials: 'CM', muted: false, camera: true, gradient: 'from-rose-600/60 to-pink-500/30' },
  { id: 'diego', name: 'Diego Nunes', initials: 'DN', muted: true, camera: true, gradient: 'from-indigo-600/60 to-blue-500/30' },
]

function ControlButton({ label, active, danger, onClick, children }: { label: string; active?: boolean; danger?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'flex size-11 items-center justify-center rounded-full transition-colors [&_svg]:size-5',
        danger ? 'bg-rose-500 text-white hover:bg-rose-400' : active ? 'bg-white text-zinc-900 hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
      )}
    >
      {children}
    </button>
  )
}

export default function VideochamadaEmGrade() {
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [handUp, setHandUp] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl rounded-2xl bg-zinc-950 p-4 text-white shadow-2xl sm:p-5">
        <div className="flex items-center justify-between gap-4 px-1 pb-4">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Alinhamento semanal · Vendas</div>
            <div className="text-xs text-zinc-400">Sala principal</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-2.5 py-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
              </span>
              REC
            </span>
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 tabular-nums">00:24:13</span>
            <span className="hidden items-center gap-1.5 rounded-full bg-zinc-900 px-2.5 py-1 sm:flex">
              <Users className="size-3.5" /> 6
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {PARTICIPANTES.map((p) => {
            const muted = p.you ? !micOn : p.muted
            const camera = p.you ? camOn : p.camera
            return (
              <div key={p.id} className={cn('relative aspect-video overflow-hidden rounded-xl bg-zinc-900 ring-2 ring-transparent transition-shadow', p.speaking && 'ring-emerald-400')}>
                {camera ? (
                  <div className={cn('absolute inset-0 bg-gradient-to-br', p.gradient)}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,0,0,0.25),transparent_60%)]" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-zinc-900" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn('flex size-14 items-center justify-center rounded-full text-lg font-semibold sm:size-16', camera ? 'bg-white/20 text-white backdrop-blur' : 'bg-zinc-800 text-zinc-200')}>{p.initials}</span>
                </div>
                {!camera && (
                  <span className="absolute top-2 right-2 rounded-md bg-black/50 p-1 text-zinc-300">
                    <VideoOff className="size-3.5" />
                  </span>
                )}
                {p.speaking && (
                  <div className="absolute top-2 right-2 flex items-end gap-0.5 rounded-md bg-black/50 px-1.5 py-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 rounded-full bg-emerald-400"
                        animate={{ height: [4, 12, 6, 10, 4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>
                )}
                {p.you && handUp && (
                  <span className="absolute top-2 left-2 flex size-7 items-center justify-center rounded-md bg-amber-400 text-zinc-900">
                    <Hand className="size-4" />
                  </span>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">
                  {muted ? <MicOff className="size-3.5 text-rose-400" /> : <Mic className="size-3.5 text-zinc-200" />}
                  <span className="font-medium">{p.name}</span>
                  {p.host && <span className="text-zinc-400">· anfitriã</span>}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <ControlButton label={micOn ? 'Desativar microfone' : 'Ativar microfone'} active={!micOn} onClick={() => setMicOn((v) => !v)}>
            {micOn ? <Mic /> : <MicOff />}
          </ControlButton>
          <ControlButton label={camOn ? 'Desligar câmera' : 'Ligar câmera'} active={!camOn} onClick={() => setCamOn((v) => !v)}>
            {camOn ? <Video /> : <VideoOff />}
          </ControlButton>
          <ControlButton label="Compartilhar tela">
            <MonitorUp />
          </ControlButton>
          <ControlButton label={handUp ? 'Abaixar a mão' : 'Levantar a mão'} active={handUp} onClick={() => setHandUp((v) => !v)}>
            <Hand />
          </ControlButton>
          <ControlButton label="Abrir chat">
            <MessageSquare />
          </ControlButton>
          <ControlButton label="Mais opções">
            <MoreHorizontal />
          </ControlButton>
          <button type="button" className="ml-2 flex h-11 items-center gap-2 rounded-full bg-rose-500 px-5 text-sm font-medium text-white transition-colors hover:bg-rose-400">
            <PhoneOff className="size-4" /> Sair
          </button>
        </div>
      </div>
    </section>
  )
}
