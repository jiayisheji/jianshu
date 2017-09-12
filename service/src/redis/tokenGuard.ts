/**
 * Created by jiayi on 2017/9/9.
 */
import redisClient from '../config/redis';

export interface InterfaceTokenGuard {
    getToken(key: string);

    setToken(key: string, value: string);
};

export class TokenGuard implements InterfaceTokenGuard {
    constructor() {
    }

    getToken(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            redisClient.SELECT(1, () => {
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

    /*validate() {

    }*/

    setToken(key: string, value: string): Promise<any> {
        return new Promise((resolve, reject) => {
            redisClient.SELECT(1, () => {
                redisClient.set(key, value, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    redisClient.EXPIRE(key, 3600);
                    resolve(result);
                });
            });
        });
    }
}

export default new TokenGuard();
