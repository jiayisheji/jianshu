/**
 * 专题控制器
 * Created by jiayi on 2017/6/18.
 */
import * as async from "async";
import * as crypto from "crypto";
//import * as nodemailer from "nodemailer";
import * as passport from "passport";
import * as jwt from 'jsonwebtoken';
import { default as Corpus, CorpusModel , formatData} from "../models/corpus";
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";
import * as _ from "lodash";
/**
 * POST /corpusooks
 * 用户添加一个专题
 */
export let AddCorpus = function (req: Request, res: Response, next: NextFunction) {
    if(!(req as any).isAuthenticated()){
        res.json({
            "meta": {
                "code": 403,
                "message": "未登陆"
            }
        });
        return ;
    }
    req.checkBody({
        'title': {
            notEmpty: true,
            isLength: {
                options: [{ min: 1, max: 20 }],
                errorMessage: '名称长度不是1-20位' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: '名称不能为空'
        },
        'avatar': {
            notEmpty: true, // won't validate if field is empty
            errorMessage: '封面不能为空' // Error message for the parameter
        }
    });

    req.getValidationResult().then(function (result: any) {
        console.log(result.array())
        console.log(result.mapped())
        if(!result.isEmpty()){
            let message = "未知错误";
            if(result.mapped().title && result.mapped().avatar){
                message = "名称和封面为空"
            }else if(result.mapped().title){
                message = result.mapped().username.msg
            }else if(result.mapped().password){
                message = result.mapped().avatar.msg
            }
            res.json({
                "meta": {
                    "code": 422,
                    "message": message
                }
            });
            return ;
        }
        const newCorpus = new Corpus(Object.assign({owner: (req as any).user._id}, req.body));

        newCorpus.save((err: WriteError, corpus: CorpusModel) => {
            if (err) {
                return next(err);
            }
            res.json({
                "meta": {
                    "code": 200,
                    "message": '添加成功'
                },
                'data': {
                    '_id': corpus._id
                }
            });
        });
    }, function (errors: any) {
        console.log(errors)
    });
}

/**
 * GET /corpus/:id
 * 获取一个专题
 */
export let GetCorpus = function (req: Request, res: Response, next: NextFunction) {
    if(!req.params.id){
        res.json({
            "meta": {
                "code": 422,
                "message": "缺少专题id"
            }
        });
        return ;
    }
    Corpus.findOne({_id: req.params.id}, {_id:0, __v:0, 'editors._id':0})
        .populate({path: 'owner', select: { slug: 1,  nickname: 1, avatar: 1,_id:0}})
        .populate({path: 'editors.editor', select: { slug: 1,  nickname: 1, avatar: 1,_id:0}})
        .exec((err: WriteError, corpus: CorpusModel) => {
            if (err) {
                res.json({
                    "meta": {
                        "code": 422,
                        "message": '文集id不对'
                    }
                });
                return ;
            }
            if (!corpus) {
                res.json({
                    "meta": {
                        "code": 404,
                        "message": '没有找到指定文集'
                    }
                });
                return ;
            }
            res.json({
                "meta": {
                    "code": 200,
                    "message": '查询成功'
                },
                "data": formatData(corpus)
            });
        });
}

/**
 * PUT /corpus/:id/edit
 * 更新一个专题
 */
export let UploadCorpus = function (req: Request, res: Response, next: NextFunction) {
    if((req as any).isAuthenticated()){
        res.json({
            "meta": {
                "code": 403,
                "message": "未登陆"
            }
        });
        return ;
    }
    if(!req.params.id){
        res.json({
            "meta": {
                "code": 422,
                "message": "缺少专题id"
            }
        });
        return ;
    }
    req.checkBody({
        'title': {
            notEmpty: true,
            isLength: {
                options: [{ min: 1, max: 20 }],
                errorMessage: '名称长度不是1-20位' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: '名称不能为空'
        },
        'avatar': {
            notEmpty: true, // won't validate if field is empty
            errorMessage: '封面不能为空' // Error message for the parameter
        }
    });

    req.getValidationResult().then(function (result: any) {
        console.log(result.array())
        console.log(result.mapped())
        if(!result.isEmpty()){
            let message = "未知错误";
            if(result.mapped().title && result.mapped().avatar){
                message = "名称和封面为空"
            }else if(result.mapped().title){
                message = result.mapped().username.msg
            }else if(result.mapped().password){
                message = result.mapped().avatar.msg
            }
            res.json({
                "meta": {
                    "code": 422,
                    "message": message
                }
            });
            return ;
        }
        Corpus.findOneAndUpdate({_id: req.params.id, owner: (req as any).user._id}, req.body)
            .exec((err: any, corpus: CorpusModel) => {
                if (err) {
                    return next(err);
                }
                if(!corpus){
                    res.json({
                        "meta": {
                            "code": 404,
                            "message": '没有找到指定专题'
                        }
                    });
                    return ;
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
 * GET /corpusooks
 * 获取全部专题
 */
export let GetAllCorpus = function (req: Request, res: Response, next: NextFunction) {
    let page = Math.abs(parseInt(req.query.page, 10)) || 1;
    let limit = Math.abs(parseInt(req.query.limit, 10)) || 15;
    let params: any = {
    };
    async.waterfall([
        function getCount(done: Function) {
            Corpus.count(16, (err, count) => {
                done(err, count);
            });
        },
        function getLsit(count: number, done: Function){
            Corpus.find(params, {_id:0, __v:0, 'editors._id':0})
                .populate({path: 'owner', select: { slug: 1,  nickname: 1, avatar: 1,_id:0}})
                .populate({path: 'editors.editor', select: { slug: 1,  nickname: 1, avatar: 1,_id:0}})
                .sort({'updatedAt': 'desc'})
                .skip((page - 1) * limit)
                .limit(limit).exec((err, corpus:any) => {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        "meta": {
                            "code": 200,
                            "message": '获取全部成功'
                        },
                        "data": _.map(corpus, formatData),
                        "total": count
                    });
                });
            }
    ], (err: any) => {

    })
}



/**
 * PUT /logout
 * 退出登陆
 */
