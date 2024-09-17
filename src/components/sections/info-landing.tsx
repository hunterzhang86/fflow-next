import { infos } from "@/config/landing";
import { InfoLdg } from "@/types";
import { useTranslations } from "next-intl";
import InfoLandingClient from "./info-landing-client";

export default function InfoLanding({ locale }: { locale: string }) {
  const t = useTranslations("InfoLanding");

  const translatedInfos: InfoLdg[] = infos.map((info) => ({
    ...info,
    title: t(`${info.title}.title`),
    description: t(`${info.title}.description`),
    list: info.list.map((item) => ({
      ...item,
      title: t(`${info.title}.list.${item.title}.title`),
      description: t(`${info.title}.list.${item.title}.description`),
    })),
  }));

  return <InfoLandingClient data={translatedInfos} />;
}