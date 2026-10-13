'use client'

import { useEffect, useState } from 'react'
import { Check, CircleAlert, Loader } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

// "Shield Security Scan": verificação de segurança da conta. Um feixe varre o escudo de cima a baixo (recortado
// pelo próprio contorno via clipPath) enquanto a porcentagem sobe e os itens da lista são checados um a um; uma
// senha fraca acende em âmbar, é corrigida, e no fim o escudo fica verde com o check desenhado.
const ITEMS = [
  { title: 'Senhas', ok: '12 senhas fortes', warn: '1 senha fraca' },
  { title: 'Dispositivos', ok: '3 dispositivos confiáveis' },
  { title: 'Permissões da equipe', ok: '8 usuários revisados' },
  { title: 'Backups', ok: 'Último há 2 horas' },
  { title: 'Login em 2 etapas', ok: 'Ativo para todos' },
] as const
const SHIELD = 'M 80 8 L 146 32 V 92 C 146 138 116 168 80 184 C 44 168 14 138 14 92 V 32 Z'
const SCAN_END = 17
const FIXING = 18
const FIXED = 20
const TOTAL = 30

export default function ShieldSecurityScan() {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % TOTAL), 340)
    return () => clearInterval(id)
  }, [])
  const status = (k: number) => {
    const s = 2 + k * 3
    if (t < s) return 'todo'
    if (t < s + 3) return 'scan'
    if (k === 0 && t < FIXED) return t >= FIXING ? 'fixing' : 'warn'
    return 'ok'
  }
  const secure = t >= FIXED + 1
  const scanning = t < FIXED
  const pct = Math.round(Math.min(t / SCAN_END, 1) * 100)

  return (
    <div className="flex h-[320px] w-[460px] items-center gap-5 rounded-2xl border bg-card p-5 text-foreground shadow-sm">
      <div className="relative shrink-0">
        <svg viewBox="0 0 160 192" className="w-[150px]" aria-hidden>
          <defs>
            <clipPath id="sss-clip">
              <path d={SHIELD} />
            </clipPath>
            <linearGradient id="sss-beam" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgb(14 165 233)" stopOpacity="0" />
              <stop offset="0.85" stopColor="rgb(14 165 233)" stopOpacity="0.35" />
              <stop offset="1" stopColor="rgb(14 165 233)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d={SHIELD} className={cn('transition-colors duration-500', secure ? 'fill-emerald-500/15' : 'fill-muted')} />
          <g clipPath="url(#sss-clip)">
            {/* grade interna */}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={i} x1="0" x2="160" y1={20 + i * 20} y2={20 + i * 20} stroke="var(--border)" strokeWidth="1" />
            ))}
            {scanning && (
              <motion.g initial={{ y: -60 }} animate={{ y: [-60, 190] }} transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}>
                <rect x="0" y="0" width="160" height="50" fill="url(#sss-beam)" />
                <rect x="0" y="49" width="160" height="2" fill="rgb(14 165 233)" />
              </motion.g>
            )}
          </g>
          <path d={SHIELD} fill="none" strokeWidth="4" strokeLinejoin="round" className={cn('transition-colors duration-500', secure ? 'stroke-emerald-500' : t >= 5 && t < FIXED ? 'stroke-amber-500' : 'stroke-sky-500')} />
          {secure && (
            <motion.path d="M 52 96 L 72 116 L 110 76" fill="none" className="stroke-emerald-500" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} />
          )}
        </svg>
        {!secure && (
          <span className="absolute inset-x-0 top-[78px] text-center text-2xl font-bold tabular-nums">
            {pct}
            <span className="text-sm text-muted-foreground">%</span>
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={secure ? 'secure' : 'scan'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <p className="text-sm font-semibold">{secure ? 'Conta protegida' : 'Verificando segurança…'}</p>
            <p className="text-[11px] text-muted-foreground">{secure ? 'Nenhum risco encontrado' : 'Isso leva só alguns segundos'}</p>
          </motion.div>
        </AnimatePresence>
        <ul className="mt-3 space-y-1.5">
          {ITEMS.map((it, k) => {
            const st = status(k)
            return (
              <li key={it.title} className={cn('flex items-center gap-2.5 rounded-lg border px-2.5 py-1 transition-colors', st === 'warn' || st === 'fixing' ? 'border-amber-500/50 bg-amber-500/10' : 'border-transparent')}>
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full transition-colors',
                    st === 'ok' ? 'bg-emerald-500 text-white' : st === 'warn' ? 'bg-amber-500 text-white' : st === 'todo' ? 'bg-muted' : 'text-sky-500',
                  )}
                >
                  {st === 'ok' && <Check className="size-3" strokeWidth={3} />}
                  {st === 'warn' && <CircleAlert className="size-3" />}
                  {(st === 'scan' || st === 'fixing') && (
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}>
                      <Loader className={cn('size-3.5', st === 'fixing' && 'text-amber-500')} />
                    </motion.span>
                  )}
                </span>
                <div className="min-w-0">
                  <p className={cn('text-xs font-medium', st === 'todo' && 'text-muted-foreground')}>{it.title}</p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {st === 'todo' ? 'Na fila' : st === 'scan' ? 'Analisando…' : st === 'fixing' ? 'Corrigindo: forçando troca de senha…' : st === 'warn' && 'warn' in it ? it.warn : it.ok}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
