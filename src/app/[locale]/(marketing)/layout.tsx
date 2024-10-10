import { unstable_setRequestLocale } from "next-intl/server";

import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getMarketingConfig } from "@/config/marketing";
import { useTranslations } from "next-intl";
import { getDocsConfig } from "@/config/docs";
import { GoogleAnalytics } from '@next/third-parties/google'

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function MarketingLayout({
  children,
  params: { locale },
}: MarketingLayoutProps) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();
  const marketingConfig = getMarketingConfig(t);
  const docsConfig = getDocsConfig(t);

  const translations = {
    adminPanel: t('Dashboard.sidebar.adminPanel'),
    dashboard: t('Dashboard.sidebar.dashboard'),
    login: t('Marketing.login'),
    signUp: t('Marketing.signUp'),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''} />
      <NavMobile marketingConfig={marketingConfig} docsConfig={docsConfig} translations={translations} />
      <NavBar scroll={true} marketingConfig={marketingConfig} docsConfig={docsConfig} translations={translations} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
