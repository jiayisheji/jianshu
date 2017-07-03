/**
 * Created by jiayi on 2017/7/3.
 */

export type userinfoInterface = {
    slug: string;
    nickname?: string;
    avatar?: string;
};

/**
 * 获取关联用户信息
 * @param data
 * @returns {{userinfoInterface}}
 */
export function getUserinfo(user): userinfoInterface {
    return Object.assign({"slug": user._doc._id}, user._doc, {"_id": undefined});
}

/**
 * 获取格式化的本地时间
 * @param date
 * @returns {string}
 */
export function formatDate(date): string {
    return new Date(date).toLocaleString();
}