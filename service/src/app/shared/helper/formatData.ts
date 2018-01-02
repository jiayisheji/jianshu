import { Component } from '@nestjs/common';
import { IUser } from '../../feature';
import * as mongodb from 'mongodb';

export interface IUserInfoInterface {
    slug: mongodb.ObjectID;
    nickname: string;
    avatar: string;
}
@Component()
export class FormatData {
    constructor() { }
    // 格式化本地时间 mongoose自动生成的时间比北京时间晚8个小时
    LocaleDate(date: Date): string | void {
        if (!date) {
            return;
        }
        return new Date(date).toLocaleString();
    }
    // 处理数据里面 updatedAt和createdAt差9个小时问题
    FormatDate(data: any): any {
        if (!data) {
            return null;
        }
        if ((data as any).updatedAt) {
            (data as any).updatedAt = this.LocaleDate((data as any).updatedAt);
        }
        if ((data as any).createdAt) {
            (data as any).createdAt = this.LocaleDate((data as any).createdAt);
        }
        return data;
    }
    // 返回用户基本信息
    UserInfo(user: any): any {
        if (!user) {
            return;
        }
        return {
            slug: user._id,
            nickname: user.nickname,
            avatar: user.avatar,
        };
    }
}