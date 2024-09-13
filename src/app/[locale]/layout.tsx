import "@/styles/globals.css";
import {unstable_setRequestLocale} from 'next-intl/server';

import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import ModalProvider from "@/components/modals/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export const runtime = 'edge';

const locales = ['en', 'zh'];

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata = constructMetadata();

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function RootLayout({ children, params: {locale}}: RootLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>{children}</ModalProvider>
            <Analytics />
            <Toaster richColors closeButton />
            <TailwindIndicator />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
