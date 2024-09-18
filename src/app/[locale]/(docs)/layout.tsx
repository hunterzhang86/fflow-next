import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { getMarketingConfig } from "@/config/marketing";
import { useTranslations } from "next-intl";
import {unstable_setRequestLocale} from 'next-intl/server';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function DocsLayout({ children, params: {locale} }: DocsLayoutProps) {
  unstable_setRequestLocale(locale);

  const t = useTranslations();
  const marketingConfig = getMarketingConfig(t);

  const translations = {
    adminPanel: t('Dashboard.sidebar.adminPanel'),
    dashboard: t('Dashboard.sidebar.dashboard'),
    login: t('Marketing.login'),
    signUp: t('Marketing.signUp'),
  };

  return (
    <div className="flex flex-col">
      <NavMobile marketingConfig={marketingConfig} translations={translations} />
      <NavBar marketingConfig={marketingConfig} translations={translations} />
      <MaxWidthWrapper className="min-h-screen" large>
        {children}
      </MaxWidthWrapper>
      <SiteFooter className="border-t" />
    </div>
  );
}
