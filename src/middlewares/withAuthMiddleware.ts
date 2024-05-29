import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { CustomMiddleware } from "./chain";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { refreshAccessToken } from "@/backend/lib/token/refreshAccessToken";

// Define the Token interface
interface Token {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  [key: string]: any;
}

// Helper function to remove the language prefix from the URL path
function stripLangPrefix(pathname: string) {
  const parts = pathname.split("/");
  if (parts.length > 2 && /^[a-z]{2}$/.test(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
}

// Function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  // Check for exact match
  if (publicRoutes.includes(pathname)) {
    return true;
  }

  // Check for dynamic routes (e.g., /product/:id)
  const dynamicRoutes = publicRoutes.filter((route) => route.includes("*"));
  return dynamicRoutes.some((route) => {
    const baseRoute = route.replace("/*", "");
    return pathname.startsWith(baseRoute);
  });
}

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const { nextUrl, method } = req;

    const { auth } = NextAuth(authConfig);
    const isLoggedIn = !!(await auth());
    const pathname = stripLangPrefix(nextUrl.pathname);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(pathname);


    console.log("authuser in middleware ----->", await auth());
    

    console.log("isAuthRoute", isAuthRoute, "pathname", pathname);
    console.log("isApiAuthRoute", isApiAuthRoute, "pathname", pathname);

    // @ts-ignore
    let token = (await getToken({
      req,
      secret: process.env.AUTH_SECRET as string,
    })) as Token | null;

    console.log("Token  in middleware----------", token);
    

    if (!token) {
      // If no token, continue the request if it's a public route
      if (isPublicRoute(pathname)) {
        return middleware(req, event, response);
      }

      console.log("No Token", token);
      

      // Redirect to login if not authenticated and trying to access protected routes
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      console.log("inside Middleware No Token", encodedCallbackUrl);
      
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    const { accessToken, refreshToken, accessTokenExpires } = token;
    const isAuthLoggedIn = !!accessToken;
    console.log("isAuthLoggedIn Token", isAuthLoggedIn);
    

    if (isApiAuthRoute) {
      return null;
    }

    // Handle authentication for certain methods
    if (["POST", "PATCH", "DELETE"].includes(method) && !isAuthLoggedIn) {

      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      console.log("Inside Middleware Auth Route", encodedCallbackUrl);
      
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    // If the route is an auth route, and the user is not logged in, redirect them to the login page
    if (isAuthRoute && !isAuthLoggedIn) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      console.log("Insude Middleware Auth Route", callbackUrl);

      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    // If the route is not public, check for authentication
    if (!isPublicRoute(pathname)) {
      // Check if the access token is expired
      if (accessTokenExpires && Date.now() > accessTokenExpires) {
        const refreshedTokens = await refreshAccessToken(refreshToken ?? "");

        if (!refreshedTokens) {
          let callbackUrl = nextUrl.pathname;
          if (nextUrl.search) {
            callbackUrl += nextUrl.search;
          }
          const encodedCallbackUrl = encodeURIComponent(callbackUrl);

          console.log("Inside Middleware Auth Route1x", encodedCallbackUrl);
          
          return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
          );
        }

        console.log("Insude Middleware Auth Route1", refreshedTokens);

        // Update the token
        token = {
          ...token,
          accessToken: refreshedTokens.accessToken,
          accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
          refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
        };

        // @ts-ignore
        req.nextauth = req.nextauth || {};
        // @ts-ignore
        req.nextauth.token = token;
      } else {
        // @ts-ignore
        req.nextauth = req.nextauth || {};
        // @ts-ignore
        req.nextauth.token = token;
      }

      return NextResponse.next();
    }

    // Pass the request down the chain
    return middleware(req, event, response);
  };
}
