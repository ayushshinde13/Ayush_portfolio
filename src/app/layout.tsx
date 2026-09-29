import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { LenisProvider } from '@/providers/lenis-provider';
import { Preloader } from '@/components/preloader/Preloader';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { generatePortfolioMetadata, buildPersonJsonLd } from '@/lib/seo';

import { ResumeProvider } from '@/context/ResumeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = generatePortfolioMetadata({
  title: 'Er. Ayush Kumar Shinde portfolio',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = buildPersonJsonLd();

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {/* Inject JSON-LD Person structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-indigo-600 selection:text-white">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>
            <ResumeProvider>
              {/* Preloader intro sequence */}
              <Preloader />

              {/* Global floating navigation */}
              <Navbar />

              {/* Main content landmark */}
              <div id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
                {children}
              </div>

              {/* Global footer */}
              <Footer />
            </ResumeProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
