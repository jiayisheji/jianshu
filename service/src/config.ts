/**
 * Created by jiayi on 2017/2/10.
 */
import * as path from 'path';

const rootPath = path.normalize(__dirname + '/..');

let env = process.env.NODE_ENV || 'development';
// 数据库配置
let config = {
    development: {
        root: rootPath,
        app: {
            name: 'jianshu'
        },
        port: 3000,
        db: 'mongodb://localhost/jianshu'
    },

    test: {
        root: rootPath,
        app: {
            name: 'jianshu'
        },
        port: 3000,
        db: 'mongodb://localhost/jianshu-test'
    },

    production: {
        root: rootPath,
        app: {
            name: 'jianshu'
        },
        port: 3000,
        db: 'mongodb://localhost/jianshu-production'
    }
};

export = config[env];