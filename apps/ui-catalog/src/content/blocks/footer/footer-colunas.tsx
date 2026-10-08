'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const COLS: Array<[string, string[]]> = [
  ['Produto', ['Inbox', 'CRM', 'Automações', 'IA', 'Relatórios']],
  ['Empresa', ['Sobre', 'Carreiras', 'Clientes', 'Imprensa']],
  ['Recursos', ['Documentação', 'API', 'Status', 'Comunidade']],
  ['Legal', ['Privacidade', 'Termos', 'LGPD', 'Cookies']],
]

export default function FooterColunas() {
  return (
    <footer className="w-full border-t bg-background px-6 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <span className="size-6 rounded-md bg-primary" /> Acme
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Receba uma dica por semana sobre vendas por mensagem. Sem spam.</p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="seu@email.com" />
              <Button type="submit">Assinar</Button>
            </form>
          </div>
          {COLS.map(([title, links]) => (
            <div key={title}>
              <div className="text-sm font-medium">{title}</div>
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
        <Separator className="mt-12" />
        <div className="flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Acme Tecnologia Ltda. Todos os direitos reservados.</span>
          <span>Feito no Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  )
}
