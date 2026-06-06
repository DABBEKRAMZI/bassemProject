import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Playfair_Display, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import '../globals.css';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${playfair.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <Navbar />
          <Toaster position="top-right" reverseOrder={false} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
