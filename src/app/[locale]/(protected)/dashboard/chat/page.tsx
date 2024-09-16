import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ChatPageClient from './page-client';


export default async function ChatPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ChatPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
