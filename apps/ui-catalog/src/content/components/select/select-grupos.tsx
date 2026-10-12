'use client'

import { Label } from '@/components/ui/label'
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@/components/ui/native-select'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Item {
  value: string
  label: string
  disabled?: boolean
}

const FRUTAS: Item[] = [
  { value: 'maca', label: 'Maçã' },
  { value: 'banana', label: 'Banana' },
  { value: 'laranja', label: 'Laranja' },
  { value: 'manga', label: 'Manga' },
  { value: 'abacate', label: 'Abacate (fora de temporada)', disabled: true },
]

const LEGUMES: Item[] = [
  { value: 'cenoura', label: 'Cenoura' },
  { value: 'batata', label: 'Batata' },
  { value: 'brocolis', label: 'Brócolis' },
  { value: 'abobrinha', label: 'Abobrinha' },
]

// Mapa valor → rótulo para o SelectValue renderizar o texto certo já no primeiro paint.
const ITEMS: Record<string, string> = Object.fromEntries([...FRUTAS, ...LEGUMES].map((i) => [i.value, i.label] as const))

export default function SelectGrupos() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Com grupos e item desabilitado</p>
        <Label htmlFor="sel-grupos">Ingrediente principal</Label>
        <Select defaultValue="banana" items={ITEMS}>
          <SelectTrigger id="sel-grupos" className="w-full">
            <SelectValue placeholder="Escolha um item" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frutas</SelectLabel>
              {FRUTAS.map((i) => (
                <SelectItem key={i.value} value={i.value} disabled={i.disabled}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Legumes</SelectLabel>
              {LEGUMES.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Select nativo com optgroup</p>
        <Label htmlFor="sel-nativo">Acompanhamento</Label>
        <NativeSelect id="sel-nativo" defaultValue="cenoura" className="w-full">
          <NativeSelectOptGroup label="Frutas">
            {FRUTAS.map((i) => (
              <NativeSelectOption key={i.value} value={i.value} disabled={i.disabled}>
                {i.label}
              </NativeSelectOption>
            ))}
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Legumes">
            {LEGUMES.map((i) => (
              <NativeSelectOption key={i.value} value={i.value}>
                {i.label}
              </NativeSelectOption>
            ))}
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Pequeno, sem valor</p>
          <Select items={ITEMS}>
            <SelectTrigger size="sm" className="w-full" aria-label="Fruta">
              <SelectValue placeholder="Fruta…" />
            </SelectTrigger>
            <SelectContent>
              {FRUTAS.map((i) => (
                <SelectItem key={i.value} value={i.value} disabled={i.disabled}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Desabilitado</p>
          <Select defaultValue="brocolis" items={ITEMS} disabled>
            <SelectTrigger size="sm" className="w-full" aria-label="Legume">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEGUMES.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
