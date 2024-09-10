import { auth } from "@/auth";
import { db } from "@/db/db";
import { projects } from "@/db/schema";
import { ApiResponse } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from 'next/server';
import { eq } from "drizzle-orm";
export const runtime = 'edge';

export const GET = auth(async (req: NextRequest) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return new Response(ApiResponse.error(401, "Unauthorized"), { status: 401 });
        }

        const userProjects = await db.select({
            id: projects.id,
            name: projects.name,
            slug: projects.key,
        })
            .from(projects)
            .where(eq(projects.createdBy, user.id as string))
            .execute();

         return new Response(ApiResponse.success(userProjects), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return new Response(ApiResponse.error(500, "Internal server error"), { status: 500 });
    }
});

export const POST = auth(async (req: NextRequest) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return new Response(ApiResponse.error(401, "Unauthorized"), { status: 401 });
        }

        const { name, key, description } = await req.json();

        if (!name) {
            return new Response(ApiResponse.error(400, "Project name is required"), { status: 400 });
        }

        // 检查项目名称是否已存在
        const existingProject = await db.select({ id: projects.id })
            .from(projects)
            .where(eq(projects.name, name as string))
            .limit(1)
            .execute();

        if (existingProject.length > 0) {
            return new Response(ApiResponse.error(400, "Project name already exists"), { status: 400 });
        }

        // 检查项目 key 是否已存在
        const existingKey = await db.select({ id: projects.id })
            .from(projects)
            .where(eq(projects.key, key as string))
            .limit(1)
            .execute();

        if (existingKey.length > 0) {
            return new Response(ApiResponse.error(400, "项目 key 已存在"), { status: 400 });
        }

        const newProject = await db.insert(projects).values({
            name: name as string,
            description: description as string,
            key: key as string,
            createdBy: user.id as string,
        }).returning();

        return new Response(ApiResponse.success({
            id: newProject[0].id,
            name: newProject[0].name,
            slug: newProject[0].key,
        }), { status: 201 });
    } catch (error) {
        console.error("Failed to create project:", error);
        return new Response(ApiResponse.error(500, "Internal server error"), { status: 500 });
    }
});