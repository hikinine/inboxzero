'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const PLANS = [
  { name: 'Starter', monthly: 97, yearly: 77, desc: 'Para quem está começando.', features: ['1 número de WhatsApp', '2 usuários', 'CRM básico', 'Suporte por e-mail'] },
  { name: 'Pro', monthly: 297, yearly: 237, desc: 'Para times em crescimento.', features: ['3 números', '10 usuários', 'Automações ilimitadas', 'IA de qualificação', 'Relatórios avançados'], highlight: true },
  { name: 'Scale', monthly: 797, yearly: 637, desc: 'Para operações grandes.', features: ['Números ilimitados', 'Usuários ilimitados', 'SLA e onboarding', 'API e webhooks', 'Gerente de conta'] },
]

export default function PricingTresPlanos() {
  const [yearly, setYearly] = useState(true)
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Planos simples, sem surpresa</h2>
          <p className="mt-3 text-muted-foreground">Troque de plano quando quiser. Anual sai 20% mais barato.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Label htmlFor="billing" className={!yearly ? 'text-foreground' : 'text-muted-foreground'}>
              Mensal
            </Label>
            <Switch id="billing" checked={yearly} onCheckedChange={(v) => setYearly(Boolean(v))} />
            <Label htmlFor="billing" className={yearly ? 'text-foreground' : 'text-muted-foreground'}>
              Anual <Badge variant="secondary" className="ml-1">-20%</Badge>
            </Label>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 ${p.highlight ? 'border-primary bg-card shadow-lg' : 'bg-card'}`}>
              {p.highlight && <Badge className="absolute -top-3 left-6">Mais escolhido</Badge>}
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tabular-nums">R$ {yearly ? p.yearly : p.monthly}</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <Button className="mt-6" variant={p.highlight ? 'default' : 'outline'}>
                Assinar {p.name}
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
