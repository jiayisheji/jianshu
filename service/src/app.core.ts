/**
 * Created by jiayi on 2017/9/15.
 */
// 解析请求 body
import * as express from 'express';
// 导入中间件
import {default as appFilter} from './app.filter';

/**
 * 实例化express
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

// 中间件注入
appFilter(app);

export default app;
