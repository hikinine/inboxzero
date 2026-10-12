'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function FieldComValidacao() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Dados da empresa</FieldLegend>
      <FieldDescription>Os mesmos campos nos estados padrão, com erro, desabilitado, com vários erros e em linha.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fld-razao">Razão social</FieldLabel>
          <Input id="fld-razao" placeholder="Lumi Tecnologia LTDA" />
          <FieldDescription>Exatamente como consta no cartão CNPJ.</FieldDescription>
        </Field>

        <Field data-invalid="true">
          <FieldLabel htmlFor="fld-cnpj">CNPJ</FieldLabel>
          <Input id="fld-cnpj" defaultValue="12.345.678/0001" aria-invalid />
          <FieldError>Informe um CNPJ válido com 14 dígitos.</FieldError>
        </Field>

        <Field data-disabled="true">
          <FieldLabel htmlFor="fld-ie">Inscrição estadual</FieldLabel>
          <Input id="fld-ie" placeholder="Isento" disabled />
          <FieldDescription>Preenchida automaticamente depois de validar o CNPJ.</FieldDescription>
        </Field>

        <Field data-invalid="true">
          <FieldLabel htmlFor="fld-senha">Senha de acesso</FieldLabel>
          <Input id="fld-senha" type="password" defaultValue="abc" aria-invalid />
          <FieldError errors={[{ message: 'Use pelo menos 8 caracteres.' }, { message: 'Inclua ao menos um número.' }]} />
        </Field>

        <Field orientation="horizontal">
          <Checkbox id="fld-termos" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="fld-termos">Aceito os termos de uso e a política de privacidade</FieldLabel>
            <FieldDescription>Você pode cancelar a conta a qualquer momento.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
