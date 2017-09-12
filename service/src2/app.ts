/**
 * Created by jiayi on 2017/2/10.
 */
/**
 * 引入依赖模块
 */
import * as express from 'express';
import * as glob from 'glob';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as logger from 'logger';
import * as favicon from 'favicon';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as passportBearer from 'passport-http-bearer';
const Strategy = passportBearer.Strategy;
/**
 * 引入配置
 */
import config = require('./config/config');

/**
 * api接口
 */
import * as api from "./api/index";

/**
 * 引入express配置
 */
const app = express();

/**
 * 设置静态资源路径，web ,app ,admin
 */
app.use('/web', express.static('public/web'));
app.use('/app', express.static('public/app'));
app.use('/admin', express.static('public/admin'));

/**
 * 设置模板
 */
app.set('views', './views'); // 放模板文件的目录
app.set('view engine', 'ejs');  // 模板引擎

/*function extendAPIOutput( req, res, next){
    // 响应成功
    res.apiSuccess = function (data) {
        res.json({
            code: 0,
            message: "ok",
            data: data
        });
    }
    // 响应失败
    // 响应成功
    res.apiError = function (err) {
        res.json({
            code: err.code,
            message: err.message
        });
    }
    next();
}

app.use(extendAPIOutput);*/


// 初始化passport模块
app.use(passport.initialize());
/**
 * 设置解析数据中间件，默认json传输
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


import {User} from './models/user';
passport.use('user', new Strategy(function(token, done) {
        User.findOne({
            token: token
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

import {Admin} from './models/Admin';
passport.use('admin', new Strategy(function(token, done) {
    Admin.findOne({
        token: token
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));
//require('./config/express')(app, config);
/**
 * 启动app
 */
/**
 * web相关路由
 */
routesWeb.web(app);
/**
 * admin相关路由
 */
routesAdmin.admin(app);

/**
 * api接口
 */
api.index(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * 连接数据库
 */

//mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.user}:${config.psw}@${config.host}:${config.dbport}/${config.dbs}`);
let db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.dbs);
});
db.once('open', function (callback) {
    console.log('数据库启动了');
    app.listen(config.port, () => console.log('Express server listening on port ' + config.port));
});

