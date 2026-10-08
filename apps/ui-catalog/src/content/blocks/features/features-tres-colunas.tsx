'use client'

import { Clock, Sparkles, Users } from 'lucide-react'

const FEATURES = [
  { Icon: Clock, title: 'Responda em segundos', text: 'Templates, respostas rápidas e IA para o primeiro contato. O lead não espera.' },
  { Icon: Users, title: 'Time no mesmo ritmo', text: 'Fila justa, transferências com contexto e notas internas. Ninguém pergunta “quem está com esse?”.' },
  { Icon: Sparkles, title: 'Insights prontos', text: 'Resumo da conversa, sentimento e próximo passo sugerido em cada card.' },
]

export default function FeaturesTresColunas() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-muted-foreground">Por que times escolhem</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Feito para quem atende de verdade</h2>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-start">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <f.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
