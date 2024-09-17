import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { infos } from "@/config/landing";
import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");

  return (
    <main>
      <HeroLanding locale={locale} />
      <PreviewLanding />
      <Powered locale={locale} />
      <BentoGrid locale={locale} />
      <InfoLanding locale={locale} />
      <Features />
      <Testimonials locale={locale} />
    </main>
  );
}
