import {getHtBalance} from "@/lib/get-ht-balance";
import db from "@/lib/init/db";
import moment from "moment";

export const getChartData = async () => {
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
                balance: parseFloat(real_data.output2.tot_evlu_pfls_amt) || 0.0
            }
        });
    } else {
        await db.balanceIndex.create({
            data: {
                balance: parseFloat(real_data.output2.tot_evlu_pfls_amt) || 0.0,
            }
        });
    }
    const balanceData = await db.balanceIndex.findMany({
        orderBy: {
            created_at: "asc"
        }
    })

    return balanceData.map((data) => {
        return {
            date: moment(data.created_at).format("YYYY-MM-DD"),
            mobile: data.balance
        }
    })
}