import { DashboardHeader } from "@/components/dashboard/header";
import { useTranslations } from "next-intl";

export default function APIKeysLoading() {
  const t = useTranslations("APIKeysPage");
  return (
    <>
      <DashboardHeader heading={t("heading")} text={t("subheading")} />
    </>
  );
}
