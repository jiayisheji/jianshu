import { Document } from 'mongoose';

export interface User extends Document {
    _id: any;
    nickname: string;   // 昵称
    password: string;   // 密码
    avatar: string;   // 头像
    email: string;    // 邮箱
    mobile: string;    // 手机号
    email_confirmed: string;  // 邮箱验证  true 开启 false 关闭
    country_code: string;     // 国家代码
    preferred_note_type: 'plain' | 'markdown';    // 常用编辑器 plain  富文本  markdown
    locale: 'zh-CN' | 'zh-TW';    // 语言设置   zh-CN  中文简体   zh-TW 中文繁体
    accept_stranger_message: boolean;      // 接收谁的简信   true 所有人 false  我关注的人、我发过简信的人
    email_notify: 'instantly' | 'later' | 'none';    // 提醒邮件通知  instantly 所有人 later  每天未读汇总 none 不接收
    gender: 0 | 1 | 2;    // 性别 0 保密  1 男  2 女
    homepage: string;    // 个人网站
    intro: string;    // 个人简介
    qrcode: string;    // 微信二维码
    accesses: any[];    // 社交帐号绑定并登录
    reward_setting: {
        default_amount: number;    // 默认打赏金额
        enabled: boolean;      // 赞赏功能   true 开启 false 关闭
        description: string;    // 赞赏描述
    };
    activatable: 0 | 1 | 2 | 3 | 4;    // 用户状态 0 未认证手机  1 正常  2 黑名单 3 保留账号 4 删除
    account_money: string;    // 账户余额
    created_at: string;  // 创建时间
    created_name: string;  // 创建人
    updated_at: string;    // 更新时间
    updated_name: string;    // 更新人
    disabled_at: string;     // 禁用时间
    disabled_name: string;     // 禁用人
    deleted_at: string;        // 删除时间
    deleted_name: string;        // 删除人
    destroyed_at: string;        // 销毁数据时间
    destroyed_name: string;        // 销毁人
}