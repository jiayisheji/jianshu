/**
 * 前端API接口
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
import {default as userController} from "../controllers/user";
import {default as BooksController} from "../controllers/books";
import {default as CorpusController} from "../controllers/corpus";
/**
 * web API接口
 */
// 用户登录注册退出找回密码 用户修改资料，查看信息
Router.post("/login", userController.login);
Router.post("/register", userController.register);
Router.post("/logout", passport.authenticate('user', {session: false}), userController.logout);
Router.get("/user/:id", userController.find);

// 文集增删改查
Router.post("/books", passport.authenticate('user', {session: false}), BooksController.save);
Router.put("/books/:id", passport.authenticate('user', {session: false}), BooksController.updata);
Router.delete("/books/:id", passport.authenticate('user', {session: false}), BooksController.remove);
Router.get("/books/:id", BooksController.find);
Router.get("/books", BooksController.search);

// 专题分类
Router.post("/collections", passport.authenticate('user', {session: false}), CorpusController.AddCorpus);
Router.put("/collections/:id", passport.authenticate('user', {session: false}), CorpusController.UploadCorpus);
Router.get("/collections/:id", CorpusController.GetCorpus);
Router.get("/collections", CorpusController.GetAllCorpus);

/**
 * 导出路由
 */
export default Router;