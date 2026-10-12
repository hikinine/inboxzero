'use client'

import { useState } from 'react'
import { Angry, Check, Frown, Laugh, Meh, Smile, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface Nivel {
  v: number
  label: string
  Icon: LucideIcon
  cor: string
  fundo: string
}

const NIVEIS: Nivel[] = [
  { v: 1, label: 'Péssimo', Icon: Angry, cor: 'text-rose-500', fundo: 'bg-rose-500/10 ring-rose-500/40' },
  { v: 2, label: 'Ruim', Icon: Frown, cor: 'text-orange-500', fundo: 'bg-orange-500/10 ring-orange-500/40' },
  { v: 3, label: 'Ok', Icon: Meh, cor: 'text-amber-500', fundo: 'bg-amber-500/10 ring-amber-500/40' },
  { v: 4, label: 'Bom', Icon: Smile, cor: 'text-lime-500', fundo: 'bg-lime-500/10 ring-lime-500/40' },
  { v: 5, label: 'Excelente', Icon: Laugh, cor: 'text-emerald-500', fundo: 'bg-emerald-500/10 ring-emerald-500/40' },
]

const MOTIVOS: Record<'baixo' | 'alto', string[]> = {
  baixo: ['Demorou', 'Não resolveu', 'Resposta confusa', 'Fiquei sem retorno'],
  alto: ['Rápido', 'Educado', 'Resolveu de primeira', 'Explicou bem'],
}

const RESUMO = [
  { v: 5, qtd: 71 },
  { v: 4, qtd: 32 },
  { v: 3, qtd: 14 },
  { v: 2, qtd: 6 },
  { v: 1, qtd: 5 },
]
const TOTAL = RESUMO.reduce((a, r) => a + r.qtd, 0)
const MEDIA = (RESUMO.reduce((a, r) => a + r.v * r.qtd, 0) / TOTAL).toFixed(1).replace('.', ',')

export default function RatingEmojisEFeedback() {
  const [nota, setNota] = useState<number | null>(null)
  const [motivos, setMotivos] = useState<string[]>([])
  const [texto, setTexto] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [compacta, setCompacta] = useState(4)

  const nivel = NIVEIS.find((n) => n.v === nota)
  const chips = nota === null ? [] : MOTIVOS[nota <= 3 ? 'baixo' : 'alto']

  const reiniciar = () => {
    setNota(null)
    setMotivos([])
    setTexto('')
    setEnviado(false)
  }

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Carinhas com motivos e comentário</p>
        <div className="rounded-xl border bg-card p-5">
          {enviado ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <Check className="size-5" />
              </span>
              <p className="text-sm font-medium">Obrigado pelo retorno!</p>
              <p className="text-xs text-muted-foreground">Sua avaliação ajuda o time de atendimento a melhorar.</p>
              <Button variant="link" size="xs" onClick={reiniciar}>
                Avaliar de novo
              </Button>
            </div>
          ) : (
            <>
              <p className="text-center text-sm font-medium">Como foi o atendimento de hoje?</p>
              <div className="mt-4 flex justify-center gap-2" role="radiogroup" aria-label="Avaliação do atendimento">
                {NIVEIS.map((n) => {
                  const ativo = nota === n.v
                  return (
                    <motion.button
                      key={n.v}
                      type="button"
                      role="radio"
                      aria-checked={ativo}
                      aria-label={n.label}
                      onClick={() => {
                        setNota(n.v)
                        setMotivos([])
                      }}
                      whileTap={{ scale: 0.85 }}
                      animate={{ scale: ativo ? 1.15 : 1, y: ativo ? -4 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className={cn('flex size-12 items-center justify-center rounded-full ring-1 ring-transparent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring', ativo ? n.fundo : 'hover:bg-muted', ativo || nota === null ? n.cor : 'text-muted-foreground/50')}
                    >
                      <n.Icon className="size-7" strokeWidth={1.75} />
                    </motion.button>
                  )
                })}
              </div>
              <p className={cn('mt-2 h-5 text-center text-xs', nivel ? nivel.cor : 'text-muted-foreground')}>{nivel ? nivel.label : 'Toque numa carinha'}</p>

              {nota !== null && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-3 border-t pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((c) => {
                      const on = motivos.includes(c)
                      return (
                        <button key={c} type="button" aria-pressed={on} onClick={() => setMotivos((m) => (on ? m.filter((x) => x !== c) : [...m, c]))} className={cn('rounded-full border px-2.5 py-1 text-xs transition-colors', on ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted')}>
                          {c}
                        </button>
                      )
                    })}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rt-comentario" className="text-xs text-muted-foreground">
                      Quer contar mais? (opcional)
                    </Label>
                    <Textarea id="rt-comentario" rows={2} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={nota <= 3 ? 'O que poderia ter sido melhor?' : 'O que mais gostou?'} />
                  </div>
                  <Button className="w-full" onClick={() => setEnviado(true)}>
                    Enviar avaliação
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Escala 1 a 5 (e-mail)</p>
          <div className="flex items-center gap-2 rounded-lg border bg-card p-3">
            <Frown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="flex flex-1 gap-1" role="radiogroup" aria-label="Nota">
              {[1, 2, 3, 4, 5].map((v) => (
                <button key={v} type="button" role="radio" aria-checked={compacta === v} aria-label={`Nota ${v}`} onClick={() => setCompacta(v)} className={cn('h-8 flex-1 rounded-md border text-xs font-medium tabular-nums transition-colors', compacta === v ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted')}>
                  {v}
                </button>
              ))}
            </div>
            <Laugh className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Resumo das respostas</p>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="text-center">
              <div className="text-2xl font-semibold tabular-nums">{MEDIA}</div>
              <div className="text-[10px] text-muted-foreground">{TOTAL} respostas</div>
            </div>
            <div className="flex flex-1 items-end justify-between gap-1">
              {RESUMO.slice()
                .reverse()
                .map((r) => {
                  const n = NIVEIS[r.v - 1]!
                  return (
                    <div key={r.v} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-[10px] text-muted-foreground tabular-nums">{r.qtd}</span>
                      <span className="flex h-10 w-full items-end rounded-sm bg-muted">
                        <span className={cn('block w-full rounded-sm', n.cor.replace('text-', 'bg-'))} style={{ height: `${(r.qtd / TOTAL) * 100 * 1.6}%` }} />
                      </span>
                      <n.Icon className={cn('size-3.5', n.cor)} aria-label={n.label} />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
