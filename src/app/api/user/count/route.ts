import { countUsers } from "@/lib/user";
import { ApiResponse } from "@/types";

export const runtime = 'edge';
export async function GET(req: Request) {
  const count = await countUsers();

  const response: ApiResponse<number> = {
    code: 200,
    message: "success",
    data: count
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}