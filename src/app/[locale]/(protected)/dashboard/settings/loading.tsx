import { DashboardHeader } from "@/components/dashboard/header";
import { SkeletonSection } from "@/components/shared/section-skeleton";
import { useTranslations } from "next-intl";

export default function DashboardSettingsLoading() {
  const t = useTranslations("Settings");
  return (
    <>
      <DashboardHeader
        heading={t("heading")}
        text={t("subheading")}
      />
      <div className="divide-y divide-muted pb-10">
        <SkeletonSection />
        <SkeletonSection />
        <SkeletonSection card />
      </div>
    </>
  );
}
