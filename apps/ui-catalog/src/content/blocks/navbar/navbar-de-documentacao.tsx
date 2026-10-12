'use client'

import { useState } from 'react'
import { Github, Menu, Moon, Search, Sun } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const SECOES = ['Guia', 'Referência da API', 'Exemplos', 'SDKs', 'Changelog']

export default function NavbarDeDocumentacao() {
  const [active, setActive] = useState('Guia')
  const [dark, setDark] = useState(false)

  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="size-6 rounded-md bg-primary" /> Acme
          <span className="text-muted-foreground/50">/</span>
          <span className="font-normal text-muted-foreground">Docs</span>
        </a>

        <NativeSelect size="sm" defaultValue="v3.2" aria-label="Versão da documentação" className="hidden sm:block">
          <NativeSelectOption value="v3.2">v3.2 (atual)</NativeSelectOption>
          <NativeSelectOption value="v3.1">v3.1</NativeSelectOption>
          <NativeSelectOption value="v2">v2.x (legado)</NativeSelectOption>
        </NativeSelect>

        <div className="hidden w-full max-w-xs md:ml-auto md:block">
          <InputGroup className="h-8">
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar na documentação…" aria-label="Buscar na documentação" className="h-full" />
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button variant="ghost" size="icon-sm" aria-label="Buscar" className="md:hidden">
            <Search />
          </Button>
          <Button nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label="GitHub">
            <Github />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={dark ? 'Usar tema claro' : 'Usar tema escuro'} aria-pressed={dark} onClick={() => setDark((v) => !v)}>
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button size="sm" className="ml-1 hidden sm:inline-flex">
            Painel
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Abrir menu" className="md:hidden">
            <Menu />
          </Button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6">
        {SECOES.map((s) => {
          const isActive = s === active
          return (
            <button
              key={s}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActive(s)}
              className={cn('relative shrink-0 px-2 py-2.5 text-sm whitespace-nowrap transition-colors', isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              {s}
              {isActive && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-foreground" />}
            </button>
          )
        })}
        <Badge variant="outline" className="ml-auto hidden shrink-0 sm:inline-flex">
          <span className="size-1.5 rounded-full bg-emerald-500" /> API operacional
        </Badge>
      </div>
    </header>
  )
}
