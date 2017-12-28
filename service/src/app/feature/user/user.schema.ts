import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        username: {    // 登陆账号
            type: String,
            unique: true, // 不可重复约束
            require: true, // 不可为空约束
        },
        password: {    // 登陆密码
            type: String,
            require: true, // 不可为空约束
        },
        nickname: {    // 昵称
            type: String,
            minlength: 2,   // 最小2个字符
            maxlength: 10,  // 最大10个字符
            unique: true,   // 不可重复约束
            require: true,   // 不可为空约束
        },
        avatar: String,   // 头像
    },
    {
        collection: 'Users',   // 集合名
        versionKey: false,
        timestamps: true,     // 自动生成时间（注意比北京时间晚8小时）
    },
);
