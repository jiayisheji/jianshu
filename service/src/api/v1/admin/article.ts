/**
 * Created by jiayi on 2017/5/18.
 */
import * as Express from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';
let list:any = [];

export function adminArticle(app) {
    /**
     * 获取列表
     */
    app.get('/admin/article',
        function (req: Express.Request, res: Express.Response) {
        console.log(req.isAuthenticated())

        if (!req.query) return res.sendStatus(400)
        res.apiSuccess(list);
    });
    /**
     * 获取单条数据
     */
    app.get('/admin/article/:id', function (req: Express.Request, res: Express.Response) {
        if (!req.params.id) return res.sendStatus(400)
        var index = list.findIndex(function (item) {
            return  item.id == req.params.id;
        });
        res.apiSuccess(list[index]);
    });
    /**
     * 添加一条数据
     */
    app.post('/admin/article', function (req: Express.Request, res: Express.Response) {
        //console.log(req)
        if (!req.body) return res.sendStatus(400)
        list.push(req.body);
        res.apiSuccess("");
    });
    /**
     * 更新一条数据
     */
    app.put('/admin/article/:id', function (req: Express.Request, res: Express.Response) {
        if (!req.params.id) return res.sendStatus(400);
        var index = list.findIndex(function (item) {
           return  item.id == req.params.id;
        });
        _.merge(list[index], req.body);
        res.apiSuccess("");
    });
    /**
     * 删除一条数据
     */
    app.delete('/admin/article/:id', function (req: Express.Request, res: Express.Response) {
        if (!req.params.id) return res.sendStatus(400)
        var index = list.findIndex(function (item) {
            return  item.id == req.params.id;
        });
        list.splice(index, 1);
        res.apiSuccess("");
    });
};