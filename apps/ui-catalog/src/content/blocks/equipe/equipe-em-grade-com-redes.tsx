'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const MEMBERS = [
  { name: 'Mariana Duarte', role: 'CEO e cofundadora', initials: 'MD', tone: 'from-violet-500 to-fuchsia-500' },
  { name: 'Rafael Nogueira', role: 'CTO e cofundador', initials: 'RN', tone: 'from-sky-500 to-cyan-400' },
  { name: 'Beatriz Carvalho', role: 'Head de Produto', initials: 'BC', tone: 'from-emerald-500 to-lime-400' },
  { name: 'Thiago Moreira', role: 'Engenheiro de Plataforma', initials: 'TM', tone: 'from-amber-500 to-orange-500' },
  { name: 'Larissa Pinto', role: 'Designer de Produto', initials: 'LP', tone: 'from-rose-500 to-pink-400' },
  { name: 'Gustavo Henrique', role: 'Engenheiro de IA', initials: 'GH', tone: 'from-indigo-500 to-blue-400' },
  { name: 'Camila Ferreira', role: 'Sucesso do Cliente', initials: 'CF', tone: 'from-teal-500 to-emerald-400' },
  { name: 'Diego Albuquerque', role: 'Head de Vendas', initials: 'DA', tone: 'from-slate-500 to-zinc-400' },
]

const SOCIALS = [
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'X', Icon: Twitter },
  { label: 'GitHub', Icon: Github },
]

export default function EquipeEmGradeComRedes() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Nosso time</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">As pessoas por trás do produto</h2>
          <p className="mt-3 text-muted-foreground">Um time pequeno, sênior e distribuído entre São Paulo, Florianópolis e Recife. Todo mundo aqui já atendeu cliente de verdade.</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {MEMBERS.map((m) => (
            <li key={m.name} className="group rounded-xl border bg-card p-6 text-center transition-colors hover:border-foreground/20">
              <Avatar className="mx-auto size-20">
                <AvatarFallback className={`bg-gradient-to-br ${m.tone} text-xl font-semibold text-white`}>{m.initials}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 font-semibold">{m.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              <div className="mt-4 flex justify-center gap-1">
                {SOCIALS.map(({ label, Icon }) => (
                  <Button key={label} nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={`${label} de ${m.name}`} className="text-muted-foreground hover:text-foreground">
                    <Icon />
                  </Button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
