import { countUsers } from "@/lib/user";

export async function GET(req: Request) {
  const count = await countUsers();
  console.log("user count:", count);
  return new Response(count.toString(), { status: 200 });
}