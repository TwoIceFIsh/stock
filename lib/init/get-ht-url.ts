export const enum HT_URL_TYPE {
    INQUIRE_BALANCE = "HT_INQUIRE_BALANCE",
    CHECK_STATUS = "HT_CHECK_STATUS",
    HT_APPROVAL = "HT_APPROVAL",
    HT_TOKEN = "HT_TOKEN",
    HT_PRICE = "HT_PRICE",
    HT_WS_PRICE = "HT_WS_PRICE",
}

// 각 URL 타입에 해당하는 환경 변수 값을 반환하는 함수
export const getHtUrl = (urlType: HT_URL_TYPE): string => {
    const baseUrl = process.env.HT_BASE_URL;
    const wsBaseUrl = process.env.NEXT_PUBLIC_HT_WS_BASE_URL;

    // URL 타입에 따라 반환할 경로를 선택
    const pathMap: Record<HT_URL_TYPE, string | undefined> = {
        [HT_URL_TYPE.INQUIRE_BALANCE]: process.env.HT_INQUIRE_BALANCE,
        [HT_URL_TYPE.CHECK_STATUS]: process.env.HT_CHECK_STATUS,
        [HT_URL_TYPE.HT_APPROVAL]: process.env.HT_APPROVAL,
        [HT_URL_TYPE.HT_TOKEN]: process.env.HT_TOKEN,
        [HT_URL_TYPE.HT_PRICE]: process.env.HT_PRICE,
        [HT_URL_TYPE.HT_WS_PRICE]: process.env.NEXT_PUBLIC_HT_WS_PRICE,
        // 여기에 다른 URL 타입에 해당하는 경로 추가
    };
    const path = pathMap[urlType];
    if (urlType === "HT_WS_PRICE") {
        return `${wsBaseUrl}${pathMap[urlType]}`;
    }

    // path가 존재하면 baseUrl과 결합하여 전체 URL 반환
    if (path) {
        return `${baseUrl}${path}`;
    }

    // path가 존재하지 않으면 오류 발생
    throw new Error(`Invalid URL type: ${urlType}`);
};