import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Inter Variable — UI/headings (cv01/ss03/zero aplicados no globals.css).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// Substituto do Berkeley Mono — IDs, código, metadados técnicos.
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Email Checker — esse e-mail existe?',
  description:
    'Valide e-mails antes de enviar: formato, domínios descartáveis, MX e existência da caixa via SMTP. API por créditos, batch e trilha de auditoria completa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
