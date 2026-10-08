'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

export default function FormPerfil() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Como você aparece para o time e para os clientes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" defaultValue="Ana Souza" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cargo">Cargo</Label>
            <Input id="cargo" defaultValue="Head de Vendas" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" defaultValue="ana@empresa.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fuso">Fuso horário</Label>
            <NativeSelect id="fuso" defaultValue="sp">
              <NativeSelectOption value="sp">São Paulo (GMT-3)</NativeSelectOption>
              <NativeSelectOption value="mao">Manaus (GMT-4)</NativeSelectOption>
              <NativeSelectOption value="lis">Lisboa (GMT+0)</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="idioma">Idioma</Label>
            <NativeSelect id="idioma" defaultValue="pt">
              <NativeSelectOption value="pt">Português</NativeSelectOption>
              <NativeSelectOption value="en">English</NativeSelectOption>
              <NativeSelectOption value="es">Español</NativeSelectOption>
            </NativeSelect>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={3} defaultValue="Cuido do time de vendas enterprise. Café, pipeline e follow-up." />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3 sm:col-span-2">
            <div>
              <div className="text-sm font-medium">Perfil público</div>
              <div className="text-xs text-muted-foreground">Clientes veem seu nome e foto nas conversas.</div>
            </div>
            <Switch defaultChecked />
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="ghost">Cancelar</Button>
        <Button>Salvar alterações</Button>
      </CardFooter>
    </Card>
  )
}
