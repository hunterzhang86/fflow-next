import Image from "next/image";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import Link from "@/components/link/link";
import { ComparePlans } from "@/components/pricing/compare-plans";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";

export const metadata = constructMetadata({
  title: "Pricing - FFlow Next",
  description: "Explore our subscription plans.",
});

export default async function PricingPage({ params: { locale } }) {
  const t = await getTranslations("PricingPage");
  const messages = await getMessages({ locale });

  const user = await getCurrentUser();

  if ((user?.role as string) === "ADMIN") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">{t("seriously")}</h1>
        <Image
          src="/_static/illustrations/call-waiting.svg"
          alt="403"
          width={560}
          height={560}
          className="pointer-events-none -my-20 dark:invert"
        />
        <p className="text-balance px-4 text-center text-2xl font-medium">
          {t("youare")} {user?.role as string}. {t("backto")}
          <Link
            href={`/admin`}
            className="text-muted-foreground underline underline-offset-4 hover:text-purple-500"
          >
            {t("dashboard")}
          </Link>
          .
        </p>
      </div>
    );
  }

  let subscriptionPlan;
  if (user && user.id) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <NextIntlClientProvider messages={messages}>
        <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
        <hr className="container" />
        <ComparePlans />
        <PricingFaq />
      </NextIntlClientProvider>
    </div>
  );
}
