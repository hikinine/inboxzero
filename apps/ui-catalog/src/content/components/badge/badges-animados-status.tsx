'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Bell, Check, Loader, Radio, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Ponto({ cor }: { cor: string }) {
  return (
    <span className="relative flex size-2">
      <span className={cn('absolute inline-flex size-full animate-ping rounded-full opacity-75', cor)} />
      <span className={cn('relative inline-flex size-2 rounded-full', cor)} />
    </span>
  )
}

const SERVICOS = [
  { nome: 'API', status: 'Operacional', cor: 'bg-emerald-500', texto: 'text-emerald-700 dark:text-emerald-400', fundo: 'bg-emerald-500/10 border-emerald-500/20' },
  { nome: 'Pagamentos', status: 'Instável', cor: 'bg-amber-500', texto: 'text-amber-700 dark:text-amber-400', fundo: 'bg-amber-500/10 border-amber-500/20' },
  { nome: 'E-mails', status: 'Fora do ar', cor: 'bg-rose-500', texto: 'text-rose-700 dark:text-rose-400', fundo: 'bg-rose-500/10 border-rose-500/20' },
] as const

function Numero({ valor }: { valor: number }) {
  return (
    <span className="relative inline-flex h-4 min-w-3 justify-center overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={valor}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="leading-4"
        >
          {valor > 99 ? '99+' : valor}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const ETAPAS = [
  { label: 'Na fila', Icon: Loader, cls: 'bg-muted text-muted-foreground', girar: false },
  { label: 'Processando', Icon: Loader, cls: 'bg-sky-500/10 text-sky-700 dark:text-sky-400', girar: true },
  { label: 'Concluído', Icon: Check, cls: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400', girar: false },
] as const

export default function BadgesAnimadosStatus() {
  const [notificacoes, setNotificacoes] = useState(3)
  const [pedidos, setPedidos] = useState(18)
  const [etapa, setEtapa] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPedidos((p) => p + 1), 2400)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setEtapa((e) => (e + 1) % ETAPAS.length), 1800)
    return () => clearInterval(t)
  }, [])

  const atual = ETAPAS[etapa]

  return (
    <div className="w-full max-w-md space-y-3">
      <Secao title="Ponto pulsando">
        <div className="flex flex-wrap gap-2">
          {SERVICOS.map((s) => (
            <span key={s.nome} className={cn('inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium', s.fundo, s.texto)}>
              <Ponto cor={s.cor} />
              {s.nome} · {s.status}
            </span>
          ))}
          <Badge variant="destructive" className="gap-1.5 uppercase tracking-wider">
            <Radio className="size-3 animate-pulse" /> Ao vivo
          </Badge>
        </div>
      </Secao>

      <Secao title="Contador que incrementa">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Button variant="outline" size="icon" aria-label="Notificações" onClick={() => setNotificacoes((n) => n + 1)}>
              <Bell />
            </Button>
            <motion.span
              key={notificacoes}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 600, damping: 12 }}
              className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-white ring-2 ring-background"
            >
              <Numero valor={notificacoes} />
            </motion.span>
          </div>
          <Badge variant="secondary" className="h-6 gap-1.5 px-2.5">
            <ShoppingBag className="size-3.5" />
            <Numero valor={pedidos} /> pedidos hoje
          </Badge>
          <Button size="xs" variant="ghost" onClick={() => setNotificacoes(0)}>
            Zerar
          </Button>
        </div>
      </Secao>

      <Secao title="Status que muda de estado">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Nota fiscal #4821</span>
          <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 35 }} className={cn('inline-flex items-center gap-1.5 overflow-hidden rounded-md px-2 py-0.5 text-xs font-medium', atual.cls)}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={atual.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-1.5">
                <atual.Icon className={cn('size-3', atual.girar && 'animate-spin')} />
                {atual.label}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </div>
      </Secao>
    </div>
  )
}

function Secao({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 text-xs font-medium text-muted-foreground">{title}</div>
      {children}
    </div>
  )
}
