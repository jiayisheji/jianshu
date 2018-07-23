import { Schema } from 'mongoose';
import { schemaPlugin } from '../schemaPlugin';

export const UserSchema = new Schema({
    nickname: {   // 昵称
        type: String,
        required: true,    // 必填
    },
    password: {   // 密码
        type: String,
        required: true,    // 必填
    },
    avatar: {     // 头像
        type: String,
    },
    email: {      // 邮箱
        type: String,
    },
    mobile: {      // 手机号
        type: String,
        required: true,    // 必填
    },
    email_confirmed: {   // 邮箱验证
        type: Boolean,
    },
    country_code: {     // 国家代码
        type: String,
        default: 'cn',    // 默认中国  //baike.baidu.com/item/ISO%203166-1 参照ISO 3166-1二位字段小写命名
    },
    preferred_note_type: {   // 常用编辑器
        type: String,
        enum: ['markdown', 'plain'],
        default: 'markdown',   //  plain  富文本
    },
    locale: {        // 语言设置
        type: String,
        enum: ['zh-CN', 'zh-TW'],   //  zh-CN  中文简体   zh-TW 中文繁体
        default: 'zh-CN',
    },
    accept_stranger_message: {    // 接收谁的简信
        type: Boolean,
        default: true,   //  true 所有人 false  我关注的人、我发过简信的人
    },
    email_notify: {    // 提醒邮件通知
        type: String,
        enum: ['instantly', 'later', 'none'],   //  instantly 所有人 later  每天未读汇总 none 不接收
        default: 'instantly',
    },
    gender: {      // 性别
        type: Number,
        enum: [0, 1],  // 0 保密  1 男  2 女
        default: 0,
    },
    homepage: {      // 个人网站
        type: String,
    },
    intro: {      // 个人简介
        type: String,
    },
    qrcode: {      // 微信二维码
        type: String,
    },
    accesses: [    // 社交帐号绑定并登录

    ],
    reward_setting: {
        default_amount: {  // 默认打赏金额
            type: Number,
            default: 200,    // 默认200元
        },
        enabled: {    // 赞赏功能
            type: Boolean,
            default: true,   //  true 开启 false 关闭
        },
        description: {      // 赞赏描述
            type: String,
        },
    },
    activatable: {    // 用户状态
        type: Number,
        enum: [0, 1, 2, 3, 4],  // 0 未认证手机  1 正常  2 黑名单 3 保留账号 4 软删除
        default: 0,
    },
    account_money: {  // 账户余额
        type: String,
        default: '0.00',    // 保留2位小数 单位元
    },
    created_at: {    // 创建时间
        type: Date,
        default: Date.now(),
    },
    created_name: {    // 创建人
        type: String,
    },
    updated_at: {    // 更新时间
        type: Date,
        default: Date.now(),
    },
    updated_name: {    // 更新人
        type: String,
    },
    disabled_at: {    // 禁用时间
        type: Date,
    },
    disabled_name: {    // 禁用人
        type: String,
    },
    deleted_at: {    // 删除时间
        type: Date,
    },
    deleted_name: {    // 删除人
        type: String,
    },
    destroyed_at: {    // 销毁数据时间
        type: Date,
    },
    destroyed_name: {    // 销毁人
        type: String,
    },
});

// 设置索引
UserSchema.index({ nickname: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ mobile: 1 }, { unique: true });

// 设置虚拟属性

// 隐藏手机号 134****5678
UserSchema.virtual('mobile_number').get(function() {
    return this.mobile && this.activatable === 1 ? this.mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : null;
});

// 设置创建更新时间插件
UserSchema.plugin(schemaPlugin);