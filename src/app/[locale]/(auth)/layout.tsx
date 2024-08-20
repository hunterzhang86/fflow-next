import { redirect } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

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
    if ((user.role as string) === "ADMIN") redirect("/admin");
    redirect("/dashboard");
  }

  return <div className="min-h-screen">{children}</div>;
}
