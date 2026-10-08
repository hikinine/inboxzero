'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

export default function LoginCard() {
  return (
    <section className="flex w-full items-center justify-center px-6 py-20">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Use seu e-mail corporativo para acessar o painel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="voce@empresa.com" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
                  Esqueci a senha
                </a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <Label className="font-normal">
              <Checkbox defaultChecked /> Manter conectado
            </Label>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" /> ou <Separator className="flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Microsoft</Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Não tem conta?&nbsp;
          <a href="#" className="text-foreground underline underline-offset-4">
            Criar agora
          </a>
        </CardFooter>
      </Card>
    </section>
  )
}
