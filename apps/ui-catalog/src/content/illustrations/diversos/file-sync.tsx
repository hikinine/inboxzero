'use client'

import { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Check, Cloud, FileImage, FileSpreadsheet, FileText, FileVideo, Folder } from 'lucide-react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react'

// "File Sync": arquivos voam da pasta para a nuvem pelo arco de cima (envio) e da nuvem para a pasta pelo de baixo
// (download), cada chip seguindo o arco via offset-path. Um ciclo de 5s: 4,2s sincronizando (barra, contagem e
// porcentagem renderizadas direto de um motion value) e 0,8s de "concluído" com check na nuvem.
const PERIOD = 5
const WORK = 4.2
const UP = 'M 108 96 Q 220 18 332 96'
const DOWN = 'M 332 134 Q 220 212 108 134'

interface Flight {
  name: string
  Icon: LucideIcon
  tone: string
  delay: number
  duration: number
}
const UPLOADS: Flight[] = [
  { name: 'relatório-q1.pdf', Icon: FileText, tone: 'text-rose-500', delay: 0, duration: 1.6 },
  { name: 'logo.svg', Icon: FileImage, tone: 'text-violet-500', delay: 1.3, duration: 1.6 },
  { name: 'planilha.xlsx', Icon: FileSpreadsheet, tone: 'text-emerald-500', delay: 2.6, duration: 1.6 },
]
const DOWNLOADS: Flight[] = [
  { name: 'proposta.docx', Icon: FileText, tone: 'text-sky-500', delay: 0.5, duration: 1.8 },
  { name: 'vídeo.mp4', Icon: FileVideo, tone: 'text-amber-500', delay: 2.3, duration: 1.8 },
]

function Chip({ f, path }: { f: Flight; path: string }) {
  return (
    <motion.div
      className="absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-md border bg-card px-2 py-1 text-[10px] font-medium shadow-sm"
      style={{ offsetPath: `path("${path}")`, offsetRotate: '0deg' }}
      animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.7] }}
      transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, repeatDelay: PERIOD - f.duration, ease: 'easeInOut' }}
    >
      <f.Icon className={`size-3.5 ${f.tone}`} />
      {f.name}
    </motion.div>
  )
}

export default function FileSync() {
  const elapsed = useRef(0)
  const doneRef = useRef(false)
  const [done, setDone] = useState(false)
  const progress = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    elapsed.current += delta
    const t = (elapsed.current / 1000) % PERIOD
    progress.set(Math.min(1, t / WORK))
    const d = t >= WORK
    if (d !== doneRef.current) {
      doneRef.current = d
      setDone(d)
    }
  })

  const width = useTransform(progress, (v) => `${v * 100}%`)
  const count = useTransform(progress, (v) => `${Math.round(v * 24)} de 24 arquivos`)
  const pct = useTransform(progress, (v) => `${Math.round(v * 100)}%`)

  return (
    <div className="relative h-[260px] w-[440px] text-foreground">
      <svg viewBox="0 0 440 260" className="absolute inset-0 size-full" aria-hidden>
        <path d={UP} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 5" />
        <path d={DOWN} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 5" />
      </svg>

      <div className="absolute left-[40px] top-[81px] flex w-[68px] flex-col items-center">
        <span className="flex size-[68px] items-center justify-center rounded-2xl border bg-card shadow-sm">
          <Folder className="size-8 text-amber-500" />
        </span>
        <span className="mt-2 whitespace-nowrap text-[11px] font-medium text-muted-foreground">Meu computador</span>
      </div>
      <div className="absolute left-[332px] top-[81px] flex w-[68px] flex-col items-center">
        <span className="relative flex size-[68px] items-center justify-center rounded-2xl border bg-card shadow-sm">
          <Cloud className="size-8 text-sky-500" />
          <AnimatePresence>
            {done && (
              <motion.span
                key="ok"
                className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              >
                <Check className="size-3.5" strokeWidth={3} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="mt-2 text-[11px] font-medium text-muted-foreground">Nuvem</span>
      </div>

      {UPLOADS.map((f) => (
        <Chip key={f.name} f={f} path={UP} />
      ))}
      {DOWNLOADS.map((f) => (
        <Chip key={f.name} f={f} path={DOWN} />
      ))}

      <div className="absolute inset-x-10 bottom-5">
        <div className="mb-1.5 flex items-center justify-between text-[11px]">
          <span className={`font-medium ${done ? 'text-emerald-600 dark:text-emerald-400' : ''}`}>{done ? 'Tudo sincronizado' : 'Sincronizando…'}</span>
          <span className="tabular-nums text-muted-foreground">
            <motion.span>{count}</motion.span> · <motion.span className="font-medium text-foreground">{pct}</motion.span>
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div className={`h-full rounded-full transition-colors duration-300 ${done ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width }} />
        </div>
      </div>
    </div>
  )
}
