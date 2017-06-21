/**
 * 专题控制器
 * Created by jiayi on 2017/6/18.
 */
import * as async from "async";
import {default as Corpus, CorpusModel, formatData} from "../models/corpus";
import {Request, Response, NextFunction} from "express";
import {WriteError} from "mongodb";
import * as _ from "lodash";

/**
 * 定义类接口
 */
interface corpusInterface {
    save(req: Request, res: Response, next: NextFunction);

    find(req: Request, res: Response, next: NextFunction);

    updata(req: Request, res: Response, next: NextFunction);

    count(req: Request, res: Response, next: NextFunction);

    search(req: Request, res: Response, next: NextFunction);
}

/**
 * 专题控制器
 */
class CorpusController implements corpusInterface {
    constructor() {
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
        ;
    }

    /**
     * GET /corpus/:id
     * 获取一个专题
     */
    async find(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            console.log('通过专题ID获取专题信息失败');
            res.json({
                "meta": {
                    "code": 422,
                    "message": '专题id为空'
                }
            });
            return;
        }
        try {
            const corpus = await Corpus.findOne({_id: req.params.id}, {_id: 0, __v: 0, 'editors._id': 0})
                .populate({path: 'owner', select: {slug: 1, nickname: 1, avatar: 1, _id: 0}})
                .populate({path: 'editors.editor', select: {slug: 1, nickname: 1, avatar: 1, _id: 0}});
            res.json({
                "meta": {
                    "code": 200,
                    "message": '查询成功'
                },
                "data": formatData(corpus)
            });
        } catch (err) {
            console.log('通过专题ID获取文集信息失败', err);
            res.json({
                "meta": {
                    "code": 422,
                    "message": '专题id不对'
                }
            });
        }
        ;
    }

    /**
     * PUT /corpus/:id/edit
     * 更新一个专题
     */
    async updata(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) {
            console.log('通过专题ID获取专题信息失败');
            res.json({
                "meta": {
                    "code": 422,
                    "message": '专题id为空'
                }
            });
            return;
        }
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
        try {
            await Corpus.findOneAndUpdate({_id: req.params.id, owner: (req as any).user._id}, req.body);
            res.json({
                "meta": {
                    "code": 201,
                    "message": '修改成功'
                }
            });
        } catch (err) {
            console.log('通过专题ID获取文集信息失败', err);
            res.json({
                "meta": {
                    "code": 404,
                    "message": '没有找到指定专题'
                }
            });
        }
        ;
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
        ;
    }

    /**
     * GET /corpusooks
     * 获取全部专题
     */
    async search(req: Request, res: Response, next: NextFunction) {
        const {page = 1, limit = 20} = req.query;
        let params: any = req.query;
        try {
            const count = await Corpus.count(params);
            const corpus = await Corpus.find(params, {_id: 0, __v: 0, 'editors._id': 0})
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
        ;
    }
}

/**
 * 导出模块
 */
export default new CorpusController();