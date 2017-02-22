/**
 * Created by jiayi on 2017/2/20.
 */

import * as Express from 'express';
const Router = Express.Router();

export function admin(app) {
    app.use('/admin', Router);
}

Router.get('/', function(req: Express.Request, res: Express.Response) {
    res.render('admin', { title: "admin-jianshu", name: "admin-jianshu" });
});
