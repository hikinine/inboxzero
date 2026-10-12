import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { AnnouncementBar } from '@/components/site/announcement-bar';
import { countNewItems, NEW_DAYS } from '@/lib/items';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';
import './site.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — blocos, componentes, páginas e ilustrações shadcn/ui`, template: `%s · ${SITE_NAME}` },
  description: SITE_TAGLINE,
  openGraph: { title: SITE_NAME, description: SITE_TAGLINE, type: 'website', locale: 'pt_BR' },
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const newCount = await countNewItems().catch(() => 0);
  const announcement =
    newCount > 0
      ? { id: `new-${newCount}`, text: `${newCount} ${newCount === 1 ? 'item publicado' : 'itens publicados'} nos últimos ${NEW_DAYS} dias — blocos, componentes, páginas e ilustrações.`, href: '/changelog' }
      : { id: 'groups-v1', text: 'Catálogo reorganizado em grupos — Marketing, Dashboard & App, E-commerce, Datatable e Bento.', href: '/blocks' };

  return (
    <html lang="pt-BR" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>
            <AnnouncementBar id={announcement.id} text={announcement.text} href={announcement.href} />
            <SiteHeader />
            <main className="min-h-[70vh]">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
