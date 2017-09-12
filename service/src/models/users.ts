/**
 * 用户表
 * Created by jiayi on 2017/9/8.
 */

/**
 * 引入依赖
 */
import * as bcrypt from 'bcrypt';
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';

/**
 * 定义接口
 */
export type UsersModel = mongoose.Document & {
    slug: String;
    _id: mongodb.ObjectID; // 唯一标识;
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
    username: String; // 登陆账号
    password: String; // 登陆密码
    status: String;  // 用户状态
    tokens: AuthToken[];  // 第三方认证
    auths: AuthList[];  // 实名认证
    profile: {        // 个人资料
        gender: String;   // 性别
        location: String;  // 地址
        intro: String;   // 个人介绍
        qrcode: String;   // 个人二维码
        homepage: String;   // 个人主页
        country_code: String   // 来自哪个国家
    };
    author: String;   // 作者身份
    basic: {   // 基本设置
        nickname: String;   // 昵称
        avatar: String;    // 头像
        locale: String;    // 阅读语言
        chats_notify: Boolean;   // 简信接收设置
        email_notify: String    // 提醒邮件通知
    };
    token: String    // 登陆前面
    comparePassword: (candidatePassword: String, callback: (err: any, isMatch: boolean) => any) => void;  // 验证密码
    gravatar: () => String   // 获取头像
};

/**
 * 实名认证
 */
export interface AuthList {
    _id: mongodb.ObjectID; // 唯一标识;
    key: String;   // 认证名称 mobile 手机 email 邮箱 realname 实名认证 identity
    value: String;  // 认证内容
    status: String;    // 认证状态 0 未认证 1 已认证 2 已注销
};

/**
 * 社交认证
 */
export interface AuthToken {
    _id: mongodb.ObjectID; // 唯一标识;
    accessToken: String;
    kind: String;
};

/**
 * usersSchema
 * @type {mongoose.Schema}
 */
const usersSchema = new mongoose.Schema({
    username: {    // 登陆账号
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    password: {    // 登陆密码
        type: String,
        require: true // 不可为空约束
    },
    status: {  // 用户状态  0 不存在（注销） 1 启用 2 黑名单
        type: String,
        required: true,
        'enum': ['0', '1', '2'],
        'default': '0'
    },
    author: {    // 作者身份  0 普通作者 1 签约作者 2 金牌作者 3 管理员作者
        type: String,
        'enum': ['0', '1', '2'],
        'default': '0'
    },
    tokens: [{
        accessToken: String,
        kind: String
    }],
    auths: [{
        key: String,   // 认证名称 mobile 手机 email 邮箱 realname 实名认证 identity
        value: String,  // 认证内容
        status: String    // 认证状态 0 未认证 1 已认证 2 已注销
    }],
    profile: {
        gender: {  // 性别 0 保密 1 男 2 女
            type: String,
            'enum': ['0', '1', '2'],
            'default': '0'
        },
        location: String,
        intro: String,
        qrcode: String,
        homepage: String,
        country_code: {
            type: String,
            'default': 'cn'
        }
    },
    basic: {
        nickname: {    // 昵称
            type: String,
            minlength: 2,   // 最小2个字符
            maxlength: 10,  // 最大10个字符
            unique: true,   // 不可重复约束
            require: true   // 不可为空约束
        },
        avatar: String,
        locale: {
            type: String,
            'default': 'zh-CN'
        },
        chats_notify: {
            type: Boolean,
            'default': true
        },
        email_notify: {
            type: String,
            'default': 'none',
            'enum': ['none', 'later', 'instantly']
        }
    },
    token: String
}, {timestamps: true});

/**
 * 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
 */
usersSchema.pre('save', function (next) {
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
            user.status = 1;
            user.auths.push({
                key: 'mobile',
                value: user.username,
                status: '1'
            });
            user.basic.avatar = user.gravatar();
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
usersSchema.methods.comparePassword = function (candidatePassword?: string, callback?: any): any {
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
usersSchema.methods.gravatar = function () {
    const random = (new Date).getTime() % 15;
    return `http://localhost:3000/assets/avatar/${random}.jpg`;
};

/**
 * 导出users模型
 */
export default mongoose.model('Users', usersSchema);