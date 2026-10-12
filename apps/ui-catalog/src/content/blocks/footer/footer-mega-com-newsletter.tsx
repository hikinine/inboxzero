'use client'

import { Instagram, Linkedin, Monitor, Moon, Sun, Twitter, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const COLS: Array<[string, string[]]> = [
  ['Produto', ['Inbox', 'CRM', 'Automações', 'Assistente de IA', 'Relatórios', 'Novidades']],
  ['Soluções', ['Varejo', 'Clínicas', 'Educação', 'Imobiliárias', 'Agências']],
  ['Recursos', ['Documentação', 'API', 'Guias', 'Comunidade', 'Status', 'Webinars']],
  ['Empresa', ['Sobre', 'Carreiras', 'Clientes', 'Imprensa', 'Parceiros']],
  ['Legal', ['Privacidade', 'Termos de uso', 'LGPD', 'Cookies', 'Segurança']],
]

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'X', Icon: Twitter },
  { label: 'YouTube', Icon: Youtube },
]

export default function FooterMegaComNewsletter() {
  return (
    <footer className="w-full border-t bg-muted/30 px-6 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold tracking-tight">Receba as novidades do produto</h2>
            <p className="mt-1 text-sm text-muted-foreground">Um e-mail por mês com lançamentos, guias e bastidores. Sem spam, cancele quando quiser.</p>
          </div>
          <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="ft-news" className="sr-only">
              E-mail
            </label>
            <Input id="ft-news" type="email" placeholder="voce@empresa.com.br" required className="h-9" />
            <Button type="submit" size="lg">
              Inscrever
            </Button>
          </form>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {COLS.map(([title, links]) => (
            <div key={title}>
              <p className="text-sm font-medium">{title}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-6 border-t py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a href="#" className="flex items-center gap-2 font-semibold text-foreground">
              <span className="size-6 rounded-md bg-primary" /> Acme
            </a>
            <span className="hidden sm:inline">·</span>
            <span>© 2026 Acme Tecnologia Ltda.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <NativeSelect size="sm" defaultValue="pt-BR" aria-label="Idioma">
              <NativeSelectOption value="pt-BR">Português (BR)</NativeSelectOption>
              <NativeSelectOption value="en">English</NativeSelectOption>
              <NativeSelectOption value="es">Español</NativeSelectOption>
            </NativeSelect>
            <ToggleGroup defaultValue={['system']} variant="outline" size="sm" spacing={0} aria-label="Tema">
              <ToggleGroupItem value="light" aria-label="Tema claro">
                <Sun />
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Tema escuro">
                <Moon />
              </ToggleGroupItem>
              <ToggleGroupItem value="system" aria-label="Tema do sistema">
                <Monitor />
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="flex items-center gap-1">
              {SOCIAL.map(({ label, Icon }) => (
                <Button key={label} nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={label} className="text-muted-foreground hover:text-foreground">
                  <Icon />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
