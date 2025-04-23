import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getLangDir} from 'rtl-detect';
import '@/app/globals.css'
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500','700'],
  subsets: ['latin'],
});


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
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction} className={roboto.className}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}