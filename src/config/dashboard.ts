import { UserRole, SidebarNavItem } from "@/types/index";
import { useTranslations } from 'next-intl';

export const getSidebarLinks = (t: ReturnType<typeof useTranslations>): SidebarNavItem[] => [
  {
    title: t('menu'),
    items: [
      {
        href: `/admin`,
        icon: "laptop",
        title: t('adminPanel'),
        authorizeOnly: UserRole.ADMIN,
      },
      { href: `/dashboard`, icon: "dashboard", title: t('dashboard') },
      {
        href: `/dashboard/billing`,
        icon: "billing",
        title: t('billing'),
        authorizeOnly: UserRole.USER,
      },
      { href: `/dashboard/charts`, icon: "lineChart", title: t('charts') },
      { href: `/dashboard/chat`, icon: "bot", title: t('chatBot') },
      { href: `/dashboard/apikeys`, icon: "apiKeys", title: t('apiKeys') },
      { href: `/dashboard/quota`, icon: "quota", title: t('quota') },
      {
        href: `/admin/orders`,
        icon: "package",
        title: t('orders'),
        badge: 2,
        authorizeOnly: UserRole.ADMIN,
      },
      {
        href: `#/dashboard/posts`,
        icon: "post",
        title: t('userPosts'),
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
  {
    title: t('options'),
    items: [
      { href: `/dashboard/settings`, icon: "settings", title: t('settings') },
      { href: `/`, icon: "home", title: t('homepage') },
      { href: `/docs`, icon: "bookOpen", title: t('documentation') },
      {
        href: "#",
        icon: "messages",
        title: t('support'),
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
