/**
 * 验证码
 * Created by jiayi on 2017/9/16.
 */

import redisClient from './redis.service';

export interface InterfaceSmsCode {
    get();

    set(key: string, value: string);

    check(key: string, callback: Function);
};

class SmsCode implements InterfaceSmsCode {
    /**
     * 验证码长度
     * @type {number}
     */
    private smsCodeLength = 6;
    /**
     * 验证码过期时间 单位：秒
     * @type {number}
     */
    private smsCodeEXPIRES = 600;
    /**
     * 获取短信验证码
     * @returns {Promise<string>}
     */
    get(): Promise<string> {
        let code: string = Math.floor(Math.random() * 999999) + '';
        if (code.length < this.smsCodeLength) {
            const length: number = this.smsCodeLength - code.length;
            const fill: string = Array(length).fill(0).join('');
            code = code + fill;
        }
        return Promise.resolve(code);
    };

    set(key: string, value: string): Promise<any>{
        return new Promise((resolve, reject) => {
            redisClient.SELECT(0, () => {
                redisClient.set(key, value, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    redisClient.EXPIRE(key, this.smsCodeEXPIRES);
                    resolve(result);
                });
            });
        });
    };

    check(key: string, callback: Function): Promise<any>{
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
    };

}
/**
 * 导出短信服务
 */
export default new SmsCode();
