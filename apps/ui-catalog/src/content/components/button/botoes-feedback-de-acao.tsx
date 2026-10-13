'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, AnimatePresence, motion, useMotionValue, type AnimationPlaybackControls } from 'motion/react'
import { Check, Copy, Loader, Send, Trash2, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const trocar = {
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' },
  transition: { duration: 0.18 },
}

function BotaoCopiar() {
  const [copiado, setCopiado] = useState(false)
  useEffect(() => {
    if (!copiado) return
    const t = setTimeout(() => setCopiado(false), 1800)
    return () => clearTimeout(t)
  }, [copiado])

  return (
    <div className="flex w-full items-center gap-2 rounded-lg border bg-muted/40 p-1 pl-3">
      <code className="flex-1 truncate font-mono text-xs text-muted-foreground">pix@lojadamarina.com.br</code>
      <Button size="sm" variant={copiado ? 'secondary' : 'outline'} className="w-28 overflow-hidden" onClick={() => setCopiado(true)}>
        <AnimatePresence mode="wait" initial={false}>
          {copiado ? (
            <motion.span key="ok" {...trocar} className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Check className="size-4" /> Copiado
            </motion.span>
          ) : (
            <motion.span key="copiar" {...trocar} className="inline-flex items-center gap-1.5">
              <Copy className="size-4" /> Copiar
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

type Estado = 'parado' | 'carregando' | 'sucesso'

function BotaoEnviar() {
  const [estado, setEstado] = useState<Estado>('parado')

  useEffect(() => {
    if (estado === 'carregando') {
      const t = setTimeout(() => setEstado('sucesso'), 1500)
      return () => clearTimeout(t)
    }
    if (estado === 'sucesso') {
      const t = setTimeout(() => setEstado('parado'), 2000)
      return () => clearTimeout(t)
    }
  }, [estado])

  return (
    <motion.button
      type="button"
      layout
      disabled={estado !== 'parado'}
      onClick={() => setEstado('carregando')}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-medium transition-colors disabled:cursor-default',
        estado === 'sucesso' ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground',
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {estado === 'parado' && (
          <motion.span key="p" {...trocar} className="inline-flex items-center gap-2">
            <Send className="size-4" /> Enviar orçamento
          </motion.span>
        )}
        {estado === 'carregando' && (
          <motion.span key="c" {...trocar} className="inline-flex items-center gap-2">
            <Loader className="size-4 animate-spin" /> Enviando…
          </motion.span>
        )}
        {estado === 'sucesso' && (
          <motion.span key="s" {...trocar} className="inline-flex items-center gap-2">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
              <Check className="size-4" />
            </motion.span>
            Enviado
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function BotaoSegurar() {
  const progresso = useMotionValue(0)
  const controle = useRef<AnimationPlaybackControls | null>(null)
  const [excluido, setExcluido] = useState(false)

  function iniciar() {
    if (excluido) return
    controle.current?.stop()
    controle.current = animate(progresso, 1, {
      duration: 1.4,
      ease: 'linear',
      onComplete: () => setExcluido(true),
    })
  }
  function soltar() {
    if (excluido) return
    controle.current?.stop()
    controle.current = animate(progresso, 0, { duration: 0.3, ease: 'easeOut' })
  }
  function desfazer() {
    setExcluido(false)
    progresso.set(0)
  }

  if (excluido) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Projeto “Site Padaria Trigo” excluído.</span>
        <Button size="sm" variant="ghost" onClick={desfazer}>
          <Undo2 data-icon="inline-start" /> Desfazer
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onPointerDown={iniciar}
        onPointerUp={soltar}
        onPointerLeave={soltar}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) iniciar()
        }}
        onKeyUp={soltar}
        className="relative inline-flex h-10 select-none items-center gap-2 overflow-hidden rounded-lg border border-destructive/40 px-5 text-sm font-medium text-destructive"
      >
        <motion.span aria-hidden style={{ scaleX: progresso }} className="absolute inset-0 origin-left bg-destructive/15" />
        <Trash2 className="relative size-4" />
        <span className="relative">Segure para excluir</span>
      </button>
      <span className="text-xs text-muted-foreground">Mantenha pressionado por 1,5 s</span>
    </div>
  )
}

export default function BotoesFeedbackDeAcao() {
  return (
    <div className="w-full max-w-md space-y-3">
      <Linha title="Copiar com confirmação">
        <BotaoCopiar />
      </Linha>
      <Linha title="Carregando → sucesso">
        <BotaoEnviar />
      </Linha>
      <Linha title="Confirmar segurando">
        <BotaoSegurar />
      </Linha>
    </div>
  )
}

function Linha({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 text-xs font-medium text-muted-foreground">{title}</div>
      <div className="flex min-h-12 items-center justify-center">{children}</div>
    </div>
  )
}
