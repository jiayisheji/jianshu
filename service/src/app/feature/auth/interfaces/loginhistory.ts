import { Document } from 'mongoose';
import * as mongodb from 'mongodb';

export interface ILoginhistory extends Document {
    readonly _id: mongodb.ObjectID;  // 唯一id
    readonly user: mongodb.ObjectID; // 用户名id
    readonly loginTime: Date;       // 登录时间
    readonly remark: string;         // 备注
    readonly ip: string;             // 登录IP地址
    readonly slug: string;           // 带盐标识
    readonly createdAt: Date;        // 创建时间
    readonly updatedAt: Date;        // 更新时间
}