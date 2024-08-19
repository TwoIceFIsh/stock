import {getHtUrl, HT_URL_TYPE} from "@/lib/init/get-ht-url";

export const getNewAccessToken = async () => {
    const resp = await fetch(getHtUrl(HT_URL_TYPE.HT_TOKEN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            "grant_type": "client_credentials",
            "appkey": process.env.HT_APP_KEY as string,
            "appsecret": process.env.HT_APP_SECRET as string,
        })
    })

    const data = await resp.json();
    console.log(data)
    if (data?.error_description) {
        throw new Error(data.error_description);
    }
    return data;
}