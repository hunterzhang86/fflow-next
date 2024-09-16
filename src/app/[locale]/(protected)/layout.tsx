import { redirect } from "next/navigation";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import LocaleSwitcher from "@/components/locale/locale-switcher";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { getSidebarLinks } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function Dashboard({
  children,
  params: { locale },
}: ProtectedLayoutProps) {
  unstable_setRequestLocale(locale);

  const user = await getCurrentUser();

  if (!user) redirect(`/${locale}/login`);

  const messages = await getMessages({ locale });
  const t = await getTranslations('Dashboard.sidebar');
  const sidebarLinks = getSidebarLinks(t);
  const filteredLinks = sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(
      ({ authorizeOnly }) => !authorizeOnly || authorizeOnly === user.role,
    ),
  }));

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="relative flex min-h-screen w-full">
        <DashboardSidebar links={filteredLinks} />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
            <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0">
              <MobileSheetSidebar links={filteredLinks} />

              <div className="w-full flex-1">
                <SearchCommand links={filteredLinks} />
              </div>

              <ModeToggle />
              <LocaleSwitcher />
              <UserAccountNav />
            </MaxWidthWrapper>
          </header>

          <main className="flex-1 p-4 xl:px-8">
            <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
              {children}
            </MaxWidthWrapper>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}