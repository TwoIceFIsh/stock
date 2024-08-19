"use server"
import {getHtUrl, HT_URL_TYPE} from "@/lib/init/get-ht-url";
import db from "@/lib/init/db";
import moment from "moment";

export const getHtWsApprovalKey = async () => {
    const isExpired = await db.htSetting.findFirst({
        where: {
            approval_key_expired: {
                gte: new Date()
            }
        }
    })
    if (!isExpired || !isExpired.approval_key || !isExpired.approval_key_expired) {
        console.log("approval_key is expired")
        const data = await fetch(getHtUrl(HT_URL_TYPE.HT_APPROVAL), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "grant_type": "client_credentials",
                "appkey": process.env.HT_APP_KEY as string,
                "secretkey": process.env.HT_APP_SECRET as string,
            })
        })
        const approval_key = await data.json()
        const one_setting = await db.htSetting.findFirst({})
        const updatedData = await db.htSetting.update({
            where: {
                id: one_setting?.id
            },
            data: {
                approval_key: approval_key.approval_key,
                approval_key_expired: moment(new Date()).add(1, 'days').toDate()
            }
        })
        return updatedData?.approval_key
    } else {
        return isExpired?.approval_key
    }
}