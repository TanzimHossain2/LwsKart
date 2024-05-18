import NextAuth from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import authConfig from "./auth.config";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,authRoutes,publicRoutes } from "./routes";
const {auth} = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const isLoggedIn = !!await auth();
    console.log("isLoggedIn",isLoggedIn);
    

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    console.log("isApiAuthRoute",isApiAuthRoute);
    

    if(isApiAuthRoute){
        return null;
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }

    if(!isLoggedIn && !isPublicRoute){
        let callbackUrl = nextUrl.pathname;

        if(nextUrl.search){
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
        
    }
    
    return null;
    
    // return NextResponse.next();
}


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };
  