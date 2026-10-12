'use client'

import { useState } from 'react'
import { Check, Clock, Globe, Video } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const FUSOS = [
  { id: 'brasilia', label: 'Brasília (GMT-3)', offset: -3 },
  { id: 'manaus', label: 'Manaus (GMT-4)', offset: -4 },
  { id: 'lisboa', label: 'Lisboa (GMT+1)', offset: 1 },
  { id: 'nova-york', label: 'Nova York (GMT-4)', offset: -4 },
  { id: 'londres', label: 'Londres (GMT+1)', offset: 1 },
]
const BASE_OFFSET = -3
const DURACOES = [15, 30, 60] as const

// horários livres do anfitrião, em minutos desde 00:00 (horário de Brasília)
const LIVRES = [540, 570, 600, 630, 660, 840, 870, 900, 960, 990, 1020]

const DIAS = [
  { id: '13', dow: 'seg', nome: 'Segunda', dia: 13 },
  { id: '14', dow: 'ter', nome: 'Terça', dia: 14 },
  { id: '15', dow: 'qua', nome: 'Quarta', dia: 15 },
  { id: '16', dow: 'qui', nome: 'Quinta', dia: 16 },
  { id: '17', dow: 'sex', nome: 'Sexta', dia: 17 },
]

function toHHMM(min: number) {
  const m = ((min % 1440) + 1440) % 1440
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

// um slot só vale se todos os blocos de 30 min que a duração ocupa estiverem livres
function slotsPara(duracao: number): number[] {
  const livres = new Set(LIVRES)
  const blocos = Math.max(1, Math.ceil(duracao / 30))
  return LIVRES.filter((s) => Array.from({ length: blocos }, (_, i) => s + i * 30).every((b) => livres.has(b)))
}

export default function AgendaComFusoHorarioEDuracao() {
  const [fuso, setFuso] = useState('brasilia')
  const [duracao, setDuracao] = useState<number>(30)
  const [dia, setDia] = useState('15')
  const [slot, setSlot] = useState<number | null>(600)
  const [ok, setOk] = useState(false)

  const tz = FUSOS.find((f) => f.id === fuso) ?? FUSOS[0]!
  const shift = (tz.offset - BASE_OFFSET) * 60
  const slots = slotsPara(duracao)
  const diaSel = DIAS.find((d) => d.id === dia) ?? DIAS[0]!
  const valido = slot !== null && slots.includes(slot)
  const horaLabel = slot !== null ? `${toHHMM(slot + shift)}–${toHHMM(slot + shift + duracao)}` : ''

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Agende uma conversa</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Escolha duração, fuso e horário</h2>
          <p className="mt-3 text-muted-foreground">Os horários se ajustam ao seu fuso automaticamente. Você recebe o convite com o link do Meet.</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-2xl border bg-card lg:grid-cols-[300px_1fr]">
          <aside className="border-b bg-muted/30 p-6 lg:border-r lg:border-b-0">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">Thiago Martins</div>
                <div className="text-xs text-muted-foreground">Consultor de implantação</div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Duração</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {DURACOES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={duracao === d}
                    onClick={() => {
                      setDuracao(d)
                      setOk(false)
                    }}
                    className={cn('rounded-lg border py-2 text-sm font-medium tabular-nums transition-colors', duracao === d ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:bg-muted')}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="agenda-fuso" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Fuso horário
              </label>
              <div className="mt-2 flex items-center gap-2">
                <Globe className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <NativeSelect
                  id="agenda-fuso"
                  value={fuso}
                  onChange={(e) => {
                    setFuso(e.target.value)
                    setOk(false)
                  }}
                  className="w-full"
                >
                  {FUSOS.map((f) => (
                    <NativeSelectOption key={f.id} value={f.id}>
                      {f.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4" /> {duracao} minutos
              </li>
              <li className="flex items-center gap-2">
                <Video className="size-4" /> Google Meet
              </li>
            </ul>
          </aside>

          <div className="p-6">
            {ok ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">Confirmado!</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {diaSel.nome}, {diaSel.dia} de outubro · {horaLabel}
                </p>
                <p className="text-xs text-muted-foreground">
                  {duracao} min · {tz.label} · convite enviado para o seu e-mail
                </p>
                <button type="button" className="mt-5 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground" onClick={() => setOk(false)}>
                  Escolher outro horário
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {DIAS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      aria-pressed={dia === d.id}
                      onClick={() => setDia(d.id)}
                      className={cn('flex min-w-16 flex-col items-center rounded-xl border px-3 py-2 transition-colors', dia === d.id ? 'border-primary bg-primary/5 text-foreground' : 'text-muted-foreground hover:bg-muted')}
                    >
                      <span className="text-[11px] uppercase">{d.dow}</span>
                      <span className="text-lg font-semibold tabular-nums">{d.dia}</span>
                      <span className="text-[10px]">out</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">
                    {diaSel.nome}, {diaSel.dia} de outubro
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {slots.length} horários · {tz.label}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((s) => {
                    const sel = slot === s
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={sel}
                        onClick={() => setSlot(s)}
                        className={cn('rounded-lg border px-2 py-2 text-sm tabular-nums transition-colors', sel ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50 hover:bg-muted')}
                      >
                        {toHHMM(s + shift)}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 rounded-lg border bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm">
                    <div className="text-xs text-muted-foreground">Resumo</div>
                    <div className="font-medium">{valido ? `${diaSel.dow}, ${diaSel.dia} out · ${horaLabel} (${tz.label})` : 'Escolha um horário disponível'}</div>
                  </div>
                  <Button disabled={!valido} onClick={() => setOk(true)}>
                    Confirmar
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
