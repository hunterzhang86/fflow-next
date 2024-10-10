import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";
import { useTranslations } from "next-intl";

export default function AdminPanelLoading() {
  const t = useTranslations("AdminPage");

  return (
    <>
      <DashboardHeader
        heading={t("heading")}
        text={t("subheading")}
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <Skeleton className="h-[500px] w-full rounded-lg" />
        <Skeleton className="h-[500px] w-full rounded-lg" />
      </div>
    </>
  );
}
