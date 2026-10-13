'use client'

import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const FUNDADORES = [
  { iniciais: 'AL', nome: 'Ana Luíza Prates', cargo: 'CEO · ex-gerente de loja', gradiente: 'from-amber-400 via-rose-400 to-fuchsia-500', giro: -4, deslocamento: 'lg:translate-y-0' },
  { iniciais: 'BR', nome: 'Bruno Ramalho', cargo: 'CTO · ex-engenheiro de pagamentos', gradiente: 'from-sky-400 via-indigo-400 to-violet-500', giro: 3, deslocamento: 'lg:translate-y-10' },
] as const

const MARCOS = [
  { ano: '2019', titulo: 'A planilha', texto: 'Ana controla 3 lojas da família em uma planilha de 41 abas.' },
  { ano: '2020', titulo: 'O primeiro código', texto: 'Bruno escreve o protótipo em finais de semana, em Recife.' },
  { ano: '2022', titulo: '100 lojas', texto: 'Sem investimento, só indicação entre lojistas.' },
  { ano: '2026', titulo: 'Hoje', texto: '8.400 lojas, 62 pessoas e escritórios em Recife e Curitiba.' },
] as const

export default function HistoriaDosFundadores() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex justify-center gap-4 sm:gap-6">
            {FUNDADORES.map((f, i) => (
              <motion.figure
                key={f.nome}
                className={cn('w-40 sm:w-52', f.deslocamento)}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: f.giro }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 120, damping: 16 }}
              >
                <div className="rounded-2xl border bg-card p-2 shadow-lg">
                  <div className={cn('relative flex aspect-[3/4] items-end overflow-hidden rounded-xl bg-gradient-to-br p-4', f.gradiente)}>
                    <svg viewBox="0 0 100 120" className="absolute inset-x-0 bottom-0 h-4/5 w-full text-white/25" aria-hidden>
                      <circle cx="50" cy="42" r="22" fill="currentColor" />
                      <path d="M10 120 C 12 82, 88 82, 90 120 Z" fill="currentColor" />
                    </svg>
                    <span className="relative text-4xl font-semibold tracking-tight text-white/90">{f.iniciais}</span>
                  </div>
                  <figcaption className="px-1 pt-3 pb-1">
                    <p className="text-sm font-medium">{f.nome}</p>
                    <p className="text-xs text-muted-foreground">{f.cargo}</p>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>

          <div>
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Nossa história</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Começou numa loja de bairro, não numa sala de reunião</h2>
            <blockquote className="relative mt-8 border-l-2 border-primary pl-6">
              <Quote className="absolute -top-1 -left-3 size-5 bg-background text-primary" />
              <p className="text-xl leading-relaxed text-balance">
                “A gente não queria criar mais um sistema. Queria devolver ao lojista as duas horas por dia que ele perdia fechando o caixa.”
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">Ana Luíza e Bruno, em carta aos primeiros clientes</footer>
            </blockquote>
          </div>
        </div>

        <div className="relative mt-20">
          <div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-border lg:block" />
          <motion.div
            aria-hidden
            className="absolute top-[7px] left-0 hidden h-px origin-left bg-primary lg:block"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MARCOS.map((m, i) => {
            const ultimo = i === MARCOS.length - 1
            return (
              <li key={m.ano} className="relative">
                <span className={cn('relative flex size-[15px] items-center justify-center rounded-full border-2 bg-background', ultimo ? 'border-primary' : 'border-border')}>
                  {ultimo && <span className="size-1.5 animate-pulse rounded-full bg-primary" />}
                </span>
                <p className="mt-4 font-mono text-xs text-muted-foreground">{m.ano}</p>
                <p className="mt-1 font-medium">{m.titulo}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.texto}</p>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </section>
  )
}
