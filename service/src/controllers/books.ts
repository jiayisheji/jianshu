/**
 * 文集控制器
 * Created by jiayi on 2017/6/18.
 */
import * as async from "async";
import * as _ from 'lodash';
import {default as Books, BooksModel} from "../models/Books";
import {Request, Response, NextFunction} from "express";

/**
 * 定义类接口
 */
interface booksInterface {
    save(req: Request, res: Response, next: NextFunction);

    find(req: Request, res: Response, next: NextFunction);

    updata(req: Request, res: Response, next: NextFunction);

    search(req: Request, res: Response, next: NextFunction);

    remove(req: Request, res: Response, next: NextFunction);
}

/**
 * 文集控制器
 */
class BooksController implements booksInterface {
    constructor() {
    }

    /**
     * POST /books
     * 新增一个
     */
    async save(req: Request, res: Response, next: NextFunction) {
        if ((req as any).isAuthenticated()) {
            res.json({
                "meta": {
                    "code": 403,
                    "message": "未登陆"
                }
            });
            return;
        }
        req.checkBody({
            'title': {
                notEmpty: true,
                isLength: {
                    options: [{min: 1, max: 20}],
                    errorMessage: '文集标题长度1-20位' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '文集标题不能为空'
            }
        });

        req.getValidationResult().then(function (result: any) {
            if (!result.isEmpty()) {
                let message = "未知错误";
                if (result.mapped().title) {
                    message = result.mapped().title.msg
                }
                res.json({
                    "meta": {
                        "code": 422,
                        "message": message
                    }
                });
                return;
            }
            const newBooks = new Books({
                title: req.body.title,
                owner: (req as any).user._id
            });

            newBooks.save((err: any, books: BooksModel) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    "meta": {
                        "code": 200,
                        "message": '添加成功'
                    },
                    'data': {
                        'title': books.title,
                        '_id': books._id,
                        'owner': books.owner,
                        'updatedAt': new Date(books.updatedAt).toLocaleString(),  // 解决-8小时问题
                        'createdAt': new Date(books.createdAt).toLocaleString()
                    }
                });
            });
        }, function (errors: any) {
            console.log(errors)
        });
    }

    /**
     * GET /books/:id
     * 获取一个
     */
    async find(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            res.json({
                "meta": {
                    "code": 422,
                    "message": "缺少文集id"
                }
            });
            return;
        }
        Books.findOne({_id: req.params.id})
            .exec((err: any, books: BooksModel) => {
                if (err) {
                    res.json({
                        "meta": {
                            "code": 422,
                            "message": '文集id不对'
                        }
                    });
                    return;
                }
                if (!books) {
                    res.json({
                        "meta": {
                            "code": 404,
                            "message": '没有找到指定文集'
                        }
                    });
                    return;
                }
                res.json({
                    "meta": {
                        "code": 200,
                        "message": '查询成功'
                    },
                    "data": {
                        'title': books.title,
                        '_id': books._id,
                        'owner': books.owner,
                        'updatedAt': new Date(books.updatedAt).toLocaleString(),  // 解决-8小时问题
                        'createdAt': new Date(books.createdAt).toLocaleString()
                    }
                });
            });
    }

    /**
     * PUT /books/:id
     * 更新一个
     */
    async updata(req: Request, res: Response, next: NextFunction) {
        if ((req as any).isAuthenticated()) {
            res.json({
                "meta": {
                    "code": 403,
                    "message": "未登陆"
                }
            });
            return;
        }
        if (!req.params.id) {
            res.json({
                "meta": {
                    "code": 422,
                    "message": "缺少文集id"
                }
            });
            return;
        }
        req.checkBody({
            'title': {
                notEmpty: true,
                isLength: {
                    options: [{min: 1, max: 20}],
                    errorMessage: '文集标题长度1-20位' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '文集标题不能为空'
            }
        });
        req.getValidationResult().then(function (result: any) {
            if (!result.isEmpty()) {
                let message = "未知错误";
                if (result.mapped().title) {
                    message = result.mapped().title.msg
                }
                res.json({
                    "meta": {
                        "code": 422,
                        "message": message
                    }
                });
                return;
            }
            Books.findOneAndUpdate({_id: req.params.id, owner: (req as any).user._id}, {title: req.body.title})
                .exec((err: any, update: any) => {
                    if (err) {
                        return next(err);
                    }
                    if (!update.ok) {
                        res.json({
                            "meta": {
                                "code": 404,
                                "message": '没有找到指定文集'
                            }
                        });
                        return;
                    }
                    res.json({
                        "meta": {
                            "code": 201,
                            "message": '修改成功'
                        }
                    });
                });
        }, function (errors: any) {
            console.log(errors)
        });
    }

    /**
     * GET /books
     * 获取全部
     */
    async search(req: Request, res: Response, next: NextFunction) {
        let page = Math.abs(parseInt(req.query.page, 10)) || 1;
        let limit = Math.abs(parseInt(req.query.limit, 10)) || 15;
        let params: any = {};
        async.waterfall([
            function getCount(done: Function) {
                Books.count(16, (err, count) => {
                    done(err, count);
                });
            },
            function getLsit(count: number, done: Function) {
                Books.find(params)
                    .sort({created: 'desc'})
                    .skip((page - 1) * limit)
                    .limit(limit).exec((err, books) => {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        "meta": {
                            "code": 200,
                            "message": '获取全部成功'
                        },
                        "data": _.map(books, function (item: BooksModel) {
                            return {
                                'title': item.title,
                                '_id': item._id,
                                'owner': item.owner,
                                'updatedAt': new Date(item.updatedAt).toLocaleString(),  // 解决-8小时问题
                                'createdAt': new Date(item.createdAt).toLocaleString()
                            }
                        })
                    });
                });
            }
        ], (err: any) => {

        })
    }

    /**
     * DELETE /books
     * 删除一个
     */
    async remove(req: Request, res: Response, next: NextFunction) {
        if ((req as any).isAuthenticated()) {
            res.json({
                "meta": {
                    "code": 403,
                    "message": "未登陆"
                }
            });
            return;
        }
        if (!req.params.id) {
            res.json({
                "meta": {
                    "code": 422,
                    "message": "缺少文集id"
                }
            });
            return;
        }
        Books.findOneAndRemove({_id: req.params.id, owner: (req as any).user._id})
            .exec((err: any, update: any) => {
                if (err) {
                    res.json({
                        "meta": {
                            "code": 422,
                            "message": '文集id不对'
                        }
                    });
                    return;
                }
                if (!update) {
                    res.json({
                        "meta": {
                            "code": 404,
                            "message": '没有找到指定文集'
                        }
                    });
                    return;
                }
                if (!update.ok) {
                    res.json({
                        "meta": {
                            "code": 200,
                            "message": '删除失败'
                        }
                    });
                    return;
                }
                res.json({
                    "meta": {
                        "code": 200,
                        "message": '删除成功'
                    }
                });
            });
    }
}

/**
 * 导出模块
 */
export default new BooksController();


