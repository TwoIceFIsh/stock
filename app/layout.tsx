import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import {cn} from "@/lib/utils";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "퍼그가 미래다 투자현황",
    description: "나의 수익을 공개합니다",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={cn("bg-black size-full", inter.className)}>{children}

        <Toaster/>
        </body>
        </html>
    );
}