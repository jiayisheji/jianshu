/**
 * Created by jiayi on 2017/2/20.
 */
import * as Express from 'express';
const Router = Express.Router();
import * as Login from './v1/login';

export function index(app) {
    // 处理跨域问题
    app.all('*',function (req: Express.Request, res: Express.Response, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method == 'OPTIONS') {
            res.sendStatus(200); //让options请求快速返回
        } else {
            next();
        }
    });
    // 设置api
    app.use('/api/v1', Router);
}

Login.adminlogin(Router);