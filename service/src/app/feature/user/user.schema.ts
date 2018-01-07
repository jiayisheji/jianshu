import * as mongoose from 'mongoose';
import { NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
    {
        username: {    // 登陆账号
            type: String,
            unique: true, // 不可重复约束
            require: [true, 'username field is required'], // 不可为空约束
        },
        password: {    // 登陆密码
            type: String,
            require: true, // 不可为空约束
        },
        nickname: {    // 昵称
            type: String,
            minlength: 2,   // 最小2个字符
            maxlength: 15,  // 最大15个字符
            unique: true,   // 不可重复约束
            require: true,   // 不可为空约束
        },
        avatar: String,   // 头像
    },
    {
        collection: 'Users',   // 集合名
        timestamps: true,     // 自动生成时间（注意比北京时间晚8小时）
    },
);
// 设置虚拟数据id
UserSchema.virtual('slug').get(slug);
function slug() {
    return this._id + '';
}
// 设置虚拟数据更新时间
UserSchema.virtual('updated_at').get(updated_at);
function updated_at() {
    return new Date(this.updatedAt).toLocaleString();
}
// 设置虚拟数据创建时间
UserSchema.virtual('created_at').get(created_at);
function created_at() {
    return new Date(this.createdAt).toLocaleString();
}
// 转换json可以获取虚拟属性
UserSchema.set('toJSON', { getters: true, virtual: true });

// 在用户注册保存的时候，需要先把password通过salt生成hash密码，并最终赋值给password。
UserSchema.pre('save', encryptionUserPassword);

function encryptionUserPassword(next: NextFunction) {
    const user = this;
    // 检查password是否存在，如果不存在就直接返回
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, ((error, salt) => {
            if (error) {
                return next(error);
            }
            bcrypt.hash(user.password, salt, ((err, hash) => {
                if (err) {
                    return next(err);
                }
                // 生成密文
                user.password = hash;
                next();
            }).bind(this));
        }).bind(this));
    } else {
        return next();
    }
}

// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = (password?: string, callback?: any): any => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};