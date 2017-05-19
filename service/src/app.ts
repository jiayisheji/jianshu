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
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;




/**
 * 引入配置
 */
import config = require('./config');

/**
 * 导入路由
 */
import * as routesAdmin from "./routes/admin";
import * as routesWeb from "./routes/web";

/**
 * api接口
 */
import * as api from "./api/index";

/**
 * 连接数据库
 */
mongoose.connect(config.db);
let db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});
db.once('open', function (callback) {
    console.log('数据库启动了')
});


/**
 * 引入数据库模型
 */
const models = glob.sync(config.root + '/models/*.js');
models.forEach(function (model) {
    require(model);
});

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

function extendAPIOutput( req, res, next){
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

app.use(extendAPIOutput);




/**
 * 设置解析数据中间件，默认json传输
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use('user', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(username, password, done)
        return done(null, user);
    }
));

passport.use('admin', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        console.log(username, password, done)
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    console.log(user, done)
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    console.log(user, done)
    done(null, user);//可以通过数据库方式操作
});



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
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




app.listen(config.port, () => console.log('Express server listening on port ' + config.port));