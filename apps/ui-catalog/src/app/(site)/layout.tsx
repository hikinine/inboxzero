import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';
import './site.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — componentes shadcn/ui com preview ao vivo`, template: `%s · ${SITE_NAME}` },
  description: SITE_TAGLINE,
  openGraph: { title: SITE_NAME, description: SITE_TAGLINE, type: 'website', locale: 'pt_BR' },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>
            <SiteHeader />
            <main className="min-h-[70vh]">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
