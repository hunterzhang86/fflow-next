"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

import { db } from "@/db/db";
import { userRoleSchema } from "@/lib/validations/user";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export type FormData = {
  role: string;
};

export async function updateUserRole(userId: string, data: FormData) {
  try {
    const session = await auth();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { role } = userRoleSchema.parse(data);

    // Update the user role.
    await db.update(users).set({ role: role }).where(eq(users.id, userId));

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}
