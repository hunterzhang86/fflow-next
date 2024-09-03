import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
export { auth as authMiddleware } from "@/auth";

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'cn'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export default async function middlewareHandler(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 排除静态资源路径和 API 路径
    const staticFilePattern = /^\/(_next\/|_static\/|static\/|favicon\.ico|site\.webmanifest)/;
    const apiPattern = /^\/api\//;
    if (staticFilePattern.test(pathname) || apiPattern.test(pathname)) {
        return NextResponse.next();
    }

    // 如果路径是根路径，则重定向到默认语言
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/en', req.url));
    }

    // 如果路径不包含语言前缀，则重定向到默认语言路径
    const isLocalePath = /^\/(en|cn)(\/|$)/.test(pathname);
    if (!isLocalePath) {
        return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
    }

    // 调用 next-intl 的中间件
    return intlMiddleware(req);
}

export { createMiddleware };

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};