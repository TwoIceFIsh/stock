// auth.ts
import NextAuth from "next-auth";
import db from "@/lib/init/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import {getUserById} from "@/_action/user/get-user-by-id";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth"
    },
    callbacks: {
        async session({token, session}) {
            if (!token) await signOut();
            if (!session) await signOut();
            return session;
        },
        async jwt({token}) {
            if (!token) await signOut();
            return token;
        },
        async signIn({user, account}) {
            // OAuth인 경우 이로직을 타고 true로 흐름을 흘려보내서 로그인 성공하게 한다!
            if (account?.provider !== "credentials") {
                return true;
            }

            // 여기서는 ID/PW 처리를 위한 로직을 수행하게 된다!
            const existingUser = await getUserById(user?.id as string);
            return !!existingUser?.emailVerified;

        }
    },
    jwt: {
        maxAge: 60 * 60 // 1 hour
    },
    adapter: PrismaAdapter(db),
    session: {
        maxAge: 60 * 60, // 1 hour
        strategy: "jwt",
        updateAge: 60 // 1 minute
    },
    ...authConfig
});