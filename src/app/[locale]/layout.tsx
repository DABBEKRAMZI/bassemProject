import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import "../globals.css"
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} >
      <body>
        <NextIntlClientProvider>
                  <Navbar />
        <Toaster position="top-right" reverseOrder={false} />

          {children}
          <Footer/>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}