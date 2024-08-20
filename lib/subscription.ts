import { pricingData } from "@/config/subscriptions";
import { stripe } from "@/lib/stripe";
import { UserSubscriptionPlan } from "@/types";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  if(!userId) throw new Error("Missing parameters");

  const usersArray = await db.select({
    stripeSubscriptionId: users.stripeSubscriptionId,
    stripeCurrentPeriodEnd: users.stripeCurrentPeriodEnd,
    stripeCustomerId: users.stripeCustomerId,
    stripePriceId: users.stripePriceId,
  }).from(users).where(eq(users.id, userId)).limit(1);

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
