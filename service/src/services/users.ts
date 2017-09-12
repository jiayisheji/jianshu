/**
 * Created by jiayi on 2017/9/10.
 */

/**
 * 定义用户服务类接口
 */
interface InterfaceUsersService {
    getSmsCode();
};

/**
 * 用户服务
 */
class UsersService implements InterfaceUsersService {
    constructor() {
    }

    /**
     * 生成短信验证码
     * @returns {number}
     */
    getSmsCode(): Promise<string> {
        let code: string = Math.floor(Math.random() * 999999) + '';
        if (code.length < 6) {
            const length: number = 6 - code.length;
            const fill: string = Array(length).fill(0).join('');
            code = code + fill;
        }
        return Promise.resolve(code);
    }
}

/**
 * 导出用户服务模块
 */
export default new UsersService();
