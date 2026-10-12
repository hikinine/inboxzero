'use client'

import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const PRODUTOS = [
  { nome: 'Fone Bluetooth ANC', preco: 'R$ 299', nota: '4,8', tag: 'Mais vendido', cor: 'from-slate-400/60 to-slate-600/60' },
  { nome: 'Teclado mecânico 65%', preco: 'R$ 489', nota: '4,9', tag: null, cor: 'from-violet-400/60 to-indigo-600/60' },
  { nome: 'Mouse sem fio', preco: 'R$ 159', nota: '4,6', tag: '-20%', cor: 'from-sky-400/60 to-cyan-600/60' },
  { nome: 'Monitor 27" 144 Hz', preco: 'R$ 1.890', nota: '4,7', tag: null, cor: 'from-amber-400/60 to-orange-600/60' },
  { nome: 'Webcam 4K', preco: 'R$ 649', nota: '4,5', tag: 'Novo', cor: 'from-emerald-400/60 to-teal-600/60' },
  { nome: 'Suporte para notebook', preco: 'R$ 129', nota: '4,4', tag: null, cor: 'from-rose-400/60 to-pink-600/60' },
]

export default function CarouselCards() {
  return (
    <div className="w-full max-w-2xl px-12">
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {PRODUTOS.map((p) => (
            <CarouselItem key={p.nome} className="basis-1/2 md:basis-1/3">
              <Card size="sm" className="h-full">
                <CardContent className="space-y-2.5">
                  <div className={`relative aspect-[4/3] rounded-lg bg-gradient-to-br ${p.cor}`}>
                    {p.tag && (
                      <Badge variant="secondary" className="absolute left-2 top-2">
                        {p.tag}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="truncate text-sm font-medium">{p.nome}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{p.preco}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 fill-amber-500 text-amber-500" />
                        {p.nota}
                      </span>
                    </div>
                  </div>
                  <Button size="xs" variant="outline" className="w-full">
                    Adicionar
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
