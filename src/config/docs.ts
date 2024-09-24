import { DocsConfig } from "@/types";

export const getDocsConfig = (t: (key: string) => string): DocsConfig => ({
  mainNav: [
    {
      title: t("Docs.mainNav.documentation"),
      href: "/docs",
    },
    {
      title: t("Docs.mainNav.guides"),
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: t("Docs.sidebarNav.gettingStarted"),
      items: [
        {
          title: t("Docs.sidebarNav.introduction"),
          href: "/docs",
        },
        {
          title: t("Docs.sidebarNav.installation"),
          href: "/docs/installation",
        },
      ],
    },
    {
      title: t("Docs.sidebarNav.configuration"),
      items: [
        {
          title: t("Docs.sidebarNav.authentification"),
          href: "/docs/configuration/authentification",
        },
        {
          title: t("Docs.sidebarNav.blog"),
          href: "/docs/configuration/blog",
        },
        {
          title: t("Docs.sidebarNav.components"),
          href: "/docs/configuration/components",
        },
        {
          title: t("Docs.sidebarNav.configFiles"),
          href: "/docs/configuration/config-files",
        },
        {
          title: t("Docs.sidebarNav.database"),
          href: "/docs/configuration/database",
        },
        {
          title: t("Docs.sidebarNav.email"),
          href: "/docs/configuration/email",
        },
        {
          title: t("Docs.sidebarNav.layouts"),
          href: "/docs/configuration/layouts",
        },
        {
          title: t("Docs.sidebarNav.markdownFiles"),
          href: "/docs/configuration/markdown-files",
        },
        {
          title: t("Docs.sidebarNav.subscriptions"),
          href: "/docs/configuration/subscriptions",
        },
      ],
    },
  ],
});