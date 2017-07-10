/**
 * Created by jiayi on 2017/7/3.
 */

export type userinfoInterface = {
    slug?: string;
    nickname?: string;
    avatar?: string;
};

/**
 * 获取关联用户信息
 * @param data
 * @returns {{userinfoInterface}}
 */
export function getUserinfo(user: any): userinfoInterface {
    if (!user) {
        return;
    }
    return {
        slug: user._id,
        nickname: user.basic.nickname,
        avatar: user.basic.avatar
    };
}

/**
 * 获取格式化的本地时间
 * @param date
 * @returns {string}
 */
export function formatDate(date: Date): string | void {
    if (!date) {
        return;
    }
    return new Date(date).toLocaleString();
}