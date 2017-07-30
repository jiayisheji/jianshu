/**
 * 文集控制器
 * Created by jiayi on 2017/6/18.
 */
import * as async from 'async';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import {default as Books, BooksModel} from '../models/books';
import {Request, Response, NextFunction} from 'express';

/**
 * 定义类接口
 */
interface BooksInterface {
    save(req: Request, res: Response, next: NextFunction);

    find(req: Request, res: Response, next: NextFunction);

    updata(req: Request, res: Response, next: NextFunction);

    search(req: Request, res: Response, next: NextFunction);

    byId(req: Request, res: Response, next: NextFunction, id: string);

    remove(req: Request, res: Response, next: NextFunction);
}

interface userinfoInterface {
    slug: string;
    nickname?: string;
    avatar?: string;
}

/**
 * 获取关联用户信息
 * @param data
 * @returns {{userinfoInterface}}
 */
const getUserinfo = function (data: any): userinfoInterface {
    return Object.assign({'slug': data._doc._id}, data._doc, {'_id': undefined})
};

/**
 * 格式化单条数据
 * @param data
 * @returns {CorpusModel}
 */
const formatData = function (data: any): Object {
    return {
        'slug': data._id,
        'updatedAt': new Date(data.updatedAt).toLocaleString(),
        'createdAt': new Date(data.createdAt).toLocaleString(),
        'owner': getUserinfo(data.owner),
        'title': data.title
    };
}

/**
 * 文集控制器
 */
class BooksController implements BooksInterface {
    constructor() {
    }

    /**
     * 获取查询id
     * @param {e.Request} req
     * @param {Response} res
     * @param {e.NextFunction} next
     * @returns {Promise<void>}
     */
    async byId(req: Request, res: Response, next: NextFunction, id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                'meta': {
                    'code': 422,
                    'message': '文集id不对'
                }
            });
        }
        try {
            const books = await Books.findById(id)
                .populate({path: 'owner', select: {nickname: 1, avatar: 1, _id: 1}});
            if (!books) {
                return res.json({
                    'meta': {
                        'code': 404,
                        'message': '没有找到指定文集'
                    }
                });
            }
            (req as any).books = books;
            next();
        } catch (err) {
            return next(err);
        }
    }

    /**
     * POST /books
     * 新增一个
     */
    async save(req: Request, res: Response, next: NextFunction) {
        if ((req as any).isAuthenticated()) {
            res.json({
                'meta': {
                    'code': 403,
                    'message': '未登陆'
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
                let message = '未知错误';
                if (result.mapped().title) {
                    message = result.mapped().title.msg
                }
                res.json({
                    'meta': {
                        'code': 422,
                        'message': message
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
                    'meta': {
                        'code': 200,
                        'message': '添加成功'
                    },
                    'data': formatData(books)
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
        const books = (req as any).books;
        res.json({
            'meta': {
                'code': 200,
                'message': '查询成功'
            },
            'data': formatData(books)
        });
    }

    /**
     * PUT /books/:id
     * 更新一个
     */
    async updata(req: Request, res: Response, next: NextFunction) {
        if ((req as any).isAuthenticated()) {
            res.json({
                'meta': {
                    'code': 403,
                    'message': '未登陆'
                }
            });
            return;
        }
        if (!req.params.id) {
            res.json({
                'meta': {
                    'code': 422,
                    'message': '缺少文集id'
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
                let message = '未知错误';
                if (result.mapped().title) {
                    message = result.mapped().title.msg
                }
                res.json({
                    'meta': {
                        'code': 422,
                        'message': message
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
                            'meta': {
                                'code': 404,
                                'message': '没有找到指定文集'
                            }
                        });
                        return;
                    }
                    res.json({
                        'meta': {
                            'code': 201,
                            'message': '修改成功'
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
        const page = Math.abs(parseInt(req.query.page, 10)) || 1;
        const limit = Math.abs(parseInt(req.query.limit, 10)) || 15;
        const params: any = {};
        async.waterfall([
            function getCount(done: Function) {
                Books.count(16, (err, count) => {
                    done(err, count);
                });
            },
            function getLsit(count: number, done: Function) {
                Books.find(params)
                    .populate({path: 'owner', select: {nickname: 1, avatar: 1, _id: 1}})
                    .sort({created: 'desc'})
                    .skip((page - 1) * limit)
                    .limit(limit).exec((err, books) => {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        'meta': {
                            'code': 200,
                            'message': '获取全部成功'
                        },
                        'data': _.map(books, formatData),
                        'total': count
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
        const books = (req as any).books;
        books.remove((err) => {
            if (err) {
                return res.json({
                    'meta': {
                        'code': 200,
                        'message': '删除失败'
                    }
                });
            }
            res.json({
                'meta': {
                    'code': 200,
                    'message': '删除成功'
                }
            });
        });
    }
}

/**
 * 导出模块
 */
export default new BooksController();


