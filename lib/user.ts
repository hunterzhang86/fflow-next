import { db } from "@/lib/db";
import { users } from "@/models/schema";
import { eq } from "drizzle-orm";


export const getUserByEmail = async (email: string) => {
  try {
    const usersArray = await db.select({
      name: user.name,
      emailVerified: user.emailVerified,
    }).from(user).where(eq(user.email, email)).limit(1);

    const user = usersArray[0];

    return user || null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const usersArray = await db.select().from(user).where(eq(user.id, id)).limit(1);
    const user = usersArray[0];

    return user || null;
  } catch {
    return null;
  }
};