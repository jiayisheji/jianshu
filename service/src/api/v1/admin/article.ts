/**
 * Created by jiayi on 2017/5/18.
 */
import * as Express from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';
import * as Article from '../../../models/article';
let list:any = [];




export function adminArticle(app) {
    /**
     * 获取列表
     */
    app.get('/admin/article',
        passport.authenticate('admin', { session: false }),
        function (req: Express.Request, res: Express.Response) {

        if (!req.query) return res.sendStatus(400)
        Article.find({}, function (err, articles) {
            res.apiSuccess(articles);
        });

    });
    /**
     * 获取单条数据
     */
    app.get('/admin/article/:id',
        passport.authenticate('admin', { session: false }),
        function (req: Express.Request, res: Express.Response) {
        if (!req.params.id) return res.sendStatus(400)
        var index = list.findIndex(function (item) {
            return  item.id == req.params.id;
        });
        res.apiSuccess(list[index]);
    });
    /**
     * 添加一条数据
     */
    app.post('/admin/article',
        passport.authenticate('admin', { session: false }),
        function (req: Express.Request, res: Express.Response) {
        //console.log(req)

       /* passport.authenticate('admin', function(err, user, info) {
            console.log(err, user, info)
        })(req, res);*/

        if (!req.body) return res.sendStatus(400)
        let article = new Article(req.body);
        article.save(function (err, articles) {
            //console.log(passport)
            res.apiSuccess("");
        });
    });
    /**
     * 更新一条数据
     */
    app.put('/admin/article/:id',
        passport.authenticate('bearer', { session: false }),
        function (req: Express.Request, res: Express.Response) {
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
    app.delete('/admin/article/:id',
        passport.authenticate('admin', { session: false }),
        function (req: Express.Request, res: Express.Response) {
        if (!req.params.id) return res.sendStatus(400)
        var index = list.findIndex(function (item) {
            return  item.id == req.params.id;
        });
        list.splice(index, 1);
        res.apiSuccess("");
    });
};