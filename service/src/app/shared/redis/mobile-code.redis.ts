import { Component, Logger } from '@nestjs/common';
import * as Redis from 'ioredis';

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
    async saveCode(mobile: string, code: string, source: string, expiresIn: number = 300): Promise<any> {
        try {
            // 设置短信验证码到redis 并且设置过期时间
            return Promise.all([
                this.redisClient.hmset(`${source}:${mobile}:${code}`, { code, time: Date.now() }),
                this.redisClient.expire(`${source}:${mobile}:${code}`, expiresIn),
            ]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * 获取验证码
     * @param mobile 手机号
     * @param code 验证码
     */
    async getCode(mobile: string, code: string, source: string): Promise<string> {
        try {
            return this.redisClient.hget(`${source}:${mobile}:${code}`, 'code');
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 删除验证码 使用后就立即删除，节省磁盘空间，防止重复利用
     * @param mobile 手机号
     * @param code 验证码
     */
    async removeCode(mobile: string, code: string, source: string): Promise<any> {
        try {
            return this.redisClient.del(`${source}:${mobile}:${code}`);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}