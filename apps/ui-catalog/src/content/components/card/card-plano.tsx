'use client'

import { Check, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const PLANOS = [
  {
    nome: 'Starter',
    preco: 49,
    descricao: 'Para quem está começando a vender online.',
    destaque: false,
    beneficios: ['1 número de WhatsApp', 'Até 1.000 contatos', 'Automações básicas', 'Suporte por e-mail'],
    cta: 'Começar grátis',
  },
  {
    nome: 'Pro',
    preco: 149,
    descricao: 'Para equipes que precisam de escala e relatórios.',
    destaque: true,
    beneficios: ['3 números de WhatsApp', 'Contatos ilimitados', 'Automações com IA', 'Relatórios por canal', 'Suporte prioritário'],
    cta: 'Assinar o Pro',
  },
]

export default function CardPlano() {
  return (
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      {PLANOS.map((p) => (
        <Card key={p.nome} className={p.destaque ? 'ring-2 ring-primary' : undefined}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {p.nome}
              {p.destaque && (
                <Badge>
                  <Sparkles data-icon="inline-start" /> Mais popular
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{p.descricao}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">R$ {p.preco}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <ul className="space-y-2 text-sm">
              {p.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {b}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full" variant={p.destaque ? 'default' : 'outline'}>
              {p.cta}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
