import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { SkillsHelp } from '@/components/SkillsHelp';
import './globals.css';

export const metadata: Metadata = {
  title: 'Catálogo de Telas',
  description: 'Biblioteca de telas (SVG) — consumível e alimentável via MCP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/brand/logo.png" alt="" width={28} height={28} unoptimized className="h-7 w-7 rounded-md" />
              <span>Catálogo de Telas</span>
            </Link>
            <div className="flex items-center gap-2">
              <SkillsHelp />
              <Link
                href="/screens/new"
                className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-500"
              >
                <Plus className="h-4 w-4" />
                Nova tela
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
