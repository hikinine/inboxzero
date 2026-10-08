import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SANDBOX_CSS } from '@/sandbox/generated/theme-css';

// Root layout do sandbox de preview — SEM o CSS do site. O tema do shadcn entra como
// <style type="text/tailwindcss">, compilado em runtime pelo @tailwindcss/browser (carregado pelo Sandbox).
const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Preview',
  robots: { index: false, follow: false },
};

// Aplica o tema antes do primeiro paint (evita flash claro→escuro).
const THEME_SCRIPT = `(function(){try{var t=new URLSearchParams(location.search).get('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function SandboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <style type="text/tailwindcss" dangerouslySetInnerHTML={{ __html: SANDBOX_CSS }} />
      </head>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
