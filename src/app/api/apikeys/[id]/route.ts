import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/db/db";
import { apiKeys } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { ApiResponse } from "@/lib/utils";
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export const DELETE = auth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Not authenticated", { status: 401 });
    }

    const keyId = params.id;

    if (!keyId) {
        return new Response(ApiResponse.error(400, "Missing API key ID"), { status: 400 });
    }

    try {
        const resp = await db.delete(apiKeys).where(
            and(
                eq(apiKeys.id, keyId),
                eq(apiKeys.userId, user.id as string)
            )
        );
        if (!resp || resp.rowCount === 0) {
            return new Response(ApiResponse.error(404, "API key not found"), { status: 404 });
        }
        return new Response(ApiResponse.successWithoutData(), { status: 200 });
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
});