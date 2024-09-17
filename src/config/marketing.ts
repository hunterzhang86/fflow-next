import { MarketingConfig } from "@/types"

export const getMarketingConfig = (t: (key: string) => string): MarketingConfig => ({
  mainNav: [
    {
      title: t('Marketing.nav.pricing'),
      href: `/pricing`,
    },
    {
      title: t('Marketing.nav.blog'),
      href: `/blog`,
    },
    {
      title: t('Marketing.nav.documentation'),
      href: `/docs`,
    },
  ],
});