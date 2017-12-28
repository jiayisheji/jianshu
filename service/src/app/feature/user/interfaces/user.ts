import { Document } from 'mongoose';
import * as mongodb from 'mongodb';

export interface IUser extends Document {
    readonly _id: mongodb.ObjectID;  // 唯一id
    readonly username: string;       // 用户名
    readonly password: string;       // 密码
    readonly nickname: string;       // 昵称
    readonly avatar: string;         // 头像
    readonly slug: string;           // 带盐标识
    readonly createdAt: Date;        // 创建时间
    readonly updatedAt: Date;        // 更新时间
}