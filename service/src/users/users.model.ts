/**
 * Users 模型
 * Created by jiayi on 2017-9-18 21:25:16.
 */
/**
 * 引入依赖
 */
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as mongodb from 'mongodb';


// import {default as UsersSchema} from './users.schema';
import {InterfaceUsers} from './users.interface';

/**
 * 定义Users模型接口
 */
export type UsersModel = mongoose.Document & InterfaceUsers;

/**
 * UsersSchema
 * @type {mongoose.Schema}
 */
const UsersSchema = new mongoose.Schema({
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

/**
 * 添加 中间件
 */
UsersSchema.pre('save', (next) => {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            user.status = '1';
            user.avatar = user.gravatar();
            next();
        });
    });
});

/**
 * 校验用户输入密码是否正确
 * @method comparePassword
 * @param candidatePassword {String}  验证密码
 * @param callback {Function}  回调函数
 */
UsersSchema.methods.comparePassword = (candidatePassword?: string, callback?: any): any => {
    bcrypt.compare(candidatePassword, this.password, (err: any, isMatch: boolean) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

/**
 * 注册时候随机生成默认头像
 * @method gravatar
 */
UsersSchema.methods.gravatar = () => {
    const random = (new Date).getTime() % 15;
    return `http://localhost:3000/assets/avatar/${random}.jpg`;
};

/**
 * 导出Users模型
 */
export default mongoose.model(`Users`, UsersSchema);
