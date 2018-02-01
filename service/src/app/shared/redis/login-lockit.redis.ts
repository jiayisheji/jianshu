import { Component, Logger } from '@nestjs/common';
import * as Redis from 'ioredis';

@Component()
export class LoginLockitRedis {
    private redisClient = new Redis(6379);
    private readonly logger = new Logger(LoginLockitRedis.name);
    /**
     * 保存短信验证码到redis
     * @param username 锁定的账号
     */
    async count(username: string): Promise<number> {
        try {
            // 设置次数
            const count: number = await this.redisClient.incr(`login-failed-count:${username}`);
            if (count === 3) {
                await this.setLockit(username);
                await this.redisClient.del(`login-failed-count:${username}`);
                return Promise.resolve(3);
            }
            return Promise.resolve(count);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 设置登陆账号锁
     * @param username 锁定的账号
     * @param expiresIn 过期时间
     */
    async setLockit(username: string, expiresIn: number = 60 * 60 * 2): Promise<any> {
        try {
            return Promise.all([
                this.redisClient.set(`login-lockit:${username}`, Date.now() + expiresIn * 1000),
                this.redisClient.expire(`login-lockit:${username}`, expiresIn),
            ]);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 获取登陆账号锁
     * @param username 锁定的账号
     */
    async getLockit(username: string): Promise<any> {
        try {
            return this.redisClient.get(`login-lockit:${username}`);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}