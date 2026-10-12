'use client'

import { BookOpen, Eye, Heart, Sparkles, Target, Zap } from 'lucide-react'

const VALUES = [
  { Icon: Heart, title: 'Cliente no centro', desc: 'Toda decisão de produto começa com uma conversa real. Se não resolve um problema de quem atende, não entra no roadmap.' },
  { Icon: Eye, title: 'Transparência radical', desc: 'Preço público, status page aberta e incidentes explicados sem rodeio. Confiança se constrói nos dias ruins.' },
  { Icon: Zap, title: 'Velocidade com qualidade', desc: 'Entregamos em semanas, não em trimestres. Mas nada vai para produção sem teste, revisão e plano de rollback.' },
  { Icon: Target, title: 'Donos do resultado', desc: 'Não medimos features lançadas. Medimos tempo de resposta, satisfação e receita dos nossos clientes.' },
  { Icon: BookOpen, title: 'Aprendizado contínuo', desc: 'Toda sexta tem demo interna e post-mortem sem culpados. Errar é aceitável; repetir o erro, não.' },
  { Icon: Sparkles, title: 'Simplicidade', desc: 'A melhor funcionalidade é a que ninguém precisa aprender. Removemos mais do que adicionamos.' },
]

export default function SobreComValoresEmCards() {
  return (
    <section className="w-full bg-muted/30 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nossos valores</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">O que a gente não negocia</h2>
          <p className="mt-3 text-muted-foreground">Seis princípios que orientam contratação, produto e a forma como tratamos cada cliente.</p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ Icon, title, desc }, i) => (
            <li key={title} className="rounded-xl border bg-card p-6 transition-colors hover:border-foreground/20">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
