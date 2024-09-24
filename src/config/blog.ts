import { useTranslations } from 'next-intl';

export const getBlogCategories = (t: ReturnType<typeof useTranslations>) => [
  {
    title: t('BlogPage.news.title'),
    slug: "news",
    description: t('BlogPage.news.description'),
  },
  {
    title: t('BlogPage.education.title'),
    slug: "education",
    description: t('BlogPage.education.description'),
  },
];

export const getBlogAuthors = (t: ReturnType<typeof useTranslations>) => ({
  mickasmt: {
    name: t('BlogPage.authors.mickasmt.name'),
    image: "/_static/avatars/mickasmt.png",
    twitter: "miickasmt",
  },
  shadcn: {
    name: t('BlogPage.authors.shadcn.name'),
    image: "/_static/avatars/shadcn.jpeg",
    twitter: "shadcn",
  },
});

export const BLOG_CATEGORIES: {
  title: string;
  slug: "news" | "education";
  description: string;
}[] = [
  {
    title: "News",
    slug: "news",
    description: "Updates and announcements from Next FFlow Next.",
  },
  {
    title: "Education",
    slug: "education",
    description: "Educational content about SaaS management.",
  },
];

export const BLOG_AUTHORS = {
  mickasmt: {
    name: "mickasmt",
    image: "/_static/avatars/mickasmt.png",
    twitter: "miickasmt",
  },
  shadcn: {
    name: "shadcn",
    image: "/_static/avatars/shadcn.jpeg",
    twitter: "shadcn",
  },
};
