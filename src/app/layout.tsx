import type { Metadata, Viewport } from 'next';
import { readContent } from '@/lib/store';
import './globals.css';
export const viewport: Viewport = { themeColor: '#090909', width: 'device-width', initialScale: 1 };
export async function generateMetadata(): Promise<Metadata> {
  const { profile, settings } = await readContent();
  const title = `${profile.name} · ${settings.siteTitle}`;
  return {
    title,
    description: settings.heroDescription,
    metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
    openGraph: {
      title,
      description: settings.heroDescription,
      locale: 'es_CO',
      type: 'website',
      images: [
        {
          url: '/images/editorial/orbit-hero.webp',
          width: 1672,
          height: 941,
          alt: 'Diego Ocampo, software y otros universos',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: settings.heroDescription,
      images: ['/images/editorial/orbit-hero.webp'],
    },
  };
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
