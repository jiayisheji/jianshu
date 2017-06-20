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
 * admin 控制器
 */
// import {default as CorpusController} from "../controllers/corpus";
/**
 * admin API接口
 */
// 管理员登录注册退出找回密码 用户修改资料，查看信息
/*Router.post("/login", userController.Login);
Router.post("/logout", passport.authenticate('admin', {session: false}), userController.Logout);
Router.get("/admin/:id", userController.GetUser);*/

// 文集增删改查
/*Router.post("/books", passport.authenticate('user', {session: false}), BooksController.AddBooKs);
Router.put("/books/:id", passport.authenticate('user', {session: false}), BooksController.UploadBooks);
Router.delete("/books/:id", passport.authenticate('user', {session: false}), BooksController.RemoveBooKs);
Router.get("/books/:id", BooksController.GetBooKs);
Router.get("/books", BooksController.GetAllBooKs);*/


// 专题分类
/*Router.post("/collections", passport.authenticate('user', {session: false}), CorpusController.AddCorpus);
Router.put("/collections/:id", passport.authenticate('user', {session: false}), CorpusController.UploadCorpus);
Router.get("/collections/:id", CorpusController.GetCorpus);
Router.get("/collections", CorpusController.GetAllCorpus);*/

/**
 * 导出路由
 */
export default Router;