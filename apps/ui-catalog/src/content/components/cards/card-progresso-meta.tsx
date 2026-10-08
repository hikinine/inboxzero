'use client'

import { Target } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress'

const GOALS = [
  { label: 'Receita do trimestre', value: 72, hint: 'R$ 648k de R$ 900k' },
  { label: 'Novos clientes', value: 48, hint: '24 de 50' },
  { label: 'NPS', value: 91, hint: '91 de 100' },
]

export default function CardProgressoMeta() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="size-4" /> Metas do Q4
        </CardTitle>
        <CardDescription>Atualizado há 5 min</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {GOALS.map((g) => (
          <div key={g.label} className="space-y-1.5">
            <Progress value={g.value}>
              <ProgressLabel>{g.label}</ProgressLabel>
              <ProgressValue />
            </Progress>
            <p className="text-xs text-muted-foreground">{g.hint}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="items-center justify-between border-t">
        <AvatarGroup>
          {['AS', 'BR', 'CM'].map((n) => (
            <Avatar key={n} size="sm">
              <AvatarFallback>{n}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
        <Button size="sm" variant="outline">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
