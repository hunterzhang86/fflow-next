import { allGuides } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";

import { formatDate } from "@/lib/utils";
import { DocsPageHeader } from "@/components/docs/page-header";
import Link from "@/components/link/link";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export const metadata = {
  title: "Guides",
  description:
    "This section includes end-to-end guides for developing Next.js 13 apps.",
};

function transformPath(path: string, locale: string): string {
  return path.replace(`/${locale}`, "");
}

export default async function GuidesPage() {
  const t = await getTranslations("Guides");
  const locale = await getLocale();
  const guides = allGuides
    .filter((guide) => guide.published)
    .filter((guide) => {
      return guide._raw.sourceFileDir === "guides/" + locale;
    })
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <MaxWidthWrapper className="py-6 lg:py-10">
      <DocsPageHeader heading={t("title")} text={t("description")} />
      {guides?.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
          {guides.map((guide) => (
            <article
              key={guide._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              {guide.featured && (
                <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
                  {t("featured")}
                </span>
              )}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {guide.title}
                  </h2>
                  {guide.description && (
                    <p className="text-muted-foreground">{guide.description}</p>
                  )}
                </div>
                {guide.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(guide.date)}
                  </p>
                )}
              </div>
              <Link
                href={transformPath(guide.slug, locale)}
                className="absolute inset-0"
              >
                <span className="sr-only">{t("view")}</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>{t("noGuides")}</p>
      )}
    </MaxWidthWrapper>
  );
}
