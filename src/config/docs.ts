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

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Authentification",
          href: "/docs/configuration/authentification",
        },
        {
          title: "Blog",
          href: "/docs/configuration/blog",
        },
        {
          title: "Components",
          href: "/docs/configuration/components",
        },
        {
          title: "Config files",
          href: "/docs/configuration/config-files",
        },
        {
          title: "Database",
          href: "/docs/configuration/database",
        },
        {
          title: "Email",
          href: "/docs/configuration/email",
        },
        {
          title: "Layouts",
          href: "/docs/configuration/layouts",
        },
        {
          title: "Markdown files",
          href: "/docs/configuration/markdown-files",
        },
        {
          title: "Subscriptions",
          href: "/docs/configuration/subscriptions",
        },
      ],
    },
  ],
};
