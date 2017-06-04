/**
 * Created by jiayi on 2017/2/20.
 */
import * as Express from 'express';
const Router = Express.Router();
/**
 * admin api 引用
 */
import * as adminLogin from './v1/admin/login';
import * as adminArticle from './v1/admin/article';
/**
 * web api 引用
 */
import * as webLogin from './v1/web/login';
import * as webRegister from './v1/web/register';
import * as webArticle from './v1/web/article';
import * as webComments from './v1/web/comments';
import * as webReport from './v1/web/report';

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
/**
 * admin api 调用
 */
adminLogin.adminlogin(Router);
adminArticle.adminArticle(Router);
/**
 * web api 调用
 */
webLogin.webLogin(Router);
webRegister.webRegister(Router);
webArticle.webArticle(Router);
webComments.webComments(Router);
webReport.webRouter(Router);