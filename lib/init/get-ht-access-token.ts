import db from "@/lib/init/db";
import {getNewAccessToken} from "@/lib/init/get-new-access-token";
import moment from "moment";

/**
 * 기존 토큰이 6시간이내 존재하면 해당 토큰을 사용하고
 * 아니라면 신규 토큰을 발급 받는 로직
 * */

export const getHtAccessToken = async () => {
    const setting = await db.htSetting.findFirst({
        include: {
            access_token: true
        },
    });

    // 기존 토큰의 시간이 6시간 경과 여부 확인
    // 경과 시 새로운 토큰 발급
    // 아니라면 기존 토큰 사용
    if (setting?.access_token) {
        if (setting.access_token.access_token_token_expired < new Date()) {
            console.log("access_token is expired > get new access_token")
            const data = await getNewAccessToken();
            const expired = moment(data.access_token_token_expired, 'YYYY-MM-DD HH:mm:ss').toDate();
            const result = await db.accessToken.upsert({
                create: {
                    access_token: data.access_token,
                    token_type: data.token_type,
                    expires_in: data.expires_in,
                    access_token_token_expired: expired,
                    ht_settingId: setting?.id
                },
                update: {
                    access_token: data.access_token,
                    token_type: data.token_type,
                    expires_in: data.expires_in,
                    access_token_token_expired: expired
                },
                where: {
                    ht_settingId: setting?.id
                }
            });
            return result.access_token;
        } else {
            return setting?.access_token.access_token;
        }
    } else {
        // 토큰이 없을 경우 신규 토큰 발급
        const data = await getNewAccessToken();
        const expired = moment(data?.access_token_token_expired, 'YYYY-MM-DD HH:mm:ss').toDate();
        const result = await db.accessToken.upsert({
            create: {
                access_token: data?.access_token,
                token_type: data?.token_type,
                expires_in: data?.expires_in,
                access_token_token_expired: expired,
                ht_settingId: setting?.id
            },
            update: {
                access_token: data?.access_token,
                token_type: data?.token_type,
                expires_in: data?.expires_in,
                access_token_token_expired: expired
            },
            where: {
                ht_settingId: setting?.id
            }
        });
        return result.access_token;
    }
};