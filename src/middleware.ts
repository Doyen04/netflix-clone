
import { NextResponse } from "next/server"
import { authConfig } from "./auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    
    // const PUBLIC_PATHS = ["/images/", "/favicon.ico", "/_next/static/", "/_next/image/"];
    // if (PUBLIC_PATHS.some(path => req.nextUrl.pathname.startsWith(path))) {
    //     return NextResponse.next();
    // }
    console.log(req.auth, !!req.auth ,req.nextUrl.pathname);
    const NON_PROTECTED_ROUTES: string[] = ['/', '/login','/profile']

    if (!req.auth && !NON_PROTECTED_ROUTES.includes(req.nextUrl.pathname) ) {
        const newUrl = new URL("/login", req.nextUrl.origin)
        return NextResponse.redirect(newUrl)
    }
    return NextResponse.next()
})


export const config = {
    matcher: ["/((?!api|_next/static|images/|_next/image|favicon.ico).*)"],
}

