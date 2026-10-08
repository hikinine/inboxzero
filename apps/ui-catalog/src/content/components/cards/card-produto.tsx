'use client'

import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export default function CardProduto() {
  return (
    <Card className="w-72 pt-0">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted-foreground/20">
        <Badge className="absolute left-3 top-3">-20%</Badge>
        <Button variant="secondary" size="icon-sm" className="absolute right-3 top-3 rounded-full" aria-label="Favoritar">
          <Heart />
        </Button>
      </div>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-amber-500 text-amber-500" /> 4,8 · 212 avaliações
        </div>
        <h3 className="font-medium leading-tight">Fone Bluetooth ANC Pro</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold">R$ 399</span>
          <span className="text-sm text-muted-foreground line-through">R$ 499</span>
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <Button className="w-full">
          <ShoppingCart data-icon="inline-start" /> Adicionar
        </Button>
      </CardFooter>
    </Card>
  )
}
