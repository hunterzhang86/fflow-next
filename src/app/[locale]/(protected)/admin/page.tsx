import { redirect } from "next/navigation";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import AdminPageClient from './page-client';

export const metadata = constructMetadata({
  title: "Admin – FFlow Next",
  description: "Admin page for only admin management.",
});

export default async function AdminPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const user = await getCurrentUser();
  if (!user || user.role as string !== "ADMIN") redirect("/login");

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <AdminPageClient />
    </NextIntlClientProvider>
  );
}
