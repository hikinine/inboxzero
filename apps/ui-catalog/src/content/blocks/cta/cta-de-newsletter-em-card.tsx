'use client'

import { useState } from 'react'
import { CircleCheck, Lock, Mail } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'

export default function CtaDeNewsletterEmCard() {
  const [email, setEmail] = useState('')
  const [inscrito, setInscrito] = useState(false)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center sm:p-12">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted">
          <Mail className="size-5" />
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">O resumo semanal do e-commerce brasileiro</h2>
        <p className="mt-3 text-muted-foreground">Toda terça, 5 minutos de leitura: números, bastidores e o que está funcionando nas lojas que mais crescem.</p>

        <form
          className="mx-auto mt-8 max-w-md"
          onSubmit={(e) => {
            e.preventDefault()
            if (email.trim()) setInscrito(true)
          }}
        >
          <Label htmlFor="newsletter-email" className="sr-only">
            Seu e-mail
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput id="newsletter-email" type="email" placeholder="seu@email.com.br" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputGroupAddon align="inline-end">
              <InputGroupButton type="submit" variant="default">
                Assinar
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            {inscrito ? (
              <>
                <CircleCheck className="size-3.5 text-emerald-500" /> Inscrição confirmada. Até terça!
              </>
            ) : (
              <>
                <Lock className="size-3.5" /> Sem spam. Cancele com um clique. Seus dados ficam no Brasil.
              </>
            )}
          </p>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <AvatarGroup>
            {['LM', 'JP', 'RA', 'TS'].map((n) => (
              <Avatar key={n} size="sm">
                <AvatarFallback>{n}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <span>
            <strong className="text-foreground">12 mil</strong> leitores toda semana
          </span>
        </div>
      </div>
    </section>
  )
}
