---
title: 配置文件
description: 通过配置文件来个性化定制。
---

`config` 文件夹包含了各种可以根据您的需求进行自定义的文件。

## 文件列表

以下是可用的配置文件列表:

<Steps>

### 首页

在 `landing.ts` 中,您可以找到首页不同部分的数据配置。

所有首页组件都在 `components/sections` 文件夹中。

### 导航

`marketing.ts`、`dashboard.ts` 和 `docs.ts` 包含了针对各自部分定制的配置链接。

### 网站

在 `site.ts` 中,您可以轻松管理元数据和页脚链接。

### 订阅

`subscriptions.ts` 包含了配置定价卡片所需的所有数据。

以下是定价卡片的结构:

```js
{
  title: 'Pro',
  description: 'Unlock Advanced Features',
  benefits: [
    'Up to 500 monthly posts',
    'Advanced analytics and reporting',
    'Access to business templates',
    'Priority customer support',
    'Exclusive webinars and training.',
  ],
  limitations: [
    'No custom branding',
    'Limited access to business resources.',
  ],
  prices: {
    monthly: 15,
    yearly: 144,
  },
  stripeIds: {
    monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
  },
},
```

</Steps>
