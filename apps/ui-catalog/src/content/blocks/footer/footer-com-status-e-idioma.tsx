'use client'

import { useState } from 'react'
import { ExternalLink, Globe, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { cn } from '@/lib/utils'

const COLS: Array<[string, string[]]> = [
  ['Produto', ['Inbox', 'CRM', 'Automações', 'Relatórios']],
  ['Empresa', ['Sobre', 'Carreiras', 'Clientes', 'Imprensa']],
  ['Suporte', ['Central de ajuda', 'Documentação', 'Comunidade', 'Contato']],
]

const SERVICOS = [
  { name: 'API', ok: true },
  { name: 'Painel', ok: true },
  { name: 'WhatsApp', ok: true },
  { name: 'E-mail transacional', ok: false },
]

export default function FooterComStatusEIdioma() {
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState('pt-BR')
  const degradados = SERVICOS.filter((s) => !s.ok).length

  return (
    <footer className="w-full border-t bg-background px-6 pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr_1.3fr]">
          <div>
            <a href="#" className="flex items-center gap-2 font-semibold">
              <span className="size-6 rounded-md bg-primary" /> Acme
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Atendimento, CRM e automações para times que vendem por mensagem.</p>
            <p className="mt-4 text-xs text-muted-foreground">Av. Paulista, 1.374 · São Paulo, SP</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {COLS.map(([title, links]) => (
              <div key={title}>
                <p className="text-sm font-medium">{title}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                <span className="relative flex size-2">
                  <span className={cn('absolute inline-flex size-full animate-ping rounded-full opacity-75', degradados ? 'bg-amber-500' : 'bg-emerald-500')} />
                  <span className={cn('relative inline-flex size-2 rounded-full', degradados ? 'bg-amber-500' : 'bg-emerald-500')} />
                </span>
                {degradados ? 'Instabilidade parcial' : 'Todos os sistemas operando'}
              </span>
              <a href="#" className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                Status <ExternalLink className="size-3" />
              </a>
            </div>
            <ul className="mt-3 divide-y text-sm">
              {SERVICOS.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-1.5">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium', s.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400')}>
                    <span className={cn('size-1.5 rounded-full', s.ok ? 'bg-emerald-500' : 'bg-amber-500')} />
                    {s.ok ? 'Operacional' : 'Degradado'}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-muted-foreground">Uptime 99,98% nos últimos 90 dias · atualizado há 2 min</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© 2026 Acme Tecnologia Ltda. · CNPJ 12.345.678/0001-90</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <Globe className="size-4 text-muted-foreground" aria-hidden />
              <NativeSelect size="sm" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Idioma">
                <NativeSelectOption value="pt-BR">Português (Brasil)</NativeSelectOption>
                <NativeSelectOption value="en">English</NativeSelectOption>
                <NativeSelectOption value="es">Español</NativeSelectOption>
              </NativeSelect>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDark((v) => !v)} aria-pressed={dark}>
              {dark ? <Moon data-icon="inline-start" /> : <Sun data-icon="inline-start" />}
              {dark ? 'Escuro' : 'Claro'}
            </Button>
            <span className="hidden text-muted-foreground/40 sm:inline">|</span>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacidade
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
