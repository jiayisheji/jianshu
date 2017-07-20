/**
 * Created by jiayi on 2017/2/10.
 */
import * as path from "path";
const rootPath = path.resolve(__dirname + "/..");
const env = process.env.NODE_ENV || "development";

// 数据库配置
const config = {
    development: {
        root: rootPath,
        app: {
            name: "jianshu"
        },
        port: 3000,
        user: "jiayi",
        psw: "123456",
        host: "localhost",
        dbs: "jianshu",
        dbport: 27017
    },

    test: {
        root: rootPath,
        app: {
            name: "jianshu"
        },
        port: 3000,
        db: "mongodb://localhost/jianshu-test"
    },

    production: {
        root: rootPath,
        app: {
            name: "jianshu"
        },
        port: 3000,
        db: "mongodb://localhost/jianshu-production"
    }
};

export = config[env];