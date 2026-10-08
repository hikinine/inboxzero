'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function CadastroSplit() {
  return (
    <section className="grid w-full min-h-[640px] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <form className="w-full max-w-sm space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
            <p className="mt-1 text-sm text-muted-foreground">14 dias grátis. Sem cartão.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="Ana" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sobrenome">Sobrenome</Label>
              <Input id="sobrenome" placeholder="Souza" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail de trabalho</Label>
            <Input id="email" type="email" placeholder="ana@empresa.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" placeholder="mínimo 8 caracteres" />
          </div>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Ao continuar você concorda com os <a href="#" className="underline">Termos</a> e a <a href="#" className="underline">Privacidade</a>.
          </p>
        </form>
      </div>
      <div className="hidden flex-col justify-between bg-muted p-12 lg:flex">
        <div className="flex items-center gap-2 font-semibold">
          <span className="size-6 rounded-md bg-primary" /> Acme
        </div>
        <figure>
          <blockquote className="text-2xl font-medium leading-snug tracking-tight">“Em duas semanas o time parou de perder lead no WhatsApp. Foi a ferramenta mais rápida de adotar que já vi.”</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <Avatar>
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">Carla Mendes</div>
              <div className="text-xs text-muted-foreground">Diretora Comercial · Nuvem Fit</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
