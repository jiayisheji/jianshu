/**
 * Users 接口
 * Created by jiayi on 2017-9-18 21:25:16.
 */
/**
 * 引入依赖
 */
import * as mongodb from 'mongodb';
import * as mongoose from 'mongoose';


export interface InterfaceUsers{
    slug?: String;          // 加盐标识;
    _id: mongodb.ObjectID; // 唯一标识;
    createdAt?: Date;   // 创建时间
    updatedAt?: Date;   // 更新时间
    username: String; // 登陆账号
    password: String; // 登陆密码
    nickname: String;   // 昵称
    avatar: String;    // 头像
    comparePassword: (candidatePassword: String, callback: (err: any, isMatch: boolean) => any) => void;  // 验证密码
    gravatar: () => String   // 获取头像
}