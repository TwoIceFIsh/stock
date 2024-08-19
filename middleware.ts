import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {adminRoutes, apiAuthPrefix, authRoutes, publicRoutes, verifyPrefix} from "@/route";

const {auth} = NextAuth(authConfig);

// @ts-ignore
export default auth(async (req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
    const isVerifyRoute = nextUrl.pathname.startsWith(verifyPrefix);

    // pass
    if (isApiAuthRoute) {
        return null;
    }

    // pass
    if (isVerifyRoute) return null;

    // 아무런 작업을 하지 않고 허용 합니다.
    return null;
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};