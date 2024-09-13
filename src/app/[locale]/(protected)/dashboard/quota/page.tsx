import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import QuotaPageClient from './page-client';

export default async function QuotaPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <QuotaPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
