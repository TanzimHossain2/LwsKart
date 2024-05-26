import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { CustomMiddleware } from "./chain";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

// Helper function to remove the language prefix from the URL path
function stripLangPrefix(pathname : string) {
  const parts = pathname.split('/');
  if (parts.length > 2 && /^[a-z]{2}$/.test(parts[1])) {
      return '/' + parts.slice(2).join('/');
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
  const dynamicRoutes = publicRoutes.filter(route => route.includes('*'));
  return dynamicRoutes.some(route => {
    const baseRoute = route.replace('/*', '');
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

    // @ts-ignore
    const token = !!await getToken({ req, secret: process.env.AUTH_SECRET });

    // @ts-ignore
    req.nextauth = req.nextauth || {};

    // @ts-ignore
    req.nextauth.token = token;

    

    if (isApiAuthRoute) {
      return null;
    }
    
    //uncomment later finsihsing up 
    // if (["POST", "PATCH", "DELETE"].includes(method)) {

    //     if (!isLoggedIn) {
    //         let callbackUrl = nextUrl.pathname;
    //         if (nextUrl.search) {
    //             callbackUrl += nextUrl.search;
    //         }
    //         const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    //         return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    //     }
    //     return NextResponse.next();
    // }

    // If the route is an auth route, and the user is not logged in, redirect them to the login page


     // If the route is not public, check for authentication
     if (!isPublicRoute(pathname)) {
      if (!isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(
          new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
      }

      return NextResponse.next();
    }

    // If the route is public, continue with the request

      

    return middleware(req, event, response);
  };
}
