/**
 * Created by jiayi on 2017/9/13.
 */

// 解析请求 body
import * as express from 'express';
import { json, urlencoded } from 'body-parser';
// 初始化passport模块
// import {default as  passport} from './passport';
// 日志中间件
import {default as  expressWinston} from './expressWinston';
// 处理响应结果中间件
import {default as ExpressResponseHandlerMiddleware} from './responseHandlerMiddleware';

/**
 * 引入express配置
 */
const app: express.Application = express();


/**
 * 设置静态资源路径，
 * assets 以后方便迁移七牛
 * web ,app ,admin
 */
app.use('/assets', express.static('public/images'));
app.use('/web', express.static('public/web'));
app.use('/app', express.static('public/app'));
app.use('/admin', express.static('public/admin'));

/**
 * 设置模板 前端渲染没有模板引擎
 */
// app.set('views', './views'); // 放模板文件的目录
// app.set('view engine', 'ejs');  // 模板引擎

// app.use(passport.initialize());

/**
 * 设置解析数据中间件，默认json传输
 */
app.use(urlencoded({extended: false}));
app.use(json());


// 注入app
expressWinston(app);

// 注入中间件
app.use(ExpressResponseHandlerMiddleware);

export default app;
