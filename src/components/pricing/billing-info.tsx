import Link from "@/components/link/link";
import * as React from "react";

import { CustomerPortalButton } from "@/components/forms/customer-portal-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate, formatDateWithLocale } from "@/lib/utils";
import { UserSubscriptionPlan } from "@/types";
import { useLocale, useTranslations } from "next-intl";

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  userSubscriptionPlan: UserSubscriptionPlan;
}

export function BillingInfo({ userSubscriptionPlan }: BillingInfoProps) {
  const t = useTranslations("BillingPage");
  const locale = useLocale();

  const {
    title,
    description,
    stripeCustomerId,
    isPaid,
    isCanceled,
    stripeCurrentPeriodEnd,
  } = userSubscriptionPlan;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subscriptionPlan")}</CardTitle>
        <CardDescription>
          {t("youAreCurrentlyOnThe")} <strong>{title}</strong> {t("plan")}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-center space-y-2 border-t bg-accent py-2 md:flex-row md:justify-between md:space-y-0">
        {isPaid ? (
          <p className="text-sm font-medium text-muted-foreground">
            {isCanceled
              ? t("willBeCanceledOnPrefix") + " " + formatDateWithLocale(locale, stripeCurrentPeriodEnd as string | number) + " " + t("willBeCanceledOnSuffix")
              : t("willRenewOnPrefix") + " " + formatDateWithLocale(locale, stripeCurrentPeriodEnd as string | number) + " " + t("willRenewOnSuffix")} 
          </p>
        ) : null}

        {isPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="/pricing" className={cn(buttonVariants())}>
            {t("choosePlan")}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
