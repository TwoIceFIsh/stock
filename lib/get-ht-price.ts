import {getHtUrl, HT_URL_TYPE} from "@/lib/init/get-ht-url";
import {getHtAccessToken} from "@/lib/init/get-ht-access-token";

export const getHtPrice = async (symbol: string) => {
    //symbol to uppercase
    //TypeError: Cannot read properties of undefined (reading 'toUpperCase')
    try {
        symbol = symbol.toUpperCase()
    } catch (e) {
        return {result: false}
    }

    const query = {
        AUTH: "",
        EXCD: "NAS",
        SYMB: symbol,
    }

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await getHtAccessToken()}`,
        "appkey": process.env.HT_APP_KEY as string,
        "appsecret": process.env.HT_APP_SECRET as string,
        "tr_id": "HHDFS00000300"
    }

    const data = await fetch(`${getHtUrl(HT_URL_TYPE.HT_PRICE)}?${new URLSearchParams(query)}`, {
        headers
    })

    return await data.json()
}