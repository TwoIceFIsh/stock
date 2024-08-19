import {NextRequest, NextResponse} from "next/server";
import {getHtPrice} from "@/lib/get-ht-price";


export async function GET(request: NextRequest, {params}: { params: { symbol: string } }) {
    const data = await getHtPrice(params.symbol)
    return NextResponse.json({result: data})
}