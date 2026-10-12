'use client'

import { Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LINKS = ['Produto', 'Preços', 'Blog', 'Carreiras', 'Contato']

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'X', Icon: Twitter },
  { label: 'YouTube', Icon: Youtube },
  { label: 'GitHub', Icon: Github },
]

export default function FooterSimplesComSocial() {
  return (
    <footer className="w-full border-t bg-background px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="size-6 rounded-md bg-primary" /> Acme
          </a>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Rodapé">
            {LINKS.map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            {SOCIAL.map(({ label, Icon }) => (
              <Button key={label} nativeButton={false} render={<a href="#" />} variant="ghost" size="icon-sm" aria-label={label} className="text-muted-foreground hover:text-foreground">
                <Icon />
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 Acme Tecnologia Ltda. CNPJ 12.345.678/0001-90</span>
          <span className="inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Todos os sistemas operando
          </span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              Privacidade
            </a>
            <a href="#" className="hover:text-foreground">
              Termos
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
