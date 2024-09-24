import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import { NavMobile } from "@/components/layout/mobile-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDocsConfig } from "@/config/docs";
import { getMarketingConfig } from "@/config/marketing";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from 'next-intl/server';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function DocsLayout({ children, params: {locale}}: DocsLayoutProps) {
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
    <>
      <NavMobile marketingConfig={marketingConfig} docsConfig={docsConfig} translations={translations} />
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSidebarNav />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </>
  );
}
