'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { BarChart3, Megaphone, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

interface Categoria {
  id: string
  title: string
  description: string
  icon: LucideIcon
  cookies: number
  required?: boolean
}

const CATEGORIAS: Categoria[] = [
  { id: 'necessarios', title: 'Necessários', description: 'Login, carrinho e segurança. Sem eles o site não funciona.', icon: ShieldCheck, cookies: 4, required: true },
  { id: 'analytics', title: 'Analíticos', description: 'Entendemos quais páginas ajudam e quais confundem.', icon: BarChart3, cookies: 3 },
  { id: 'marketing', title: 'Marketing', description: 'Anúncios mais relevantes em outras plataformas.', icon: Megaphone, cookies: 6 },
  { id: 'personalizacao', title: 'Personalização', description: 'Idioma, tema e conteúdo recomendado para você.', icon: SlidersHorizontal, cookies: 2 },
]

const INITIAL: Record<string, boolean> = { necessarios: true, analytics: true, marketing: false, personalizacao: true }

export default function ModalDePreferenciasDeCookies() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(INITIAL)
  const [saved, setSaved] = useState(false)

  const setAll = (value: boolean) => {
    setPrefs(Object.fromEntries(CATEGORIAS.map((c) => [c.id, c.required ? true : value])))
    setSaved(false)
  }
  const ativos = CATEGORIAS.filter((c) => prefs[c.id]).reduce((acc, c) => acc + c.cookies, 0)

  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto flex min-h-[600px] max-w-4xl items-center justify-center rounded-2xl bg-muted/50 p-4 sm:p-10">
        <div role="dialog" aria-labelledby="cookies-title" className="w-full max-w-lg overflow-hidden rounded-2xl border bg-card shadow-xl">
          <div className="flex items-start justify-between gap-4 border-b p-5">
            <div>
              <h2 id="cookies-title" className="text-lg font-semibold tracking-tight">
                Preferências de cookies
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Escolha o que podemos usar. Dá para mudar quando quiser no rodapé do site.</p>
            </div>
            <button type="button" aria-label="Fechar" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          <div className="divide-y">
            {CATEGORIAS.map((c) => {
              const Icon = c.icon
              const on = c.required ? true : (prefs[c.id] ?? false)
              return (
                <div key={c.id} className="flex items-start gap-4 p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{c.title}</span>
                      <Badge variant="outline">{c.cookies} cookies</Badge>
                      {c.required && <span className="text-xs text-muted-foreground">Sempre ativo</span>}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                  </div>
                  <Switch
                    checked={on}
                    disabled={c.required}
                    aria-label={`Permitir cookies de ${c.title.toLowerCase()}`}
                    onCheckedChange={(v) => {
                      setPrefs((p) => ({ ...p, [c.id]: v }))
                      setSaved(false)
                    }}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 border-t bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-muted-foreground tabular-nums">{saved ? 'Preferências salvas.' : `${ativos} cookies ativos`}</span>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              <Button variant="ghost" size="sm" onClick={() => setAll(false)}>
                Rejeitar todos
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSaved(true)}>
                Salvar preferências
              </Button>
              <Button size="sm" onClick={() => setAll(true)}>
                Aceitar todos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
