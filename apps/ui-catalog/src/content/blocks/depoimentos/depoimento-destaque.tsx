'use client'

import { Quote } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function DepoimentoDestaque() {
  return (
    <section className="w-full px-6 py-24">
      <figure className="mx-auto max-w-3xl text-center">
        <Quote className="mx-auto size-8 text-muted-foreground/50" />
        <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
          “Em duas semanas o time parou de perder lead no WhatsApp. Foi a ferramenta mais rápida de adotar que já vi — e eu já vi muitas.”
        </blockquote>
        <figcaption className="mt-8 flex items-center justify-center gap-3">
          <Avatar>
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <div className="text-left text-sm">
            <div className="font-medium">Carla Mendes</div>
            <div className="text-muted-foreground">Diretora Comercial · Nuvem Fit</div>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
