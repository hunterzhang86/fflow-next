import Link from "@/components/link/link";
import { Doc } from "contentlayer/generated";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { getDocsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { DocsConfig } from "@/types";
import { useTranslations } from "next-intl";

interface DocsPagerProps {
  doc: Doc
}

export function DocsPager({ doc }: DocsPagerProps) {
  const t = useTranslations();
  const docsConfig = getDocsConfig(t);
  const pager = getPagerForDoc(doc, docsConfig)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 size-4" />
        </Link>
      )}
    </div>
  )
}
export function getPagerForDoc(doc: Doc, docsConfig: DocsConfig) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}

export function flatten(links: { items?}[]) {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link)
  }, [])
}
