'use client'

import { useEffect, useState } from 'react'
import { CalendarCheck, CalendarPlus, Clock, MapPin, Stethoscope } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// "Scheduling Bot Chat": bot de agendamento de clínica. Ele oferece uma faixa de dias (o dia escolhido acende), depois
// os horários livres (os ocupados aparecem riscados); um cursor translúcido toca 14:00, a escolha vira mensagem do
// paciente e o bot confirma com um card de consulta e botão "Adicionar à agenda". Loop.
const DAYS = [
  { wd: 'Seg', d: 14 },
  { wd: 'Ter', d: 15 },
  { wd: 'Qua', d: 16 },
  { wd: 'Qui', d: 17 },
  { wd: 'Sex', d: 18 },
] as const
const SLOTS = [
  { t: '09:00', busy: true },
  { t: '10:30', busy: false },
  { t: '14:00', busy: false },
  { t: '15:30', busy: true },
  { t: '17:00', busy: false },
  { t: '18:30', busy: false },
] as const
const DAY = 1
const SLOT = 2
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export default function SchedulingBotChat() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timeline: Array<[number, number]> = [
      [0, 400],
      [1, 900], // pergunta + dias
      [2, 700], // dia selecionado
      [3, 900], // horários
      [4, 600], // cursor no 14:00
      [5, 700], // selecionado
      [6, 800], // resposta paciente
      [7, 3200], // confirmação
    ]
    const run = async () => {
      while (!cancelled) {
        for (const [s, ms] of timeline) {
          if (cancelled) return
          setStep(s)
          await sleep(ms)
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }

  return (
    <div className="flex h-[440px] w-[350px] flex-col overflow-hidden rounded-2xl border bg-card text-foreground shadow-lg">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-sky-500/15">
          <Stethoscope className="size-4 text-sky-600 dark:text-sky-400" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">Clínica Sorriso</div>
          <div className="text-[10px] text-muted-foreground">assistente de agendamento</div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-end gap-2.5 overflow-hidden p-3 text-[12px]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div key="q" {...fade} className="rounded-xl rounded-tl-sm bg-muted px-3 py-2">
              Vamos marcar sua avaliação! Qual dia fica melhor?
              <div className="mt-2 grid grid-cols-5 gap-1">
                {DAYS.map((d, i) => {
                  const on = step >= 2 && i === DAY
                  return (
                    <motion.span
                      key={d.d}
                      className={`flex flex-col items-center rounded-lg border py-1 leading-tight transition-colors ${on ? 'border-primary bg-primary text-primary-foreground' : 'bg-card'}`}
                      animate={{ scale: on ? [1, 1.1, 1] : 1 }}
                    >
                      <span className={`text-[9px] ${on ? '' : 'text-muted-foreground'}`}>{d.wd}</span>
                      <span className="text-[13px] font-semibold">{d.d}</span>
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div key="slots" {...fade} className="rounded-xl rounded-tl-sm bg-muted px-3 py-2">
              Horários livres na terça:
              <div className="relative mt-2 grid grid-cols-3 gap-1">
                {SLOTS.map((s, i) => {
                  const on = step >= 5 && i === SLOT
                  return (
                    <motion.span
                      key={s.t}
                      className={`flex items-center justify-center gap-1 rounded-md border py-1 text-[11px] tabular-nums transition-colors ${
                        s.busy ? 'bg-transparent text-muted-foreground line-through opacity-50' : on ? 'border-emerald-500 bg-emerald-500 text-white' : 'bg-card'
                      }`}
                      animate={{ scale: on ? [1, 1.12, 1] : 1 }}
                    >
                      <Clock className="size-3" />
                      {s.t}
                    </motion.span>
                  )
                })}
                {step === 4 && (
                  <motion.span
                    className="pointer-events-none absolute size-6 rounded-full border-2 border-foreground/40 bg-foreground/15"
                    initial={{ left: '80%', top: 40, opacity: 0 }}
                    animate={{ left: '42%', top: 6, opacity: 1, scale: [1, 1, 0.8] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )}
              </div>
            </motion.div>
          )}
          {step >= 6 && (
            <motion.div key="a" {...fade} className="self-end rounded-xl rounded-br-sm bg-primary px-3 py-1.5 text-primary-foreground">
              Terça, 15/10 às 14:00
            </motion.div>
          )}
          {step >= 7 && (
            <motion.div key="ok" {...fade} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                <CalendarCheck className="size-4" /> Consulta confirmada
              </div>
              <div className="space-y-1 px-3 py-2 text-[11px]">
                <div className="font-medium">Avaliação odontológica · Dra. Camila Reis</div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-3" /> ter, 15 de outubro · 14:00 – 14:40
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="size-3" /> Av. Paulista, 1.578 · sala 902
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 border-t py-1.5 text-[11px] font-medium text-primary">
                <CalendarPlus className="size-3.5" /> Adicionar à agenda
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
