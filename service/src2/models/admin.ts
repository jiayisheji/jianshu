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
import {IAdmin} from "./interfaces/admin";

/**
 * 给Model添加注解
 */
export interface IUserModel extends IAdmin, Document {
    comparePassword?: any;
}

/**
 * 定义Schema
 * @type {"mongoose".Schema}
 */
export const AdminSchema: Schema = new Schema({
    created: {     // 创建时间
        type: Date,
        'default': new Date
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
    token: {     // 签名
        type: String
    }
});

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
AdminSchema.pre('save', function (next) {
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
AdminSchema.methods.comparePassword = function(password?: string, callback?: any): any{
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
export const Admin: Model<IUserModel> = model<IUserModel>("Admin", AdminSchema);