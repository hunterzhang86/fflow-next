import { useTranslations } from "next-intl";

import { DashboardHeader } from "@/components/dashboard/header";

export default function QuotaLoading() {
  const t = useTranslations("QuotaPage");
  return (
    <>
      <DashboardHeader
        heading={t("resourceUsageQuota")}
        text={t("monitorResourceUsage")}
      />
    </>
  );
}
