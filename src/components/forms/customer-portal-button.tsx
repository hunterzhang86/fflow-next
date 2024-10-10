"use client";

import { useTransition } from "react";
import { openCustomerPortal } from "@/actions/open-customer-portal";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { useTranslations } from "next-intl";

interface CustomerPortalButtonProps {
  userStripeId: string;
}

export function CustomerPortalButton({
  userStripeId,
}: CustomerPortalButtonProps) {
  const t = useTranslations("CustomerPortalButton");

  let [isPending, startTransition] = useTransition();
  const generateUserStripeSession = openCustomerPortal.bind(null, userStripeId);

  const stripeSessionAction = () =>
    startTransition(async () => await generateUserStripeSession());

  return (
    <Button disabled={isPending} onClick={stripeSessionAction}>
      {isPending ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : null}
      {t("openCustomerPortal")}
    </Button>
  );
}
