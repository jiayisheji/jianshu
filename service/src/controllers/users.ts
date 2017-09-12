/**
 * 用户控制器
 * Created by jiayi on 2017/9/8.
 */

/**
 * 用户模板
 * Created by jiayi on 2017/6/20.
 */
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';
import * as jwt from 'jsonwebtoken';
import {default as Users, UsersModel} from '../models/users';
import {LocalStrategyInfo} from 'passport-local';
import {Request, Response, NextFunction} from 'express';
import {default as SmsCode} from '../redis/smsCode';
import {default as Util} from '../utils/index';
import {default as TokenGuard} from '../redis/tokenGuard';
import {default as UsersFilter} from '../filters/users';
import {default as UsersService} from '../services/users';

// import {search, userformatData, InterfaceCorpusSearchResult} from './corpus/common';


/**
 * 定义类接口
 */
export interface InterfaceUsers {
    // unique(req: Request, res: Response, next: NextFunction);

    register(req: Request, res: Response, next: NextFunction);

    sendSmsCode(req: Request, res: Response, next: NextFunction);

    /*    login(req: Request, res: Response, next: NextFunction);

        logout(req: Request, res: Response, next: NextFunction);
       home(req: Request, res: Response, next: NextFunction);

        search(req: Request, res: Response, next: NextFunction);

        subscribe(req: Request, res: Response, next: NextFunction);

        unsubscribe(req: Request, res: Response, next: NextFunction);

        checkNickname(req: Request, res: Response, next: NextFunction);

        collectionsAndBooks(req: Request, res: Response, next: NextFunction);

        byId(req: Request, res: Response, next: NextFunction, id: string);*/
};

const checkUserStrategy = {}


function checkUser(req: Request, checkList: Array<string>): Object {
    const check = checkList.reduce((result, item) => {
        result[item] = checkUserStrategy[item];
        return result;
    }, {});
    req.checkBody(check);
    const errors = req.validationErrors();
    return null;
}

function getSmsCodeStoragekey(body: any): string {
    return `jianshu_${body.type}_${body.mobile}`;
}


/**
 * 模板控制器
 */
class UsersController implements InterfaceUsers {
    constructor() {
    }
    /**
     * POST /register
     * 用户注册
     */
    async register(req: Request, res: Response, next: NextFunction) {
        req.checkBody({
            'nickname': {
                notEmpty: true,
                isLength: {
                    options: [{min: 2, max: 10}],
                    errorMessage: '昵称长度不是2-10位' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '昵称不能为空'
            },
            'username': {
                notEmpty: true,
                isLength: {
                    options: [{min: 11, max: 11}],
                    errorMessage: '用户不是合法11位手机号' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '用户名不能为空'
            },
            'code': {
                notEmpty: true,
                isLength: {
                    options: [{min: 6, max: 6}],
                    errorMessage: '短信验证码不是合法6位数字' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '短信验证码不能为空'
            },
            'password': {
                notEmpty: true, // won't validate if field is empty
                isLength: {
                    options: [{min: 6, max: 18}],
                    errorMessage: '密码长度不是6-18位' // Error message for the validator, takes precedent over parameter message
                },
                errorMessage: '密码不能为空' // Error message for the parameter
            }
        });
        const errors = req.validationErrors();
        if (errors) {
            return res.resultsReject({
                code: 1002
            });
        }
        try {
            const code = await SmsCode.pull(getSmsCodeStoragekey({mobile: req.body.username, type: 'register'}));
            if (req.body.code !== code) {
                return res.json({
                    'meta': {
                        'code': 412,
                        'message': '短信验证码不正确'
                    }
                });
            }
        } catch (err) {
            return res.json({
                'meta': {
                    'code': 422,
                    'message': '短信验证码过期，请重新获取'
                }
            });
        }

        try {
            const user: any = await Users.findOne({
                $or: [
                    {
                        username: req.body.username
                    },
                    {
                        'basic.nickname': req.body.nickname
                    }
                ]
            });
            if (user) {
                return res.json({
                    'meta': {
                        'code': 422,
                        'message': '手机号已经被注册'
                    }
                });
            }
            const token = jwt.sign({username: req.body.username.username}, 'jiayishejijianshu', {
                expiresIn: '7 days'  // token到期时间设置 1000, '2 days', '10h', '7d'
            });
            const newUser = new Users({
                basic: {
                    nickname: req.body.nickname
                },
                username: req.body.username,
                password: req.body.password
            });
            // 保存用户账号
            newUser.save((err, users: UsersModel) => {
                if (err) {
                    return next(err);
                }
                TokenGuard.setToken(token, JSON.stringify(users)).then(() => {
                    console.log(11);
                    res.json({
                        'meta': {
                            'code': 200,
                            'message': '成功创建新用户!'
                        },
                        'data': {
                            token,
                            'user': Util.getUserinfo(users)
                        }
                    });
                });
            });
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * POST /sendSmsCode
     * 用户注册
     */
    async sendSmsCode(req: Request, res: Response, next: NextFunction) {
        const errors = await UsersFilter.validate(req, ['mobile', 'type']);
        if (errors) {
            return res.json({
                'meta': errors
            });
        }
        try {
            const smsCode = await UsersService.getSmsCode();
            SmsCode.push(getSmsCodeStoragekey(req.body), smsCode).then(() => {
                console.log(smsCode)
                return res.resultsResolve({smsCode});
            }).catch((err) => {
                console.log('存储验证码失败', err);
                return res.resultsReject({
                    code: 998,
                    message: '存储验证码失败'
                });
            });
        } catch (err) {
            console.log('获取验证码', err);
            res.json({
                'meta': {
                    'code': 422,
                    'message': '验证码获取失败'
                }
            });
        }
    }
};


/**
 * 导出用户控制器模块
 */
export default new UsersController();
