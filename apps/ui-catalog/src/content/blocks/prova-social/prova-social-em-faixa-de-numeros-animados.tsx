'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'

const NUMEROS = [
  { valor: 2400, decimais: 0, sufixo: '+', rotulo: 'equipes atendendo', detalhe: 'em 27 estados e 12 países' },
  { valor: 38, decimais: 0, sufixo: ' mi', rotulo: 'mensagens por mês', detalhe: 'WhatsApp, Instagram e e-mail' },
  { valor: 99.98, decimais: 2, sufixo: '%', rotulo: 'de disponibilidade', detalhe: 'nos últimos 12 meses' },
  { valor: 1.7, decimais: 1, sufixo: ' s', rotulo: 'resposta média da IA', detalhe: 'medida em produção' },
]

function Contador({ valor, decimais, ativo }: { valor: number; decimais: number; ativo: boolean }) {
  const [atual, setAtual] = useState(0)
  useEffect(() => {
    if (!ativo) return
    const controls = animate(0, valor, { duration: 2.2, ease: 'easeOut', onUpdate: (v) => setAtual(v) })
    return () => controls.stop()
  }, [ativo, valor])
  return <>{atual.toLocaleString('pt-BR', { minimumFractionDigits: decimais, maximumFractionDigits: decimais })}</>
}

export default function ProvaSocialEmFaixaDeNumerosAnimados() {
  const ref = useRef<HTMLDivElement>(null)
  const emVista = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div ref={ref} className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -top-32 -right-20 size-80 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-16 size-80 rounded-full bg-background/10 blur-3xl" aria-hidden="true" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-medium uppercase tracking-wider text-background/60">Em números</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Confiança que dá para medir</h2>
          </div>
          <p className="max-w-xs text-sm text-background/60">Dados públicos da nossa status page e do relatório anual, atualizados em outubro de 2026.</p>
        </div>

        <dl className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {NUMEROS.map((n, i) => (
            <div key={n.rotulo} className="relative flex flex-col lg:px-8 lg:first:pl-0 lg:last:pr-0">
              {i > 0 && (
                <motion.span
                  className="absolute top-1 bottom-1 left-0 hidden w-px origin-top bg-background/15 lg:block"
                  initial={{ scaleY: 0 }}
                  animate={emVista ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                  aria-hidden="true"
                />
              )}
              <dd className="order-1 text-5xl font-semibold tracking-tighter tabular-nums sm:text-6xl">
                <Contador valor={n.valor} decimais={n.decimais} ativo={emVista} />
                <span className="text-2xl font-medium text-background/60 sm:text-3xl">{n.sufixo}</span>
              </dd>
              <dt className="order-2 mt-3 text-sm font-medium">{n.rotulo}</dt>
              <dd className="order-3 mt-0.5 text-xs text-background/60">{n.detalhe}</dd>
              <motion.span className="order-4 mt-5 block h-0.5 rounded-full bg-primary" initial={{ width: 0 }} animate={emVista ? { width: 48 } : { width: 0 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }} aria-hidden="true" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
