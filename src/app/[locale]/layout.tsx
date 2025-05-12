import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getLangDir } from 'rtl-detect';
import '@/app/globals.css'
import { SitePropertiesProvider } from '@/app/providers/SitePropertiesProvider';
import Wrapper from '@/app/components/Wrapper';
import { AddToCartProvider } from '../providers/AddToCartProvider';
import { Toaster } from 'react-hot-toast';
import ScreenLoader from '../components/ScreenLoader';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        {/* <ScreenLoader /> */}
        <Toaster position="bottom-right" />
        <SitePropertiesProvider>
          <AddToCartProvider>
            <Wrapper>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </Wrapper>
          </AddToCartProvider>
        </SitePropertiesProvider>
      </body>
    </html>
  );
}