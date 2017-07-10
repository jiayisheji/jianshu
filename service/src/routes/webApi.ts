/**
 * 前端API接口
 * Created by jiayi on 2017/6/18.
 */

/**
 * 引入依赖
 */
import * as Express from "express";
const Router = Express.Router();
import * as passport from "passport";

/**
 * web 控制器
 */
import {default as userController} from "../controllers/user";
import {default as BooksController} from "../controllers/books";
import {default as ArticleController} from "../controllers/article";
import {default as CorpusController} from "../controllers/corpus";



/**
 * web API接口
 */
// 用户登录注册退出找回密码 用户修改资料，查看信息
Router.post("/login", userController.login);
Router.post("/register", userController.register);
Router.post("/logout", passport.authenticate("user", {session: false}), userController.logout);
Router.get("/user/:userid/home", userController.home);
/*Router.get("/user/:id/profile", userController.profile);
Router.get("/user/:id/basic", userController.basic);*/
Router.param("userid", userController.byId);


// 文集增删改查
Router.post("/article", passport.authenticate("user", {session: false}), ArticleController.save);
Router.put("/article/:articleid", passport.authenticate("user", {session: false}), ArticleController.updata);
Router.delete("/article/:articleid", passport.authenticate("user", {session: false}), ArticleController.remove);
Router.get("/article/:articleid", ArticleController.find);
Router.get("/article", ArticleController.search);
Router.param("articleid", ArticleController.byId);

// 文集增删改查
Router.post("/books", passport.authenticate("user", {session: false}), BooksController.save);
Router.put("/books/:booksid", passport.authenticate("user", {session: false}), BooksController.updata);
Router.delete("/books/:booksid", passport.authenticate("user", {session: false}), BooksController.remove);
Router.get("/books/:booksid", BooksController.find);
Router.get("/books", BooksController.search);
Router.param("booksid", BooksController.byId);


// 专题分类
Router.post("/collections", passport.authenticate("user", {session: false}), CorpusController.save);
Router.put("/collections/:collectionsid", passport.authenticate("user", {session: false}), CorpusController.updata);
Router.get("/collections/:collectionsid", CorpusController.find);
Router.get("/collections", CorpusController.search);
Router.param("collectionsid", CorpusController.byId);

/**
 * 导出路由
 */
export default Router;