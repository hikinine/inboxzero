'use client'

import { useState, type ReactNode } from 'react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'

const HABILIDADES = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'PostgreSQL', 'Prisma', 'Docker', 'Figma', 'Python']
const PESSOAS = ['Ana Souza', 'Bruno Rocha', 'Carla Mendes', 'Diego Lima', 'Elisa Prado', 'Felipe Nunes', 'Gabriela Reis']

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function ComboboxMultiplo() {
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript'])
  const [pessoas, setPessoas] = useState<string[]>(['Ana Souza', 'Carla Mendes'])
  const anchorSkills = useComboboxAnchor()
  const anchorPessoas = useComboboxAnchor()

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <Legenda>Seleção múltipla em chips</Legenda>
        <Label htmlFor="skills" className="mb-1.5">
          Habilidades
        </Label>
        <Combobox multiple autoHighlight items={HABILIDADES} value={skills} onValueChange={setSkills}>
          <ComboboxChips ref={anchorSkills} className="w-full">
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((v) => (
                    <ComboboxChip key={v}>{v}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput id="skills" placeholder={values.length ? '' : 'Adicionar habilidade…'} />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchorSkills}>
            <ComboboxEmpty>Nenhuma habilidade encontrada.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {skills.length} de {HABILIDADES.length} selecionadas
        </p>
      </div>

      <div>
        <Legenda>Destinatários com iniciais</Legenda>
        <Label htmlFor="pessoas" className="mb-1.5">
          Compartilhar com
        </Label>
        <Combobox multiple autoHighlight items={PESSOAS} value={pessoas} onValueChange={setPessoas}>
          <ComboboxChips ref={anchorPessoas} className="w-full">
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((v) => (
                    <ComboboxChip key={v} className="pl-0.5">
                      <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
                        {iniciais(v)}
                      </span>
                      {v}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput id="pessoas" placeholder={values.length ? '' : 'Buscar pessoa…'} />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchorPessoas}>
            <ComboboxEmpty>Ninguém encontrado.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold">{iniciais(item)}</span>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
