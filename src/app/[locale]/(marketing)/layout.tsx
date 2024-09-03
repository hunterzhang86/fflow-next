import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { NavMobile } from "@/components/layout/mobile-nav";
import {unstable_setRequestLocale} from 'next-intl/server';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function MarketingLayout({ children, params: {locale} }: MarketingLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile params={{ locale }} />
      <NavBar scroll={true} params={{ locale }} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
