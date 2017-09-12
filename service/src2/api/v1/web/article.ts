/**
 * Created by jiayi on 2017/5/18.
 */
import * as Express from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';
import {Article} from '../../../models/article';
import { Likes } from '../../../models/likes';
import {Category} from '../../../models/category';
import {Page} from '../../../utils/page';
import {Comments} from '../../../models/comments';
const page = new Page();

function getUser(): string{
    return ["5929abf415c9575b60bfd2e3","5933f6aec8deba2d18640e97","5933f6e0c8deba2d18640e98","5933f6fec8deba2d18640e99","5933f718c8deba2d18640e9a","5933f75dc8deba2d18640e9b"][Math.floor((Math.random()*6))]
}

export function webArticle(app) {
    /**
     * 获取列表
     */
    app.get('/article',
        function (req: Express.Request, res: Express.Response) {
            if (!req.query) return res.sendStatus(400)
            Article.find({published: true})
                .sort({created: 'desc'})
                .populate({path: 'author', select: { _id: 1,  nickname: 1, avatar: 1}})
                .populate({path: 'category', select: { _id: 1,  title: 1}})
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
                .populate({path: 'author', select: { _id: 1,  nickname: 1, avatar: 1}})
                .exec((err, article: any) => {
                    article.views_count++;
                    article.markModified('views_count');
                    article.save();
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
        //passport.authenticate('user', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.body) return res.sendStatus(400);
            function process(data: any): any{
                let result: any = _.assign({}, data);
                result.author = getUser();
                return result;
            }
            let article = new Article(process(req.body));
            article.save(function (err, articles) {
                if (err) {
                    res.json({
                        code: 103,
                        message: err.message
                    });
                }
                let like = new Likes({
                    article_id: articles.get('_id', String),
                    author_id: articles.get('author', String)
                });
                like.save(function (err, articles) {
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

     /**
     * 给某个文章添加喜欢
     */
    app.post('/article/:id/link',
        passport.authenticate('user', { session: false }),
        function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
            if (!req.params.id) return res.sendStatus(400);
            let user = (req as any).user._id;
            Likes.findOne({
                article_id: req.params.id,
                'likes.user': user
            }).exec((err, like) => {
                if (err) {
                    res.json({
                        code: 104,
                        message: err.message
                    });
                }                
                // 如果不是null就表示已经点过赞了
                if (_.isNull(like)) {
                    Likes.update({article_id: req.params.id}, {
                        $push: {
                            likes: {
                                user: user
                            }
                        },
                        $inc: {
                            likes_count: 1
                        }
                    })
                    .exec((err) => {
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
                } else {
                    res.json({
                        code: 103,
                        message: "您已经点过赞了"
                    });
                }

            });
        });

    /**
     * 给某个文章取消喜欢
     */
    app.delete('/article/:id/link',
        passport.authenticate('user', { session: false }),
        function (req: Express.Request, res: Express.Response) {
            if (!req.params.id) return res.sendStatus(400);
            let user = (req as any).user._id;
            Likes.findOne({
                article_id: req.params.id,
                'likes.user': user
            }).exec((err, like) => {
                if (err) {
                    res.json({
                        code: 103,
                        message: err.message
                    });
                }
                // 如果不是null就表示已经取消点过赞了
                if (_.isNull(like)) {
                    res.json({
                        code: 103,
                        message: "您已经取消点过赞了"
                    });
                } else {
                    Likes.update({article_id: req.params.id}, {
                        $pull: {
                            likes: {
                                user: user
                            }
                        },
                        $inc: {
                            likes_count: -1
                        }
                    })
                        .exec((err) => {
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
                }

            });
        });   
};

function CountChineseCharacters(Words) {
    var W = [];
    var iTotal = 0, inum = 0;
    for (var i = 0; i < Words.length; i++) {
        var iNumwords = 0;
        var c = Words.charAt(i);
        if (c.match(/[\u4e00-\u9fa5]/)) {
            if (isNaN(W[c])) {
                iNumwords++;
                W[c] = 1;
            }
            iTotal++;
        }
        if (c.match(/[0-9]/)) {
            inum++;
        }
    }
    return inum + iTotal;
}