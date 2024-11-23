import { Suspense } from "react";
import { Metadata } from "next";
import Link from "@/components/link/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/forms/user-auth-form";
import { Icons } from "@/components/shared/icons";
import { useLocale, useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");
  const locale = useLocale();

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        {t("login")}
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("createAccount")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("enterEmailToCreateAccount")}
            </p>
          </div>
          <Suspense>
            <UserAuthForm />
          </Suspense>
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("byClickingContinue")}{" "}
            <Link href="/terms" className="hover:text-brand underline underline-offset-4">
              {t("termsOfService")}
            </Link>{" "}
            {t("and")}{" "}
            <Link href="/privacy" className="hover:text-brand underline underline-offset-4">
              {t("privacyPolicy")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
