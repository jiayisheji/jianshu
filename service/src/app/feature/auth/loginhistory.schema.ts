import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const LoginhistorySchema: Schema = new mongoose.Schema(
    {
        user: {    // 登陆账号
            type: Schema.Types.ObjectId,    // 引用类型
            ref: 'User',                     // 关联用户表
        },
        loginTime: {        // 登录时间
            type: Date,
            default: new Date(),
        },
        remark: {        // 备注
            type: String,
            default: '',
        },
        ip: {        // IP地址
            type: String,
            default: '',
        },
    },
    {
        collection: 'Loginhistory',   // 集合名
        timestamps: true,     // 自动生成时间（注意比北京时间晚8小时）
    },
);

// 设置虚拟数据id
LoginhistorySchema.virtual('slug').get(slug);
function slug() {
    return this._id + '';
}
// 设置虚拟数据更新时间
LoginhistorySchema.virtual('updated_at').get(updated_at);
function updated_at() {
    return new Date(this.updatedAt).toLocaleString();
}
// 设置虚拟数据创建时间
LoginhistorySchema.virtual('created_at').get(created_at);
function created_at() {
    return new Date(this.createdAt).toLocaleString();
}
// 设置虚拟数据登录时间
LoginhistorySchema.virtual('login_time').get(login_time);
function login_time() {
    return new Date(this.loginTime).toLocaleString();
}
// 转换json可以获取虚拟属性
LoginhistorySchema.set('toJSON', { getters: true, virtual: true });