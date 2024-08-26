import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/db/db";
import { apiKeys } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ApiResponse } from "@/lib/utils";

export const runtime = 'edge';

export const DELETE = auth(async (req) => {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Not authenticated", { status: 401 });
    }

    // 从 URL 路径中提取 keyId
    const keyId = req.url.split('/').pop();

    if (!keyId) {
        return new Response(ApiResponse.error(400, "Missing API key ID"), { status: 400 });
    }

    try {
        await db.delete(apiKeys).where(
            and(
                eq(apiKeys.id, keyId),
                eq(apiKeys.userId, user.id as string)
            )
        );
        return new Response(ApiResponse.successWithoutData(), { status: 200 });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
});