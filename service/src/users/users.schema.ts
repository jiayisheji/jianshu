/**
 * Created by jiayi on 2017/9/19.
 */


import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';

/**
 * UsersSchema
 * @type {mongoose.Schema}
 */
export default new mongoose.Schema({
    username: {    // 登陆账号
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    password: {    // 登陆密码
        type: String,
        require: true // 不可为空约束
    },
    nickname: {    // 昵称
        type: String,
        minlength: 2,   // 最小2个字符
        maxlength: 10,  // 最大10个字符
        unique: true,   // 不可重复约束
        require: true   // 不可为空约束
    },
    avatar: String   // 头像
}, {timestamps: true});
