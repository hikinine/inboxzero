'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { Mic, MicOff, MonitorUp, Paperclip, PhoneOff, Send, Smile, Users, Video, VideoOff } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Mensagem {
  id: number
  autor: string
  iniciais: string
  texto: string
  hora: string
  voce?: boolean
  reacao?: string
}

const MENSAGENS_INICIAIS: Mensagem[] = [
  { id: 1, autor: 'Marina Costa', iniciais: 'MC', texto: 'Bom dia! Vou compartilhar os números do trimestre em 2 min.', hora: '10:02' },
  { id: 2, autor: 'Rafael Andrade', iniciais: 'RA', texto: 'Perfeito. O link do relatório está fixado no canal.', hora: '10:03' },
  { id: 3, autor: 'Você', iniciais: 'PS', texto: 'Estou vendo a tela, pode seguir.', hora: '10:04', voce: true },
  { id: 4, autor: 'Carla Mendes', iniciais: 'CM', texto: 'Dúvida: o churn de setembro já considera o cancelamento da Horizonte?', hora: '10:06', reacao: '👀 2' },
]

const MINIATURAS = [
  { nome: 'Você', iniciais: 'PS', tone: 'from-sky-600/60 to-cyan-500/30', mudo: false },
  { nome: 'Rafael Andrade', iniciais: 'RA', tone: 'from-emerald-600/60 to-teal-500/30', mudo: true },
  { nome: 'Carla Mendes', iniciais: 'CM', tone: 'from-rose-600/60 to-pink-500/30', mudo: false },
  { nome: 'Bruno Lima', iniciais: 'BL', tone: 'from-amber-600/60 to-orange-500/30', mudo: true },
]

function Controle({ rotulo, ativo, onClick, children }: { rotulo: string; ativo?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-label={rotulo} aria-pressed={ativo} onClick={onClick} className={cn('flex h-10 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-colors [&_svg]:size-4', ativo ? 'bg-white text-zinc-900 hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700')}>
      {children}
    </button>
  )
}

export default function VideochamadaComChatLateral() {
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [aba, setAba] = useState<'chat' | 'pessoas'>('chat')
  const [mensagens, setMensagens] = useState<Mensagem[]>(MENSAGENS_INICIAIS)
  const [texto, setTexto] = useState('')

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const t = texto.trim()
    if (!t) return
    setMensagens((m) => [...m, { id: Date.now(), autor: 'Você', iniciais: 'PS', texto: t, hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), voce: true }])
    setTexto('')
  }

  const pessoas = [{ nome: 'Marina Costa', iniciais: 'MC', papel: 'anfitriã' }, ...MINIATURAS.map((p) => ({ nome: p.nome, iniciais: p.iniciais, papel: p.mudo ? 'mudo' : '' }))]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-3 rounded-2xl bg-zinc-950 p-3 text-white shadow-2xl sm:p-4 lg:grid-cols-[1fr_320px]">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-violet-700/70 via-zinc-900 to-zinc-900 ring-2 ring-emerald-400/70">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-white/15 text-2xl font-semibold backdrop-blur sm:size-24">MC</span>
            </div>
            <div className="absolute top-3 left-3 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
                </span>
                REC
              </span>
              <span className="rounded-full bg-black/50 px-2.5 py-1 tabular-nums backdrop-blur">00:12:48</span>
            </div>
            <div className="absolute top-3 right-3 flex items-end gap-0.5 rounded-md bg-black/50 px-1.5 py-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.span key={i} className="w-0.5 rounded-full bg-emerald-400" animate={{ height: [4, 14, 6, 11, 4] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }} />
              ))}
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 text-xs backdrop-blur">
              <Mic className="size-3.5 text-zinc-200" />
              <span className="font-medium">Marina Costa</span>
              <span className="text-zinc-400">· anfitriã</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {MINIATURAS.map((p) => {
              const mudo = p.nome === 'Você' ? !micOn : p.mudo
              const cam = p.nome === 'Você' ? camOn : true
              return (
                <div key={p.nome} className={cn('relative aspect-video overflow-hidden rounded-lg bg-zinc-900', cam && `bg-gradient-to-br ${p.tone}`)}>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{p.iniciais}</span>
                  <span className="absolute bottom-1 left-1 flex items-center gap-1 rounded bg-black/50 px-1 py-0.5 text-[10px]">
                    {mudo ? <MicOff className="size-2.5 text-rose-400" /> : <Mic className="size-2.5" />}
                    <span className="hidden sm:inline">{p.nome}</span>
                  </span>
                  {!cam && <VideoOff className="absolute top-1 right-1 size-3 text-zinc-400" />}
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <Controle rotulo={micOn ? 'Desativar microfone' : 'Ativar microfone'} ativo={!micOn} onClick={() => setMicOn((v) => !v)}>
              {micOn ? <Mic /> : <MicOff />} Microfone
            </Controle>
            <Controle rotulo={camOn ? 'Desligar câmera' : 'Ligar câmera'} ativo={!camOn} onClick={() => setCamOn((v) => !v)}>
              {camOn ? <Video /> : <VideoOff />} Câmera
            </Controle>
            <Controle rotulo="Compartilhar tela">
              <MonitorUp /> Compartilhar
            </Controle>
            <button type="button" className="flex h-10 items-center gap-2 rounded-full bg-rose-500 px-4 text-xs font-medium transition-colors hover:bg-rose-400">
              <PhoneOff className="size-4" /> Sair
            </button>
          </div>
        </div>

        <aside className="flex h-[420px] flex-col rounded-xl bg-zinc-900 lg:h-auto lg:min-h-0">
          <div className="flex gap-1 border-b border-zinc-800 p-2">
            {(['chat', 'pessoas'] as const).map((a) => (
              <button key={a} type="button" onClick={() => setAba(a)} aria-pressed={aba === a} className={cn('flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors', aba === a ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white')}>
                {a === 'chat' ? (
                  'Chat'
                ) : (
                  <>
                    <Users className="size-3.5" /> Pessoas ({pessoas.length})
                  </>
                )}
              </button>
            ))}
          </div>
          {aba === 'chat' ? (
            <>
              <ul className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3 text-sm">
                {mensagens.map((m) => (
                  <li key={m.id} className={cn('flex gap-2.5', m.voce && 'flex-row-reverse text-right')}>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-semibold">{m.iniciais}</span>
                    <div className="max-w-[85%] min-w-0">
                      <p className="text-[11px] text-zinc-400">
                        {m.autor} · {m.hora}
                      </p>
                      <p className={cn('mt-1 inline-block rounded-2xl px-3 py-1.5 text-left leading-snug', m.voce ? 'rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm bg-zinc-800 text-zinc-100')}>{m.texto}</p>
                      {m.reacao && <span className="mt-1 block text-[11px] text-zinc-400">{m.reacao}</span>}
                    </div>
                  </li>
                ))}
              </ul>
              <form onSubmit={enviar} className="border-t border-zinc-800 p-2">
                <div className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2">
                  <button type="button" aria-label="Inserir emoji" className="p-1 text-zinc-400 hover:text-white">
                    <Smile className="size-4" />
                  </button>
                  <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Mensagem para todos" aria-label="Mensagem" className="h-9 min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none" />
                  <button type="button" aria-label="Anexar arquivo" className="p-1 text-zinc-400 hover:text-white">
                    <Paperclip className="size-4" />
                  </button>
                  <button type="submit" aria-label="Enviar mensagem" disabled={!texto.trim()} className="rounded-md bg-primary p-1.5 text-primary-foreground transition-opacity disabled:opacity-40">
                    <Send className="size-3.5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2 text-sm">
              {pessoas.map((p) => (
                <li key={p.nome} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-zinc-800">
                  <span className="flex size-7 items-center justify-center rounded-full bg-zinc-700 text-[10px] font-semibold">{p.iniciais}</span>
                  <span className="flex-1 truncate">{p.nome}</span>
                  {p.papel && <span className="text-[11px] text-zinc-400">{p.papel}</span>}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  )
}
