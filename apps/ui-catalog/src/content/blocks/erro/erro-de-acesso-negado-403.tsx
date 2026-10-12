'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRightLeft, Check, Lock, ShieldAlert } from 'lucide-react'
import { motion } from 'motion/react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ErroDeAcessoNegado403() {
  const [pedido, setPedido] = useState(false)

  return (
    <section className="flex w-full min-h-[560px] items-center justify-center px-6 py-16">
      <div className="grid w-full max-w-4xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative mx-auto flex size-56 items-center justify-center sm:size-64" aria-hidden>
          <motion.span className="absolute inset-0 rounded-full border border-dashed border-muted-foreground/30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
          <span className="absolute inset-6 rounded-full bg-muted/60" />
          <span className="absolute inset-12 rounded-full bg-muted" />
          <motion.span className="relative flex size-20 items-center justify-center rounded-2xl bg-background shadow-lg ring-1 ring-foreground/10" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <Lock className="size-9" />
          </motion.span>
          <span className="absolute top-8 right-6 flex size-8 items-center justify-center rounded-full bg-rose-500 text-white shadow">
            <ShieldAlert className="size-4" />
          </span>
        </div>

        <div>
          <Badge variant="destructive">Erro 403</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Você não tem acesso a esta área</h1>
          <p className="mt-3 text-muted-foreground">
            A página <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">/financeiro/relatorios</code> é restrita a administradores do workspace. Peça acesso ou entre com outra conta.
          </p>

          <div className="mt-6 rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Lucas Moreira</p>
                <p className="truncate text-xs text-muted-foreground">lucas@nuvemfit.com.br</p>
              </div>
              <Badge variant="secondary">Atendente</Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
              <span>
                Papel necessário: <span className="font-medium text-foreground">Administrador</span>
              </span>
              <span>Workspace: Nuvem Fit</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setPedido(true)} disabled={pedido}>
              {pedido ? (
                <>
                  <Check data-icon="inline-start" /> Solicitação enviada
                </>
              ) : (
                'Solicitar acesso'
              )}
            </Button>
            <Button variant="outline">
              <ArrowRightLeft data-icon="inline-start" /> Trocar de conta
            </Button>
            <Button variant="ghost">
              <ArrowLeft data-icon="inline-start" /> Voltar
            </Button>
          </div>
          {pedido && <p className="mt-3 text-xs text-muted-foreground">Avisamos a Renata Carvalho (admin). Você recebe um e-mail assim que for liberado.</p>}
        </div>
      </div>
    </section>
  )
}
