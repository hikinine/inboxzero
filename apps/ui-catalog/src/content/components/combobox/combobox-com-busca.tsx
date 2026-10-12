'use client'

import { useState, type ReactNode } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'

const RESPONSAVEIS = ['Ana Souza', 'Bruno Rocha', 'Carla Mendes', 'Diego Lima', 'Elisa Prado', 'Felipe Nunes']
const CIDADES = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Salvador', 'Recife', 'Fortaleza', 'Brasília', 'Florianópolis']

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function ComboboxComBusca() {
  const [responsavel, setResponsavel] = useState<string | null>('Carla Mendes')
  const [cidade, setCidade] = useState<string | null>(null)

  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <Legenda>Campo com busca</Legenda>
        <Label htmlFor="responsavel" className="mb-1.5">
          Responsável
        </Label>
        <Combobox items={RESPONSAVEIS} value={responsavel} onValueChange={setResponsavel}>
          <ComboboxInput id="responsavel" placeholder="Buscar pessoa…" className="w-full" />
          <ComboboxContent>
            <ComboboxEmpty>Ninguém encontrado.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  <Avatar size="sm">
                    <AvatarFallback className="text-[10px]">{iniciais(item)}</AvatarFallback>
                  </Avatar>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="mt-1.5 text-xs text-muted-foreground">{responsavel ? `Atribuído a ${responsavel}` : 'Nenhum responsável definido'}</p>
      </div>

      <div>
        <Legenda>Botão com busca dentro do popup</Legenda>
        <Combobox items={CIDADES} value={cidade} onValueChange={setCidade}>
          <ComboboxTrigger render={<Button variant="outline" className="w-56 justify-between font-normal" />}>
            <ComboboxValue placeholder={<span className="text-muted-foreground">Escolher cidade</span>} />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder="Buscar cidade…" showTrigger={false} />
            <ComboboxEmpty>Nenhuma cidade encontrada.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="mt-1.5 text-xs text-muted-foreground">{cidade ? `Filtrando por ${cidade}` : 'Todas as cidades'}</p>
      </div>
    </div>
  )
}

function Legenda({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{children}</div>
}
