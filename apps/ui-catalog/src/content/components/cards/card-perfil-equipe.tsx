'use client'

import { Mail, MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const TEAM = [
  { name: 'Ana Souza', role: 'Head de Vendas', tags: ['Enterprise', 'SP'], initials: 'AS' },
  { name: 'Bruno Rocha', role: 'SDR', tags: ['Inbound'], initials: 'BR' },
  { name: 'Carla Mendes', role: 'Customer Success', tags: ['Onboarding', 'RJ'], initials: 'CM' },
]

export default function CardPerfilEquipe() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {TEAM.map((m) => (
        <Card key={m.name}>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">{m.initials}</AvatarFallback>
            </Avatar>
            <h3 className="mt-3 font-medium">{m.name}</h3>
            <p className="text-sm text-muted-foreground">{m.role}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1">
              {m.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="icon-sm" aria-label="E-mail">
                <Mail />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Mensagem">
                <MessageSquare />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
