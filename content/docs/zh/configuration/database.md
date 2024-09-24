---
title: 数据库
description: 如何配置你的 Neon 数据库。
---

这个项目最初使用的是类似 PlanetScale 的数据库。但是最近免费套餐已被取消。

目前,本项目使用 **Neon** 的免费计划。查看他们的[定价页面](https://neon.tech/pricing)以获取更多信息。

## 步骤

### 创建 Neon 账户

如果你还没有 Neon 账户,只需按照[这里](https://neon.tech/docs/get-started-with-neon/signing-up)的步骤创建一个。

### 复制数据库 URL

在 Neon 上创建项目后,你可以复制数据库 URL。从列表中选择 `Prisma`,然后选择 `env` 标签。

<Callout type="warning">
  <b>别忘了</b>使用眼睛图标显示隐藏在星号后面的信息。在深色模式下这个图标不太明显。
</Callout>

将其粘贴到你的 `.env` 文件中。

```js
DATABASE_URL = "postgres://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/dbname";
```

### 推送迁移

你可以使用命令行工具将迁移推送到你的数据库。

```bash
npx prisma db push
```
