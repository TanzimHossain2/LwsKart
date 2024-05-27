import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { refreshAccessToken } from "@/backend/lib/token/refreshAccessToken";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET environment variable is not defined");
}

export async function validateToken(req: NextRequest) {
    
    // @ts-ignore
  const token = await getToken({ req, secret });

  if (!token) {
    return { isValid: false, token: null };
  }

  const { accessToken, refreshToken, accessTokenExpires } = token;

  if (accessTokenExpires && Date.now() > accessTokenExpires) {
    const refreshedTokens = await refreshAccessToken(refreshToken ?? '');

    if (!refreshedTokens) {
      return { isValid: false, token: null };
    }

    const updatedToken = {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };

    return { isValid: true, token: updatedToken };
  }

  return { isValid: true, token };
}
