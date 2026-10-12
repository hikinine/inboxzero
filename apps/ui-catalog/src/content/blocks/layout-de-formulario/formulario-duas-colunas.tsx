'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'

export default function FormularioDuasColunas() {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-6 py-5">
            <h2 className="text-lg font-semibold">Novo cliente</h2>
            <p className="text-sm text-muted-foreground">Dados de contato e faturamento. Campos com * são obrigatórios.</p>
          </div>
          <form className="p-6" onSubmit={(e) => e.preventDefault()}>
            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="fc-nome">Nome *</FieldLabel>
                <Input id="fc-nome" defaultValue="Juliana" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-sobrenome">Sobrenome *</FieldLabel>
                <Input id="fc-sobrenome" defaultValue="Alves" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-email">E-mail *</FieldLabel>
                <Input id="fc-email" type="email" defaultValue="juliana@bistrooliva.com.br" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-telefone">Telefone</FieldLabel>
                <Input id="fc-telefone" type="tel" defaultValue="(11) 97654-3210" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-empresa">Empresa</FieldLabel>
                <Input id="fc-empresa" defaultValue="Bistrô Oliva" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-cargo">Cargo</FieldLabel>
                <Input id="fc-cargo" defaultValue="Sócia-proprietária" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-cnpj">CNPJ</FieldLabel>
                <Input id="fc-cnpj" defaultValue="45.678.901/0001-23" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-site">Site</FieldLabel>
                <Input id="fc-site" type="url" defaultValue="https://bistrooliva.com.br" />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fc-endereco">Endereço</FieldLabel>
                <Input id="fc-endereco" defaultValue="Rua Oscar Freire, 920 · Jardins" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-cidade">Cidade</FieldLabel>
                <Input id="fc-cidade" defaultValue="São Paulo" />
              </Field>
              <Field>
                <FieldLabel htmlFor="fc-uf">Estado</FieldLabel>
                <NativeSelect id="fc-uf" defaultValue="SP" className="w-full">
                  <NativeSelectOption value="SP">São Paulo</NativeSelectOption>
                  <NativeSelectOption value="RJ">Rio de Janeiro</NativeSelectOption>
                  <NativeSelectOption value="MG">Minas Gerais</NativeSelectOption>
                  <NativeSelectOption value="PR">Paraná</NativeSelectOption>
                  <NativeSelectOption value="SC">Santa Catarina</NativeSelectOption>
                  <NativeSelectOption value="RS">Rio Grande do Sul</NativeSelectOption>
                  <NativeSelectOption value="BA">Bahia</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="fc-obs">Observações</FieldLabel>
                <Textarea id="fc-obs" rows={3} defaultValue="Prefere contato por WhatsApp depois das 15h. Interesse no plano Pro com 3 atendentes." />
                <FieldDescription>Visível só para o seu time.</FieldDescription>
              </Field>
            </FieldGroup>
          </form>
          <div className="flex flex-col-reverse items-center gap-3 border-t bg-muted/40 px-6 py-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">Rascunho salvo automaticamente às 14:32.</p>
            <div className="flex gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>Salvar cliente</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
