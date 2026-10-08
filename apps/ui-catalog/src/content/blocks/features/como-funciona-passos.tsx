'use client'

import { Link2, MessageSquare, TrendingUp } from 'lucide-react'

const STEPS = [
  { Icon: Link2, title: 'Conecte seus canais', text: 'WhatsApp, Instagram e e-mail em 5 minutos, com o número que você já usa.' },
  { Icon: MessageSquare, title: 'Deixe a IA qualificar', text: 'Ela responde dúvidas, pontua o lead e agenda. O humano entra na hora certa.' },
  { Icon: TrendingUp, title: 'Feche no CRM', text: 'Pipeline, propostas e follow-ups no mesmo lugar, com relatório por origem.' },
]

export default function ComoFuncionaPassos() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium text-muted-foreground">Como funciona</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Três passos. Nenhum consultor.</h2>
        </div>
        <ol className="relative mt-12 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" aria-hidden />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative flex flex-col items-center text-center">
              <span className="relative flex size-12 items-center justify-center rounded-full border bg-background">
                <s.Icon className="size-5" />
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{i + 1}</span>
              </span>
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
