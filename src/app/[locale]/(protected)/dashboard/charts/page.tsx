import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import ChartsPageClient from './page-client';

export default async function ChartsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ChartsPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
