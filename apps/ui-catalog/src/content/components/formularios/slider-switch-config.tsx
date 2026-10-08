'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

export default function SliderSwitchConfig() {
  const [limit, setLimit] = useState(60)
  const [temp, setTemp] = useState(0.7)
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Atendimento com IA</CardTitle>
        <CardDescription>Quanto a IA pode fazer antes de chamar um humano.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Label>Mensagens automáticas por conversa</Label>
            <span className="tabular-nums text-muted-foreground">{limit}%</span>
          </div>
          <Slider value={[limit]} onValueChange={(v) => setLimit(Array.isArray(v) ? (v[0] ?? 0) : v)} max={100} step={5} />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <Label>Criatividade</Label>
            <span className="tabular-nums text-muted-foreground">{temp.toFixed(1)}</span>
          </div>
          <Slider value={[temp]} onValueChange={(v) => setTemp(Array.isArray(v) ? (v[0] ?? 0) : v)} min={0} max={1} step={0.1} />
        </div>
        <Separator />
        {[
          ['Responder fora do horário', true],
          ['Agendar reuniões sozinha', true],
          ['Enviar propostas de preço', false],
        ].map(([l, on]) => (
          <div key={String(l)} className="flex items-center justify-between text-sm">
            <Label>{l}</Label>
            <Switch defaultChecked={Boolean(on)} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
