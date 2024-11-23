import { useTranslations } from "next-intl";

import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLoading() {
  const t = useTranslations("Dashboard.main");

  return (
    <>
      <DashboardHeader heading={t("heading")} text={t("loadingCurrentRole")} />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
