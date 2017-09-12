/**
 * Created by jiayi on 2017/9/10.
 */
import {UsersModel} from '../models/users';

export interface UserinfoInterface {
    slug?: String;
    nickname?: String;
    avatar?: String;
}

export interface InterfaceUtil {
    getUserinfo(user: UsersModel);

    formatDate(date: Date);
};

class Util implements InterfaceUtil {
    constructor() {
    }
    /**
     * 获取关联用户基本信息
     * @param user
     * @returns {{userinfoInterface}}
     */
    getUserinfo(user: UsersModel): UserinfoInterface | void {
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
    formatDate(date: Date): string | void {
        if (!date) {
            return;
        }
        return new Date(date).toLocaleString();
    }
}

/**
 * 导出模块
 */
export default new Util();
