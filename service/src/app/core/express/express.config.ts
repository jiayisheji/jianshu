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
            .use(bodyParser.urlencoded({
                extended: true,
            }));
    }
}