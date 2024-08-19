import * as z from "zod";
import { UserRole } from "@/types";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const userRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});
