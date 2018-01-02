import { Component, Logger } from '@nestjs/common';
import * as Redis from 'ioredis';
import { AsyncHook } from 'async_hooks';

@Component()
export class MobileCodeRedis {
    private redisClient = new Redis(6379);
    private readonly logger = new Logger(MobileCodeRedis.name);
    /**
     * 保存短信验证码到redis
     * @param mobile 手机号
     * @param code 验证码
     * @param expiresIn 过期时间 默认5分钟
     */
    async saveCode(mobile: string, code: string, expiresIn: number = 300): Promise<any> {
        try {
            // 设置token到redis 并且设置过期时间
            await this.redisClient.hmset(`mobile:${mobile}:${code}`, { code, time: Date.now() });
            await this.redisClient.expire(`mobile:${mobile}:${code}`, expiresIn);
            return Promise.resolve(1);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * 获取验证码
     * @param mobile 手机号
     * @param code 验证码
     */
    async getCode(mobile: string, code: string): Promise<string> {
        const value = await this.redisClient.hget(`mobile:${mobile}:${code}`, 'code');
        // 如果找不到为null，验证失败
        if (!value) {
            Promise.reject(value);
        }
        // put some validation logic here
        // for example query user by id / email / username
        return Promise.resolve(value);
    }

    /**
     * 删除验证码 使用后就立即删除，节省磁盘空间，防止重复利用
     * @param mobile 手机号
     * @param code 验证码
     */
    async removeCode(mobile: string, code: string): Promise<any> {
        try {
            await this.redisClient.del(`mobile:${mobile}:${code}`);
            return Promise.resolve(0);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}