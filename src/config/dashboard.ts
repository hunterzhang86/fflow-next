import { UserRole, SidebarNavItem } from "@/types/index";

export const getSidebarLinks = (locale: string): SidebarNavItem[] => [
  {
    title: "MENU",
    items: [
      {
        href: `/${locale}/admin`,
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: UserRole.ADMIN,
      },
      { href: `/${locale}/dashboard`, icon: "dashboard", title: "Dashboard" },
      {
        href: `/${locale}/dashboard/billing`,
        icon: "billing",
        title: "Billing",
        authorizeOnly: UserRole.USER,
      },
      { href: `/${locale}/dashboard/charts`, icon: "lineChart", title: "Charts" },
      { href: `/${locale}/dashboard/chat`, icon: "bot", title: "Chat Bot" },
      { href: `/${locale}/dashboard/apikeys`, icon: "apiKeys", title: "API Keys" },
      {
        href: `/${locale}/admin/orders`,
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: `#/${locale}/dashboard/posts`,
        icon: "post",
        title: "User Posts",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: `/${locale}/dashboard/settings`, icon: "settings", title: "Settings" },
      { href: `/${locale}`, icon: "home", title: "Homepage" },
      { href: `/${locale}/docs`, icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
