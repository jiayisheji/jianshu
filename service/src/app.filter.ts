/**
 * Created by jiayi on 2017/9/15.
 */
import { json, urlencoded } from 'body-parser';
// 初始化passport模块
// import {default as  passport} from './passport';
// Request请求处理
import {default as ExpressRequestMiddlewareFilter} from './app/requestmiddleware.filter';
// response响应处理
import {default as ExpressResponseMiddlewareFilter} from './app/responsemiddleware.filter';
// 请求日志
import {default as ExpressWinstonFilter} from './app/expresswinston.filter';
import {Request} from 'express';

export default (app) => {
    /**
     * 设置解析数据中间件，默认json传输
     */
    app.use(urlencoded({extended: false}));
    app.use(json());
    // 注入passport模块
    // app.use(passport.initialize());
    // 注入response响应处理
    app.use(ExpressRequestMiddlewareFilter);
    // 注入response响应处理
    app.use(ExpressResponseMiddlewareFilter);
    // 注入请求日志
    ExpressWinstonFilter(app);
};
