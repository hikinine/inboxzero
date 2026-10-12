'use client'

import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

const mascaraCep = (v: string) => v.replace(/\D/g, '').slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2')

export default function FormDeEndereco() {
  const [cep, setCep] = useState('')
  const [end, setEnd] = useState({ rua: '', numero: '', complemento: '', bairro: '', cidade: '', uf: '' })
  const set = (k: keyof typeof end) => (v: string) => setEnd((e) => ({ ...e, [k]: v }))

  // Simula a consulta de CEP (sem fetch): preenche rua, bairro, cidade e UF.
  const buscarCep = () => {
    if (cep.length < 9) return
    setEnd((e) => ({ ...e, rua: 'Av. Paulista', bairro: 'Bela Vista', cidade: 'São Paulo', uf: 'SP' }))
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" /> Endereço de entrega
        </CardTitle>
        <CardDescription>Digite o CEP para preencher o endereço automaticamente.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="end-cep">CEP</FieldLabel>
              <InputGroup>
                <InputGroupInput id="end-cep" inputMode="numeric" placeholder="00000-000" value={cep} onChange={(e) => setCep(mascaraCep(e.target.value))} />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" aria-label="Buscar CEP" onClick={buscarCep} disabled={cep.length < 9}>
                    <Search />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field className="sm:col-span-4">
              <FieldLabel htmlFor="end-rua">Rua</FieldLabel>
              <Input id="end-rua" placeholder="Av. Paulista" value={end.rua} onChange={(e) => set('rua')(e.target.value)} />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="end-numero">Número</FieldLabel>
              <Input id="end-numero" inputMode="numeric" placeholder="1578" value={end.numero} onChange={(e) => set('numero')(e.target.value)} />
            </Field>
            <Field className="sm:col-span-4">
              <FieldLabel htmlFor="end-comp">
                Complemento <span className="font-normal text-muted-foreground">(opcional)</span>
              </FieldLabel>
              <Input id="end-comp" placeholder="Conjunto 1204, bloco B" value={end.complemento} onChange={(e) => set('complemento')(e.target.value)} />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="end-bairro">Bairro</FieldLabel>
              <Input id="end-bairro" placeholder="Bela Vista" value={end.bairro} onChange={(e) => set('bairro')(e.target.value)} />
            </Field>
            <Field className="sm:col-span-3">
              <FieldLabel htmlFor="end-cidade">Cidade</FieldLabel>
              <Input id="end-cidade" placeholder="São Paulo" value={end.cidade} onChange={(e) => set('cidade')(e.target.value)} />
            </Field>
            <Field className="sm:col-span-1">
              <FieldLabel htmlFor="end-uf">UF</FieldLabel>
              <NativeSelect id="end-uf" className="w-full" value={end.uf} onChange={(e) => set('uf')(e.target.value)}>
                <NativeSelectOption value="">—</NativeSelectOption>
                {UFS.map((uf) => (
                  <NativeSelectOption key={uf} value={uf}>
                    {uf}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>

            <Field orientation="horizontal" className="sm:col-span-6">
              <Checkbox id="end-padrao" defaultChecked />
              <FieldContent>
                <FieldLabel htmlFor="end-padrao">Usar como endereço padrão</FieldLabel>
                <FieldDescription>Também será usado na cobrança e na nota fiscal.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancelar</Button>
        <Button>Salvar endereço</Button>
      </CardFooter>
    </Card>
  )
}
