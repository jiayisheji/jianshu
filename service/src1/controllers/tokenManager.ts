/**
 * Created by jiayi on 2017/8/6.
 */
import {default  as redisClient} from '../config/redis';
import 'redis/RedisClient';
import {Request, Response, NextFunction} from 'express';
const TOKEN_EXPIRATION = 60;

const TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

/**
 * 获取token
 * @param headers
 * @returns {any}
 */
const getToken = function (headers) {
    if (headers && headers.authorization) {
        const authorization = headers.authorization;
        const part = authorization.split(' ');

        if (part.length === 2) {
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

/**
 * 过期token
 * @param headers
 */
const expireToken = function(headers) {
    const token = getToken(headers);
    if (token != null) {
        redisClient.set(token, { is_expired: true });
        redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
};

/**
 * 验证token
 * @param {Request} req
 * @param {Response} res
 * @param {e.NextFunction} next
 */
const verifyToken = function (req: Request, res: Response, next: NextFunction) {
    const token = getToken(req.headers);

    redisClient.get(token, function (err, reply) {
        if (err) {
            console.log(err);
            return res.send(500);
        }

        if (reply) {
            res.send(401);
        } else {
            next();
        }

    });
};


export default {
    TOKEN_EXPIRATION,
    TOKEN_EXPIRATION_SEC,
    expireToken,
    verifyToken
};
