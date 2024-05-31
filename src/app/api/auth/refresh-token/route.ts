import { refreshAccessToken } from "@/backend/lib/token/refreshAccessToken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { refresh_token } = await req.json();
    const newToken = await refreshAccessToken(refresh_token);

    if (!newToken) {
      return new Response("Invalid refresh token", {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    return Response.json(newToken, { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
