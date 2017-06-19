/**
 * 前后API接口
 * Created by jiayi on 2017/6/18.
 */

/**
 * 引入依赖
 */
import * as Express from 'express';
const Router = Express.Router();
import * as passport from "passport";

/**
 * web 控制器
 */
import * as userController from "./user";
import * as BooksController from "./books";
import * as CorpusController from "./corpus";
/**
 * web API接口
 */
// 用户登录注册退出找回密码 用户修改资料，查看信息
Router.post("/login", userController.Login);
Router.post("/register", userController.Register);
Router.post("/logout", passport.authenticate('user', {session: false}), userController.Logout);
Router.post("/logout", passport.authenticate('user', {session: false}), userController.Logout);
Router.get("/user/:id", userController.GetUser);

// 文集增删改查
Router.post("/books", passport.authenticate('user', {session: false}), BooksController.AddBooKs);
Router.put("/books/:id", passport.authenticate('user', {session: false}), BooksController.UploadBooks);
Router.delete("/books/:id", passport.authenticate('user', {session: false}), BooksController.RemoveBooKs);
Router.get("/books/:id", BooksController.GetBooKs);
Router.get("/books", BooksController.GetAllBooKs);

// 专题分类
Router.post("/collections", passport.authenticate('user', {session: false}), CorpusController.AddCorpus);
Router.put("/collections/:id", passport.authenticate('user', {session: false}), CorpusController.UploadCorpus);
Router.get("/collections/:id", CorpusController.GetCorpus);
Router.get("/collections", CorpusController.GetAllCorpus);


/**
 * 导出接口
 */
export function index(app) {
    // 处理跨域问题
    app.all('*',function (req: Express.Request, res: Express.Response, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200); //让options请求快速返回
        } else {
            next();
        }
    });
    // 设置api
    app.use('/api/v1', Router);
}



/**
 * admin API接口
 */