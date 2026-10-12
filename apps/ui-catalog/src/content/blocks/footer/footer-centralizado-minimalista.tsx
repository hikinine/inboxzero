'use client'

import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LINKS = ['Produto', 'Preços', 'Docs', 'Blog', 'Carreiras', 'Contato']

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'X', Icon: Twitter },
  { label: 'GitHub', Icon: Github },
]

export default function FooterCentralizadoMinimalista() {
  return (
    <footer className="w-full bg-background px-6 py-14">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <a href="#" aria-label="Acme" className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          A
        </a>
        <p className="mt-4 text-sm text-muted-foreground">Vendas por mensagem, sem bagunça.</p>

        <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm" aria-label="Rodapé">
          {LINKS.map((l) => (
            <a key={l} href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>

        <div className="mt-6 flex items-center gap-1.5">
          {SOCIAL.map(({ label, Icon }) => (
            <Button key={label} nativeButton={false} render={<a href="#" />} variant="outline" size="icon-sm" aria-label={label} className="rounded-full text-muted-foreground hover:text-foreground">
              <Icon />
            </Button>
          ))}
        </div>

        <div className="mt-8 h-px w-16 bg-border" />

        <p className="mt-6 text-xs text-muted-foreground">© 2026 Acme Tecnologia Ltda. Feito em Florianópolis, SC.</p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          <a href="#" className="hover:text-foreground">
            Privacidade
          </a>
          {' · '}
          <a href="#" className="hover:text-foreground">
            Termos
          </a>
          {' · '}
          <a href="#" className="hover:text-foreground">
            Cookies
          </a>
        </p>
      </div>
    </footer>
  )
}
