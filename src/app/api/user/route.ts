import { auth } from "@/auth";

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const runtime = 'edge';

export const DELETE = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    await db.delete(users).where(eq(users.id, currentUser.id as string));
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }

  return new Response("User deleted successfully!", { status: 200 });
});