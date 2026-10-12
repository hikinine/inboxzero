'use client'

import { ArrowUpRight, Linkedin, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const LEADERS = [
  { name: 'Mariana Duarte', role: 'CEO', initials: 'MD', tone: 'from-violet-500 to-fuchsia-500', since: 'Desde 2019', bio: 'Fundou a empresa depois de dez anos liderando operações de atendimento no varejo. Obcecada por tempo de resposta.' },
  { name: 'Rafael Nogueira', role: 'CTO', initials: 'RN', tone: 'from-sky-500 to-cyan-400', since: 'Desde 2019', bio: 'Engenheiro de infraestrutura, ex-Nubank. Cuida para que 38 milhões de mensagens por mês cheguem em menos de dois segundos.' },
  { name: 'Beatriz Carvalho', role: 'Head de Produto', initials: 'BC', tone: 'from-emerald-500 to-lime-400', since: 'Desde 2021', bio: 'Veio do iFood, onde liderou o produto de suporte ao entregador. Conversa com cinco clientes por semana, sem exceção.' },
  { name: 'Diego Albuquerque', role: 'Head de Vendas', initials: 'DA', tone: 'from-amber-500 to-orange-500', since: 'Desde 2022', bio: 'Montou o time comercial do zero até 2.400 clientes. Acredita que demo boa é a que termina com o cliente usando o produto.' },
]

export default function EquipeEmListaComBio() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Liderança</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Quem toma as decisões</h2>
          <p className="mt-3 text-muted-foreground">Gente que já esteve do outro lado do balcão. Sem camadas: quem decide é quem fala com você.</p>
          <Button variant="outline" className="mt-6">
            Ver todas as vagas <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
        <ul className="divide-y">
          {LEADERS.map((p) => (
            <li key={p.name} className="flex flex-col gap-5 py-8 first:pt-0 last:pb-0 sm:flex-row">
              <div className={`flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.tone} text-2xl font-semibold text-white`}>{p.initials}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <Badge variant="outline">{p.role}</Badge>
                  <span className="text-xs text-muted-foreground">{p.since}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
                <div className="mt-3 flex items-center gap-1">
                  <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={`LinkedIn de ${p.name}`} className="text-muted-foreground hover:text-foreground">
                    <Linkedin />
                  </Button>
                  <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={`E-mail de ${p.name}`} className="text-muted-foreground hover:text-foreground">
                    <Mail />
                  </Button>
                  <a href="#" className="ml-auto inline-flex items-center gap-1 text-sm font-medium hover:underline">
                    Perfil completo <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
