import {NextRequest, NextResponse} from "next/server";
import {getChartData} from "@/_action/get-chart-data";

export async function GET(request: NextRequest) {
    return NextResponse.json({result: true, data: await getChartData()})
}