/**
 * Created by jiayi on 2017/6/22.
 */
/**
 * 引入依赖
 */
import * as Express from 'express';
const Router = Express.Router();

Router.get('/', function(req: Express.Request, res: Express.Response) {
    res.render('index', { title: "jianshu", name: "jianshu" });
});

/**
 * 导出路由
 */
export default Router;