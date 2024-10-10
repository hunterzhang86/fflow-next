import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { useTranslations } from "next-intl";

export default function DashboardBillingLoading() {
  const t = useTranslations("BillingPage");

  return (
    <>
      <DashboardHeader
        heading={t("heading")}
        text={t("subheading")}
      />
      <div className="grid gap-8">
        <Skeleton className="h-28 w-full rounded-lg md:h-24" />
        <CardSkeleton />
      </div>
    </>
  );
}
