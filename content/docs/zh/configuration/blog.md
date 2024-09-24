---
title: 博客
description: 博客如何处理分类和作者。
---

博客文章可以有多个分类、作者和相关文章。

## 作者

### 创建一个作者

博客文章可以有**一个或多个作者**。<br />添加一个包含**姓名、头像 URL 和 Twitter 账号**的新对象,即可为您的博客添加一个新作者。

```ts title="config/blog.ts" {7-11}
export const BLOG_AUTHORS = {
  mickasmt: {
    name: "mickasmt",
    image: "/_static/avatars/mickasmt.png",
    twitter: "miickasmt",
  },
  newauthor: {
    name: "shadcn",
    image: "/_static/avatars/shadcn.jpeg",
    twitter: "shadcn",
  },
};
```

### 在博客文章中添加

在您的博客文章中这样添加新作者:

```mdx {6-8}
---
title: 部署 Next.js 应用
description: 如何在 Vercel 上部署您的 Next.js 应用。
image: /_static/blog/blog-post-3.jpg
date: "2023-01-02"
authors:
  - newauthor
  - mickasmt
categories:
  - news
related:
  - server-client-components
  - preview-mode-headless-cms
---
```

## 分类

### 创建一个分类

添加一个新对象和一个 slug 来为您的博客添加一个新分类。

```ts title="config/blog.ts" {3,6-10}
export const BLOG_CATEGORIES: {
  title: string;
  slug: "news" | "education";
  description: string;
}[] = [
  {
    title: "新闻",
    slug: "news",
    description: "来自 Next FFlow Next 的更新和公告。",
  },
  {
    title: "教育",
    slug: "education",
    description: "关于 SaaS 管理的教育内容。",
  },
];
```

### 在博客文章中添加

在您的博客文章中这样添加新分类:

```mdx {9-10}
---
title: 部署 Next.js 应用
description: 如何在 Vercel 上部署您的 Next.js 应用。
image: /_static/blog/blog-post-3.jpg
date: "2023-01-02"
authors:
  - newauthor
  - mickasmt
categories:
  - news
related:
  - server-client-components
  - preview-mode-headless-cms
---
```

<Callout type="warning">
  博客文章可以属于多个分类,但目前只显示列表中的第一个分类。
</Callout>

## 相关文章

每篇博客文章可以有一个相关文章列表。<br/>获取您想要的博客文章的文件名,并删除 `.mdx` 或 `.md` 后缀。就这么简单!

```mdx {11-13}
---
title: 部署 Next.js 应用
description: 如何在 Vercel 上部署您的 Next.js 应用。
image: /_static/blog/blog-post-3.jpg
date: "2023-01-02"
authors:
  - newauthor
  - mickasmt
categories:
  - news
related:
  - server-client-components
  - preview-mode-headless-cms
---
```
