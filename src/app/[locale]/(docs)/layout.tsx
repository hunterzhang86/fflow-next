import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import {unstable_setRequestLocale} from 'next-intl/server';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function DocsLayout({ children, params: {locale} }: DocsLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <NavMobile />
      <NavBar />
      <MaxWidthWrapper className="min-h-screen" large>
        {children}
      </MaxWidthWrapper>
      <SiteFooter className="border-t" />
    </div>
  );
}
