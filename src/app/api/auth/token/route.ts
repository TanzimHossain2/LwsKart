import { refreshAccessToken } from "@/backend/lib/token/refreshAccessToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  
  try {
    const { refreshToken  } = await req.json();

    const newToken = await refreshAccessToken(refreshToken);

    if(!newToken){
      return new Response("Invalid refresh token", { status: 401, statusText: "Unauthorized" });
    }

    // return new Response(JSON.stringify({newToken}), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   status: 201,
    // });

    return Response.json({newToken}, {status: 201});


    
  } catch (err) { 
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
    
  }



  return new Response("POST request received");
}
