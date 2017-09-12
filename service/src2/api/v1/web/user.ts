/**
 * Created by jiayi on 2017/5/29.
 */
import * as Express from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';
import {Article} from '../../../models/article';
import {Category} from '../../../models/category';
import {Page} from '../../../utils/page';

const page = new Page();


export function webArticle(app) {
    /**
     * 获取列表
     */
    app.get('/article',
        function (req: Express.Request, res: Express.Response) {
            if (!req.query) return res.sendStatus(400)
            Article.find({published: true})
                .sort({created: 'desc'})
                .populate('author')
                .populate('category')
                .exec(async function (err, article) {
                    let {data, total} = await page.getPage(article, req.query.page);

                    res.json({
                        code: 0,
                        message: "ok",
                        data: data,
                        total: total
                    });
                });
        });
    /**
     * 获取单条数据
     */
    app.get('/article/:id',
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
    app.post('/article',
        passport.authenticate('user', {session: false}),
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
    app.put('/article/:id',
        passport.authenticate('user', {session: false}),
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
    app.delete('/article/:id',
        passport.authenticate('user', {session: false}),
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