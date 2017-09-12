/**
 * 验证码
 * Created by jiayi on 2017/9/9.
 */

import redisClient from '../config/redis';

export interface InterfaceSmsCode {
    push(key: string, value: string);

    pull(key: string, callback: Function);
};

/**
 * 验证码有效期，10分钟有效
 * @type {number}
 */
const SMS_CODE_EXPIRES: number = 10 * 60;

class SmsCode implements InterfaceSmsCode {
    constructor() {
    }

    push(key: string, value: string): Promise<any> {
        return new Promise((resolve, reject) => {
            redisClient.SELECT(0, () => {
                redisClient.set(key, value, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    redisClient.EXPIRE(key, SMS_CODE_EXPIRES);
                    resolve(result);
                });
            });
        });
    }

    pull(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            redisClient.SELECT(0, () => {
                redisClient.get(key, (err, result) => {
                    console.log(key, err, result)
                    if (err) {
                        reject(err);
                    }
                    if (!result) {
                        reject('验证码过期');
                    }
                    resolve(result);
                });
            });
        });
    }
}

/**
 * 导出模块
 */
export default new SmsCode();
