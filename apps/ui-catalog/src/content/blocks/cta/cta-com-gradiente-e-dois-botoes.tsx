'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CtaComGradienteEDoisBotoes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-16 text-center text-white sm:px-16 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-sky-400/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">14 dias grátis · sem cartão</span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">Comece hoje. Veja resultado na primeira semana.</h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Importe seus contatos, conecte o WhatsApp e deixe a Rotina cuidar do follow-up. Se não gostar, exporta tudo e vai embora.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="h-11 bg-white px-6 text-neutral-900 hover:bg-white/90">
              Criar conta grátis <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/30 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <MessageCircle data-icon="inline-start" /> Falar com vendas
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/70">Suporte em português · Dados no Brasil · Cancele quando quiser</p>
        </div>
      </div>
    </section>
  )
}
