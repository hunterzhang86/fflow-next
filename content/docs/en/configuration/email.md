---
title: Email
description: How to manage emails in this project.
---

The magic-link feature with Resend works with Auth.js v5! <br />
You can use it in your local environment and in your own production setup.


However, you can't test it on this demo app because I don't want to use the
premium Resend plan for this demo.

## Steps

The email part is similar at the [resend](https://resend.com/) documentation.
You can find the official documentation
[here](https://authjs.dev/getting-started/installation#setup-environment) if
you want.

### Create an account

If don't have an account on Resend, just follow their steps after signup [here](https://resend.com/signup).

### Create an API key

After signin on Resend, he propurse you to create your first API key.

Copy/paste in your `.env` file.

```js
RESEND_API_KEY = re_your_resend_api_key;
```