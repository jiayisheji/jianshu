/**
 * Created by jiayi on 2017/5/18.
 */
import * as Express from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';
import {Article} from '../../../models/article';
import {Category} from '../../../models/category';
import {Page} from '../../../utils/page';

const page = new Page();


export function adminArticle(app) {
    /**
     * 获取列表
     */
    app.get('/admin/article',
        passport.authenticate('admin', {session: false}),
        function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
            if (!req.query) return res.sendStatus(400)
            let page = Math.abs(parseInt(req.query.page, 10)) || 1;
            let limit = Math.abs(parseInt(req.query.limit, 10)) || 10;

            async function article(done){
               var count = await Article.count(req.params);
               var list = await Article.find({published: true})
                    .sort({created: 'desc'})
                    .populate({path: 'author', select: { _id: 1,  nickname: 1}})
                    .populate({path: 'category', select: { _id: 1,  title: 1}})
                    .skip((page - 1) * limit)
                    .limit(limit);
               return done(count, list);
            }
            article(function (count, list) {
                res.json({
                    code: 0,
                    message: "ok",
                    data: list,
                    total: count
                });
            });
        });
    /**
     * 获取单条数据
     */
    app.get('/admin/article/:id',
        passport.authenticate('admin', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.params.id) return res.sendStatus(400)
            Article.findById(req.params.id)
                .populate('author')
                .populate('category')
                .exec((err, article) => {
                    if (err) {

                    }
                    res.json({
                        code: 0,
                        message: "ok",
                        data: article
                    });
                });
        });
    /**
     * 添加一条数据
     */
    app.post('/admin/article',
        passport.authenticate('admin', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.body) return res.sendStatus(400);
            (new Category({
                title: req.body.title
            })).save(function () {

            })
            let article = new Article({
                title: req.body.title,
                content: req.body.title,
                abstract: req.body.title,
                published: req.body.published,
                author: '5929abf415c9575b60bfd2e3',
                category: '5929abf415c9575b60bfd2e3'
            });
            article.save(function (err, articles) {
                // console.log(err, articles)
                if (err) {
                    res.json({
                        code: 103,
                        message: err.message
                    });
                }
                res.json({
                    code: 0,
                    message: "ok",
                    data: ""
                });
            });
        });
    /**
     * 更新一条数据
     */
    app.put('/admin/article/:id',
        passport.authenticate('admin', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.params.id) return res.sendStatus(400);
            Article.findByIdAndUpdate(req.params.id, req.query)
                .exec((err) => {
                    if (err) {

                    }
                    res.json({
                        code: 0,
                        message: "ok",
                        data: ""
                    });
                });
        });
    /**
     * 删除一条数据
     */
    app.delete('/admin/article/:id',
        passport.authenticate('admin', {session: false}),
        async function (req: Express.Request, res: Express.Response) {
            if (!req.params.id) return res.sendStatus(400)
            Article.findByIdAndRemove(req.params.id)
                .exec((err) => {
                    if (err) {

                    }
                    res.json({
                        code: 0,
                        message: "ok",
                        data: ""
                    });
                });
        });
};