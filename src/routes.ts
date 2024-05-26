/**
 *  An array of routes that are public
 *  These routes do not require authentication
 * @ type {string[]}
 */
export const publicRoutes = [
    "/",
    "/en",
    "/bn",
    "/auth/login",
    "/auth/register",
    "/auth/new-verification",
    "/auth/reset",
    "/auth/reset-password",
    "/auth/error",
    "/shop",
    "/about-us",
    "/contact-us",
    "/product:id",
    "/product/*",
    "/category/*"
]


/**
 *  An array of routes that require authentication
 *  These routes 
 *  @ type {string[]}
 */
export const authRoutes =  ['/profile', '/settings', '/admin', '/cart', '/wishlist', "/checkout"]


/**
 *  The prefix for API authentication routes
 *  Routes that start with this prefix are used for authentication purposes
 *  @ type {string}
 */
export const apiAuthPrefix = "/api/auth"
export const apiPublicPrefix = "/api/products"


/**
 *  The default redirect path for login
 *  @ type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile"

