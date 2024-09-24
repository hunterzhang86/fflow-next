---
title: 身份验证
description: 如何配置身份验证。
---

身份验证部分与 [authjs](https://authjs.dev/) 文档类似。
如果您愿意,可以参考官方文档
[这里](https://authjs.dev/getting-started/installation#setup-environment)。

升级到 Auth.js v5 后: `NEXTAUTH_URL` 已从 `.env` 文件中移除。在**生产环境**中也是如此。

## 更新 auth_secret 变量

唯一必需的环境变量是 `AUTH_SECRET`。这是一个随机值,用于加密令牌和电子邮件验证哈希。您可以通过运行以下命令生成一个:

```bash
npx auth secret
```

或者,您可以使用 `openssl` CLI: `openssl rand -base64 33`。

或者使用这个[链接](https://generate-secret.vercel.app/32)生成一个随机密钥。

然后将其添加到您的 `.env` 文件中:

```js title=".env.local"
AUTH_SECRET = secret;
```

## 更新 Google 客户端变量

在本节中,您可以更新这些变量:

```js title=".env.local"
GOOGLE_CLIENT_ID = your_secret_client_id.apps.googleusercontent.com;
GOOGLE_CLIENT_SECRET = your_secret_client;
```

### 视频说明

观看来自 [CodeWithAntonio](https://www.youtube.com/@codewithantonio) 的 YouTube 视频,了解如何为 NextAuth 配置 Google 身份验证的环境变量。

- GoogleAuth **本地**配置在 [3:24:30](https://www.youtube.com/watch?v=1MTyCvS05V4&t=12270s)
- **部署后**更新 GoogleAuth 在 [7:52:31](https://www.youtube.com/watch?v=1MTyCvS05V4&t=12270s)