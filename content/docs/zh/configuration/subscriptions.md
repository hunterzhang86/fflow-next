---
title: 订阅
description: 如何使用 Stripe 管理订阅。
---

<Callout type="warning" twClass="mt-0">
  要完成本指南，您需要在 [Stripe](https://stripe.com/) 上创建一个账户。
</Callout>

## 配置

### 创建项目

登录后，在 Stripe 上创建一个项目。

### 获取 Stripe API 密钥

在"开发者"模式下，转到"API 密钥"并复制密钥。

将其粘贴到您的 `.env` 文件中。

```js
STRIPE_API_KEY = sk_your_secret_key
```

### 设置 Stripe Webhook

创建一个 webhook 来管理您应用程序中的 Stripe 事件。

1. **创建 Webhook 端点：** 转到您的 Stripe 仪表板，导航至"开发者" > "Webhooks"。点击"添加端点"以创建新的 webhook。
2. **配置 Webhook：** 输入 Stripe 将发送事件的端点 URL。此 URL 应指向您应用程序中可以处理 Stripe webhook 事件的路由。

3. **选择事件：** 选择您想接收通知的事件。
   常见事件包括 `checkout.session.completed`、`customer.subscription.updated`、`invoice.payment_succeeded` 等。

4. **获取 Webhook 签名密钥：** 设置 webhook 后，Stripe 将生成一个签名密钥。复制此密钥并将其粘贴到您的 `.env` 文件中，作为 `STRIPE_WEBHOOK_SECRET`。

```js
STRIPE_WEBHOOK_SECRET = whsec_your_secret_webhook
```

### 创建价格卡

创建价格卡以获取月度和年度计划的价格 ID。

1. **导航至产品：** 在您的 Stripe 仪表板中，转到"产品" > "创建产品"。输入您的订阅产品的详细信息，如名称、描述和定价。

2. **创建定价计划：** 创建产品后，转到"定价"部分并点击"添加定价计划"。设置您的定价计划的详细信息，包括金额、货币、计费间隔（月度或年度）以及任何其他相关信息。

3. **获取价格 ID：** 创建定价计划后，Stripe 将为每个计划生成唯一的价格 ID。这些 ID 用于在创建订阅时识别特定的定价计划。复制月度和年度计划的价格 ID，并将它们粘贴到您的 `.env` 文件中，如下所示：

```js
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID = price_FaKeId
NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID = price_FaKeId

NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID = price_FaKeId
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID = price_FaKeId
```

确保将 `price_FaKeId` 替换为 Stripe 为您的定价计划生成的实际价格 ID。

<Callout type="warning">
  不要忘记在 `config/subscriptions.ts` 中更改价格。
</Callout>
