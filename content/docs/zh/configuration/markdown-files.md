---
title: Markdown 文件
description: 博客和文档是如何工作的。
---

该项目包含一个使用 [Contentlayer](https://contentlayer.dev/) 和 [MDX](https://mdxjs.com/) 构建的博客和文档。

## Contentlayer

Contentlayer 是一个基于 Markdown 的灵活可扩展的内容管理系统。它允许你使用 Markdown 文件组织内容,并提供了一个简单的 API 来在你的应用中访问数据。

你可以使用 Contentlayer 为各种内容类型(如博客文章、文档和页面)创建可重用的数据模型。

Markdown 文件中的 Frontmatter 允许你定义元数据,如标题、描述、作者和图片,从而简化内容管理。

### contentlayer.config.js

以下是一个 `contentlayer.config.js` 文件的示例,用于在你的项目中配置 Contentlayer:

```typescript title="contentlayer.config.js"
import { defineDocumentType, makeSource } from "contentlayer/source-files";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}));

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: `guides/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Page, Doc, Guide, Post],
  mdx: {},
});
```

这个文件配置 Contentlayer 在指定的目录中查找 Markdown 文件(`content/blog`, `content/authors`, `content/docs`, `content/guides`, `content/pages`)。它还定义了你在项目中使用的不同文档类型,以及与每种文档类型相关的字段。

你可以根据项目需求自定义此文件,通过添加新的文档类型或根据特定要求调整现有字段。

## Frontmatters

以下是每个部分可用的所有 frontmatters 列表:

<Steps>

### 作者

```md
---
title: noone
avatar: /_static/avatars/noone.jpg
twitter: hunterzhang86
---
```

### 博客

```md
---
title: 部署 Next.js 应用
description: 如何在 Vercel 上部署你的 Next.js 应用。
image: /_static/blog/blog-post-3.jpg
date: "2023-01-02"
authors:
  - noone
---
```

### 文档

```md
---
title: 数据库
description: 如何配置你的 Neon 数据库。
---
```

### 指南

```md
---
title: 使用 ContentLayer 和 MDX 构建博客。
description: 学习如何使用 ContentLayer 和 Next.js 构建博客
date: 2022-11-18
---
```

### 页面

```md
---
title
```

</Steps>
