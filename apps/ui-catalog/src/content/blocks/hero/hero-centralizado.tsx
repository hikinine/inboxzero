'use client'

import { ArrowRight, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'

export default function HeroCentralizado() {
  return (
    <section className="w-full px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" /> Novo: automações com IA
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Venda mais conversando menos.</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Centralize WhatsApp, Instagram e e-mail num só inbox, qualifique leads com IA e feche no CRM — sem trocar de aba.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">
            Começar grátis <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline">
            <Play data-icon="inline-start" /> Ver demo de 2 min
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <AvatarGroup>
            {['AS', 'BR', 'CM', 'DL'].map((n) => (
              <Avatar key={n} size="sm">
                <AvatarFallback>{n}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+2k</AvatarGroupCount>
          </AvatarGroup>
          <span>
            <strong className="text-foreground">2.400+</strong> equipes já usam
          </span>
        </div>
      </div>
    </section>
  )
}
