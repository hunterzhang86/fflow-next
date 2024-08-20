"use server";

import { auth } from "@/auth";
import { db } from "@/db/db";
import { userNameSchema } from "@/lib/validations/user";
import { revalidatePath } from "next/cache";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    await db.update(users)
      .set({
        name: name,
      })
      .where(eq(users.id, userId));

    revalidatePath('/dashboard/settings');
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" }
  }
}