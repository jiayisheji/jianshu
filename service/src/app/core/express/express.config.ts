import { Component } from '@nestjs/common';
// express 框架
import * as express from 'express';
// body解析器的中间件 (转json)
import * as bodyParser from 'body-parser';
// 跨域处理器的中间件
import cors = require('cors');
// 增强Node.JS应用安全的中间件压缩
import helmet = require('helmet');
// node.js启用gzip
import compression = require('compression');
// validator 数据验证
import expressValidator = require('express-validator');
// API调用限制
import RateLimit = require('express-rate-limit');
// API调用限制配置存储到reids
import RedisStore = require('rate-limit-redis');
// redis操作
import * as Redis from 'ioredis';
// 跨域配置
const corsOptions = { // 处理跨域 需要提供Authorization
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
};
// 压缩配置
const compressionOptions = {};

// expressValidator配置
const expressValidatorOptions = {
    errorFormatter(param, errormsg, value) {
        const namespace = param.split('.');
        let formParam = namespace.shift();
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            errormsg,
            value,
        };
    },
    customValidators: {
        isArray(value: any) {
            return Array.isArray(value);
        },
        gte(param: number, num: number) {
            return param >= num;
        },
    },
};

// API调用限制配置
const rateLimitOptions = new RateLimit({
    store: new RedisStore({  // redis存储计数
        expiry: 60,
        prefix: 'ratelimit',
        client: new Redis(6379),
    }),
    windowMs: 60 * 1000, // 一分钟
    delayAfter: 10,   // 10次以后开始延迟
    delayMs: 1 * 1000, // 每次延迟1秒
    max: 60 * 1000,  // 1分钟最大调用次数60次
    message: '操作过于频繁，请稍等一下再试吧', // 提示信息
});

@Component()
export class ExpressConfig {
    public configure(app: express.Application) {
        return app
            .options('*', cors())  // 处理跨域
            .use(cors(corsOptions))
            .use(helmet())
            .use(helmet.noCache())
            .use(compression(compressionOptions))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .use(expressValidator(expressValidatorOptions))
            .use(rateLimitOptions);
    }
}