import { auth } from "@/auth";
import { db } from "@/db/db";
import { apiKeys } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { ApiResponse } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export const GET = auth(async (req: NextRequest) => {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Not authenticated", { status: 401 });
    }

    const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    try {
        const [userApiKeys, totalCount] = await Promise.all([
            db.select()
                .from(apiKeys)
                .where(eq(apiKeys.userId, user.id as string))
                .limit(limit)
                .offset(offset),
            db.select({ count: sql`count(*)` })
                .from(apiKeys)
                .where(eq(apiKeys.userId, user.id as string))
        ]);

        return new Response(ApiResponse.success({
            keys: userApiKeys,
            totalCount: totalCount[0].count,
            page,
            limit
        }), { status: 200 });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
});

export const POST = auth(async (req: NextRequest) => {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Not authenticated", { status: 401 });
    }

    try {
        const body = await req.json();
        const newApiKey = await db.insert(apiKeys).values({
            name: body.name,
            userId: user.id as string,
            key: generateApiKey(),
            createdAt: new Date(),
        }).returning();

        return new Response(ApiResponse.success(newApiKey[0]), { status: 201 });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
});

function generateApiKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    let result = 'api_';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}