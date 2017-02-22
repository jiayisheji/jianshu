/**
 * Created by jiayi on 2017/2/20.
 */
import * as Express from 'express';
const Router = Express.Router();

export function web(app) {
    app.use('/', Router);
}

Router.get('/', function(req: Express.Request, res: Express.Response) {
    res.render('index', { title: "jianshu", name: "jianshu" });
});