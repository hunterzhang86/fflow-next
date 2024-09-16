import { redirect } from "next/navigation";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider, useTranslations } from 'next-intl';

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export const metadata = constructMetadata({
  title: "Orders – FFlow Next",
  description: "Check and manage your latest orders.",
});

function OrdersPageClient() {
  const t = useTranslations("AdminPage.ordersPage");

  return (
    <>
      <DashboardHeader
        heading={t("heading")}
        text={t("subheading")}
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="package" />
        <EmptyPlaceholder.Title>{t("emptyTitle")}</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          {t("emptyDescription")}
        </EmptyPlaceholder.Description>
        <Button>{t("buyProducts")}</Button>
      </EmptyPlaceholder>
    </>
  );
}

export default async function OrdersPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  // const user = await getCurrentUser();
  // if (!user || user.role !== "ADMIN") redirect("/login");

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <OrdersPageClient />
    </NextIntlClientProvider>
  );
}
