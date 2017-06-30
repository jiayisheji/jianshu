/**
 * 专题控制器
 * Created by jiayi on 2017/6/18.
 */
import {default as Corpus, CorpusModel} from "../models/corpus";
import {Request, Response, NextFunction} from "express";
import * as mongoose from "mongoose";
import * as _ from "lodash";

/**
 * 定义类接口
 */
interface corpusInterface {
    save(req: Request, res: Response, next: NextFunction);

    find(req: Request, res: Response, next: NextFunction);

    updata(req: Request, res: Response, next: NextFunction);

    count(req: Request, res: Response, next: NextFunction);

    byId(req: Request, res: Response, next: NextFunction, id: string);

    search(req: Request, res: Response, next: NextFunction);
}
/**
 * 格式化单条数据
 * @param data
 * @returns {CorpusModel}
 */
const formatData = function (data: any): Object {
    return {
        "slug": data._id,
        "updatedAt": new Date(data.updatedAt).toLocaleString(),
        "createdAt": new Date(data.createdAt).toLocaleString(),
        "owner": data.owner,
        "title": data.title,
        "avatar": data.avatar,
        "description": data.description,
        "verify": data.verify,
        "push": data.push,
        "editors": _.map(data.editors, function (item: any): Object {
            return item.editor;
        })
    };
}

/**
 * 专题控制器
 */
class CorpusController implements corpusInterface {
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
                "meta": {
                    "code": 422,
                    "message": '专题id不对'
                }
            });
        }
        try {
            const corpus = await Corpus.findOne({_id: id})
                .populate({path: 'owner', select: {slug: 1, nickname: 1, avatar: 1, _id: 0}})
                .populate({path: 'editors.editor', select: {slug: 1, nickname: 1, avatar: 1, _id: 0}});
            if(!corpus){
                return res.json({
                    "meta": {
                        "code": 404,
                        "message": '没有找到指定专题'
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
                "meta": {
                    "code": 422,
                    "message": "参数不全"
                }
            });
            return;
        }
        const newCorpus = new Corpus(Object.assign({owner: (req as any).user._id}, req.body));
        try {
            const corpus = await newCorpus.save();
            res.json({
                "meta": {
                    "code": 200,
                    "message": '添加成功'
                },
                'data': {
                    '_id': corpus._id
                }
            });
        } catch (err) {
            console.log('给用户添加专题', err);
            res.json({
                "meta": {
                    "code": 422,
                    "message": '保存专题失败'
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
        res.json({
            "meta": {
                "code": 200,
                "message": '查询成功'
            },
            "data": formatData(corpus)
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
                "meta": {
                    "code": 422,
                    "message": "参数不全"
                }
            });
            return;
        }
        const corpus = Object.assign((req as any).corpus, req.body);
        corpus.save((err) => {
            if(err){
                return res.json({
                    "meta": {
                        "code": 422,
                        "message": '修改失败'
                    }
                });
            }
            res.json({
                "meta": {
                    "code": 201,
                    "message": '修改成功'
                }
            });
        });
    }

    /**
     * GET /corpusooks
     * 获取专题数量
     */
    async count(req: Request, res: Response, next: NextFunction) {
        let params: any = req.query;
        try {
            const count = await Corpus.count(params);
            res.json({
                "meta": {
                    "code": 200,
                    "message": '获取全部成功'
                },
                "data": {
                    "total": count
                }
            });
        } catch (err) {
            console.log('通过文集ID获取文集信息失败', err);
            res.json({
                "meta": {
                    "code": 404,
                    "message": '没有找到指定专题'
                }
            });
        }
    }

    /**
     * GET /corpusooks
     * 获取全部专题
     */
    async search(req: Request, res: Response, next: NextFunction) {
        const {page = 1, limit = 10} = req.query;
        let params: any = req.query;
        try {
            const count = await Corpus.count(params);
            const corpus = await Corpus.find(params)
                .populate({path: 'owner', select: {slug: 1, nickname: 1, avatar: 1, _id: 0}})
                .populate({path: 'editors.editor', select: {slug: 1, nickname: 1, avatar: 1, _id: 0}})
                .sort({'updatedAt': 'desc'})
                .skip((Number(page) - 1) * Number(limit))
                .limit(Number(limit));
            res.json({
                "meta": {
                    "code": 200,
                    "message": '获取全部成功'
                },
                "data": _.map(corpus, formatData),
                "total": count
            });
        } catch (err) {
            console.log('通过获取全部专题信息失败', err);
            res.json({
                "meta": {
                    "code": 404,
                    "message": '没有找到指定专题'
                }
            });
        }
    }
}

/**
 * 导出模块
 */
export default new CorpusController();