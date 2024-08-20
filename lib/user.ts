import { db } from "@/lib/db";
import { users } from "@/types/schema";
import { eq, sql } from "drizzle-orm";


export const getUserByEmail = async (email: string) => {
  try {
    const usersArray = await db.select({
      name: users.name,
      emailVerified: users.emailVerified,
    }).from(users).where(eq(users.email, email)).limit(1);

    const user = usersArray[0];

    return user || null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const usersArray = await db.select().from(users).where(eq(users.id, id)).limit(1);
    const user = usersArray[0];

    return user || null;
  } catch {
    return null;
  }
};

// 统计用户数量
export const countUsers = async () => {
  try {
    const userCountResult = await db.execute(
      sql`SELECT COUNT(*) FROM ${users}`
    );
    return userCountResult.rowCount;
  } catch(e) {
    console.error(e);
    return 0;
  }
};