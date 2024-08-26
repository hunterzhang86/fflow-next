import { auth } from "@/auth";
import { getCurrentUser } from "@/lib/session";
import { countUsers } from "@/lib/user";
import { ApiResponse } from "@/lib/utils";

export const runtime = 'edge';
export const GET = auth(async () => {
  const user = await getCurrentUser();
  if (!user) {
    return new Response("Not authenticated", { status: 401 });
  }
  const count = await countUsers();

  return new Response(ApiResponse.success(count), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
});