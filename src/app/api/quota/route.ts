import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { db } from "@/db/db";
import { quotas } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ApiResponse } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";

export const runtime = 'edge';

export const GET = auth(async (req: NextRequest) => {
    const user = await getCurrentUser();
    if (!user) {
        return new Response(ApiResponse.error(401, "Not authenticated"), { status: 401 });
    }

    try {
        // 获取用户的所有配额信息
        const userQuotas = await db.select({
            type: quotas.type,
            totalQuota: quotas.totalQuota,
            usedQuota: quotas.usedQuota,
        })
            .from(quotas)
            .where(eq(quotas.createdBy, user.id as string))
            .execute();

        const quotaData: Record<string, { totalQuota: number; usedQuota: number }> = {};

        for (const quota of userQuotas) {
            quotaData[quota.type] = {
                totalQuota: quota.totalQuota,
                usedQuota: quota.usedQuota,
            };
        }

        return new Response(ApiResponse.success(quotaData), { status: 200 });
    } catch (error) {
        console.error("Error fetching quota data:", error);
        return new Response(ApiResponse.error(500, "Internal server error"), { status: 500 });
    }
});