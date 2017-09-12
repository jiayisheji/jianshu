/**
 * Created by jiayi on 2017/5/25.
 */
/**
 * 引入依赖
 */
import * as bcrypt from 'bcrypt';
import {Document, Schema, Model, model} from "mongoose";
/**
 * 引入注解
 */
import {IUser} from "./interfaces/user";

/**
 * 给Model添加注解
 */
export interface IUserModel extends IUser, Document {
    comparePassword?: any;
}

/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const UserSchema: Schema = new Schema({
    created: {     // 创建时间
        type: Date,
        'default': new Date
    },
    nickname: {    // 昵称
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    username: {    // 登陆账号
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    password: {    // 登陆密码
        type: String,
        require: true // 不可为空约束
    },
    avatar: {    // 头像   默认随机生成一个
        type: String
    },
    gender: {    // 性别 0 保密 1 男 2 女
        type: Number,
        required: true,
        enum: [0, 1, 2],
        'default': 0
    },
    intro: {     // 个人简介
        type: String
    },
    homepage: {   // 个人主页
        type: String
    },
    email: {     // 电子邮件
        type: String
    },
    mobile: {     // 手机  
        type: String,
        require: true
    },
    email_auth: { // 电子邮件认证 不认证不能设置提醒邮件通知
        type: Boolean,
        'default': false
    },
    mobile_auth: {  // 手机 认证 不认证不能发表文章
        type: Boolean,
        'default': false
    },
    country_code: {  // 所属国家
        type: String,
        'default': 'cn'
    },
    locale: {  // 语言设置  zh-CN 中文简体 zh-TW 中文繁體
        type: String,
        'default': 'zh-CN'
    },
    chats_notify: {  // 简信接受设置  true 接收所有简信 false 只接收我关注的用户的简信
        type: Boolean,
        'default': true
    },
    email_notify: {   // 提醒邮件通知  none-不接收 later-每天未读汇总 instantly-所有动态  (如果没有邮箱验证就是不接受，如果邮箱有验证就是所有动态)
        type: String,
        'default': 'none',
        enum: ['none', 'later', 'instantly']
    },
    qrcode: {     // 社交二维码
        type: String
    },
    token: {     // 登陆验证签名
        type: String
    }
});

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(password?: string, callback?: any): any {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
/**
 * 导出Model
 * @type {Model<IUserModel>}
 */
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);