import NextAuth from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import authConfig from "./auth.config";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig);

export async function middleware(req : NextRequest) {
    const { nextUrl, method } = req;
    const isLoggedIn = !!await auth();
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isPublicRoute && method === "GET") {
        return NextResponse.next();
    }

    if (isApiAuthRoute) {
        return NextResponse.next();
    }


    //uncomment later finsihsing up
    
    // if (isAuthRoute && ["POST", "PATCH", "DELETE"].includes(method)) {
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

    

    if (isAuthRoute) {
        if (!isLoggedIn) {
            let callbackUrl = nextUrl.pathname;
            if (nextUrl.search) {
                callbackUrl += nextUrl.search;
            }
            const encodedCallbackUrl = encodeURIComponent(callbackUrl);
            return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
