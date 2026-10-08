'use client'

const CH_FOOTER_LINKS = ['Áreas', 'Capacidades', 'Processo', 'FAQ', 'Contato']

export default function CodehallFooter() {
  return (
    <footer className="w-full border-t bg-background px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>Codehall. Software com IA que funciona.</p>
        <nav className="flex flex-wrap justify-center gap-5">
          {CH_FOOTER_LINKS.map((l) => (
            <a key={l} href="#" className="hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <p>© 2026 Codehall</p>
      </div>
    </footer>
  )
}
