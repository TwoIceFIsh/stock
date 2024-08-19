import {NextRequest, NextResponse} from "next/server";
import {getHtBalance} from "@/lib/get-ht-balance";

export async function GET(request: NextRequest) {
    return NextResponse.json({result: true, data: await getHtBalance()})
}