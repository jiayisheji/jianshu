/**
 * Created by jiayi on 2017/2/10.
 */
/**
 * 引入依赖模块
 */
import * as express from "express";
// import * as glob from "glob";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
// import * as logger from "logger";
// import * as favicon from "favicon";
// import * as methodOverride from "method-override";
import * as cookieParser from "cookie-parser";
import expressValidator = require("express-validator");
import * as winston from "winston";
import * as expressWinston from "express-winston";

/**
 * 引入配置
 */
import config = require("./config/config");
/**
 * 全部路由
 */
import {default as  routes} from "./routes/index";

/**
 * 引入express配置
 */
const app = express();

/**
 * 设置静态资源路径，web ,app ,admin
 */
app.use("/web", express.static("public/web"));
app.use("/app", express.static("public/app"));
app.use("/admin", express.static("public/admin"));


/**
 * 设置模板
 */
app.set("views", "./views"); // 放模板文件的目录
app.set("view engine", "ejs");  // 模板引擎

// 初始化passport模块
import {default as  passport} from "./config/passport";

app.use(passport.initialize());

/**
 * 设置解析数据中间件，默认json传输
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        const namespace = param.split(".")
            , root = namespace.shift();
        let formParam = root;

        while (namespace.length) {
            formParam += "[" + namespace.shift() + "]";
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isArray: function (value) {
            return Array.isArray(value);
        },
        gte: function (param, num) {
            return param >= num;
        }
    }
}));
/**
 * 路由挂载到app上
 */
routes(app);

/**
 * 成功日志
 */
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: "logs/success.log"
        })
    ]
}));

/**
 * 错误日志
 */
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: "logs/error.log"
        })
    ]
}));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
});

/**
 * 连接数据库
 */

// mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.user}:${config.psw}@${config.host}:${config.dbport}/${config.dbs}`);
const db = mongoose.connection;
db.on("error", function () {
    throw new Error("unable to connect to database at " + config.dbs);
});
db.once("open", function (callback) {
    console.log("数据库启动了");
    app.listen(config.port, () => console.log("Express server listening on port " + config.port));

});

