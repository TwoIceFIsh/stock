import {getHtUrl, HT_URL_TYPE} from "@/lib/init/get-ht-url";
import {getHtWsApprovalKey} from "@/lib/init/get-ht-ws-approval-key";

export const connectWebSocket = (symbol: string) => {
    // WebSocket URL 설정
    const url = getHtUrl(HT_URL_TYPE.HT_WS_PRICE);

    // WebSocket 연결 생성
    const socket = new WebSocket(url);

    // WebSocket 연결이 열렸을 때
    socket.onopen = async () => {
        console.log("WebSocket connected");

        // 구독 요청 데이터 설정
        const subscriptionRequest = {
            "header": {
                "approval_key": await getHtWsApprovalKey(),
                "custtype": "P",
                "tr_type": "1",
                "content-type": "utf-8",
            },
            "body": {
                "input": {
                    "tr_id": "HDFSASP0",
                    "tr_key": `DNAS${symbol}`,
                }
            },

        };

        console.log(subscriptionRequest)

        // 구독 요청을 서버에 전송
        socket.send(JSON.stringify(subscriptionRequest));
        console.log("Subscription request sent:", subscriptionRequest);
    };

    // 서버로부터 메시지를 수신했을 때
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);

        // 구독 성공 여부 확인
        if (data.body && data.body.rt_cd === "0" && data.body.msg_cd === "OPSP0000") {
            console.log("Subscription success:", data.body.msg1);

            // 실시간 데이터 처리
            handleRealTimeData(socket);
        } else {
            console.error("Subscription failed:", data.body ? data.body.msg1 : "Unknown error");
        }
    };

    // WebSocket 오류 발생 시
    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    // WebSocket 연결이 닫혔을 때
    socket.onclose = () => {
        console.log("WebSocket disconnected");
    };
};
const handleRealTimeData = (socket: WebSocket) => {
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Real-time data received:", data);

        // 데이터 처리 로직 추가
        // 예를 들어, 데이터가 특정 형식을 따를 때:
        if (data.type === "price_update") {
            console.log("Price update:", data.payload);
            // 필요한 작업을 수행
        }
    };
};