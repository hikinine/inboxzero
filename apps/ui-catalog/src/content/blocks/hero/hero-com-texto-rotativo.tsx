'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PALAVRAS = ['follow-ups', 'cobranças', 'agendamentos', 'propostas', 'boas-vindas']

const STATS = [
  { valor: '12 mil+', rotulo: 'automações ativas hoje' },
  { valor: '98,7%', rotulo: 'das mensagens entregues' },
  { valor: '4,9/5', rotulo: 'nota média de 1.300 avaliações' },
]

export default function HeroComTextoRotativo() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % PALAVRAS.length), 2200)
    return () => clearInterval(t)
  }, [])
  const palavra = PALAVRAS[i] ?? PALAVRAS[0]

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">Automação sem código</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Coloque seus{' '}
            <span className="relative inline-flex h-[1.1em] items-end overflow-hidden align-bottom">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={palavra}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className="inline-block text-primary"
                >
                  {palavra}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            no piloto automático.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Monte fluxos em minutos: gatilho, condição, mensagem. A Rotina cuida do resto no WhatsApp, e-mail e SMS — e avisa você só quando precisa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg">
              Criar meu primeiro fluxo <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="link">
              Ver 40 modelos prontos
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t pt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x">
          {STATS.map((s) => (
            <div key={s.rotulo} className="sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <div className="text-3xl font-semibold tabular-nums">{s.valor}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.rotulo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
