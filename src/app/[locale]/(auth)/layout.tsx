import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function AuthLayout({
  children,
  params: { locale },
}: AuthLayoutProps) {
  unstable_setRequestLocale(locale);

  const user = await getCurrentUser();

  if (user) {
    if ((user.role as string) === "ADMIN") redirect(`/${locale}/admin`);
    redirect(`/${locale}/dashboard`);
  }

  return <div className="min-h-screen">{children}</div>;
}
