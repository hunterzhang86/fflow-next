import { getPricingData } from "@/config/subscriptions";
import { db } from "@/db/db";
import { quotas, users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { UserSubscriptionPlan } from "@/types";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  if (!userId) throw new Error("Missing parameters");

  const t = await getTranslations();
  const pricingData = await getPricingData(t);

  const usersArray = await db.select({
    stripeSubscriptionId: users.stripeSubscriptionId,
    stripeCurrentPeriodEnd: users.stripeCurrentPeriodEnd,
    stripeCustomerId: users.stripeCustomerId,
    stripePriceId: users.stripePriceId,
  }).from(users).where(eq(users.id, userId)).limit(1);

  console.log("The usersArray: ", usersArray);

  const user = usersArray[0];

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a paid plan.
  const isPaid =
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd?.getTime() as number + 86_400_000! > Date.now() ? true : false;

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    pricingData.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ||
    pricingData.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

  const plan = isPaid && userPlan ? userPlan : pricingData[0]

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
        ? "year"
        : null
    : null;

  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime() as number | null,
    isPaid,
    interval,
    isCanceled
  } as UserSubscriptionPlan;
}

export async function updateUserQuota(userId: string, stripePriceId: string) {
  const t = await getTranslations();
  const pricingData = await getPricingData(t);

  const plan = pricingData.find(plan =>
    plan.stripeIds.monthly === stripePriceId || plan.stripeIds.yearly === stripePriceId
  );

  if (!plan) {
    console.error(`No plan found for stripe price id: ${stripePriceId}`);
    return;
  }

  const quotaUpdates = Object.entries(plan.quotas).map(([type, amount]) =>
    db.insert(quotas).values({
      createdAt: new Date(),
      type,
      totalQuota: amount.totalQuota as number,
      usedQuota: 0,
      createdBy: userId as string,
    }).onConflictDoUpdate({
      target: [quotas.createdBy, quotas.type],
      set: {
        totalQuota: amount.totalQuota as number,
        updatedAt: new Date(),
      },
    })
  );

  await Promise.all(quotaUpdates);
}
