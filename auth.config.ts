import type {NextAuthConfig} from "next-auth";
import Google from "@auth/core/providers/google";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

    ]
} satisfies NextAuthConfig;