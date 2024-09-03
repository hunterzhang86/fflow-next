import { MarketingConfig } from "@/types"

export const getMarketingConfig = (locale: string): MarketingConfig => ({
  mainNav: [
    {
      title: "Pricing",
      href: `/${locale}/pricing`,
    },
    {
      title: "Blog",
      href: `/${locale}/blog`,
    },
    {
      title: "Documentation",
      href: `/${locale}/docs`,
    },
  ],
});