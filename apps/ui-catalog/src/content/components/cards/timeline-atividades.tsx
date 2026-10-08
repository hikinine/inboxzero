'use client'

import { CheckCircle2, FileText, Mail, MessageSquare, Phone } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const EVENTS = [
  { Icon: CheckCircle2, who: 'Ana Souza', what: 'moveu o negócio para Fechamento', when: 'há 12 min', tone: 'text-emerald-500' },
  { Icon: Phone, who: 'Bruno Rocha', what: 'ligou para Lumi Tecnologia (8 min)', when: 'há 1 h', tone: 'text-foreground' },
  { Icon: MessageSquare, who: 'IA', what: 'resumiu a conversa: cliente quer integração com ERP', when: 'há 2 h', tone: 'text-sky-500' },
  { Icon: FileText, who: 'Carla Mendes', what: 'enviou a proposta v2 (R$ 24.000)', when: 'ontem', tone: 'text-foreground' },
  { Icon: Mail, who: 'Sistema', what: 'e-mail de boas-vindas aberto 3×', when: 'ontem', tone: 'text-muted-foreground' },
]

export default function TimelineAtividades() {
  return (
    <ol className="relative w-full max-w-md space-y-6 border-l pl-6">
      {EVENTS.map((e, i) => (
        <li key={i} className="relative">
          <span className={`absolute -left-[31px] flex size-5 items-center justify-center rounded-full border bg-background ${e.tone}`}>
            <e.Icon className="size-3" />
          </span>
          <div className="flex items-start gap-3">
            <Avatar size="sm">
              <AvatarFallback>{e.who.split(' ').map((s) => s[0]).join('').slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-sm">
              <p>
                <span className="font-medium">{e.who}</span> <span className="text-muted-foreground">{e.what}</span>
              </p>
              <p className="text-xs text-muted-foreground">{e.when}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
