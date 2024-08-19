import {NextRequest, NextResponse} from "next/server";
import {getHtBalance} from "@/lib/get-ht-balance";
import db from "@/lib/init/db";
import moment from "moment/moment";

export async function GET(request: NextRequest) {
    const real_data = await getHtBalance()
    const one_data = await db.balanceIndex.findFirst({
        orderBy: {
            created_at: "desc"
        }
    })

    const today = moment(new Date).format("YYYY-MM-DD")
    const dataDate = moment(one_data?.created_at).format("YYYY-MM-DD")

    if (today === dataDate && one_data) {
        await db.balanceIndex.update({
            where: {
                id: one_data?.id
            },
            data: {
                balance: Number(real_data.output2.tot_evlu_pfls_amt)
            }
        })
    } else {
        await db.balanceIndex.create({
            data: {
                balance: Number(real_data.output2.tot_evlu_pfls_amt),
            }
        })
    }
    return NextResponse.json({result: true})
}