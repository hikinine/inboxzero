'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Camera, CircleAlert, Trash2, Upload } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Estado = 'padrao' | 'enviando' | 'enviado' | 'erro' | 'removido'
const R = 36
const C = 2 * Math.PI * R

function Anel({ progresso }: { progresso: number }) {
  return (
    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80" aria-hidden>
      <circle cx="40" cy="40" r={R} fill="none" strokeWidth="4" className="stroke-muted" />
      <circle
        cx="40"
        cy="40"
        r={R}
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-primary transition-[stroke-dashoffset] duration-100"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - progresso / 100)}
      />
    </svg>
  )
}

function Foto({ estado, progresso, grande }: { estado: Estado; progresso: number; grande?: boolean }) {
  return (
    <div className="relative">
      <Avatar className={cn(grande ? 'size-20' : 'size-12', estado === 'erro' && 'after:border-2 after:border-destructive', estado === 'removido' && 'after:border-dashed')}>
        <AvatarFallback
          className={cn(
            'font-medium',
            grande ? 'text-xl' : 'text-sm',
            estado === 'enviado' ? 'bg-gradient-to-br from-sky-400 to-indigo-600 text-white' : estado === 'removido' ? 'bg-muted' : 'bg-primary/10 text-primary',
          )}
        >
          {estado === 'removido' ? <Upload className={cn('text-muted-foreground', grande ? 'size-6' : 'size-4')} /> : 'AS'}
        </AvatarFallback>
      </Avatar>
      {estado === 'enviando' && (
        <div className={cn('absolute inset-0 flex items-center justify-center rounded-full bg-background/70 font-medium tabular-nums', grande ? 'text-xs' : 'text-[10px]')}>
          <Anel progresso={progresso} />
          {progresso}%
        </div>
      )}
      {estado === 'erro' && (
        <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-destructive text-white ring-2 ring-background">
          <CircleAlert className="size-3" />
        </span>
      )}
    </div>
  )
}

const ESTADOS: { id: Estado; label: string }[] = [
  { id: 'padrao', label: 'Padrão' },
  { id: 'enviando', label: 'Enviando' },
  { id: 'enviado', label: 'Nova foto' },
  { id: 'erro', label: 'Erro' },
  { id: 'removido', label: 'Sem foto' },
]
const EQUIPE = [
  { nome: 'Bruno Rocha', cargo: 'Vendas' },
  { nome: 'Carla Mendes', cargo: 'Suporte' },
]
const iniciais = (n: string) =>
  n
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function AvatarEditavelUpload() {
  const [estado, setEstado] = useState<Estado>('padrao')
  const [progresso, setProgresso] = useState(0)
  const [falhar, setFalhar] = useState(false)

  useEffect(() => {
    if (estado !== 'enviando') return
    const t = setInterval(() => setProgresso((p) => Math.min(100, p + 5)), 70)
    return () => clearInterval(t)
  }, [estado])

  useEffect(() => {
    if (estado !== 'enviando' || progresso < 100) return
    const t = setTimeout(() => setEstado(falhar ? 'erro' : 'enviado'), 250)
    return () => clearTimeout(t)
  }, [estado, progresso, falhar])

  function enviar(comErro: boolean) {
    setFalhar(comErro)
    setProgresso(0)
    setEstado('enviando')
  }
  const enviando = estado === 'enviando'

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <Legenda>Editável (simula o envio)</Legenda>
        <div className="flex items-center gap-5 rounded-xl border bg-card p-4">
          <div className="relative">
            <Foto estado={estado} progresso={progresso} grande />
            <label
              htmlFor="foto-perfil"
              className={cn(
                'absolute -right-1 -bottom-1 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
                enviando && 'pointer-events-none opacity-50',
              )}
            >
              <Camera className="size-3.5" />
              <span className="sr-only">Trocar foto</span>
              <input id="foto-perfil" type="file" accept="image/png,image/jpeg" className="sr-only" onChange={() => enviar(false)} />
            </label>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium">Ana Souza</div>
            <p className="text-xs text-muted-foreground">PNG ou JPG, quadrada, até 2 MB.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => enviar(false)} disabled={enviando}>
                <Upload data-icon="inline-start" /> Enviar foto
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEstado('removido')} disabled={enviando || estado === 'removido'}>
                <Trash2 data-icon="inline-start" /> Remover
              </Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => enviar(true)} disabled={enviando}>
                Simular erro
              </Button>
            </div>
            {estado === 'erro' && (
              <p className="mt-2 flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" /> Arquivo acima de 2 MB.
                <button type="button" className="underline underline-offset-2" onClick={() => enviar(false)}>
                  Tentar de novo
                </button>
              </p>
            )}
            {estado === 'enviado' && <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">Foto atualizada.</p>}
          </div>
        </div>
      </div>

      <div>
        <Legenda>Estados</Legenda>
        <div className="flex flex-wrap items-start gap-5">
          {ESTADOS.map((e) => (
            <div key={e.id} className="flex flex-col items-center gap-1.5">
              <Foto estado={e.id} progresso={62} />
              <span className="text-[11px] text-muted-foreground">{e.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Legenda>Na lista (câmera ao passar o mouse)</Legenda>
        <ul className="divide-y rounded-xl border">
          {EQUIPE.map((p) => (
            <li key={p.nome} className="flex items-center gap-3 px-3 py-2">
              <button type="button" className="group/foto relative rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50" aria-label={`Trocar foto de ${p.nome}`}>
                <Avatar size="lg">
                  <AvatarFallback>{iniciais(p.nome)}</AvatarFallback>
                </Avatar>
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover/foto:opacity-100 group-focus-visible/foto:opacity-100">
                  <Camera className="size-4" />
                </span>
              </button>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.nome}</div>
                <div className="truncate text-xs text-muted-foreground">{p.cargo}</div>
              </div>
              <Button variant="link" size="xs" className="h-auto p-0">
                Trocar
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
