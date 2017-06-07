/**
 * Created by jiayi on 2017/5/29.
 */
import * as Express from 'express';
import * as _ from 'lodash';
import * as passport from 'passport';
import {Comments} from '../../../models/comments';
import {Article} from '../../../models/article';

function updateArticleCommentsCount(id: string, count: number){
    Article.findByIdAndUpdate(id, {
        $inc: {
            comments_count: count
        }
    }).exec((err, article: any) => {
        // 防止过界小于0
        if(article.comments_count < 0){
            article.comments_count = 0;
            article.save();
        }
    });
}

/**
 * 查询参数里面是否查询当前文章作者的评论
 * @param query 
 */
function isAuthor(query: any): any{
    if(query === 'true'){
        return true;
    }else{
        return undefined;
    }
}

/**
 * 检查当前用户是否给所查询的评论点过赞
 * @param user 当前登陆用户id
 * @param comments 查询的评论
 */
function compareLiked(user: any, comments: any): any{
    user = JSON.stringify(user);
    return _.map(comments, function(item: any){
        // 如果不返还undefined就表示点过赞
        item.liked = !!_.find(item.likes, function(like: any){
            return JSON.stringify(like.user) === user;
        });
        // 把点赞列表删除，不需要返回给用户看
        item.likes = undefined;
        return item;
    });
}


export function webComments(app) {
    /**
     * 获取列表
     */
    app.get('/article/:id/conmments',
        function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
            if (!req.params.id) return res.sendStatus(400);    
            async function getComments(user: any, req: any, done: any): Promise<any>{
                let page = Math.abs(parseInt(req.query.page, 10)) || 1;
                let limit = Math.abs(parseInt(req.query.limit, 10)) || 15;
                let params: any = {
                    article_id: req.params.id
                };
                if(isAuthor(req.query.author_only)){
                    params.is_author = isAuthor(req.query.author_only);
                }
                var count = await Comments.count(params);
                var list = await Comments.find(params)
                        .sort({created: 'desc'})
                        .populate({path: 'user', select: { _id: 1,  nickname: 1, avatar: 1}})
                        .populate({path: 'children.user', select: { _id: 1,  nickname: 1}})
                        .skip((page - 1) * limit)
                        .limit(limit).exec((err, comment) => {
                            if (err) { 
                                return next(err); 
                            }
                            // 如果没有点赞就直接返回
                            if(!user){
                                return comment;
                            }
                            // 如果登陆就要计算当前用户有没有给评论点赞
                            compareLiked(user._id, comment);
                        });
                return done(count, list);
            }
            passport.authenticate('user', function(err, user, info) {
                if (err) { 
                    return next(err); 
                }
                // 如果登陆就要计算当前用户有没有给评论点赞
                getComments(user, req, function (count, list) {
                    res.json({
                        code: 0,
                        message: "ok",
                        data: list,
                        total: count
                    });
                });
            })(req, res, next);
        });
    /**
     * 添加一条数据
     */
    app.post('/article/:id/conmments',
        passport.authenticate('user', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.params || !req.body) return res.sendStatus(400);  
            let user = (req as any).user._id;          
            // parent_id 如果不为 undefined 就是回复， 如果是就评论
            if(_.isUndefined(req.body.parent_id)){
                // 创建数据模型
                let comment = new Comments({
                    article_id: req.params.id,
                    compiled_content: req.body.content,
                    user_id: user,
                    user: user
                });
                // 保存数据
                comment.save(function (err, comment) {
                    if (err) {
                        res.json({
                            code: 103,
                            message: err.message
                        });
                    }
                    // 更新文章评论数
                    updateArticleCommentsCount(req.params.id, 1);
                    // 查询当前添加的评论，返回给前端
                    Comments.find({_id: comment._id})
                            .populate({path: 'user', select: { _id: 1,  nickname: 1, avatar: 1}})
                            .exec((err, newComment) => {
                            if (err) {
                                res.json({
                                    code: 103,
                                    message: err.message
                                });
                            }
                            res.json({
                                code: 0,
                                message: "ok",
                                data: newComment
                            });
                        });
                });
            }else{
                Comments.update({_id: req.body.parent_id}, {
                        $push: {
                            children: {
                                compiled_content: req.body.content,
                                parent_id: req.body.parent_id,
                                user_id: user,
                                user: user
                            }
                        },
                        $inc: {
                            children_count: 1
                        }
                    })
                    .exec(function (err, comment) {
                        if (err) {
                            res.json({
                                code: 103,
                                message: err.message
                            });
                        }
                    // 更新文章评论数
                    updateArticleCommentsCount(req.params.id, 1);
                    // 根据id查询当前的数据
                    Comments.findOne({
                                _id: req.body.parent_id
                            })
                            .populate({path: 'children.user', select: { _id: 1,  nickname: 1}})
                            .exec((err, newComment) => {
                                if (err) {
                                    res.json({
                                        code: 103,
                                        message: err.message
                                    });
                                }
                                res.json({
                                    code: 0,
                                    message: "ok",
                                    data: newComment.children.pop()
                                });
                            });
                });
            }

        });

    /**
     * 删除一条数据
     */
    app.delete('/article/:article_id/conmments/:conmments_id',
        passport.authenticate('user', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.params) return res.sendStatus(400);
            let user = (req as any).user._id;
            /**
             * 通过文章id和评论id或者回复id和用户id查找指定删除的评论，
             */
            Comments.findOne({
                article_id: req.params.article_id,
                $or: [
                    {
                        _id: req.params.conmments_id,
                        user_id: user,
                    },
                    {
                        'children._id': req.params.conmments_id,
                        'children.user': user
                    }
                ]
            }).exec((err, comment) => {
                if (err) {
                    res.json({
                        code: 103,
                        message: err.message
                    });
                }
                if(_.isNull(comment)){
                    res.json({
                        code: 103,
                        message: "您要删除的评论不存在"
                    });
               }else{
                    // 如果相等就说明删除时当前评论，如果不相等就说明删除时回复。
                    if(comment.get('_id', String) === req.params.conmments_id){
                        // 删除评论 需要把该评论下所有的回复删除，还要加上自己
                        let count = comment.get('children_count', Number) + 1;
                        //更新文章评论数
                        updateArticleCommentsCount(req.params.article_id, -count);
                        comment.remove();
                        res.json({
                            code: 0,
                            message: "ok",
                            data: {
                                _id: comment._id,
                                parent_id: -1
                            }
                        }); 
                    }else{
                        Comments.findByIdAndUpdate(comment._id, {
                            $pull: {
                                children: {
                                    _id: req.params.conmments_id
                                }
                            },
                            $inc: {
                                children_count: -1
                            }
                        })
                        .exec(function (err, comment1) {
                            //更新文章评论数
                            updateArticleCommentsCount(req.params.article_id, -1);
                            // 查询当前添加的评论，返回给前端
                            res.json({
                                code: 0,
                                message: "ok",
                                data: {
                                    _id: req.params.conmments_id,
                                    parent_id: comment._id                           
                                }
                            });
                        });   
                    }
                }   
            });    
        });
    /**
     * 给某个评论添加喜欢
     */
    app.post('/comments/:id/link',
        passport.authenticate('user', {session: false}),
        function (req: Express.Request, res: Express.Response, next: Express.NextFunction) {
            if (!req.params.id) return res.sendStatus(400);
            let user = (req as any).user._id;
            Comments.findOne({
                _id: req.params.id,
                'likes.user': user
            }).exec((err, comment) => {
                if (err) {
                    res.json({
                        code: 103,
                        message: err.message
                    });
                }
                // 如果不是null就表示已经点过赞了
                if(!_.isNull(comment)){
                    res.json({
                        code: 103,
                        message: "您已经点过赞了"
                    });
               }else{
                   Comments.findByIdAndUpdate(req.params.id, {
                    $push:{
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
               }
               
            });
        });

    /**
     * 给某个评论取消喜欢
     */
    app.delete('/comments/:id/link',
        passport.authenticate('user', {session: false}),
        function (req: Express.Request, res: Express.Response) {
            if (!req.params.id) return res.sendStatus(400);
            let user = (req as any).user._id;
            Comments.findOne({
                _id: req.params.id,
                'likes.user': user
            }).exec((err, comment) => {
                if (err) {
                    res.json({
                        code: 103,
                        message: err.message
                    });
                }
                // 如果不是null就表示已经取消点过赞了
                if(_.isNull(comment)){
                    res.json({
                        code: 103,
                        message: "您已经取消点过赞了"
                    });
               }else{
                   Comments.findByIdAndUpdate(req.params.id, {
                    $pull:{
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
