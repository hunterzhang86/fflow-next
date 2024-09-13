"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

interface QuotaData {
  [resourceType: string]: {
    totalQuota: number;
    usedQuota: number;
  };
}

export default function QuotaPageClient({ locale }: { locale: string }) {
  const t = useTranslations("QuotaPage");

  const [quotaData, setQuotaData] = useState<QuotaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotaData();
  }, []);

  async function fetchQuotaData() {
    try {
      setLoading(true);
      const resp = await fetch("/api/quota");
      if (!resp.ok) {
        throw new Error("Failed to fetch quota data");
      }
      const respJson = await resp.json();
      setQuotaData(respJson.data);
    } catch (error) {
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!quotaData || Object.keys(quotaData).length === 0) {
    return (
      <>
        <DashboardHeader
          heading={t("resourceUsageQuota")}
          text={t("monitorResourceUsage")}
        />
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="quota" />
          <EmptyPlaceholder.Title>{t("noQuotaData")}</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {t("noQuotaDataDescription")}
          </EmptyPlaceholder.Description>
          <Button onClick={fetchQuotaData}>{t("refreshQuotaData")}</Button>
        </EmptyPlaceholder>
      </>
    );
  }

  return (
    <>
      <DashboardHeader
        heading={t("resourceUsageQuota")}
        text={t("monitorResourceUsage")}
      />
      {Object.entries(quotaData).map(([resourceType, quota]) => (
        <div key={resourceType} className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">
            {t(`resourceTypes.${resourceType}`)}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t("totalQuota")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{quota.totalQuota}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("usedQuota")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{quota.usedQuota}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t("remainingQuota")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {quota.totalQuota - quota.usedQuota}
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t("usageProgress")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={(quota.usedQuota / quota.totalQuota) * 100}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500">
                {t("percentUsed", {
                  percent: ((quota.usedQuota / quota.totalQuota) * 100).toFixed(
                    2,
                  ),
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}
