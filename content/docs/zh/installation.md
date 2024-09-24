---
title: 安装
description: 如何安装项目。
---

### 创建项目

首先使用 `create-next-app` 创建一个新的 Next.js 项目：

```bash
npx create-next-app my-saas-project --example "https://github.com/hunterzhang86/fflow-next"
```

或者使用 Vercel 部署：

[![使用 Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhunterzhang86%2Ffflow-next)

这是创建你的仓库的好方法，但部署会失败，因为你需要在项目中本地添加环境变量。请按照文档进行操作。

### 安装依赖

进入文件夹并为你的项目安装依赖：

```bash
cd my-saas-project
pnpm install
```

### 创建 `.env` 文件

将 `.env.example` 复制/粘贴到 `.env` 文件中：

```md title=".env"
NEXT_PUBLIC_APP_URL=http://localhost:3000

AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_OAUTH_TOKEN=

DATABASE_URL=

RESEND_API_KEY=
EMAIL_FROM=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID=
NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID=
NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID=
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID=
```

### 配置部分

在使用 `pnpm run dev` 之前，让我们检查配置部分以更新所有环境变量。
