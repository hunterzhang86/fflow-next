import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import APIKeysPageClient from './page-client';

export default async function APIKeysPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <APIKeysPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
