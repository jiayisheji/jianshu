/**
 * Created by jiayi on 2017/9/15.
 */


import {Request, Response, NextFunction} from 'express';

import {default as UsersRouter} from './users/users.route';

/**
 * 导出路由
 * @param app
 */

export default (app) => {
    /**
     * 全局代理
     */
    app.all('*', function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200); // 让options请求快速返回
        } else {
            next();
        }
    });
    /**
     * web端api接口
     */
    // 用户API
    app.use('/api/v1', UsersRouter);
    // 专题API
    // 文集API
    // 文章API
    // 留言API
    // 消息API
    // 搜索API
    /**
     * admin端api接口
     */

    /**
     * http://localhost:3000/ 访问页面
     */
    app.use('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Hello world');
    });
}
