import * as jwt from 'jsonwebtoken';
import { Component, Logger } from '@nestjs/common';
import * as Redis from 'ioredis';

@Component()
export class PassportService {
    private redisClient = new Redis(6379);
    private readonly logger = new Logger(PassportService.name);
    secretOrKey: string = process.env.AUTH_JWT_SECRET || 'jiayi_jianshu';
    /**
     * 创建token
     * @param user
     * @param expiresIn
     */
    async createToken(user: any, expiresIn: number = 3600): Promise<{
        expires_in: number;
        access_token: string
    }> {
        const token = jwt.sign(user, this.secretOrKey, { expiresIn });
        // 设置token到redis 并且设置过期时间
        await this.redisClient.hmset(`tokenid:${user.slug}`, { user: JSON.stringify(user), token, expiresIn });
        await this.redisClient.expire(`tokenid:${user.slug}`, expiresIn);
        return Promise.resolve({
            expires_in: expiresIn,
            access_token: token,
        });
    }
    /**
     * 验证用户信息
     * @param signedUser
     */
    async validateUser(signedUser: any): Promise<boolean> {
        const token = await this.redisClient.hget(`tokenid:${signedUser.slug}`, 'user');
        console.log('validateUser-------token', token);
        console.log('validateUser-------signedUser', signedUser);
        // 如果找不到为null，验证失败
        if (!token) {
            return Promise.resolve(false);
        }
        // put some validation logic here
        // for example query user by id / email / username
        return Promise.resolve(true);
    }

    /**
     * 删除token
     * @param id
     */
    async removeToken(id: string) {
        await this.redisClient.del(`tokenid:${id}`);
    }
}