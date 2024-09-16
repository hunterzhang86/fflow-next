import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { redirect } from 'next/navigation';

import { getCurrentUser } from "@/lib/session";

import DashboardPageClient from "./page-client";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/${locale}/login`);
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <DashboardPageClient locale={locale} user={currentUser} />
    </NextIntlClientProvider>
  );
}
