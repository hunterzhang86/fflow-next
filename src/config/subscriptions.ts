import { PlansRow, QuotaResourceType, SubscriptionPlan } from "@/types/index";
import { env } from "@/env.mjs";
import { useTranslations } from 'next-intl';

export const getPricingData = (t: ReturnType<typeof useTranslations>): SubscriptionPlan[] => [
  {
    title: t('PricingPage.starter.title'),
    description: t('PricingPage.starter.description'),
    benefits: [
      t('PricingPage.starter.benefit1'),
      t('PricingPage.starter.benefit2'),
      t('PricingPage.starter.benefit3'),
    ],
    limitations: [
      t('PricingPage.starter.limitation1'),
      t('PricingPage.starter.limitation2'),
      t('PricingPage.starter.limitation3'),
      t('PricingPage.starter.limitation4'),
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
    quotas: [
      { type: QuotaResourceType.API_CALLS, totalQuota: 5000, usedQuota: 0 },
      { type: QuotaResourceType.STORAGE, totalQuota: 50, usedQuota: 0 },
      { type: QuotaResourceType.EXPORTS, totalQuota: 50, usedQuota: 0 },
      { type: QuotaResourceType.TEAM_MEMBERS, totalQuota: 5, usedQuota: 0 },
    ],
  },
  {
    title: t('PricingPage.pro.title'),
    description: t('PricingPage.pro.description'),
    benefits: [
      t('PricingPage.pro.benefit1'),
      t('PricingPage.pro.benefit2'),
      t('PricingPage.pro.benefit3'),
      t('PricingPage.pro.benefit4'),
      t('PricingPage.pro.benefit5'),
    ],
    limitations: [
      t('PricingPage.pro.limitation1'),
      t('PricingPage.pro.limitation2'),
    ],
    prices: {
      monthly: 15,
      yearly: 144,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
    quotas: [
      { type: QuotaResourceType.API_CALLS, totalQuota: 10000, usedQuota: 0 },
      { type: QuotaResourceType.STORAGE, totalQuota: 100, usedQuota: 0 },
      { type: QuotaResourceType.EXPORTS, totalQuota: 100, usedQuota: 0 },
      { type: QuotaResourceType.TEAM_MEMBERS, totalQuota: 50, usedQuota: 0 },
    ],
  },
  {
    title: t('PricingPage.business.title'),
    description: t('PricingPage.business.description'),
    benefits: [
      t('PricingPage.business.benefit1'),
      t('PricingPage.business.benefit2'),
      t('PricingPage.business.benefit3'),
      t('PricingPage.business.benefit4'),
      t('PricingPage.business.benefit5'),
    ],
    limitations: [],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
    quotas: [
      { type: QuotaResourceType.API_CALLS, totalQuota: 100000, usedQuota: 0 },
      { type: QuotaResourceType.STORAGE, totalQuota: 1000, usedQuota: 0 },
      { type: QuotaResourceType.EXPORTS, totalQuota: 1000, usedQuota: 0 },
      { type: QuotaResourceType.TEAM_MEMBERS, totalQuota: 500, usedQuota: 0 },
    ],
  },
];

export const plansColumns = [
  "starter",
  "pro",
  "business",
  "enterprise",
] as const;

export const getComparePlans = (t: ReturnType<typeof useTranslations>): PlansRow[] => [
  {
    feature: t('PricingPage.features.analytics'),
    starter: true,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.custom'),
    tooltip: t('PricingPage.tooltips.analytics'),
  },
  {
    feature: t('PricingPage.features.branding'),
    starter: null,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.unlimited'),
    tooltip: t('PricingPage.tooltips.branding'),
  },
  {
    feature: t('PricingPage.features.support'),
    starter: null,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.support247'),
  },
  {
    feature: t('PricingPage.features.reporting'),
    starter: null,
    pro: null,
    business: true,
    enterprise: t('PricingPage.features.custom'),
    tooltip: t('PricingPage.tooltips.reporting'),
  },
  {
    feature: t('PricingPage.features.manager'),
    starter: null,
    pro: null,
    business: null,
    enterprise: t('PricingPage.features.available'),
    tooltip: t('PricingPage.tooltips.manager'),
  },
  {
    feature: t('PricingPage.features.apiAccess'),
    starter: false,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.full'),
  },
  {
    feature: t('PricingPage.features.webinars'),
    starter: false,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.custom'),
    tooltip: t('PricingPage.tooltips.webinars'),
  },
  {
    feature: t('PricingPage.features.integrations'),
    starter: false,
    pro: false,
    business: true,
    enterprise: t('PricingPage.features.available'),
    tooltip: t('PricingPage.tooltips.integrations'),
  },
  {
    feature: t('PricingPage.features.roles'),
    starter: null,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.advanced'),
    tooltip: t('PricingPage.tooltips.roles'),
  },
  {
    feature: t('PricingPage.features.onboarding'),
    starter: false,
    pro: true,
    business: true,
    enterprise: t('PricingPage.features.fullService'),
    tooltip: t('PricingPage.tooltips.onboarding'),
  },
  // Add more rows as needed
];
