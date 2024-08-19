import {getHtUrl, HT_URL_TYPE} from "@/lib/init/get-ht-url";
import {getHtAccessToken} from "@/lib/init/get-ht-access-token";

export const getHtBalance = async () => {

    const access_token = await getHtAccessToken()

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${access_token}`,
        "appkey": process.env.HT_APP_KEY as string,
        "appsecret": process.env.HT_APP_SECRET as string,
        "tr_id": "TTTS3012R",
    };

    // 필요한 쿼리 파라미터 설정
    const queryParams = new URLSearchParams({
        CANO: process.env.HT_BALNCE_1 as string,  // 종합계좌번호, 실제 값을 사용하세요
        ACNT_PRDT_CD: process.env.HT_BALNCE_2 as string, // 계좌상품코드, 실제 값을 사용하세요
        OVRS_EXCG_CD: "NASD", // 해외거래소코드 (미국전체: NASD)
        TR_CRCY_CD: "USD",  // 거래통화코드 (미국달러: USD)
        CTX_AREA_FK200: "",  // 최초 조회 시 공란
        CTX_AREA_NK200: "",  // 최초 조회 시 공란
    });

    // 최종 URL에 쿼리 파라미터 추가
    const urlWithParams = `${getHtUrl(HT_URL_TYPE.INQUIRE_BALANCE)}?${queryParams.toString()}`;

    const response = await fetch(urlWithParams, {
        method: 'GET',
        headers,
        cache: 'no-cache',
    });
    const resp = await response.json()
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return resp;
};