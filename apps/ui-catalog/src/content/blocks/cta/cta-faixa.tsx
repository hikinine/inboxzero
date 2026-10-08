'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CtaFaixa() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-primary px-8 py-14 text-primary-foreground sm:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Comece hoje. Veja resultado esta semana.</h2>
            <p className="mt-3 max-w-lg text-primary-foreground/80">Conecte seu WhatsApp em 5 minutos. Sem cartão, sem contrato, com onboarding humano.</p>
          </div>
          <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="seu@email.com" className="h-10 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50" />
            <Button type="submit" variant="secondary" size="lg" className="shrink-0">
              Criar conta <ArrowRight data-icon="inline-end" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
