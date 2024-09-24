import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = ["item1", "item2", "item3", "item4", "item5"];

export function PricingFaq() {
  const tFaq = useTranslations("PricingPage.faq");
  const tFaqItems = useTranslations("PricingPage.faqItems");
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label={tFaq("label")}
        title={tFaq("title")}
        subtitle={tFaq("subtitle")}
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem} value={faqItem}>
            <AccordionTrigger>
              {tFaqItems(`${faqItem}.question`)}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {tFaqItems(`${faqItem}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
