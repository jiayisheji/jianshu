/**
 * Created by jiayi on 2017/9/8.
 */
/**
 * 专题控制器
 * Created by jiayi on 2017/6/18.
 */
import {default as Collections, CollectionsModel} from '../models/collections';
import {default as CollectionsSubscribers} from '../models/corpus_subscribers';
import {Request, Response, NextFunction} from 'express';
import * as mongoose from 'mongoose';
import {search} from './corpus/common';
import {getUserPopulate} from './utility';

/**
 * 定义类接口
 */
export interface InterfaceCollections {
    byId(req: Request, res: Response, next: NextFunction, id: string);

    save(req: Request, res: Response, next: NextFunction);

    find(req: Request, res: Response, next: NextFunction);

    updata(req: Request, res: Response, next: NextFunction);

    count(req: Request, res: Response, next: NextFunction);

    search(req: Request, res: Response, next: NextFunction);

    subscribe(req: Request, res: Response, next: NextFunction);

    unsubscribe(req: Request, res: Response, next: NextFunction);

    editorsAndSubscribers(req: Request, res: Response, next: NextFunction);
}


/**
 * 专题控制器
 */
class CollectionsController implements InterfaceCollections {
    constructor() {
    }

    /**
     * 获取查询id
     * @param {e.Request} req
     * @param {Response} res
     * @param {e.NextFunction} next
     * @param {e.String} id
     * @returns {Promise<void>}
     */
    async byId(req: Request, res: Response, next: NextFunction, id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                'meta': {
                    'code': 422,
                    'message': '专题id不对'
                }
            });
        }
        try {
            const corpus = await Collections.findOne({_id: id})
                .populate(getUserPopulate('owner'))
                .populate(getUserPopulate('managers.manager'));
            if (!corpus) {
                return res.json({
                    'meta': {
                        'code': 404,
                        'message': '有找到指定专题'
                    }
                });
            }
            (req as any).corpus = corpus;
            next();
        } catch (err) {
            return next(err);
        }
    }

    /**
     * POST /corpusooks
     * 用户添加一个专题
     */
    async save(req: Request, res: Response, next: NextFunction) {
        req.checkBody({
            'title': {
                notEmpty: true,
                isLength: {
                    options: [{min: 1, max: 20}],
                    errorMessage: '名称长度不是1-20位' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '名称不能为空'
            },
            'avatar': {
                notEmpty: true, // won't validate if field is empty
                errorMessage: '封面不能为空' // Error message for the parameter
            }
        });
        const errors = req.validationErrors();
        if (errors) {
            res.json({
                'meta': {
                    'code': 422,
                    'message': '参数不全'
                }
            });
            return;
        }
        const newCollections = new Collections(Object.assign({owner: (req as any).user._id}, req.body));
        try {
            const corpus = await newCollections.save();
            const subscribers = await new CollectionsSubscribers({collection_id: corpus._id, subscribers: []}).save();

            res.json({
                'meta': {
                    'code': 200,
                    'message': '添加成功'
                },
                'data': {
                    'slug': corpus._id
                }
            });
        } catch (err) {
            console.log('给用户添加专题', err);
            res.json({
                'meta': {
                    'code': 422,
                    'message': '保存专题失败'
                }
            });
        }
    }

    /**
     * GET /corpus/:id
     * 获取一个专题
     */
    async find(req: Request, res: Response, next: NextFunction) {
        const corpus = (req as any).corpus;
        console.log(corpus)
        res.json({
            'meta': {
                'code': 200,
                'message': '查询成功'
            },
            'data': corpus.formatData()
        });
    }

    /**
     * PUT /corpus/:id/edit
     * 更新一个专题
     */
    async updata(req: Request, res: Response, next: NextFunction) {
        req.checkBody({
            'title': {
                notEmpty: true,
                isLength: {
                    options: [{min: 1, max: 20}],
                    errorMessage: '名称长度不是1-20位' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '名称不能为空'
            },
            'avatar': {
                notEmpty: true, // won't validate if field is empty
                errorMessage: '封面不能为空' // Error message for the parameter
            }
        });
        const errors = req.validationErrors();
        if (errors) {
            res.json({
                'meta': {
                    'code': 422,
                    'message': '参数不全'
                }
            });
            return;
        }
        const corpus = Object.assign((req as any).corpus, req.body);
        corpus.save((err) => {
            if (err) {
                return res.json({
                    'meta': {
                        'code': 422,
                        'message': '修改失败'
                    }
                });
            }
            res.json({
                'meta': {
                    'code': 201,
                    'message': '修改成功'
                }
            });
        });
    }

    /**
     * GET /corpusooks
     * 获取专题数量
     */
    async count(req: Request, res: Response, next: NextFunction) {
        const params: any = req.query;
        try {
            const count = await Collections.count(params);
            res.json({
                'meta': {
                    'code': 200,
                    'message': '获取全部成功'
                },
                'data': {
                    'total': count
                }
            });
        } catch (err) {
            console.log('通过文集ID获取文集信息失败', err);
            res.json({
                'meta': {
                    'code': 404,
                    'message': '没有找到指定专题'
                }
            });
        }
    }

    /**
     * GET /corpusooks
     * 获取全部专题
     */
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const corpus = await search(req.query);
            res.json({
                'meta': {
                    'code': 200,
                    'message': '获取全部成功'
                },
                'data': corpus.data,
                'total': corpus.total,
                'page': corpus.page
            });
        } catch (err) {
            console.log('通过获取全部专题信息失败', err);
            res.json({
                'meta': {
                    'code': 404,
                    'message': '没有找到指定专题'
                }
            });
        }
    }

    /**
     * PUT /corpus/:id/subscribe
     * 关注某个专题
     */
    async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
            const subscribers = await CollectionsSubscribers.findOne({
                collection_id: (req as any).corpus._id
            });
            if (!subscribers) {
                // const count = subscribers.subscribers.length + 1;
                subscribers.update({
                    $push: {
                        subscribers: {
                            subscriber: (req as any).user._id
                        }
                    }
                });
                res.json({
                    'meta': {
                        'code': 200,
                        'message': '添加成功'
                    },
                    'data': {
                        'subscribers_count': 0
                    }
                });
            } else {
                res.json({
                    'meta': {
                        'code': 200,
                        'message': '已经添加过了'
                    }
                });
            }
        } catch (err) {
            console.log('给用户添加专题', err);
            res.json({
                'meta': {
                    'code': 404,
                    'message': '没有找到'
                }
            });
        }
    }

    /**
     * DELETE /corpus/:id/unsubscribe
     * 取消关注某个专题
     */
    async unsubscribe(req: Request, res: Response, next: NextFunction) {

    }

    async editorsAndSubscribers(req: Request, res: Response, next: NextFunction) {
    }
}

/**
 * 导出模块
 */
export default new CollectionsController();
