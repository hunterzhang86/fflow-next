"use client";

import { useTranslations } from "next-intl";

import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export default function DashboardPageClient({
  locale,
  user,
}: {
  locale: string;
  user: any;
}) {
  const t = useTranslations("Dashboard.main");

  return (
    <>
      <DashboardHeader
        heading={t("heading")}
        text={t("currentRole", { role: user?.role })}
      />
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>{t("noContentTitle")}</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          {t("noContentDescription")}
        </EmptyPlaceholder.Description>
        <Button>{t("addContent")}</Button>
      </EmptyPlaceholder>
    </>
  );
}
