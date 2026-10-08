'use client'

import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const QUOTES = [
  { name: 'Ana Souza', role: 'Lumi', text: 'Tiramos 40% do tempo de resposta na primeira semana.' },
  { name: 'Bruno Rocha', role: 'Kavo', text: 'A IA qualifica de madrugada e de manhã a agenda está cheia.' },
  { name: 'Carla Mendes', role: 'Nuvem Fit', text: 'Realocamos a verba de mídia no mesmo dia que vimos o relatório.' },
  { name: 'Diego Lima', role: 'Prisma', text: 'Fila justa, sem briga por lead. Resumo no card é ouro.' },
]

export default function CarouselDepoimentos() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {QUOTES.map((q) => (
          <CarouselItem key={q.name}>
            <Card>
              <CardContent className="space-y-4">
                <div className="flex gap-0.5 text-amber-500">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed">“{q.text}”</p>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback>{q.name.split(' ').map((s) => s[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <div className="font-medium">{q.name}</div>
                    <div className="text-muted-foreground">{q.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
