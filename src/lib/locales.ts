import { LocalePrefix } from "next-intl/dist/types/src/routing/types";

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const localePrefix: LocalePrefix = 'as-needed';
// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'SaaS Template',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
    { id: 'cn', name: '中文' },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map((locale) => locale.id);

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
});
