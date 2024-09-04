import { MarketingConfig } from "@/types"

export const getMarketingConfig = (locale: string): MarketingConfig => ({
  mainNav: [
    {
      title: "Pricing",
      href: `/pricing`,
    },
    {
      title: "Blog",
      href: `/blog`,
    },
    {
      title: "Documentation",
      href: `/docs`,
    },
  ],
});