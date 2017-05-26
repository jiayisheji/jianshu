/**
 * Created by jiayi on 2017/2/20.
 */
import * as Express from 'express';
import * as jwt from 'jsonwebtoken';
import * as Admin from '../../../models/Admin';
/*const redisClient = redis.createClient();
function generateRateLimiter(getKey, limit){
    return function (req, res, next) {
        var source = req.body.source || req.query.source;
        var key = getKey(source);
        redisClient.incr(key, function (err, ret) {
            if(err) return next(err);
            if(ret > limit) return next({"out_of_rate_limit": "超出请求频率限制"});
            next();
        });
    }
}*/
export function adminlogin(app) {
    app.post('/admin/register', function (req: Express.Request, res: Express.Response) {
        if (!req.body.username || !req.body.password) {
            res.json({
                code: 103,
                message: "请输入您的账号密码.",
                data: {}
            });
        } else {
            var newAdmin = new Admin({
                username: req.body.username,
                password: req.body.password
            });
            // 保存用户账号
            newAdmin.save((err) => {
                if (err) {
                    res.json({
                        code: 110,
                        message: "用户已经注册",
                        data: {}
                    });
                }
                res.json({
                    code: 0,
                    message: "ok",
                    data: {
                        message: '成功创建新用户!'
                    }
                });
            });
        }
    });
    app.post('/admin/accesstoken', function (req: Express.Request, res: Express.Response) {
        Admin.findOne({
            username: req.body.username
        }, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                res.json({
                    code: 103,
                    message: "认证失败,用户不存在!",
                    data: {}
                });
            } else if(user) {
                // 检查密码是否正确
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        var token = jwt.sign({username: user.username}, 'learnRestApiwithNickjs',{
                            expiresIn: 10080  // token到期时间设置
                        });
                        user.token = token;
                        user.save(function(err){
                            if (err) {
                                res.send(err);
                            }
                        });
                        res.json({
                            code: 0,
                            message: "ok",
                            data: {
                                message: '验证成功!',
                                token: 'Bearer ' +　token,
                                username: user.username
                            }
                        });
                    } else {
                        res.json({
                            code: 103,
                            message: "认证失败,密码错误!",
                            data: {}
                        });
                    }
                });
            }
        });
    });
    app.post('/admin/login', function (req: Express.Request, res: Express.Response) {
        if (!req.body.username || !req.body.password) {
            res.json({
                code: 103,
                message: "请输入您的账号密码.",
                data: {}
            });
        } else {
            Admin.findOne({
                username: req.body.username
            }, (err, user) => {
                if (err) {
                    throw err;
                }
                if (!user) {
                    res.json({
                        code: 103,
                        message: "登陆失败,用户不存在!",
                        data: {}
                    });
                } else if(user) {
                    // 检查密码是否正确
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (isMatch && !err) {
                            res.json({
                                code: 0,
                                message: "ok",
                                data: {
                                    username: user.username
                                }
                            });
                        } else {
                            res.json({
                                code: 103,
                                message: "登陆失败,密码错误!",
                                data: {}
                            });
                        }
                    });
                }
            });
        }
    });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

