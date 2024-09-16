"use client";

import { useTranslations } from "next-intl";
import { Users, CreditCard, DollarSign, Activity } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/header";
import InfoCard from "@/components/dashboard/info-card";
import TransactionsList from "@/components/dashboard/transactions-list";

export default function AdminPageClient() {
  const t = useTranslations("AdminPage");

  const infoCards = [
    { title: t("infoCards.subscriptions"), icon: Users, value: "+2350", description: t("infoCards.subscriptionsDesc") },
    { title: t("infoCards.revenue"), icon: DollarSign, value: "$45,231.89", description: t("infoCards.revenueDesc") },
    { title: t("infoCards.transactions"), icon: CreditCard, value: "+12,234", description: t("infoCards.transactionsDesc") },
    { title: t("infoCards.activeUsers"), icon: Activity, value: "+573", description: t("infoCards.activeUsersDesc") },
  ];

  return (
    <>
      <DashboardHeader
        heading={t("heading")}
        text={t("subheading")}
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {infoCards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>
        <TransactionsList />
      </div>
    </>
  );
}