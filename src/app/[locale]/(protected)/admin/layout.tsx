import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import {unstable_setRequestLocale} from 'next-intl/server';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function Dashboard({ children, params: {locale} }: ProtectedLayoutProps) {
  unstable_setRequestLocale(locale);

  const user = await getCurrentUser();
  if (!user || user.role as string !== "ADMIN") redirect("/login");

  return <>{children}</>;
}
